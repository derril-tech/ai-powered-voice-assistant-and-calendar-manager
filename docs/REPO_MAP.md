# Repository Map - AI-Powered Voice Assistant & Calendar Manager

## 📁 Project Structure Overview

This repository contains a complete full-stack application for an AI-powered voice assistant and calendar manager. The project is organized into two main directories: `frontend/` and `backend/`, each with their own comprehensive scaffold and documentation.

```
ai-powered-voice-assistant-and-calendar-manager/
├── frontend/                    # Next.js 14 React Frontend Application
├── backend/                     # FastAPI Python Backend Application
├── REPO_MAP.md                 # This file - Complete repository documentation
├── API_SPEC.md                 # API specifications and endpoints
├── UPDATED_PROMPT_FOR_CLAUDE_CODE.md  # Frontend-specific prompts for Claude Code
└── README.md                   # Main project documentation
```

---

## 🎯 Frontend Application (`frontend/`)

### 📋 Technology Stack
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
- **Icons**: Lucide React for consistent iconography

### 📁 Frontend Directory Structure

```
frontend/
├── package.json                 # Dependencies and scripts
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles and CSS variables
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page with auth redirect
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components (Shadcn/ui style)
│   │   │   ├── button.tsx      # Button component with variants
│   │   │   ├── card.tsx        # Card component
│   │   │   ├── badge.tsx       # Badge component
│   │   │   ├── toaster.tsx     # Toast notification system
│   │   │   ├── toast.tsx       # Individual toast component
│   │   │   └── loading-spinner.tsx  # Loading spinner component
│   │   ├── providers/          # Context providers
│   │   │   ├── auth-provider.tsx     # Authentication context
│   │   │   └── voice-provider.tsx    # Voice assistant context
│   │   ├── dashboard.tsx       # Main dashboard layout
│   │   ├── header.tsx          # Application header
│   │   ├── sidebar.tsx         # Navigation sidebar
│   │   ├── voice-assistant.tsx # Voice interaction component
│   │   ├── calendar-view.tsx   # Calendar display component
│   │   └── providers.tsx       # Main providers wrapper
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-auth-store.ts   # Zustand auth store
│   │   ├── use-voice-store.ts  # Zustand voice commands store
│   │   ├── use-voice-recognition.ts  # Web Speech API hook
│   │   └── use-toast.ts        # Toast notification hook
│   ├── lib/                    # Utility libraries and configurations
│   │   ├── index.ts            # Main library exports
│   │   ├── utils.ts            # General utility functions
│   │   ├── constants.ts        # Application constants
│   │   ├── api.ts              # API client and WebSocket
│   │   ├── validation.ts       # Zod validation schemas
│   │   ├── voice-processor.ts  # Voice command processing
│   │   ├── calendar-utils.ts   # Calendar management utilities
│   │   ├── performance.ts      # Performance monitoring
│   │   ├── accessibility.ts    # Accessibility utilities
│   │   └── examples.ts         # Usage examples for all utilities
│   └── types/                  # TypeScript type definitions
│       └── index.ts            # Centralized type definitions
└── README.md                   # Frontend-specific documentation
```

### 🔧 Key Frontend Features

#### 1. **Voice Assistant Integration**
- **File**: `src/components/voice-assistant.tsx`
- **Hook**: `src/hooks/use-voice-recognition.ts`
- **Processor**: `src/lib/voice-processor.ts`
- **Store**: `src/hooks/use-voice-store.ts`
- **Features**: Real-time speech recognition, command processing, confidence scoring, error handling

#### 2. **Calendar Management**
- **File**: `src/components/calendar-view.tsx`
- **Utilities**: `src/lib/calendar-utils.ts`
- **Features**: Monthly/weekly/daily views, event display, date navigation, event management

#### 3. **Authentication System**
- **Provider**: `src/components/providers/auth-provider.tsx`
- **Store**: `src/hooks/use-auth-store.ts`
- **API**: `src/lib/api.ts` (authApi)
- **Features**: JWT token management, user profile, persistent sessions

#### 4. **State Management**
- **Global State**: Zustand stores for auth and voice commands
- **Server State**: TanStack Query for API data
- **Form State**: React Hook Form with Zod validation
- **Real-time**: WebSocket client for live updates

#### 5. **UI/UX System**
- **Design System**: Tailwind CSS with custom CSS variables
- **Components**: Radix UI primitives + custom components
- **Theming**: Dark/light mode support
- **Accessibility**: WCAG 2.1 AA compliance
- **Animations**: Framer Motion for smooth interactions

#### 6. **Performance & Optimization**
- **Monitoring**: `src/lib/performance.ts`
- **Caching**: In-memory cache with TTL
- **Lazy Loading**: Dynamic imports and code splitting
- **Bundle Analysis**: Performance monitoring tools

#### 7. **Accessibility Features**
- **Manager**: `src/lib/accessibility.ts`
- **ARIA Support**: Comprehensive ARIA utilities
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Live regions and announcements
- **Focus Management**: Focus trapping and restoration

---

## 🐍 Backend Application (`backend/`)

### 📋 Technology Stack
- **Framework**: FastAPI (Python 3.9+)
- **Database**: PostgreSQL with pgvector for embeddings
- **ORM**: SQLAlchemy 2.0+ with async support
- **Authentication**: JWT with refresh tokens
- **AI Integration**: OpenAI API, Anthropic Claude API, LangChain
- **Real-time**: WebSocket connections with Socket.IO
- **Caching**: Redis for session and data caching
- **Task Queue**: Celery with Redis broker
- **Testing**: Pytest with async support
- **Documentation**: Auto-generated OpenAPI/Swagger docs

### 📁 Backend Directory Structure

```
backend/
├── requirements.txt            # Python dependencies
├── pyproject.toml             # Project configuration
├── alembic.ini                # Database migration configuration
├── .env.example               # Environment variables template
├── app/
│   ├── __init__.py
│   ├── main.py                # FastAPI application entry point
│   ├── config.py              # Application configuration
│   ├── database.py            # Database connection setup
│   ├── dependencies.py        # Dependency injection
│   ├── middleware.py          # Custom middleware
│   ├── api/                   # API routes
│   │   ├── __init__.py
│   │   ├── v1/                # API version 1
│   │   │   ├── __init__.py
│   │   │   ├── auth.py        # Authentication endpoints
│   │   │   ├── calendar.py    # Calendar management endpoints
│   │   │   ├── voice.py       # Voice processing endpoints
│   │   │   ├── users.py       # User management endpoints
│   │   │   └── websocket.py   # WebSocket endpoints
│   │   └── deps.py            # API dependencies
│   ├── core/                  # Core application logic
│   │   ├── __init__.py
│   │   ├── security.py        # Security utilities
│   │   ├── config.py          # Core configuration
│   │   └── exceptions.py      # Custom exceptions
│   ├── models/                # Database models
│   │   ├── __init__.py
│   │   ├── user.py            # User model
│   │   ├── calendar.py        # Calendar and event models
│   │   ├── voice.py           # Voice command models
│   │   └── base.py            # Base model class
│   ├── schemas/               # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py            # User schemas
│   │   ├── calendar.py        # Calendar schemas
│   │   ├── voice.py           # Voice schemas
│   │   └── common.py          # Common schemas
│   ├── services/              # Business logic services
│   │   ├── __init__.py
│   │   ├── auth_service.py    # Authentication service
│   │   ├── calendar_service.py # Calendar management service
│   │   ├── voice_service.py   # Voice processing service
│   │   ├── ai_service.py      # AI integration service
│   │   └── notification_service.py # Notification service
│   ├── utils/                 # Utility functions
│   │   ├── __init__.py
│   │   ├── date_utils.py      # Date/time utilities
│   │   ├── text_utils.py      # Text processing utilities
│   │   └── validators.py      # Custom validators
│   └── tests/                 # Test suite
│       ├── __init__.py
│       ├── conftest.py        # Test configuration
│       ├── test_auth.py       # Authentication tests
│       ├── test_calendar.py   # Calendar tests
│       └── test_voice.py      # Voice processing tests
├── alembic/                   # Database migrations
│   ├── versions/              # Migration files
│   ├── env.py                 # Migration environment
│   └── script.py.mako         # Migration template
├── scripts/                   # Utility scripts
│   ├── setup_db.py            # Database setup script
│   └── seed_data.py           # Data seeding script
└── README.md                  # Backend-specific documentation
```

### 🔧 Key Backend Features

#### 1. **Authentication & Authorization**
- **File**: `app/api/v1/auth.py`
- **Service**: `app/services/auth_service.py`
- **Security**: `app/core/security.py`
- **Features**: JWT tokens, refresh tokens, password hashing, role-based access

#### 2. **Calendar Management**
- **File**: `app/api/v1/calendar.py`
- **Service**: `app/services/calendar_service.py`
- **Models**: `app/models/calendar.py`
- **Features**: CRUD operations, recurring events, reminders, calendar sync

#### 3. **Voice Processing**
- **File**: `app/api/v1/voice.py`
- **Service**: `app/services/voice_service.py`
- **AI Integration**: `app/services/ai_service.py`
- **Features**: Natural language processing, intent recognition, entity extraction

#### 4. **AI Integration**
- **Service**: `app/services/ai_service.py`
- **Features**: OpenAI GPT integration, Claude API, LangChain workflows, embedding storage

#### 5. **Real-time Communication**
- **File**: `app/api/v1/websocket.py`
- **Features**: WebSocket connections, real-time updates, event broadcasting

#### 6. **Database Management**
- **ORM**: SQLAlchemy with async support
- **Migrations**: Alembic for schema management
- **Vector Storage**: pgvector for AI embeddings
- **Caching**: Redis for performance optimization

#### 7. **API Documentation**
- **Auto-generated**: OpenAPI/Swagger documentation
- **Interactive**: Built-in API testing interface
- **Versioning**: API version management

---

## 🔗 Integration Points

### Frontend ↔ Backend Communication

#### 1. **REST API Endpoints**
- **Base URL**: `http://localhost:8000/api/v1`
- **Authentication**: JWT Bearer tokens
- **Content-Type**: `application/json`
- **Error Handling**: Standardized error responses

#### 2. **WebSocket Connections**
- **URL**: `ws://localhost:8000/ws`
- **Authentication**: Token-based WebSocket auth
- **Events**: Real-time calendar updates, voice processing status

#### 3. **File Uploads**
- **Voice Audio**: Multipart form data
- **User Avatars**: Image uploads
- **Calendar Attachments**: File attachments for events

### Data Flow Architecture

```
Frontend (React/Next.js)
    ↓ HTTP/WebSocket
Backend (FastAPI)
    ↓ Database
PostgreSQL + Redis
    ↓ AI APIs
OpenAI/Claude/LangChain
```

---

## 🚀 Development Workflow

### Frontend Development
1. **Setup**: `cd frontend && npm install`
2. **Development**: `npm run dev`
3. **Build**: `npm run build`
4. **Testing**: `npm run test`
5. **Linting**: `npm run lint`

### Backend Development
1. **Setup**: `cd backend && pip install -r requirements.txt`
2. **Database**: `python scripts/setup_db.py`
3. **Development**: `uvicorn app.main:app --reload`
4. **Testing**: `pytest`
5. **Migrations**: `alembic upgrade head`

### Environment Configuration
- **Frontend**: `.env.local` for API URLs and feature flags
- **Backend**: `.env` for database, AI APIs, and security settings
- **Shared**: Common environment variables for development/production

---

## 📚 Documentation Files

### 1. **REPO_MAP.md** (This File)
- Complete repository structure documentation
- Technology stack overview
- Component and service descriptions
- Integration points and data flow

### 2. **API_SPEC.md**
- Detailed API endpoint specifications
- Request/response schemas
- Authentication requirements
- Error handling patterns

### 3. **UPDATED_PROMPT_FOR_CLAUDE_CODE.md**
- Frontend-specific development prompts
- Component implementation guidelines
- UI/UX requirements and patterns
- Claude Code integration instructions

### 4. **CLAUDE.md** ⭐ **SINGLE SOURCE OF TRUTH**
- **Location**: `docs/CLAUDE.md` - Complete Claude Code development guide
- 80/20 development strategy and responsibilities
- Infrastructure team vs Claude Code tasks
- Implementation roadmap and success criteria
- AI/ML framework architecture and implementation
- Development guidelines and best practices
- Failure-mode playbook and troubleshooting

### 5. **README.md** (Main)
- Project overview and features
- Quick start guide
- Deployment instructions
- Contributing guidelines

---

## 🎯 Claude Code Integration Points

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

### Key Integration Files for Claude Code
1. **`frontend/src/lib/index.ts`** - Main utility exports
2. **`frontend/src/types/index.ts`** - TypeScript definitions
3. **`frontend/src/lib/examples.ts`** - Usage examples
4. **`backend/app/main.py`** - FastAPI application setup
5. **`backend/app/config.py`** - Configuration management
6. **`backend/app/dependencies.py`** - Dependency injection

---

## 🔧 Configuration Files

### Frontend Configuration
- **`package.json`**: Dependencies and scripts
- **`next.config.js`**: Next.js configuration
- **`tailwind.config.js`**: Tailwind CSS customization
- **`tsconfig.json`**: TypeScript compiler options

### Backend Configuration
- **`requirements.txt`**: Python dependencies
- **`pyproject.toml`**: Project metadata and tools
- **`alembic.ini`**: Database migration configuration
- **`.env.example`**: Environment variables template

---

## 📊 Performance Considerations

### Frontend Performance
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **Caching**: TanStack Query caching strategies
- **Bundle Analysis**: Webpack bundle analyzer

### Backend Performance
- **Async Operations**: FastAPI async/await support
- **Database Optimization**: Connection pooling, query optimization
- **Caching**: Redis for frequently accessed data
- **Background Tasks**: Celery for long-running operations

---

## 🔒 Security Features

### Frontend Security
- **Input Validation**: Zod schema validation
- **XSS Prevention**: React automatic escaping
- **CSRF Protection**: Token-based CSRF protection
- **Secure Storage**: Local storage encryption

### Backend Security
- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control
- **Input Validation**: Pydantic model validation
- **Rate Limiting**: API rate limiting
- **CORS**: Cross-origin resource sharing

---

## 🧪 Testing Strategy

### Frontend Testing
- **Unit Tests**: Jest for component testing
- **Integration Tests**: React Testing Library
- **E2E Tests**: Playwright for end-to-end testing
- **Accessibility Tests**: axe-core for a11y testing

### Backend Testing
- **Unit Tests**: Pytest for service testing
- **Integration Tests**: FastAPI TestClient
- **Database Tests**: Test database with fixtures
- **API Tests**: OpenAPI specification testing

---

## 📈 Monitoring and Logging

### Frontend Monitoring
- **Performance**: Core Web Vitals monitoring
- **Error Tracking**: Error boundary and logging
- **Analytics**: User interaction tracking
- **Accessibility**: Automated a11y monitoring

### Backend Monitoring
- **Application Logs**: Structured logging with loguru
- **Performance Metrics**: Response time monitoring
- **Database Monitoring**: Query performance tracking
- **Health Checks**: Application health endpoints

---

This repository map provides Claude Code with a comprehensive understanding of the complete application architecture, enabling efficient development and maintenance of both frontend and backend components.
