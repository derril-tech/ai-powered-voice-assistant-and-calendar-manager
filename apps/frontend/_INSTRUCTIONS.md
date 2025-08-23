# Frontend Instructions

## CLAUDE_TASK: Frontend Development Guidelines

### Editable Areas
- `src/components/` - React components (safe to edit)
- `src/hooks/` - Custom React hooks (safe to edit)
- `src/lib/` - Utility functions and helpers (safe to edit)
- `src/types/` - TypeScript type definitions (safe to edit)
- `src/app/` - Next.js app router pages (safe to edit)

### Do Not Touch
- `package.json` - Dependencies and scripts (locked)
- `next.config.js` - Next.js configuration (locked)
- `tailwind.config.js` - Tailwind configuration (locked)
- `tsconfig.json` - TypeScript configuration (locked)

### Development Guidelines
1. Use TypeScript for all new code
2. Follow the design tokens from `@voice-assistant/ui` package
3. Implement responsive design using Tailwind CSS
4. Use the shared types from `@voice-assistant/types` package
5. Implement proper error handling and loading states
6. Follow accessibility guidelines (ARIA labels, keyboard navigation)
7. Use React hooks for state management
8. Implement proper form validation

### TODO Markers
- [ ] Implement voice recognition component
- [ ] Add calendar integration
- [ ] Create notification system
- [ ] Add user authentication flow
- [ ] Implement real-time updates
- [ ] Add offline support
- [ ] Implement PWA features

### Performance Requirements
- Bundle size < 500KB (gzipped)
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
