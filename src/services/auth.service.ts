import axios from 'axios'
import type { AuthLogin, AuthResponse } from '@/types/auth.type'

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.103:8000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

class AuthService {
  async login(credentials: AuthLogin): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  }

  setAuthToken(token: string): void {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  removeAuthToken(): void {
    delete api.defaults.headers.common['Authorization']
  }

  getStoredToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  storeToken(token: string): void {
    localStorage.setItem('auth_token', token)
  }

  removeToken(): void {
    localStorage.removeItem('auth_token')
  }
}

export const authService = new AuthService()
