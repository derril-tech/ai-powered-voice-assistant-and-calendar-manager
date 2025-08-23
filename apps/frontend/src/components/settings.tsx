'use client'

import React, { useState } from 'react'
import { Settings, User, Mic, Bell, Calendar, Globe, Shield, Palette, Database } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserSettings {
  profile: {
    name: string
    email: string
    timezone: string
    language: string
  }
  voice: {
    enabled: boolean
    voiceId: string
    speed: number
    pitch: number
    volume: number
    autoStart: boolean
  }
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    reminderTime: number
    meetingReminders: boolean
    dailyDigest: boolean
  }
  calendar: {
    defaultDuration: number
    bufferTime: number
    workingHours: {
      start: string
      end: string
    }
    integrations: {
      google: boolean
      outlook: boolean
      caldav: boolean
    }
  }
  appearance: {
    theme: 'light' | 'dark' | 'system'
    compactMode: boolean
    showWeekends: boolean
  }
  privacy: {
    dataSharing: boolean
    analytics: boolean
    voiceRecording: boolean
  }
}

export function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      timezone: 'America/New_York',
      language: 'en-US'
    },
    voice: {
      enabled: true,
      voiceId: 'en-US-Neural2-F',
      speed: 1.0,
      pitch: 1.0,
      volume: 0.8,
      autoStart: false
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      reminderTime: 15,
      meetingReminders: true,
      dailyDigest: true
    },
    calendar: {
      defaultDuration: 30,
      bufferTime: 15,
      workingHours: {
        start: '09:00',
        end: '17:00'
      },
      integrations: {
        google: true,
        outlook: false,
        caldav: false
      }
    },
    appearance: {
      theme: 'system',
      compactMode: false,
      showWeekends: true
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      voiceRecording: true
    }
  })

  const handleSettingChange = (category: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleNestedSettingChange = (category: keyof UserSettings, parentKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentKey]: {
          ...prev[category][parentKey as keyof typeof prev[typeof category]],
          [key]: value
        }
      }
    }))
  }

  const voiceOptions = [
    { id: 'en-US-Neural2-F', name: 'Emma (Female)' },
    { id: 'en-US-Neural2-M', name: 'James (Male)' },
    { id: 'en-US-Neural2-A', name: 'Alex (Neutral)' },
    { id: 'en-US-Neural2-D', name: 'David (Male)' },
    { id: 'en-US-Neural2-E', name: 'Eva (Female)' }
  ]

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' }
  ]

  const languageOptions = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' },
    { value: 'de-DE', label: 'German' },
    { value: 'ja-JP', label: 'Japanese' }
  ]

  return (
    <div className="h-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your preferences and integrations</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center space-x-2">
            <Mic className="w-4 h-4" />
            <span className="hidden sm:inline">Voice</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.profile.timezone}
                    onValueChange={(value) => handleSettingChange('profile', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezoneOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.profile.language}
                    onValueChange={(value) => handleSettingChange('profile', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="w-5 h-5" />
                <span>Voice Assistant Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable Voice Assistant</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow voice commands and responses
                  </p>
                </div>
                <Switch
                  checked={settings.voice.enabled}
                  onCheckedChange={(checked) => handleSettingChange('voice', 'enabled', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voiceId">Voice Selection</Label>
                  <Select
                    value={settings.voice.voiceId}
                    onValueChange={(value) => handleSettingChange('voice', 'voiceId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {voiceOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="speed">Speed</Label>
                    <Input
                      id="speed"
                      type="number"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={settings.voice.speed}
                      onChange={(e) => handleSettingChange('voice', 'speed', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pitch">Pitch</Label>
                    <Input
                      id="pitch"
                      type="number"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={settings.voice.pitch}
                      onChange={(e) => handleSettingChange('voice', 'pitch', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume</Label>
                    <Input
                      id="volume"
                      type="number"
                      min="0.0"
                      max="1.0"
                      step="0.1"
                      value={settings.voice.volume}
                      onChange={(e) => handleSettingChange('voice', 'volume', parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-start Voice Recognition</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start listening when opening voice console
                    </p>
                  </div>
                  <Switch
                    checked={settings.voice.autoStart}
                    onCheckedChange={(checked) => handleSettingChange('voice', 'autoStart', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in browser
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'sms', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Reminder Time</Label>
                  <Select
                    value={settings.notifications.reminderTime.toString()}
                    onValueChange={(value) => handleSettingChange('notifications', 'reminderTime', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes before</SelectItem>
                      <SelectItem value="10">10 minutes before</SelectItem>
                      <SelectItem value="15">15 minutes before</SelectItem>
                      <SelectItem value="30">30 minutes before</SelectItem>
                      <SelectItem value="60">1 hour before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Meeting Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming meetings
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.meetingReminders}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'meetingReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive daily summary of your schedule
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.dailyDigest}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'dailyDigest', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Calendar Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultDuration">Default Meeting Duration</Label>
                  <Select
                    value={settings.calendar.defaultDuration.toString()}
                    onValueChange={(value) => handleSettingChange('calendar', 'defaultDuration', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bufferTime">Buffer Time</Label>
                  <Select
                    value={settings.calendar.bufferTime.toString()}
                    onValueChange={(value) => handleSettingChange('calendar', 'bufferTime', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workingStart">Working Hours Start</Label>
                  <Input
                    id="workingStart"
                    type="time"
                    value={settings.calendar.workingHours.start}
                    onChange={(e) => handleNestedSettingChange('calendar', 'workingHours', 'start', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workingEnd">Working Hours End</Label>
                  <Input
                    id="workingEnd"
                    type="time"
                    value={settings.calendar.workingHours.end}
                    onChange={(e) => handleNestedSettingChange('calendar', 'workingHours', 'end', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Calendar Integrations</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div>
                        <Label className="font-medium">Google Calendar</Label>
                        <p className="text-sm text-muted-foreground">Sync with Google Calendar</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.calendar.integrations.google}
                      onCheckedChange={(checked) => handleNestedSettingChange('calendar', 'integrations', 'google', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold">O</span>
                      </div>
                      <div>
                        <Label className="font-medium">Outlook Calendar</Label>
                        <p className="text-sm text-muted-foreground">Sync with Microsoft Outlook</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.calendar.integrations.outlook}
                      onCheckedChange={(checked) => handleNestedSettingChange('calendar', 'integrations', 'outlook', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold">C</span>
                      </div>
                      <div>
                        <Label className="font-medium">CalDAV</Label>
                        <p className="text-sm text-muted-foreground">Sync with CalDAV servers</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.calendar.integrations.caldav}
                      onCheckedChange={(checked) => handleNestedSettingChange('calendar', 'integrations', 'caldav', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Appearance Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value: 'light' | 'dark' | 'system') => handleSettingChange('appearance', 'theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use more compact layout for better space utilization
                  </p>
                </div>
                <Switch
                  checked={settings.appearance.compactMode}
                  onCheckedChange={(checked) => handleSettingChange('appearance', 'compactMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Show Weekends</Label>
                  <p className="text-sm text-muted-foreground">
                    Display weekends in calendar views
                  </p>
                </div>
                <Switch
                  checked={settings.appearance.showWeekends}
                  onCheckedChange={(checked) => handleSettingChange('appearance', 'showWeekends', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow sharing of usage data for product improvement
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataSharing}
                    onCheckedChange={(checked) => handleSettingChange('privacy', 'dataSharing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the app with anonymous usage analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.analytics}
                    onCheckedChange={(checked) => handleSettingChange('privacy', 'analytics', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Voice Recording</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow voice commands to be processed and stored
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.voiceRecording}
                    onCheckedChange={(checked) => handleSettingChange('privacy', 'voiceRecording', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Data Management</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Delete My Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
