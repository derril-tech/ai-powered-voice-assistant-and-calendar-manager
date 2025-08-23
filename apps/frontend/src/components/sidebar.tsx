'use client'

import { Calendar, Mic, Settings, Clock, Plus, MessageSquare, BarChart3 } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeView: 'calendar' | 'voice' | 'chat' | 'insights' | 'settings'
  onViewChange: (view: 'calendar' | 'voice' | 'chat' | 'insights' | 'settings') => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'calendar' as const,
      label: 'Calendar',
      icon: Calendar,
      description: 'View and manage your schedule'
    },
    {
      id: 'voice' as const,
      label: 'Voice Assistant',
      icon: Mic,
      description: 'Use voice commands to manage your calendar'
    },
    {
      id: 'chat' as const,
      label: 'Assistant Chat',
      icon: MessageSquare,
      description: 'Context-aware conversation interface'
    },
    {
      id: 'insights' as const,
      label: 'Insights',
      icon: BarChart3,
      description: 'Meeting analytics and optimization'
    },
    {
      id: 'settings' as const,
      label: 'Settings',
      icon: Settings,
      description: 'Configure your preferences'
    }
  ]

  return (
    <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
      <div className="p-4">
        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Actions</h3>
          <Button className="w-full justify-start" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Navigation</h3>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-3",
                  activeView === item.id && "bg-secondary"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              </Button>
            )
          })}
        </nav>

        {/* Today's Schedule Preview */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Today's Schedule</h3>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <div className="font-medium">Team Meeting</div>
              <div className="text-muted-foreground">2:00 PM - 3:00 PM</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Client Call</div>
              <div className="text-muted-foreground">4:30 PM - 5:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
