// Usage Examples for All Utilities
// This file provides concrete examples of how to use each utility in the application

import {
  // Core utilities
  cn,
  formatDate,
  formatTime,
  debounce,
  throttle,
  
  // Constants
  API_CONFIG,
  VOICE_CONFIG,
  CALENDAR_CONFIG,
  UI_CONFIG,
  
  // API utilities
  apiClient,
  authApi,
  calendarApi,
  voiceApi,
  userApi,
  wsClient,
  
  // Validation
  validationSchemas,
  validationUtils,
  formValidationHelpers,
  
  // Voice processing
  voiceProcessor,
  VOICE_COMMAND_TEMPLATES,
  VOICE_COMMAND_EXAMPLES,
  
  // Calendar utilities
  calendarViewManager,
  eventManager,
  dateTimeUtils,
  calendarNavigation,
  
  // Performance
  performanceMonitor,
  cacheManager,
  lazyLoader,
  performanceUtils,
  
  // Accessibility
  accessibilityManager,
  ariaUtils,
  focusManager,
  colorContrastUtils,
  
  // Common constants
  COMMON_PATTERNS,
  COMMON_ERRORS,
  COMMON_SUCCESS,
  LOADING_STATES,
  BUTTON_VARIANTS,
  TOAST_TYPES,
} from './index'

// ============================================================================
// UTILITY USAGE EXAMPLES
// ============================================================================

// 1. UTILS EXAMPLES
export const utilsExamples = {
  // Class name merging
  classNameExample: () => {
    const baseClass = 'bg-blue-500 text-white'
    const conditionalClass = true ? 'hover:bg-blue-600' : ''
    const variantClass = 'rounded-lg px-4 py-2'
    
    const finalClass = cn(baseClass, conditionalClass, variantClass)
    // Result: 'bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2'
  },

  // Date formatting
  dateFormattingExample: () => {
    const date = new Date()
    
    const formattedDate = formatDate(date, 'PPP') // January 15, 2024
    const formattedTime = formatTime(date, 'HH:mm') // 14:30
    const relativeDate = dateTimeUtils.getRelativeDateString(date) // Today
  },

  // Debouncing
  debounceExample: () => {
    const handleSearch = debounce((searchTerm: string) => {
      // Perform search API call
      console.log('Searching for:', searchTerm)
    }, 300)

    // Usage in input change handler
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value)
    }
  },

  // Throttling
  throttleExample: () => {
    const handleScroll = throttle(() => {
      // Update scroll position
      console.log('Scroll position updated')
    }, 100)

    // Usage in scroll event
    window.addEventListener('scroll', handleScroll)
  },
}

// 2. API EXAMPLES
export const apiExamples = {
  // Authentication
  authExample: async () => {
    try {
      // Login
      const loginResponse = await authApi.login('user@example.com', 'password123')
      console.log('Login successful:', loginResponse.data.user)

      // Get profile
      const profileResponse = await authApi.getProfile()
      console.log('User profile:', profileResponse.data)

      // Logout
      await authApi.logout()
      console.log('Logged out successfully')
    } catch (error) {
      console.error('Auth error:', error)
    }
  },

  // Calendar operations
  calendarExample: async () => {
    try {
      // Get events
      const eventsResponse = await calendarApi.getEvents({
        start_date: '2024-01-01',
        end_date: '2024-01-31',
        view: 'month'
      })
      console.log('Calendar events:', eventsResponse.data)

      // Create event
      const newEvent = await calendarApi.createEvent({
        title: 'Team Meeting',
        startTime: new Date('2024-01-15T14:00:00Z'),
        endTime: new Date('2024-01-15T15:00:00Z'),
        type: 'meeting',
        priority: 'high'
      })
      console.log('Event created:', newEvent.data)

      // Update event
      const updatedEvent = await calendarApi.updateEvent(newEvent.data.id, {
        title: 'Updated Team Meeting'
      })
      console.log('Event updated:', updatedEvent.data)

      // Delete event
      await calendarApi.deleteEvent(newEvent.data.id)
      console.log('Event deleted')
    } catch (error) {
      console.error('Calendar error:', error)
    }
  },

  // Voice processing
  voiceExample: async () => {
    try {
      // Process voice command
      const commandResponse = await voiceApi.processCommand('Schedule a meeting tomorrow at 2 PM')
      console.log('Voice command processed:', commandResponse.data)

      // Get voice history
      const historyResponse = await voiceApi.getHistory({ page: 1, limit: 10 })
      console.log('Voice history:', historyResponse.data)
    } catch (error) {
      console.error('Voice error:', error)
    }
  },

  // WebSocket usage
  websocketExample: () => {
    // Connect to WebSocket
    wsClient.connect()

    // Listen for real-time updates
    wsClient.on('event_created', (data) => {
      console.log('New event created:', data)
    })

    wsClient.on('event_updated', (data) => {
      console.log('Event updated:', data)
    })

    // Send message
    wsClient.send('ping', { timestamp: Date.now() })

    // Disconnect
    wsClient.disconnect()
  },
}

// 3. VALIDATION EXAMPLES
export const validationExamples = {
  // Form validation
  formValidationExample: async () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123',
      confirmPassword: 'SecurePass123'
    }

    try {
      const result = await formValidationHelpers.validateFormData(
        formData,
        validationSchemas.user.register
      )

      if (result.success) {
        console.log('Form is valid:', result.data)
      } else {
        console.log('Form errors:', result.errors)
      }
    } catch (error) {
      console.error('Validation error:', error)
    }
  },

  // Password strength validation
  passwordStrengthExample: () => {
    const password = 'MySecurePass123!'
    const strength = validationUtils.validatePasswordStrength(password)
    
    console.log('Password strength:', {
      isValid: strength.isValid,
      score: strength.score,
      feedback: strength.feedback
    })
  },

  // Email validation
  emailValidationExample: () => {
    const email = 'user@example.com'
    const isValid = validationUtils.isValidEmail(email)
    console.log('Email valid:', isValid)
  },

  // Phone validation
  phoneValidationExample: () => {
    const phone = '+1 (555) 123-4567'
    const isValid = validationUtils.isValidPhone(phone)
    const formatted = validationUtils.formatPhoneNumber(phone)
    
    console.log('Phone valid:', isValid)
    console.log('Formatted phone:', formatted)
  },
}

// 4. VOICE PROCESSING EXAMPLES
export const voiceProcessingExamples = {
  // Process voice input
  processVoiceInputExample: async () => {
    const transcript = 'Schedule a meeting with John tomorrow at 2 PM'
    const confidence = 0.95

    const command = await voiceProcessor.processVoiceInput(transcript, confidence)
    
    console.log('Processed command:', {
      intent: command.intent,
      entities: command.entities,
      confidence: command.confidence
    })
  },

  // Check command support
  commandSupportExample: () => {
    const command = 'Schedule a meeting'
    const isSupported = voiceProcessor.isCommandSupported(command)
    console.log('Command supported:', isSupported)
  },

  // Get command suggestions
  commandSuggestionsExample: () => {
    const partialInput = 'schedule'
    const suggestions = voiceProcessor.getCommandSuggestions(partialInput)
    console.log('Command suggestions:', suggestions)
  },

  // Parse date/time
  dateTimeParsingExample: () => {
    const text = 'tomorrow at 2 PM for 1 hour'
    const parsed = voiceProcessor.parseDateTime(text)
    
    console.log('Parsed date/time:', {
      date: parsed.date,
      time: parsed.time,
      duration: parsed.duration
    })
  },
}

// 5. CALENDAR UTILITIES EXAMPLES
export const calendarExamples = {
  // Calendar view management
  viewManagementExample: () => {
    // Set view
    calendarViewManager.setView('week')
    
    // Navigate
    calendarViewManager.goToNext()
    calendarViewManager.goToPrevious()
    calendarViewManager.goToToday()
    
    // Get current state
    const viewState = calendarViewManager.getViewState()
    console.log('Current view state:', viewState)
  },

  // Event management
  eventManagementExample: () => {
    const events = [
      {
        id: '1',
        title: 'Meeting 1',
        startTime: new Date('2024-01-15T10:00:00Z'),
        endTime: new Date('2024-01-15T11:00:00Z')
      },
      {
        id: '2',
        title: 'Meeting 2',
        startTime: new Date('2024-01-15T14:00:00Z'),
        endTime: new Date('2024-01-15T15:00:00Z')
      }
    ]

    // Filter events by date
    const today = new Date()
    const todayEvents = eventManager.filterEventsForDate(events, today)
    console.log('Today\'s events:', todayEvents)

    // Sort events
    const sortedEvents = eventManager.sortEventsByTime(events)
    console.log('Sorted events:', sortedEvents)

    // Group events by date
    const groupedEvents = eventManager.groupEventsByDate(events)
    console.log('Grouped events:', groupedEvents)

    // Check if events overlap
    const overlap = eventManager.eventsOverlap(events[0], events[1])
    console.log('Events overlap:', overlap)

    // Get event duration
    const duration = eventManager.getEventDuration(events[0])
    console.log('Event duration (minutes):', duration)
  },

  // Date/time utilities
  dateTimeExample: () => {
    const date = new Date()
    
    // Format date
    const formattedDate = dateTimeUtils.formatDate(date, 'PPP')
    console.log('Formatted date:', formattedDate)

    // Check if today
    const isToday = dateTimeUtils.isToday(date)
    console.log('Is today:', isToday)

    // Get relative date string
    const relativeDate = dateTimeUtils.getRelativeDateString(date)
    console.log('Relative date:', relativeDate)

    // Get time difference
    const futureDate = new Date(date.getTime() + 24 * 60 * 60 * 1000) // Tomorrow
    const timeDiff = dateTimeUtils.getTimeDifference(date, futureDate)
    console.log('Time difference:', timeDiff)
  },
}

// 6. PERFORMANCE EXAMPLES
export const performanceExamples = {
  // Performance monitoring
  monitoringExample: () => {
    // Start measurement
    performanceMonitor.startMeasure('api-call')
    
    // Simulate API call
    setTimeout(() => {
      const duration = performanceMonitor.endMeasure('api-call')
      console.log('API call duration:', duration)
    }, 1000)

    // Monitor long tasks
    performanceMonitor.startLongTaskMonitoring((duration) => {
      console.log('Long task detected:', duration)
    })

    // Get Core Web Vitals
    performanceMonitor.getCoreWebVitals().then((vitals) => {
      console.log('Core Web Vitals:', vitals)
    })
  },

  // Caching
  cachingExample: () => {
    // Set cache
    cacheManager.set('user-profile', { name: 'John', email: 'john@example.com' }, 300000) // 5 minutes

    // Get cache
    const profile = cacheManager.get('user-profile')
    console.log('Cached profile:', profile)

    // Check if exists
    const exists = cacheManager.has('user-profile')
    console.log('Cache exists:', exists)

    // Cleanup expired items
    cacheManager.cleanup()
  },

  // Lazy loading
  lazyLoadingExample: async () => {
    // Load module
    const module = await lazyLoader.loadModule('./heavy-component')
    console.log('Module loaded:', module)

    // Preload module
    lazyLoader.preloadModule('./another-component')

    // Check loading status
    const isLoaded = lazyLoader.isLoaded('./heavy-component')
    const isLoading = lazyLoader.isLoading('./another-component')
    
    console.log('Module loaded:', isLoaded)
    console.log('Module loading:', isLoading)
  },

  // Performance utilities
  performanceUtilsExample: () => {
    // Debounce function
    const debouncedSearch = performanceUtils.debounce((query: string) => {
      console.log('Searching for:', query)
    }, 300)

    // Throttle function
    const throttledScroll = performanceUtils.throttle(() => {
      console.log('Scroll event throttled')
    }, 100)

    // RAF wrapper
    const rafUpdate = performanceUtils.raf(() => {
      console.log('Updated with RAF')
    })

    // Idle callback
    const idleTask = performanceUtils.idle(() => {
      console.log('Idle task executed')
    })
  },
}

// 7. ACCESSIBILITY EXAMPLES
export const accessibilityExamples = {
  // Initialize accessibility
  initExample: () => {
    accessibilityManager.init()
  },

  // ARIA attributes
  ariaExample: () => {
    const button = document.createElement('button')
    
    // Set ARIA attributes
    ariaUtils.setAriaLabel(button, 'Close dialog')
    ariaUtils.setAriaExpanded(button, false)
    ariaUtils.setAriaPressed(button, false)
    
    // Set multiple attributes
    ariaUtils.setAriaAttributes(button, {
      'aria-describedby': 'button-description',
      'aria-controls': 'dialog-content',
      'aria-haspopup': 'dialog'
    })
  },

  // Focus management
  focusExample: () => {
    const modal = document.createElement('div')
    
    // Save current focus
    focusManager.saveFocus()
    
    // Trap focus in modal
    const cleanup = focusManager.trapFocus(modal)
    
    // Restore focus when modal closes
    const closeModal = () => {
      cleanup()
      focusManager.restoreFocus()
    }
  },

  // Color contrast
  contrastExample: () => {
    const meetsAA = colorContrastUtils.meetsContrastRequirements('#000000', '#FFFFFF', 'AA')
    const meetsAAA = colorContrastUtils.meetsContrastRequirements('#000000', '#FFFFFF', 'AAA')
    
    console.log('Meets AA contrast:', meetsAA)
    console.log('Meets AAA contrast:', meetsAAA)
  },

  // Announce to screen readers
  announceExample: () => {
    accessibilityManager.announceMessage('New event created successfully', 'status')
    accessibilityManager.announceMessage('Error: Failed to save event', 'alert')
  },
}

// 8. REACT COMPONENT EXAMPLES
export const reactComponentExamples = {
  // Button component with variants
  buttonExample: () => {
    const buttonVariants = {
      [BUTTON_VARIANTS.DEFAULT]: 'bg-primary text-primary-foreground hover:bg-primary/90',
      [BUTTON_VARIANTS.DESTRUCTIVE]: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      [BUTTON_VARIANTS.OUTLINE]: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      [BUTTON_VARIANTS.SECONDARY]: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      [BUTTON_VARIANTS.GHOST]: 'hover:bg-accent hover:text-accent-foreground',
      [BUTTON_VARIANTS.LINK]: 'text-primary underline-offset-4 hover:underline',
    }

    const buttonSizes = {
      [BUTTON_SIZES.SM]: 'h-9 px-3',
      [BUTTON_SIZES.MD]: 'h-10 px-4 py-2',
      [BUTTON_SIZES.LG]: 'h-11 px-8',
    }

    // Usage in component
    const getButtonClasses = (variant: string, size: string) => {
      return cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        buttonVariants[variant],
        buttonSizes[size]
      )
    }
  },

  // Form validation in React
  formValidationExample: () => {
    const validateForm = async (data: any) => {
      try {
        const result = await formValidationHelpers.validateFormData(
          data,
          validationSchemas.user.register
        )
        
        if (result.success) {
          // Submit form
          console.log('Form submitted:', result.data)
        } else {
          // Show errors
          console.log('Form errors:', result.errors)
        }
      } catch (error) {
        console.error('Validation error:', error)
      }
    }
  },

  // Voice input component
  voiceInputExample: () => {
    const handleVoiceInput = async (transcript: string, confidence: number) => {
      try {
        const command = await voiceProcessor.processVoiceInput(transcript, confidence)
        
        if (command.intent.type === 'schedule') {
          // Handle scheduling intent
          console.log('Scheduling event:', command.entities)
        } else if (command.intent.type === 'show') {
          // Handle show intent
          console.log('Showing calendar:', command.entities)
        }
      } catch (error) {
        console.error('Voice processing error:', error)
      }
    }
  },

  // Calendar component
  calendarComponentExample: () => {
    const CalendarComponent = () => {
      // Get current view state
      const viewState = calendarViewManager.getViewState()
      
      // Get events for current view
      const { start, end } = calendarViewManager.getDateRange()
      const events = eventManager.filterEventsByDateRange([], start, end)
      
      // Handle navigation
      const handleNext = () => calendarViewManager.goToNext()
      const handlePrevious = () => calendarViewManager.goToPrevious()
      const handleToday = () => calendarViewManager.goToToday()
      
      return {
        viewState,
        events,
        handleNext,
        handlePrevious,
        handleToday
      }
    }
  },
}

// 9. ERROR HANDLING EXAMPLES
export const errorHandlingExamples = {
  // API error handling
  apiErrorExample: async () => {
    try {
      const response = await calendarApi.getEvents()
      console.log('Events:', response.data)
    } catch (error: any) {
      if (error.message === COMMON_ERRORS.unauthorized) {
        // Redirect to login
        console.log('User not authenticated')
      } else if (error.message === COMMON_ERRORS.networkError) {
        // Show network error message
        console.log('Network error occurred')
      } else {
        // Show generic error
        console.log('An error occurred:', error.message)
      }
    }
  },

  // Validation error handling
  validationErrorExample: () => {
    const handleValidationError = (errors: any) => {
      Object.entries(errors).forEach(([field, error]) => {
        console.log(`Field ${field}:`, error)
      })
    }
  },

  // Performance error handling
  performanceErrorExample: () => {
    const handlePerformanceError = (error: any) => {
      console.error('Performance error:', error)
      // Log to monitoring service
    }
  },
}

// 10. INTEGRATION EXAMPLES
export const integrationExamples = {
  // Complete voice-to-calendar flow
  voiceToCalendarFlow: async () => {
    try {
      // 1. Process voice input
      const transcript = 'Schedule a meeting with John tomorrow at 2 PM for 1 hour'
      const command = await voiceProcessor.processVoiceInput(transcript, 0.95)

      // 2. Validate command
      if (command.intent.type === 'schedule') {
        // 3. Extract entities
        const timeEntity = command.entities.find(e => e.type === 'time')
        const dateEntity = command.entities.find(e => e.type === 'date')
        const personEntity = command.entities.find(e => e.type === 'person')

        // 4. Parse date/time
        const parsed = voiceProcessor.parseDateTime(transcript)

        // 5. Create calendar event
        const eventData = {
          title: `Meeting with ${personEntity?.value || 'someone'}`,
          startTime: parsed.date || new Date(),
          endTime: parsed.date ? new Date(parsed.date.getTime() + (parsed.duration || 60) * 60000) : new Date(),
          type: 'meeting',
          priority: 'medium'
        }

        // 6. Validate event data
        const validation = await formValidationHelpers.validateFormData(
          eventData,
          validationSchemas.event.createEvent
        )

        if (validation.success) {
          // 7. Create event via API
          const event = await calendarApi.createEvent(validation.data!)

          // 8. Announce success
          accessibilityManager.announceMessage('Meeting scheduled successfully', 'status')

          // 9. Show success message
          console.log(COMMON_SUCCESS.created)

          return event.data
        } else {
          throw new Error('Invalid event data')
        }
      }
    } catch (error) {
      console.error('Voice-to-calendar error:', error)
      accessibilityManager.announceMessage('Failed to schedule meeting', 'alert')
    }
  },

  // Real-time calendar updates
  realTimeCalendarUpdates: () => {
    // 1. Connect WebSocket
    wsClient.connect()

    // 2. Listen for updates
    wsClient.on('event_created', (data) => {
      // Update local state
      console.log('New event:', data)
      
      // Announce to screen reader
      accessibilityManager.announceMessage('New event added to calendar', 'status')
    })

    wsClient.on('event_updated', (data) => {
      // Update local state
      console.log('Event updated:', data)
      
      // Announce to screen reader
      accessibilityManager.announceMessage('Event updated', 'status')
    })

    wsClient.on('event_deleted', (data) => {
      // Update local state
      console.log('Event deleted:', data)
      
      // Announce to screen reader
      accessibilityManager.announceMessage('Event removed from calendar', 'status')
    })
  },

  // Performance monitoring integration
  performanceMonitoringIntegration: () => {
    // 1. Monitor page load
    performanceMonitor.startMeasure('page-load')
    
    window.addEventListener('load', () => {
      const loadTime = performanceMonitor.endMeasure('page-load')
      console.log('Page load time:', loadTime)
    })

    // 2. Monitor API calls
    const monitorApiCall = async (apiCall: () => Promise<any>) => {
      performanceMonitor.startMeasure('api-call')
      try {
        const result = await apiCall()
        performanceMonitor.endMeasure('api-call')
        return result
      } catch (error) {
        performanceMonitor.endMeasure('api-call')
        throw error
      }
    }

    // 3. Monitor user interactions
    const monitorInteraction = (interaction: () => void) => {
      performanceMonitor.startMeasure('user-interaction')
      interaction()
      performanceMonitor.endMeasure('user-interaction')
    }
  },
}

// Export all examples
export const allExamples = {
  utils: utilsExamples,
  api: apiExamples,
  validation: validationExamples,
  voice: voiceProcessingExamples,
  calendar: calendarExamples,
  performance: performanceExamples,
  accessibility: accessibilityExamples,
  react: reactComponentExamples,
  errorHandling: errorHandlingExamples,
  integration: integrationExamples,
}
