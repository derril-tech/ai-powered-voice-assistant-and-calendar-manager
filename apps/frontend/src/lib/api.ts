import { API_CONFIG, ERROR_MESSAGES } from './constants'
import { ApiResponse, PaginatedResponse } from '@/types'

// API Client Configuration
class ApiClient {
  private baseUrl: string
  private timeout: number
  private retryAttempts: number

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
    this.timeout = API_CONFIG.timeout
    this.retryAttempts = API_CONFIG.retryAttempts
  }

  // Get authentication headers
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth-token')
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  // Create request with timeout
  private async createRequest(
    url: string,
    options: RequestInit,
    timeout: number = this.timeout
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  // Handle response and errors
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      switch (response.status) {
        case 401:
          // Handle unauthorized - redirect to login
          localStorage.removeItem('auth-token')
          window.location.href = '/auth/login'
          throw new Error(ERROR_MESSAGES.network.unauthorized)
        case 403:
          throw new Error(ERROR_MESSAGES.network.forbidden)
        case 404:
          throw new Error(ERROR_MESSAGES.network.notFound)
        case 500:
          throw new Error(ERROR_MESSAGES.network.server)
        default:
          throw new Error(errorData.message || `HTTP ${response.status}`)
      }
    }

    return response.json()
  }

  // Retry mechanism
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempts: number = this.retryAttempts
  ): Promise<T> {
    try {
      return await requestFn()
    } catch (error) {
      if (attempts > 1 && this.isRetryableError(error)) {
        await this.delay(1000 * (this.retryAttempts - attempts + 1))
        return this.retryRequest(requestFn, attempts - 1)
      }
      throw error
    }
  }

  private isRetryableError(error: any): boolean {
    return (
      error.name === 'AbortError' ||
      error.message.includes('timeout') ||
      error.message.includes('network')
    )
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Generic HTTP methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return this.retryRequest(async () => {
      const response = await this.createRequest(url.toString(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })
      return this.handleResponse<T>(response)
    })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.createRequest(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      })
      return this.handleResponse<T>(response)
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.createRequest(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      })
      return this.handleResponse<T>(response)
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.createRequest(`${this.baseUrl}${endpoint}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      })
      return this.handleResponse<T>(response)
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.retryRequest(async () => {
      const response = await this.createRequest(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      })
      return this.handleResponse<T>(response)
    })
  }

  // File upload
  async upload<T>(endpoint: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    return this.retryRequest(async () => {
      const xhr = new XMLHttpRequest()
      
      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = (event.loaded / event.total) * 100
            onProgress(progress)
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText)
              resolve(response)
            } catch (error) {
              reject(new Error('Invalid JSON response'))
            }
          } else {
            reject(new Error(`HTTP ${xhr.status}`))
          }
        })

        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'))
        })

        xhr.open('POST', `${this.baseUrl}${endpoint}`)
        const token = localStorage.getItem('auth-token')
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        }
        xhr.send(formData)
      })
    })
  }
}

// Create API client instance
const apiClient = new ApiClient()

// Authentication API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiClient.post<ApiResponse<{ user: any; token: string }>>(
      API_CONFIG.endpoints.auth.login,
      { email, password }
    )
  },

  register: async (userData: { name: string; email: string; password: string }) => {
    return apiClient.post<ApiResponse<{ user: any; token: string }>>(
      API_CONFIG.endpoints.auth.register,
      userData
    )
  },

  logout: async () => {
    return apiClient.post<ApiResponse<void>>(API_CONFIG.endpoints.auth.logout)
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('auth-refresh-token')
    return apiClient.post<ApiResponse<{ token: string }>>(
      API_CONFIG.endpoints.auth.refresh,
      { refresh_token: refreshToken }
    )
  },

  getProfile: async () => {
    return apiClient.get<ApiResponse<any>>(API_CONFIG.endpoints.auth.profile)
  },
}

// Calendar API
export const calendarApi = {
  getEvents: async (params?: {
    start_date?: string
    end_date?: string
    view?: string
    page?: number
    limit?: number
  }) => {
    return apiClient.get<PaginatedResponse<any>>(API_CONFIG.endpoints.calendar.events, params)
  },

  getEvent: async (id: string) => {
    return apiClient.get<ApiResponse<any>>(API_CONFIG.endpoints.calendar.event(id))
  },

  createEvent: async (eventData: any) => {
    return apiClient.post<ApiResponse<any>>(API_CONFIG.endpoints.calendar.create, eventData)
  },

  updateEvent: async (id: string, eventData: any) => {
    return apiClient.put<ApiResponse<any>>(API_CONFIG.endpoints.calendar.update(id), eventData)
  },

  deleteEvent: async (id: string) => {
    return apiClient.delete<ApiResponse<void>>(API_CONFIG.endpoints.calendar.delete(id))
  },

  syncCalendar: async (provider: string) => {
    return apiClient.post<ApiResponse<void>>(API_CONFIG.endpoints.calendar.sync, { provider })
  },
}

// Voice API
export const voiceApi = {
  processCommand: async (command: string, audioBlob?: Blob) => {
    const formData = new FormData()
    formData.append('command', command)
    if (audioBlob) {
      formData.append('audio', audioBlob)
    }

    return apiClient.post<ApiResponse<any>>(API_CONFIG.endpoints.voice.process, formData)
  },

  getHistory: async (params?: { page?: number; limit?: number }) => {
    return apiClient.get<PaginatedResponse<any>>(API_CONFIG.endpoints.voice.history, params)
  },

  getSettings: async () => {
    return apiClient.get<ApiResponse<any>>(API_CONFIG.endpoints.voice.settings)
  },

  updateSettings: async (settings: any) => {
    return apiClient.put<ApiResponse<any>>(API_CONFIG.endpoints.voice.settings, settings)
  },
}

// User API
export const userApi = {
  getProfile: async () => {
    return apiClient.get<ApiResponse<any>>(API_CONFIG.endpoints.user.profile)
  },

  updateProfile: async (profileData: any) => {
    return apiClient.put<ApiResponse<any>>(API_CONFIG.endpoints.user.profile, profileData)
  },

  getPreferences: async () => {
    return apiClient.get<ApiResponse<any>>(API_CONFIG.endpoints.user.preferences)
  },

  updatePreferences: async (preferences: any) => {
    return apiClient.put<ApiResponse<any>>(API_CONFIG.endpoints.user.preferences, preferences)
  },

  getSettings: async () => {
    return apiClient.get<ApiResponse<any>>(API_CONFIG.endpoints.user.settings)
  },

  updateSettings: async (settings: any) => {
    return apiClient.put<ApiResponse<any>>(API_CONFIG.endpoints.user.settings, settings)
  },
}

// WebSocket connection for real-time updates
export class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private listeners: Map<string, Function[]> = new Map()

  connect() {
    const token = localStorage.getItem('auth-token')
    if (!token) return

    this.ws = new WebSocket(`${API_CONFIG.wsUrl}?token=${token}`)

    this.ws.onopen = () => {
      console.log('WebSocket connected')
      this.reconnectAttempts = 0
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.emit(data.type, data.payload)
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    this.ws.onclose = () => {
      console.log('WebSocket disconnected')
      this.attemptReconnect()
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect()
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

// Create WebSocket instance
export const wsClient = new WebSocketClient()

// Export the main API client for custom requests
export { apiClient }
export default apiClient
