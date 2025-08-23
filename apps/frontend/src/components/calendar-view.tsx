'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'
import { cn, formatTime, getPriorityColor } from '@/lib/utils'

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Team Meeting',
      startTime: new Date(2024, 0, 15, 14, 0),
      endTime: new Date(2024, 0, 15, 15, 0),
      priority: 'high' as const,
      location: 'Conference Room A'
    },
    {
      id: '2',
      title: 'Client Call',
      startTime: new Date(2024, 0, 15, 16, 30),
      endTime: new Date(2024, 0, 15, 17, 0),
      priority: 'medium' as const,
      location: 'Zoom'
    },
    {
      id: '3',
      title: 'Project Review',
      startTime: new Date(2024, 0, 20, 10, 0),
      endTime: new Date(2024, 0, 20, 11, 30),
      priority: 'low' as const,
      location: 'Office'
    }
  ]

  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    return eachDayOfInterval({ start, end })
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.startTime, date))
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousMonth}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[120px] text-center">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={nextMonth}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card className="p-6">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayEvents = getEventsForDate(day)
            const isCurrentDay = isToday(day)
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isSelected = selectedDate && isSameDay(day, selectedDate)

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[120px] p-2 border border-border hover:bg-accent/50 transition-colors cursor-pointer",
                  isCurrentDay && "bg-primary text-primary-foreground",
                  isSelected && "ring-2 ring-primary",
                  !isCurrentMonth && "text-muted-foreground bg-muted/30"
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className="text-sm font-medium mb-1">
                  {format(day, 'd')}
                </div>
                
                {/* Events for this day */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs p-1 rounded truncate",
                        getPriorityColor(event.priority)
                      )}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-75">
                        {formatTime(event.startTime)}
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Selected Date Events */}
      {selectedDate && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Events for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>
          
          <div className="space-y-3">
            {getEventsForDate(selectedDate).map((event) => (
              <div
                key={event.id}
                className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant="outline" className={getPriorityColor(event.priority)}>
                    {event.priority}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                  {event.location && <div>📍 {event.location}</div>}
                </div>
              </div>
            ))}
            
            {getEventsForDate(selectedDate).length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                No events scheduled for this day
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
