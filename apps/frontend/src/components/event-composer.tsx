"use client";

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Video, Mic, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface EventComposerProps {
  onSave: (event: EventData) => void;
  onCancel: () => void;
  initialData?: Partial<EventData>;
  isVoiceMode?: boolean;
  onVoiceInput?: (text: string) => void;
}

interface EventData {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  attendees: string[];
  meetingUrl: string;
  isAllDay: boolean;
  hasVideoCall: boolean;
  bufferTime: number;
}

export function EventComposer({
  onSave,
  onCancel,
  initialData = {},
  isVoiceMode = false,
  onVoiceInput
}: EventComposerProps) {
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    attendees: [],
    meetingUrl: '',
    isAllDay: false,
    hasVideoCall: false,
    bufferTime: 0,
    ...initialData
  });

  const [newAttendee, setNewAttendee] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleInputChange = (field: keyof EventData, value: any) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const addAttendee = () => {
    if (newAttendee.trim() && !eventData.attendees.includes(newAttendee.trim())) {
      handleInputChange('attendees', [...eventData.attendees, newAttendee.trim()]);
      setNewAttendee('');
    }
  };

  const removeAttendee = (attendee: string) => {
    handleInputChange('attendees', eventData.attendees.filter(a => a !== attendee));
  };

  const handleVoiceInput = () => {
    if (onVoiceInput) {
      setIsListening(true);
      // This would integrate with the voice processing system
      setTimeout(() => {
        setIsListening(false);
        onVoiceInput("Meeting with team about Q4 planning");
      }, 2000);
    }
  };

  const handleSave = () => {
    onSave(eventData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {initialData.title ? 'Edit Event' : 'Create Event'}
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Title with Voice Input */}
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <div className="flex gap-2">
            <Input
              id="title"
              value={eventData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event title..."
              className="flex-1"
            />
            {isVoiceMode && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceInput}
                disabled={isListening}
              >
                <Mic className={cn("h-4 w-4", isListening && "animate-pulse")} />
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={eventData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Add event description..."
            rows={3}
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={eventData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={eventData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              disabled={eventData.isAllDay}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={eventData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={eventData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              disabled={eventData.isAllDay}
            />
          </div>
        </div>

        {/* All Day Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="allDay"
            checked={eventData.isAllDay}
            onCheckedChange={(checked) => handleInputChange('isAllDay', checked)}
          />
          <Label htmlFor="allDay">All day event</Label>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex gap-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-3" />
            <Input
              id="location"
              value={eventData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter location or meeting URL..."
            />
          </div>
        </div>

        {/* Video Call Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="videoCall"
            checked={eventData.hasVideoCall}
            onCheckedChange={(checked) => handleInputChange('hasVideoCall', checked)}
          />
          <Label htmlFor="videoCall" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Include video call
          </Label>
        </div>

        {/* Attendees */}
        <div className="space-y-2">
          <Label>Attendees</Label>
          <div className="flex gap-2">
            <Input
              value={newAttendee}
              onChange={(e) => setNewAttendee(e.target.value)}
              placeholder="Add attendee email..."
              onKeyPress={(e) => e.key === 'Enter' && addAttendee()}
            />
            <Button variant="outline" onClick={addAttendee}>
              Add
            </Button>
          </div>
          {eventData.attendees.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {eventData.attendees.map((attendee, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {attendee}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeAttendee(attendee)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Buffer Time */}
        <div className="space-y-2">
          <Label htmlFor="bufferTime">Buffer Time (minutes)</Label>
          <Input
            id="bufferTime"
            type="number"
            min="0"
            max="60"
            value={eventData.bufferTime}
            onChange={(e) => handleInputChange('bufferTime', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Create Event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
