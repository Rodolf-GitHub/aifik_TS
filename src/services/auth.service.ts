import axios from 'axios'
import type { AuthLogin, AuthResponse } from '@/types/auth.type'

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.103:8000'
const TOKEN_KEY = 'auth_token'

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
    return sessionStorage.getItem(TOKEN_KEY)
  }

  storeToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token)
  }

  removeToken(): void {
    sessionStorage.removeItem(TOKEN_KEY)
  }
}

export const authService = new AuthService()
