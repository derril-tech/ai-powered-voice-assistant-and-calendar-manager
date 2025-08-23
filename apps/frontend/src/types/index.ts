// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  language: string;
  voiceSettings: VoiceSettings;
  notificationSettings: NotificationSettings;
}

export interface VoiceSettings {
  voiceId: string;
  speed: number;
  pitch: number;
  volume: number;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  reminderTime: number; // minutes before event
}

// Calendar and Event types
export interface Calendar {
  id: string;
  userId: string;
  name: string;
  color: string;
  isDefault: boolean;
  events: Event[];
}

export interface Event {
  id: string;
  calendarId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees: Attendee[];
  reminders: Reminder[];
  recurrence?: Recurrence;
  status: EventStatus;
  priority: EventPriority;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendee {
  id: string;
  email: string;
  name: string;
  response: AttendeeResponse;
}

export type AttendeeResponse = 'accepted' | 'declined' | 'pending' | 'tentative';

export interface Reminder {
  id: string;
  eventId: string;
  time: Date;
  type: ReminderType;
  sent: boolean;
}

export type ReminderType = 'email' | 'push' | 'sms' | 'voice';

export interface Recurrence {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  endAfterOccurrences?: number;
  daysOfWeek?: number[]; // 0-6, Sunday-Saturday
  dayOfMonth?: number;
}

export type EventStatus = 'confirmed' | 'tentative' | 'cancelled';
export type EventPriority = 'low' | 'medium' | 'high';

// Voice Assistant types
export interface VoiceCommand {
  id: string;
  userId: string;
  command: string;
  intent: VoiceIntent;
  entities: VoiceEntity[];
  confidence: number;
  processed: boolean;
  response?: string;
  createdAt: Date;
}

export interface VoiceIntent {
  type: 'create_event' | 'check_schedule' | 'update_event' | 'delete_event' | 'set_reminder' | 'check_weather' | 'general_query';
  confidence: number;
}

export interface VoiceEntity {
  type: 'person' | 'date' | 'time' | 'location' | 'duration' | 'priority';
  value: string;
  confidence: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// WebSocket types
export interface WebSocketMessage {
  type: 'voice_command' | 'event_update' | 'reminder' | 'notification' | 'error';
  payload: any;
  timestamp: Date;
}

// Form types
export interface CreateEventForm {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees: string[];
  reminders: ReminderForm[];
  recurrence?: RecurrenceForm;
  priority: EventPriority;
  tags: string[];
}

export interface ReminderForm {
  time: Date;
  type: ReminderType;
}

export interface RecurrenceForm {
  type: Recurrence['type'];
  interval: number;
  endDate?: Date;
  endAfterOccurrences?: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
}

// UI State types
export interface VoiceRecorderState {
  isRecording: boolean;
  isProcessing: boolean;
  transcript: string;
  confidence: number;
  error?: string;
}

export interface CalendarViewState {
  view: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
  selectedDate?: Date;
  selectedEvent?: Event;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  theme: 'light' | 'dark' | 'system';
  voiceRecorder: VoiceRecorderState;
  calendarView: CalendarViewState;
}
