# Screen ↔ Endpoint ↔ DTO Matrix

This document maps the frontend screens to their corresponding backend endpoints and data transfer objects (DTOs).

## Overview

| Screen | Endpoints | DTOs | Status |
|--------|-----------|------|--------|
| Voice Console | `/api/v1/voice/process` | `VoiceProcessingRequest/Response` | ✅ Complete |
| Calendar View | `/api/v1/calendar/events` | `Event`, `CreateEventRequest` | ✅ Complete |
| Event Composer | `/api/v1/calendar/events` | `CreateEventRequest`, `UpdateEventRequest` | ✅ Complete |
| Assistant Chat | `/api/v1/voice/history` | `VoiceCommand` | ❌ Missing |
| Insights | `/api/v1/analytics/*` | `AnalyticsData` | ❌ Missing |
| Settings | `/api/v1/auth/profile` | `User`, `UserPreferences` | ❌ Partial |

---

## Detailed Mapping

### 1. Voice Console Screen

**Purpose**: Real-time voice interaction with live waveform visualization

**Frontend Components**:
- `VoiceConsole` - Main voice interface
- `VoiceAssistant` - Voice processing logic
- `VoiceProvider` - Context provider

**Backend Endpoints**:
```
POST /api/v1/voice/process
- Request: VoiceProcessingRequest
- Response: VoiceProcessingResponse
```

**DTOs**:
```typescript
// VoiceProcessingRequest
{
  audio_data: string;        // Base64 encoded audio
  user_id: string;          // User identifier
  session_id?: string;      // Voice session ID
}

// VoiceProcessingResponse
{
  success: boolean;
  data: {
    text: string;           // Transcribed text
    intent: string;         // Detected intent
    confidence: number;     // Confidence score
    entities: object;       // Extracted entities
    suggested_actions: string[];
  }
}
```

**Features**:
- ✅ Live audio visualization
- ✅ Confidence meter
- ✅ Real-time transcript
- ✅ Quick action buttons
- ✅ Voice session management

---

### 2. Calendar View Screen

**Purpose**: Multi-view calendar with event management

**Frontend Components**:
- `CalendarView` - Main calendar interface
- `EventCard` - Individual event display
- `CalendarNavigation` - View switching

**Backend Endpoints**:
```
GET /api/v1/calendar/events
- Query: start_date, end_date, calendar_id
- Response: Event[]

GET /api/v1/calendar/events/{event_id}
- Response: Event

POST /api/v1/calendar/events
- Request: CreateEventRequest
- Response: Event

PUT /api/v1/calendar/events/{event_id}
- Request: UpdateEventRequest
- Response: Event

DELETE /api/v1/calendar/events/{event_id}
- Response: 204 No Content
```

**DTOs**:
```typescript
// Event
{
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  calendar_id: string;
  user_id: string;
  attendees: Attendee[];
  reminders: Reminder[];
  status: 'confirmed' | 'tentative' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  created_at: string;
  updated_at: string;
}

// CreateEventRequest
{
  title: string;
  start_time: string;
  end_time: string;
  description?: string;
  location?: string;
  calendar_id?: string;
  attendees?: string[];
  reminders?: ReminderRequest[];
  status?: string;
  priority?: string;
  tags?: string[];
}
```

**Features**:
- ✅ Month/Week/Day views
- ✅ Event CRUD operations
- ✅ Attendee management
- ✅ Reminder settings
- ✅ Drag-and-drop support

---

### 3. Event Composer Screen

**Purpose**: Voice-first event creation and editing

**Frontend Components**:
- `EventComposer` - Main composer interface
- `AttendeeSelector` - Attendee management
- `ReminderSettings` - Reminder configuration

**Backend Endpoints**:
```
POST /api/v1/calendar/events
- Request: CreateEventRequest
- Response: Event

PUT /api/v1/calendar/events/{event_id}
- Request: UpdateEventRequest
- Response: Event
```

**DTOs**:
```typescript
// CreateEventRequest / UpdateEventRequest
{
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  attendees?: string[];
  reminders?: ReminderRequest[];
  status?: string;
  priority?: string;
  tags?: string[];
}

// ReminderRequest
{
  time: string;
  type: 'email' | 'push' | 'sms' | 'voice';
}
```

**Features**:
- ✅ Voice input support
- ✅ Attendee management
- ✅ Location and video call integration
- ✅ Buffer time settings
- ✅ Reminder configuration

---

### 4. Assistant Chat Screen

**Purpose**: Context-aware conversation interface

**Frontend Components**:
- ❌ `AssistantChat` - Missing
- ❌ `ChatMessage` - Missing
- ❌ `ChatInput` - Missing

**Backend Endpoints**:
```
GET /api/v1/voice/history
- Query: limit, offset
- Response: VoiceCommand[]

POST /api/v1/chat/conversation
- Request: ChatMessageRequest
- Response: ChatMessageResponse
```

**DTOs**:
```typescript
// ChatMessageRequest
{
  message: string;
  context?: object;
  user_id: string;
}

// ChatMessageResponse
{
  message: string;
  intent: string;
  actions: string[];
  confidence: number;
}

// VoiceCommand
{
  id: string;
  user_id: string;
  command: string;
  intent: string;
  entities: Entity[];
  confidence: number;
  created_at: string;
}
```

**Features**:
- ❌ Context-aware conversations
- ❌ Message history
- ❌ Voice command history
- ❌ Suggested actions
- ❌ Multi-turn dialogue

---

### 5. Insights Screen

**Purpose**: Meeting analytics and optimization suggestions

**Frontend Components**:
- ❌ `InsightsDashboard` - Missing
- ❌ `AnalyticsChart` - Missing
- ❌ `OptimizationSuggestions` - Missing

**Backend Endpoints**:
```
GET /api/v1/analytics/meeting-load
- Response: MeetingLoadData

GET /api/v1/analytics/focus-time
- Response: FocusTimeData

GET /api/v1/analytics/suggestions
- Response: OptimizationSuggestions
```

**DTOs**:
```typescript
// MeetingLoadData
{
  total_meetings: number;
  total_hours: number;
  average_duration: number;
  busy_days: string[];
  free_slots: TimeSlot[];
}

// FocusTimeData
{
  focus_hours: number;
  fragmentation_score: number;
  optimal_blocks: TimeBlock[];
}

// OptimizationSuggestions
{
  suggestions: Suggestion[];
  priority: 'low' | 'medium' | 'high';
  impact_score: number;
}
```

**Features**:
- ❌ Meeting load analysis
- ❌ Focus time tracking
- ❌ Optimization suggestions
- ❌ Performance metrics
- ❌ Trend visualization

---

### 6. Settings Screen

**Purpose**: User preferences and account management

**Frontend Components**:
- ❌ `SettingsPanel` - Missing
- ❌ `UserPreferences` - Missing
- ❌ `PrivacySettings` - Missing

**Backend Endpoints**:
```
GET /api/v1/auth/profile
- Response: User

PUT /api/v1/auth/profile
- Request: UpdateUserRequest
- Response: User

GET /api/v1/preferences
- Response: UserPreferences

PUT /api/v1/preferences
- Request: UpdatePreferencesRequest
- Response: UserPreferences
```

**DTOs**:
```typescript
// User
{
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

// UserPreferences
{
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  language: string;
  voice_settings: VoiceSettings;
  notification_settings: NotificationSettings;
  privacy_settings: PrivacySettings;
}

// VoiceSettings
{
  voice_id: string;
  speed: number;
  pitch: number;
  volume: number;
}
```

**Features**:
- ❌ Account management
- ❌ Voice preferences
- ❌ Notification settings
- ❌ Privacy controls
- ❌ Theme customization

---

## Missing Components Analysis

### High Priority (Core Features)
1. **Assistant Chat** - Essential for voice-first interaction
2. **Insights Dashboard** - Key differentiator for productivity
3. **Settings Panel** - Required for user customization

### Medium Priority (Enhancement)
1. **Analytics API** - Backend support for insights
2. **User Preferences** - Extended settings
3. **Chat History** - Conversation persistence

### Low Priority (Nice to Have)
1. **Advanced Analytics** - Detailed metrics
2. **Export Features** - Data portability
3. **Integration Settings** - Calendar sync config

---

## Implementation Status

| Component | Frontend | Backend | Integration | Status |
|-----------|----------|---------|-------------|--------|
| Voice Console | ✅ Complete | ✅ Complete | ✅ Complete | 🟢 Done |
| Calendar View | ✅ Complete | ✅ Complete | ✅ Complete | 🟢 Done |
| Event Composer | ✅ Complete | ✅ Complete | ✅ Complete | 🟢 Done |
| Assistant Chat | ❌ Missing | ❌ Missing | ❌ Missing | 🔴 Not Started |
| Insights | ❌ Missing | ❌ Missing | ❌ Missing | 🔴 Not Started |
| Settings | ❌ Missing | ⚠️ Partial | ❌ Missing | 🟡 In Progress |

**Legend**:
- 🟢 Complete
- 🟡 In Progress  
- 🔴 Not Started
- ⚠️ Partial Implementation
