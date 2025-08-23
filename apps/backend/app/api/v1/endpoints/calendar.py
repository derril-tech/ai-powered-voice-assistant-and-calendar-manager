"""
Calendar API endpoints.
"""

from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.calendar import CalendarService
from app.schemas.calendar import (
    CalendarCreate, CalendarResponse, CalendarUpdate, CalendarListResponse,
    EventCreate, EventResponse, EventUpdate, EventListResponse,
    EventSearchRequest, EventAvailabilityRequest, EventAvailabilityResponse,
    CalendarAnalyticsResponse, AttendeeCreate, AttendeeResponse
)

router = APIRouter()


@router.post("/calendars", response_model=CalendarResponse, status_code=status.HTTP_201_CREATED)
async def create_calendar(
    calendar_data: CalendarCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new calendar."""
    calendar_service = CalendarService(db)
    calendar = await calendar_service.create_calendar(
        user_id=current_user.id,
        name=calendar_data.name,
        description=calendar_data.description,
        calendar_type=calendar_data.calendar_type,
        color=calendar_data.color
    )
    return calendar


@router.get("/calendars", response_model=CalendarListResponse)
async def get_calendars(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all calendars for the current user."""
    calendar_service = CalendarService(db)
    calendars = await calendar_service.get_user_calendars(current_user.id)
    return CalendarListResponse(calendars=calendars, total=len(calendars))


@router.get("/calendars/{calendar_id}", response_model=CalendarResponse)
async def get_calendar(
    calendar_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get a specific calendar."""
    calendar_service = CalendarService(db)
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar = next((cal for cal in calendars if cal.id == calendar_id), None)
    
    if not calendar:
        raise HTTPException(status_code=404, detail="Calendar not found")
    
    return calendar


@router.put("/calendars/{calendar_id}", response_model=CalendarResponse)
async def update_calendar(
    calendar_id: str,
    calendar_data: CalendarUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update a calendar."""
    calendar_service = CalendarService(db)
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar = next((cal for cal in calendars if cal.id == calendar_id), None)
    
    if not calendar:
        raise HTTPException(status_code=404, detail="Calendar not found")
    
    # Update fields
    update_data = calendar_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(calendar, field, value)
    
    await db.commit()
    await db.refresh(calendar)
    return calendar


@router.delete("/calendars/{calendar_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_calendar(
    calendar_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a calendar."""
    calendar_service = CalendarService(db)
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar = next((cal for cal in calendars if cal.id == calendar_id), None)
    
    if not calendar:
        raise HTTPException(status_code=404, detail="Calendar not found")
    
    # Soft delete by setting is_active to False
    calendar.is_active = False
    await db.commit()


@router.post("/events", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(
    event_data: EventCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new event."""
    calendar_service = CalendarService(db)
    
    # Verify calendar belongs to user
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar = next((cal for cal in calendars if cal.id == event_data.calendar_id), None)
    
    if not calendar:
        raise HTTPException(status_code=404, detail="Calendar not found")
    
    # Check availability
    is_available = await calendar_service.check_availability(
        current_user.id, event_data.start_time, event_data.end_time
    )
    
    if not is_available:
        raise HTTPException(status_code=409, detail="Time slot is not available")
    
    # Create event
    event = await calendar_service.create_event(
        calendar_id=event_data.calendar_id,
        title=event_data.title,
        start_time=event_data.start_time,
        end_time=event_data.end_time,
        description=event_data.description,
        location=event_data.location,
        is_all_day=event_data.is_all_day,
        event_type=event_data.event_type,
        priority=event_data.priority,
        attendees=event_data.attendees,
        voice_created=event_data.voice_created,
        voice_metadata=event_data.voice_metadata
    )
    
    return event


@router.get("/events", response_model=EventListResponse)
async def get_events(
    start_date: Optional[datetime] = Query(None, description="Start date filter"),
    end_date: Optional[datetime] = Query(None, description="End date filter"),
    calendar_ids: Optional[List[str]] = Query(None, description="Calendar IDs filter"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get events for the current user."""
    calendar_service = CalendarService(db)
    events = await calendar_service.get_events(
        user_id=current_user.id,
        start_date=start_date,
        end_date=end_date,
        calendar_ids=calendar_ids
    )
    
    # Apply pagination
    total = len(events)
    paginated_events = events[offset:offset + limit]
    
    return EventListResponse(
        events=paginated_events,
        total=total,
        page=offset // limit + 1,
        size=limit,
        has_next=offset + limit < total,
        has_prev=offset > 0
    )


@router.get("/events/{event_id}", response_model=EventResponse)
async def get_event(
    event_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get a specific event."""
    calendar_service = CalendarService(db)
    event = await calendar_service.get_event(event_id)
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Verify event belongs to user's calendar
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar_ids = [cal.id for cal in calendars]
    
    if event.calendar_id not in calendar_ids:
        raise HTTPException(status_code=404, detail="Event not found")
    
    return event


@router.put("/events/{event_id}", response_model=EventResponse)
async def update_event(
    event_id: str,
    event_data: EventUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update an event."""
    calendar_service = CalendarService(db)
    event = await calendar_service.get_event(event_id)
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Verify event belongs to user's calendar
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar_ids = [cal.id for cal in calendars]
    
    if event.calendar_id not in calendar_ids:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Check availability if time is being changed
    if event_data.start_time or event_data.end_time:
        new_start = event_data.start_time or event.start_time
        new_end = event_data.end_time or event.end_time
        
        is_available = await calendar_service.check_availability(
            current_user.id, new_start, new_end, exclude_event_id=event_id
        )
        
        if not is_available:
            raise HTTPException(status_code=409, detail="Time slot is not available")
    
    # Update event
    update_data = event_data.dict(exclude_unset=True)
    updated_event = await calendar_service.update_event(event_id, update_data)
    
    if not updated_event:
        raise HTTPException(status_code=500, detail="Failed to update event")
    
    return updated_event


@router.delete("/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete an event."""
    calendar_service = CalendarService(db)
    event = await calendar_service.get_event(event_id)
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Verify event belongs to user's calendar
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar_ids = [cal.id for cal in calendars]
    
    if event.calendar_id not in calendar_ids:
        raise HTTPException(status_code=404, detail="Event not found")
    
    success = await calendar_service.delete_event(event_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete event")


@router.get("/events/upcoming", response_model=List[EventResponse])
async def get_upcoming_events(
    days: int = Query(7, ge=1, le=30, description="Number of days to look ahead"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get upcoming events."""
    calendar_service = CalendarService(db)
    events = await calendar_service.get_upcoming_events(current_user.id, days)
    return events


@router.get("/events/today", response_model=List[EventResponse])
async def get_today_events(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get today's events."""
    calendar_service = CalendarService(db)
    events = await calendar_service.get_today_events(current_user.id)
    return events


@router.post("/events/search", response_model=List[EventResponse])
async def search_events(
    search_request: EventSearchRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Search events."""
    calendar_service = CalendarService(db)
    events = await calendar_service.search_events(current_user.id, search_request.query)
    return events


@router.post("/events/availability", response_model=EventAvailabilityResponse)
async def check_availability(
    availability_request: EventAvailabilityRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Check availability for a time slot."""
    calendar_service = CalendarService(db)
    is_available = await calendar_service.check_availability(
        current_user.id,
        availability_request.start_time,
        availability_request.end_time,
        availability_request.exclude_event_id
    )
    
    conflicting_events = []
    if not is_available:
        # Get conflicting events
        events = await calendar_service.get_events(
            current_user.id,
            availability_request.start_time,
            availability_request.end_time
        )
        conflicting_events = [e for e in events if e.id != availability_request.exclude_event_id]
    
    return EventAvailabilityResponse(
        available=is_available,
        conflicting_events=conflicting_events
    )


@router.get("/events/{event_id}/attendees", response_model=List[AttendeeResponse])
async def get_event_attendees(
    event_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get attendees for an event."""
    calendar_service = CalendarService(db)
    event = await calendar_service.get_event(event_id)
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Verify event belongs to user's calendar
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar_ids = [cal.id for cal in calendars]
    
    if event.calendar_id not in calendar_ids:
        raise HTTPException(status_code=404, detail="Event not found")
    
    attendees = await calendar_service.get_event_attendees(event_id)
    return attendees


@router.post("/events/{event_id}/attendees", response_model=AttendeeResponse)
async def add_event_attendee(
    event_id: str,
    attendee_data: AttendeeCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Add an attendee to an event."""
    calendar_service = CalendarService(db)
    event = await calendar_service.get_event(event_id)
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Verify event belongs to user's calendar
    calendars = await calendar_service.get_user_calendars(current_user.id)
    calendar_ids = [cal.id for cal in calendars]
    
    if event.calendar_id not in calendar_ids:
        raise HTTPException(status_code=404, detail="Event not found")
    
    attendee = await calendar_service.add_event_attendee(
        event_id=event_id,
        email=attendee_data.email,
        name=attendee_data.name,
        role=attendee_data.role
    )
    
    return attendee


@router.delete("/attendees/{attendee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_event_attendee(
    attendee_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Remove an attendee from an event."""
    calendar_service = CalendarService(db)
    success = await calendar_service.remove_event_attendee(attendee_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Attendee not found")


@router.get("/analytics", response_model=CalendarAnalyticsResponse)
async def get_calendar_analytics(
    days: int = Query(30, ge=1, le=365, description="Number of days for analytics"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get calendar analytics."""
    calendar_service = CalendarService(db)
    analytics = await calendar_service.get_calendar_analytics(current_user.id, days)
    return CalendarAnalyticsResponse(**analytics, period_days=days)
