"""
Notification API endpoints.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.notification import NotificationService
from app.schemas.notification import (
    NotificationListResponse, NotificationResponse,
    NotificationMarkReadResponse, NotificationMarkAllReadResponse,
    NotificationDeleteResponse, NotificationUnreadCountResponse,
    NotificationAnalyticsResponse, NotificationSendRequest,
    NotificationSendResponse, NotificationBulkSendRequest,
    NotificationBulkSendResponse
)

router = APIRouter()


@router.get("/", response_model=NotificationListResponse)
async def get_notifications(
    unread_only: bool = Query(False, description="Show only unread notifications"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get notifications for the current user."""
    notification_service = NotificationService(db)
    notifications = await notification_service.get_user_notifications(
        user_id=current_user.id,
        limit=limit,
        offset=offset,
        unread_only=unread_only
    )
    
    # Get total count for pagination
    all_notifications = await notification_service.get_user_notifications(
        user_id=current_user.id,
        limit=1000,  # Get all for count
        offset=0,
        unread_only=unread_only
    )
    
    unread_count = await notification_service.get_unread_count(current_user.id)
    
    return NotificationListResponse(
        notifications=notifications,
        total=len(all_notifications),
        unread_count=unread_count,
        page=offset // limit + 1,
        size=limit,
        has_next=offset + limit < len(all_notifications),
        has_prev=offset > 0
    )


@router.get("/unread-count", response_model=NotificationUnreadCountResponse)
async def get_unread_count(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get unread notification count."""
    notification_service = NotificationService(db)
    unread_count = await notification_service.get_unread_count(current_user.id)
    
    # Get total count
    all_notifications = await notification_service.get_user_notifications(
        user_id=current_user.id,
        limit=1000,
        offset=0
    )
    
    return NotificationUnreadCountResponse(
        unread_count=unread_count,
        total_count=len(all_notifications)
    )


@router.put("/{notification_id}/read", response_model=NotificationMarkReadResponse)
async def mark_notification_read(
    notification_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Mark a notification as read."""
    notification_service = NotificationService(db)
    success = await notification_service.mark_notification_read(notification_id, current_user.id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    return NotificationMarkReadResponse(
        success=True,
        message="Notification marked as read",
        notification_id=notification_id
    )


@router.put("/mark-all-read", response_model=NotificationMarkAllReadResponse)
async def mark_all_notifications_read(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Mark all notifications as read."""
    notification_service = NotificationService(db)
    success = await notification_service.mark_all_notifications_read(current_user.id)
    
    if not success:
        raise HTTPException(status_code=500, detail="Failed to mark notifications as read")
    
    # Get count of notifications that were marked as read
    unread_notifications = await notification_service.get_user_notifications(
        user_id=current_user.id,
        unread_only=True,
        limit=1000
    )
    
    return NotificationMarkAllReadResponse(
        success=True,
        message="All notifications marked as read",
        marked_count=len(unread_notifications)
    )


@router.delete("/{notification_id}", response_model=NotificationDeleteResponse)
async def delete_notification(
    notification_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a notification."""
    notification_service = NotificationService(db)
    success = await notification_service.delete_notification(notification_id, current_user.id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    return NotificationDeleteResponse(
        success=True,
        message="Notification deleted successfully",
        notification_id=notification_id
    )


@router.get("/analytics", response_model=NotificationAnalyticsResponse)
async def get_notification_analytics(
    days: int = Query(30, ge=1, le=365, description="Number of days for analytics"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get notification analytics."""
    notification_service = NotificationService(db)
    analytics = await notification_service.get_notification_analytics(current_user.id, days)
    
    if not analytics:
        return NotificationAnalyticsResponse(
            total_notifications=0,
            unread_notifications=0,
            notifications_by_type={},
            notifications_by_category={},
            read_rate=0.0,
            daily_notifications={},
            period_days=days
        )
    
    return NotificationAnalyticsResponse(**analytics, period_days=days)


@router.post("/send", response_model=NotificationSendResponse)
async def send_notification(
    notification_request: NotificationSendRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Send a notification to a user."""
    notification_service = NotificationService(db)
    
    # Create notification
    notification = await notification_service.create_notification(
        user_id=notification_request.user_id,
        title=notification_request.title,
        message=notification_request.message,
        notification_type=notification_request.notification_type,
        category=notification_request.category,
        priority=notification_request.priority,
        delivery_methods=notification_request.delivery_methods,
        scheduled_at=notification_request.scheduled_at,
        metadata=notification_request.metadata
    )
    
    # Send notification
    sent_methods = []
    if notification.delivery_methods:
        for method, enabled in notification.delivery_methods.items():
            if enabled:
                sent_methods.append(method)
    
    # For now, just mark as sent (actual sending would be implemented)
    await notification_service.send_notification(notification)
    
    return NotificationSendResponse(
        success=True,
        message="Notification sent successfully",
        notification_id=notification.id,
        sent_methods=sent_methods
    )


@router.post("/send/bulk", response_model=NotificationBulkSendResponse)
async def send_bulk_notifications(
    bulk_request: NotificationBulkSendRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Send notifications to multiple users."""
    notification_service = NotificationService(db)
    
    notification_ids = []
    failed_user_ids = []
    
    for user_id in bulk_request.user_ids:
        try:
            notification = await notification_service.create_notification(
                user_id=user_id,
                title=bulk_request.title,
                message=bulk_request.message,
                notification_type=bulk_request.notification_type,
                category=bulk_request.category,
                priority=bulk_request.priority,
                delivery_methods=bulk_request.delivery_methods,
                scheduled_at=bulk_request.scheduled_at,
                metadata=bulk_request.metadata
            )
            
            # Send notification
            await notification_service.send_notification(notification)
            notification_ids.append(notification.id)
            
        except Exception:
            failed_user_ids.append(user_id)
    
    total_sent = len(notification_ids)
    failed_count = len(failed_user_ids)
    
    return NotificationBulkSendResponse(
        success=failed_count == 0,
        message=f"Sent {total_sent} notifications, {failed_count} failed",
        total_sent=total_sent,
        failed_count=failed_count,
        notification_ids=notification_ids,
        failed_user_ids=failed_user_ids
    )


@router.post("/event-reminder")
async def create_event_reminder(
    event_id: str,
    event_title: str,
    reminder_time: str,  # ISO format datetime string
    reminder_type: str = "push",
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create an event reminder notification."""
    from datetime import datetime
    
    try:
        reminder_datetime = datetime.fromisoformat(reminder_time.replace('Z', '+00:00'))
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid datetime format")
    
    notification_service = NotificationService(db)
    notification = await notification_service.create_event_reminder(
        user_id=current_user.id,
        event_id=event_id,
        event_title=event_title,
        reminder_time=reminder_datetime,
        reminder_type=reminder_type
    )
    
    return {
        "notification_id": notification.id,
        "message": "Event reminder created successfully",
        "reminder_time": reminder_time
    }


@router.post("/voice-command")
async def create_voice_command_notification(
    voice_command_id: str,
    intent: str,
    success: bool,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a voice command notification."""
    notification_service = NotificationService(db)
    notification = await notification_service.create_voice_command_notification(
        user_id=current_user.id,
        voice_command_id=voice_command_id,
        intent=intent,
        success=success
    )
    
    return {
        "notification_id": notification.id,
        "message": "Voice command notification created successfully",
        "intent": intent,
        "success": success
    }


@router.post("/system")
async def create_system_notification(
    title: str,
    message: str,
    notification_type: str = "info",
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a system notification."""
    notification_service = NotificationService(db)
    notification = await notification_service.create_system_notification(
        user_id=current_user.id,
        title=title,
        message=message,
        notification_type=notification_type
    )
    
    return {
        "notification_id": notification.id,
        "message": "System notification created successfully",
        "title": title,
        "type": notification_type
    }


@router.post("/cleanup")
async def cleanup_old_notifications(
    days: int = Query(90, ge=1, le=365, description="Delete notifications older than this many days"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Clean up old notifications."""
    notification_service = NotificationService(db)
    count = await notification_service.cleanup_old_notifications(days)
    
    return {
        "message": f"Cleaned up {count} old notifications",
        "deleted_count": count,
        "older_than_days": days
    }


@router.get("/health")
async def notification_health_check():
    """Health check for notification service."""
    return {
        "status": "healthy",
        "service": "notification",
        "message": "Notification service is operational"
    }
