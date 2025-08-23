"""
AI service for voice processing and natural language understanding.
"""

import json
import time
from typing import Dict, List, Optional, Any
from datetime import datetime
import structlog

from app.core.config import settings
from app.core.logging import LoggerMixin

logger = structlog.get_logger()


class AIService(LoggerMixin):
    """AI service for voice processing and natural language understanding."""
    
    def __init__(self):
        self.openai_client = None
        self.anthropic_client = None
        self.pinecone_client = None
        self._initialize_clients()
    
    def _initialize_clients(self):
        """Initialize AI service clients."""
        try:
            if settings.OPENAI_API_KEY:
                import openai
                self.openai_client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
                self.logger.info("OpenAI client initialized")
            
            if settings.ANTHROPIC_API_KEY:
                import anthropic
                self.anthropic_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
                self.logger.info("Anthropic client initialized")
            
            if settings.PINECONE_API_KEY:
                import pinecone
                pinecone.init(
                    api_key=settings.PINECONE_API_KEY,
                    environment=settings.PINECONE_ENVIRONMENT
                )
                self.pinecone_client = pinecone.Index(settings.PINECONE_INDEX_NAME)
                self.logger.info("Pinecone client initialized")
                
        except Exception as e:
            self.logger.error("Failed to initialize AI clients", error=str(e))
    
    async def process_voice_transcript(self, transcript: str, user_context: Dict = None) -> Dict[str, Any]:
        """Process voice transcript and extract intent and entities."""
        start_time = time.time()
        
        try:
            # Normalize transcript
            normalized_transcript = self._normalize_transcript(transcript)
            
            # Extract intent and entities
            intent_result = await self._extract_intent(normalized_transcript, user_context)
            
            # Process time
            processing_time = time.time() - start_time
            
            result = {
                "original_transcript": transcript,
                "normalized_transcript": normalized_transcript,
                "intent": intent_result.get("intent"),
                "confidence": intent_result.get("confidence", 0.0),
                "entities": intent_result.get("entities", {}),
                "processing_time": processing_time,
                "ai_model_used": intent_result.get("model", "unknown")
            }
            
            self.logger.info("Voice transcript processed", 
                           intent=result["intent"], 
                           confidence=result["confidence"],
                           processing_time=processing_time)
            
            return result
            
        except Exception as e:
            self.logger.error("Failed to process voice transcript", error=str(e))
            return {
                "original_transcript": transcript,
                "error": str(e),
                "processing_time": time.time() - start_time
            }
    
    def _normalize_transcript(self, transcript: str) -> str:
        """Normalize voice transcript for better processing."""
        # Convert to lowercase
        normalized = transcript.lower().strip()
        
        # Remove extra whitespace
        normalized = " ".join(normalized.split())
        
        # Basic punctuation normalization
        normalized = normalized.replace("?", "").replace("!", "")
        
        return normalized
    
    async def _extract_intent(self, transcript: str, user_context: Dict = None) -> Dict[str, Any]:
        """Extract intent and entities from transcript using AI."""
        try:
            if self.openai_client:
                return await self._extract_intent_openai(transcript, user_context)
            elif self.anthropic_client:
                return await self._extract_intent_anthropic(transcript, user_context)
            else:
                return self._extract_intent_fallback(transcript)
                
        except Exception as e:
            self.logger.error("Failed to extract intent", error=str(e))
            return self._extract_intent_fallback(transcript)
    
    async def _extract_intent_openai(self, transcript: str, user_context: Dict = None) -> Dict[str, Any]:
        """Extract intent using OpenAI."""
        system_prompt = self._build_system_prompt(user_context)
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Process this voice command: {transcript}"}
            ],
            temperature=0.1,
            max_tokens=500
        )
        
        try:
            result = json.loads(response.choices[0].message.content)
            result["model"] = "gpt-4"
            return result
        except json.JSONDecodeError:
            return self._extract_intent_fallback(transcript)
    
    async def _extract_intent_anthropic(self, transcript: str, user_context: Dict = None) -> Dict[str, Any]:
        """Extract intent using Anthropic Claude."""
        system_prompt = self._build_system_prompt(user_context)
        
        response = self.anthropic_client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=500,
            system=system_prompt,
            messages=[{"role": "user", "content": f"Process this voice command: {transcript}"}]
        )
        
        try:
            result = json.loads(response.content[0].text)
            result["model"] = "claude-3-sonnet"
            return result
        except json.JSONDecodeError:
            return self._extract_intent_fallback(transcript)
    
    def _extract_intent_fallback(self, transcript: str) -> Dict[str, Any]:
        """Fallback intent extraction using simple keyword matching."""
        transcript_lower = transcript.lower()
        
        # Simple keyword-based intent detection
        intents = {
            "create_event": ["create", "add", "schedule", "book", "meeting", "appointment"],
            "view_calendar": ["show", "view", "see", "calendar", "schedule", "events"],
            "delete_event": ["delete", "remove", "cancel", "clear"],
            "update_event": ["update", "change", "modify", "edit"],
            "search_events": ["search", "find", "look for"],
            "set_reminder": ["remind", "reminder", "alert", "notify"]
        }
        
        for intent, keywords in intents.items():
            if any(keyword in transcript_lower for keyword in keywords):
                return {
                    "intent": intent,
                    "confidence": 0.6,
                    "entities": {},
                    "model": "fallback"
                }
        
        return {
            "intent": "unknown",
            "confidence": 0.1,
            "entities": {},
            "model": "fallback"
        }
    
    def _build_system_prompt(self, user_context: Dict = None) -> str:
        """Build system prompt for AI intent extraction."""
        base_prompt = """
You are an AI assistant that processes voice commands for a calendar management system. 
Extract the intent and entities from the user's voice command.

Return a JSON object with the following structure:
{
    "intent": "string", // One of: create_event, view_calendar, delete_event, update_event, search_events, set_reminder, unknown
    "confidence": float, // 0.0 to 1.0
    "entities": {
        "title": "string",
        "date": "string",
        "time": "string", 
        "duration": "string",
        "location": "string",
        "attendees": ["string"],
        "priority": "string", // low, medium, high, urgent
        "description": "string"
    }
}

Common intents:
- create_event: User wants to create a new calendar event
- view_calendar: User wants to see their calendar or events
- delete_event: User wants to delete/cancel an event
- update_event: User wants to modify an existing event
- search_events: User wants to find specific events
- set_reminder: User wants to set a reminder or notification
"""
        
        if user_context:
            base_prompt += f"\nUser context: {json.dumps(user_context)}"
        
        return base_prompt
    
    async def generate_response(self, intent: str, entities: Dict, user_context: Dict = None) -> str:
        """Generate natural language response based on intent and entities."""
        try:
            if self.openai_client:
                return await self._generate_response_openai(intent, entities, user_context)
            elif self.anthropic_client:
                return await self._generate_response_anthropic(intent, entities, user_context)
            else:
                return self._generate_response_fallback(intent, entities)
                
        except Exception as e:
            self.logger.error("Failed to generate response", error=str(e))
            return self._generate_response_fallback(intent, entities)
    
    async def _generate_response_openai(self, intent: str, entities: Dict, user_context: Dict = None) -> str:
        """Generate response using OpenAI."""
        prompt = self._build_response_prompt(intent, entities, user_context)
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=200
        )
        
        return response.choices[0].message.content.strip()
    
    async def _generate_response_anthropic(self, intent: str, entities: Dict, user_context: Dict = None) -> str:
        """Generate response using Anthropic Claude."""
        prompt = self._build_response_prompt(intent, entities, user_context)
        
        response = self.anthropic_client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=200,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return response.content[0].text.strip()
    
    def _generate_response_fallback(self, intent: str, entities: Dict) -> str:
        """Fallback response generation."""
        responses = {
            "create_event": "I'll help you create that event.",
            "view_calendar": "Here's your calendar view.",
            "delete_event": "I'll help you delete that event.",
            "update_event": "I'll help you update that event.",
            "search_events": "I'll search for those events.",
            "set_reminder": "I'll set that reminder for you.",
            "unknown": "I didn't understand that command. Could you please repeat?"
        }
        
        return responses.get(intent, "I'll help you with that.")
    
    def _build_response_prompt(self, intent: str, entities: Dict, user_context: Dict = None) -> str:
        """Build prompt for response generation."""
        return f"""
Generate a natural, conversational response for a voice assistant based on the following:

Intent: {intent}
Entities: {json.dumps(entities)}
User Context: {json.dumps(user_context) if user_context else 'None'}

The response should be:
- Conversational and friendly
- Confirms the action being taken
- Mentions key details from entities
- Under 50 words
- Suitable for voice output
"""
    
    async def store_voice_embedding(self, transcript: str, intent: str, user_id: str) -> bool:
        """Store voice command embedding for learning."""
        try:
            if not self.pinecone_client:
                return False
            
            # Generate embedding
            if self.openai_client:
                embedding = await self._generate_embedding_openai(transcript)
            else:
                return False
            
            # Store in vector database
            self.pinecone_client.upsert(
                vectors=[{
                    "id": f"{user_id}_{int(time.time())}",
                    "values": embedding,
                    "metadata": {
                        "transcript": transcript,
                        "intent": intent,
                        "user_id": user_id,
                        "timestamp": datetime.utcnow().isoformat()
                    }
                }]
            )
            
            return True
            
        except Exception as e:
            self.logger.error("Failed to store voice embedding", error=str(e))
            return False
    
    async def _generate_embedding_openai(self, text: str) -> List[float]:
        """Generate embedding using OpenAI."""
        response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
