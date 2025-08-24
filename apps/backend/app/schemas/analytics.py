"""
Analytics schemas for meeting insights and optimization.
"""

from typing import List, Dict, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class MeetingLoadResponse(BaseModel):
    """Meeting load analytics response."""
    total_meetings: int
    total_hours: float
    average_meeting_duration: float
    meetings_per_day: float
    busy_days: List[str]
    quiet_days: List[str]
    peak_hours: List[str]


class FocusFragmentationResponse(BaseModel):
    """Focus fragmentation analysis response."""
    total_focus_blocks: int
    average_block_duration: float
    fragmentation_score: float
    interruptions_per_day: float
    recovery_time_minutes: int
    optimal_focus_hours: List[str]


class OptimizationSuggestion(BaseModel):
    """Individual optimization suggestion."""
    type: str
    title: str
    description: str
    impact: str = Field(..., description="high, medium, or low")
    estimated_time_saved: int = Field(..., description="Time saved in minutes")


class OptimizationSuggestionsResponse(BaseModel):
    """Optimization suggestions response."""
    suggestions: List[OptimizationSuggestion]
    total_time_saved: int = Field(..., description="Total time saved in minutes")


class TimeUsageCategory(BaseModel):
    """Time usage category breakdown."""
    hours: float
    percentage: float


class TimeUsageResponse(BaseModel):
    """Time usage breakdown response."""
    total_work_hours: float
    meeting_hours: float
    focus_hours: float
    admin_hours: float
    break_hours: float
    categories: Dict[str, TimeUsageCategory]


class ProductivityFactors(BaseModel):
    """Productivity score factors."""
    meeting_efficiency: int
    focus_time: int
    schedule_optimization: int
    work_life_balance: int


class ProductivityScoreResponse(BaseModel):
    """Productivity score response."""
    score: int = Field(..., ge=0, le=100)
    trend: str = Field(..., description="increasing, decreasing, or stable")
    factors: ProductivityFactors


class AnalyticsDataResponse(BaseModel):
    """Combined analytics data response."""
    meeting_load: MeetingLoadResponse
    focus_fragmentation: FocusFragmentationResponse
    optimization_suggestions: OptimizationSuggestionsResponse
    time_usage: TimeUsageResponse
    productivity_score: ProductivityScoreResponse
