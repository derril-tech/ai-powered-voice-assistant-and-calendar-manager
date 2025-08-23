# UI Package Instructions

## CLAUDE_TASK: UI Component Development Guidelines

### Package Purpose
This package contains reusable UI components and design tokens for the AI Voice Assistant application.

### Editable Areas
- `src/components/` - Reusable UI components (safe to edit)
- `src/tokens/` - Design tokens and theme configuration (safe to edit)
- `src/utils/` - UI utility functions (safe to edit)
- `src/hooks/` - UI-related React hooks (safe to edit)

### Do Not Touch
- `package.json` - Dependencies and scripts (locked)
- `tsconfig.json` - TypeScript configuration (locked)
- Build configuration files (locked)

### Development Guidelines
1. **Design System First**: All components must use design tokens from `src/tokens/`
2. **Accessibility**: WCAG 2.1 AA compliance required for all components
3. **TypeScript**: Strict typing for all props and return values
4. **Responsive**: Mobile-first design approach
5. **Performance**: Optimize for bundle size and rendering performance
6. **Documentation**: Include JSDoc comments for all exported components

### Component Standards
- Use Radix UI primitives as base components
- Implement proper ARIA attributes
- Support keyboard navigation
- Include focus management
- Provide proper error states
- Support dark/light theme switching

### Design Tokens
- Colors: Use semantic color tokens (primary, secondary, success, warning, error)
- Spacing: Use consistent spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- Typography: Use defined font sizes and weights
- Border radius: Use consistent radius values
- Shadows: Use defined shadow tokens for elevation

### TODO Markers
- [ ] Create comprehensive design token system
- [ ] Build accessible form components
- [ ] Add voice-specific UI components
- [ ] Create calendar-specific components
- [ ] Add loading and error state components
- [ ] Implement theme switching components
- [ ] Add animation utilities
- [ ] Create responsive layout components

### Performance Requirements
- Component bundle size < 50KB (gzipped)
- First render time < 100ms
- Re-render optimization with React.memo
- Lazy loading for heavy components

### Testing Requirements
- Unit tests for all components
- Accessibility testing with axe-core
- Visual regression testing
- Cross-browser compatibility testing

### Export Structure
```typescript
// Main exports
export { Button, Card, Input, Modal } from './components'
export { colors, spacing, typography } from './tokens'
export { useTheme, useMediaQuery } from './hooks'
export { cn, formatDate } from './utils'
```

### Usage Examples
```typescript
import { Button, Card, colors } from '@voice-assistant/ui'

// Component usage
<Button variant="primary" size="lg">
  Click me
</Button>

// Design tokens
const primaryColor = colors.primary[500]
```
