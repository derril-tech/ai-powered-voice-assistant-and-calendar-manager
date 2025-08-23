import { z } from 'zod';

// User-related types
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// Calendar event types
export const CalendarEventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  location: z.string().optional(),
  user_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

// Voice command types
export const VoiceCommandSchema = z.object({
  id: z.string().uuid(),
  command: z.string().min(1),
  intent: z.string().min(1),
  confidence: z.number().min(0).max(1),
  user_id: z.string().uuid(),
  created_at: z.string().datetime(),
});

export type VoiceCommand = z.infer<typeof VoiceCommandSchema>;

// Notification types
export const NotificationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['info', 'success', 'warning', 'error']),
  user_id: z.string().uuid(),
  read: z.boolean().default(false),
  created_at: z.string().datetime(),
});

export type Notification = z.infer<typeof NotificationSchema>;

// API Response types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Voice processing types
export const VoiceProcessingRequestSchema = z.object({
  audio_data: z.string(), // base64 encoded audio
  user_id: z.string().uuid(),
  session_id: z.string().optional(),
});

export type VoiceProcessingRequest = z.infer<typeof VoiceProcessingRequestSchema>;

export const VoiceProcessingResponseSchema = z.object({
  text: z.string(),
  intent: z.string(),
  confidence: z.number().min(0).max(1),
  entities: z.record(z.unknown()).optional(),
});

export type VoiceProcessingResponse = z.infer<typeof VoiceProcessingResponseSchema>;

// Authentication types
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
  refresh_token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
