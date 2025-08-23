"""
Pydantic schemas for notification-related models.
"""

from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class NotificationBase(BaseModel):
    """Base notification schema."""
    title: str = Field(..., min_length=1, max_length=200, description="Notification title")
    message: str = Field(..., min_length=1, max_length=1000, description="Notification message")
    notification_type: str = Field("info", description="Notification type (info, success, warning, error, reminder)")
    category: str = Field("general", description="Notification category (general, calendar, voice, system)")
    priority: str = Field("normal", description="Notification priority (low, normal, high, urgent)")
    delivery_methods: Dict[str, bool] = Field(default_factory=lambda: {"push": True}, description="Delivery methods")
    scheduled_at: Optional[datetime] = Field(None, description="Scheduled delivery time")
    related_event_id: Optional[str] = Field(None, description="Related event ID")
    related_voice_command_id: Optional[str] = Field(None, description="Related voice command ID")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional metadata")


class NotificationCreate(NotificationBase):
    """Schema for creating a notification."""
    pass


class NotificationUpdate(BaseModel):
    """Schema for updating a notification."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    message: Optional[str] = Field(None, min_length=1, max_length=1000)
    notification_type: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    delivery_methods: Optional[Dict[str, bool]] = None
    scheduled_at: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = None


class NotificationResponse(NotificationBase):
    """Schema for notification response."""
    id: str
    user_id: str
    is_read: bool = False
    is_sent: bool = False
    read_at: Optional[datetime] = None
    sent_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class NotificationListResponse(BaseModel):
    """Schema for notification list response."""
    notifications: List[NotificationResponse]
    total: int
    unread_count: int
    page: int
    size: int
    has_next: bool
    has_prev: bool


class NotificationMarkReadRequest(BaseModel):
    """Schema for marking notification as read."""
    notification_id: str = Field(..., description="Notification ID to mark as read")


class NotificationMarkReadResponse(BaseModel):
    """Schema for marking notification as read response."""
    success: bool
    message: str
    notification_id: str


class NotificationMarkAllReadResponse(BaseModel):
    """Schema for marking all notifications as read response."""
    success: bool
    message: str
    marked_count: int


class NotificationDeleteResponse(BaseModel):
    """Schema for notification delete response."""
    success: bool
    message: str
    notification_id: str


class NotificationUnreadCountResponse(BaseModel):
    """Schema for unread notification count response."""
    unread_count: int
    total_count: int


class NotificationAnalyticsResponse(BaseModel):
    """Schema for notification analytics response."""
    total_notifications: int
    unread_notifications: int
    notifications_by_type: Dict[str, int]
    notifications_by_category: Dict[str, int]
    read_rate: float
    daily_notifications: Dict[str, int]
    period_days: int


class NotificationPreferencesBase(BaseModel):
    """Base notification preferences schema."""
    push_enabled: bool = Field(True, description="Enable push notifications")
    email_enabled: bool = Field(True, description="Enable email notifications")
    sms_enabled: bool = Field(False, description="Enable SMS notifications")
    calendar_reminders: bool = Field(True, description="Enable calendar reminders")
    voice_command_notifications: bool = Field(True, description="Enable voice command notifications")
    system_notifications: bool = Field(True, description="Enable system notifications")
    quiet_hours_enabled: bool = Field(False, description="Enable quiet hours")
    quiet_hours_start: Optional[str] = Field(None, description="Quiet hours start time (HH:MM)")
    quiet_hours_end: Optional[str] = Field(None, description="Quiet hours end time (HH:MM)")
    timezone: str = Field("UTC", description="User timezone")


class NotificationPreferencesCreate(NotificationPreferencesBase):
    """Schema for creating notification preferences."""
    pass


class NotificationPreferencesUpdate(BaseModel):
    """Schema for updating notification preferences."""
    push_enabled: Optional[bool] = None
    email_enabled: Optional[bool] = None
    sms_enabled: Optional[bool] = None
    calendar_reminders: Optional[bool] = None
    voice_command_notifications: Optional[bool] = None
    system_notifications: Optional[bool] = None
    quiet_hours_enabled: Optional[bool] = None
    quiet_hours_start: Optional[str] = None
    quiet_hours_end: Optional[str] = None
    timezone: Optional[str] = None


class NotificationPreferencesResponse(NotificationPreferencesBase):
    """Schema for notification preferences response."""
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class NotificationTemplateBase(BaseModel):
    """Base notification template schema."""
    name: str = Field(..., min_length=1, max_length=100, description="Template name")
    title_template: str = Field(..., min_length=1, max_length=200, description="Title template")
    message_template: str = Field(..., min_length=1, max_length=1000, description="Message template")
    notification_type: str = Field(..., description="Notification type")
    category: str = Field(..., description="Notification category")
    priority: str = Field("normal", description="Notification priority")
    delivery_methods: Dict[str, bool] = Field(default_factory=lambda: {"push": True}, description="Delivery methods")
    variables: List[str] = Field(default_factory=list, description="Template variables")
    is_active: bool = Field(True, description="Whether template is active")


class NotificationTemplateCreate(NotificationTemplateBase):
    """Schema for creating a notification template."""
    pass


class NotificationTemplateUpdate(BaseModel):
    """Schema for updating a notification template."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    title_template: Optional[str] = Field(None, min_length=1, max_length=200)
    message_template: Optional[str] = Field(None, min_length=1, max_length=1000)
    notification_type: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    delivery_methods: Optional[Dict[str, bool]] = None
    variables: Optional[List[str]] = None
    is_active: Optional[bool] = None


class NotificationTemplateResponse(NotificationTemplateBase):
    """Schema for notification template response."""
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class NotificationTemplateListResponse(BaseModel):
    """Schema for notification template list response."""
    templates: List[NotificationTemplateResponse]
    total: int


class NotificationSendRequest(BaseModel):
    """Schema for sending a notification."""
    user_id: str = Field(..., description="User ID to send notification to")
    title: str = Field(..., min_length=1, max_length=200, description="Notification title")
    message: str = Field(..., min_length=1, max_length=1000, description="Notification message")
    notification_type: str = Field("info", description="Notification type")
    category: str = Field("general", description="Notification category")
    priority: str = Field("normal", description="Notification priority")
    delivery_methods: Optional[Dict[str, bool]] = Field(None, description="Delivery methods")
    scheduled_at: Optional[datetime] = Field(None, description="Scheduled delivery time")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional metadata")


class NotificationSendResponse(BaseModel):
    """Schema for sending a notification response."""
    success: bool
    message: str
    notification_id: str
    sent_methods: List[str] = Field(default_factory=list, description="Methods used to send notification")


class NotificationBulkSendRequest(BaseModel):
    """Schema for bulk sending notifications."""
    user_ids: List[str] = Field(..., min_items=1, description="List of user IDs")
    title: str = Field(..., min_length=1, max_length=200, description="Notification title")
    message: str = Field(..., min_length=1, max_length=1000, description="Notification message")
    notification_type: str = Field("info", description="Notification type")
    category: str = Field("general", description="Notification category")
    priority: str = Field("normal", description="Notification priority")
    delivery_methods: Optional[Dict[str, bool]] = Field(None, description="Delivery methods")
    scheduled_at: Optional[datetime] = Field(None, description="Scheduled delivery time")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional metadata")


class NotificationBulkSendResponse(BaseModel):
    """Schema for bulk sending notifications response."""
    success: bool
    message: str
    total_sent: int
    failed_count: int
    notification_ids: List[str] = Field(default_factory=list, description="Created notification IDs")
    failed_user_ids: List[str] = Field(default_factory=list, description="User IDs that failed")


class NotificationDeliveryStatus(BaseModel):
    """Schema for notification delivery status."""
    notification_id: str
    delivery_method: str
    status: str = Field(..., description="Delivery status (pending, sent, failed, delivered)")
    sent_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    error_message: Optional[str] = None
    retry_count: int = 0
