"""
Voice API endpoints.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.voice import VoiceService
from app.schemas.voice import (
    VoiceCommandProcessRequest, VoiceCommandProcessResponse,
    VoiceCommandListResponse, VoiceSessionListResponse,
    VoiceSettingsResponse, VoiceSettingsUpdate,
    VoiceAnalyticsResponse, VoiceCommandSuggestionsResponse
)

router = APIRouter()


@router.post("/process", response_model=VoiceCommandProcessResponse)
async def process_voice_command(
    command_request: VoiceCommandProcessRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Process a voice command."""
    voice_service = VoiceService(db)
    
    result = await voice_service.process_voice_command(
        session_id=command_request.session_id or "default",
        user_id=current_user.id,
        transcript=command_request.transcript,
        audio_data=command_request.audio_data,
        context=command_request.context
    )
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    return VoiceCommandProcessResponse(**result)


@router.get("/history", response_model=VoiceCommandListResponse)
async def get_voice_history(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get voice command history."""
    voice_service = VoiceService(db)
    commands = await voice_service.get_voice_history(current_user.id, limit, offset)
    
    return VoiceCommandListResponse(
        commands=commands,
        total=len(commands),
        page=offset // limit + 1,
        size=limit,
        has_next=len(commands) == limit,
        has_prev=offset > 0
    )


@router.get("/sessions", response_model=VoiceSessionListResponse)
async def get_voice_sessions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get voice sessions for the current user."""
    voice_service = VoiceService(db)
    # Note: This would need to be implemented in VoiceService
    # For now, return empty list
    sessions = []
    return VoiceSessionListResponse(sessions=sessions, total=len(sessions))


@router.get("/settings", response_model=VoiceSettingsResponse)
async def get_voice_settings(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's voice settings."""
    voice_service = VoiceService(db)
    settings = await voice_service.get_user_voice_settings(current_user.id)
    
    if not settings:
        # Return default settings
        return VoiceSettingsResponse(
            user_id=current_user.id,
            language="en-US",
            voice_speed=1.0,
            voice_volume=1.0,
            voice_pitch=1.0,
            auto_listen=False,
            wake_word=None,
            noise_reduction=True,
            echo_cancellation=True,
            continuous_listening=False,
            confidence_threshold=0.7,
            created_at=current_user.created_at,
            updated_at=current_user.updated_at
        )
    
    return VoiceSettingsResponse(**settings)


@router.put("/settings", response_model=VoiceSettingsResponse)
async def update_voice_settings(
    settings_update: VoiceSettingsUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update user's voice settings."""
    voice_service = VoiceService(db)
    
    # Convert to dict format expected by service
    settings_dict = {}
    if settings_update.language is not None:
        settings_dict["language"] = settings_update.language
    if settings_update.voice_speed is not None:
        settings_dict["voice_speed"] = settings_update.voice_speed
    if settings_update.voice_volume is not None:
        settings_dict["voice_volume"] = settings_update.voice_volume
    if settings_update.voice_pitch is not None:
        settings_dict["voice_pitch"] = settings_update.voice_pitch
    if settings_update.auto_listen is not None:
        settings_dict["auto_listen"] = settings_update.auto_listen
    if settings_update.wake_word is not None:
        settings_dict["wake_word"] = settings_update.wake_word
    if settings_update.noise_reduction is not None:
        settings_dict["noise_reduction"] = settings_update.noise_reduction
    if settings_update.echo_cancellation is not None:
        settings_dict["echo_cancellation"] = settings_update.echo_cancellation
    if settings_update.continuous_listening is not None:
        settings_dict["continuous_listening"] = settings_update.continuous_listening
    if settings_update.confidence_threshold is not None:
        settings_dict["confidence_threshold"] = settings_update.confidence_threshold
    
    success = await voice_service.update_user_voice_settings(current_user.id, settings_dict)
    
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update voice settings")
    
    # Get updated settings
    updated_settings = await voice_service.get_user_voice_settings(current_user.id)
    
    if not updated_settings:
        raise HTTPException(status_code=500, detail="Failed to retrieve updated settings")
    
    return VoiceSettingsResponse(**updated_settings)


@router.get("/analytics", response_model=VoiceAnalyticsResponse)
async def get_voice_analytics(
    days: int = Query(30, ge=1, le=365, description="Number of days for analytics"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get voice command analytics."""
    voice_service = VoiceService(db)
    analytics = await voice_service.get_voice_analytics(current_user.id, days)
    
    if not analytics:
        return VoiceAnalyticsResponse(
            total_commands=0,
            successful_commands=0,
            success_rate=0.0,
            average_confidence=0.0,
            intent_distribution={},
            daily_usage={},
            period_days=days
        )
    
    return VoiceAnalyticsResponse(**analytics, period_days=days)


@router.get("/suggestions", response_model=VoiceCommandSuggestionsResponse)
async def get_voice_command_suggestions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get voice command suggestions."""
    # This would typically come from a service that analyzes user patterns
    # For now, return some common suggestions
    suggestions = [
        {
            "command": "Create a meeting",
            "description": "Schedule a new meeting or appointment",
            "category": "calendar",
            "examples": [
                "Schedule a meeting with John tomorrow at 2 PM",
                "Create an appointment for Friday at 10 AM",
                "Book a meeting room for next Monday"
            ]
        },
        {
            "command": "Show my calendar",
            "description": "Display your calendar or upcoming events",
            "category": "calendar",
            "examples": [
                "Show my calendar for today",
                "What's on my schedule tomorrow?",
                "Display my upcoming events"
            ]
        },
        {
            "command": "Search events",
            "description": "Find specific events in your calendar",
            "category": "calendar",
            "examples": [
                "Find meetings with the marketing team",
                "Search for doctor appointments",
                "Look for events this week"
            ]
        },
        {
            "command": "Delete event",
            "description": "Remove an event from your calendar",
            "category": "calendar",
            "examples": [
                "Cancel my meeting tomorrow",
                "Delete the appointment on Friday",
                "Remove the team meeting"
            ]
        },
        {
            "command": "Set reminder",
            "description": "Create a reminder or notification",
            "category": "reminder",
            "examples": [
                "Remind me to call the client",
                "Set a reminder for the project deadline",
                "Alert me 30 minutes before the meeting"
            ]
        }
    ]
    
    return VoiceCommandSuggestionsResponse(
        suggestions=suggestions,
        total=len(suggestions)
    )


@router.post("/sessions/start")
async def start_voice_session(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Start a new voice session."""
    voice_service = VoiceService(db)
    session = await voice_service.create_voice_session(
        user_id=current_user.id,
        device_info={},  # Would be populated from request
        browser_info={}  # Would be populated from request
    )
    
    return {
        "session_id": session.session_id,
        "message": "Voice session started successfully"
    }


@router.post("/sessions/{session_id}/end")
async def end_voice_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """End a voice session."""
    voice_service = VoiceService(db)
    success = await voice_service.end_voice_session(session_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {"message": "Voice session ended successfully"}


@router.get("/health")
async def voice_health_check():
    """Health check for voice service."""
    return {
        "status": "healthy",
        "service": "voice",
        "message": "Voice service is operational"
    }
