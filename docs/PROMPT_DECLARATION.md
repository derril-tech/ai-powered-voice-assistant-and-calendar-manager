# PROMPT DECLARATION

## Project Overview

**TempoPilot™ — Voice-First Calendar Autopilot**

A sophisticated voice-first productivity platform that turns natural conversation into flawless scheduling, reminders, and meeting intelligence across Google, Outlook, and Apple Calendar.

### 🚨 CRITICAL PRODUCT VISION ALIGNMENT

**Current State**: Basic voice assistant scaffold
**Target State**: TempoPilot™ — sophisticated voice-first calendar autopilot

**Key Product Features:**
- **Natural Language Scheduling** — free-form commands, contextual follow-ups, entity extraction
- **Conflict Resolution** — detects clashes, offers alternatives, respects priorities  
- **Proactive Suggestions** — commute buffers, focus blocks, recovery after cancellations
- **Meeting Intelligence** — real-time notes, action items, summaries, follow-up tasks
- **Smart Reminders** — urgency & priority-aware nudges via push, email, SMS
- **Personalization** — learns preferred slots, durations, travel patterns, collaborators
- **Universal Calendar Sync** — Google Calendar v3, Microsoft Graph, CalDAV

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

**IMPORTANT**: Always prioritize the TempoPilot™ product vision over the basic scaffold. The infrastructure needs significant expansion to support sophisticated voice-first calendar autopilot features.

## Claude Instructions

### 🚫 DO NOT TOUCH - Locked Files
- Configuration files (package.json, tsconfig.json, next.config.js, etc.)
- Build and deployment files (Dockerfile, docker-compose.yml, CI/CD configs)
- Documentation files (README.md, infrastructure docs)
- Environment files (.env.example, .env.local, .env.production)

### ✅ SAFE TO EDIT - Editable Files
- Frontend components (apps/frontend/src/components/)
- Backend services (apps/backend/app/api/, apps/backend/app/services/)
- Shared packages (packages/ui/src/, packages/types/src/)
- Utility functions and hooks (apps/frontend/src/lib/, apps/frontend/src/hooks/)
- Database models and schemas (apps/backend/app/models/, apps/backend/app/schemas/)

### 🎯 Claude Response Protocol
- **ALWAYS** use search_replace for targeted changes
- **NEVER** use edit_file for existing files unless creating new content
- **ALWAYS** provide complete diff format with proper context
- **ALWAYS** include commit message with semantic versioning
- **ALWAYS** test changes incrementally before multiple modifications

## Architecture Boundaries

### Frontend (Next.js 14 + TypeScript)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with design tokens
- **State Management**: React hooks + Zustand
- **Voice Processing**: Web Speech API + custom hooks
- **UI Components**: Shared component library (packages/ui)

### Backend (FastAPI + Python)
- **Framework**: FastAPI with async/await
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with refresh mechanism
- **Voice Processing**: OpenAI Whisper + custom NLP
- **Real-time**: WebSocket connections for live updates

### Shared Packages
- **packages/types**: Zod schemas and TypeScript types
- **packages/ui**: Reusable UI components and design tokens

## Data Contracts

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Voice Processing
```typescript
interface VoiceProcessingRequest {
  audio_data: string; // base64 encoded
  user_id: string;
  session_id?: string;
}

interface VoiceProcessingResponse {
  text: string;
  intent: string;
  confidence: number;
  entities?: Record<string, unknown>;
}
```

## UX Guidelines

### Design Principles
1. **Accessibility First**: WCAG 2.1 AA compliance
2. **Voice-First**: Optimize for voice interactions
3. **Progressive Enhancement**: Work without JavaScript
4. **Responsive Design**: Mobile-first approach
5. **Dark/Light Mode**: System preference support

### Interaction Patterns
- **Voice Commands**: Natural language processing
- **Calendar Management**: Drag-and-drop + voice
- **Notifications**: Real-time updates via WebSocket
- **Error Handling**: Graceful degradation with fallbacks

### Performance Budgets
- **Bundle Size**: < 500KB (gzipped)
- **API Response**: < 200ms (p95)
- **Voice Processing**: < 2s end-to-end
- **First Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## Security Constraints

### Authentication & Authorization
- JWT tokens with refresh mechanism
- Role-based access control (RBAC)
- Session management with Redis
- Rate limiting on all endpoints

### Data Protection
- PII encryption at rest
- HTTPS enforcement
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### API Security
- CORS configuration
- Request size limits
- API key rotation
- Audit logging

## Testing Expectations

### Frontend Testing
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Playwright
- **E2E Tests**: Critical user journeys
- **Accessibility Tests**: axe-core integration

### Backend Testing
- **Unit Tests**: pytest
- **Integration Tests**: Database + API
- **Load Tests**: Locust for performance
- **Security Tests**: OWASP ZAP integration

## Response Schema

### Example Prompt
"Add a calendar event for tomorrow at 2pm with the title 'Team Meeting'"

### Ideal Response Format
```diff
--- a/frontend/src/components/voice-assistant.tsx
+++ b/frontend/src/components/voice-assistant.tsx
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

### Commit Message Format
```
feat(voice): add calendar event creation via voice command

- Implement voice-to-intent mapping
- Add calendar event creation logic
- Handle voice processing errors gracefully
```

## Claude Development Commands

### 🎯 MANDATORY Instructions for Claude
- **MUST** follow the TempoPilot™ product vision over basic scaffold
- **MUST** use existing utility functions from lib/ directories
- **MUST** maintain TypeScript strict mode compliance
- **MUST** ensure WCAG 2.1 AA accessibility compliance
- **MUST** follow established patterns in the codebase
- **MUST** include proper error handling and validation
- **MUST** write unit tests for new functionality
- **MUST** optimize for performance (bundle size < 500KB, API < 200ms)
- **MUST** use search_replace with exact context for all changes
- **MUST** provide complete diff format with commit messages

### 🚫 PROHIBITED Actions
- **NEVER** modify configuration files (package.json, tsconfig.json, etc.)
- **NEVER** use edit_file for existing files unless creating new content
- **NEVER** expose sensitive information in code
- **NEVER** skip error handling or validation
- **NEVER** break backward compatibility without documentation
- **NEVER** ignore accessibility requirements

## Development Workflow

### Code Quality Gates
1. **TypeScript**: Strict mode enabled
2. **Linting**: ESLint + Prettier
3. **Testing**: > 80% coverage
4. **Performance**: Bundle size checks
5. **Security**: Automated vulnerability scanning

### Git Workflow
- Feature branches from main
- Pull request reviews required
- Automated CI/CD pipeline
- Semantic versioning

## Failure Mode Playbook

### Common Issues
1. **Schema Mismatch**: Update shared types package
2. **Failing Tests**: Check test environment setup
3. **Missing Environment**: Use env.example template
4. **Build Failures**: Clear node_modules and reinstall
5. **Database Issues**: Run migrations and seed data

### Debugging Steps
1. Check application logs
2. Verify environment variables
3. Test API endpoints directly
4. Validate database connections
5. Check browser console errors

## UX Guidelines & Design System

### Voice-First Design Principles
- **Progressive Enhancement**: Ensure functionality works without voice
- **Visual Feedback**: Always provide visual confirmation of voice actions
- **Error Recovery**: Clear feedback and recovery options for failed commands
- **Accessibility**: Voice interfaces must be accessible to users with disabilities
- **Context Awareness**: Maintain conversation context across interactions

### Interaction States
- **Loading**: Show spinner with descriptive text during voice processing
- **Success**: Green checkmark with confirmation message
- **Error**: Red error icon with clear error message and retry option
- **Confidence**: Show confidence meter for voice recognition accuracy
- **Processing**: Real-time waveform visualization during recording

### Accessibility Requirements
- **WCAG 2.1 AA Compliance**: All components must meet accessibility standards
- **Keyboard Navigation**: Full keyboard accessibility for all features
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio for text
- **Focus Management**: Clear focus indicators and logical tab order

### Design Tokens
- **Colors**: Use tokens from `packages/ui/src/tokens.ts`
- **Spacing**: Consistent spacing scale (4px base unit)
- **Typography**: Inter font family with defined size scale
- **Shadows**: Consistent elevation system
- **Border Radius**: Standardized corner radius values

## Performance Budgets & Constraints

### Frontend Performance
- **Bundle Size**: < 500KB gzipped for initial load
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5 seconds

### Backend Performance
- **API Response Time**: < 200ms (p95)
- **Database Queries**: < 50ms (p95)
- **Voice Processing**: < 2 seconds end-to-end
- **WebSocket Latency**: < 100ms for real-time features
- **Concurrent Users**: Support 1000+ simultaneous users

### Memory & Resource Usage
- **Frontend Memory**: < 100MB per tab
- **Backend Memory**: < 512MB per instance
- **Database Connections**: < 100 concurrent connections
- **Redis Memory**: < 1GB for caching and sessions

## Security Constraints & Compliance

### Authentication & Authorization
- **JWT Tokens**: 15-minute access tokens, 7-day refresh tokens
- **Device Binding**: Token binding to prevent token theft
- **Rate Limiting**: 100 requests/minute for authenticated users
- **Session Management**: Secure session storage with Redis
- **Multi-factor Authentication**: Optional 2FA for enterprise users

### Data Protection
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Voice Data**: Never store raw audio, process and discard immediately
- **Calendar Data**: Encrypt sensitive calendar information
- **PII Handling**: Auto-redaction of PII in logs
- **Data Residency**: Support for US/EU data residency options

### API Security
- **Input Validation**: Comprehensive validation for all inputs
- **SQL Injection Prevention**: Parameterized queries only
- **CORS Configuration**: Strict CORS policy
- **HTTPS Enforcement**: All communications over HTTPS
- **Security Headers**: Implement security headers (HSTS, CSP, etc.)

### Compliance Requirements
- **GDPR/CCPA**: Privacy controls and data portability
- **SOC 2**: Security controls and audit trails
- **HIPAA**: Optional healthcare compliance features
- **Enterprise SSO**: SAML/OIDC integration for enterprise customers

## Security & Compliance Table

| Security Aspect | Implementation | Compliance | Monitoring |
|----------------|----------------|------------|------------|
| **Authentication** | JWT + refresh tokens, device binding | OAuth 2.0, OIDC | Token usage, failed attempts |
| **Authorization** | Role-based access control (RBAC) | Principle of least privilege | Access logs, permission changes |
| **Data Encryption** | AES-256 at rest, TLS 1.3 in transit | FIPS 140-2 | Encryption status, key rotation |
| **Voice Data** | Process and discard, no storage | GDPR Article 5 | Processing logs, data flow |
| **Calendar Data** | Encrypted storage, secure sync | SOC 2 Type II | Sync status, access patterns |
| **PII Handling** | Auto-redaction in logs, consent management | GDPR, CCPA | PII detection, consent tracking |
| **API Security** | Rate limiting, input validation, CORS | OWASP Top 10 | Security headers, attack detection |
| **Audit Logging** | Comprehensive audit trail | SOC 2, GDPR | Log integrity, retention compliance |
| **Data Residency** | US/EU deployment options | GDPR Chapter 5 | Data location, transfer tracking |
| **Backup & Recovery** | Encrypted backups, disaster recovery | Business continuity | Backup success, recovery testing |

## Testing Expectations

### Unit Testing
- **Coverage**: > 80% code coverage
- **Frontend**: Jest + React Testing Library
- **Backend**: pytest with async support
- **Mocking**: Comprehensive mocking of external services
- **Edge Cases**: Test error conditions and edge cases

### Integration Testing
- **API Testing**: Test all endpoints with real database
- **Database Testing**: Test migrations and data integrity
- **Voice Processing**: Test voice recognition accuracy
- **Calendar Integration**: Test calendar provider APIs
- **WebSocket Testing**: Test real-time communication

### End-to-End Testing
- **Critical Paths**: Test complete user journeys
- **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
- **Mobile Testing**: Test responsive design on mobile devices
- **Accessibility Testing**: Automated and manual accessibility testing
- **Performance Testing**: Load testing for concurrent users

## Ambiguity Resolution & Red-Team Pass

### Clarified Terms & Definitions
- **"Voice-First"**: Voice as primary interface, but always with visual alternatives
- **"Real-time"**: < 100ms latency for WebSocket, < 2s for voice processing
- **"AI Integration"**: GPT-4 for reasoning, Claude for analysis, LangChain for orchestration
- **"Calendar Sync"**: Bidirectional sync with Google, Outlook, Apple Calendar
- **"Meeting Intelligence"**: Automated notes, action items, summaries, follow-ups
- **"Proactive Suggestions"**: AI-driven scheduling optimizations and time management
- **"Enterprise Features"**: SSO/SAML, admin console, data residency, compliance

### Red-Team Security Validation
- **Input Validation**: All user inputs validated against schemas, no raw SQL
- **Authentication**: JWT tokens with short expiry, refresh token rotation
- **Authorization**: Role-based access, principle of least privilege
- **Data Protection**: Encryption at rest and in transit, PII redaction
- **API Security**: Rate limiting, CORS, security headers, HTTPS only
- **Voice Security**: No audio storage, process and discard immediately
- **Calendar Security**: OAuth 2.0 flows, secure token storage
- **Audit Logging**: Comprehensive logs for compliance and security monitoring

### Edge Cases & Error Handling
- **Voice Recognition Failure**: Fallback to Whisper API, manual input option
- **Calendar Sync Failure**: Retry logic, conflict resolution, user notification
- **AI Service Unavailable**: Circuit breakers, graceful degradation
- **Network Issues**: Offline mode, sync when reconnected
- **Browser Compatibility**: Progressive enhancement, feature detection
- **Accessibility**: Screen reader support, keyboard navigation, high contrast

## Response Schema & Examples

### Claude Response Format
**ALWAYS** respond with this exact format:

```diff
--- a/apps/frontend/src/components/example.tsx
+++ b/apps/frontend/src/components/example.tsx
@@ -10,6 +10,7 @@ export function ExampleComponent() {
   const handleAction = async () => {
     try {
       setLoading(true);
+      const result = await apiCall();
+      setData(result);
       setLoading(false);
     } catch (error) {
       setError(error.message);
     }
   };
```

**Commit Message**: `feat(component): add API integration with error handling`

### Example Prompt & Ideal Response

**User Prompt**: "Add voice command processing to the calendar view component"

**Ideal Claude Response**:
```diff
--- a/apps/frontend/src/components/calendar-view.tsx
+++ b/apps/frontend/src/components/calendar-view.tsx
@@ -15,6 +15,7 @@ export function CalendarView() {
   const [events, setEvents] = useState<Event[]>([]);
+  const [voiceCommand, setVoiceCommand] = useState<string>('');
+  const [isProcessingVoice, setIsProcessingVoice] = useState(false);

   useEffect(() => {
     loadEvents();
   }, []);

+  const handleVoiceCommand = async (command: string) => {
+    try {
+      setIsProcessingVoice(true);
+      const response = await processVoiceCommand(command);
+      if (response.intent === 'create_event') {
+        await createEventFromVoice(response.entities);
+      }
+      setIsProcessingVoice(false);
+    } catch (error) {
+      console.error('Voice command processing failed:', error);
+      setIsProcessingVoice(false);
+    }
+  };
```

**Commit Message**: `feat(calendar): integrate voice command processing for event creation`

## Success Criteria

### MVP Features
- [ ] User authentication and registration
- [ ] Voice command processing
- [ ] Calendar event creation/management
- [ ] Real-time notifications
- [ ] Responsive web interface

### Technical Requirements
- [ ] TypeScript strict mode compliance
- [ ] 80%+ test coverage
- [ ] Performance budgets met
- [ ] Security audit passed
- [ ] Accessibility compliance

### Deployment Ready
- [ ] Docker containers working
- [ ] CI/CD pipeline green
- [ ] Environment configuration complete
- [ ] Monitoring and logging setup
- [ ] Backup and recovery procedures
