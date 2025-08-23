"""
Pydantic schemas for voice-related models.
"""

from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, validator


class VoiceSessionBase(BaseModel):
    """Base voice session schema."""
    device_info: Dict[str, Any] = Field(default_factory=dict, description="Device information")
    browser_info: Dict[str, Any] = Field(default_factory=dict, description="Browser information")


class VoiceSessionCreate(VoiceSessionBase):
    """Schema for creating a voice session."""
    pass


class VoiceSessionUpdate(BaseModel):
    """Schema for updating a voice session."""
    is_active: Optional[bool] = None
    ended_at: Optional[datetime] = None


class VoiceSessionResponse(VoiceSessionBase):
    """Schema for voice session response."""
    id: str
    user_id: str
    session_id: str
    is_active: bool
    started_at: datetime
    ended_at: Optional[datetime] = None
    total_commands: int = 0
    successful_commands: int = 0
    average_confidence: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class VoiceCommandBase(BaseModel):
    """Base voice command schema."""
    original_transcript: str = Field(..., min_length=1, description="Original voice transcript")
    processed_transcript: Optional[str] = Field(None, description="Processed/cleaned transcript")
    intent: Optional[str] = Field(None, description="Extracted intent from voice command")
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0, description="Confidence score")
    entities: Dict[str, Any] = Field(default_factory=dict, description="Extracted entities")
    action_taken: Optional[str] = Field(None, description="Action taken based on command")
    success: bool = Field(False, description="Whether command was successfully processed")
    error: Optional[str] = Field(None, description="Error message if command failed")
    audio_file_path: Optional[str] = Field(None, description="Path to audio file")
    audio_duration: Optional[float] = Field(None, ge=0.0, description="Audio duration in seconds")
    audio_format: Optional[str] = Field(None, description="Audio format")
    context: Dict[str, Any] = Field(default_factory=dict, description="Command context")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional metadata")


class VoiceCommandCreate(VoiceCommandBase):
    """Schema for creating a voice command."""
    session_id: str = Field(..., description="Voice session ID")


class VoiceCommandUpdate(BaseModel):
    """Schema for updating a voice command."""
    processed_transcript: Optional[str] = None
    intent: Optional[str] = None
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0)
    entities: Optional[Dict[str, Any]] = None
    action_taken: Optional[str] = None
    success: Optional[bool] = None
    error: Optional[str] = None
    context: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None


class VoiceCommandResponse(VoiceCommandBase):
    """Schema for voice command response."""
    id: str
    session_id: str
    user_id: str
    processing_time: Optional[float] = Field(None, ge=0.0, description="Processing time in seconds")
    ai_model_used: Optional[str] = Field(None, description="AI model used for processing")
    processed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class VoiceCommandListResponse(BaseModel):
    """Schema for voice command list response."""
    commands: List[VoiceCommandResponse]
    total: int
    page: int
    size: int
    has_next: bool
    has_prev: bool


class VoiceSessionListResponse(BaseModel):
    """Schema for voice session list response."""
    sessions: List[VoiceSessionResponse]
    total: int


class VoiceCommandProcessRequest(BaseModel):
    """Schema for processing a voice command."""
    transcript: str = Field(..., min_length=1, description="Voice transcript to process")
    session_id: Optional[str] = Field(None, description="Voice session ID")
    audio_data: Optional[Dict[str, Any]] = Field(None, description="Audio data information")
    context: Optional[Dict[str, Any]] = Field(None, description="Command context")


class VoiceCommandProcessResponse(BaseModel):
    """Schema for voice command processing response."""
    command_id: str
    intent: Optional[str]
    confidence: Optional[float]
    entities: Dict[str, Any] = Field(default_factory=dict)
    response: str
    success: bool
    processing_time: float
    ai_model_used: Optional[str] = None


class VoiceSettingsBase(BaseModel):
    """Base voice settings schema."""
    language: str = Field("en-US", description="Voice recognition language")
    voice_speed: float = Field(1.0, ge=0.5, le=2.0, description="Voice playback speed")
    voice_volume: float = Field(1.0, ge=0.0, le=1.0, description="Voice playback volume")
    voice_pitch: float = Field(1.0, ge=0.5, le=2.0, description="Voice playback pitch")
    auto_listen: bool = Field(False, description="Automatically start listening")
    wake_word: Optional[str] = Field(None, description="Custom wake word")
    noise_reduction: bool = Field(True, description="Enable noise reduction")
    echo_cancellation: bool = Field(True, description="Enable echo cancellation")
    continuous_listening: bool = Field(False, description="Enable continuous listening")
    confidence_threshold: float = Field(0.7, ge=0.0, le=1.0, description="Minimum confidence threshold")


class VoiceSettingsCreate(VoiceSettingsBase):
    """Schema for creating voice settings."""
    pass


class VoiceSettingsUpdate(BaseModel):
    """Schema for updating voice settings."""
    language: Optional[str] = None
    voice_speed: Optional[float] = Field(None, ge=0.5, le=2.0)
    voice_volume: Optional[float] = Field(None, ge=0.0, le=1.0)
    voice_pitch: Optional[float] = Field(None, ge=0.5, le=2.0)
    auto_listen: Optional[bool] = None
    wake_word: Optional[str] = None
    noise_reduction: Optional[bool] = None
    echo_cancellation: Optional[bool] = None
    continuous_listening: Optional[bool] = None
    confidence_threshold: Optional[float] = Field(None, ge=0.0, le=1.0)


class VoiceSettingsResponse(VoiceSettingsBase):
    """Schema for voice settings response."""
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class VoiceAnalyticsResponse(BaseModel):
    """Schema for voice analytics response."""
    total_commands: int
    successful_commands: int
    success_rate: float
    average_confidence: float
    intent_distribution: Dict[str, int]
    daily_usage: Dict[str, int]
    period_days: int


class VoiceIntent(BaseModel):
    """Schema for voice intent."""
    intent: str = Field(..., description="Intent name")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score")
    entities: Dict[str, Any] = Field(default_factory=dict, description="Extracted entities")
    description: Optional[str] = Field(None, description="Intent description")


class VoiceEntity(BaseModel):
    """Schema for voice entity."""
    entity_type: str = Field(..., description="Entity type")
    value: Any = Field(..., description="Entity value")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score")
    start_index: Optional[int] = Field(None, ge=0, description="Start index in transcript")
    end_index: Optional[int] = Field(None, ge=0, description="End index in transcript")


class VoiceCommandSuggestion(BaseModel):
    """Schema for voice command suggestion."""
    command: str = Field(..., description="Suggested command")
    description: str = Field(..., description="Command description")
    category: str = Field(..., description="Command category")
    examples: List[str] = Field(default_factory=list, description="Example variations")


class VoiceCommandSuggestionsResponse(BaseModel):
    """Schema for voice command suggestions response."""
    suggestions: List[VoiceCommandSuggestion]
    total: int


class VoiceRecognitionStartRequest(BaseModel):
    """Schema for starting voice recognition."""
    session_id: Optional[str] = Field(None, description="Voice session ID")
    language: Optional[str] = Field(None, description="Recognition language")
    continuous: bool = Field(False, description="Enable continuous recognition")
    interim_results: bool = Field(True, description="Include interim results")


class VoiceRecognitionStopRequest(BaseModel):
    """Schema for stopping voice recognition."""
    session_id: str = Field(..., description="Voice session ID")


class VoiceRecognitionStatus(BaseModel):
    """Schema for voice recognition status."""
    is_listening: bool
    session_id: Optional[str] = None
    language: Optional[str] = None
    confidence: Optional[float] = None
    transcript: Optional[str] = None
    error: Optional[str] = None
