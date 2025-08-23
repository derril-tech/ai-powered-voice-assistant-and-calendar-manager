'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, Bot, User, Clock, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@/lib/utils'
import { mockVoiceCommands } from '@/lib/mock-data'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  intent?: string
  confidence?: number
  suggestedActions?: string[]
}

export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant. I can help you manage your calendar, schedule meetings, and answer questions about your schedule. How can I help you today?',
      timestamp: new Date(),
      suggestedActions: [
        'Show today\'s schedule',
        'Schedule a meeting',
        'Check next week',
        'Set a reminder'
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay for realism
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // In a real implementation, this would trigger voice recognition
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        const voiceCommands = mockVoiceCommands
        const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)]
        setInputValue(randomCommand.command)
        setIsListening(false)
      }, 2000)
    }
  }

  const generateAIResponse = (userInput: string): ChatMessage => {
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('schedule') || lowerInput.includes('meeting')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I can help you schedule a meeting! What time would you like to meet and who should I invite?',
        timestamp: new Date(),
        intent: 'schedule_meeting',
        confidence: 0.95,
        suggestedActions: [
          'Tomorrow at 2 PM',
          'Next week',
          'Add team members',
          'Set location'
        ]
      }
    } else if (lowerInput.includes('today') || lowerInput.includes('schedule')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Here\'s your schedule for today:\n\n• 9:00 AM - Team Standup\n• 2:00 PM - Product Review\n• 4:30 PM - Client Call\n\nYou have 3 meetings today with 2 hours of free time.',
        timestamp: new Date(),
        intent: 'check_schedule',
        confidence: 0.98,
        suggestedActions: [
          'Reschedule any meeting',
          'Add buffer time',
          'View tomorrow',
          'Set reminders'
        ]
      }
    } else if (lowerInput.includes('reminder') || lowerInput.includes('remind')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I\'ll set a reminder for you. What would you like me to remind you about and when?',
        timestamp: new Date(),
        intent: 'set_reminder',
        confidence: 0.92,
        suggestedActions: [
          'In 1 hour',
          'Tomorrow morning',
          'This weekend',
          'Custom time'
        ]
      }
    } else {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I understand you\'re asking about "' + userInput + '". Let me help you with that. Could you provide more details about what you\'d like me to do?',
        timestamp: new Date(),
        intent: 'general_query',
        confidence: 0.75,
        suggestedActions: [
          'Schedule something',
          'Check calendar',
          'Set reminder',
          'Get insights'
        ]
      }
    }
  }

  const handleSuggestedAction = (action: string) => {
    setInputValue(action)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Assistant Chat</span>
            <Badge variant="secondary" className="ml-auto">
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex space-x-3",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.type === 'assistant' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.type === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.confidence && (
                      <div className="mt-2 text-xs opacity-70">
                        Confidence: {Math.round(message.confidence * 100)}%
                      </div>
                    )}
                    
                    {message.suggestedActions && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs font-medium opacity-70">Quick Actions:</div>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestedActions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleSuggestedAction(action)}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {message.type === 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="text-xs text-muted-foreground self-end">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message or ask about your schedule..."
                className="flex-1"
                disabled={isListening}
              />
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                onClick={handleVoiceInput}
                disabled={!inputValue.trim() && !isListening}
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isListening}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {isListening && (
              <div className="mt-2 text-sm text-muted-foreground flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Listening... Speak now</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
