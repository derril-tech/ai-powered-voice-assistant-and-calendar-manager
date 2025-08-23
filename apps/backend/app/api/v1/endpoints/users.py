"""
User endpoints for the AI Voice Assistant & Calendar Manager Backend.
"""

from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user, get_current_active_user
from app.models.user import User
from app.schemas.auth import UserUpdate, UserResponse
from app.services.auth import AuthService

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Get current user information."""
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """Update current user information."""
    auth_service = AuthService(db)
    
    # Convert Pydantic model to dict, excluding None values
    update_data = user_update.dict(exclude_unset=True)
    
    updated_user = await auth_service.update_user(current_user.id, update_data)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return updated_user


@router.get("/me/voice-settings")
async def get_voice_settings(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Get current user's voice settings."""
    return {
        "voice_settings": current_user.voice_settings or {},
        "language": current_user.language,
        "timezone": current_user.timezone
    }


@router.put("/me/voice-settings")
async def update_voice_settings(
    voice_settings: dict,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """Update current user's voice settings."""
    auth_service = AuthService(db)
    
    updated_user = await auth_service.update_user(
        current_user.id, 
        {"voice_settings": voice_settings}
    )
    
    return {
        "voice_settings": updated_user.voice_settings,
        "message": "Voice settings updated successfully"
    }


@router.get("/me/calendar-preferences")
async def get_calendar_preferences(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Get current user's calendar preferences."""
    return {
        "calendar_preferences": current_user.calendar_preferences or {},
        "timezone": current_user.timezone
    }


@router.put("/me/calendar-preferences")
async def update_calendar_preferences(
    calendar_preferences: dict,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """Update current user's calendar preferences."""
    auth_service = AuthService(db)
    
    updated_user = await auth_service.update_user(
        current_user.id, 
        {"calendar_preferences": calendar_preferences}
    )
    
    return {
        "calendar_preferences": updated_user.calendar_preferences,
        "message": "Calendar preferences updated successfully"
    }
