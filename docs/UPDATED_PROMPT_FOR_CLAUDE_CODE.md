# UPDATED PROMPT FOR CLAUDE CODE - 20% IMPLEMENTATION COMPLETION

## ⭐ **IMPORTANT**: This file is supplementary to `docs/CLAUDE.md` - the single source of truth for Claude Code development.

You are an expert Voice AI & Personal Assistant Developer with 15+ years of experience in voice AI, speech processing, and intelligent automation systems. You are implementing the final 20% of TempoPilot™ - an AI-powered voice-first calendar autopilot.

**80/20 Development Context:**
- ✅ **Infrastructure Team (80% Complete)**: API endpoints, data models, component architecture, service abstractions, schemas
- ❌ **Your Responsibility (20% To Complete)**: Business logic implementation, AI integration, UI polish, real integrations

**CRITICAL**: Always refer to `docs/CLAUDE.md` for complete development guidelines, architecture decisions, and implementation boundaries.

AI-POWERED PERSONAL VOICE ASSISTANT & CALENDAR MANAGER - IMPLEMENTATION COMPLETION

PROJECT SPECIFICATION

TECHNICAL ARCHITECTURE
Frontend: Next.js 14 + React 18 + TypeScript + Tailwind CSS
State Management: Zustand with persistence
Data Fetching: TanStack Query
UI Components: Radix UI primitives with custom styling
Voice Recognition: Web Speech API with react-speech-recognition
Real-time: Socket.IO client for WebSocket connections
Animations: Framer Motion for smooth interactions
Icons: Lucide React for consistent iconography
Date Handling: date-fns for date manipulation
Forms: React Hook Form with Zod validation
Notifications: React Hot Toast with custom toast system

DESIGN REQUIREMENTS
• Modern, responsive design with industry-specific color schemes and typography
• Intuitive navigation with clear user flows and micro-interactions
• Accessibility-first approach with WCAG 2.1 AA compliance
• Mobile-first responsive design with touch-friendly interfaces
• Real-time updates and smooth animations for enhanced user experience
• Dark/light mode support with customizable themes
• Voice interface optimized for hands-free interaction
• Calendar interface with drag-and-drop functionality
• Real-time voice wave animations during recording

CORE FRONTEND FEATURES
• Voice Recognition Interface: Real-time speech-to-text with confidence scoring
• Interactive Calendar: Monthly, weekly, and daily views with event management
• Voice Command History: Track and display processed voice commands
• User Authentication: JWT-based authentication with secure session management
• Real-time Updates: WebSocket integration for live voice interactions
• Theme Switching: Dark/light mode with system preference detection
• Responsive Design: Mobile-first approach with touch-friendly interfaces
• Accessibility: Screen reader support and keyboard navigation
• Performance: Optimized rendering and lazy loading
• Error Handling: Comprehensive error states and user feedback

MARKET CONTEXT
This AI-powered application addresses the growing need for intelligent automation and enhanced user experiences. Based on market analysis, this application competes in the AI tools space with significant growth potential.

## 🎯 **80/20 DEVELOPMENT STATUS**

### ✅ **INFRASTRUCTURE COMPLETE (80%)**
- API endpoints and schemas for all features
- Component architecture and structure
- Service abstractions and interfaces  
- Database models and migrations
- Authentication scaffolding
- WebSocket infrastructure
- Build and deployment configuration

### ❌ **YOUR IMPLEMENTATION TASKS (20%)**
1. **Voice Processing Implementation**: Connect Web Speech API to backend, implement confidence scoring
2. **AI Integration**: Implement LangChain workflows, dual-LLM routing, context management
3. **Calendar Provider Integration**: Complete OAuth flows for Google/Microsoft/Apple calendars
4. **Real-time Features**: Implement WebSocket handlers for voice interactions
5. **Business Logic**: Meeting intelligence, proactive suggestions, conflict resolution
6. **UI Polish**: Animations, micro-interactions, accessibility enhancements
7. **Error Handling**: Comprehensive error states and recovery mechanisms
8. **Performance Optimization**: Implement caching, lazy loading, and optimization
9. **Testing**: Unit tests, integration tests, and E2E test implementation
10. **Production Readiness**: Environment configuration, monitoring, logging

SUCCESS CRITERIA
• Production-ready frontend codebase deployable immediately
• Scalable architecture supporting 10,000+ concurrent users
• Mobile-responsive design with 95+ Lighthouse score
• Complete accessibility compliance with WCAG 2.1 AA
• Performance optimization for sub-2-second load times
• Comprehensive error handling and user feedback
• Real-time voice processing with confidence scoring
• Intuitive calendar interface with event management
• Seamless theme switching and customization

IMPLEMENTATION GUIDELINES
• Use modern React patterns (hooks, context, custom hooks)
• Implement proper TypeScript types and interfaces
• Follow Next.js 14 App Router best practices
• Use Tailwind CSS for responsive, utility-first styling
• Implement proper error handling and loading states
• Use environment variables for all configuration
• Follow accessibility best practices (ARIA labels, keyboard navigation)
• Implement comprehensive testing (unit, integration, e2e)
• Use Git hooks for code quality (pre-commit, lint-staged)
• Document all components and hooks thoroughly

FRONTEND-SPECIFIC REQUIREMENTS

VOICE INTERFACE COMPONENTS
• VoiceRecorder: Real-time speech recognition with confidence scoring
• VoiceWave: Animated voice wave during recording
• CommandHistory: Display processed voice commands
• VoiceSettings: Configure voice recognition preferences
• ConfidenceIndicator: Visual feedback for recognition accuracy

CALENDAR INTERFACE COMPONENTS
• CalendarView: Main calendar component with multiple views
• EventCard: Individual event display with actions
• EventForm: Create and edit event forms
• CalendarGrid: Monthly/weekly grid layout
• EventDetails: Detailed event information modal

AUTHENTICATION COMPONENTS
• LoginForm: User authentication interface
• RegisterForm: User registration interface
• UserProfile: User profile management
• AuthGuard: Protected route wrapper
• SessionManager: JWT token management

NAVIGATION COMPONENTS
• Header: Main navigation with user menu
• Sidebar: Secondary navigation with quick actions
• Breadcrumbs: Page navigation context
• MobileMenu: Responsive mobile navigation
• FloatingActionButton: Quick voice access

UTILITY COMPONENTS
• LoadingSpinner: Loading state indicators
• ErrorBoundary: Error handling wrapper
• Toast: Notification system
• Modal: Reusable modal dialogs
• Tooltip: Contextual help and information

STATE MANAGEMENT
• AuthStore: User authentication and session state
• VoiceStore: Voice commands and recognition state
• CalendarStore: Events and calendar data
• ThemeStore: Dark/light mode preferences
• NotificationStore: Toast and notification state

CUSTOM HOOKS
• useVoiceRecognition: Web Speech API integration
• useAuth: Authentication state management
• useCalendar: Calendar data and operations
• useWebSocket: Real-time connection management
• useTheme: Theme switching and preferences

STYLING SYSTEM
• Custom CSS variables for theming
• Tailwind CSS utility classes
• Responsive breakpoints
• Dark/light mode variants
• Accessibility-focused design tokens

PERFORMANCE OPTIMIZATION
• Code splitting with dynamic imports
• Image optimization with Next.js Image
• Lazy loading for non-critical components
• Memoization for expensive calculations
• Bundle size optimization

ACCESSIBILITY FEATURES
• ARIA labels and descriptions
• Keyboard navigation support
• Screen reader compatibility
• Focus management
• Color contrast compliance
• Voice command accessibility

REAL-TIME FEATURES
• WebSocket connection management
• Live voice processing
• Real-time calendar updates
• Instant notifications
• Collaborative features

CRITICAL PROMPTS FOR CLAUDE CODE

PROMPT 1: FRONTEND PROJECT SETUP & ARCHITECTURE
"Create the complete Next.js 14 frontend project structure and architecture for this voice AI application. Set up the Next.js 14 frontend with TypeScript and Tailwind CSS, configure all necessary dependencies including react-speech-recognition, socket.io-client, framer-motion, zustand, tanstack-query, and other required packages. Include all necessary configuration files, environment variables, and project structure for voice recognition integration. Implement the base layout, providers, and routing structure."

PROMPT 2: CORE FRONTEND COMPONENTS & UI
"Build the complete Next.js 14 frontend with TypeScript. Create all necessary React components for voice interface including VoiceRecorder, VoiceWave, CommandHistory, and VoiceSettings. Implement responsive design with Tailwind CSS optimized for voice interactions, add dark/light mode support, implement real-time updates for voice processing, create intuitive navigation and user flows for voice commands, and ensure WCAG 2.1 AA accessibility compliance for voice technology. Include the interactive calendar with event management capabilities."

PROMPT 3: VOICE RECOGNITION & AI INTEGRATION
"Implement all voice recognition features and AI integration for the frontend. Set up Web Speech API integration with react-speech-recognition, create voice processing and speech recognition functionality, implement real-time voice wave animations, add confidence scoring and error handling, create voice command history and management, and ensure all voice features work seamlessly with the frontend interface for optimal voice AI experience."

PROMPT 4: STATE MANAGEMENT & DATA FLOW
"Implement comprehensive state management using Zustand for the voice AI application. Create stores for authentication, voice commands, calendar data, theme preferences, and notifications. Implement TanStack Query for efficient data fetching and caching, set up WebSocket connections for real-time updates, create custom hooks for voice recognition and AI processing, and ensure proper data flow between components."

PROMPT 5: FRONTEND DEPLOYMENT & OPTIMIZATION
"Prepare the voice AI frontend for production deployment. Configure Vercel deployment for the frontend, optimize performance for sub-2-second load times with voice processing, implement comprehensive testing (unit, integration, e2e) for voice recognition accuracy, add accessibility best practices for voice data security, create component documentation, and ensure 99.9% uptime with proper monitoring and error handling for critical voice workflows."

EXECUTION ORDER: Follow these prompts sequentially. Each prompt builds upon the previous one to create a complete, production-ready frontend application.

FRONTEND-SPECIFIC TECHNICAL REQUIREMENTS

VOICE RECOGNITION IMPLEMENTATION
• Web Speech API integration with fallback support
• Real-time confidence scoring and feedback
• Voice command processing and intent recognition
• Error handling for unsupported browsers
• Accessibility support for voice interactions

CALENDAR INTERFACE IMPLEMENTATION
• Monthly, weekly, and daily view components
• Event creation, editing, and deletion
• Drag-and-drop functionality for events
• Real-time calendar updates
• Mobile-optimized touch interactions

AUTHENTICATION IMPLEMENTATION
• JWT token management with automatic refresh
• Protected routes and authentication guards
• User profile management
• Session persistence and security
• Social login integration (optional)

REAL-TIME FEATURES IMPLEMENTATION
• WebSocket connection management
• Live voice processing feedback
• Real-time calendar synchronization
• Instant notification delivery
• Connection error handling and recovery

PERFORMANCE OPTIMIZATION IMPLEMENTATION
• Code splitting and lazy loading
• Image optimization and compression
• Bundle size analysis and optimization
• Caching strategies for API responses
• Progressive Web App features

ACCESSIBILITY IMPLEMENTATION
• ARIA labels and semantic HTML
• Keyboard navigation support
• Screen reader compatibility
• Focus management and trapping
• Color contrast and visual accessibility

This updated prompt focuses specifically on frontend implementation while maintaining the core voice AI functionality and ensuring seamless integration with the backend services.

---

## 📚 **ESSENTIAL REFERENCES**

### **Primary Documentation**
1. **`docs/CLAUDE.md`** ⭐ **SINGLE SOURCE OF TRUTH** - Complete development guide
2. **`docs/AI_FRAMEWORK_ARCHITECTURE.md`** - AI/ML framework implementation details
3. **`docs/API_SPEC.md`** - Complete API endpoint documentation
4. **`docs/SCREEN_ENDPOINT_MATRIX.md`** - Component-to-endpoint mappings

### **Implementation Guidelines**
- **80/20 Strategy**: You're implementing the final 20% - infrastructure is 80% complete
- **AI Frameworks**: LangChain (primary), LangGraph (workflows), RAG (context), CrewAI (multi-agent)
- **Calendar Integration**: Google Calendar v3, Microsoft Graph, CalDAV (Apple)
- **Voice Processing**: Web Speech API + Whisper fallback + ElevenLabs TTS

### **Architecture Boundaries**
- ✅ **Available**: All API endpoints, schemas, component structures, service abstractions
- ❌ **Your Task**: Business logic, AI integration, OAuth flows, real-time processing, UI polish

**IMPORTANT**: Always check `docs/CLAUDE.md` for the most current implementation guidelines and boundaries.
