import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isToday, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date utilities
export function formatDate(date: Date, formatString: string = "PPP"): string {
  return format(date, formatString)
}

export function formatTime(date: Date, formatString: string = "p"): string {
  return format(date, formatString)
}

export function isCurrentDay(date: Date): boolean {
  return isToday(date)
}

export function isCurrentMonth(date: Date): boolean {
  return isSameMonth(date, new Date())
}

export function getDaysInMonth(date: Date): Date[] {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return eachDayOfInterval({ start, end })
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2)
}

// Voice utilities
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.8) return "text-green-600"
  if (confidence >= 0.6) return "text-yellow-600"
  return "text-red-600"
}

// Event utilities
export function getEventDuration(startTime: Date, endTime: Date): number {
  return (endTime.getTime() - startTime.getTime()) / (1000 * 60) // minutes
}

export function formatEventDuration(startTime: Date, endTime: Date): string {
  const duration = getEventDuration(startTime, endTime)
  if (duration < 60) {
    return `${duration} min`
  }
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

// Storage utilities
export function setLocalStorage(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getLocalStorage(key: string): any {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }
  return null
}

export function removeLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

// Theme utilities
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

export function applyTheme(theme: 'light' | 'dark' | 'system'): void {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement
    const actualTheme = theme === 'system' ? getSystemTheme() : theme
    root.classList.remove('light', 'dark')
    root.classList.add(actualTheme)
  }
}

// API utilities
export function handleApiError(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
