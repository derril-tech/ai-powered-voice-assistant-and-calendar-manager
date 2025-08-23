import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VoiceCommand } from '@/types'

interface VoiceStore {
  commands: VoiceCommand[]
  addCommand: (command: VoiceCommand) => void
  updateCommand: (id: string, updates: Partial<VoiceCommand>) => void
  deleteCommand: (id: string) => void
  clearCommands: () => void
  getCommandsByDate: (date: Date) => VoiceCommand[]
  getCommandsByIntent: (intentType: string) => VoiceCommand[]
}

export const useVoiceStore = create<VoiceStore>()(
  persist(
    (set, get) => ({
      commands: [],
      
      addCommand: (command) => {
        set((state) => ({
          commands: [command, ...state.commands]
        }))
      },
      
      updateCommand: (id, updates) => {
        set((state) => ({
          commands: state.commands.map((cmd) =>
            cmd.id === id ? { ...cmd, ...updates } : cmd
          )
        }))
      },
      
      deleteCommand: (id) => {
        set((state) => ({
          commands: state.commands.filter((cmd) => cmd.id !== id)
        }))
      },
      
      clearCommands: () => {
        set({ commands: [] })
      },
      
      getCommandsByDate: (date) => {
        const { commands } = get()
        return commands.filter((cmd) => {
          const cmdDate = new Date(cmd.createdAt)
          return cmdDate.toDateString() === date.toDateString()
        })
      },
      
      getCommandsByIntent: (intentType) => {
        const { commands } = get()
        return commands.filter((cmd) => cmd.intent.type === intentType)
      }
    }),
    {
      name: 'voice-commands-storage',
      partialize: (state) => ({ commands: state.commands })
    }
  )
)
