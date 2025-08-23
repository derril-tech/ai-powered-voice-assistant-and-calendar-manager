import { ACCESSIBILITY_CONFIG } from './constants'

// Accessibility Manager
export class AccessibilityManager {
  private focusableElements: string[] = [
    'button',
    'input',
    'select',
    'textarea',
    'a[href]',
    'area[href]',
    'iframe',
    'object',
    'embed',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ]

  // Initialize accessibility features
  init(): void {
    this.setupSkipLinks()
    this.setupFocusIndicators()
    this.setupKeyboardNavigation()
    this.setupScreenReaderSupport()
    this.setupReducedMotion()
    this.setupHighContrast()
  }

  // Setup skip links for keyboard navigation
  private setupSkipLinks(): void {
    if (!ACCESSIBILITY_CONFIG.skipLinks) return

    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' },
      { href: '#search', text: 'Skip to search' },
    ]

    skipLinks.forEach(({ href, text }) => {
      const link = document.createElement('a')
      link.href = href
      link.textContent = text
      link.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded'
      document.body.insertBefore(link, document.body.firstChild)
    })
  }

  // Setup focus indicators
  private setupFocusIndicators(): void {
    if (!ACCESSIBILITY_CONFIG.focusIndicators) return

    const style = document.createElement('style')
    style.textContent = `
      *:focus {
        outline: 2px solid var(--color-primary-500) !important;
        outline-offset: 2px !important;
      }
      
      *:focus:not(:focus-visible) {
        outline: none !important;
      }
      
      *:focus-visible {
        outline: 2px solid var(--color-primary-500) !important;
        outline-offset: 2px !important;
      }
    `
    document.head.appendChild(style)
  }

  // Setup keyboard navigation
  private setupKeyboardNavigation(): void {
    if (!ACCESSIBILITY_CONFIG.keyboardNavigation) return

    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this))
  }

  // Handle keyboard navigation
  private handleKeyboardNavigation(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab':
        this.handleTabNavigation(event)
        break
      case 'Escape':
        this.handleEscapeKey(event)
        break
      case 'Enter':
      case ' ':
        this.handleActivationKey(event)
        break
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.handleArrowKeys(event)
        break
    }
  }

  // Handle tab navigation
  private handleTabNavigation(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements()
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)

    if (event.shiftKey) {
      // Shift + Tab: navigate backwards
      if (currentIndex <= 0) {
        event.preventDefault()
        focusableElements[focusableElements.length - 1]?.focus()
      }
    } else {
      // Tab: navigate forwards
      if (currentIndex >= focusableElements.length - 1) {
        event.preventDefault()
        focusableElements[0]?.focus()
      }
    }
  }

  // Handle escape key
  private handleEscapeKey(event: KeyboardEvent): void {
    const target = event.target as HTMLElement
    
    // Close modals, dropdowns, etc.
    const modal = target.closest('[role="dialog"]')
    if (modal) {
      const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]')
      if (closeButton instanceof HTMLElement) {
        closeButton.click()
      }
    }

    // Close dropdowns
    const dropdown = target.closest('[role="listbox"], [role="menu"]')
    if (dropdown) {
      const trigger = document.querySelector(`[aria-controls="${dropdown.id}"]`)
      if (trigger instanceof HTMLElement) {
        trigger.click()
      }
    }
  }

  // Handle activation keys (Enter, Space)
  private handleActivationKey(event: KeyboardEvent): void {
    const target = event.target as HTMLElement
    
    // Prevent default for buttons and links
    if (target.tagName === 'BUTTON' || target.tagName === 'A') {
      return
    }

    // Handle custom interactive elements
    if (target.getAttribute('role') === 'button' || target.getAttribute('tabindex') === '0') {
      event.preventDefault()
      target.click()
    }
  }

  // Handle arrow keys
  private handleArrowKeys(event: KeyboardEvent): void {
    const target = event.target as HTMLElement
    
    // Handle list navigation
    if (target.getAttribute('role') === 'option') {
      event.preventDefault()
      this.navigateListItems(target, event.key)
    }

    // Handle tab navigation
    if (target.getAttribute('role') === 'tab') {
      event.preventDefault()
      this.navigateTabs(target, event.key)
    }
  }

  // Navigate list items
  private navigateListItems(currentItem: HTMLElement, direction: string): void {
    const list = currentItem.closest('[role="listbox"], [role="list"]')
    if (!list) return

    const items = Array.from(list.querySelectorAll('[role="option"], [role="listitem"]'))
    const currentIndex = items.indexOf(currentItem)

    let nextIndex: number
    switch (direction) {
      case 'ArrowUp':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        break
      case 'ArrowDown':
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        break
      default:
        return
    }

    (items[nextIndex] as HTMLElement)?.focus()
  }

  // Navigate tabs
  private navigateTabs(currentTab: HTMLElement, direction: string): void {
    const tabList = currentTab.closest('[role="tablist"]')
    if (!tabList) return

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'))
    const currentIndex = tabs.indexOf(currentTab)

    let nextIndex: number
    switch (direction) {
      case 'ArrowLeft':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
        break
      case 'ArrowRight':
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
        break
      default:
        return
    }

    (tabs[nextIndex] as HTMLElement)?.click()
  }

  // Setup screen reader support
  private setupScreenReaderSupport(): void {
    if (!ACCESSIBILITY_CONFIG.screenReaderSupport) return

    // Add live regions for dynamic content
    this.createLiveRegion('status', 'status')
    this.createLiveRegion('alert', 'alert')
    this.createLiveRegion('log', 'log')
  }

  // Create live region for screen readers
  private createLiveRegion(id: string, role: string): void {
    const region = document.createElement('div')
    region.id = id
    region.setAttribute('role', role)
    region.setAttribute('aria-live', 'polite')
    region.className = 'sr-only'
    document.body.appendChild(region)
  }

  // Announce message to screen readers
  announceMessage(message: string, type: 'status' | 'alert' | 'log' = 'status'): void {
    const region = document.getElementById(type)
    if (region) {
      region.textContent = message
      // Clear the message after a short delay
      setTimeout(() => {
        region.textContent = ''
      }, 1000)
    }
  }

  // Setup reduced motion support
  private setupReducedMotion(): void {
    if (!ACCESSIBILITY_CONFIG.reducedMotion) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion')
      } else {
        document.documentElement.classList.remove('reduce-motion')
      }
    }

    mediaQuery.addEventListener('change', handleReducedMotion)
    
    // Initial check
    if (mediaQuery.matches) {
      document.documentElement.classList.add('reduce-motion')
    }
  }

  // Setup high contrast support
  private setupHighContrast(): void {
    if (!ACCESSIBILITY_CONFIG.highContrast) return

    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    
    const handleHighContrast = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('high-contrast')
      } else {
        document.documentElement.classList.remove('high-contrast')
      }
    }

    mediaQuery.addEventListener('change', handleHighContrast)
    
    // Initial check
    if (mediaQuery.matches) {
      document.documentElement.classList.add('high-contrast')
    }
  }

  // Get all focusable elements
  private getFocusableElements(): HTMLElement[] {
    const selector = this.focusableElements.join(', ')
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[]
  }
}

// ARIA Utilities
export class AriaUtils {
  // Set ARIA attributes
  static setAriaAttributes(element: HTMLElement, attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
  }

  // Remove ARIA attributes
  static removeAriaAttributes(element: HTMLElement, attributes: string[]): void {
    attributes.forEach(attr => {
      element.removeAttribute(attr)
    })
  }

  // Set ARIA label
  static setAriaLabel(element: HTMLElement, label: string): void {
    element.setAttribute('aria-label', label)
  }

  // Set ARIA described by
  static setAriaDescribedBy(element: HTMLElement, descriptionId: string): void {
    element.setAttribute('aria-describedby', descriptionId)
  }

  // Set ARIA controls
  static setAriaControls(element: HTMLElement, controlledId: string): void {
    element.setAttribute('aria-controls', controlledId)
  }

  // Set ARIA expanded
  static setAriaExpanded(element: HTMLElement, expanded: boolean): void {
    element.setAttribute('aria-expanded', expanded.toString())
  }

  // Set ARIA pressed
  static setAriaPressed(element: HTMLElement, pressed: boolean): void {
    element.setAttribute('aria-pressed', pressed.toString())
  }

  // Set ARIA selected
  static setAriaSelected(element: HTMLElement, selected: boolean): void {
    element.setAttribute('aria-selected', selected.toString())
  }

  // Set ARIA checked
  static setAriaChecked(element: HTMLElement, checked: boolean): void {
    element.setAttribute('aria-checked', checked.toString())
  }

  // Set ARIA hidden
  static setAriaHidden(element: HTMLElement, hidden: boolean): void {
    element.setAttribute('aria-hidden', hidden.toString())
  }

  // Set ARIA live region
  static setAriaLive(element: HTMLElement, live: 'off' | 'polite' | 'assertive'): void {
    element.setAttribute('aria-live', live)
  }

  // Set ARIA atomic
  static setAriaAtomic(element: HTMLElement, atomic: boolean): void {
    element.setAttribute('aria-atomic', atomic.toString())
  }

  // Set ARIA relevant
  static setAriaRelevant(element: HTMLElement, relevant: string): void {
    element.setAttribute('aria-relevant', relevant)
  }

  // Set ARIA busy
  static setAriaBusy(element: HTMLElement, busy: boolean): void {
    element.setAttribute('aria-busy', busy.toString())
  }

  // Set ARIA current
  static setAriaCurrent(element: HTMLElement, current: string): void {
    element.setAttribute('aria-current', current)
  }

  // Set ARIA invalid
  static setAriaInvalid(element: HTMLElement, invalid: boolean | 'grammar' | 'spelling'): void {
    element.setAttribute('aria-invalid', invalid.toString())
  }

  // Set ARIA required
  static setAriaRequired(element: HTMLElement, required: boolean): void {
    element.setAttribute('aria-required', required.toString())
  }

  // Set ARIA disabled
  static setAriaDisabled(element: HTMLElement, disabled: boolean): void {
    element.setAttribute('aria-disabled', disabled.toString())
  }

  // Set ARIA readonly
  static setAriaReadonly(element: HTMLElement, readonly: boolean): void {
    element.setAttribute('aria-readonly', readonly.toString())
  }

  // Set ARIA placeholder
  static setAriaPlaceholder(element: HTMLElement, placeholder: string): void {
    element.setAttribute('aria-placeholder', placeholder)
  }

  // Set ARIA autocomplete
  static setAriaAutocomplete(element: HTMLElement, autocomplete: string): void {
    element.setAttribute('aria-autocomplete', autocomplete)
  }

  // Set ARIA haspopup
  static setAriaHaspopup(element: HTMLElement, haspopup: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'): void {
    element.setAttribute('aria-haspopup', haspopup.toString())
  }

  // Set ARIA level
  static setAriaLevel(element: HTMLElement, level: number): void {
    element.setAttribute('aria-level', level.toString())
  }

  // Set ARIA posinset
  static setAriaPosinset(element: HTMLElement, posinset: number): void {
    element.setAttribute('aria-posinset', posinset.toString())
  }

  // Set ARIA setsize
  static setAriaSetsize(element: HTMLElement, setsize: number): void {
    element.setAttribute('aria-setsize', setsize.toString())
  }

  // Set ARIA sort
  static setAriaSort(element: HTMLElement, sort: 'none' | 'ascending' | 'descending' | 'other'): void {
    element.setAttribute('aria-sort', sort)
  }

  // Set ARIA valuemin
  static setAriaValuemin(element: HTMLElement, min: number): void {
    element.setAttribute('aria-valuemin', min.toString())
  }

  // Set ARIA valuemax
  static setAriaValuemax(element: HTMLElement, max: number): void {
    element.setAttribute('aria-valuemax', max.toString())
  }

  // Set ARIA valuenow
  static setAriaValuenow(element: HTMLElement, value: number): void {
    element.setAttribute('aria-valuenow', value.toString())
  }

  // Set ARIA valuetext
  static setAriaValuetext(element: HTMLElement, text: string): void {
    element.setAttribute('aria-valuetext', text)
  }
}

// Focus Management
export class FocusManager {
  private focusHistory: HTMLElement[] = []
  private maxHistorySize = 10

  // Save current focus
  saveFocus(): void {
    const activeElement = document.activeElement as HTMLElement
    if (activeElement) {
      this.focusHistory.unshift(activeElement)
      if (this.focusHistory.length > this.maxHistorySize) {
        this.focusHistory.pop()
      }
    }
  }

  // Restore previous focus
  restoreFocus(): void {
    const previousFocus = this.focusHistory.shift()
    if (previousFocus && document.contains(previousFocus)) {
      previousFocus.focus()
    }
  }

  // Trap focus within a container
  trapFocus(container: HTMLElement): void {
    const focusableElements = this.getFocusableElements(container)
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    
    // Focus the first element
    firstElement.focus()

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }

  // Get focusable elements within a container
  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'button',
      'input',
      'select',
      'textarea',
      'a[href]',
      'area[href]',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ]

    const selector = focusableSelectors.join(', ')
    return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
  }

  // Focus first focusable element
  focusFirstFocusable(container: HTMLElement): void {
    const focusableElements = this.getFocusableElements(container)
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }

  // Focus last focusable element
  focusLastFocusable(container: HTMLElement): void {
    const focusableElements = this.getFocusableElements(container)
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus()
    }
  }
}

// Color Contrast Utilities
export class ColorContrastUtils {
  // Calculate relative luminance
  static getRelativeLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  // Calculate contrast ratio
  static getContrastRatio(luminance1: number, luminance2: number): number {
    const lighter = Math.max(luminance1, luminance2)
    const darker = Math.min(luminance1, luminance2)
    return (lighter + 0.05) / (darker + 0.05)
  }

  // Check if colors meet WCAG contrast requirements
  static meetsContrastRequirements(
    color1: string,
    color2: string,
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): boolean {
    const rgb1 = this.hexToRgb(color1)
    const rgb2 = this.hexToRgb(color2)
    
    if (!rgb1 || !rgb2) return false

    const lum1 = this.getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b)
    const lum2 = this.getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b)
    const ratio = this.getContrastRatio(lum1, lum2)

    const requirements = {
      AA: { normal: 4.5, large: 3 },
      AAA: { normal: 7, large: 4.5 },
    }

    return ratio >= requirements[level][size]
  }

  // Convert hex color to RGB
  private static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null
  }
}

// Export instances and utilities
export const accessibilityManager = new AccessibilityManager()
export const ariaUtils = AriaUtils
export const focusManager = new FocusManager()
export const colorContrastUtils = ColorContrastUtils
