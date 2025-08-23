import { useState, useCallback, useEffect } from 'react'

interface VoiceRecognitionResult {
  transcript: string
  confidence: number
}

interface VoiceRecognitionCallbacks {
  onResult: (result: VoiceRecognitionResult) => void
  onError: (error: Error) => void
  onEnd?: () => void
}

interface VoiceRecognitionOptions {
  continuous?: boolean
  interimResults?: boolean
  lang?: string
}

export function useVoiceRecognition() {
  const [isSupported, setIsSupported] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      const recognitionInstance = new SpeechRecognition()
      setRecognition(recognitionInstance)
    }
  }, [])

  const startListening = useCallback(async (
    callbacks: VoiceRecognitionCallbacks,
    options: VoiceRecognitionOptions = {}
  ) => {
    if (!recognition) {
      throw new Error('Speech recognition not supported')
    }

    const {
      continuous = true,
      interimResults = true,
      lang = 'en-US'
    } = options

    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = lang

    recognition.onresult = (event: any) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        const confidence = event.results[i][0].confidence

        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      const result = {
        transcript: finalTranscript || interimTranscript,
        confidence: confidence || 0
      }

      callbacks.onResult(result)
    }

    recognition.onerror = (event: any) => {
      const error = new Error(event.error || 'Speech recognition error')
      callbacks.onError(error)
    }

    recognition.onend = () => {
      callbacks.onEnd?.()
    }

    try {
      await recognition.start()
    } catch (error) {
      throw new Error('Failed to start speech recognition')
    }
  }, [recognition])

  const stopListening = useCallback(async () => {
    if (recognition) {
      try {
        await recognition.stop()
      } catch (error) {
        throw new Error('Failed to stop speech recognition')
      }
    }
  }, [recognition])

  const abortListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.abort()
      } catch (error) {
        console.error('Failed to abort speech recognition:', error)
      }
    }
  }, [recognition])

  return {
    isSupported,
    startListening,
    stopListening,
    abortListening
  }
}
