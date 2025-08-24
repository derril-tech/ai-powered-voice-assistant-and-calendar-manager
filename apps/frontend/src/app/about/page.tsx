'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About TempoPilot™</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Voice-First Calendar Autopilot</CardTitle>
              <CardDescription>
                Transform natural conversation into flawless scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                TempoPilot™ is a sophisticated voice-first productivity platform that turns 
                natural conversation into flawless scheduling, reminders, and meeting intelligence 
                across Google, Outlook, and Apple Calendar.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Voice Recognition</Badge>
                <Badge variant="secondary">AI-Powered</Badge>
                <Badge variant="secondary">Calendar Sync</Badge>
                <Badge variant="secondary">Meeting Intelligence</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>
                What makes TempoPilot™ unique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Natural Language Scheduling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Conflict Resolution
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Proactive Suggestions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Meeting Intelligence
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Universal Calendar Sync
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
