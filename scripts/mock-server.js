#!/usr/bin/env node

/**
 * Mock API Server for AI Voice Assistant
 * 
 * This server provides mock endpoints for development and testing.
 * It simulates the real API responses without requiring the full backend.
 */

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.MOCK_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockUsers = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T12:00:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-12T12:00:00Z'
  }
];

const mockEvents = [
  {
    id: '1',
    title: 'Team Standup Meeting',
    description: 'Daily standup with the development team to discuss progress and blockers.',
    start_time: '2024-01-15T09:00:00Z',
    end_time: '2024-01-15T09:30:00Z',
    location: 'Conference Room A',
    calendar_id: '1',
    user_id: '1',
    attendees: [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        response: 'accepted'
      },
      {
        id: '2',
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        response: 'accepted'
      }
    ],
    reminders: [
      {
        id: '1',
        event_id: '1',
        time: '2024-01-15T08:45:00Z',
        type: 'push',
        sent: false
      }
    ],
    status: 'confirmed',
    priority: 'medium',
    tags: ['work', 'meeting', 'daily'],
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    title: 'Product Review Meeting',
    description: 'Review of the latest product features and roadmap discussion.',
    start_time: '2024-01-15T14:00:00Z',
    end_time: '2024-01-15T15:00:00Z',
    location: 'Virtual Meeting',
    calendar_id: '1',
    user_id: '1',
    attendees: [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        response: 'accepted'
      }
    ],
    reminders: [
      {
        id: '2',
        event_id: '2',
        time: '2024-01-15T13:45:00Z',
        type: 'email',
        sent: false
      }
    ],
    status: 'confirmed',
    priority: 'high',
    tags: ['work', 'meeting', 'product'],
    created_at: '2024-01-12T08:00:00Z',
    updated_at: '2024-01-12T08:00:00Z'
  }
];

const mockVoiceCommands = [
  {
    id: '1',
    user_id: '1',
    command: 'Schedule a meeting with the team for tomorrow at 2pm',
    intent: 'schedule_meeting',
    entities: [
      { type: 'attendee', value: 'team', confidence: 0.9 },
      { type: 'time', value: 'tomorrow at 2pm', confidence: 0.95 }
    ],
    confidence: 0.92,
    created_at: '2024-01-15T08:30:00Z'
  },
  {
    id: '2',
    user_id: '1',
    command: 'What\'s on my calendar today?',
    intent: 'check_calendar',
    entities: [
      { type: 'time', value: 'today', confidence: 0.98 }
    ],
    confidence: 0.95,
    created_at: '2024-01-15T09:15:00Z'
  }
];

const mockNotifications = [
  {
    id: '1',
    user_id: '1',
    title: 'Meeting Reminder',
    message: 'Team Standup Meeting starts in 15 minutes',
    type: 'info',
    read: false,
    created_at: '2024-01-15T08:45:00Z'
  },
  {
    id: '2',
    user_id: '1',
    title: 'Event Created',
    message: 'Product Review Meeting has been scheduled for tomorrow at 2pm',
    type: 'success',
    read: true,
    created_at: '2024-01-14T16:30:00Z'
  }
];

// Helper function to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate error response
const errorResponse = (code, message, details = null) => ({
  success: false,
  error: {
    code,
    message,
    ...(details && { details })
  }
});

// Helper function to generate success response
const successResponse = (data) => ({
  success: true,
  data
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0',
    timestamp: Date.now() / 1000
  });
});

// Authentication endpoints
app.post('/api/v1/auth/login', async (req, res) => {
  await delay(500); // Simulate processing time
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json(errorResponse('validation_error', 'Email and password are required'));
  }
  
  const user = mockUsers.find(u => u.email === email);
  if (!user || password !== 'password123') {
    return res.status(401).json(errorResponse('invalid_credentials', 'Invalid email or password'));
  }
  
  const accessToken = `mock_access_token_${uuidv4()}`;
  const refreshToken = `mock_refresh_token_${uuidv4()}`;
  
  res.json(successResponse({
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: 'bearer',
    expires_in: 3600,
    user
  }));
});

app.post('/api/v1/auth/register', async (req, res) => {
  await delay(800); // Simulate processing time
  
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json(errorResponse('validation_error', 'Email, password, and name are required'));
  }
  
  if (mockUsers.find(u => u.email === email)) {
    return res.status(400).json(errorResponse('user_exists', 'User with this email already exists'));
  }
  
  const newUser = {
    id: uuidv4(),
    email,
    name,
    avatar: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  
  res.status(201).json(successResponse(newUser));
});

app.post('/api/v1/auth/refresh', async (req, res) => {
  await delay(300); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const newAccessToken = `mock_access_token_${uuidv4()}`;
  
  res.json(successResponse({
    access_token: newAccessToken,
    token_type: 'bearer',
    expires_in: 3600
  }));
});

app.get('/api/v1/auth/profile', async (req, res) => {
  await delay(200); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  // For mock purposes, return the first user
  res.json(successResponse(mockUsers[0]));
});

// Calendar endpoints
app.get('/api/v1/calendar/events', async (req, res) => {
  await delay(400); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { start_date, end_date, calendar_id } = req.query;
  
  let filteredEvents = mockEvents;
  
  // Filter by date range if provided
  if (start_date || end_date) {
    filteredEvents = mockEvents.filter(event => {
      const eventDate = new Date(event.start_time);
      const start = start_date ? new Date(start_date) : null;
      const end = end_date ? new Date(end_date) : null;
      
      if (start && eventDate < start) return false;
      if (end && eventDate > end) return false;
      return true;
    });
  }
  
  // Filter by calendar if provided
  if (calendar_id) {
    filteredEvents = filteredEvents.filter(event => event.calendar_id === calendar_id);
  }
  
  res.json(successResponse(filteredEvents));
});

app.post('/api/v1/calendar/events', async (req, res) => {
  await delay(600); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { title, start_time, end_time, description, location, attendees } = req.body;
  
  if (!title || !start_time || !end_time) {
    return res.status(400).json(errorResponse('validation_error', 'Title, start_time, and end_time are required'));
  }
  
  const newEvent = {
    id: uuidv4(),
    title,
    description: description || '',
    start_time,
    end_time,
    location: location || '',
    calendar_id: '1',
    user_id: '1',
    attendees: attendees ? attendees.map(email => ({
      id: uuidv4(),
      email,
      name: email.split('@')[0],
      response: 'pending'
    })) : [],
    reminders: [
      {
        id: uuidv4(),
        event_id: uuidv4(),
        time: new Date(new Date(start_time).getTime() - 15 * 60 * 1000).toISOString(),
        type: 'push',
        sent: false
      }
    ],
    status: 'confirmed',
    priority: 'medium',
    tags: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockEvents.push(newEvent);
  
  res.status(201).json(successResponse(newEvent));
});

app.get('/api/v1/calendar/events/:eventId', async (req, res) => {
  await delay(200); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { eventId } = req.params;
  const event = mockEvents.find(e => e.id === eventId);
  
  if (!event) {
    return res.status(404).json(errorResponse('not_found', 'Event not found'));
  }
  
  res.json(successResponse(event));
});

app.put('/api/v1/calendar/events/:eventId', async (req, res) => {
  await delay(500); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { eventId } = req.params;
  const eventIndex = mockEvents.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json(errorResponse('not_found', 'Event not found'));
  }
  
  const updatedEvent = {
    ...mockEvents[eventIndex],
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  mockEvents[eventIndex] = updatedEvent;
  
  res.json(successResponse(updatedEvent));
});

app.delete('/api/v1/calendar/events/:eventId', async (req, res) => {
  await delay(300); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { eventId } = req.params;
  const eventIndex = mockEvents.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json(errorResponse('not_found', 'Event not found'));
  }
  
  mockEvents.splice(eventIndex, 1);
  
  res.status(204).send();
});

// Voice endpoints
app.post('/api/v1/voice/process', async (req, res) => {
  await delay(1000); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { audio_data, user_id, session_id } = req.body;
  
  if (!audio_data || !user_id) {
    return res.status(400).json(errorResponse('validation_error', 'Audio data and user ID are required'));
  }
  
  // Mock voice processing response
  const mockResponses = [
    {
      text: 'Schedule a meeting with the team for tomorrow at 2pm',
      intent: 'schedule_meeting',
      confidence: 0.92,
      entities: {
        attendees: ['team'],
        time: 'tomorrow at 2pm',
        duration: '1 hour'
      },
      suggested_actions: ['Create calendar event', 'Send invitations', 'Set reminder']
    },
    {
      text: 'What\'s on my calendar today?',
      intent: 'check_calendar',
      confidence: 0.95,
      entities: {
        time: 'today',
        view: 'day'
      },
      suggested_actions: ['Show today\'s events', 'Display calendar view']
    },
    {
      text: 'Set a reminder to call mom in 2 hours',
      intent: 'set_reminder',
      confidence: 0.89,
      entities: {
        action: 'call mom',
        time: 'in 2 hours'
      },
      suggested_actions: ['Create reminder', 'Set notification']
    }
  ];
  
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  
  res.json(successResponse(randomResponse));
});

app.get('/api/v1/voice/history', async (req, res) => {
  await delay(300); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { limit = 50, offset = 0 } = req.query;
  
  const paginatedCommands = mockVoiceCommands.slice(offset, offset + parseInt(limit));
  
  res.json(successResponse({
    data: paginatedCommands,
    pagination: {
      total: mockVoiceCommands.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
      has_more: offset + parseInt(limit) < mockVoiceCommands.length
    }
  }));
});

// Notification endpoints
app.get('/api/v1/notifications', async (req, res) => {
  await delay(200); // Simulate processing time
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('invalid_token', 'Invalid or missing token'));
  }
  
  const { unread_only = false, limit = 20 } = req.query;
  
  let filteredNotifications = mockNotifications;
  
  if (unread_only === 'true') {
    filteredNotifications = mockNotifications.filter(n => !n.read);
  }
  
  const paginatedNotifications = filteredNotifications.slice(0, parseInt(limit));
  
  res.json(successResponse({
    data: paginatedNotifications,
    pagination: {
      total: filteredNotifications.length,
      limit: parseInt(limit),
      offset: 0,
      has_more: filteredNotifications.length > parseInt(limit)
    }
  }));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json(errorResponse('not_found', 'Endpoint not found'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Mock server error:', err);
  res.status(500).json(errorResponse('internal_error', 'Internal server error'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📚 API documentation available at http://localhost:${PORT}/health`);
  console.log(`🔑 Test credentials: john.doe@example.com / password123`);
  console.log(`⏱️  Simulated delays: 200-1000ms for realistic testing`);
});

module.exports = app;
