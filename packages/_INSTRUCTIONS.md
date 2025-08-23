# Packages Instructions

## CLAUDE_TASK: Shared Packages Development Guidelines

### Editable Areas
- `types/src/` - Shared TypeScript types and schemas (safe to edit)
- `ui/src/` - Shared UI components and utilities (safe to edit)

### Do Not Touch
- `types/package.json` - Package configuration (locked)
- `types/tsconfig.json` - TypeScript configuration (locked)
- `ui/package.json` - Package configuration (locked)
- `ui/tsconfig.json` - TypeScript configuration (locked)

### Development Guidelines

#### Types Package
1. Use Zod for schema validation
2. Export both TypeScript types and Zod schemas
3. Keep types generic and reusable
4. Document all complex types
5. Maintain backward compatibility

#### UI Package
1. Use design tokens for consistent styling
2. Implement accessible components
3. Support dark/light mode
4. Use TypeScript for all components
5. Export both default and named exports
6. Include proper JSDoc documentation

### TODO Markers
- [ ] Add more shared UI components
- [ ] Create form validation schemas
- [ ] Add internationalization types
- [ ] Create theme configuration types
- [ ] Add animation utilities
- [ ] Create icon system
- [ ] Add data visualization types

### Usage Guidelines
- Import types: `import { User, CalendarEvent } from '@voice-assistant/types'`
- Import UI: `import { Button, tokens } from '@voice-assistant/ui'`
- Use design tokens for consistent styling
- Follow the established naming conventions
