"""
Voice models for the AI Voice Assistant & Calendar Manager.
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, String, Boolean, DateTime, Text, JSON, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class VoiceSession(Base):
    """Voice session model for tracking voice interactions."""
    
    __tablename__ = "voice_sessions"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    
    # Session metadata
    session_id: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    device_info: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    browser_info: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Session state
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    ended_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    # Session statistics
    total_commands: Mapped[int] = mapped_column(default=0)
    successful_commands: Mapped[int] = mapped_column(default=0)
    average_confidence: Mapped[Optional[float]] = mapped_column(Float)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    commands: Mapped[list["VoiceCommand"]] = relationship("VoiceCommand", back_populates="session")
    
    def __repr__(self):
        return f"<VoiceSession(id={self.id}, user_id={self.user_id}, session_id={self.session_id})>"


class VoiceCommand(Base):
    """Voice command model for storing voice interactions."""
    
    __tablename__ = "voice_commands"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    session_id: Mapped[str] = mapped_column(String(36), ForeignKey("voice_sessions.id"), nullable=False)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    
    # Command content
    original_transcript: Mapped[str] = mapped_column(Text, nullable=False)
    processed_transcript: Mapped[Optional[str]] = mapped_column(Text)
    
    # AI processing results
    intent: Mapped[Optional[str]] = mapped_column(String(100), index=True)
    confidence: Mapped[Optional[float]] = mapped_column(Float)
    entities: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Command execution
    action_taken: Mapped[Optional[str]] = mapped_column(String(100))
    success: Mapped[Optional[bool]] = mapped_column(Boolean)
    error_message: Mapped[Optional[str]] = mapped_column(Text)
    
    # Audio data
    audio_file_path: Mapped[Optional[str]] = mapped_column(String(500))
    audio_duration: Mapped[Optional[float]] = mapped_column(Float)
    audio_format: Mapped[Optional[str]] = mapped_column(String(20))
    
    # Context and metadata
    context: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    metadata: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Processing information
    processing_time: Mapped[Optional[float]] = mapped_column(Float)  # in seconds
    ai_model_used: Mapped[Optional[str]] = mapped_column(String(100))
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    processed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    # Relationships
    session: Mapped["VoiceSession"] = relationship("VoiceSession", back_populates="commands")
    
    def __repr__(self):
        return f"<VoiceCommand(id={self.id}, intent={self.intent}, confidence={self.confidence})>"
