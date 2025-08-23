import { PERFORMANCE_CONFIG } from './constants'

// Performance Monitoring
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map()
  private observers: Map<string, PerformanceObserver> = new Map()

  // Start performance measurement
  startMeasure(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`)
    }
  }

  // End performance measurement
  endMeasure(name: string): number | null {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = performance.getEntriesByName(name)[0]
      if (measure) {
        this.recordMetric(name, measure.duration)
        return measure.duration
      }
    }
    return null
  }

  // Record custom metric
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(value)
  }

  // Get metric statistics
  getMetricStats(name: string): {
    count: number
    average: number
    min: number
    max: number
    median: number
  } | null {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    const count = values.length
    const average = values.reduce((sum, val) => sum + val, 0) / count
    const min = sorted[0]
    const max = sorted[sorted.length - 1]
    const median = sorted[Math.floor(sorted.length / 2)]

    return { count, average, min, max, median }
  }

  // Monitor long tasks
  startLongTaskMonitoring(callback: (duration: number) => void): void {
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            callback(entry.duration)
          }
        }
      })
      
      observer.observe({ entryTypes: ['longtask'] })
      this.observers.set('longtask', observer)
    }
  }

  // Monitor layout shifts
  startLayoutShiftMonitoring(callback: (score: number) => void): void {
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback((entry as any).value)
        }
      })
      
      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.set('layout-shift', observer)
    }
  }

  // Monitor first input delay
  startFirstInputMonitoring(callback: (delay: number) => void): void {
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback((entry as any).processingStart - entry.startTime)
        }
      })
      
      observer.observe({ entryTypes: ['first-input'] })
      this.observers.set('first-input', observer)
    }
  }

  // Get Core Web Vitals
  getCoreWebVitals(): Promise<{
    LCP?: number
    FID?: number
    CLS?: number
    FCP?: number
    TTFB?: number
  }> {
    return new Promise((resolve) => {
      if (typeof PerformanceObserver === 'undefined') {
        resolve({})
        return
      }

      const vitals: any = {}
      let vitalsCount = 0

      const checkVitals = () => {
        vitalsCount++
        if (vitalsCount >= 5) {
          resolve(vitals)
        }
      }

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        vitals.LCP = lastEntry.startTime
        checkVitals()
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const firstEntry = entries[0]
        vitals.FID = (firstEntry as any).processingStart - firstEntry.startTime
        checkVitals()
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        vitals.CLS = clsValue
        checkVitals()
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        vitals.FCP = entries[0].startTime
        checkVitals()
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType('navigation')[0] as any
      if (navigationEntry) {
        vitals.TTFB = navigationEntry.responseStart - navigationEntry.requestStart
        checkVitals()
      }
    })
  }

  // Clean up observers
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }
}

// Caching Utilities
export class CacheManager {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()

  // Set cache item
  set(key: string, data: any, ttl: number = PERFORMANCE_CONFIG.cacheExpiry): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  // Get cache item
  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  // Check if key exists and is valid
  has(key: string): boolean {
    return this.get(key) !== null
  }

  // Delete cache item
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  // Clear all cache
  clear(): void {
    this.cache.clear()
  }

  // Get cache size
  size(): number {
    return this.cache.size
  }

  // Clean expired items
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

// Lazy Loading Utilities
export class LazyLoader {
  private loadedModules: Set<string> = new Set()
  private loadingModules: Map<string, Promise<any>> = new Map()

  // Lazy load module
  async loadModule<T>(modulePath: string): Promise<T> {
    if (this.loadedModules.has(modulePath)) {
      return this.getLoadedModule(modulePath)
    }

    if (this.loadingModules.has(modulePath)) {
      return this.loadingModules.get(modulePath)!
    }

    const loadPromise = this.importModule(modulePath)
    this.loadingModules.set(modulePath, loadPromise)

    try {
      const module = await loadPromise
      this.loadedModules.add(modulePath)
      this.loadingModules.delete(modulePath)
      return module
    } catch (error) {
      this.loadingModules.delete(modulePath)
      throw error
    }
  }

  // Dynamic import with error handling
  private async importModule<T>(modulePath: string): Promise<T> {
    try {
      const module = await import(modulePath)
      return module.default || module
    } catch (error) {
      console.error(`Failed to load module: ${modulePath}`, error)
      throw error
    }
  }

  // Get already loaded module
  private getLoadedModule<T>(modulePath: string): T {
    // This would need to be implemented based on your module system
    return {} as T
  }

  // Preload module
  preloadModule(modulePath: string): void {
    if (!this.loadedModules.has(modulePath) && !this.loadingModules.has(modulePath)) {
      this.loadModule(modulePath).catch(() => {
        // Silently fail for preloading
      })
    }
  }

  // Check if module is loaded
  isLoaded(modulePath: string): boolean {
    return this.loadedModules.has(modulePath)
  }

  // Check if module is loading
  isLoading(modulePath: string): boolean {
    return this.loadingModules.has(modulePath)
  }
}

// Image Optimization
export class ImageOptimizer {
  // Lazy load images
  static lazyLoadImages(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.loadAllImages()
      return
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          this.loadImage(img)
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Load all images (fallback)
  private static loadAllImages(): void {
    document.querySelectorAll('img[data-src]').forEach((img) => {
      this.loadImage(img as HTMLImageElement)
    })
  }

  // Load individual image
  private static loadImage(img: HTMLImageElement): void {
    const src = img.getAttribute('data-src')
    if (src) {
      img.src = src
      img.removeAttribute('data-src')
      img.classList.remove('lazy')
    }
  }

  // Preload critical images
  static preloadImages(urls: string[]): void {
    urls.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })
  }

  // Optimize image dimensions
  static getOptimizedImageUrl(url: string, width: number, height?: number): string {
    // This would integrate with your image optimization service
    // Example: Cloudinary, ImageKit, or Next.js Image optimization
    const params = new URLSearchParams()
    params.append('w', width.toString())
    if (height) params.append('h', height.toString())
    params.append('q', '80') // Quality
    params.append('f', 'auto') // Format

    return `${url}?${params.toString()}`
  }
}

// Bundle Analysis
export class BundleAnalyzer {
  // Get bundle size information
  static getBundleInfo(): {
    totalSize: number
    chunkCount: number
    chunks: Array<{ name: string; size: number }>
  } {
    if (typeof performance === 'undefined') {
      return { totalSize: 0, chunkCount: 0, chunks: [] }
    }

    const resources = performance.getEntriesByType('resource')
    const jsResources = resources.filter(resource => 
      resource.name.endsWith('.js') || resource.name.includes('chunk')
    )

    const chunks = jsResources.map(resource => ({
      name: resource.name.split('/').pop() || resource.name,
      size: resource.transferSize || 0,
    }))

    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0)

    return {
      totalSize,
      chunkCount: chunks.length,
      chunks,
    }
  }

  // Monitor bundle loading performance
  static monitorBundleLoading(): void {
    if (typeof PerformanceObserver === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('.js')) {
          console.log(`Bundle loaded: ${entry.name} in ${entry.duration}ms`)
        }
      })
    })

    observer.observe({ entryTypes: ['resource'] })
  }
}

// Memory Management
export class MemoryManager {
  // Monitor memory usage
  static getMemoryInfo(): {
    used: number
    total: number
    limit: number
  } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      }
    }
    return null
  }

  // Check for memory leaks
  static detectMemoryLeaks(): void {
    const memoryInfo = this.getMemoryInfo()
    if (memoryInfo) {
      const usagePercentage = (memoryInfo.used / memoryInfo.limit) * 100
      if (usagePercentage > 80) {
        console.warn('High memory usage detected:', usagePercentage.toFixed(2) + '%')
      }
    }
  }

  // Force garbage collection (if available)
  static forceGC(): void {
    if ('gc' in window) {
      (window as any).gc()
    }
  }
}

// Performance Utilities
export class PerformanceUtils {
  // Debounce function
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = PERFORMANCE_CONFIG.debounceDelay
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  // Throttle function
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number = PERFORMANCE_CONFIG.throttleDelay
  ): (...args: Parameters<T>) => void {
    let lastCall = 0
    
    return (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        func(...args)
      }
    }
  }

  // Request animation frame wrapper
  static raf<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      requestAnimationFrame(() => func(...args))
    }
  }

  // Idle callback wrapper
  static idle<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => func(...args))
      } else {
        setTimeout(() => func(...args), 1)
      }
    }
  }
}

// Export instances
export const performanceMonitor = new PerformanceMonitor()
export const cacheManager = new CacheManager()
export const lazyLoader = new LazyLoader()

// Export utility classes
export const imageOptimizer = ImageOptimizer
export const bundleAnalyzer = BundleAnalyzer
export const memoryManager = MemoryManager
export const performanceUtils = PerformanceUtils
