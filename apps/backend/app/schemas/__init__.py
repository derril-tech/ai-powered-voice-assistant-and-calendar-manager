"""
Pydantic schemas for the application.
"""

# Auth schemas
from .auth import Token, UserCreate, UserResponse, UserUpdate

# Calendar schemas
from .calendar import (
    CalendarBase, CalendarCreate, CalendarUpdate, CalendarResponse,
    AttendeeBase, AttendeeCreate, AttendeeUpdate, AttendeeResponse,
    EventBase, EventCreate, EventUpdate, EventResponse,
    EventListResponse, CalendarListResponse,
    EventSearchRequest, EventAvailabilityRequest, EventAvailabilityResponse,
    CalendarAnalyticsResponse, RecurrenceRule, EventWithRecurrence
)

# Voice schemas
from .voice import (
    VoiceSessionBase, VoiceSessionCreate, VoiceSessionUpdate, VoiceSessionResponse,
    VoiceCommandBase, VoiceCommandCreate, VoiceCommandUpdate, VoiceCommandResponse,
    VoiceCommandListResponse, VoiceSessionListResponse,
    VoiceCommandProcessRequest, VoiceCommandProcessResponse,
    VoiceSettingsBase, VoiceSettingsCreate, VoiceSettingsUpdate, VoiceSettingsResponse,
    VoiceAnalyticsResponse, VoiceIntent, VoiceEntity,
    VoiceCommandSuggestion, VoiceCommandSuggestionsResponse,
    VoiceRecognitionStartRequest, VoiceRecognitionStopRequest, VoiceRecognitionStatus
)

# Notification schemas
from .notification import (
    NotificationBase, NotificationCreate, NotificationUpdate, NotificationResponse,
    NotificationListResponse, NotificationMarkReadRequest, NotificationMarkReadResponse,
    NotificationMarkAllReadResponse, NotificationDeleteResponse,
    NotificationUnreadCountResponse, NotificationAnalyticsResponse,
    NotificationPreferencesBase, NotificationPreferencesCreate, NotificationPreferencesUpdate, NotificationPreferencesResponse,
    NotificationTemplateBase, NotificationTemplateCreate, NotificationTemplateUpdate, NotificationTemplateResponse,
    NotificationTemplateListResponse, NotificationSendRequest, NotificationSendResponse,
    NotificationBulkSendRequest, NotificationBulkSendResponse, NotificationDeliveryStatus
)

__all__ = [
    # Auth
    "Token", "UserCreate", "UserResponse", "UserUpdate",
    
    # Calendar
    "CalendarBase", "CalendarCreate", "CalendarUpdate", "CalendarResponse",
    "AttendeeBase", "AttendeeCreate", "AttendeeUpdate", "AttendeeResponse",
    "EventBase", "EventCreate", "EventUpdate", "EventResponse",
    "EventListResponse", "CalendarListResponse",
    "EventSearchRequest", "EventAvailabilityRequest", "EventAvailabilityResponse",
    "CalendarAnalyticsResponse", "RecurrenceRule", "EventWithRecurrence",
    
    # Voice
    "VoiceSessionBase", "VoiceSessionCreate", "VoiceSessionUpdate", "VoiceSessionResponse",
    "VoiceCommandBase", "VoiceCommandCreate", "VoiceCommandUpdate", "VoiceCommandResponse",
    "VoiceCommandListResponse", "VoiceSessionListResponse",
    "VoiceCommandProcessRequest", "VoiceCommandProcessResponse",
    "VoiceSettingsBase", "VoiceSettingsCreate", "VoiceSettingsUpdate", "VoiceSettingsResponse",
    "VoiceAnalyticsResponse", "VoiceIntent", "VoiceEntity",
    "VoiceCommandSuggestion", "VoiceCommandSuggestionsResponse",
    "VoiceRecognitionStartRequest", "VoiceRecognitionStopRequest", "VoiceRecognitionStatus",
    
    # Notification
    "NotificationBase", "NotificationCreate", "NotificationUpdate", "NotificationResponse",
    "NotificationListResponse", "NotificationMarkReadRequest", "NotificationMarkReadResponse",
    "NotificationMarkAllReadResponse", "NotificationDeleteResponse",
    "NotificationUnreadCountResponse", "NotificationAnalyticsResponse",
    "NotificationPreferencesBase", "NotificationPreferencesCreate", "NotificationPreferencesUpdate", "NotificationPreferencesResponse",
    "NotificationTemplateBase", "NotificationTemplateCreate", "NotificationTemplateUpdate", "NotificationTemplateResponse",
    "NotificationTemplateListResponse", "NotificationSendRequest", "NotificationSendResponse",
    "NotificationBulkSendRequest", "NotificationBulkSendResponse", "NotificationDeliveryStatus"
]
