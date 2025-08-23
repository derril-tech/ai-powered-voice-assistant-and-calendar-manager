"""
Main API router for the AI Voice Assistant & Calendar Manager Backend.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, calendar, voice, notifications

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(calendar.router, prefix="/calendar", tags=["calendar"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
