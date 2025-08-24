"""
Calendar provider schemas for external calendar integrations.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


class CalendarProviderResponse(BaseModel):
    """Response model for calendar provider information."""
    provider: str = Field(..., description="Provider identifier (google, microsoft, apple)")
    name: str = Field(..., description="Human-readable provider name")
    connected: bool = Field(..., description="Whether the provider is connected")
    calendar_count: int = Field(0, description="Number of calendars from this provider")
    last_sync: Optional[datetime] = Field(None, description="Last sync timestamp")
    auth_url: Optional[str] = Field(None, description="Authentication URL for this provider")


class ProviderAuthRequest(BaseModel):
    """Request model for provider authentication."""
    provider: str = Field(..., description="Provider to authenticate with")
    redirect_uri: Optional[str] = Field(None, description="OAuth redirect URI")
    scopes: Optional[List[str]] = Field(None, description="Requested OAuth scopes")


class ProviderAuthResponse(BaseModel):
    """Response model for provider authentication."""
    provider: str = Field(..., description="Provider identifier")
    auth_url: Optional[str] = Field(None, description="OAuth authorization URL")
    status: str = Field(..., description="Authentication status (pending, completed, failed)")
    expires_at: Optional[datetime] = Field(None, description="When the auth flow expires")


class CalendarSyncRequest(BaseModel):
    """Request model for calendar synchronization."""
    providers: List[str] = Field(..., description="List of providers to sync")
    force_sync: bool = Field(False, description="Force full sync instead of incremental")
    sync_direction: str = Field("bidirectional", description="Sync direction (inbound, outbound, bidirectional)")


class CalendarSyncResponse(BaseModel):
    """Response model for calendar synchronization."""
    synced_events: int = Field(..., description="Number of events synced")
    sync_errors: List[Dict[str, str]] = Field(default_factory=list, description="List of sync errors")
    last_sync: datetime = Field(..., description="Timestamp of last sync")
    next_sync: datetime = Field(..., description="Timestamp of next scheduled sync")


class SyncStatusResponse(BaseModel):
    """Response model for sync status."""
    providers: List[Dict[str, Any]] = Field(..., description="Status for each provider")
    overall_status: str = Field(..., description="Overall sync status (synced, partial, failed)")


class ExternalEventResponse(BaseModel):
    """Response model for external calendar events."""
    id: Optional[str] = Field(None, description="Internal event ID")
    title: str = Field(..., description="Event title")
    start_time: datetime = Field(..., description="Event start time")
    end_time: datetime = Field(..., description="Event end time")
    location: Optional[str] = Field(None, description="Event location")
    description: Optional[str] = Field(None, description="Event description")
    provider: str = Field(..., description="Source provider")
    external_id: Optional[str] = Field(None, description="External provider's event ID")


class ProviderConnectionRequest(BaseModel):
    """Request model for connecting to a provider."""
    provider: str = Field(..., description="Provider to connect to")
    credentials: Dict[str, Any] = Field(..., description="Provider-specific credentials")


class ProviderConnectionResponse(BaseModel):
    """Response model for provider connection."""
    provider: str = Field(..., description="Provider identifier")
    connected: bool = Field(..., description="Whether connection was successful")
    calendars: List[Dict[str, Any]] = Field(default_factory=list, description="Available calendars")
    error: Optional[str] = Field(None, description="Error message if connection failed")


class CalendarListResponse(BaseModel):
    """Response model for list of calendars from a provider."""
    provider: str = Field(..., description="Provider identifier")
    calendars: List[Dict[str, Any]] = Field(..., description="List of calendars")
    total_count: int = Field(..., description="Total number of calendars")


class SyncConflictResponse(BaseModel):
    """Response model for sync conflicts."""
    event_id: str = Field(..., description="Internal event ID")
    external_id: str = Field(..., description="External event ID")
    conflict_type: str = Field(..., description="Type of conflict (time_overlap, title_mismatch, etc.)")
    local_version: Dict[str, Any] = Field(..., description="Local event data")
    external_version: Dict[str, Any] = Field(..., description="External event data")
    resolution: Optional[str] = Field(None, description="How to resolve the conflict")


class ProviderSettingsRequest(BaseModel):
    """Request model for updating provider settings."""
    provider: str = Field(..., description="Provider identifier")
    settings: Dict[str, Any] = Field(..., description="Provider-specific settings")
    sync_frequency: Optional[int] = Field(None, description="Sync frequency in minutes")
    auto_sync: bool = Field(True, description="Whether to auto-sync")
    sync_direction: str = Field("bidirectional", description="Sync direction")


class ProviderSettingsResponse(BaseModel):
    """Response model for provider settings."""
    provider: str = Field(..., description="Provider identifier")
    settings: Dict[str, Any] = Field(..., description="Current settings")
    sync_frequency: int = Field(..., description="Sync frequency in minutes")
    auto_sync: bool = Field(..., description="Whether auto-sync is enabled")
    sync_direction: str = Field(..., description="Current sync direction")
    last_updated: datetime = Field(..., description="When settings were last updated")
