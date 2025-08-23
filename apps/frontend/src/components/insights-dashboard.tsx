'use client'

import React, { useState } from 'react'
import { BarChart3, TrendingUp, Clock, Users, Target, Lightbulb, Calendar, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { cn } from '@/lib/utils'

interface InsightMetric {
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  unit?: string
}

interface OptimizationSuggestion {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  category: string
  action: string
  estimatedSavings?: string
}

export function InsightsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week')

  const metrics: InsightMetric[] = [
    {
      label: 'Total Meetings',
      value: 24,
      change: 12,
      trend: 'up',
      unit: 'meetings'
    },
    {
      label: 'Meeting Hours',
      value: 18.5,
      change: -8,
      trend: 'down',
      unit: 'hours'
    },
    {
      label: 'Focus Time',
      value: 12.5,
      change: 15,
      trend: 'up',
      unit: 'hours'
    },
    {
      label: 'Productivity Score',
      value: 87,
      change: 5,
      trend: 'up',
      unit: '%'
    }
  ]

  const suggestions: OptimizationSuggestion[] = [
    {
      id: '1',
      title: 'Reduce Meeting Duration',
      description: 'Your team meetings average 45 minutes. Consider 30-minute slots to save 2.5 hours weekly.',
      impact: 'high',
      category: 'Time Management',
      action: 'Apply 30-min default',
      estimatedSavings: '2.5 hours/week'
    },
    {
      id: '2',
      title: 'Optimize Meeting Times',
      description: 'Most meetings are scheduled between 2-4 PM. Consider morning slots for better focus.',
      impact: 'medium',
      category: 'Scheduling',
      action: 'Suggest morning slots',
      estimatedSavings: '1 hour/week'
    },
    {
      id: '3',
      title: 'Add Buffer Time',
      description: 'Only 20% of meetings have buffer time. Adding 15-minute buffers can reduce stress.',
      impact: 'medium',
      category: 'Wellness',
      action: 'Auto-add buffers',
      estimatedSavings: 'Reduced stress'
    },
    {
      id: '4',
      title: 'Consolidate Similar Meetings',
      description: 'You have 3 separate 1:1 meetings this week. Consider group discussions.',
      impact: 'low',
      category: 'Efficiency',
      action: 'Suggest consolidation',
      estimatedSavings: '1 hour/week'
    }
  ]

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="h-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Insights Dashboard</h1>
          <p className="text-muted-foreground">Analytics and optimization suggestions for your schedule</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>AI Powered</span>
          </Badge>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Time Period:</span>
        <Button
          variant={selectedPeriod === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('week')}
        >
          This Week
        </Button>
        <Button
          variant={selectedPeriod === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('month')}
        >
          This Month
        </Button>
        <Button
          variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('quarter')}
        >
          This Quarter
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  {getTrendIcon(metric.trend)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
                  {metric.change && (
                    <p className={cn(
                      "text-xs",
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {metric.trend === 'up' ? '+' : ''}{metric.change}% from last period
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Meeting Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Meeting Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Team Meetings</span>
                    <span className="text-sm font-medium">12 (50%)</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">1:1 Meetings</span>
                    <span className="text-sm font-medium">6 (25%)</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Client Calls</span>
                    <span className="text-sm font-medium">4 (17%)</span>
                  </div>
                  <Progress value={17} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">2 (8%)</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Time Allocation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meetings</span>
                    <span className="text-sm font-medium">18.5h (37%)</span>
                  </div>
                  <Progress value={37} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Focus Time</span>
                    <span className="text-sm font-medium">12.5h (25%)</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Admin Tasks</span>
                    <span className="text-sm font-medium">8h (16%)</span>
                  </div>
                  <Progress value={16} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Break Time</span>
                    <span className="text-sm font-medium">11h (22%)</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimizations" className="space-y-6">
          {/* Optimization Suggestions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">Optimization Suggestions</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Category:</span>
                        <span className="font-medium">{suggestion.category}</span>
                      </div>
                      {suggestion.estimatedSavings && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Estimated Savings:</span>
                          <span className="font-medium text-green-600">{suggestion.estimatedSavings}</span>
                        </div>
                      )}
                      <Button className="w-full" size="sm">
                        {suggestion.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Trends and Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Productivity Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">87%</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Week</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">82%</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2 Weeks Ago</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">78%</span>
                      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Meeting Patterns</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Most Productive Day</span>
                    <span className="text-sm font-medium">Tuesday</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peak Meeting Time</span>
                    <span className="text-sm font-medium">2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Meeting Duration</span>
                    <span className="text-sm font-medium">45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Most Common Type</span>
                    <span className="text-sm font-medium">Team Standup</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
