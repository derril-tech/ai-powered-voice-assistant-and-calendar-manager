'use client'

import { createContext, useContext, useEffect } from 'react'
import { useAuthStore } from '@/hooks/use-auth-store'

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: any, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore()

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth-token')
    if (token) {
      // Validate token with backend
      // For now, we'll simulate a user
      const mockUser = {
        id: 'user-1',
        email: 'user@example.com',
        name: 'John Doe',
        preferences: {
          theme: 'system',
          timezone: 'UTC',
          language: 'en',
          voiceSettings: {
            voiceId: 'en-US-1',
            speed: 1,
            pitch: 1,
            volume: 1
          },
          notificationSettings: {
            email: true,
            push: true,
            sms: false,
            reminderTime: 15
          }
        }
      }
      login(mockUser, token)
    } else {
      setLoading(false)
    }
  }, [login, setLoading])

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
