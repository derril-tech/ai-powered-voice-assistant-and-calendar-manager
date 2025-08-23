"""
Notification service for managing user notifications and alerts.
"""

import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
import structlog

from app.core.logging import LoggerMixin
from app.models.notification import Notification

logger = structlog.get_logger()


class NotificationService(LoggerMixin):
    """Notification service for managing user notifications and alerts."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_notification(self, user_id: str, title: str, message: str,
                                notification_type: str = "info", category: str = "general",
                                priority: str = "normal", delivery_methods: Dict = None,
                                scheduled_at: datetime = None, related_event_id: str = None,
                                related_voice_command_id: str = None, metadata: Dict = None) -> Notification:
        """Create a new notification."""
        notification = Notification(
            id=str(uuid.uuid4()),
            user_id=user_id,
            title=title,
            message=message,
            notification_type=notification_type,
            category=category,
            priority=priority,
            delivery_methods=delivery_methods or {"push": True},
            scheduled_at=scheduled_at,
            related_event_id=related_event_id,
            related_voice_command_id=related_voice_command_id,
            metadata=metadata or {}
        )
        
        self.db.add(notification)
        await self.db.commit()
        await self.db.refresh(notification)
        
        self.logger.info("Notification created", notification_id=notification.id, user_id=user_id)
        return notification
    
    async def get_user_notifications(self, user_id: str, limit: int = 50, offset: int = 0,
                                   unread_only: bool = False) -> List[Notification]:
        """Get notifications for a user."""
        try:
            query = select(Notification).where(Notification.user_id == user_id)
            
            if unread_only:
                query = query.where(Notification.is_read == False)
            
            query = query.order_by(Notification.created_at.desc()).limit(limit).offset(offset)
            
            result = await self.db.execute(query)
            return result.scalars().all()
            
        except Exception as e:
            self.logger.error("Failed to get user notifications", error=str(e))
            return []
    
    async def mark_notification_read(self, notification_id: str, user_id: str) -> bool:
        """Mark a notification as read."""
        try:
            result = await self.db.execute(
                select(Notification).where(
                    and_(
                        Notification.id == notification_id,
                        Notification.user_id == user_id
                    )
                )
            )
            notification = result.scalar_one_or_none()
            
            if not notification:
                return False
            
            notification.is_read = True
            notification.read_at = datetime.utcnow()
            await self.db.commit()
            
            self.logger.info("Notification marked as read", notification_id=notification_id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to mark notification as read", error=str(e))
            return False
    
    async def mark_all_notifications_read(self, user_id: str) -> bool:
        """Mark all notifications as read for a user."""
        try:
            result = await self.db.execute(
                select(Notification).where(
                    and_(
                        Notification.user_id == user_id,
                        Notification.is_read == False
                    )
                )
            )
            notifications = result.scalars().all()
            
            for notification in notifications:
                notification.is_read = True
                notification.read_at = datetime.utcnow()
            
            await self.db.commit()
            
            self.logger.info("All notifications marked as read", user_id=user_id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to mark all notifications as read", error=str(e))
            return False
    
    async def delete_notification(self, notification_id: str, user_id: str) -> bool:
        """Delete a notification."""
        try:
            result = await self.db.execute(
                select(Notification).where(
                    and_(
                        Notification.id == notification_id,
                        Notification.user_id == user_id
                    )
                )
            )
            notification = result.scalar_one_or_none()
            
            if not notification:
                return False
            
            await self.db.delete(notification)
            await self.db.commit()
            
            self.logger.info("Notification deleted", notification_id=notification_id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to delete notification", error=str(e))
            return False
    
    async def get_unread_count(self, user_id: str) -> int:
        """Get count of unread notifications for a user."""
        try:
            result = await self.db.execute(
                select(Notification).where(
                    and_(
                        Notification.user_id == user_id,
                        Notification.is_read == False
                    )
                )
            )
            notifications = result.scalars().all()
            return len(notifications)
            
        except Exception as e:
            self.logger.error("Failed to get unread count", error=str(e))
            return 0
    
    async def create_event_reminder(self, user_id: str, event_id: str, event_title: str,
                                  reminder_time: datetime, reminder_type: str = "push") -> Notification:
        """Create an event reminder notification."""
        title = f"Event Reminder: {event_title}"
        message = f"Your event '{event_title}' is starting soon."
        
        return await self.create_notification(
            user_id=user_id,
            title=title,
            message=message,
            notification_type="reminder",
            category="calendar",
            priority="high",
            delivery_methods={reminder_type: True},
            scheduled_at=reminder_time,
            related_event_id=event_id,
            metadata={"reminder_type": reminder_type}
        )
    
    async def create_voice_command_notification(self, user_id: str, voice_command_id: str,
                                              intent: str, success: bool) -> Notification:
        """Create a notification for voice command processing."""
        if success:
            title = "Voice Command Processed"
            message = f"Successfully processed your voice command: {intent}"
            notification_type = "success"
        else:
            title = "Voice Command Failed"
            message = "I couldn't process your voice command. Please try again."
            notification_type = "error"
        
        return await self.create_notification(
            user_id=user_id,
            title=title,
            message=message,
            notification_type=notification_type,
            category="voice",
            priority="normal",
            related_voice_command_id=voice_command_id,
            metadata={"intent": intent, "success": success}
        )
    
    async def create_system_notification(self, user_id: str, title: str, message: str,
                                       notification_type: str = "info") -> Notification:
        """Create a system notification."""
        return await self.create_notification(
            user_id=user_id,
            title=title,
            message=message,
            notification_type=notification_type,
            category="system",
            priority="normal"
        )
    
    async def get_notification_analytics(self, user_id: str, days: int = 30) -> Dict[str, Any]:
        """Get notification analytics for a user."""
        try:
            from datetime import timedelta
            
            # Calculate date range
            end_date = datetime.utcnow()
            start_date = end_date - timedelta(days=days)
            
            # Get notifications in date range
            result = await self.db.execute(
                select(Notification).where(
                    and_(
                        Notification.user_id == user_id,
                        Notification.created_at >= start_date,
                        Notification.created_at <= end_date
                    )
                )
            )
            notifications = result.scalars().all()
            
            if not notifications:
                return {
                    "total_notifications": 0,
                    "unread_notifications": 0,
                    "notifications_by_type": {},
                    "notifications_by_category": {},
                    "read_rate": 0.0,
                    "daily_notifications": {}
                }
            
            # Calculate statistics
            total_notifications = len(notifications)
            unread_notifications = len([n for n in notifications if not n.is_read])
            read_rate = ((total_notifications - unread_notifications) / total_notifications) * 100 if total_notifications > 0 else 0
            
            # Notifications by type
            notifications_by_type = {}
            for notification in notifications:
                notification_type = notification.notification_type or "unknown"
                notifications_by_type[notification_type] = notifications_by_type.get(notification_type, 0) + 1
            
            # Notifications by category
            notifications_by_category = {}
            for notification in notifications:
                category = notification.category or "general"
                notifications_by_category[category] = notifications_by_category.get(category, 0) + 1
            
            # Daily notifications
            daily_notifications = {}
            for notification in notifications:
                date_key = notification.created_at.date().isoformat()
                daily_notifications[date_key] = daily_notifications.get(date_key, 0) + 1
            
            return {
                "total_notifications": total_notifications,
                "unread_notifications": unread_notifications,
                "notifications_by_type": notifications_by_type,
                "notifications_by_category": notifications_by_category,
                "read_rate": round(read_rate, 2),
                "daily_notifications": daily_notifications
            }
            
        except Exception as e:
            self.logger.error("Failed to get notification analytics", error=str(e))
            return {}
    
    async def cleanup_old_notifications(self, days: int = 90) -> int:
        """Clean up old notifications."""
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=days)
            
            result = await self.db.execute(
                select(Notification).where(
                    and_(
                        Notification.created_at < cutoff_date,
                        Notification.is_read == True
                    )
                )
            )
            old_notifications = result.scalars().all()
            
            count = 0
            for notification in old_notifications:
                await self.db.delete(notification)
                count += 1
            
            await self.db.commit()
            
            self.logger.info("Cleaned up old notifications", count=count)
            return count
            
        except Exception as e:
            self.logger.error("Failed to cleanup old notifications", error=str(e))
            return 0
    
    async def send_notification(self, notification: Notification) -> bool:
        """Send a notification through configured delivery methods."""
        try:
            delivery_methods = notification.delivery_methods or {}
            
            # Send push notification
            if delivery_methods.get("push"):
                await self._send_push_notification(notification)
            
            # Send email notification
            if delivery_methods.get("email"):
                await self._send_email_notification(notification)
            
            # Send SMS notification
            if delivery_methods.get("sms"):
                await self._send_sms_notification(notification)
            
            # Mark as sent
            notification.is_sent = True
            notification.sent_at = datetime.utcnow()
            await self.db.commit()
            
            self.logger.info("Notification sent", notification_id=notification.id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to send notification", error=str(e))
            return False
    
    async def _send_push_notification(self, notification: Notification) -> bool:
        """Send push notification."""
        # TODO: Implement push notification service (Firebase, OneSignal, etc.)
        self.logger.info("Push notification would be sent", notification_id=notification.id)
        return True
    
    async def _send_email_notification(self, notification: Notification) -> bool:
        """Send email notification."""
        # TODO: Implement email service
        self.logger.info("Email notification would be sent", notification_id=notification.id)
        return True
    
    async def _send_sms_notification(self, notification: Notification) -> bool:
        """Send SMS notification."""
        # TODO: Implement SMS service (Twilio, etc.)
        self.logger.info("SMS notification would be sent", notification_id=notification.id)
        return True
