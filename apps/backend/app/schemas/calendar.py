"""
Pydantic schemas for calendar-related models.
"""

from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, validator


class CalendarBase(BaseModel):
    """Base calendar schema."""
    name: str = Field(..., min_length=1, max_length=100, description="Calendar name")
    description: Optional[str] = Field(None, max_length=500, description="Calendar description")
    calendar_type: str = Field("primary", description="Calendar type (primary, work, personal, etc.)")
    color: str = Field("#4285F4", description="Calendar color in hex format")
    is_primary: bool = Field(False, description="Whether this is the primary calendar")


class CalendarCreate(CalendarBase):
    """Schema for creating a calendar."""
    pass


class CalendarUpdate(BaseModel):
    """Schema for updating a calendar."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    calendar_type: Optional[str] = None
    color: Optional[str] = None
    is_primary: Optional[bool] = None


class CalendarResponse(CalendarBase):
    """Schema for calendar response."""
    id: str
    user_id: str
    external_id: Optional[str] = None
    settings: Dict[str, Any] = Field(default_factory=dict)
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AttendeeBase(BaseModel):
    """Base attendee schema."""
    email: str = Field(..., description="Attendee email address")
    name: Optional[str] = Field(None, max_length=100, description="Attendee name")
    role: str = Field("attendee", description="Attendee role (organizer, attendee, etc.)")


class AttendeeCreate(AttendeeBase):
    """Schema for creating an attendee."""
    pass


class AttendeeUpdate(BaseModel):
    """Schema for updating an attendee."""
    email: Optional[str] = None
    name: Optional[str] = Field(None, max_length=100)
    role: Optional[str] = None


class AttendeeResponse(AttendeeBase):
    """Schema for attendee response."""
    id: str
    event_id: str
    external_id: Optional[str] = None
    response_status: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class EventBase(BaseModel):
    """Base event schema."""
    title: str = Field(..., min_length=1, max_length=200, description="Event title")
    description: Optional[str] = Field(None, max_length=1000, description="Event description")
    start_time: datetime = Field(..., description="Event start time")
    end_time: datetime = Field(..., description="Event end time")
    is_all_day: bool = Field(False, description="Whether this is an all-day event")
    location: Optional[str] = Field(None, max_length=200, description="Event location")
    meeting_url: Optional[str] = Field(None, description="Meeting URL for virtual events")
    event_type: str = Field("meeting", description="Event type (meeting, appointment, reminder, etc.)")
    priority: str = Field("medium", description="Event priority (low, medium, high, urgent)")


class EventCreate(EventBase):
    """Schema for creating an event."""
    calendar_id: str = Field(..., description="Calendar ID")
    attendees: Optional[List[AttendeeCreate]] = Field(None, description="Event attendees")
    voice_created: bool = Field(False, description="Whether created via voice command")
    voice_metadata: Optional[Dict[str, Any]] = Field(None, description="Voice command metadata")

    @validator('end_time')
    def end_time_must_be_after_start_time(cls, v, values):
        if 'start_time' in values and v <= values['start_time']:
            raise ValueError('end_time must be after start_time')
        return v


class EventUpdate(BaseModel):
    """Schema for updating an event."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    is_all_day: Optional[bool] = None
    location: Optional[str] = Field(None, max_length=200)
    meeting_url: Optional[str] = None
    event_type: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None

    @validator('end_time')
    def end_time_must_be_after_start_time(cls, v, values):
        if 'start_time' in values and v and values['start_time'] and v <= values['start_time']:
            raise ValueError('end_time must be after start_time')
        return v


class EventResponse(EventBase):
    """Schema for event response."""
    id: str
    calendar_id: str
    external_id: Optional[str] = None
    status: str = Field("scheduled", description="Event status")
    voice_created: bool
    voice_metadata: Dict[str, Any] = Field(default_factory=dict)
    attendees: List[AttendeeResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class EventListResponse(BaseModel):
    """Schema for event list response."""
    events: List[EventResponse]
    total: int
    page: int
    size: int
    has_next: bool
    has_prev: bool


class CalendarListResponse(BaseModel):
    """Schema for calendar list response."""
    calendars: List[CalendarResponse]
    total: int


class EventSearchRequest(BaseModel):
    """Schema for event search request."""
    query: str = Field(..., min_length=1, description="Search query")
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    calendar_ids: Optional[List[str]] = None
    event_types: Optional[List[str]] = None
    limit: int = Field(50, ge=1, le=100)
    offset: int = Field(0, ge=0)


class EventAvailabilityRequest(BaseModel):
    """Schema for checking event availability."""
    start_time: datetime
    end_time: datetime
    exclude_event_id: Optional[str] = None


class EventAvailabilityResponse(BaseModel):
    """Schema for event availability response."""
    available: bool
    conflicting_events: List[EventResponse] = Field(default_factory=list)


class CalendarAnalyticsResponse(BaseModel):
    """Schema for calendar analytics response."""
    total_events: int
    events_by_type: Dict[str, int]
    events_by_priority: Dict[str, int]
    average_duration: float
    busiest_day: Optional[str]
    voice_created_events: int
    period_days: int


class RecurrenceRule(BaseModel):
    """Schema for event recurrence rule."""
    frequency: str = Field(..., description="Recurrence frequency (daily, weekly, monthly, yearly)")
    interval: int = Field(1, ge=1, description="Recurrence interval")
    end_date: Optional[datetime] = None
    occurrences: Optional[int] = None
    by_day: Optional[List[str]] = None  # ["MO", "WE", "FR"]
    by_month_day: Optional[List[int]] = None
    by_month: Optional[List[int]] = None
    by_year_day: Optional[List[int]] = None
    week_start: str = Field("MO", description="Week start day")


class EventWithRecurrence(EventCreate):
    """Schema for creating an event with recurrence."""
    recurrence: Optional[RecurrenceRule] = None
