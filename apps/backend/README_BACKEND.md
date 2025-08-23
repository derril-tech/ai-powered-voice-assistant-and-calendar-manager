# AI Voice Assistant Backend

FastAPI backend for the AI-powered voice assistant and calendar manager with voice processing, AI integration, and real-time capabilities.

## Features

- 🎤 **Voice Processing**: Advanced speech recognition and natural language understanding
- 🤖 **AI Integration**: OpenAI GPT-4 and Anthropic Claude API integration
- 📅 **Calendar Management**: Full CRUD operations for events and scheduling
- 🔐 **Authentication**: JWT-based authentication with secure session management
- ⚡ **Real-time**: WebSocket connections for live voice interactions
- 🗄️ **Database**: PostgreSQL with pgvector for AI features
- 📧 **Notifications**: Email and push notification system
- 🔄 **Caching**: Redis for performance optimization

## Tech Stack

- **Framework**: FastAPI with Python 3.9+
- **Database**: PostgreSQL with SQLAlchemy 2.0
- **AI Vector Database**: pgvector
- **Caching**: Redis
- **Authentication**: JWT with Passlib
- **AI Services**: OpenAI GPT-4, Anthropic Claude, LangChain
- **Real-time**: WebSocket with Socket.IO
- **Documentation**: OpenAPI/Swagger
- **Testing**: pytest
- **Deployment**: Render

## Getting Started

### Prerequisites

- Python 3.9+
- PostgreSQL 13+
- Redis 6+
- OpenAI API key
- Anthropic API key

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start the development server:
```bash
uvicorn main:app --reload
```

7. Open [http://localhost:8000/docs](http://localhost:8000/docs) for API documentation.

## Project Structure

```
backend/
├── app/
│   ├── api/              # API routes
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── calendar.py   # Calendar endpoints
│   │   ├── voice.py      # Voice processing endpoints
│   │   └── users.py      # User management endpoints
│   ├── core/             # Core configuration
│   │   ├── config.py     # Settings and environment
│   │   ├── security.py   # JWT and password utilities
│   │   └── database.py   # Database configuration
│   ├── models/           # SQLAlchemy models
│   │   ├── user.py       # User model
│   │   ├── calendar.py   # Calendar and event models
│   │   └── voice.py      # Voice command models
│   ├── schemas/          # Pydantic schemas
│   │   ├── auth.py       # Authentication schemas
│   │   ├── calendar.py   # Calendar schemas
│   │   └── voice.py      # Voice processing schemas
│   ├── services/         # Business logic
│   │   ├── ai_service.py # AI integration
│   │   ├── voice_service.py # Voice processing
│   │   └── email_service.py # Email notifications
│   └── utils/            # Utility functions
├── alembic/              # Database migrations
├── tests/                # Test suite
├── main.py               # FastAPI application
├── requirements.txt      # Python dependencies
└── alembic.ini          # Alembic configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Calendar
- `GET /api/calendar/events` - Get user events
- `POST /api/calendar/events` - Create new event
- `PUT /api/calendar/events/{id}` - Update event
- `DELETE /api/calendar/events/{id}` - Delete event
- `GET /api/calendar/events/{id}` - Get event details

### Voice Processing
- `POST /api/voice/process` - Process voice command
- `GET /api/voice/commands` - Get voice command history
- `POST /api/voice/stream` - Real-time voice processing

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/preferences` - Get user preferences
- `PUT /api/users/preferences` - Update user preferences

## Database Models

### User
- Basic user information
- Authentication credentials
- Preferences and settings
- Voice recognition settings

### Calendar & Events
- Calendar management
- Event details and metadata
- Attendees and responses
- Recurrence patterns
- Reminders and notifications

### Voice Commands
- Command transcripts
- Intent recognition
- Entity extraction
- Processing results
- Confidence scores

## AI Integration

### OpenAI GPT-4
- Natural language understanding
- Context-aware responses
- Calendar optimization
- Meeting summarization

### Anthropic Claude
- Advanced reasoning
- Complex task processing
- Voice command interpretation
- Intelligent scheduling

### LangChain
- AI workflow orchestration
- Prompt management
- Context handling
- Response generation

## Real-time Features

### WebSocket Connections
- Live voice processing
- Real-time calendar updates
- Instant notifications
- Collaborative features

### Voice Streaming
- Continuous speech recognition
- Real-time command processing
- Live feedback and responses
- Error handling and recovery

## Security

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention

## Testing

Run the test suite:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=app
```

## Deployment

### Render Deployment

1. Connect your repository to Render
2. Set environment variables in Render dashboard
3. Configure PostgreSQL and Redis services
4. Deploy automatically on push to main branch

### Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - JWT secret key
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key
- `EMAIL_SERVER` - SMTP server configuration

## Performance

- Database connection pooling
- Redis caching for frequent queries
- Async/await for I/O operations
- Background task processing
- Optimized database queries

## Monitoring

- Application logging
- Error tracking
- Performance metrics
- Health checks
- API usage analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
