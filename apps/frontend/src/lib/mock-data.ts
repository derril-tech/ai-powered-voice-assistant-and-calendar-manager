// Mock Data and Fixtures for UI Development
// This file provides realistic sample data for testing and development

import { User, Event, Calendar, VoiceCommand, Notification } from '@/types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    preferences: {
      theme: 'system',
      timezone: 'America/New_York',
      language: 'en-US',
      voiceSettings: {
        voiceId: 'en-US-Neural2-F',
        speed: 1.0,
        pitch: 1.0,
        volume: 0.8,
      },
      notificationSettings: {
        email: true,
        push: true,
        sms: false,
        reminderTime: 15,
      },
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    preferences: {
      theme: 'dark',
      timezone: 'Europe/London',
      language: 'en-GB',
      voiceSettings: {
        voiceId: 'en-GB-Neural2-A',
        speed: 1.2,
        pitch: 1.1,
        volume: 0.9,
      },
      notificationSettings: {
        email: true,
        push: true,
        sms: true,
        reminderTime: 30,
      },
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-12'),
  },
]

// Mock Calendars
export const mockCalendars: Calendar[] = [
  {
    id: '1',
    userId: '1',
    name: 'Work Calendar',
    color: 'var(--color-primary-500)',
    isDefault: true,
    events: [],
  },
  {
    id: '2',
    userId: '1',
    name: 'Personal Calendar',
    color: 'var(--color-success-500)',
    isDefault: false,
    events: [],
  },
  {
    id: '3',
    userId: '1',
    name: 'Family Calendar',
    color: 'var(--color-warning-500)',
    isDefault: false,
    events: [],
  },
]

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    calendarId: '1',
    title: 'Team Standup Meeting',
    description: 'Daily standup with the development team to discuss progress and blockers.',
    startTime: new Date('2024-01-15T09:00:00Z'),
    endTime: new Date('2024-01-15T09:30:00Z'),
    location: 'Conference Room A',
    attendees: [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        response: 'accepted',
      },
      {
        id: '2',
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        response: 'accepted',
      },
      {
        id: '3',
        email: 'mike.johnson@example.com',
        name: 'Mike Johnson',
        response: 'pending',
      },
    ],
    reminders: [
      {
        id: '1',
        eventId: '1',
        time: new Date('2024-01-15T08:45:00Z'),
        type: 'push',
        sent: false,
      },
    ],
    status: 'confirmed',
    priority: 'medium',
    tags: ['work', 'meeting', 'daily'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    calendarId: '1',
    title: 'Product Review Meeting',
    description: 'Review of the latest product features and roadmap discussion.',
    startTime: new Date('2024-01-15T14:00:00Z'),
    endTime: new Date('2024-01-15T15:00:00Z'),
    location: 'Virtual Meeting',
    attendees: [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        response: 'accepted',
      },
      {
        id: '4',
        email: 'sarah.wilson@example.com',
        name: 'Sarah Wilson',
        response: 'accepted',
      },
    ],
    reminders: [
      {
        id: '2',
        eventId: '2',
        time: new Date('2024-01-15T13:45:00Z'),
        type: 'email',
        sent: false,
      },
    ],
    status: 'confirmed',
    priority: 'high',
    tags: ['work', 'meeting', 'product'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    calendarId: '2',
    title: 'Dentist Appointment',
    description: 'Regular dental checkup and cleaning.',
    startTime: new Date('2024-01-16T10:00:00Z'),
    endTime: new Date('2024-01-16T11:00:00Z'),
    location: 'Dr. Smith Dental Clinic',
    attendees: [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        response: 'accepted',
      },
    ],
    reminders: [
      {
        id: '3',
        eventId: '3',
        time: new Date('2024-01-16T09:30:00Z'),
        type: 'push',
        sent: false,
      },
    ],
    status: 'confirmed',
    priority: 'medium',
    tags: ['personal', 'health', 'appointment'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '4',
    calendarId: '3',
    title: 'Family Dinner',
    description: 'Weekly family dinner at mom\'s house.',
    startTime: new Date('2024-01-17T18:00:00Z'),
    endTime: new Date('2024-01-17T20:00:00Z'),
    location: 'Mom\'s House',
    attendees: [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        response: 'accepted',
      },
      {
        id: '5',
        email: 'mom@example.com',
        name: 'Mom',
        response: 'accepted',
      },
    ],
    reminders: [
      {
        id: '4',
        eventId: '4',
        time: new Date('2024-01-17T17:30:00Z'),
        type: 'push',
        sent: false,
      },
    ],
    status: 'confirmed',
    priority: 'low',
    tags: ['family', 'dinner', 'personal'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
]

// Mock Voice Commands
export const mockVoiceCommands: VoiceCommand[] = [
  {
    id: '1',
    userId: '1',
    command: 'Schedule a meeting with the team for tomorrow at 2pm',
    intent: 'schedule_meeting',
    entities: [
      { type: 'attendee', value: 'team', confidence: 0.9 },
      { type: 'time', value: 'tomorrow at 2pm', confidence: 0.95 },
    ],
    confidence: 0.92,
    createdAt: new Date('2024-01-15T08:30:00Z'),
  },
  {
    id: '2',
    userId: '1',
    command: 'What\'s on my calendar today?',
    intent: 'check_calendar',
    entities: [
      { type: 'time', value: 'today', confidence: 0.98 },
    ],
    confidence: 0.95,
    createdAt: new Date('2024-01-15T09:15:00Z'),
  },
  {
    id: '3',
    userId: '1',
    command: 'Cancel my 3pm meeting',
    intent: 'cancel_event',
    entities: [
      { type: 'time', value: '3pm', confidence: 0.88 },
    ],
    confidence: 0.87,
    createdAt: new Date('2024-01-15T10:00:00Z'),
  },
  {
    id: '4',
    userId: '1',
    command: 'Set a reminder to call mom in 2 hours',
    intent: 'set_reminder',
    entities: [
      { type: 'action', value: 'call mom', confidence: 0.9 },
      { type: 'time', value: 'in 2 hours', confidence: 0.85 },
    ],
    confidence: 0.89,
    createdAt: new Date('2024-01-15T11:30:00Z'),
  },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Meeting Reminder',
    message: 'Team Standup Meeting starts in 15 minutes',
    type: 'info',
    read: false,
    createdAt: new Date('2024-01-15T08:45:00Z'),
  },
  {
    id: '2',
    userId: '1',
    title: 'Event Created',
    message: 'Product Review Meeting has been scheduled for tomorrow at 2pm',
    type: 'success',
    read: true,
    createdAt: new Date('2024-01-14T16:30:00Z'),
  },
  {
    id: '3',
    userId: '1',
    title: 'Voice Command Processed',
    message: 'Successfully scheduled meeting with Sarah Wilson',
    type: 'success',
    read: false,
    createdAt: new Date('2024-01-15T09:00:00Z'),
  },
  {
    id: '4',
    userId: '1',
    title: 'Calendar Sync',
    message: 'Your Google Calendar has been synchronized successfully',
    type: 'info',
    read: true,
    createdAt: new Date('2024-01-15T07:00:00Z'),
  },
]

// Mock Calendar Data for Different Views
export const mockCalendarData = {
  today: mockEvents.filter(event => {
    const today = new Date()
    const eventDate = new Date(event.startTime)
    return eventDate.toDateString() === today.toDateString()
  }),
  thisWeek: mockEvents.filter(event => {
    const today = new Date()
    const eventDate = new Date(event.startTime)
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))
    return eventDate >= weekStart && eventDate <= weekEnd
  }),
  upcoming: mockEvents.filter(event => {
    const now = new Date()
    const eventDate = new Date(event.startTime)
    return eventDate > now
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
}

// Mock Voice Recognition Results
export const mockVoiceRecognitionResults = {
  highConfidence: {
    transcript: 'Schedule a meeting with the team for tomorrow at 2pm',
    confidence: 0.95,
    isFinal: true,
  },
  mediumConfidence: {
    transcript: 'What\'s on my calendar today',
    confidence: 0.78,
    isFinal: true,
  },
  lowConfidence: {
    transcript: 'Set reminder call mom',
    confidence: 0.65,
    isFinal: true,
  },
  interim: {
    transcript: 'Schedule a meeting with...',
    confidence: 0.45,
    isFinal: false,
  },
}

// Mock AI Processing Results
export const mockAIProcessingResults = {
  scheduleMeeting: {
    intent: 'schedule_meeting',
    entities: {
      attendees: ['team'],
      time: 'tomorrow at 2pm',
      duration: '1 hour',
      title: 'Team Meeting',
    },
    confidence: 0.92,
    suggestedActions: [
      'Create calendar event',
      'Send invitations',
      'Set reminder',
    ],
  },
  checkCalendar: {
    intent: 'check_calendar',
    entities: {
      time: 'today',
      view: 'day',
    },
    confidence: 0.95,
    suggestedActions: [
      'Show today\'s events',
      'Display calendar view',
    ],
  },
  setReminder: {
    intent: 'set_reminder',
    entities: {
      action: 'call mom',
      time: 'in 2 hours',
    },
    confidence: 0.89,
    suggestedActions: [
      'Create reminder',
      'Set notification',
    ],
  },
}

// Export all mock data
export const mockData = {
  users: mockUsers,
  calendars: mockCalendars,
  events: mockEvents,
  voiceCommands: mockVoiceCommands,
  notifications: mockNotifications,
  calendarData: mockCalendarData,
  voiceRecognition: mockVoiceRecognitionResults,
  aiProcessing: mockAIProcessingResults,
}

export default mockData
