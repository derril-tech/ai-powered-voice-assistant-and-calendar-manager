"""
Calendar service for managing events and calendar operations.
"""

import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
import structlog

from app.core.logging import LoggerMixin
from app.models.calendar import Calendar, Event, Attendee

logger = structlog.get_logger()


class CalendarService(LoggerMixin):
    """Calendar service for managing events and calendar operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_calendar(self, user_id: str, name: str, description: str = None, 
                            calendar_type: str = "primary", color: str = "#4285F4") -> Calendar:
        """Create a new calendar for a user."""
        calendar = Calendar(
            id=str(uuid.uuid4()),
            user_id=user_id,
            name=name,
            description=description,
            calendar_type=calendar_type,
            color=color,
            is_primary=calendar_type == "primary"
        )
        
        self.db.add(calendar)
        await self.db.commit()
        await self.db.refresh(calendar)
        
        self.logger.info("Calendar created", calendar_id=calendar.id, user_id=user_id)
        return calendar
    
    async def get_user_calendars(self, user_id: str) -> List[Calendar]:
        """Get all calendars for a user."""
        result = await self.db.execute(
            select(Calendar).where(Calendar.user_id == user_id, Calendar.is_active == True)
        )
        return result.scalars().all()
    
    async def create_event(self, calendar_id: str, title: str, start_time: datetime, 
                          end_time: datetime, description: str = None, location: str = None,
                          is_all_day: bool = False, event_type: str = "meeting",
                          priority: str = "medium", attendees: List[Dict] = None,
                          voice_created: bool = False, voice_metadata: Dict = None) -> Event:
        """Create a new calendar event."""
        event = Event(
            id=str(uuid.uuid4()),
            calendar_id=calendar_id,
            title=title,
            description=description,
            start_time=start_time,
            end_time=end_time,
            is_all_day=is_all_day,
            location=location,
            event_type=event_type,
            priority=priority,
            voice_created=voice_created,
            voice_metadata=voice_metadata or {}
        )
        
        self.db.add(event)
        await self.db.commit()
        await self.db.refresh(event)
        
        # Add attendees if provided
        if attendees:
            await self._add_attendees(event.id, attendees)
        
        self.logger.info("Event created", event_id=event.id, calendar_id=calendar_id)
        return event
    
    async def _add_attendees(self, event_id: str, attendees: List[Dict]) -> None:
        """Add attendees to an event."""
        for attendee_data in attendees:
            attendee = Attendee(
                id=str(uuid.uuid4()),
                event_id=event_id,
                email=attendee_data["email"],
                name=attendee_data.get("name"),
                role=attendee_data.get("role", "attendee")
            )
            self.db.add(attendee)
        
        await self.db.commit()
    
    async def get_events(self, user_id: str, start_date: datetime = None, 
                        end_date: datetime = None, calendar_ids: List[str] = None) -> List[Event]:
        """Get events for a user within a date range."""
        try:
            # Get user's calendars
            if not calendar_ids:
                calendars = await self.get_user_calendars(user_id)
                calendar_ids = [cal.id for cal in calendars]
            
            # Build query
            query = select(Event).where(Event.calendar_id.in_(calendar_ids))
            
            # Add date filters
            if start_date:
                query = query.where(Event.start_time >= start_date)
            if end_date:
                query = query.where(Event.end_time <= end_date)
            
            # Order by start time
            query = query.order_by(Event.start_time)
            
            result = await self.db.execute(query)
            return result.scalars().all()
            
        except Exception as e:
            self.logger.error("Failed to get events", error=str(e))
            return []
    
    async def get_event(self, event_id: str) -> Optional[Event]:
        """Get a specific event by ID."""
        result = await self.db.execute(
            select(Event).where(Event.id == event_id)
        )
        return result.scalar_one_or_none()
    
    async def update_event(self, event_id: str, update_data: Dict[str, Any]) -> Optional[Event]:
        """Update an existing event."""
        try:
            event = await self.get_event(event_id)
            if not event:
                return None
            
            # Update fields
            for field, value in update_data.items():
                if hasattr(event, field) and value is not None:
                    setattr(event, field, value)
            
            event.updated_at = datetime.utcnow()
            await self.db.commit()
            await self.db.refresh(event)
            
            self.logger.info("Event updated", event_id=event_id)
            return event
            
        except Exception as e:
            self.logger.error("Failed to update event", error=str(e))
            return None
    
    async def delete_event(self, event_id: str) -> bool:
        """Delete an event."""
        try:
            event = await self.get_event(event_id)
            if not event:
                return False
            
            # Delete attendees first
            await self.db.execute(
                select(Attendee).where(Attendee.event_id == event_id)
            )
            
            # Delete event
            await self.db.delete(event)
            await self.db.commit()
            
            self.logger.info("Event deleted", event_id=event_id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to delete event", error=str(e))
            return False
    
    async def get_upcoming_events(self, user_id: str, days: int = 7) -> List[Event]:
        """Get upcoming events for a user."""
        try:
            start_date = datetime.utcnow()
            end_date = start_date + timedelta(days=days)
            
            return await self.get_events(user_id, start_date, end_date)
            
        except Exception as e:
            self.logger.error("Failed to get upcoming events", error=str(e))
            return []
    
    async def get_today_events(self, user_id: str) -> List[Event]:
        """Get today's events for a user."""
        try:
            today = datetime.utcnow().date()
            start_date = datetime.combine(today, datetime.min.time())
            end_date = datetime.combine(today, datetime.max.time())
            
            return await self.get_events(user_id, start_date, end_date)
            
        except Exception as e:
            self.logger.error("Failed to get today's events", error=str(e))
            return []
    
    async def search_events(self, user_id: str, query: str) -> List[Event]:
        """Search events by title or description."""
        try:
            # Get user's calendars
            calendars = await self.get_user_calendars(user_id)
            calendar_ids = [cal.id for cal in calendars]
            
            # Search query
            search_query = f"%{query}%"
            
            result = await self.db.execute(
                select(Event)
                .where(
                    and_(
                        Event.calendar_id.in_(calendar_ids),
                        or_(
                            Event.title.ilike(search_query),
                            Event.description.ilike(search_query)
                        )
                    )
                )
                .order_by(Event.start_time)
            )
            
            return result.scalars().all()
            
        except Exception as e:
            self.logger.error("Failed to search events", error=str(e))
            return []
    
    async def check_availability(self, user_id: str, start_time: datetime, 
                               end_time: datetime, exclude_event_id: str = None) -> bool:
        """Check if a user is available during a time period."""
        try:
            # Get user's events in the time range
            events = await self.get_events(user_id, start_time, end_time)
            
            # Filter out the event being updated (if any)
            if exclude_event_id:
                events = [e for e in events if e.id != exclude_event_id]
            
            # Check for conflicts
            for event in events:
                if self._events_overlap(start_time, end_time, event.start_time, event.end_time):
                    return False
            
            return True
            
        except Exception as e:
            self.logger.error("Failed to check availability", error=str(e))
            return False
    
    def _events_overlap(self, start1: datetime, end1: datetime, 
                       start2: datetime, end2: datetime) -> bool:
        """Check if two events overlap."""
        return start1 < end2 and start2 < end1
    
    async def get_event_attendees(self, event_id: str) -> List[Attendee]:
        """Get attendees for an event."""
        result = await self.db.execute(
            select(Attendee).where(Attendee.event_id == event_id)
        )
        return result.scalars().all()
    
    async def add_event_attendee(self, event_id: str, email: str, name: str = None, 
                               role: str = "attendee") -> Attendee:
        """Add an attendee to an event."""
        attendee = Attendee(
            id=str(uuid.uuid4()),
            event_id=event_id,
            email=email,
            name=name,
            role=role
        )
        
        self.db.add(attendee)
        await self.db.commit()
        await self.db.refresh(attendee)
        
        self.logger.info("Attendee added", attendee_id=attendee.id, event_id=event_id)
        return attendee
    
    async def remove_event_attendee(self, attendee_id: str) -> bool:
        """Remove an attendee from an event."""
        try:
            result = await self.db.execute(
                select(Attendee).where(Attendee.id == attendee_id)
            )
            attendee = result.scalar_one_or_none()
            
            if not attendee:
                return False
            
            await self.db.delete(attendee)
            await self.db.commit()
            
            self.logger.info("Attendee removed", attendee_id=attendee_id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to remove attendee", error=str(e))
            return False
    
    async def get_calendar_analytics(self, user_id: str, days: int = 30) -> Dict[str, Any]:
        """Get calendar analytics for a user."""
        try:
            from datetime import timedelta
            
            # Calculate date range
            end_date = datetime.utcnow()
            start_date = end_date - timedelta(days=days)
            
            # Get events in date range
            events = await self.get_events(user_id, start_date, end_date)
            
            if not events:
                return {
                    "total_events": 0,
                    "events_by_type": {},
                    "events_by_priority": {},
                    "average_duration": 0,
                    "busiest_day": None,
                    "voice_created_events": 0
                }
            
            # Calculate statistics
            total_events = len(events)
            
            # Events by type
            events_by_type = {}
            for event in events:
                event_type = event.event_type or "unknown"
                events_by_type[event_type] = events_by_type.get(event_type, 0) + 1
            
            # Events by priority
            events_by_priority = {}
            for event in events:
                priority = event.priority or "medium"
                events_by_priority[priority] = events_by_priority.get(priority, 0) + 1
            
            # Average duration
            durations = []
            for event in events:
                if not event.is_all_day:
                    duration = (event.end_time - event.start_time).total_seconds() / 3600  # hours
                    durations.append(duration)
            
            average_duration = sum(durations) / len(durations) if durations else 0
            
            # Busiest day
            day_counts = {}
            for event in events:
                day_key = event.start_time.date().isoformat()
                day_counts[day_key] = day_counts.get(day_key, 0) + 1
            
            busiest_day = max(day_counts.items(), key=lambda x: x[1])[0] if day_counts else None
            
            # Voice created events
            voice_created_events = len([e for e in events if e.voice_created])
            
            return {
                "total_events": total_events,
                "events_by_type": events_by_type,
                "events_by_priority": events_by_priority,
                "average_duration": round(average_duration, 2),
                "busiest_day": busiest_day,
                "voice_created_events": voice_created_events
            }
            
        except Exception as e:
            self.logger.error("Failed to get calendar analytics", error=str(e))
            return {}
