"""
Authentication schemas for the AI Voice Assistant & Calendar Manager Backend.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str
    user: dict


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    username: Optional[str] = None
    full_name: Optional[str] = None


class UserCreate(UserBase):
    """User creation schema."""
    password: str


class UserUpdate(BaseModel):
    """User update schema."""
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    timezone: Optional[str] = None
    language: Optional[str] = None
    voice_settings: Optional[dict] = None
    calendar_preferences: Optional[dict] = None
    notification_settings: Optional[dict] = None


class UserResponse(UserBase):
    """User response schema."""
    id: str
    is_active: bool
    is_verified: bool
    is_superuser: bool
    avatar_url: Optional[str] = None
    timezone: str
    language: str
    voice_settings: Optional[dict] = None
    calendar_preferences: Optional[dict] = None
    notification_settings: Optional[dict] = None
    created_at: datetime
    updated_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True
