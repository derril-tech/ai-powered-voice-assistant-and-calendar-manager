# AI Voice Assistant Frontend

A modern, responsive frontend for the AI-powered voice assistant and calendar manager built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Features

- 🎤 **Voice Recognition**: Real-time speech-to-text with confidence scoring
- 📅 **Interactive Calendar**: Full-featured calendar with event management
- 🌙 **Dark/Light Mode**: Seamless theme switching with system preference detection
- 📱 **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- ⚡ **Real-time Updates**: WebSocket integration for live updates
- 🔐 **Authentication**: JWT-based authentication with secure session management
- 🎨 **Modern UI**: Beautiful, accessible interface with smooth animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query
- **UI Components**: Radix UI primitives with custom styling
- **Voice Recognition**: Web Speech API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with Web Speech API support

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Copy the environment file:
```bash
cp .env.local.example .env.local
```

4. Update the environment variables in `.env.local` with your API keys and configuration.

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth-provider.tsx # Authentication context
│   ├── voice-provider.tsx # Voice recognition context
│   ├── dashboard.tsx     # Main dashboard
│   ├── voice-assistant.tsx # Voice interface
│   ├── calendar-view.tsx # Calendar component
│   ├── header.tsx        # Navigation header
│   └── sidebar.tsx       # Sidebar navigation
├── hooks/                # Custom React hooks
│   ├── use-auth-store.ts # Authentication state
│   ├── use-voice-store.ts # Voice commands state
│   ├── use-voice-recognition.ts # Voice recognition
│   └── use-toast.ts      # Toast notifications
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
└── types/                # TypeScript type definitions
    └── index.ts          # Application types
```

## Key Components

### Voice Assistant
The voice assistant component provides:
- Real-time speech recognition
- Command processing with AI integration
- Confidence scoring and error handling
- Command history and management

### Calendar View
The calendar component features:
- Monthly, weekly, and daily views
- Event creation and management
- Drag-and-drop functionality
- Event details and editing

### Authentication
JWT-based authentication with:
- Secure token storage
- Automatic token refresh
- Protected routes
- User session management

## Voice Commands

The voice assistant supports natural language commands for calendar management:

- "Schedule a meeting tomorrow at 2 PM"
- "What's on my calendar today?"
- "Move my 3 PM meeting to 4 PM"
- "Set a reminder for my doctor's appointment"
- "Cancel my meeting with John"

## Styling

The application uses a custom design system built on Tailwind CSS with:
- CSS custom properties for theming
- Consistent spacing and typography
- Responsive breakpoints
- Dark/light mode support
- Accessibility-focused components

## State Management

Zustand stores manage application state:
- **Auth Store**: User authentication and session data
- **Voice Store**: Voice commands and recognition state
- **Calendar Store**: Events and calendar data

## API Integration

The frontend integrates with the backend API for:
- User authentication and management
- Calendar event CRUD operations
- Voice command processing
- Real-time updates via WebSocket

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Conventional commits for version control

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Browser Support

- Chrome 66+ (recommended for voice recognition)
- Firefox 60+
- Safari 14+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
