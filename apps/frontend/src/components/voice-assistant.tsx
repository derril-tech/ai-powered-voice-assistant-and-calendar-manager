'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Send, Volume2, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { useVoiceRecognition } from '@/hooks/use-voice-recognition'
import { useVoiceStore } from '@/hooks/use-voice-store'
import { cn, formatDuration, getConfidenceColor } from '@/lib/utils'
import { VoiceCommand } from '@/types'

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const { commands, addCommand } = useVoiceStore()
  const { startListening, stopListening, isSupported } = useVoiceRecognition()

  const handleStartListening = async () => {
    try {
      setError(null)
      setIsListening(true)
      setTranscript('')
      setConfidence(0)
      
      await startListening({
        onResult: (result) => {
          setTranscript(result.transcript)
          setConfidence(result.confidence)
        },
        onError: (error) => {
          setError(error.message)
          setIsListening(false)
        }
      })
    } catch (err) {
      setError('Failed to start voice recognition')
      setIsListening(false)
    }
  }

  const handleStopListening = async () => {
    try {
      await stopListening()
      setIsListening(false)
      
      if (transcript.trim()) {
        await processVoiceCommand(transcript)
      }
    } catch (err) {
      setError('Failed to stop voice recognition')
    }
  }

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true)
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const voiceCommand: VoiceCommand = {
        id: Date.now().toString(),
        userId: 'user-1',
        command,
        intent: {
          type: 'create_event',
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

  const handleSendCommand = async () => {
    if (transcript.trim()) {
      await processVoiceCommand(transcript)
    }
  }

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="text-center">
            <MicOff className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Voice Recognition Not Supported</h2>
            <p className="text-muted-foreground">
              Your browser doesn't support speech recognition. Please use a modern browser like Chrome, Firefox, or Safari.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Voice Input Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Voice Assistant</h2>
          <Badge variant={isListening ? "destructive" : "secondary"}>
            {isListening ? "Listening..." : "Ready"}
          </Badge>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={isListening ? handleStopListening : handleStartListening}
            disabled={isProcessing}
            className={cn(
              "w-16 h-16 rounded-full",
              isListening && "bg-destructive hover:bg-destructive/90 animate-pulse"
            )}
            size="lg"
          >
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isListening ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </Button>

          <div className="flex-1">
            <div className="relative">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Speak or type your command..."
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                disabled={isProcessing}
              />
              {transcript && (
                <Button
                  onClick={handleSendCommand}
                  disabled={isProcessing}
                  className="absolute bottom-2 right-2"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {confidence > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className={cn("text-sm font-medium", getConfidenceColor(confidence))}>
                  {Math.round(confidence * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Voice Wave Animation */}
        {isListening && (
          <div className="flex justify-center">
            <div className="voice-wave w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        )}
      </Card>

      {/* Command History */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Commands</h3>
        <div className="space-y-3">
          {commands.slice(-5).reverse().map((command) => (
            <div key={command.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{command.command}</p>
                <Badge variant="outline">
                  {Math.round(command.confidence * 100)}%
                </Badge>
              </div>
              {command.response && (
                <p className="text-sm text-muted-foreground">{command.response}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {command.createdAt.toLocaleString()}
              </p>
            </div>
          ))}
          {commands.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No commands yet. Try saying something like "Schedule a meeting tomorrow at 2 PM"
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
