# API Specification - AI-Powered Voice Assistant & Calendar Manager

## 📋 Overview

This document provides comprehensive API specifications for the AI-Powered Voice Assistant & Calendar Manager backend. The API is built with FastAPI and follows RESTful principles with WebSocket support for real-time features.

### Base Information
- **Base URL**: `http://localhost:8000/api/v1`
- **WebSocket URL**: `ws://localhost:8000/ws`
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer Token
- **API Version**: v1
- **Documentation**: Auto-generated OpenAPI/Swagger at `/docs`

---

## 🔐 Authentication

### JWT Token Structure
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

### Authentication Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Token Refresh
When the access token expires, use the refresh token to get a new one:
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

---

## 🔑 Authentication Endpoints

### POST `/api/v1/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "confirm_password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST `/api/v1/auth/login`
Authenticate user and get access tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "preferences": {
        "theme": "system",
        "timezone": "UTC",
        "language": "en",
        "voice_settings": {
          "voice_id": "en-US-Neural2-F",
          "speed": 1.0,
          "pitch": 0.0
        }
      }
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST `/api/v1/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST `/api/v1/auth/logout`
Logout user and invalidate tokens.

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### GET `/api/v1/auth/profile`
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "preferences": {
      "theme": "system",
      "timezone": "UTC",
      "language": "en",
      "voice_settings": {
        "voice_id": "en-US-Neural2-F",
        "speed": 1.0,
        "pitch": 0.0
      },
      "notification_settings": {
        "email_notifications": true,
        "push_notifications": true,
        "sms_notifications": false
      }
    },
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📅 Calendar Endpoints

### GET `/api/v1/calendar/events`
Get calendar events with filtering and pagination.

**Query Parameters:**
- `start_date` (string, optional): Start date filter (ISO format)
- `end_date` (string, optional): End date filter (ISO format)
- `view` (string, optional): View type (month, week, day, agenda)
- `type` (string, optional): Event type filter
- `priority` (string, optional): Priority filter
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "event_123",
        "title": "Team Meeting",
        "description": "Weekly team sync",
        "start_time": "2024-01-15T14:00:00Z",
        "end_time": "2024-01-15T15:00:00Z",
        "location": "Conference Room A",
        "type": "meeting",
        "priority": "high",
        "is_all_day": false,
        "recurrence": {
          "pattern": "weekly",
          "interval": 1,
          "weekdays": ["monday"],
          "end_date": "2024-12-31T23:59:59Z"
        },
        "attendees": [
          {
            "id": "attendee_123",
            "email": "jane@example.com",
            "name": "Jane Smith",
            "role": "required",
            "status": "accepted"
          }
        ],
        "reminders": [
          {
            "id": "reminder_123",
            "type": "email",
            "minutes": 15
          }
        ],
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### GET `/api/v1/calendar/events/{event_id}`
Get specific event details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "event_123",
    "title": "Team Meeting",
    "description": "Weekly team sync",
    "start_time": "2024-01-15T14:00:00Z",
    "end_time": "2024-01-15T15:00:00Z",
    "location": "Conference Room A",
    "type": "meeting",
    "priority": "high",
    "is_all_day": false,
    "recurrence": {
      "pattern": "weekly",
      "interval": 1,
      "weekdays": ["monday"],
      "end_date": "2024-12-31T23:59:59Z"
    },
    "attendees": [
      {
        "id": "attendee_123",
        "email": "jane@example.com",
        "name": "Jane Smith",
        "role": "required",
        "status": "accepted"
      }
    ],
    "reminders": [
      {
        "id": "reminder_123",
        "type": "email",
        "minutes": 15
      }
    ],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### POST `/api/v1/calendar/events`
Create a new calendar event.

**Request Body:**
```json
{
  "title": "Team Meeting",
  "description": "Weekly team sync",
  "start_time": "2024-01-15T14:00:00Z",
  "end_time": "2024-01-15T15:00:00Z",
  "location": "Conference Room A",
  "type": "meeting",
  "priority": "high",
  "is_all_day": false,
  "recurrence": {
    "pattern": "weekly",
    "interval": 1,
    "weekdays": ["monday"],
    "end_date": "2024-12-31T23:59:59Z"
  },
  "attendees": [
    {
      "email": "jane@example.com",
      "name": "Jane Smith",
      "role": "required"
    }
  ],
  "reminders": [
    {
      "type": "email",
      "minutes": 15
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "event_123",
    "title": "Team Meeting",
    "description": "Weekly team sync",
    "start_time": "2024-01-15T14:00:00Z",
    "end_time": "2024-01-15T15:00:00Z",
    "location": "Conference Room A",
    "type": "meeting",
    "priority": "high",
    "is_all_day": false,
    "recurrence": {
      "pattern": "weekly",
      "interval": 1,
      "weekdays": ["monday"],
      "end_date": "2024-12-31T23:59:59Z"
    },
    "attendees": [
      {
        "id": "attendee_123",
        "email": "jane@example.com",
        "name": "Jane Smith",
        "role": "required",
        "status": "pending"
      }
    ],
    "reminders": [
      {
        "id": "reminder_123",
        "type": "email",
        "minutes": 15
      }
    ],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### PUT `/api/v1/calendar/events/{event_id}`
Update an existing calendar event.

**Request Body:** (Same as POST, but all fields optional)

**Response:** (Same as GET single event)

### DELETE `/api/v1/calendar/events/{event_id}`
Delete a calendar event.

**Response:**
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### POST `/api/v1/calendar/events/{event_id}/attendees`
Add attendees to an event.

**Request Body:**
```json
{
  "attendees": [
    {
      "email": "bob@example.com",
      "name": "Bob Johnson",
      "role": "optional"
    }
  ]
}
```

### PUT `/api/v1/calendar/events/{event_id}/attendees/{attendee_id}`
Update attendee status.

**Request Body:**
```json
{
  "status": "accepted"
}
```

### DELETE `/api/v1/calendar/events/{event_id}/attendees/{attendee_id}`
Remove attendee from event.

### POST `/api/v1/calendar/sync`
Sync calendar with external providers.

**Request Body:**
```json
{
  "provider": "google",
  "sync_type": "full"
}
```

---

## 🎤 Voice Processing Endpoints

### POST `/api/v1/voice/process`
Process voice command and return structured response.

**Request Body (JSON):**
```json
{
  "command": "Schedule a meeting with John tomorrow at 2 PM",
  "confidence": 0.95,
  "language": "en-US",
  "context": {
    "current_date": "2024-01-15T10:30:00Z",
    "user_timezone": "UTC"
  }
}
```

**Request Body (Multipart - with audio):**
```http
POST /api/v1/voice/process
Content-Type: multipart/form-data

command: "Schedule a meeting with John tomorrow at 2 PM"
confidence: 0.95
language: "en-US"
audio: [binary audio file]
context: {"current_date": "2024-01-15T10:30:00Z", "user_timezone": "UTC"}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "voice_command_123",
    "original_command": "Schedule a meeting with John tomorrow at 2 PM",
    "processed_command": "schedule meeting with john tomorrow 2pm",
    "intent": {
      "type": "schedule_meeting",
      "confidence": 0.98,
      "entities": {
        "person": "John",
        "date": "2024-01-16",
        "time": "14:00:00",
        "duration": "60"
      }
    },
    "actions": [
      {
        "type": "create_event",
        "data": {
          "title": "Meeting with John",
          "start_time": "2024-01-16T14:00:00Z",
          "end_time": "2024-01-16T15:00:00Z",
          "attendees": [
            {
              "email": "john@example.com",
              "name": "John"
            }
          ]
        }
      }
    ],
    "response": {
      "text": "I've scheduled a meeting with John tomorrow at 2 PM for one hour.",
      "audio_url": "https://example.com/audio/response_123.mp3"
    },
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### GET `/api/v1/voice/history`
Get voice command history.

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 20)
- `start_date` (string, optional): Start date filter
- `end_date` (string, optional): End date filter
- `intent_type` (string, optional): Filter by intent type

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "voice_command_123",
        "original_command": "Schedule a meeting with John tomorrow at 2 PM",
        "intent": {
          "type": "schedule_meeting",
          "confidence": 0.98
        },
        "response": {
          "text": "I've scheduled a meeting with John tomorrow at 2 PM for one hour."
        },
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### GET `/api/v1/voice/settings`
Get voice assistant settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "voice_id": "en-US-Neural2-F",
    "speed": 1.0,
    "pitch": 0.0,
    "language": "en-US",
    "wake_word": "Hey Assistant",
    "auto_listen": false,
    "confidence_threshold": 0.8,
    "ai_model": "gpt-4",
    "features": {
      "calendar_management": true,
      "email_composition": true,
      "weather_queries": true,
      "reminder_setting": true
    }
  }
}
```

### PUT `/api/v1/voice/settings`
Update voice assistant settings.

**Request Body:**
```json
{
  "voice_id": "en-US-Neural2-F",
  "speed": 1.2,
  "pitch": 0.0,
  "language": "en-US",
  "wake_word": "Hey Assistant",
  "auto_listen": true,
  "confidence_threshold": 0.85,
  "ai_model": "gpt-4",
  "features": {
    "calendar_management": true,
    "email_composition": true,
    "weather_queries": false,
    "reminder_setting": true
  }
}
```

### POST `/api/v1/voice/feedback`
Submit feedback for voice command processing.

**Request Body:**
```json
{
  "command_id": "voice_command_123",
  "rating": 5,
  "feedback": "Perfect! The meeting was scheduled correctly.",
  "improvement_suggestions": "Could be faster"
}
```

---

## 👤 User Management Endpoints

### GET `/api/v1/users/profile`
Get user profile (same as auth/profile).

### PUT `/api/v1/users/profile`
Update user profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg"
}
```

### GET `/api/v1/users/preferences`
Get user preferences.

**Response:**
```json
{
  "success": true,
  "data": {
    "theme": "system",
    "timezone": "UTC",
    "language": "en",
    "voice_settings": {
      "voice_id": "en-US-Neural2-F",
      "speed": 1.0,
      "pitch": 0.0
    },
    "notification_settings": {
      "email_notifications": true,
      "push_notifications": true,
      "sms_notifications": false,
      "reminder_timing": 15
    },
    "calendar_settings": {
      "default_view": "month",
      "working_hours": {
        "start": "09:00",
        "end": "17:00"
      },
      "week_starts_on": "monday"
    }
  }
}
```

### PUT `/api/v1/users/preferences`
Update user preferences.

**Request Body:** (Same structure as GET response)

### GET `/api/v1/users/settings`
Get user settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "privacy": {
      "share_calendar": false,
      "allow_voice_recording": true,
      "data_retention_days": 90
    },
    "security": {
      "two_factor_enabled": false,
      "session_timeout_minutes": 60
    },
    "integrations": {
      "google_calendar": {
        "connected": true,
        "sync_enabled": true
      },
      "outlook_calendar": {
        "connected": false,
        "sync_enabled": false
      }
    }
  }
}
```

### PUT `/api/v1/users/settings`
Update user settings.

**Request Body:** (Same structure as GET response)

---

## 🔌 WebSocket Endpoints

### WebSocket Connection
**URL**: `ws://localhost:8000/ws?token=<access_token>`

### Connection Events

#### Connect
```json
{
  "type": "connect",
  "data": {
    "user_id": "user_123",
    "session_id": "session_456",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Disconnect
```json
{
  "type": "disconnect",
  "data": {
    "user_id": "user_123",
    "reason": "user_logout",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Real-time Events

#### Calendar Event Created
```json
{
  "type": "calendar_event_created",
  "data": {
    "event": {
      "id": "event_123",
      "title": "Team Meeting",
      "start_time": "2024-01-15T14:00:00Z",
      "end_time": "2024-01-15T15:00:00Z"
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Calendar Event Updated
```json
{
  "type": "calendar_event_updated",
  "data": {
    "event": {
      "id": "event_123",
      "title": "Updated Team Meeting",
      "start_time": "2024-01-15T14:00:00Z",
      "end_time": "2024-01-15T15:00:00Z"
    },
    "changes": ["title"],
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Calendar Event Deleted
```json
{
  "type": "calendar_event_deleted",
  "data": {
    "event_id": "event_123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Voice Command Processed
```json
{
  "type": "voice_command_processed",
  "data": {
    "command_id": "voice_command_123",
    "intent": {
      "type": "schedule_meeting",
      "confidence": 0.98
    },
    "response": {
      "text": "I've scheduled a meeting with John tomorrow at 2 PM."
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Notification
```json
{
  "type": "notification",
  "data": {
    "id": "notification_123",
    "title": "Meeting Reminder",
    "message": "You have a meeting in 15 minutes",
    "type": "reminder",
    "priority": "high",
    "action_url": "/calendar/events/event_123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Client Events

#### Ping
```json
{
  "type": "ping",
  "data": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Subscribe to Calendar Updates
```json
{
  "type": "subscribe",
  "data": {
    "channel": "calendar_updates",
    "user_id": "user_123"
  }
}
```

#### Unsubscribe from Calendar Updates
```json
{
  "type": "unsubscribe",
  "data": {
    "channel": "calendar_updates",
    "user_id": "user_123"
  }
}
```

---

## 📊 Error Codes

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limited
- `500` - Internal Server Error

### Error Code Types
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication failed
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND_ERROR` - Resource not found
- `RATE_LIMIT_ERROR` - Too many requests
- `VOICE_PROCESSING_ERROR` - Voice command processing failed
- `CALENDAR_SYNC_ERROR` - Calendar synchronization failed
- `AI_SERVICE_ERROR` - AI service integration error
- `DATABASE_ERROR` - Database operation failed

### Error Response Examples

#### Validation Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

#### Authentication Error
```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid credentials"
  }
}
```

#### Rate Limit Error
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_ERROR",
    "message": "Too many requests",
    "details": {
      "retry_after": 60
    }
  }
}
```

---

## 🔧 Integration Examples

### Frontend API Client Usage

#### Authentication Flow
```typescript
// Login
const loginResponse = await authApi.login('user@example.com', 'password');
const { access_token, refresh_token } = loginResponse.data;

// Store tokens
localStorage.setItem('access_token', access_token);
localStorage.setItem('refresh_token', refresh_token);

// Use in API calls
const profile = await userApi.getProfile();
```

#### Calendar Event Creation
```typescript
// Create event
const event = await calendarApi.createEvent({
  title: 'Team Meeting',
  start_time: new Date('2024-01-15T14:00:00Z'),
  end_time: new Date('2024-01-15T15:00:00Z'),
  type: 'meeting',
  priority: 'high'
});

// Get events with filtering
const events = await calendarApi.getEvents({
  start_date: '2024-01-01',
  end_date: '2024-01-31',
  view: 'month'
});
```

#### Voice Command Processing
```typescript
// Process voice command
const response = await voiceApi.processCommand(
  'Schedule a meeting with John tomorrow at 2 PM',
  audioBlob // optional
);

// Get voice history
const history = await voiceApi.getHistory({
  page: 1,
  limit: 10
});
```

#### WebSocket Connection
```typescript
// Connect to WebSocket
const ws = new WebSocket(`ws://localhost:8000/ws?token=${access_token}`);

// Listen for events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'calendar_event_created':
      // Handle new event
      break;
    case 'notification':
      // Handle notification
      break;
  }
};

// Send client events
ws.send(JSON.stringify({
  type: 'subscribe',
  data: { channel: 'calendar_updates' }
}));
```

### Error Handling
```typescript
try {
  const response = await apiClient.get('/calendar/events');
  return response.data;
} catch (error) {
  if (error.response?.status === 401) {
    // Handle authentication error
    await refreshToken();
  } else if (error.response?.status === 429) {
    // Handle rate limiting
    const retryAfter = error.response.data.error.details.retry_after;
    setTimeout(() => retryRequest(), retryAfter * 1000);
  } else {
    // Handle other errors
    console.error('API Error:', error.response?.data);
  }
}
```

---

## 📈 Rate Limiting

### Limits
- **Authentication**: 5 requests per minute
- **API Endpoints**: 100 requests per minute
- **Voice Processing**: 10 requests per minute
- **WebSocket Connections**: 5 connections per user

### Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
Retry-After: 60
```

---

## 🔒 Security

### CORS Configuration
```python
CORS_ORIGINS = [
    "http://localhost:3000",
    "https://yourdomain.com"
]
```

### Content Security Policy
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

### Security Headers
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

This API specification provides Claude Code with comprehensive information about all endpoints, data structures, authentication patterns, and integration examples for building the AI-Powered Voice Assistant & Calendar Manager application.
