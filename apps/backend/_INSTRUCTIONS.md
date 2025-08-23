# Backend Instructions

## CLAUDE_TASK: Backend Development Guidelines

### Editable Areas
- `app/api/` - API endpoints (safe to edit)
- `app/models/` - Database models (safe to edit)
- `app/schemas/` - Pydantic schemas (safe to edit)
- `app/services/` - Business logic services (safe to edit)
- `app/core/` - Core configuration and utilities (safe to edit)

### Do Not Touch
- `requirements.txt` - Python dependencies (locked)
- `alembic.ini` - Database migration configuration (locked)
- `Dockerfile` - Container configuration (locked)
- `docker-compose.yml` - Service orchestration (locked)

### Development Guidelines
1. Use FastAPI for all API endpoints
2. Follow RESTful API design principles
3. Implement proper error handling and validation
4. Use Pydantic for request/response schemas
5. Implement proper authentication and authorization
6. Use SQLAlchemy for database operations
7. Follow async/await patterns
8. Implement proper logging and monitoring

### TODO Markers
- [ ] Implement voice processing service
- [ ] Add calendar integration API
- [ ] Create notification system
- [ ] Add user authentication endpoints
- [ ] Implement real-time WebSocket support
- [ ] Add rate limiting and security measures
- [ ] Implement caching layer
- [ ] Add comprehensive testing

### Performance Requirements
- API response time < 200ms (p95)
- Database query time < 50ms (p95)
- Support 1000+ concurrent users
- 99.9% uptime SLA

### Security Requirements
- JWT token authentication
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS configuration
- HTTPS enforcement
- SQL injection prevention
