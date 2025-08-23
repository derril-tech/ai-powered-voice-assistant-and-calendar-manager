import { VOICE_CONFIG } from './constants'
import { VoiceCommand, VoiceIntent, VoiceEntity } from '@/types'

// Voice Command Processor
export class VoiceProcessor {
  private intentPatterns: Record<string, RegExp>
  private supportedCommands: string[]

  constructor() {
    this.intentPatterns = VOICE_CONFIG.intentPatterns
    this.supportedCommands = VOICE_CONFIG.supportedCommands
  }

  // Process raw voice input and extract structured data
  async processVoiceInput(
    transcript: string,
    confidence: number = 1.0
  ): Promise<VoiceCommand> {
    const normalizedTranscript = this.normalizeTranscript(transcript)
    const intent = this.extractIntent(normalizedTranscript)
    const entities = this.extractEntities(normalizedTranscript)
    const command = this.buildCommand(intent, entities)

    return {
      id: this.generateId(),
      command: transcript,
      normalizedCommand: normalizedTranscript,
      intent,
      entities,
      confidence,
      response: null,
      createdAt: new Date(),
      processedAt: new Date(),
    }
  }

  // Normalize transcript for better processing
  private normalizeTranscript(transcript: string): string {
    return transcript
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s]/g, '')
  }

  // Extract intent from transcript
  private extractIntent(transcript: string): VoiceIntent {
    for (const [intentType, pattern] of Object.entries(this.intentPatterns)) {
      if (pattern.test(transcript)) {
        return {
          type: intentType as any,
          confidence: this.calculateIntentConfidence(transcript, pattern),
          raw: transcript,
        }
      }
    }

    // Default to unknown intent
    return {
      type: 'unknown',
      confidence: 0.1,
      raw: transcript,
    }
  }

  // Calculate intent confidence based on pattern match
  private calculateIntentConfidence(transcript: string, pattern: RegExp): number {
    const match = transcript.match(pattern)
    if (!match) return 0

    // Higher confidence for longer, more specific matches
    const matchLength = match[0].length
    const totalLength = transcript.length
    return Math.min(1.0, matchLength / totalLength + 0.3)
  }

  // Extract entities from transcript
  private extractEntities(transcript: string): VoiceEntity[] {
    const entities: VoiceEntity[] = []

    // Extract time entities
    const timeEntities = this.extractTimeEntities(transcript)
    entities.push(...timeEntities)

    // Extract date entities
    const dateEntities = this.extractDateEntities(transcript)
    entities.push(...dateEntities)

    // Extract duration entities
    const durationEntities = this.extractDurationEntities(transcript)
    entities.push(...durationEntities)

    // Extract location entities
    const locationEntities = this.extractLocationEntities(transcript)
    entities.push(...locationEntities)

    // Extract person entities
    const personEntities = this.extractPersonEntities(transcript)
    entities.push(...personEntities)

    return entities
  }

  // Extract time entities (e.g., "2 PM", "14:30", "noon")
  private extractTimeEntities(transcript: string): VoiceEntity[] {
    const entities: VoiceEntity[] = []
    
    // Time patterns
    const timePatterns = [
      /(\d{1,2}):(\d{2})\s*(am|pm)?/i,
      /(\d{1,2})\s*(am|pm)/i,
      /(noon|midnight)/i,
      /(morning|afternoon|evening|night)/i,
    ]

    timePatterns.forEach(pattern => {
      const matches = transcript.matchAll(pattern)
      for (const match of matches) {
        entities.push({
          type: 'time',
          value: match[0],
          start: match.index!,
          end: match.index! + match[0].length,
          confidence: 0.9,
        })
      }
    })

    return entities
  }

  // Extract date entities (e.g., "tomorrow", "next Monday", "January 15th")
  private extractDateEntities(transcript: string): VoiceEntity[] {
    const entities: VoiceEntity[] = []
    
    // Date patterns
    const datePatterns = [
      /(today|tomorrow|yesterday)/i,
      /(next|last)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
      /(this|next|last)\s+(week|month|year)/i,
      /(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(st|nd|rd|th)?/i,
      /\d{1,2}\/\d{1,2}(\/\d{2,4})?/i,
    ]

    datePatterns.forEach(pattern => {
      const matches = transcript.matchAll(pattern)
      for (const match of matches) {
        entities.push({
          type: 'date',
          value: match[0],
          start: match.index!,
          end: match.index! + match[0].length,
          confidence: 0.9,
        })
      }
    })

    return entities
  }

  // Extract duration entities (e.g., "1 hour", "30 minutes", "2 days")
  private extractDurationEntities(transcript: string): VoiceEntity[] {
    const entities: VoiceEntity[] = []
    
    // Duration patterns
    const durationPatterns = [
      /(\d+)\s+(hour|hours)/i,
      /(\d+)\s+(minute|minutes)/i,
      /(\d+)\s+(day|days)/i,
      /(\d+)\s+(week|weeks)/i,
      /(\d+)\s+(month|months)/i,
    ]

    durationPatterns.forEach(pattern => {
      const matches = transcript.matchAll(pattern)
      for (const match of matches) {
        entities.push({
          type: 'duration',
          value: match[0],
          start: match.index!,
          end: match.index! + match[0].length,
          confidence: 0.9,
        })
      }
    })

    return entities
  }

  // Extract location entities (e.g., "Conference Room A", "Zoom", "office")
  private extractLocationEntities(transcript: string): VoiceEntity[] {
    const entities: VoiceEntity[] = []
    
    // Location patterns
    const locationPatterns = [
      /(conference room|meeting room|room)\s+[a-z]/i,
      /(zoom|teams|skype|google meet)/i,
      /(office|home|cafe|restaurant)/i,
      /(at|in)\s+([a-z\s]+)/i,
    ]

    locationPatterns.forEach(pattern => {
      const matches = transcript.matchAll(pattern)
      for (const match of matches) {
        entities.push({
          type: 'location',
          value: match[0],
          start: match.index!,
          end: match.index! + match[0].length,
          confidence: 0.8,
        })
      }
    })

    return entities
  }

  // Extract person entities (e.g., "John", "team", "client")
  private extractPersonEntities(transcript: string): VoiceEntity[] {
    const entities: VoiceEntity[] = []
    
    // Person patterns
    const personPatterns = [
      /(with|meet)\s+([a-z]+)/i,
      /(team|client|customer|boss|manager)/i,
      /\b([A-Z][a-z]+)\b/g, // Capitalized names
    ]

    personPatterns.forEach(pattern => {
      const matches = transcript.matchAll(pattern)
      for (const match of matches) {
        entities.push({
          type: 'person',
          value: match[0],
          start: match.index!,
          end: match.index! + match[0].length,
          confidence: 0.7,
        })
      }
    })

    return entities
  }

  // Build structured command from intent and entities
  private buildCommand(intent: VoiceIntent, entities: VoiceEntity[]): any {
    const command: any = {
      action: intent.type,
      parameters: {},
    }

    // Extract parameters from entities
    entities.forEach(entity => {
      switch (entity.type) {
        case 'time':
          command.parameters.time = entity.value
          break
        case 'date':
          command.parameters.date = entity.value
          break
        case 'duration':
          command.parameters.duration = entity.value
          break
        case 'location':
          command.parameters.location = entity.value
          break
        case 'person':
          command.parameters.person = entity.value
          break
      }
    })

    return command
  }

  // Generate unique ID for command
  private generateId(): string {
    return `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Validate if command is supported
  isCommandSupported(command: string): boolean {
    const normalizedCommand = this.normalizeTranscript(command)
    return this.supportedCommands.some(supported => 
      normalizedCommand.includes(supported.toLowerCase())
    )
  }

  // Get command suggestions based on partial input
  getCommandSuggestions(partialInput: string): string[] {
    const normalized = this.normalizeTranscript(partialInput)
    return this.supportedCommands.filter(command =>
      command.toLowerCase().includes(normalized) ||
      normalized.includes(command.toLowerCase())
    ).slice(0, 5)
  }

  // Parse natural language date/time into structured format
  parseDateTime(text: string): { date?: Date; time?: string; duration?: number } {
    const result: any = {}
    
    // Parse relative dates
    if (text.includes('today')) {
      result.date = new Date()
    } else if (text.includes('tomorrow')) {
      result.date = new Date(Date.now() + 24 * 60 * 60 * 1000)
    } else if (text.includes('yesterday')) {
      result.date = new Date(Date.now() - 24 * 60 * 60 * 1000)
    }

    // Parse times
    const timeMatch = text.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i)
    if (timeMatch) {
      let hours = parseInt(timeMatch[1])
      const minutes = parseInt(timeMatch[2])
      const period = timeMatch[3]?.toLowerCase()

      if (period === 'pm' && hours !== 12) hours += 12
      if (period === 'am' && hours === 12) hours = 0

      result.time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    // Parse durations
    const durationMatch = text.match(/(\d+)\s+(hour|hours|minute|minutes)/i)
    if (durationMatch) {
      const value = parseInt(durationMatch[1])
      const unit = durationMatch[2].toLowerCase()
      result.duration = unit.startsWith('hour') ? value * 60 : value
    }

    return result
  }

  // Format command for display
  formatCommand(command: VoiceCommand): string {
    const parts = [command.intent.type]
    
    command.entities.forEach(entity => {
      parts.push(`${entity.type}: ${entity.value}`)
    })

    return parts.join(' | ')
  }

  // Get command confidence score
  getCommandConfidence(command: VoiceCommand): number {
    const intentConfidence = command.intent.confidence
    const entityConfidence = command.entities.length > 0 
      ? command.entities.reduce((sum, entity) => sum + entity.confidence, 0) / command.entities.length
      : 0.5

    return (intentConfidence + entityConfidence + command.confidence) / 3
  }
}

// Create voice processor instance
export const voiceProcessor = new VoiceProcessor()

// Voice command templates for common actions
export const VOICE_COMMAND_TEMPLATES = {
  scheduleMeeting: [
    'schedule a meeting with {person} at {time} on {date}',
    'book a meeting for {date} at {time}',
    'create an appointment with {person}',
    'set up a meeting at {location}',
  ],
  showCalendar: [
    'show my calendar for {date}',
    'what\'s on my schedule for {date}',
    'display my appointments',
    'show today\'s events',
  ],
  cancelEvent: [
    'cancel my meeting at {time}',
    'delete the appointment on {date}',
    'remove the event with {person}',
  ],
  addReminder: [
    'remind me to {task} at {time}',
    'set a reminder for {date}',
    'add an alarm for {time}',
  ],
} as const

// Voice command examples for testing
export const VOICE_COMMAND_EXAMPLES = [
  'Schedule a meeting with John tomorrow at 2 PM',
  'Show my calendar for today',
  'Cancel the meeting at 3 PM',
  'Remind me to call the client at 10 AM',
  'Book a conference room for next Monday',
  'What\'s on my schedule for this week?',
  'Set up a Zoom call with the team',
  'Add a reminder to submit the report',
] as const
