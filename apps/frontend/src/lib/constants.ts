// Application Constants
export const APP_CONFIG = {
  name: 'AI Voice Assistant & Calendar Manager',
  version: '1.0.0',
  description: 'Intelligent voice-powered personal assistant for seamless calendar management',
  author: 'AI Voice Assistant Team',
  supportEmail: 'support@aivoiceassistant.com',
} as const

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000',
  timeout: 30000,
  retryAttempts: 3,
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      profile: '/auth/profile',
    },
    calendar: {
      events: '/calendar/events',
      event: (id: string) => `/calendar/events/${id}`,
      create: '/calendar/events',
      update: (id: string) => `/calendar/events/${id}`,
      delete: (id: string) => `/calendar/events/${id}`,
      sync: '/calendar/sync',
    },
    voice: {
      process: '/voice/process',
      history: '/voice/history',
      settings: '/voice/settings',
    },
    user: {
      profile: '/user/profile',
      preferences: '/user/preferences',
      settings: '/user/settings',
    },
  },
} as const

// Voice Recognition Configuration
export const VOICE_CONFIG = {
  language: 'en-US',
  continuous: false,
  interimResults: true,
  maxAlternatives: 1,
  confidenceThreshold: 0.7,
  maxRecordingTime: 30000, // 30 seconds
  supportedCommands: [
    'schedule meeting',
    'create event',
    'show calendar',
    'next meeting',
    'today schedule',
    'tomorrow schedule',
    'cancel event',
    'reschedule meeting',
    'add reminder',
    'set alarm',
    'weather today',
    'send email',
    'make call',
  ],
  intentPatterns: {
    schedule: /(schedule|create|add|book)\s+(meeting|event|appointment)/i,
    show: /(show|display|view|open)\s+(calendar|schedule|events)/i,
    cancel: /(cancel|delete|remove)\s+(meeting|event|appointment)/i,
    reschedule: /(reschedule|move|change)\s+(meeting|event|appointment)/i,
    reminder: /(remind|reminder|alert)/i,
    time: /(today|tomorrow|next week|this week)/i,
  },
} as const

// Calendar Configuration
export const CALENDAR_CONFIG = {
  views: ['month', 'week', 'day', 'agenda'] as const,
  defaultView: 'month' as const,
  workingHours: {
    start: 9, // 9 AM
    end: 17, // 5 PM
  },
  eventTypes: [
    'meeting',
    'appointment',
    'reminder',
    'task',
    'personal',
    'work',
    'travel',
  ] as const,
  priorities: ['low', 'medium', 'high', 'urgent'] as const,
  colors: {
      primary: 'var(--color-primary-500)',
  secondary: 'var(--color-secondary-500)',
  success: 'var(--color-success-500)',
  warning: 'var(--color-warning-500)',
  danger: 'var(--color-error-500)',
  info: 'var(--color-primary-400)',
  },
  recurrence: {
    patterns: ['daily', 'weekly', 'monthly', 'yearly'] as const,
    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const,
  },
} as const

// UI Configuration
export const UI_CONFIG = {
  theme: {
    light: 'light',
    dark: 'dark',
    system: 'system',
  } as const,
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const

// Form Validation Schemas
export const VALIDATION_SCHEMAS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  url: /^https?:\/\/.+/,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  network: {
    connection: 'Unable to connect to server. Please check your internet connection.',
    timeout: 'Request timed out. Please try again.',
    server: 'Server error occurred. Please try again later.',
    unauthorized: 'You are not authorized to perform this action.',
    forbidden: 'Access denied.',
    notFound: 'The requested resource was not found.',
  },
  validation: {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    password: 'Password must be at least 8 characters with uppercase, lowercase, and number.',
    phone: 'Please enter a valid phone number.',
    url: 'Please enter a valid URL.',
  },
  voice: {
    notSupported: 'Voice recognition is not supported in your browser.',
    permissionDenied: 'Microphone permission denied.',
    noSpeech: 'No speech detected. Please try again.',
    audioCapture: 'Audio capture failed. Please check your microphone.',
    networkError: 'Network error during voice processing.',
  },
  calendar: {
    eventConflict: 'This time slot conflicts with an existing event.',
    invalidDate: 'Please select a valid date.',
    invalidTime: 'Please select a valid time.',
    pastDate: 'Cannot create events in the past.',
  },
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  auth: {
    login: 'Successfully logged in.',
    logout: 'Successfully logged out.',
    register: 'Account created successfully.',
    profileUpdate: 'Profile updated successfully.',
  },
  calendar: {
    eventCreated: 'Event created successfully.',
    eventUpdated: 'Event updated successfully.',
    eventDeleted: 'Event deleted successfully.',
    eventCancelled: 'Event cancelled successfully.',
  },
  voice: {
    commandProcessed: 'Voice command processed successfully.',
    listeningStarted: 'Voice recognition started.',
    listeningStopped: 'Voice recognition stopped.',
  },
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  auth: {
    token: 'auth-token',
    refreshToken: 'auth-refresh-token',
    user: 'auth-user',
  },
  preferences: {
    theme: 'theme-preference',
    language: 'language-preference',
    voiceSettings: 'voice-settings',
    calendarSettings: 'calendar-settings',
  },
  cache: {
    events: 'cached-events',
    commands: 'cached-commands',
    userProfile: 'cached-user-profile',
  },
} as const

// Feature Flags
export const FEATURE_FLAGS = {
  voiceRecognition: true,
  realTimeUpdates: true,
  offlineMode: false,
  pushNotifications: true,
  calendarSync: true,
  aiSuggestions: true,
  voiceCommands: true,
  darkMode: true,
  accessibility: true,
} as const

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  debounceDelay: 300,
  throttleDelay: 1000,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes
  maxRetries: 3,
  requestTimeout: 10000,
  imageOptimization: true,
  lazyLoading: true,
} as const

// Accessibility Configuration
export const ACCESSIBILITY_CONFIG = {
  skipLinks: true,
  focusIndicators: true,
  screenReaderSupport: true,
  keyboardNavigation: true,
  highContrast: true,
  reducedMotion: true,
  ariaLabels: {
    voiceButton: 'Toggle voice recognition',
    calendarView: 'Calendar view',
    eventCard: 'Event details',
    navigationMenu: 'Main navigation',
    themeToggle: 'Toggle theme',
  },
} as const
