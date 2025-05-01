import { defineStore } from 'pinia'
import type { AuthResponse, AuthLogin, AuthState } from '@/types/auth.type'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials: AuthLogin) {
      try {
        const userData = await authService.login(credentials)
        this.user = userData
        this.isAuthenticated = true

        // Almacenar token y configurar headers
        authService.storeToken(userData.access_token)
        authService.setAuthToken(userData.access_token)

        return userData
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        throw error
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      authService.removeToken()
      authService.removeAuthToken()
    },

    initializeAuth() {
      const token = authService.getStoredToken()
      if (token) {
        authService.setAuthToken(token)
        this.isAuthenticated = true
        // Aquí podrías hacer una petición para obtener los datos del usuario si es necesario
      }
    },
  },

  getters: {
    getUserData: (state): AuthResponse | null => state.user,
    isUserAuthenticated: (state): boolean => state.isAuthenticated,
  },
})
