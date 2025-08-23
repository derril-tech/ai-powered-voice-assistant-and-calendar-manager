import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, addMonths, subMonths, addWeeks, subWeeks, parseISO, isValid, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns'
import { CALENDAR_CONFIG } from './constants'
import { Event, CalendarViewState } from '@/types'

// Calendar View Management
export class CalendarViewManager {
  private currentView: CalendarViewState['view']
  private currentDate: Date

  constructor(initialView: CalendarViewState['view'] = 'month', initialDate: Date = new Date()) {
    this.currentView = initialView
    this.currentDate = initialDate
  }

  // Get current view state
  getViewState(): CalendarViewState {
    return {
      view: this.currentView,
      currentDate: this.currentDate,
      selectedDate: null,
      selectedEvent: null,
    }
  }

  // Navigate to different views
  setView(view: CalendarViewState['view']): void {
    this.currentView = view
  }

  // Navigate to specific date
  goToDate(date: Date): void {
    this.currentDate = date
  }

  // Navigate to today
  goToToday(): void {
    this.currentDate = new Date()
  }

  // Navigate to previous period
  goToPrevious(): void {
    switch (this.currentView) {
      case 'month':
        this.currentDate = subMonths(this.currentDate, 1)
        break
      case 'week':
        this.currentDate = subWeeks(this.currentDate, 1)
        break
      case 'day':
        this.currentDate = subDays(this.currentDate, 1)
        break
    }
  }

  // Navigate to next period
  goToNext(): void {
    switch (this.currentView) {
      case 'month':
        this.currentDate = addMonths(this.currentDate, 1)
        break
      case 'week':
        this.currentDate = addWeeks(this.currentDate, 1)
        break
      case 'day':
        this.currentDate = addDays(this.currentDate, 1)
        break
    }
  }

  // Get date range for current view
  getDateRange(): { start: Date; end: Date } {
    switch (this.currentView) {
      case 'month':
        return {
          start: startOfMonth(this.currentDate),
          end: endOfMonth(this.currentDate),
        }
      case 'week':
        return {
          start: startOfWeek(this.currentDate, { weekStartsOn: 1 }), // Monday start
          end: endOfWeek(this.currentDate, { weekStartsOn: 1 }),
        }
      case 'day':
        return {
          start: this.currentDate,
          end: this.currentDate,
        }
      case 'agenda':
        return {
          start: startOfWeek(this.currentDate, { weekStartsOn: 1 }),
          end: endOfWeek(this.currentDate, { weekStartsOn: 1 }),
        }
      default:
        return {
          start: this.currentDate,
          end: this.currentDate,
        }
    }
  }

  // Get all days for current view
  getDaysForView(): Date[] {
    const { start, end } = this.getDateRange()
    
    if (this.currentView === 'day') {
      return [start]
    }

    return eachDayOfInterval({ start, end })
  }

  // Get working hours for day view
  getWorkingHours(): { start: number; end: number } {
    return CALENDAR_CONFIG.workingHours
  }

  // Get time slots for day view
  getTimeSlots(): string[] {
    const { start, end } = CALENDAR_CONFIG.workingHours
    const slots: string[] = []

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(time)
      }
    }

    return slots
  }
}

// Event Management Utilities
export class EventManager {
  // Filter events by date range
  static filterEventsByDateRange(events: Event[], startDate: Date, endDate: Date): Event[] {
    return events.filter(event => {
      const eventStart = new Date(event.startTime)
      const eventEnd = new Date(event.endTime)
      
      return eventStart <= endDate && eventEnd >= startDate
    })
  }

  // Filter events for specific date
  static filterEventsForDate(events: Event[], date: Date): Event[] {
    return events.filter(event => {
      const eventStart = new Date(event.startTime)
      return isSameDay(eventStart, date)
    })
  }

  // Sort events by start time
  static sortEventsByTime(events: Event[]): Event[] {
    return events.sort((a, b) => {
      const aStart = new Date(a.startTime)
      const bStart = new Date(b.startTime)
      return aStart.getTime() - bStart.getTime()
    })
  }

  // Group events by date
  static groupEventsByDate(events: Event[]): Record<string, Event[]> {
    const grouped: Record<string, Event[]> = {}

    events.forEach(event => {
      const dateKey = format(new Date(event.startTime), 'yyyy-MM-dd')
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })

    // Sort events within each date
    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey] = this.sortEventsByTime(grouped[dateKey])
    })

    return grouped
  }

  // Check if two events overlap
  static eventsOverlap(event1: Event, event2: Event): boolean {
    const start1 = new Date(event1.startTime)
    const end1 = new Date(event1.endTime)
    const start2 = new Date(event2.startTime)
    const end2 = new Date(event2.endTime)

    return start1 < end2 && start2 < end1
  }

  // Calculate event duration in minutes
  static getEventDuration(event: Event): number {
    const start = new Date(event.startTime)
    const end = new Date(event.endTime)
    return differenceInMinutes(end, start)
  }

  // Format event duration for display
  static formatEventDuration(event: Event): string {
    const duration = this.getEventDuration(event)
    
    if (duration < 60) {
      return `${duration}m`
    } else if (duration < 1440) { // Less than 24 hours
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
    } else {
      const days = Math.floor(duration / 1440)
      return `${days}d`
    }
  }

  // Get event position and height for day view
  static getEventPosition(event: Event, workingHours: { start: number; end: number }): {
    top: number
    height: number
    left: number
    width: number
  } {
    const start = new Date(event.startTime)
    const end = new Date(event.endTime)
    
    const startHour = start.getHours() + start.getMinutes() / 60
    const endHour = end.getHours() + end.getMinutes() / 60
    
    const top = ((startHour - workingHours.start) / (workingHours.end - workingHours.start)) * 100
    const height = ((endHour - startHour) / (workingHours.end - workingHours.start)) * 100
    
    return {
      top: Math.max(0, top),
      height: Math.max(1, height),
      left: 0,
      width: 100,
    }
  }

  // Check if event is happening now
  static isEventHappeningNow(event: Event): boolean {
    const now = new Date()
    const start = new Date(event.startTime)
    const end = new Date(event.endTime)
    
    return now >= start && now <= end
  }

  // Get upcoming events
  static getUpcomingEvents(events: Event[], count: number = 5): Event[] {
    const now = new Date()
    const upcoming = events
      .filter(event => new Date(event.startTime) > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    
    return upcoming.slice(0, count)
  }

  // Get today's events
  static getTodayEvents(events: Event[]): Event[] {
    const today = new Date()
    return this.filterEventsForDate(events, today)
  }

  // Get events for specific time range
  static getEventsForTimeRange(events: Event[], startTime: Date, endTime: Date): Event[] {
    return events.filter(event => {
      const eventStart = new Date(event.startTime)
      const eventEnd = new Date(event.endTime)
      
      return eventStart < endTime && eventEnd > startTime
    })
  }
}

// Date and Time Utilities
export class DateTimeUtils {
  // Format date for display
  static formatDate(date: Date, formatString: string = 'PPP'): string {
    return format(date, formatString)
  }

  // Format time for display
  static formatTime(date: Date, formatString: string = 'HH:mm'): string {
    return format(date, formatString)
  }

  // Check if date is today
  static isToday(date: Date): boolean {
    return isToday(date)
  }

  // Check if date is in current month
  static isCurrentMonth(date: Date): boolean {
    return isSameMonth(date, new Date())
  }

  // Check if two dates are the same
  static isSameDate(date1: Date, date2: Date): boolean {
    return isSameDay(date1, date2)
  }

  // Get relative date string
  static getRelativeDateString(date: Date): string {
    const now = new Date()
    const diffInDays = differenceInDays(date, now)

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Tomorrow'
    if (diffInDays === -1) return 'Yesterday'
    if (diffInDays > 0 && diffInDays <= 7) return `In ${diffInDays} days`
    if (diffInDays < 0 && diffInDays >= -7) return `${Math.abs(diffInDays)} days ago`

    return this.formatDate(date, 'MMM d')
  }

  // Parse date string
  static parseDate(dateString: string): Date | null {
    const parsed = parseISO(dateString)
    return isValid(parsed) ? parsed : null
  }

  // Add time to date
  static addTimeToDate(date: Date, hours: number, minutes: number = 0): Date {
    const result = new Date(date)
    result.setHours(result.getHours() + hours)
    result.setMinutes(result.getMinutes() + minutes)
    return result
  }

  // Get time difference between two dates
  static getTimeDifference(date1: Date, date2: Date): {
    days: number
    hours: number
    minutes: number
  } {
    const diffInMinutes = differenceInMinutes(date2, date1)
    const days = Math.floor(diffInMinutes / 1440)
    const hours = Math.floor((diffInMinutes % 1440) / 60)
    const minutes = diffInMinutes % 60

    return { days, hours, minutes }
  }

  // Round time to nearest interval
  static roundTimeToInterval(date: Date, intervalMinutes: number = 15): Date {
    const result = new Date(date)
    const minutes = result.getMinutes()
    const roundedMinutes = Math.round(minutes / intervalMinutes) * intervalMinutes
    
    result.setMinutes(roundedMinutes)
    result.setSeconds(0)
    result.setMilliseconds(0)
    
    return result
  }

  // Get week number
  static getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
    return Math.ceil((days + startOfYear.getDay() + 1) / 7)
  }

  // Get month name
  static getMonthName(date: Date): string {
    return format(date, 'MMMM')
  }

  // Get day name
  static getDayName(date: Date): string {
    return format(date, 'EEEE')
  }

  // Get short day name
  static getShortDayName(date: Date): string {
    return format(date, 'EEE')
  }
}

// Calendar Navigation Utilities
export class CalendarNavigation {
  // Get navigation options for current view
  static getNavigationOptions(view: CalendarViewState['view']): {
    previous: string
    next: string
    today: string
  } {
    switch (view) {
      case 'month':
        return {
          previous: 'Previous Month',
          next: 'Next Month',
          today: 'This Month',
        }
      case 'week':
        return {
          previous: 'Previous Week',
          next: 'Next Week',
          today: 'This Week',
        }
      case 'day':
        return {
          previous: 'Previous Day',
          next: 'Next Day',
          today: 'Today',
        }
      default:
        return {
          previous: 'Previous',
          next: 'Next',
          today: 'Today',
        }
    }
  }

  // Get view options
  static getViewOptions(): Array<{ value: CalendarViewState['view']; label: string }> {
    return [
      { value: 'month', label: 'Month' },
      { value: 'week', label: 'Week' },
      { value: 'day', label: 'Day' },
      { value: 'agenda', label: 'Agenda' },
    ]
  }

  // Get quick navigation dates
  static getQuickNavigationDates(): Array<{ label: string; date: Date }> {
    const now = new Date()
    return [
      { label: 'Today', date: now },
      { label: 'Tomorrow', date: addDays(now, 1) },
      { label: 'Next Week', date: addWeeks(now, 1) },
      { label: 'Next Month', date: addMonths(now, 1) },
    ]
  }
}

// Export utility instances
export const calendarViewManager = new CalendarViewManager()
export const eventManager = EventManager
export const dateTimeUtils = DateTimeUtils
export const calendarNavigation = CalendarNavigation
