"""
Notification model for the AI Voice Assistant & Calendar Manager.
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, String, Boolean, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Notification(Base):
    """Notification model for user alerts and messages."""
    
    __tablename__ = "notifications"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True, index=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    
    # Notification content
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    notification_type: Mapped[str] = mapped_column(String(50), default="info")  # info, warning, error, success
    
    # Notification metadata
    category: Mapped[str] = mapped_column(String(50), default="general")  # calendar, voice, system, reminder
    priority: Mapped[str] = mapped_column(String(20), default="normal")  # low, normal, high, urgent
    
    # Delivery settings
    delivery_methods: Mapped[Optional[dict]] = mapped_column(JSON, default={})  # email, push, sms
    scheduled_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    # Status tracking
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    is_sent: Mapped[bool] = mapped_column(Boolean, default=False)
    sent_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    read_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    # Related data
    related_event_id: Mapped[Optional[str]] = mapped_column(String(36), index=True)
    related_voice_command_id: Mapped[Optional[str]] = mapped_column(String(36), index=True)
    
    # Additional data
    metadata: Mapped[Optional[dict]] = mapped_column(JSON, default={})
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<Notification(id={self.id}, title={self.title}, user_id={self.user_id})>"
