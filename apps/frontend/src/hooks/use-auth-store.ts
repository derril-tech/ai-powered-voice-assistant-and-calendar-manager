import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: null,
      
      login: (user, token) => {
        set({
          user,
          isAuthenticated: true,
          token,
          isLoading: false
        })
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          isLoading: false
        })
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading })
      },
      
      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        token: state.token 
      })
    }
  )
)
