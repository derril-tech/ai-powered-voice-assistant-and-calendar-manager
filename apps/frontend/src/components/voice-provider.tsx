'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useVoiceStore } from '@/hooks/use-voice-store'

interface VoiceContextType {
  isListening: boolean
  isProcessing: boolean
  transcript: string
  confidence: number
  error: string | null
  startListening: () => void
  stopListening: () => void
  processCommand: (command: string) => void
  clearError: () => void
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const { addCommand } = useVoiceStore()

  const startListening = () => {
    setError(null)
    setIsListening(true)
    setTranscript('')
    setConfidence(0)
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('Schedule a meeting tomorrow at 2 PM')
      setConfidence(0.85)
    }, 2000)
  }

  const stopListening = () => {
    setIsListening(false)
    if (transcript.trim()) {
      processCommand(transcript)
    }
  }

  const processCommand = async (command: string) => {
    setIsProcessing(true)
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const voiceCommand = {
        id: Date.now().toString(),
        userId: 'user-1',
        command,
        intent: {
          type: 'create_event' as const,
          confidence: confidence
        },
        entities: [],
        confidence,
        processed: true,
        response: `I've processed your command: "${command}"`,
        createdAt: new Date()
      }
      
      addCommand(voiceCommand)
      setTranscript('')
    } catch (err) {
      setError('Failed to process voice command')
    } finally {
      setIsProcessing(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value = {
    isListening,
    isProcessing,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    processCommand,
    clearError
  }

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider')
  }
  return context
}
