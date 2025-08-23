'use client'

import { useState } from 'react'
import { Calendar, Clock, Mic, Settings, User } from 'lucide-react'
import { VoiceAssistant } from './voice-assistant'
import { CalendarView } from './calendar-view'
import { AssistantChat } from './assistant-chat'
import { InsightsDashboard } from './insights-dashboard'
import { Settings as SettingsComponent } from './settings'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const [activeView, setActiveView] = useState<'calendar' | 'voice' | 'chat' | 'insights' | 'settings'>('calendar')
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive)
    if (!isVoiceActive) {
      setActiveView('voice')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 overflow-hidden">
          {activeView === 'calendar' && (
            <div className="h-full p-6">
              <CalendarView />
            </div>
          )}
          
          {activeView === 'voice' && (
            <div className="h-full p-6">
              <VoiceAssistant />
            </div>
          )}
          
          {activeView === 'chat' && (
            <div className="h-full p-6">
              <AssistantChat />
            </div>
          )}
          
          {activeView === 'insights' && (
            <div className="h-full p-6">
              <InsightsDashboard />
            </div>
          )}
          
          {activeView === 'settings' && (
            <div className="h-full p-6">
              <SettingsComponent />
            </div>
          )}
        </main>
      </div>

      {/* Floating Voice Button */}
      <Button
        onClick={handleVoiceToggle}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-50",
          isVoiceActive && "bg-destructive hover:bg-destructive/90"
        )}
        size="lg"
      >
        <Mic className="w-6 h-6" />
      </Button>
    </div>
  )
}
