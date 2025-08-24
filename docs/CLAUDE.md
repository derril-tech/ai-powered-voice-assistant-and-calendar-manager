# Claude Code Development Guide - AI-Powered Voice Assistant & Calendar Manager

## ⭐ **SINGLE SOURCE OF TRUTH** ⭐

**This is the authoritative Claude Code development guide for TempoPilot™.**
- **Location**: `docs/CLAUDE.md`
- **Last Updated**: Current version with all latest updates
- **Status**: Complete and up-to-date with 80/20 development strategy

**⚠️ IMPORTANT**: Always refer to this file (`docs/CLAUDE.md`) as the main development guide.
Do not use any other CLAUDE.md files or backups.

---

## 🎯 Welcome, Claude Code!

This document provides you with specific instructions, guidelines, and best practices for developing the AI-Powered Voice Assistant & Calendar Manager application. You have access to a complete scaffold with comprehensive documentation and utilities.

## 📋 Project Overview

You are building **TempoPilot™ — Voice-First Calendar Autopilot**, a sophisticated voice-first productivity platform that turns natural conversation into flawless scheduling, reminders, and meeting intelligence across Google, Outlook, and Apple Calendar.

### 🚨 CRITICAL INFRASTRUCTURE ALIGNMENT ISSUES

**The current infrastructure is a basic voice assistant scaffold but the product vision is TempoPilot™ — a sophisticated voice-first calendar autopilot.**

**Current Gap Analysis:**
- **Infrastructure Completeness**: 20% (basic scaffold only)
- **Product Feature Coverage**: 15% (missing core features)
- **Calendar Integration**: 0% (not implemented)
- **AI Orchestration**: 10% (basic setup only)
- **Enterprise Features**: 0% (not implemented)

## 🎯 80/20 DEVELOPMENT STRATEGY

**IMPORTANT**: We are building 80% of the infrastructure and leaving 20% for Claude Code to complete. This ensures Claude Code has the foundation needed while still having meaningful work to do.

### 🏗️ INFRASTRUCTURE TEAM RESPONSIBILITIES (80% - COMPLETE)

**Calendar Provider Integrations (80% Infrastructure)**
- ✅ Calendar Provider API Endpoints - Complete
- ✅ OAuth Flow Scaffolding - Complete  
- ✅ Provider Service Architecture - Complete
- ✅ Sync Status Management - Complete
- ❌ **LEAVE FOR CLAUDE**: Actual OAuth implementation, API keys, real sync logic

**Voice Processing Pipeline (80% Infrastructure)**
- ✅ Web Speech API Integration - Complete
- ✅ Voice Processing Endpoints - Complete
- ✅ Audio Handling Infrastructure - Complete
- ❌ **LEAVE FOR CLAUDE**: Whisper fallback, ElevenLabs TTS, real-time processing

**AI Orchestration (80% Infrastructure)**
- ✅ AI Service Architecture - Complete
- ✅ Model Routing Framework - Complete
- ✅ Context Management Structure - Complete
- ❌ **LEAVE FOR CLAUDE**: Dual-LLM routing logic, preference learning, proactive suggestions

**Meeting Intelligence (80% Infrastructure)**
- ✅ Meeting Models & Schemas - Complete
- ✅ Analytics Endpoints - Complete
- ✅ Intelligence Service Framework - Complete
- ❌ **LEAVE FOR CLAUDE**: Real-time notes, action item extraction, meeting summaries

**Proactive Features (80% Infrastructure)**
- ✅ Calendar Analytics Framework - Complete
- ✅ Optimization Service Structure - Complete
- ✅ Suggestion Engine Architecture - Complete
- ❌ **LEAVE FOR CLAUDE**: Commute buffers, focus blocks, conflict resolution

**Enterprise Features (80% Infrastructure)**
- ✅ Authentication Framework - Complete
- ✅ User Management Structure - Complete
- ✅ Security Service Architecture - Complete
- ❌ **LEAVE FOR CLAUDE**: SSO/SAML, admin console, compliance controls

**Technical Infrastructure (80% Complete)**
- ✅ Database Schema & Models - Complete
- ✅ API Endpoint Structure - Complete
- ✅ Frontend Component Framework - Complete
- ✅ Service Layer Architecture - Complete
- ✅ Real-time Communication - Complete
- ✅ Error Handling & Logging - Complete
- ✅ Testing Framework - Complete
- ✅ Documentation & TypeScript Types - Complete

### 🤖 CLAUDE CODE RESPONSIBILITIES (20% - TO COMPLETE)

**Calendar Provider Integrations (20% Implementation)**
- Implement actual OAuth flows for Google, Microsoft, Apple
- Add real API keys and credentials management
- Implement bidirectional calendar sync logic
- Add conflict resolution and merge strategies
- Test and validate calendar integrations

**Voice Processing Pipeline (20% Implementation)**
- Implement Whisper API fallback mechanism
- Add ElevenLabs TTS integration
- Optimize real-time voice processing
- Implement voice command history persistence
- Add voice confidence scoring algorithms

**AI Orchestration (20% Implementation)**
- Implement dual-LLM routing logic (GPT-4 vs Claude)
- Add conversation context persistence
- Implement user preference learning models
- Add proactive suggestion algorithms
- Implement meeting intelligence AI processing

**Meeting Intelligence (20% Implementation)**
- Implement real-time note-taking during meetings
- Add AI-powered action item extraction
- Implement automated meeting summaries
- Add follow-up task generation
- Implement meeting quality scoring

**Proactive Features (20% Implementation)**
- Implement commute time calculation and buffers
- Add focus block optimization algorithms
- Implement recovery suggestions after cancellations
- Add meeting load balancing logic
- Implement intelligent conflict resolution

**Enterprise Features (20% Implementation)**
- Implement SSO/SAML authentication
- Add admin console and user management
- Implement data residency controls
- Add comprehensive audit logging
- Implement GDPR/CCPA compliance features

**Frontend Polish (20% Implementation)**
- Implement voice-first UX patterns
- Add real-time voice feedback and waveforms
- Implement accessibility features (WCAG 2.1 AA)
- Add mobile optimization for voice interface
- Implement offline support functionality

**Backend Optimization (20% Implementation)**
- Implement Redis caching strategy
- Add Celery background task processing
- Optimize AI model routing and selection
- Implement comprehensive voice processing pipeline
- Add performance monitoring and SLO tracking

## 🗺️ IMPLEMENTATION ROADMAP

### Phase 1: Core Infrastructure (Infrastructure Team - 80% Complete)
✅ **Calendar Provider Framework**
- Calendar provider API endpoints (`/api/v1/calendar-providers/*`)
- OAuth flow scaffolding for Google, Microsoft, Apple
- Provider service architecture with proper abstractions
- Sync status management and error handling

✅ **Voice Processing Foundation**
- Web Speech API integration with fallback structure
- Voice processing endpoints with audio handling
- Real-time communication infrastructure
- Voice command storage and retrieval

✅ **AI Service Architecture**
- AI service framework with model routing structure
- Context management system architecture
- Preference learning framework
- Meeting intelligence service structure

✅ **Analytics & Intelligence Framework**
- Analytics endpoints for meeting insights
- Optimization suggestion engine architecture
- Proactive feature service framework
- Meeting intelligence data models

### Phase 2: Implementation & Polish (Claude Code - 20% To Complete)

**Priority 1: Calendar Integrations**
1. Implement actual OAuth flows with real API keys
2. Add bidirectional calendar sync with conflict resolution
3. Implement calendar provider testing and validation
4. Add calendar event merge strategies

**Priority 2: Voice Processing Enhancement**
1. Implement Whisper API fallback mechanism
2. Add ElevenLabs TTS integration
3. Optimize real-time voice processing performance
4. Implement voice confidence scoring algorithms

**Priority 3: AI Orchestration**
1. Implement dual-LLM routing logic (GPT-4 vs Claude)
2. Add conversation context persistence
3. Implement user preference learning models
4. Add proactive suggestion algorithms

**Priority 4: Meeting Intelligence**
1. Implement real-time note-taking during meetings
2. Add AI-powered action item extraction
3. Implement automated meeting summaries
4. Add follow-up task generation

**Priority 5: Proactive Features**
1. Implement commute time calculation and buffers
2. Add focus block optimization algorithms
3. Implement recovery suggestions after cancellations
4. Add intelligent conflict resolution

**Priority 6: Enterprise Features**
1. Implement SSO/SAML authentication
2. Add admin console and user management
3. Implement data residency controls
4. Add comprehensive audit logging

**Priority 7: Frontend Polish**
1. Implement voice-first UX patterns
2. Add real-time voice feedback and waveforms
3. Implement accessibility features (WCAG 2.1 AA)
4. Add mobile optimization for voice interface

**Priority 8: Backend Optimization**
1. Implement Redis caching strategy
2. Add Celery background task processing
3. Optimize AI model routing and selection
4. Add performance monitoring and SLO tracking

## 🎯 SUCCESS CRITERIA

### Infrastructure Team Success (80% Complete)
- ✅ All API endpoints are defined and documented
- ✅ Database schemas are complete and migrated
- ✅ Service layer architecture is in place
- ✅ Frontend component framework is ready
- ✅ Real-time communication is established
- ✅ Error handling and logging is comprehensive
- ✅ Testing framework is set up
- ✅ Documentation is complete and accurate

### Claude Code Success (20% To Complete)
- Calendar integrations work with real providers
- Voice processing is optimized and reliable
- AI orchestration intelligently routes between models
- Meeting intelligence provides real value
- Proactive features actually improve productivity
- Enterprise features meet compliance requirements
- Frontend provides excellent voice-first UX
- Backend performance meets SLO requirements

### Key Product Features (TempoPilot™):
- **Natural Language Scheduling** — free-form commands, contextual follow-ups, entity extraction
- **Conflict Resolution** — detects clashes, offers alternatives, respects priorities
- **Proactive Suggestions** — commute buffers, focus blocks, recovery after cancellations
- **Meeting Intelligence** — real-time notes, action items, summaries, follow-up tasks
- **Smart Reminders** — urgency & priority-aware nudges via push, email, SMS
- **Personalization** — learns preferred slots, durations, travel patterns, collaborators
- **Universal Calendar Sync** — Google Calendar v3, Microsoft Graph, CalDAV

### Missing Core Components:
1. **Voice Console** — live waveform, confidence meter, transcript, quick actions
2. **Event Composer** — voice-first creation, attendees, location, conferencing, buffers
3. **Assistant Chat** — context-aware conversation, summaries, commands
4. **Insights Dashboard** — meeting load, focus/fragmentation, optimizations
5. **Settings & Preferences** — accounts, privacy, model preferences, voice persona
6. **Calendar Provider Abstractions** — Google, Outlook, CalDAV integrations
7. **Dual-LLM Orchestration** — GPT-4 + Claude routing logic
8. **Voice Processing Pipeline** — Whisper fallback, TTS via ElevenLabs
9. **Meeting Intelligence** — real-time notes, action items, summaries
10. **Proactive Suggestions** — commute buffers, focus blocks, recovery

## 🚨 INFRASTRUCTURE GAPS TO ADDRESS

### Calendar Provider Integrations (0% → 80% Infrastructure)
**Current Status**: Basic API endpoints created, but no real integration
**Infrastructure Tasks**:
- ✅ Calendar provider API endpoints (`/api/v1/calendar-providers/*`)
- ✅ OAuth flow scaffolding for Google, Microsoft, Apple
- ✅ Provider service architecture with proper abstractions
- ✅ Sync status management and error handling
- ❌ **LEAVE FOR CLAUDE**: Actual OAuth implementation, API keys, real sync logic

### Voice Processing Pipeline (10% → 80% Infrastructure)
**Current Status**: Basic Web Speech API integration only
**Infrastructure Tasks**:
- ✅ Web Speech API integration with fallback structure
- ✅ Voice processing endpoints with audio handling
- ✅ Real-time communication infrastructure
- ✅ Voice command storage and retrieval
- ❌ **LEAVE FOR CLAUDE**: Whisper fallback, ElevenLabs TTS, real-time processing

### AI Orchestration (10% → 80% Infrastructure)
**Current Status**: Basic AI service setup only
**Infrastructure Tasks**:
- ✅ AI service framework with model routing structure
- ✅ Context management system architecture
- ✅ Preference learning framework
- ✅ Meeting intelligence service structure
- ❌ **LEAVE FOR CLAUDE**: Dual-LLM routing logic, preference learning, proactive suggestions

### Meeting Intelligence (0% → 80% Infrastructure)
**Current Status**: Models exist but no AI processing
**Infrastructure Tasks**:
- ✅ Meeting models and schemas
- ✅ Analytics endpoints for meeting insights
- ✅ Intelligence service framework
- ✅ Data models for notes, action items, summaries
- ❌ **LEAVE FOR CLAUDE**: Real-time notes, action item extraction, meeting summaries

### Proactive Features (0% → 80% Infrastructure)
**Current Status**: No proactive features implemented
**Infrastructure Tasks**:
- ✅ Calendar analytics framework
- ✅ Optimization service structure
- ✅ Suggestion engine architecture
- ✅ Proactive feature service framework
- ❌ **LEAVE FOR CLAUDE**: Commute buffers, focus blocks, conflict resolution

### Enterprise Features (0% → 80% Infrastructure)
**Current Status**: Basic authentication only
**Infrastructure Tasks**:
- ✅ Authentication framework
- ✅ User management structure
- ✅ Security service architecture
- ✅ Compliance framework
- ❌ **LEAVE FOR CLAUDE**: SSO/SAML, admin console, compliance controls

### Technical Infrastructure (60% → 80% Complete)
**Current Status**: Basic scaffold in place
**Infrastructure Tasks**:
- ✅ Database schema and models
- ✅ API endpoint structure
- ✅ Frontend component framework
- ✅ Service layer architecture
- ✅ Real-time communication
- ✅ Error handling and logging
- ✅ Testing framework
- ✅ Documentation and TypeScript types
- ❌ **LEAVE FOR CLAUDE**: Redis caching, Celery tasks, performance optimization

**IMPORTANT**: When working on this project, always prioritize the TempoPilot™ product vision over the basic scaffold. The infrastructure needs significant expansion to support the sophisticated voice-first calendar autopilot features.

## 🏗️ Scaffold Architecture

### Frontend (Next.js 14 + TypeScript)
- **Location**: `frontend/` directory
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for global state, TanStack Query for server state
- **Components**: Radix UI primitives + custom components
- **Voice**: Web Speech API integration
- **Animations**: Framer Motion for micro-interactions
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography
- **Real-time**: Socket.IO Client for WebSocket communication

### Backend (FastAPI + Python)
- **Location**: `backend/` directory
- **Framework**: FastAPI with async support
- **Database**: PostgreSQL with pgvector for embeddings
- **AI Services**: OpenAI, Claude API, LangChain integration
- **Real-time**: WebSocket connections
- **Authentication**: JWT with refresh tokens
- **Caching**: Redis for session and data caching
- **Background Tasks**: Celery with Redis broker
- **Migrations**: Alembic for database schema management

## 🔧 Frontend Services & Third-Party Integrations

### Authentication & Security
- **NextAuth.js** - Primary authentication provider
- **Auth0** - Enterprise authentication (alternative)
- **Clerk** - User management and authentication
- **Supabase Auth** - Open-source auth solution

### Voice & Speech Services
- **Web Speech API** - Browser-native speech recognition
- **Azure Speech Services** - Enterprise-grade speech recognition
- **Google Cloud Speech-to-Text** - High-accuracy transcription
- **Amazon Transcribe** - AWS speech recognition service
- **ElevenLabs** - Advanced text-to-speech synthesis
- **OpenAI Whisper** - Speech-to-text API

### Calendar Integrations
- **Google Calendar API** - Primary calendar synchronization
- **Microsoft Graph API** - Outlook calendar integration
- **Apple Calendar** - iCloud calendar sync
- **CalDAV** - Standard calendar protocol support

### AI & ML Services
- **OpenAI GPT-4** - Natural language processing and generation
- **Anthropic Claude** - Advanced reasoning and complex tasks
- **LangChain** - Primary AI workflow orchestration and chaining
- **LangGraph** - Advanced workflow orchestration for complex multi-agent scenarios
- **RAG (Retrieval-Augmented Generation)** - Context-aware responses using user history
- **CrewAI** - Multi-agent collaboration for enterprise-level scheduling
- **ChromaDB** - Vector database for embeddings storage
- **Pinecone** - Alternative vector database solution

### Real-time & Communication
- **Socket.IO** - Real-time WebSocket communication
- **Pusher** - Alternative real-time service
- **Twilio** - SMS notifications and communication
- **SendGrid** - Email notification delivery
- **Resend** - Modern email API for transactional emails

### Storage & File Management
- **AWS S3** - Primary file storage solution
- **Cloudinary** - Media optimization and transformation
- **Supabase Storage** - Alternative storage solution
- **Vercel Blob** - Vercel-native file storage

### Analytics & Monitoring
- **Vercel Analytics** - Performance monitoring and insights
- **Sentry** - Error tracking and performance monitoring
- **PostHog** - Product analytics and user behavior
- **Google Analytics** - Web analytics and user tracking

### Development & Testing
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing
- **Storybook** - Component documentation and testing
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting and consistency

## 🔒 Editing Boundaries & Guardrails

### 🚫 DO NOT TOUCH - Locked Files
These files are **LOCKED** and should **NEVER** be modified by Claude:

#### Configuration Files (Locked)
- `package.json` - Dependencies and scripts (locked)
- `tsconfig.json` - TypeScript configuration (locked)
- `next.config.js` - Next.js configuration (locked)
- `tailwind.config.js` - Tailwind configuration (locked)
- `postcss.config.js` - PostCSS configuration (locked)
- `alembic.ini` - Database migration configuration (locked)
- `requirements.txt` - Python dependencies (locked)
- `pyproject.toml` - Python project configuration (locked)

#### Build & Deployment Files (Locked)
- `.github/workflows/` - CI/CD pipelines (locked)
- `Dockerfile` - Container configuration (locked)
- `docker-compose.yml` - Service orchestration (locked)
- `.dockerignore` - Docker ignore rules (locked)

#### Documentation Files (Locked)
- `README.md` - Main project documentation (locked)
- `docs/INFRASTRUCTURE_PLAN.md` - Infrastructure planning (locked)
- `docs/PRODUCT_BRIEF.md` - Product requirements (locked)
- `docs/API_SPEC.md` - API specifications (locked)
- `docs/REPO_MAP.md` - Repository structure (locked)

#### Environment Files (Locked)
- `.env.example` - Environment templates (locked)
- `.env.local` - Local environment (locked)
- `.env.production` - Production environment (locked)

### ✅ SAFE TO EDIT - Editable Files
These files are **SAFE TO EDIT** and can be modified by Claude:

#### Frontend Components (Safe to Edit)
- `apps/frontend/src/components/` - All React components
- `apps/frontend/src/hooks/` - Custom React hooks
- `apps/frontend/src/lib/` - Utility functions and services
- `apps/frontend/src/types/` - TypeScript type definitions
- `apps/frontend/src/app/` - Next.js pages and layouts

#### Backend Services (Safe to Edit)
- `apps/backend/app/api/` - API endpoints and routes
- `apps/backend/app/services/` - Business logic services
- `apps/backend/app/models/` - Database models
- `apps/frontend/src/schemas/` - Pydantic schemas
- `apps/backend/app/utils/` - Utility functions

#### Shared Packages (Safe to Edit)
- `packages/ui/src/` - UI component library
- `packages/types/src/` - Shared type definitions

#### Test Files (Safe to Edit)
- `apps/frontend/src/**/*.test.ts` - Frontend tests
- `apps/frontend/src/**/*.test.tsx` - Frontend component tests
- `apps/backend/tests/` - Backend tests

### 🎯 Editing Rules for Claude

#### 1. **File Modification Protocol**
- **Always use search_replace** for targeted changes
- **Never use edit_file** for existing files unless creating new content
- **Use search_replace with exact context** to avoid unintended changes
- **Test changes incrementally** before making multiple modifications

#### 2. **Patch Protocol & Commit Messages**

**Required Format for All Changes:**
```diff
--- a/path/to/file.ts
+++ b/path/to/file.ts
@@ -line,context +line,context @@
- old code
+ new code
```

**Commit Message Format:**
```
type(scope): brief description

- Detailed bullet points of changes
- Include breaking changes if any
- Reference related issues or features

Examples:
feat(voice): add confidence scoring to voice recognition
fix(calendar): resolve timezone handling in event creation
docs(api): update endpoint documentation for new features
```

**Patch Protocol Rules:**
- **Always include 3+ lines of context** before and after changes
- **Use exact whitespace and indentation** from original file
- **Include line numbers** in the diff header when possible
- **Group related changes** in single patch when logical
- **Separate unrelated changes** into multiple patches
- **Test each patch independently** before combining

**Example Good Patch:**
```diff
--- a/apps/frontend/src/components/voice-assistant.tsx
+++ b/apps/frontend/src/components/voice-assistant.tsx
@@ -45,6 +45,7 @@ export function VoiceAssistant() {
   const handleVoiceCommand = async (command: string) => {
     try {
       setProcessing(true);
+      const response = await processVoiceCommand(command);
+      if (response.intent === 'create_event') {
+        await createCalendarEvent(response.entities);
+      }
       setProcessing(false);
     } catch (error) {
       setError('Failed to process voice command');
     }
   };
```

**Example Bad Patch (Avoid):**
```diff
- const handleVoiceCommand = async (command: string) => {
+ const handleVoiceCommand = async (command: string) => {
+   // Add voice processing logic here
+   console.log('Processing command:', command);
+ }
```

#### 3. **Code Quality Standards**
- **Follow existing patterns** in the codebase
- **Use provided utility functions** from `lib/` directories
- **Maintain TypeScript strict mode** compliance
- **Include proper error handling** and validation
- **Add JSDoc comments** for new functions and components

#### 4. **Component Development Rules**
- **Use existing UI components** from `packages/ui/` when possible
- **Follow the established design system** and CSS variables
- **Ensure accessibility compliance** (WCAG 2.1 AA)
- **Include proper ARIA attributes** for voice interfaces
- **Test responsive behavior** on mobile and desktop

#### 5. **API Integration Rules**
- **Use existing API client** from `lib/api.ts`
- **Follow established error handling** patterns
- **Include proper loading states** and error boundaries
- **Use TanStack Query** for server state management
- **Implement proper caching strategies**

#### 6. **Voice Processing Rules**
- **Use Web Speech API** as primary voice recognition
- **Implement fallback mechanisms** for unsupported browsers
- **Include confidence scoring** and error handling
- **Provide visual feedback** for voice states
- **Ensure accessibility** for voice interfaces

#### 7. **Database & Backend Rules**
- **Use existing models** and schemas as templates
- **Follow SQLAlchemy patterns** for database operations
- **Include proper validation** with Pydantic schemas
- **Implement proper error handling** and logging
- **Use async/await** for all database operations

#### 8. **Testing Requirements**
- **Write unit tests** for new functionality
- **Include integration tests** for API endpoints
- **Test accessibility** with automated tools
- **Verify voice functionality** with manual testing
- **Ensure cross-browser compatibility**

#### 9. **Performance Guidelines**
- **Optimize bundle size** and loading times
- **Use proper caching** strategies
- **Implement lazy loading** for heavy components
- **Monitor Core Web Vitals** and performance metrics
- **Optimize voice processing** for real-time performance

### 🚨 Critical Guardrails

#### 1. **Never Modify Configuration Files**
- Configuration files are locked to prevent breaking changes
- If configuration changes are needed, document them in comments
- Use environment variables for configurable values

#### 2. **Maintain Backward Compatibility**
- API changes must maintain backward compatibility
- Database migrations must be reversible
- Component changes must not break existing usage

#### 3. **Security First**
- Never expose sensitive information in code
- Use environment variables for secrets and API keys
- Implement proper authentication and authorization
- Validate all user inputs and API responses

#### 4. **Accessibility Compliance**
- All new components must be WCAG 2.1 AA compliant
- Include proper ARIA attributes and keyboard navigation
- Test with screen readers and assistive technologies
- Ensure voice interfaces are accessible to all users

#### 5. **Performance Budgets**
- Frontend bundle size: < 500KB (gzipped)
- API response time: < 200ms for simple operations
- Voice processing latency: < 1 second
- Page load time: < 2 seconds

## 🎯 Development Guidelines for Claude Code

### 📝 Coding Conventions & Style Guide

#### TypeScript/JavaScript Conventions
- **Naming**: Use camelCase for variables/functions, PascalCase for components/classes
- **File naming**: Use kebab-case for files (e.g., `voice-assistant.tsx`, `calendar-service.ts`)
- **Component naming**: Use PascalCase and descriptive names (e.g., `VoiceConsole`, `EventComposer`)
- **Interface naming**: Prefix with 'I' for interfaces (e.g., `IVoiceCommand`, `IUserPreferences`)
- **Type naming**: Use PascalCase for types (e.g., `VoiceProcessingResult`, `CalendarEvent`)

#### Python Conventions
- **Naming**: Use snake_case for variables/functions, PascalCase for classes
- **File naming**: Use snake_case for files (e.g., `voice_service.py`, `calendar_manager.py`)
- **Class naming**: Use PascalCase (e.g., `VoiceProcessor`, `CalendarSync`)
- **Function naming**: Use descriptive snake_case (e.g., `process_voice_command`, `create_calendar_event`)

#### Commenting Standards
- **JSDoc**: Use JSDoc for all exported functions and components
- **Python docstrings**: Use Google-style docstrings for all functions and classes
- **Inline comments**: Explain complex logic, not obvious code
- **TODO comments**: Use `// TODO: description` format with clear action items

#### Code Organization
- **Single responsibility**: Each function/component should do one thing well
- **Maximum function length**: 50 lines for functions, 200 lines for components
- **Import organization**: Group imports (external, internal, relative)
- **Export structure**: Use named exports for utilities, default exports for components

### 1. **UI/UX Design Patterns for Voice Interfaces**

#### Voice-First Design Principles
```typescript
// ✅ GOOD: Voice-optimized component design
const VoiceInterface = () => {
  return (
    <div className="voice-first-layout">
      {/* Large, touch-friendly voice button */}
      <VoiceButton 
        size="xl"
        className="voice-button-primary"
        aria-label="Start voice recording"
      />
      
      {/* Clear visual feedback for voice states */}
      <VoiceStatusIndicator 
        state={voiceState}
        className="voice-status-visual"
      />
      
      {/* Accessible transcript display */}
      <TranscriptDisplay 
        transcript={transcript}
        className="voice-transcript"
        aria-live="polite"
      />
    </div>
  )
}

// ✅ GOOD: Micro-interactions for voice feedback
const VoiceFeedback = ({ isListening, confidence }) => {
  return (
    <div className={cn(
      "voice-feedback",
      isListening && "voice-feedback-listening",
      confidence > 0.8 && "voice-feedback-high-confidence"
    )}>
      <div className="voice-wave-animation" />
      <div className="voice-confidence-indicator" />
    </div>
  )
}
```

#### Accessibility-First Voice Design
```typescript
// ✅ GOOD: WCAG 2.1 AA compliant voice interface
const AccessibleVoiceInterface = () => {
  return (
    <div role="application" aria-label="Voice Assistant">
      {/* Skip links for keyboard navigation */}
      <a href="#voice-controls" className="sr-only focus:not-sr-only">
        Skip to voice controls
      </a>
      
      {/* Voice controls with proper ARIA */}
      <div id="voice-controls" role="group" aria-label="Voice controls">
        <button
          aria-pressed={isListening}
          aria-describedby="voice-instructions"
          className="voice-control-button"
        >
          <Mic className="w-6 h-6" />
          <span className="sr-only">
            {isListening ? 'Stop listening' : 'Start listening'}
          </span>
        </button>
      </div>
      
      {/* Live region for voice feedback */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="voice-feedback-live"
      >
        {voiceFeedback}
      </div>
    </div>
  )
}
```

#### Responsive Voice Interface
```typescript
// ✅ GOOD: Mobile-first voice interface
const ResponsiveVoiceInterface = () => {
  return (
    <div className="voice-interface-responsive">
      {/* Mobile-optimized voice button */}
      <div className="md:hidden">
        <VoiceButton 
          size="full"
          className="voice-button-mobile"
        />
      </div>
      
      {/* Desktop voice interface */}
      <div className="hidden md:block">
        <VoiceInterface />
      </div>
      
      {/* Tablet-optimized layout */}
      <div className="hidden sm:block md:hidden">
        <VoiceInterfaceTablet />
      </div>
    </div>
  )
}
```

### 2. **Voice Processing Patterns**

#### Real-time Voice Recognition
```typescript
// ✅ GOOD: Real-time voice processing with feedback
const RealTimeVoiceProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [confidence, setConfidence] = useState(0)
  
  const handleVoiceInput = async (transcript: string, confidence: number) => {
    setIsProcessing(true)
    setConfidence(confidence)
    
    try {
      // Process voice command with AI
      const result = await voiceApi.processCommand(transcript)
      
      // Provide immediate feedback
      toast.success(`Processed: "${transcript}"`)
      
      // Execute command
      await executeVoiceCommand(result)
    } catch (error) {
      toast.error('Voice processing failed')
    } finally {
      setIsProcessing(false)
    }
  }
  
  return (
    <VoiceProcessor
      onVoiceInput={handleVoiceInput}
      isProcessing={isProcessing}
      confidence={confidence}
    />
  )
}
```

#### Voice Command Context Management
```typescript
// ✅ GOOD: Context-aware voice commands
const VoiceContextManager = () => {
  const [context, setContext] = useState<VoiceContext>({
    currentView: 'calendar',
    selectedDate: new Date(),
    lastCommand: null,
    userPreferences: {}
  })
  
  const processContextualCommand = async (command: string) => {
    const contextualCommand = {
      ...command,
      context,
      timestamp: new Date(),
      sessionId: sessionId
    }
    
    const result = await voiceApi.processContextualCommand(contextualCommand)
    
    // Update context based on command result
    setContext(prev => ({
      ...prev,
      lastCommand: command,
      ...result.contextUpdates
    }))
    
    return result
  }
}
```

### 3. **Calendar Integration Patterns**

#### Voice-to-Calendar Workflow
```typescript
// ✅ GOOD: Seamless voice-to-calendar integration
const VoiceCalendarIntegration = () => {
  const handleVoiceCalendarCommand = async (command: VoiceCommand) => {
    switch (command.intent.type) {
      case 'schedule_meeting':
        return await handleScheduleMeeting(command)
      case 'check_availability':
        return await handleCheckAvailability(command)
      case 'reschedule_event':
        return await handleRescheduleEvent(command)
      case 'cancel_event':
        return await handleCancelEvent(command)
      default:
        return await handleUnknownCommand(command)
    }
  }
  
  const handleScheduleMeeting = async (command: VoiceCommand) => {
    // Extract entities from voice command
    const { attendees, time, duration, title } = command.entities
    
    // Check availability
    const availability = await calendarApi.checkAvailability({
      attendees,
      time,
      duration
    })
    
    // Suggest optimal times
    const suggestions = availability.optimalSlots
    
    // Create event
    const event = await calendarApi.createEvent({
      title,
      attendees,
      startTime: suggestions[0],
      duration
    })
    
    // Send confirmations
    await notificationApi.sendInvitations(event)
    
    return event
  }
}
```

### 4. **Code Quality Standards**

#### Frontend (TypeScript/React)
```typescript
// ✅ GOOD: Use existing utility functions
import { cn, formatDate, debounce } from '@/lib/utils'
import { API_CONFIG } from '@/lib/constants'

// ✅ GOOD: Follow established patterns
const MyComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => calendarApi.getEvents()
  })
  
  return (
    <Card className={cn("p-4", isLoading && "opacity-50")}>
      {/* Component content */}
    </Card>
  )
}

// ❌ AVOID: Don't reinvent utilities
const formatDate = (date: Date) => {
  // Use existing formatDate from @/lib/utils instead
}
```

#### Backend (Python/FastAPI)
```python
# ✅ GOOD: Follow established patterns
from app.schemas.calendar import EventCreate, EventResponse
from app.services.calendar_service import CalendarService
from app.core.dependencies import get_current_user

@router.post("/events", response_model=EventResponse)
async def create_event(
    event: EventCreate,
    current_user: User = Depends(get_current_user),
    calendar_service: CalendarService = Depends()
):
    return await calendar_service.create_event(event, current_user)

# ❌ AVOID: Don't skip validation or error handling
@router.post("/events")
async def create_event(event: dict):  # Use proper schemas
    return event  # Add proper error handling
```

### 2. **Component Development Guidelines**

#### Use Existing UI Components
```typescript
// ✅ Use existing components from src/components/ui/
import { Button, Card, Badge, Toast } from '@/components/ui'

// ✅ Extend existing components when needed
const VoiceButton = ({ isRecording, onClick }: VoiceButtonProps) => {
  return (
    <Button
      variant={isRecording ? "destructive" : "default"}
      size="lg"
      onClick={onClick}
      className="voice-button"
    >
      <Mic className={cn("w-4 h-4", isRecording && "animate-pulse")} />
    </Button>
  )
}
```

#### Follow State Management Patterns
```typescript
// ✅ Use Zustand stores for global state
import { useAuthStore, useVoiceStore } from '@/hooks'

const MyComponent = () => {
  const { user, isAuthenticated } = useAuthStore()
  const { commands, addCommand } = useVoiceStore()
  
  // Component logic
}

// ✅ Use TanStack Query for server state
const { data: events, isLoading, error } = useQuery({
  queryKey: ['calendar', 'events', { start_date, end_date }],
  queryFn: () => calendarApi.getEvents({ start_date, end_date }),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

### 3. **API Integration Guidelines**

#### Use Existing API Client
```typescript
// ✅ Use the provided API client
import { authApi, calendarApi, voiceApi } from '@/lib/api'

// Authentication
const login = async (email: string, password: string) => {
  try {
    const response = await authApi.login(email, password)
    return response.data
  } catch (error) {
    // Handle error using existing error handling
    throw new Error('Login failed')
  }
}

// Calendar operations
const createEvent = async (eventData: CreateEventForm) => {
  const response = await calendarApi.createEvent(eventData)
  return response.data
}

// Voice processing
const processVoiceCommand = async (command: string, audioBlob?: Blob) => {
  const response = await voiceApi.processCommand(command, audioBlob)
  return response.data
}
```

#### WebSocket Integration
```typescript
// ✅ Use the provided WebSocket client
import { wsClient } from '@/lib/api'

// Connect and listen for events
useEffect(() => {
  wsClient.connect()
  
  wsClient.on('calendar_event_created', (data) => {
    // Handle new event
    queryClient.invalidateQueries(['calendar', 'events'])
  })
  
  wsClient.on('notification', (data) => {
    // Show notification
    toast({
      title: data.title,
      description: data.message,
      variant: data.priority === 'high' ? 'destructive' : 'default'
    })
  })
  
  return () => wsClient.disconnect()
}, [])
```

### 4. **Voice Processing Guidelines**

#### Use Voice Recognition Hook
```typescript
// ✅ Use the provided voice recognition hook
import { useVoiceRecognition } from '@/hooks/use-voice-recognition'

const VoiceComponent = () => {
  const { startListening, stopListening, isSupported } = useVoiceRecognition()
  
  const handleStartListening = async () => {
    await startListening({
      onResult: (transcript, confidence) => {
        // Process voice input
        processVoiceCommand(transcript)
      },
      onError: (error) => {
        // Handle error
        toast.error('Voice recognition failed')
      }
    })
  }
}
```

#### Voice Command Processing
```typescript
// ✅ Use the voice processor utility
import { voiceProcessor } from '@/lib/voice-processor'

const processVoiceInput = async (transcript: string) => {
  try {
    const command = await voiceProcessor.processVoiceInput(transcript)
    
    // Handle different intents
    switch (command.intent.type) {
      case 'schedule_meeting':
        await handleScheduleMeeting(command)
        break
      case 'show_calendar':
        await handleShowCalendar(command)
        break
      default:
        // Handle unknown intent
        break
    }
  } catch (error) {
    // Handle processing error
  }
}
```

### 5. **Calendar Management Guidelines**

#### Use Calendar Utilities
```typescript
// ✅ Use the provided calendar utilities
import { calendarViewManager, eventManager, dateTimeUtils } from '@/lib/calendar-utils'

// Get calendar view state
const viewState = calendarViewManager.getViewState()

// Filter and sort events
const filteredEvents = eventManager.filterEventsByDateRange(
  events,
  startDate,
  endDate
)

// Format dates consistently
const formattedDate = dateTimeUtils.formatDate(date, 'PPP')
```

#### Event Management
```typescript
// ✅ Follow event management patterns
const EventForm = () => {
  const form = useForm<CreateEventForm>({
    resolver: zodResolver(eventSchemas.createEvent),
    defaultValues: {
      title: '',
      startTime: new Date(),
      endTime: addHours(new Date(), 1),
      type: 'meeting',
      priority: 'medium'
    }
  })
  
  const onSubmit = async (data: CreateEventForm) => {
    try {
      await calendarApi.createEvent(data)
      toast.success('Event created successfully')
      queryClient.invalidateQueries(['calendar', 'events'])
    } catch (error) {
      toast.error('Failed to create event')
    }
  }
}
```

### 6. **Error Handling Guidelines**

#### Frontend Error Handling
```typescript
// ✅ Use consistent error handling
import { handleApiError } from '@/lib/utils'

const MyComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => calendarApi.getEvents(),
    onError: (error) => {
      handleApiError(error, 'Failed to load events')
    }
  })
  
  if (error) {
    return <ErrorComponent message={error.message} />
  }
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return <EventsList events={data} />
}
```

#### Backend Error Handling
```python
# ✅ Use proper exception handling
from app.core.exceptions import CustomException
from fastapi import HTTPException

@router.get("/events")
async def get_events(
    current_user: User = Depends(get_current_user),
    calendar_service: CalendarService = Depends()
):
    try:
        events = await calendar_service.get_user_events(current_user.id)
        return {"success": True, "data": events}
    except CustomException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
```

### 7. **Performance Guidelines**

#### Frontend Performance
```typescript
// ✅ Use performance utilities
import { performanceMonitor, cacheManager } from '@/lib/performance'

// Monitor component performance
const MyComponent = () => {
  useEffect(() => {
    performanceMonitor.startMeasure('MyComponent')
    
    return () => {
      performanceMonitor.endMeasure('MyComponent')
    }
  }, [])
  
  // Use caching for expensive operations
  const cachedData = cacheManager.get('expensive-calculation')
  if (!cachedData) {
    const result = expensiveCalculation()
    cacheManager.set('expensive-calculation', result, 5 * 60 * 1000) // 5 minutes
  }
}
```

#### Backend Performance
```python
# ✅ Use async operations and caching
from app.core.cache import redis_cache
from app.utils.performance import monitor_performance

@router.get("/events")
@monitor_performance
async def get_events(
    current_user: User = Depends(get_current_user),
    calendar_service: CalendarService = Depends()
):
    # Check cache first
    cache_key = f"user_events:{current_user.id}"
    cached_events = await redis_cache.get(cache_key)
    
    if cached_events:
        return {"success": True, "data": cached_events}
    
    # Fetch from database
    events = await calendar_service.get_user_events(current_user.id)
    
    # Cache for 5 minutes
    await redis_cache.set(cache_key, events, expire=300)
    
    return {"success": True, "data": events}
```

### 8. **Accessibility Guidelines**

#### Frontend Accessibility
```typescript
// ✅ Use accessibility utilities
import { ariaUtils, focusManager } from '@/lib/accessibility'

const AccessibleComponent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    // Set ARIA attributes
    ariaUtils.setAriaAttributes(buttonRef.current!, {
      'aria-label': 'Start voice recording',
      'aria-describedby': 'voice-instructions',
      'aria-pressed': isRecording.toString()
    })
  }, [isRecording])
  
  const handleFocus = () => {
    focusManager.saveFocus()
  }
  
  return (
    <button
      ref={buttonRef}
      onFocus={handleFocus}
      className="voice-button"
    >
      <Mic className="w-4 h-4" />
      <span className="sr-only">Start voice recording</span>
    </button>
  )
}
```

### 9. **Testing Guidelines**

#### Frontend Testing
```typescript
// ✅ Write comprehensive tests
import { render, screen, fireEvent } from '@testing-library/react'
import { VoiceComponent } from './VoiceComponent'

describe('VoiceComponent', () => {
  it('should start listening when button is clicked', async () => {
    render(<VoiceComponent />)
    
    const button = screen.getByRole('button', { name: /start voice recording/i })
    fireEvent.click(button)
    
    expect(screen.getByText(/listening/i)).toBeInTheDocument()
  })
  
  it('should handle voice recognition errors gracefully', async () => {
    // Test error handling
  })
})
```

#### Backend Testing
```python
# ✅ Write comprehensive tests
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_event_success():
    response = client.post(
        "/api/v1/calendar/events",
        json={
            "title": "Test Meeting",
            "start_time": "2024-01-15T14:00:00Z",
            "end_time": "2024-01-15T15:00:00Z"
        },
        headers={"Authorization": f"Bearer {test_token}"}
    )
    
    assert response.status_code == 201
    assert response.json()["success"] is True
    assert response.json()["data"]["title"] == "Test Meeting"

def test_create_event_validation_error():
    response = client.post(
        "/api/v1/calendar/events",
        json={"title": ""},  # Invalid data
        headers={"Authorization": f"Bearer {test_token}"}
    )
    
    assert response.status_code == 422
    assert "validation" in response.json()["error"]["code"].lower()
```

## 🚀 Development Workflow & Deployment

### Development Workflow

#### 1. **Start with Documentation**
- Read `REPO_MAP.md` for project structure
- Review `API_SPEC.md` for API endpoints
- Check `UPDATED_PROMPT_FOR_CLAUDE_CODE.md` for specific requirements

### 2. **Use Existing Utilities**
- Leverage utilities in `frontend/src/lib/`
- Follow patterns in `frontend/src/lib/examples.ts`
- Use established components in `frontend/src/components/ui/`

### 3. **Follow Established Patterns**
- Use Zustand for global state management
- Use TanStack Query for server state
- Follow the API client patterns
- Use the voice processing utilities

#### 4. **Test Your Changes**
- Write unit tests for new components
- Test API endpoints
- Verify accessibility compliance
- Check performance impact

### Deployment Workflow

#### 1. **CI/CD Pipeline**
- **GitHub Actions**: Automated testing, linting, and building
- **Docker**: Containerized deployment for consistency
- **Environment Management**: Separate configs for dev/staging/prod
- **Database Migrations**: Automated schema updates via Alembic

#### 2. **Deployment Environments**
- **Development**: Local Docker Compose setup
- **Staging**: Automated deployment from develop branch
- **Production**: Manual deployment from main branch with approval

#### 3. **Deployment Commands**
```bash
# Development
pnpm dev                    # Start development servers
docker-compose up -d        # Start services locally

# Staging/Production
docker-compose -f docker-compose.prod.yml up -d
pnpm build                  # Build production assets
alembic upgrade head        # Run database migrations
```

#### 4. **Monitoring & Health Checks**
- **Application Health**: `/health` endpoints for both frontend and backend
- **Database Health**: Connection monitoring and query performance
- **Performance Monitoring**: Bundle size, API response times, Core Web Vitals
- **Error Tracking**: Centralized error logging and alerting

## 📚 Key Files for Reference

### Frontend
- `frontend/src/lib/index.ts` - Main utility exports
- `frontend/src/types/index.ts` - TypeScript definitions
- `frontend/src/lib/examples.ts` - Usage examples
- `frontend/src/components/ui/` - Reusable UI components
- `frontend/src/hooks/` - Custom React hooks
- `frontend/src/components/voice/` - Voice interface components
- `frontend/src/components/calendar/` - Calendar management components
- `frontend/src/services/` - API service integrations
- `frontend/src/utils/` - Voice processing utilities

### Backend
- `backend/app/main.py` - FastAPI application setup
- `backend/app/config.py` - Configuration management
- `backend/app/dependencies.py` - Dependency injection
- `backend/app/schemas/` - Pydantic schemas
- `backend/app/services/` - Business logic services

## 🎯 Enhanced Frontend Features for Voice AI

### Voice Interface Components
- **VoiceRecorder** - Real-time speech recognition with visual feedback
- **VoiceProcessor** - AI-powered command processing and intent recognition
- **VoiceFeedback** - Visual and audio feedback for voice interactions
- **TranscriptDisplay** - Real-time transcript with confidence scoring
- **VoiceCommandHistory** - Historical voice commands and responses
- **VoiceSettings** - Voice recognition and AI model configuration

### Calendar Management Components
- **CalendarView** - Multi-view calendar (month, week, day, agenda)
- **EventCreator** - Voice-enabled event creation interface
- **EventEditor** - Voice-controlled event modification
- **AvailabilityChecker** - Real-time availability checking
- **MeetingScheduler** - AI-powered meeting scheduling
- **CalendarSync** - Multi-platform calendar synchronization

### AI Integration Components
- **AIAssistant** - Main AI assistant interface
- **CommandProcessor** - Natural language command processing
- **IntentRecognizer** - Voice intent classification
- **EntityExtractor** - Date, time, person, location extraction
- **ResponseGenerator** - AI-generated responses and confirmations

### Real-time Features
- **LiveUpdates** - WebSocket-powered real-time updates
- **NotificationCenter** - Push notifications and alerts
- **StatusIndicator** - Real-time system status
- **ProgressTracker** - Voice processing progress
- **ErrorHandler** - Graceful error handling and recovery

## 📦 Enhanced Dependencies for Voice AI

### Core Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "@radix-ui/react-*": "^1.0.0",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.8.0",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.0",
    "socket.io-client": "^4.7.0",
    "lucide-react": "^0.294.0",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "playwright": "^1.40.0",
    "storybook": "^7.5.0"
  }
}
```

### Voice AI Specific Dependencies
```json
{
  "dependencies": {
    "react-speech-recognition": "^3.10.0",
    "react-speech-kit": "^2.0.0",
    "web-speech-api": "^1.0.0",
    "audio-recorder-polyfill": "^0.4.0",
    "wavesurfer.js": "^7.0.0",
    "recordrtc": "^5.6.0"
  }
}
```

### Calendar Integration Dependencies
```json
{
  "dependencies": {
    "@googleapis/calendar": "^12.0.0",
    "googleapis": "^128.0.0",
    "ical.js": "^1.5.0",
    "date-fns-tz": "^2.0.0",
    "rrule": "^2.8.0"
  }
}
```

### AI and ML Dependencies
```json
{
  "dependencies": {
    "openai": "^4.0.0",
    "@anthropic-ai/sdk": "^0.8.0",
    "langchain": "^0.0.200",
    "langchain-community": "^0.0.10",
    "pinecone-client": "^1.1.0",
    "weaviate-ts-client": "^1.4.0"
  }
}
```

## 🎯 Success Criteria

Your implementation should:

1. **Follow established patterns** and use existing utilities
2. **Maintain code quality** with proper error handling and validation
3. **Ensure accessibility** compliance (WCAG 2.1 AA)
4. **Optimize performance** using provided monitoring tools
5. **Include comprehensive tests** for new functionality
6. **Document changes** and follow the established structure

## 🤖 AI/ML Framework Architecture & Implementation

### **Primary AI Framework: LangChain**
**Purpose**: Core AI orchestration and workflow management for TempoPilot™
**Implementation Status**: ✅ Infrastructure Complete (80%), ❌ Implementation Pending (20%)

**Use Cases**:
- **Voice Command Processing**: Intent recognition and entity extraction from natural speech
- **Conversation Management**: Context-aware dialogue handling with memory persistence
- **Calendar Operations**: Smart scheduling, conflict resolution, availability checking
- **Tool Integration**: Seamless integration with calendar APIs, email, notifications
- **Chain Orchestration**: Complex multi-step workflows (voice → intent → action → response)

**Implementation Pattern**:
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

# Complete workflow
workflow = SimpleSequentialChain([
    voice_chain,
    calendar_chain,
    notification_chain
])
```

### **Secondary Framework: LangGraph (Future Enhancement)**
**Purpose**: Advanced workflow orchestration for complex multi-agent scenarios
**Implementation Status**: ❌ Infrastructure Pending, ❌ Implementation Pending

**Use Cases**:
- **Multi-Agent Coordination**: Calendar agent + Voice agent + Notification agent
- **Stateful Workflows**: Complex meeting scheduling with multiple participants
- **Conditional Logic**: Dynamic routing based on user preferences and context
- **Parallel Processing**: Simultaneous calendar sync and notification sending

**Planned Implementation**:
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
**Implementation Status**: ✅ Infrastructure Complete (80%), ❌ Implementation Pending (20%)

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

### **CrewAI (Enterprise Edition)**
**Purpose**: Multi-agent collaboration for enterprise-level scheduling
**Implementation Status**: ❌ Infrastructure Pending, ❌ Implementation Pending

**Use Cases**:
- **Enterprise Scheduling**: Multiple stakeholders with complex constraints
- **Resource Management**: Room booking, equipment allocation, travel coordination
- **Compliance Checking**: Meeting policy enforcement, security clearance
- **Stakeholder Coordination**: Automated negotiation between participants

**Enterprise Implementation**:
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

| Use Case | Primary Framework | Alternative | Implementation Status |
|----------|------------------|-------------|----------------------|
| **Voice Command Processing** | LangChain | - | ✅ Infrastructure Complete |
| **Simple Calendar Operations** | LangChain | - | ✅ Infrastructure Complete |
| **Complex Multi-Step Workflows** | LangChain | LangGraph | ✅ Infrastructure Complete |
| **Context-Aware Responses** | RAG + LangChain | - | ✅ Infrastructure Complete |
| **Multi-Agent Coordination** | LangGraph | CrewAI | ❌ Infrastructure Pending |
| **Personalization** | RAG + LangChain | - | ✅ Infrastructure Complete |
| **Meeting Intelligence** | RAG + LangChain | - | ✅ Infrastructure Complete |

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

## 🧠 Contextual Knowledge & Business Logic

### Domain-Specific Knowledge

#### Voice Processing Quirks
- **Web Speech API Limitations**: Not available in all browsers, requires HTTPS
- **Confidence Scoring**: Values range 0-1, < 0.7 should trigger fallback
- **Ambient Noise**: Voice recognition accuracy drops significantly in noisy environments
- **Accent Handling**: Different accents may require model fine-tuning
- **Real-time Processing**: Audio chunks should be processed in < 100ms for responsive UX

#### Calendar Integration Complexities
- **Timezone Handling**: Always store events in UTC, display in user's timezone
- **Recurring Events**: Handle RRULE patterns for complex recurring schedules
- **Conflict Resolution**: Check for overlaps before creating events
- **Calendar Permissions**: Different providers have different permission models
- **Sync Latency**: Calendar changes may take 1-5 minutes to sync across providers

#### AI Model Selection Logic
- **GPT-4**: Use for complex reasoning, creative tasks, and natural language generation
- **Claude**: Use for analytical tasks, code generation, and structured data processing
- **Fallback Strategy**: If primary model fails, retry with secondary model
- **Cost Optimization**: Use cheaper models for simple tasks, expensive models for complex ones
- **Context Window**: Be mindful of token limits for long conversations

#### User Experience Patterns
- **Voice-First Design**: Always provide visual alternatives to voice commands
- **Progressive Enhancement**: Ensure functionality works without JavaScript
- **Error Recovery**: Provide clear feedback and recovery options for failed voice commands
- **Accessibility**: Voice interfaces must be accessible to users with disabilities
- **Performance**: Voice processing should feel instant (< 500ms response time)

#### Data Privacy & Security
- **Voice Data**: Never store raw audio, only process and discard
- **Calendar Data**: Encrypt sensitive calendar information at rest
- **User Preferences**: Store voice and AI preferences securely
- **API Keys**: Rotate API keys regularly and use environment variables
- **Audit Logging**: Log all voice commands and calendar changes for compliance

### Common Gotchas & Solutions

#### Voice Recognition Issues
- **Problem**: Low confidence scores in noisy environments
- **Solution**: Implement noise reduction and multiple recognition attempts
- **Problem**: Accent recognition failures
- **Solution**: Use accent-specific models or provide manual input options

#### Calendar Sync Problems
- **Problem**: Events not syncing across providers
- **Solution**: Implement retry logic and conflict resolution
- **Problem**: Timezone confusion
- **Solution**: Always display timezone information and convert properly

#### AI Processing Challenges
- **Problem**: Model rate limiting
- **Solution**: Implement exponential backoff and fallback models
- **Problem**: Context window overflow
- **Solution**: Implement conversation summarization and context management

## 🚨 Failure-Mode Playbook

### Schema Mismatch Issues
**Problem**: API response doesn't match expected schema
**Diagnosis**: Check OpenAPI spec, validate response against Zod schemas
**Solution**: 
1. Update schema definitions in `packages/types/src/index.ts`
2. Regenerate TypeScript types: `pnpm typecheck`
3. Update API documentation in `docs/API_SPEC.md`
4. Test with mock data to ensure compatibility

### Failing Tests
**Problem**: Unit or integration tests failing
**Diagnosis**: Check test logs, verify test data and mocks
**Solution**:
1. Run tests in isolation: `pnpm test --testNamePattern="specific test"`
2. Check if dependencies are up to date: `pnpm install`
3. Verify environment variables are set correctly
4. Update test data if schema has changed
5. Check for timing issues in async tests

### Missing Environment Variables
**Problem**: Application fails to start due to missing env vars
**Diagnosis**: Check error logs, verify `.env.example` vs actual `.env`
**Solution**:
1. Copy from example: `cp .env.example .env`
2. Fill in required values (API keys, database URLs)
3. Run environment check: `pnpm check:env`
4. Verify all required services are running (database, Redis)

### Database Migration Issues
**Problem**: Schema changes not applied or migration conflicts
**Diagnosis**: Check Alembic logs, verify database state
**Solution**:
1. Check current migration state: `alembic current`
2. Apply pending migrations: `alembic upgrade head`
3. If conflicts exist, create new migration: `alembic revision --autogenerate -m "fix conflict"`
4. Reset database if needed: `alembic downgrade base && alembic upgrade head`

### Voice Recognition Failures
**Problem**: Voice commands not being recognized
**Diagnosis**: Check browser console, verify Web Speech API support
**Solution**:
1. Ensure HTTPS is enabled (required for Web Speech API)
2. Check browser compatibility
3. Implement fallback to Whisper API
4. Add manual input option for accessibility

### Calendar Sync Issues
**Problem**: Events not syncing between providers
**Diagnosis**: Check API logs, verify authentication tokens
**Solution**:
1. Refresh OAuth tokens
2. Check API rate limits
3. Verify calendar permissions
4. Implement retry logic with exponential backoff

### Performance Issues
**Problem**: Slow response times or high memory usage
**Diagnosis**: Check performance monitoring, analyze bundle size
**Solution**:
1. Run performance audit: `pnpm build && pnpm analyze`
2. Check for memory leaks in voice processing
3. Optimize database queries
4. Implement caching strategies

### Build Failures
**Problem**: Frontend or backend won't build
**Diagnosis**: Check build logs, verify dependencies
**Solution**:
1. Clear caches: `pnpm clean && rm -rf node_modules`
2. Reinstall dependencies: `pnpm install`
3. Check for TypeScript errors: `pnpm typecheck`
4. Verify all imports are correct

### Docker Issues
**Problem**: Containers won't start or services unavailable
**Diagnosis**: Check Docker logs, verify port conflicts
**Solution**:
1. Stop all containers: `docker-compose down`
2. Rebuild images: `docker-compose build --no-cache`
3. Check port availability: `netstat -an | grep :3000`
4. Verify Docker daemon is running

### WebSocket Connection Issues
**Problem**: Real-time features not working
**Diagnosis**: Check WebSocket logs, verify connection status
**Solution**:
1. Check WebSocket server is running
2. Verify CORS configuration
3. Check for proxy/firewall issues
4. Implement connection retry logic
