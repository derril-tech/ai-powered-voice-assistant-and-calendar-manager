"""
WebSocket service for real-time voice communication.
"""

import json
import uuid
from typing import Dict, Set
from fastapi import WebSocket, WebSocketDisconnect
from fastapi.applications import FastAPI
import structlog

from app.core.config import settings

logger = structlog.get_logger()


class ConnectionManager:
    """Manage WebSocket connections for real-time communication."""
    
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.user_connections: Dict[str, Set[str]] = {}
    
    async def connect(self, websocket: WebSocket, user_id: str):
        """Connect a new WebSocket client."""
        await websocket.accept()
        connection_id = str(uuid.uuid4())
        self.active_connections[connection_id] = websocket
        
        if user_id not in self.user_connections:
            self.user_connections[user_id] = set()
        self.user_connections[user_id].add(connection_id)
        
        logger.info("WebSocket connected", user_id=user_id, connection_id=connection_id)
        
        # Send connection confirmation
        await self.send_personal_message(
            {
                "type": "connection_established",
                "connection_id": connection_id,
                "message": "Connected to voice assistant"
            },
            connection_id
        )
    
    def disconnect(self, connection_id: str, user_id: str):
        """Disconnect a WebSocket client."""
        if connection_id in self.active_connections:
            del self.active_connections[connection_id]
        
        if user_id in self.user_connections:
            self.user_connections[user_id].discard(connection_id)
            if not self.user_connections[user_id]:
                del self.user_connections[user_id]
        
        logger.info("WebSocket disconnected", user_id=user_id, connection_id=connection_id)
    
    async def send_personal_message(self, message: dict, connection_id: str):
        """Send message to specific connection."""
        if connection_id in self.active_connections:
            try:
                await self.active_connections[connection_id].send_text(json.dumps(message))
            except Exception as e:
                logger.error("Failed to send personal message", error=str(e), connection_id=connection_id)
    
    async def send_to_user(self, message: dict, user_id: str):
        """Send message to all connections of a user."""
        if user_id in self.user_connections:
            for connection_id in self.user_connections[user_id]:
                await self.send_personal_message(message, connection_id)
    
    async def broadcast(self, message: dict):
        """Broadcast message to all connected clients."""
        for connection_id in list(self.active_connections.keys()):
            await self.send_personal_message(message, connection_id)


# Create connection manager instance
manager = ConnectionManager()


async def websocket_endpoint(websocket: WebSocket, token: str = None):
    """WebSocket endpoint for real-time voice communication."""
    user_id = None
    
    try:
        # Validate token and get user_id
        if token:
            # Here you would validate the JWT token
            # For now, we'll use a simple approach
            user_id = token  # In production, decode JWT to get user_id
        
        await manager.connect(websocket, user_id or "anonymous")
        
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            await handle_websocket_message(message, user_id)
            
    except WebSocketDisconnect:
        # Find connection_id for this websocket
        connection_id = None
        for cid, ws in manager.active_connections.items():
            if ws == websocket:
                connection_id = cid
                break
        
        if connection_id:
            manager.disconnect(connection_id, user_id or "anonymous")
    
    except Exception as e:
        logger.error("WebSocket error", error=str(e), user_id=user_id)
        if user_id:
            manager.disconnect("unknown", user_id)


async def handle_websocket_message(message: dict, user_id: str):
    """Handle incoming WebSocket messages."""
    message_type = message.get("type")
    
    try:
        if message_type == "voice_command":
            await handle_voice_command(message, user_id)
        elif message_type == "voice_start":
            await handle_voice_start(message, user_id)
        elif message_type == "voice_stop":
            await handle_voice_stop(message, user_id)
        elif message_type == "ping":
            await handle_ping(message, user_id)
        else:
            logger.warning("Unknown message type", message_type=message_type, user_id=user_id)
    
    except Exception as e:
        logger.error("Error handling WebSocket message", error=str(e), message_type=message_type, user_id=user_id)
        await manager.send_to_user({
            "type": "error",
            "message": "Failed to process message",
            "error": str(e)
        }, user_id)


async def handle_voice_command(message: dict, user_id: str):
    """Handle voice command message."""
    # Here you would process the voice command
    # For now, just echo back
    await manager.send_to_user({
        "type": "voice_command_response",
        "original_command": message.get("command"),
        "response": "Command received and processed",
        "timestamp": message.get("timestamp")
    }, user_id)


async def handle_voice_start(message: dict, user_id: str):
    """Handle voice recording start."""
    await manager.send_to_user({
        "type": "voice_started",
        "message": "Voice recording started",
        "timestamp": message.get("timestamp")
    }, user_id)


async def handle_voice_stop(message: dict, user_id: str):
    """Handle voice recording stop."""
    await manager.send_to_user({
        "type": "voice_stopped",
        "message": "Voice recording stopped",
        "timestamp": message.get("timestamp")
    }, user_id)


async def handle_ping(message: dict, user_id: str):
    """Handle ping message."""
    await manager.send_to_user({
        "type": "pong",
        "timestamp": message.get("timestamp")
    }, user_id)


# Create FastAPI app for WebSocket
websocket_app = FastAPI()


@websocket_app.websocket("/ws/{user_id}")
async def websocket_route(websocket: WebSocket, user_id: str):
    """WebSocket route for user connections."""
    await websocket_endpoint(websocket, user_id)
