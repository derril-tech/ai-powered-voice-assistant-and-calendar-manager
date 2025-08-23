// Main library exports
// This file serves as the central export point for all utility libraries

// Core utilities
export * from './utils'
export * from './constants'
export * from './api'
export * from './validation'

// Feature-specific utilities
export * from './voice-processor'
export * from './calendar-utils'
export * from './performance'
export * from './accessibility'

// Re-export commonly used utilities for convenience
export { cn } from './utils'
export { API_CONFIG, VOICE_CONFIG, CALENDAR_CONFIG, UI_CONFIG } from './constants'
export { apiClient, authApi, calendarApi, voiceApi, userApi, wsClient } from './api'
export { validationSchemas, validationUtils, formValidationHelpers } from './validation'
export { voiceProcessor, VOICE_COMMAND_TEMPLATES, VOICE_COMMAND_EXAMPLES } from './voice-processor'
export { calendarViewManager, eventManager, dateTimeUtils, calendarNavigation } from './calendar-utils'
export { performanceMonitor, cacheManager, lazyLoader, performanceUtils } from './performance'
export { accessibilityManager, ariaUtils, focusManager, colorContrastUtils } from './accessibility'

// Type exports
export type {
  User,
  UserPreferences,
  VoiceSettings,
  NotificationSettings,
  Calendar,
  Event,
  Attendee,
  Reminder,
  Recurrence,
  EventStatus,
  EventPriority,
  VoiceCommand,
  VoiceIntent,
  VoiceEntity,
  ApiResponse,
  PaginatedResponse,
  WebSocketMessage,
  CreateEventForm,
  ReminderForm,
  RecurrenceForm,
  VoiceRecorderState,
  CalendarViewState,
  AppState,
} from '@/types'

// Utility type helpers
export type {
  ClassValue,
} from 'clsx'

// Common patterns and configurations
export const COMMON_PATTERNS = {
  // Email validation
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Phone number (US format)
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
  
  // URL validation
  url: /^https?:\/\/.+/,
  
  // Password strength
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  
  // Date format (YYYY-MM-DD)
  date: /^\d{4}-\d{2}-\d{2}$/,
  
  // Time format (HH:MM)
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  
  // Credit card number
  creditCard: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
  
  // Postal code (US)
  postalCode: /^\d{5}(-\d{4})?$/,
} as const

// Common error messages
export const COMMON_ERRORS = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  password: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  minValue: (min: number) => `Must be at least ${min}`,
  maxValue: (max: number) => `Must be no more than ${max}`,
  invalidFormat: 'Invalid format',
  networkError: 'Network error occurred. Please try again.',
  serverError: 'Server error occurred. Please try again later.',
  unauthorized: 'You are not authorized to perform this action',
  forbidden: 'Access denied',
  notFound: 'The requested resource was not found',
} as const

// Common success messages
export const COMMON_SUCCESS = {
  saved: 'Changes saved successfully',
  created: 'Item created successfully',
  updated: 'Item updated successfully',
  deleted: 'Item deleted successfully',
  uploaded: 'File uploaded successfully',
  loggedIn: 'Successfully logged in',
  loggedOut: 'Successfully logged out',
  registered: 'Account created successfully',
  passwordChanged: 'Password changed successfully',
  emailSent: 'Email sent successfully',
} as const

// Common loading states
export const LOADING_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const

// Common breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Common z-index values
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const

// Common animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

// Common animation easings
export const ANIMATION_EASINGS = {
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Common HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

// Common HTTP methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

// Common content types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  TEXT: 'text/plain',
  HTML: 'text/html',
  XML: 'application/xml',
} as const

// Common file types
export const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  SPREADSHEET: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  PRESENTATION: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg'],
} as const

// Common file size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  SMALL: 1024 * 1024, // 1MB
  MEDIUM: 5 * 1024 * 1024, // 5MB
  LARGE: 10 * 1024 * 1024, // 10MB
  XLARGE: 50 * 1024 * 1024, // 50MB
} as const

// Common date formats
export const DATE_FORMATS = {
  ISO: 'yyyy-MM-dd',
  US: 'MM/dd/yyyy',
  EU: 'dd/MM/yyyy',
  FULL: 'EEEE, MMMM d, yyyy',
  SHORT: 'MMM d, yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM d, yyyy HH:mm',
} as const

// Common time zones
export const TIME_ZONES = {
  UTC: 'UTC',
  EST: 'America/New_York',
  CST: 'America/Chicago',
  MST: 'America/Denver',
  PST: 'America/Los_Angeles',
  GMT: 'Europe/London',
  CET: 'Europe/Paris',
  JST: 'Asia/Tokyo',
} as const

// Common languages
export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
  PT: 'pt',
  RU: 'ru',
  ZH: 'zh',
  JA: 'ja',
  KO: 'ko',
} as const

// Common currencies
export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CAD: 'CAD',
  AUD: 'AUD',
  CHF: 'CHF',
  CNY: 'CNY',
  INR: 'INR',
  BRL: 'BRL',
} as const

// Common validation rules
export const VALIDATION_RULES = {
  required: (value: any) => value !== null && value !== undefined && value !== '',
  email: (value: string) => COMMON_PATTERNS.email.test(value),
  phone: (value: string) => COMMON_PATTERNS.phone.test(value),
  url: (value: string) => COMMON_PATTERNS.url.test(value),
  minLength: (value: string, min: number) => value.length >= min,
  maxLength: (value: string, max: number) => value.length <= max,
  minValue: (value: number, min: number) => value >= min,
  maxValue: (value: number, max: number) => value <= max,
  numeric: (value: string) => /^\d+$/.test(value),
  alpha: (value: string) => /^[a-zA-Z]+$/.test(value),
  alphanumeric: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
  password: (value: string) => COMMON_PATTERNS.password.test(value),
} as const

// Common form field types
export const FORM_FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
  MONTH: 'month',
  WEEK: 'week',
  SEARCH: 'search',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file',
  HIDDEN: 'hidden',
} as const

// Common button variants
export const BUTTON_VARIANTS = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  OUTLINE: 'outline',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  LINK: 'link',
} as const

// Common button sizes
export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const

// Common badge variants
export const BADGE_VARIANTS = {
  DEFAULT: 'default',
  SECONDARY: 'secondary',
  DESTRUCTIVE: 'destructive',
  OUTLINE: 'outline',
} as const

// Common alert variants
export const ALERT_VARIANTS = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
} as const

// Common toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const

// Common modal sizes
export const MODAL_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const

// Common drawer positions
export const DRAWER_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const

// Common tooltip positions
export const TOOLTIP_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
} as const

// Common popover positions
export const POPOVER_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
} as const

// Common table sort directions
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: 'none',
} as const

// Common pagination sizes
export const PAGINATION_SIZES = {
  SM: 10,
  MD: 25,
  LG: 50,
  XL: 100,
} as const

// Common chart types
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  RADAR: 'radar',
  POLAR_AREA: 'polarArea',
  BUBBLE: 'bubble',
  SCATTER: 'scatter',
} as const

// Common notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const

// Common notification positions
export const NOTIFICATION_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
} as const

// Export all constants as a single object for easy access
export const LIBRARY_CONSTANTS = {
  COMMON_PATTERNS,
  COMMON_ERRORS,
  COMMON_SUCCESS,
  LOADING_STATES,
  BREAKPOINTS,
  Z_INDEX,
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  HTTP_STATUS,
  HTTP_METHODS,
  CONTENT_TYPES,
  FILE_TYPES,
  FILE_SIZE_LIMITS,
  DATE_FORMATS,
  TIME_ZONES,
  LANGUAGES,
  CURRENCIES,
  VALIDATION_RULES,
  FORM_FIELD_TYPES,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BADGE_VARIANTS,
  ALERT_VARIANTS,
  TOAST_TYPES,
  MODAL_SIZES,
  DRAWER_POSITIONS,
  TOOLTIP_POSITIONS,
  POPOVER_POSITIONS,
  SORT_DIRECTIONS,
  PAGINATION_SIZES,
  CHART_TYPES,
  NOTIFICATION_TYPES,
  NOTIFICATION_POSITIONS,
} as const

// Default export for convenience
export default {
  // Core utilities
  utils: require('./utils'),
  constants: require('./constants'),
  api: require('./api'),
  validation: require('./validation'),
  
  // Feature utilities
  voiceProcessor: require('./voice-processor'),
  calendarUtils: require('./calendar-utils'),
  performance: require('./performance'),
  accessibility: require('./accessibility'),
  
  // Constants
  ...LIBRARY_CONSTANTS,
}
