"""
Meeting Intelligence models for TempoPilot™.
"""

from datetime import datetime
from typing import Optional, List
from sqlalchemy import Column, String, Boolean, DateTime, Text, JSON, ForeignKey, Integer, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class MeetingIntelligence(Base):
    """Meeting intelligence and analysis data."""
    
    __tablename__ = "meeting_intelligence"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    event_id: Mapped[str] = mapped_column(String(36), ForeignKey("events.id"), nullable=False)
    
    # Meeting analysis
    meeting_quality_score: Mapped[Optional[float]] = mapped_column(Float)
    focus_time_percentage: Mapped[Optional[float]] = mapped_column(Float)
    fragmentation_score: Mapped[Optional[float]] = mapped_column(Float)
    
    # AI-generated content
    summary: Mapped[Optional[str]] = mapped_column(Text)
    action_items: Mapped[Optional[dict]] = mapped_column(JSON, default=[])
    key_decisions: Mapped[Optional[dict]] = mapped_column(JSON, default=[])
    follow_up_tasks: Mapped[Optional[dict]] = mapped_column(JSON, default=[])
    
    # Voice processing data
    voice_transcript: Mapped[Optional[str]] = mapped_column(Text)
    voice_confidence: Mapped[Optional[float]] = mapped_column(Float)
    processing_metadata: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    event: Mapped["Event"] = relationship("Event", back_populates="intelligence")
    notes: Mapped[List["MeetingNote"]] = relationship("MeetingNote", back_populates="intelligence")
    
    def __repr__(self):
        return f"<MeetingIntelligence(id={self.id}, event_id={self.event_id})>"


class MeetingNote(Base):
    """Real-time meeting notes and annotations."""
    
    __tablename__ = "meeting_notes"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    intelligence_id: Mapped[str] = mapped_column(String(36), ForeignKey("meeting_intelligence.id"), nullable=False)
    
    # Note content
    content: Mapped[str] = mapped_column(Text, nullable=False)
    note_type: Mapped[str] = mapped_column(String(50), default="general")  # general, action, decision, question
    timestamp: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    # AI processing
    ai_generated: Mapped[bool] = mapped_column(Boolean, default=False)
    confidence_score: Mapped[Optional[float]] = mapped_column(Float)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    intelligence: Mapped["MeetingIntelligence"] = relationship("MeetingIntelligence", back_populates="notes")
    
    def __repr__(self):
        return f"<MeetingNote(id={self.id}, type={self.note_type})>"


class UserPreference(Base):
    """User preferences and learning data for personalization."""
    
    __tablename__ = "user_preferences"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    
    # Calendar preferences
    preferred_meeting_duration: Mapped[Optional[int]] = mapped_column(Integer)  # minutes
    preferred_meeting_times: Mapped[Optional[dict]] = mapped_column(JSON, default=[])  # list of time slots
    working_hours: Mapped[Optional[dict]] = mapped_column(JSON, default={})  # start/end times
    timezone: Mapped[Optional[str]] = mapped_column(String(50))
    
    # Voice preferences
    voice_persona: Mapped[Optional[str]] = mapped_column(String(50), default="professional")
    voice_speed: Mapped[Optional[float]] = mapped_column(Float, default=1.0)
    voice_language: Mapped[Optional[str]] = mapped_column(String(10), default="en-US")
    
    # AI preferences
    preferred_ai_model: Mapped[Optional[str]] = mapped_column(String(50), default="gpt-4")
    temperature_setting: Mapped[Optional[float]] = mapped_column(Float, default=0.7)
    auto_summarize: Mapped[bool] = mapped_column(Boolean, default=True)
    auto_suggest: Mapped[bool] = mapped_column(Boolean, default=True)
    
    # Notification preferences
    notification_channels: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    quiet_hours: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Learning data
    frequently_used_phrases: Mapped[Optional[dict]] = mapped_column(JSON, default=[])
    meeting_patterns: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<UserPreference(id={self.id}, user_id={self.user_id})>"


class CalendarSync(Base):
    """Calendar synchronization tokens and settings."""
    
    __tablename__ = "calendar_sync"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    calendar_id: Mapped[str] = mapped_column(String(36), ForeignKey("calendars.id"), nullable=False)
    
    # Provider information
    provider: Mapped[str] = mapped_column(String(50), nullable=False)  # google, outlook, apple
    provider_account_id: Mapped[str] = mapped_column(String(255), nullable=False)
    
    # OAuth tokens
    access_token: Mapped[str] = mapped_column(Text, nullable=False)
    refresh_token: Mapped[Optional[str]] = mapped_column(Text)
    token_expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    # Sync settings
    sync_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    last_sync_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    sync_errors: Mapped[Optional[dict]] = mapped_column(JSON, default=[])
    
    # Scopes and permissions
    granted_scopes: Mapped[Optional[dict]] = mapped_column(JSON, default=[])
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<CalendarSync(id={self.id}, provider={self.provider}, user_id={self.user_id})>"
