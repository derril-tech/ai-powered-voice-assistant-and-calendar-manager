# Types Package Instructions

## CLAUDE_TASK: Shared Types Development Guidelines

### Package Purpose
This package contains shared TypeScript types and Zod schemas for the AI Voice Assistant application.

### Editable Areas
- `src/schemas/` - Zod validation schemas (safe to edit)
- `src/types/` - TypeScript type definitions (safe to edit)
- `src/validators/` - Custom validation functions (safe to edit)
- `src/transformers/` - Data transformation utilities (safe to edit)

### Do Not Touch
- `package.json` - Dependencies and scripts (locked)
- `tsconfig.json` - TypeScript configuration (locked)
- Build configuration files (locked)

### Development Guidelines
1. **Schema-First**: Define Zod schemas first, then derive TypeScript types
2. **Validation**: Include comprehensive validation rules
3. **Documentation**: Add JSDoc comments for all types and schemas
4. **Consistency**: Use consistent naming conventions
5. **Extensibility**: Design types to be easily extended
6. **Backward Compatibility**: Maintain backward compatibility when possible

### Type Standards
- Use descriptive, semantic names
- Include proper JSDoc documentation
- Use union types for variants
- Implement proper error handling types
- Support optional and required fields appropriately
- Use branded types for IDs and special values

### Schema Standards
- Include validation rules (min/max length, patterns, etc.)
- Provide meaningful error messages
- Use proper Zod transformers for data conversion
- Implement custom validation functions when needed
- Support both strict and loose validation modes

### TODO Markers
- [ ] Complete user authentication types
- [ ] Add comprehensive calendar event types
- [ ] Create voice command processing types
- [ ] Add notification system types
- [ ] Implement API response/request types
- [ ] Add error handling types
- [ ] Create WebSocket event types
- [ ] Add AI processing result types

### Type Categories
1. **Authentication**: User, session, token types
2. **Calendar**: Event, calendar, attendee types
3. **Voice**: Command, recognition, processing types
4. **Notification**: Alert, reminder, message types
5. **API**: Request, response, error types
6. **WebSocket**: Real-time event types
7. **AI**: Processing, intent, entity types

### Export Structure
```typescript
// Main exports
export { User, UserSchema } from './types/user'
export { Event, EventSchema } from './types/calendar'
export { VoiceCommand, VoiceCommandSchema } from './types/voice'
export { Notification, NotificationSchema } from './types/notification'
export { ApiResponse, ApiError } from './types/api'
```

### Usage Examples
```typescript
import { User, UserSchema, Event, EventSchema } from '@voice-assistant/types'

// Type usage
const user: User = {
  id: '123',
  email: 'user@example.com',
  name: 'John Doe'
}

// Schema validation
const validatedUser = UserSchema.parse(userData)
const event = EventSchema.parse(eventData)
```

### Validation Examples
```typescript
import { UserSchema, EventSchema } from '@voice-assistant/types'

// Validate user data
try {
  const user = UserSchema.parse(userData)
  // user is now typed as User
} catch (error) {
  // Handle validation errors
  console.error('Validation failed:', error.errors)
}

// Safe parsing
const result = UserSchema.safeParse(userData)
if (result.success) {
  const user = result.data
} else {
  console.error('Validation failed:', result.error)
}
```

### Performance Requirements
- Type checking time < 100ms for large schemas
- Bundle size impact < 10KB (gzipped)
- Efficient validation for real-time use cases
- Minimal runtime overhead

### Testing Requirements
- Unit tests for all schemas
- Type checking tests
- Validation error message tests
- Performance benchmarks for large datasets
