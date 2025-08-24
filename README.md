# TempoPilot™ — Voice-First Calendar Autopilot

## 🎯 Project Overview

**TempoPilot™** is a sophisticated voice-first productivity platform that turns natural conversation into flawless scheduling, reminders, and meeting intelligence across Google, Outlook, and Apple Calendar.

### 🚨 CRITICAL INFRASTRUCTURE ALIGNMENT STATUS

**Current State**: Basic voice assistant scaffold (20% complete)
**Target State**: TempoPilot™ — sophisticated voice-first calendar autopilot

**Gap Analysis:**
- **Infrastructure Completeness**: 20% (basic scaffold only)
- **Product Feature Coverage**: 15% (missing core features)
- **Calendar Integration**: 0% (not implemented)
- **AI Orchestration**: 10% (basic setup only)
- **Enterprise Features**: 0% (not implemented)

**Missing Core Components:**
1. Voice Console with live waveform and confidence meter
2. Event Composer with voice-first creation
3. Assistant Chat with context-aware conversation
4. Insights Dashboard with meeting analytics
5. Calendar Provider Abstractions (Google, Outlook, CalDAV)
6. Dual-LLM Orchestration (GPT-4 + Claude routing)
7. Voice Processing Pipeline (Whisper fallback, TTS via ElevenLabs)
8. Meeting Intelligence (real-time notes, action items, summaries)
9. Proactive Suggestions engine
10. Enterprise features (SSO/SAML, admin console, data residency)

**IMPORTANT**: This repository contains a complete infrastructure scaffold, but significant development is needed to achieve the TempoPilot™ product vision. The infrastructure is technically complete according to the 8-step plan, but the product features need to be built on top of this foundation.

## 🏗️ Complete Scaffold Structure

This repository contains a fully configured development environment with both frontend and backend applications:

```
ai-powered-voice-assistant-and-calendar-manager/
├── frontend/                    # Next.js 14 React Frontend
├── backend/                     # FastAPI Python Backend
├── REPO_MAP.md                 # Complete repository documentation
├── API_SPEC.md                 # Comprehensive API specifications
├── UPDATED_PROMPT_FOR_CLAUDE_CODE.md  # Frontend-specific prompts
└── README.md                   # This file
```

## 🚀 Key Features

### 🎤 Voice Assistant
- **Real-time Speech Recognition**: Web Speech API integration
- **Natural Language Processing**: AI-powered command interpretation
- **Intent Recognition**: Automatic detection of user intentions
- **Entity Extraction**: Smart parsing of dates, times, people, and locations
- **Voice Feedback**: Text-to-speech responses

### 📅 Calendar Management
- **Multi-view Calendar**: Month, week, day, and agenda views
- **Event Management**: Create, edit, delete, and organize events
- **Recurring Events**: Support for complex recurrence patterns
- **Attendee Management**: Invite and manage meeting participants
- **Reminders & Notifications**: Smart notification system
- **Calendar Sync**: Integration with external calendar providers

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Granular permission system
- **Data Encryption**: End-to-end data protection
- **Rate Limiting**: API protection against abuse

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach
- **Dark/Light Themes**: User preference support
- **Accessibility**: WCAG 2.1 AA compliance
- **Smooth Animations**: Framer Motion integration
- **Real-time Updates**: WebSocket-powered live updates

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.3+ with custom design system
- **UI Components**: Radix UI primitives + custom components
- **State Management**: Zustand 4.4+ for global state
- **Data Fetching**: TanStack Query 5.8+ for server state
- **Forms**: React Hook Form 7.47+ with Zod validation
- **Voice Recognition**: Web Speech API + react-speech-recognition
- **Real-time**: Socket.IO Client 4.7+ for WebSocket connections
- **Animations**: Framer Motion 10.16+ for smooth interactions

### Backend
- **Framework**: FastAPI (Python 3.9+)
- **Database**: PostgreSQL with pgvector for embeddings
- **ORM**: SQLAlchemy 2.0+ with async support
- **Authentication**: JWT with refresh tokens
- **AI Integration**: OpenAI API, Anthropic Claude API, LangChain
- **Real-time**: WebSocket connections with Socket.IO
- **Caching**: Redis for session and data caching
- **Task Queue**: Celery with Redis broker
- **Testing**: Pytest with async support

## 🤖 AI/ML Framework Architecture

### **Primary AI Framework: LangChain**
**Purpose**: Core AI orchestration and workflow management
**Use Cases**:
- **Natural Language Processing**: Intent recognition and entity extraction from voice commands
- **Conversation Management**: Context-aware dialogue handling and memory
- **Tool Integration**: Calendar operations, email sending, notification triggers
- **Chain Orchestration**: Complex multi-step workflows (voice → intent → action → response)
- **Prompt Management**: Dynamic prompt generation and template management

**Implementation**:
```python
# Voice command processing chain
voice_chain = LLMChain(
    llm=openai_gpt4,
    prompt=voice_intent_prompt,
    output_parser=IntentParser()
)

# Calendar operation chain
calendar_chain = SequentialChain([
    availability_checker,
    conflict_resolver,
    event_creator
])
```

### **Secondary Framework: LangGraph (Future Enhancement)**
**Purpose**: Advanced workflow orchestration for complex multi-agent scenarios
**Use Cases**:
- **Multi-Agent Coordination**: Calendar agent + Voice agent + Notification agent
- **Stateful Workflows**: Complex meeting scheduling with multiple participants
- **Conditional Logic**: Dynamic routing based on user preferences and context
- **Parallel Processing**: Simultaneous calendar sync and notification sending

**Implementation** (Planned):
```python
# Multi-agent workflow graph
workflow = StateGraph(MeetingSchedulerState)

workflow.add_node("voice_processor", voice_agent)
workflow.add_node("calendar_manager", calendar_agent)
workflow.add_node("notification_sender", notification_agent)

workflow.add_edge("voice_processor", "calendar_manager")
workflow.add_edge("calendar_manager", "notification_sender")
```

### **RAG (Retrieval-Augmented Generation) Implementation**
**Purpose**: Context-aware responses using user's calendar history and preferences
**Use Cases**:
- **Personalized Suggestions**: "Schedule a meeting like the one with John last week"
- **Historical Context**: "What was discussed in my last team meeting?"
- **Preference Learning**: "I usually prefer morning meetings on Tuesdays"
- **Meeting Intelligence**: "Summarize my meetings from this month"

**Implementation**:
```python
# Vector database for user context
user_context_store = ChromaDB(
    collection_name="user_context",
    embedding_function=openai_embeddings
)

# RAG chain for contextual responses
rag_chain = RetrievalQA.from_chain_type(
    llm=claude_3_sonnet,
    chain_type="stuff",
    retriever=user_context_store.as_retriever()
)
```

### **CrewAI (Alternative for Complex Scenarios)**
**Purpose**: Multi-agent collaboration for enterprise-level scheduling
**Use Cases**:
- **Enterprise Scheduling**: Multiple stakeholders with complex constraints
- **Resource Management**: Room booking, equipment allocation, travel coordination
- **Compliance Checking**: Meeting policy enforcement, security clearance
- **Stakeholder Coordination**: Automated negotiation between participants

**Implementation** (Enterprise Edition):
```python
# Multi-agent crew for complex scheduling
scheduling_crew = Crew(
    agents=[
        CalendarAgent(role="Primary Scheduler"),
        AvailabilityAgent(role="Availability Checker"),
        ConflictAgent(role="Conflict Resolver"),
        NotificationAgent(role="Communication Manager")
    ],
    tasks=[
        Task("Check all participant availability"),
        Task("Resolve scheduling conflicts"),
        Task("Send meeting invitations"),
        Task("Update calendar systems")
    ]
)
```

### **Framework Selection Matrix**

| Use Case | Primary Framework | Alternative | When to Use |
|----------|------------------|-------------|-------------|
| **Voice Command Processing** | LangChain | - | Always |
| **Simple Calendar Operations** | LangChain | - | Always |
| **Complex Multi-Step Workflows** | LangChain | LangGraph | LangGraph for stateful workflows |
| **Context-Aware Responses** | RAG + LangChain | - | Always |
| **Multi-Agent Coordination** | LangGraph | CrewAI | CrewAI for enterprise scenarios |
| **Personalization** | RAG + LangChain | - | Always |
| **Meeting Intelligence** | RAG + LangChain | - | Always |

### **AI Model Routing Strategy**

#### **Primary Models**
- **GPT-4**: Complex reasoning, creative tasks, natural language generation
- **Claude 3 Sonnet**: Analytical tasks, structured data processing, code generation
- **Whisper**: Speech-to-text transcription
- **ElevenLabs**: Text-to-speech synthesis

#### **Fallback Strategy**
```python
# Model routing with fallbacks
def route_ai_request(task_type: str, complexity: str):
    if task_type == "voice_processing":
        return openai_whisper
    elif task_type == "reasoning" and complexity == "high":
        return openai_gpt4
    elif task_type == "analysis":
        return claude_3_sonnet
    else:
        return claude_3_haiku  # Cost-effective fallback
```

### **Performance Optimization**

#### **Caching Strategy**
- **Embedding Cache**: Store frequently used embeddings in Redis
- **Response Cache**: Cache common voice command responses
- **Context Cache**: Store user context for faster retrieval

#### **Async Processing**
- **Background Tasks**: Use Celery for non-blocking AI operations
- **Streaming Responses**: Real-time voice processing with WebSockets
- **Batch Processing**: Group similar operations for efficiency

### **Security & Privacy**

#### **Data Handling**
- **Voice Data**: Process and discard immediately, never store raw audio
- **Context Data**: Encrypt user context in vector database
- **API Keys**: Rotate regularly, use environment variables
- **Audit Logging**: Log all AI interactions for compliance

#### **Model Security**
- **Input Validation**: Sanitize all inputs before AI processing
- **Output Filtering**: Validate AI responses before user exposure
- **Rate Limiting**: Prevent AI API abuse
- **Error Handling**: Graceful degradation when AI services fail

## 📚 Documentation

### 1. **REPO_MAP.md**
Complete repository structure documentation with:
- Detailed directory organization
- Technology stack overview
- Component and service descriptions
- Integration points and data flow
- Development workflow instructions
- Claude Code integration guidelines

### 2. **API_SPEC.md**
Comprehensive API specifications including:
- All REST API endpoints with request/response schemas
- WebSocket event specifications
- Authentication patterns and security
- Error handling and rate limiting
- Integration examples and code snippets
- Frontend API client usage patterns

### 3. **UPDATED_PROMPT_FOR_CLAUDE_CODE.md**
Frontend-specific development prompts with:
- Detailed component implementation guidelines
- UI/UX requirements and design patterns
- State management strategies
- Performance optimization techniques
- Accessibility implementation patterns
- Step-by-step development phases

### 4. **AI_FRAMEWORK_ARCHITECTURE.md**
Comprehensive AI/ML framework documentation including:
- LangChain as primary AI orchestration framework
- RAG implementation for context-aware responses
- LangGraph for advanced multi-agent workflows
- CrewAI for enterprise-level scheduling
- AI model routing and fallback strategies
- Performance optimization and security considerations

### 5. **CLAUDE.md** ⭐ **SINGLE SOURCE OF TRUTH**
**Location**: `docs/CLAUDE.md` - This is the authoritative Claude Code development guide
Complete development guide for Claude Code including:
- 80/20 development strategy and responsibilities
- Infrastructure team vs Claude Code tasks
- Implementation roadmap and success criteria
- AI/ML framework architecture and implementation
- Development guidelines and best practices
- Failure-mode playbook and troubleshooting
- **IMPORTANT**: Always refer to `docs/CLAUDE.md` as the main guide

## 🎯 Claude Code Integration

This scaffold is specifically designed for Claude Code to understand and build upon:

### Frontend Development
- **Component Creation**: Use existing UI components in `src/components/ui/`
- **State Management**: Leverage Zustand stores in `src/hooks/`
- **API Integration**: Use API client in `src/lib/api.ts`
- **Validation**: Apply Zod schemas in `src/lib/validation.ts`
- **Voice Processing**: Extend voice processor in `src/lib/voice-processor.ts`

### Backend Development
- **API Endpoints**: Follow patterns in `app/api/v1/`
- **Database Models**: Extend models in `app/models/`
- **Business Logic**: Add services in `app/services/`
- **Validation**: Use Pydantic schemas in `app/schemas/`
- **Testing**: Follow test patterns in `app/tests/`

### Key Integration Files
1. **`frontend/src/lib/index.ts`** - Main utility exports
2. **`frontend/src/types/index.ts`** - TypeScript definitions
3. **`frontend/src/lib/examples.ts`** - Usage examples
4. **`backend/app/main.py`** - FastAPI application setup
5. **`backend/app/config.py`** - Configuration management

## 🚀 Quick Start

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
python scripts/setup_db.py
uvicorn app.main:app --reload
```

### Environment Setup
1. Copy `.env.example` to `.env` in both frontend and backend
2. Configure database, AI API keys, and other settings
3. Run database migrations: `alembic upgrade head`

## 📊 Project Status

### ✅ Completed
- [x] Complete frontend scaffold with Next.js 14
- [x] Comprehensive backend scaffold with FastAPI
- [x] Voice recognition and processing utilities
- [x] Calendar management system
- [x] Authentication and authorization
- [x] Real-time WebSocket communication
- [x] Modern UI/UX components
- [x] Performance optimization tools
- [x] Accessibility features
- [x] Comprehensive documentation
- [x] API specifications
- [x] Claude Code integration guides

### 🔄 Ready for Development
- [ ] Frontend component implementation
- [ ] Backend API endpoint implementation
- [ ] Database model implementation
- [ ] AI integration services
- [ ] Voice processing logic
- [ ] Calendar sync features
- [ ] Testing suite implementation
- [ ] Deployment configuration

## 🎯 Development Phases

### Phase 1: Foundation Setup
- Environment configuration
- Database setup and migrations
- Basic authentication flow
- Core UI components

### Phase 2: Core Features
- Voice recognition implementation
- Calendar view components
- Event management
- Basic AI integration

### Phase 3: Advanced Features
- Natural language processing
- Advanced calendar features
- Real-time updates
- Performance optimization

### Phase 4: Polish & Deploy
- Testing and bug fixes
- Accessibility improvements
- Performance optimization
- Deployment preparation

## 🤝 Contributing

This scaffold is designed to be extended and customized. Key areas for contribution:

1. **Frontend Components**: Add new UI components and features
2. **Backend Services**: Implement additional API endpoints
3. **AI Integration**: Enhance voice processing capabilities
4. **Testing**: Add comprehensive test coverage
5. **Documentation**: Improve and expand documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions about the scaffold or development process:

1. Check the documentation files:
   - `REPO_MAP.md` for project structure
   - `API_SPEC.md` for API details
   - `UPDATED_PROMPT_FOR_CLAUDE_CODE.md` for development guidelines

2. Review the example implementations in:
   - `frontend/src/lib/examples.ts`
   - Component files in `frontend/src/components/`
   - Service files in `backend/app/services/`

3. Use the provided utility libraries and patterns for consistency

---

**Ready for Claude Code Development** 🚀

This scaffold provides everything needed to build a production-ready AI-powered voice assistant and calendar manager. The comprehensive documentation and well-structured codebase make it easy for Claude Code to understand, extend, and implement the required features.
