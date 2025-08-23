"""
Calendar models for the AI Voice Assistant & Calendar Manager.
"""

from datetime import datetime
from typing import Optional, List
from sqlalchemy import Column, String, Boolean, DateTime, Text, JSON, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Calendar(Base):
    """Calendar model for user calendars."""
    
    __tablename__ = "calendars"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    
    # Calendar type and source
    calendar_type: Mapped[str] = mapped_column(String(50), default="primary")  # primary, google, outlook, apple
    external_id: Mapped[Optional[str]] = mapped_column(String(255), index=True)  # External calendar ID
    color: Mapped[Optional[str]] = mapped_column(String(7), default="#4285F4")  # Hex color
    
    # Settings
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    sync_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    last_sync: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    # Relationships
    events: Mapped[List["Event"]] = relationship("Event", back_populates="calendar")
    
    def __repr__(self):
        return f"<Calendar(id={self.id}, name={self.name}, user_id={self.user_id})>"


class Event(Base):
    """Event model for calendar events."""
    
    __tablename__ = "events"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    calendar_id: Mapped[str] = mapped_column(String(36), ForeignKey("calendars.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    
    # Event timing
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    is_all_day: Mapped[bool] = mapped_column(Boolean, default=False)
    
    # Location and details
    location: Mapped[Optional[str]] = mapped_column(String(500))
    meeting_url: Mapped[Optional[str]] = mapped_column(String(500))
    
    # Event metadata
    event_type: Mapped[str] = mapped_column(String(50), default="meeting")  # meeting, appointment, reminder, task
    priority: Mapped[str] = mapped_column(String(20), default="medium")  # low, medium, high, urgent
    status: Mapped[str] = mapped_column(String(20), default="confirmed")  # confirmed, tentative, cancelled
    
    # External integration
    external_id: Mapped[Optional[str]] = mapped_column(String(255), index=True)
    external_source: Mapped[Optional[str]] = mapped_column(String(50))  # google, outlook, apple
    
    # Voice assistant data
    voice_created: Mapped[bool] = mapped_column(Boolean, default=False)
    voice_metadata: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    calendar: Mapped["Calendar"] = relationship("Calendar", back_populates="events")
    attendees: Mapped[List["Attendee"]] = relationship("Attendee", back_populates="event")
    
    def __repr__(self):
        return f"<Event(id={self.id}, title={self.title}, start_time={self.start_time})>"


class Attendee(Base):
    """Attendee model for event participants."""
    
    __tablename__ = "attendees"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    event_id: Mapped[str] = mapped_column(String(36), ForeignKey("events.id"), nullable=False)
    
    # Attendee information
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[Optional[str]] = mapped_column(String(255))
    
    # Role and status
    role: Mapped[str] = mapped_column(String(20), default="attendee")  # organizer, attendee, resource
    response_status: Mapped[str] = mapped_column(String(20), default="needs_action")  # accepted, declined, tentative, needs_action
    
    # External data
    external_id: Mapped[Optional[str]] = mapped_column(String(255))
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    event: Mapped["Event"] = relationship("Event", back_populates="attendees")
    
    def __repr__(self):
        return f"<Attendee(id={self.id}, email={self.email}, event_id={self.event_id})>"
