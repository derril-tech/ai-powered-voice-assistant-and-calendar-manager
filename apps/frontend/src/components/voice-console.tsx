"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, Settings, X } from 'lucide-react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface VoiceConsoleProps {
  onVoiceCommand: (command: string) => void;
  onToggleListening: (isListening: boolean) => void;
  isListening: boolean;
  confidence: number;
  transcript: string;
  isProcessing: boolean;
}

export function VoiceConsole({
  onVoiceCommand,
  onToggleListening,
  isListening,
  confidence,
  transcript,
  isProcessing
}: VoiceConsoleProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average);
          requestAnimationFrame(updateAudioLevel);
        }
      };
      
      setIsRecording(true);
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioLevel(0);
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      onToggleListening(false);
      stopRecording();
    } else {
      onToggleListening(true);
      startRecording();
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'bg-green-500';
    if (conf >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceText = (conf: number) => {
    if (conf >= 0.8) return 'High';
    if (conf >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Voice Console
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isListening ? "default" : "secondary"}
              className={cn(
                "flex items-center gap-1",
                isListening && "bg-green-500 hover:bg-green-600"
              )}
            >
              {isListening ? (
                <>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Listening
                </>
              ) : (
                "Ready"
              )}
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Audio Visualizer */}
        <div className="flex items-center justify-center h-20 bg-gray-50 rounded-lg">
          {isRecording ? (
            <div className="flex items-end gap-1 h-16">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="w-2 bg-blue-500 rounded-t"
                  style={{
                    height: `${Math.max(4, (audioLevel / 255) * 60 + Math.random() * 20)}px`,
                    transition: 'height 0.1s ease'
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              Click the microphone to start listening
            </div>
          )}
        </div>

        {/* Confidence Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Confidence</span>
            <span className="font-medium">{getConfidenceText(confidence)}</span>
          </div>
          <Progress value={confidence * 100} className="h-2" />
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className={cn("w-2 h-2 rounded-full", getConfidenceColor(confidence))} />
            {Math.round(confidence * 100)}% accuracy
          </div>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Transcript</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onVoiceCommand(transcript)}
                disabled={isProcessing}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              {transcript}
            </div>
          </div>
        )}

        {/* Control Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleToggleListening}
            disabled={isProcessing}
            className={cn(
              "h-16 w-16 rounded-full",
              isListening 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-blue-500 hover:bg-blue-600"
            )}
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Processing voice command...
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVoiceCommand("Schedule a meeting for tomorrow at 2pm")}
            disabled={isProcessing}
          >
            Quick Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVoiceCommand("What's on my calendar today?")}
            disabled={isProcessing}
          >
            Check Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
