import { z } from 'zod'
import { VALIDATION_SCHEMAS } from './constants'

// Base validation schemas
export const baseSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  phone: z.string().regex(VALIDATION_SCHEMAS.phone, 'Please enter a valid phone number'),
  url: z.string().url('Please enter a valid URL'),
  required: z.string().min(1, 'This field is required'),
}

// User validation schemas
export const userSchemas = {
  login: z.object({
    email: baseSchemas.email,
    password: z.string().min(1, 'Password is required'),
  }),

  register: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
    email: baseSchemas.email,
    password: baseSchemas.password,
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  profile: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
    email: baseSchemas.email,
    phone: baseSchemas.phone.optional(),
    avatar: z.string().url().optional(),
    timezone: z.string().min(1, 'Timezone is required'),
    language: z.string().min(1, 'Language is required'),
  }),

  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    timezone: z.string().min(1, 'Timezone is required'),
    language: z.string().min(1, 'Language is required'),
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean(),
      calendar: z.boolean(),
      reminders: z.boolean(),
    }),
    privacy: z.object({
      shareCalendar: z.boolean(),
      showAvailability: z.boolean(),
      allowInvites: z.boolean(),
    }),
  }),
}

// Calendar event validation schemas
export const eventSchemas = {
  createEvent: z.object({
    title: z.string().min(1, 'Event title is required').max(100, 'Title must be less than 100 characters'),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    startTime: z.date({
      required_error: 'Start time is required',
      invalid_type_error: 'Please select a valid start time',
    }),
    endTime: z.date({
      required_error: 'End time is required',
      invalid_type_error: 'Please select a valid end time',
    }),
    location: z.string().max(200, 'Location must be less than 200 characters').optional(),
    type: z.enum(['meeting', 'appointment', 'reminder', 'task', 'personal', 'work', 'travel']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    isAllDay: z.boolean().default(false),
    recurrence: z.object({
      pattern: z.enum(['none', 'daily', 'weekly', 'monthly', 'yearly']).default('none'),
      interval: z.number().min(1).max(365).default(1),
      endDate: z.date().optional(),
      weekdays: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])).optional(),
    }).optional(),
    attendees: z.array(z.object({
      email: baseSchemas.email,
      name: z.string().min(1, 'Attendee name is required'),
      role: z.enum(['required', 'optional', 'resource']).default('required'),
    })).optional(),
    reminders: z.array(z.object({
      type: z.enum(['email', 'push', 'sms']),
      minutes: z.number().min(0).max(10080, 'Reminder must be within 1 week'), // 7 days in minutes
    })).optional(),
  }).refine((data) => {
    if (data.startTime && data.endTime) {
      return data.endTime > data.startTime
    }
    return true
  }, {
    message: 'End time must be after start time',
    path: ['endTime'],
  }),

  updateEvent: eventSchemas.createEvent.partial(),

  eventFilter: z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    type: z.enum(['meeting', 'appointment', 'reminder', 'task', 'personal', 'work', 'travel']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    search: z.string().max(100).optional(),
  }),
}

// Voice settings validation schemas
export const voiceSchemas = {
  settings: z.object({
    language: z.string().min(1, 'Language is required'),
    speed: z.number().min(0.5).max(2.0).default(1.0),
    pitch: z.number().min(0.5).max(2.0).default(1.0),
    volume: z.number().min(0).max(1).default(0.8),
    voice: z.string().min(1, 'Voice is required'),
    autoStart: z.boolean().default(false),
    continuous: z.boolean().default(false),
    interimResults: z.boolean().default(true),
    maxRecordingTime: z.number().min(5000).max(300000).default(30000), // 5s to 5m
    confidenceThreshold: z.number().min(0).max(1).default(0.7),
  }),

  command: z.object({
    command: z.string().min(1, 'Command is required').max(500, 'Command must be less than 500 characters'),
    confidence: z.number().min(0).max(1),
    audioBlob: z.instanceof(Blob).optional(),
  }),
}

// Form validation schemas
export const formSchemas = {
  contact: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: baseSchemas.email,
    subject: z.string().min(1, 'Subject is required').max(100, 'Subject must be less than 100 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
  }),

  feedback: z.object({
    rating: z.number().min(1).max(5),
    category: z.enum(['bug', 'feature', 'improvement', 'other']),
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
    contactEmail: baseSchemas.email.optional(),
  }),

  settings: z.object({
    general: z.object({
      theme: z.enum(['light', 'dark', 'system']),
      language: z.string().min(1, 'Language is required'),
      timezone: z.string().min(1, 'Timezone is required'),
    }),
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean(),
      desktop: z.boolean(),
      sound: z.boolean(),
    }),
    privacy: z.object({
      shareCalendar: z.boolean(),
      showAvailability: z.boolean(),
      allowInvites: z.boolean(),
      dataCollection: z.boolean(),
    }),
    voice: voiceSchemas.settings,
  }),
}

// API response validation schemas
export const apiSchemas = {
  success: z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.any(),
  }),

  error: z.object({
    success: z.boolean(),
    error: z.string(),
    code: z.string().optional(),
    details: z.any().optional(),
  }),

  paginated: z.object({
    success: z.boolean(),
    data: z.array(z.any()),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      pages: z.number(),
    }),
  }),
}

// Validation utility functions
export class ValidationUtils {
  // Validate email format
  static isValidEmail(email: string): boolean {
    return VALIDATION_SCHEMAS.email.test(email)
  }

  // Validate phone number format
  static isValidPhone(phone: string): boolean {
    return VALIDATION_SCHEMAS.phone.test(phone)
  }

  // Validate password strength
  static validatePasswordStrength(password: string): {
    isValid: boolean
    score: number
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0

    if (password.length >= 8) score += 1
    else feedback.push('At least 8 characters')

    if (/[a-z]/.test(password)) score += 1
    else feedback.push('Include lowercase letter')

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push('Include uppercase letter')

    if (/\d/.test(password)) score += 1
    else feedback.push('Include number')

    if (/[^A-Za-z0-9]/.test(password)) score += 1
    else feedback.push('Include special character')

    return {
      isValid: score >= 4,
      score: Math.min(score, 5),
      feedback: feedback.length > 0 ? feedback : ['Strong password'],
    }
  }

  // Validate URL format
  static isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Validate date range
  static isValidDateRange(startDate: Date, endDate: Date): boolean {
    return endDate > startDate
  }

  // Validate file size
  static isValidFileSize(file: File, maxSizeMB: number): boolean {
    return file.size <= maxSizeMB * 1024 * 1024
  }

  // Validate file type
  static isValidFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type)
  }

  // Sanitize input string
  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  }

  // Validate and format phone number
  static formatPhoneNumber(phone: string): string | null {
    const cleaned = phone.replace(/\D/g, '')
    
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
    }
    
    return null
  }

  // Validate credit card number (Luhn algorithm)
  static isValidCreditCard(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\D/g, '')
    
    if (cleaned.length < 13 || cleaned.length > 19) return false
    
    let sum = 0
    let isEven = false
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }

  // Validate postal code (US format)
  static isValidPostalCode(postalCode: string): boolean {
    const usPostalCode = /^\d{5}(-\d{4})?$/
    return usPostalCode.test(postalCode)
  }

  // Validate time format (HH:MM)
  static isValidTime(time: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
  }

  // Validate date format (YYYY-MM-DD)
  static isValidDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) return false
    
    const parsedDate = new Date(date)
    return !isNaN(parsedDate.getTime())
  }
}

// Form validation helpers
export class FormValidationHelpers {
  // Get field error message
  static getFieldError(fieldName: string, errors: any): string | undefined {
    return errors[fieldName]?.message
  }

  // Check if field has error
  static hasFieldError(fieldName: string, errors: any): boolean {
    return !!errors[fieldName]
  }

  // Get all error messages
  static getAllErrors(errors: any): string[] {
    return Object.values(errors).map((error: any) => error.message)
  }

  // Validate form data against schema
  static async validateFormData<T>(
    data: T,
    schema: z.ZodSchema<T>
  ): Promise<{ success: boolean; errors?: any; data?: T }> {
    try {
      const validatedData = await schema.parseAsync(data)
      return { success: true, data: validatedData }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: error.flatten().fieldErrors }
      }
      return { success: false, errors: { general: 'Validation failed' } }
    }
  }

  // Debounce validation
  static debounceValidation<T>(
    validator: (data: T) => Promise<{ success: boolean; errors?: any }>,
    delay: number = 300
  ): (data: T) => Promise<{ success: boolean; errors?: any }> {
    let timeoutId: NodeJS.Timeout
    
    return (data: T) => {
      return new Promise((resolve) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
          const result = await validator(data)
          resolve(result)
        }, delay)
      })
    }
  }
}

// Export all schemas
export const validationSchemas = {
  base: baseSchemas,
  user: userSchemas,
  event: eventSchemas,
  voice: voiceSchemas,
  form: formSchemas,
  api: apiSchemas,
}

// Export utility classes
export const validationUtils = ValidationUtils
export const formValidationHelpers = FormValidationHelpers
