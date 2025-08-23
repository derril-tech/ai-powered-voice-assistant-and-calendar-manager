"""
Voice service for handling voice commands and sessions.
"""

import uuid
from datetime import datetime
from typing import Dict, List, Optional, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import structlog

from app.core.logging import LoggerMixin
from app.models.voice import VoiceSession, VoiceCommand
from app.services.ai import AIService

logger = structlog.get_logger()


class VoiceService(LoggerMixin):
    """Voice service for managing voice commands and sessions."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.ai_service = AIService()
    
    async def create_voice_session(self, user_id: str, device_info: Dict = None, browser_info: Dict = None) -> VoiceSession:
        """Create a new voice session."""
        session_id = str(uuid.uuid4())
        
        voice_session = VoiceSession(
            id=str(uuid.uuid4()),
            user_id=user_id,
            session_id=session_id,
            device_info=device_info or {},
            browser_info=browser_info or {},
            is_active=True,
            started_at=datetime.utcnow()
        )
        
        self.db.add(voice_session)
        await self.db.commit()
        await self.db.refresh(voice_session)
        
        self.logger.info("Voice session created", session_id=session_id, user_id=user_id)
        return voice_session
    
    async def end_voice_session(self, session_id: str) -> bool:
        """End a voice session."""
        try:
            result = await self.db.execute(
                select(VoiceSession).where(VoiceSession.session_id == session_id)
            )
            session = result.scalar_one_or_none()
            
            if session:
                session.is_active = False
                session.ended_at = datetime.utcnow()
                await self.db.commit()
                
                self.logger.info("Voice session ended", session_id=session_id)
                return True
            
            return False
            
        except Exception as e:
            self.logger.error("Failed to end voice session", error=str(e), session_id=session_id)
            return False
    
    async def process_voice_command(self, session_id: str, user_id: str, transcript: str, 
                                  audio_data: Dict = None, context: Dict = None) -> Dict[str, Any]:
        """Process a voice command and store the result."""
        try:
            # Get or create voice session
            session = await self._get_or_create_session(session_id, user_id)
            
            # Process with AI
            ai_result = await self.ai_service.process_voice_transcript(transcript, context)
            
            # Create voice command record
            voice_command = VoiceCommand(
                id=str(uuid.uuid4()),
                session_id=session.id,
                user_id=user_id,
                original_transcript=transcript,
                processed_transcript=ai_result.get("normalized_transcript"),
                intent=ai_result.get("intent"),
                confidence=ai_result.get("confidence"),
                entities=ai_result.get("entities", {}),
                action_taken=ai_result.get("intent"),
                success=ai_result.get("intent") != "unknown",
                audio_file_path=audio_data.get("file_path") if audio_data else None,
                audio_duration=audio_data.get("duration") if audio_data else None,
                audio_format=audio_data.get("format") if audio_data else None,
                context=context or {},
                processing_time=ai_result.get("processing_time"),
                ai_model_used=ai_result.get("ai_model_used"),
                processed_at=datetime.utcnow()
            )
            
            self.db.add(voice_command)
            await self.db.commit()
            await self.db.refresh(voice_command)
            
            # Update session statistics
            await self._update_session_stats(session.id)
            
            # Store embedding for learning
            if ai_result.get("intent"):
                await self.ai_service.store_voice_embedding(transcript, ai_result["intent"], user_id)
            
            # Generate response
            response = await self.ai_service.generate_response(
                ai_result.get("intent", "unknown"),
                ai_result.get("entities", {}),
                context
            )
            
            result = {
                "command_id": voice_command.id,
                "intent": ai_result.get("intent"),
                "confidence": ai_result.get("confidence"),
                "entities": ai_result.get("entities", {}),
                "response": response,
                "success": voice_command.success,
                "processing_time": ai_result.get("processing_time")
            }
            
            self.logger.info("Voice command processed", 
                           command_id=voice_command.id,
                           intent=result["intent"],
                           confidence=result["confidence"])
            
            return result
            
        except Exception as e:
            self.logger.error("Failed to process voice command", error=str(e))
            return {
                "error": str(e),
                "success": False,
                "response": "I'm sorry, I encountered an error processing your command."
            }
    
    async def _get_or_create_session(self, session_id: str, user_id: str) -> VoiceSession:
        """Get existing session or create a new one."""
        result = await self.db.execute(
            select(VoiceSession).where(VoiceSession.session_id == session_id)
        )
        session = result.scalar_one_or_none()
        
        if not session:
            session = await self.create_voice_session(user_id)
        
        return session
    
    async def _update_session_stats(self, session_id: str) -> None:
        """Update session statistics."""
        try:
            # Get session
            result = await self.db.execute(
                select(VoiceSession).where(VoiceSession.id == session_id)
            )
            session = result.scalar_one_or_none()
            
            if not session:
                return
            
            # Get command statistics
            commands_result = await self.db.execute(
                select(VoiceCommand).where(VoiceCommand.session_id == session_id)
            )
            commands = commands_result.scalars().all()
            
            # Update statistics
            session.total_commands = len(commands)
            session.successful_commands = len([c for c in commands if c.success])
            
            if commands:
                avg_confidence = sum(c.confidence or 0 for c in commands) / len(commands)
                session.average_confidence = avg_confidence
            
            await self.db.commit()
            
        except Exception as e:
            self.logger.error("Failed to update session stats", error=str(e))
    
    async def get_voice_history(self, user_id: str, limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
        """Get user's voice command history."""
        try:
            result = await self.db.execute(
                select(VoiceCommand)
                .where(VoiceCommand.user_id == user_id)
                .order_by(VoiceCommand.created_at.desc())
                .limit(limit)
                .offset(offset)
            )
            
            commands = result.scalars().all()
            
            return [
                {
                    "id": cmd.id,
                    "transcript": cmd.original_transcript,
                    "intent": cmd.intent,
                    "confidence": cmd.confidence,
                    "success": cmd.success,
                    "created_at": cmd.created_at.isoformat(),
                    "processing_time": cmd.processing_time
                }
                for cmd in commands
            ]
            
        except Exception as e:
            self.logger.error("Failed to get voice history", error=str(e))
            return []
    
    async def get_voice_analytics(self, user_id: str, days: int = 30) -> Dict[str, Any]:
        """Get voice command analytics for a user."""
        try:
            from datetime import timedelta
            
            # Calculate date range
            end_date = datetime.utcnow()
            start_date = end_date - timedelta(days=days)
            
            # Get commands in date range
            result = await self.db.execute(
                select(VoiceCommand)
                .where(
                    VoiceCommand.user_id == user_id,
                    VoiceCommand.created_at >= start_date,
                    VoiceCommand.created_at <= end_date
                )
            )
            
            commands = result.scalars().all()
            
            if not commands:
                return {
                    "total_commands": 0,
                    "successful_commands": 0,
                    "success_rate": 0.0,
                    "average_confidence": 0.0,
                    "intent_distribution": {},
                    "daily_usage": {}
                }
            
            # Calculate statistics
            total_commands = len(commands)
            successful_commands = len([c for c in commands if c.success])
            success_rate = (successful_commands / total_commands) * 100 if total_commands > 0 else 0
            
            confidences = [c.confidence for c in commands if c.confidence is not None]
            average_confidence = sum(confidences) / len(confidences) if confidences else 0
            
            # Intent distribution
            intent_distribution = {}
            for cmd in commands:
                intent = cmd.intent or "unknown"
                intent_distribution[intent] = intent_distribution.get(intent, 0) + 1
            
            # Daily usage
            daily_usage = {}
            for cmd in commands:
                date_key = cmd.created_at.date().isoformat()
                daily_usage[date_key] = daily_usage.get(date_key, 0) + 1
            
            return {
                "total_commands": total_commands,
                "successful_commands": successful_commands,
                "success_rate": round(success_rate, 2),
                "average_confidence": round(average_confidence, 3),
                "intent_distribution": intent_distribution,
                "daily_usage": daily_usage
            }
            
        except Exception as e:
            self.logger.error("Failed to get voice analytics", error=str(e))
            return {}
    
    async def get_user_voice_settings(self, user_id: str) -> Dict[str, Any]:
        """Get user's voice settings."""
        try:
            from app.models.user import User
            
            result = await self.db.execute(
                select(User).where(User.id == user_id)
            )
            user = result.scalar_one_or_none()
            
            if not user:
                return {}
            
            return {
                "voice_settings": user.voice_settings or {},
                "language": user.language,
                "timezone": user.timezone
            }
            
        except Exception as e:
            self.logger.error("Failed to get user voice settings", error=str(e))
            return {}
    
    async def update_user_voice_settings(self, user_id: str, settings: Dict[str, Any]) -> bool:
        """Update user's voice settings."""
        try:
            from app.models.user import User
            
            result = await self.db.execute(
                select(User).where(User.id == user_id)
            )
            user = result.scalar_one_or_none()
            
            if not user:
                return False
            
            # Update voice settings
            if "voice_settings" in settings:
                user.voice_settings = settings["voice_settings"]
            
            if "language" in settings:
                user.language = settings["language"]
            
            if "timezone" in settings:
                user.timezone = settings["timezone"]
            
            user.updated_at = datetime.utcnow()
            await self.db.commit()
            
            self.logger.info("User voice settings updated", user_id=user_id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to update user voice settings", error=str(e))
            return False
