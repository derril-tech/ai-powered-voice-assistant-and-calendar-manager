'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { AuthProvider } from './auth-provider'
import { VoiceProvider } from './voice-provider'
import { applyTheme } from '@/lib/utils'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Apply initial theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system'
    applyTheme(savedTheme)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <VoiceProvider>
            {children}
          </VoiceProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
