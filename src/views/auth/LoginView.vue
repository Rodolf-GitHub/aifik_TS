<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Lock } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { version } from '../../../package.json'
import fondoLogin from '@/assets/images/fondo_login.jpg'
import logoAifink from '@/assets/images/aifink_logo_dark.jpg'
import type { AuthLogin, ApiError } from '@/types/auth.type'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const formData = ref<AuthLogin>({
  username_or_email: '',
  password: '',
})
const errorMessage = ref('')

const handleSubmit = async () => {
  if (loading.value) return

  errorMessage.value = ''
  loading.value = true

  try {
    await authStore.login(formData.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Error de login:', error)
    const apiError = error as ApiError
    if (apiError.response?.data?.detail) {
      errorMessage.value = apiError.response.data.detail
    } else {
      errorMessage.value = 'Error al iniciar sesión. Por favor, verifica tus credenciales.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="relative min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- Imagen de fondo -->
    <img
      :src="fondoLogin"
      class="fixed inset-0 w-full h-full object-cover object-center pointer-events-none"
      style="transform: translateZ(0); will-change: transform"
      alt="Fondo decorativo"
    />

    <!-- Versión del software -->
    <div class="absolute top-2 left-2 text-white/70 text-xs z-30">v{{ version }}</div>

    <!-- Contenedor del formulario -->
    <div
      class="max-w-md w-full space-y-8 bg-[#4C2882] p-8 rounded-2xl border border-white/10 relative z-20"
    >
      <!-- Logo y título -->
      <div class="flex flex-col items-center justify-center space-y-4">
        <img :src="logoAifink" alt="Aifink" class="h-16 w-auto" />
        <div class="text-white/60 text-sm font-light">Simplifica tu gestión, crece sin límites</div>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- Campo de usuario -->
          <div class="relative">
            <input
              v-model="formData.username_or_email"
              type="text"
              required
              class="block w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c15e9] focus:border-transparent placeholder-white/50 text-white"
              placeholder="Email o nombre de usuario"
              :disabled="loading"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Mail class="h-5 w-5 text-white/50" />
            </div>
          </div>

          <!-- Campo de contraseña -->
          <div class="relative">
            <input
              v-model="formData.password"
              type="password"
              required
              minlength="6"
              class="block w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c15e9] focus:border-transparent placeholder-white/50 text-white"
              placeholder="Contraseña"
              :disabled="loading"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Lock class="h-5 w-5 text-white/50" />
            </div>
          </div>
        </div>

        <!-- Mensaje de error -->
        <div
          v-if="errorMessage"
          class="bg-red-100/10 border-l-4 border-red-500 text-red-100 p-4 rounded"
          role="alert"
        >
          <p>{{ errorMessage }}</p>
        </div>

        <!-- Botón de submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-[#8c15e9] hover:bg-[#7512c4] text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8c15e9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Iniciando sesión...
          </span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style>
/* Este selector aplica estilos cuando el navegador autocompleta un input */
input:-webkit-autofill,
/* Este cuando pasas el mouse por encima del input autocompletado */
input:-webkit-autofill:hover,
/* Este cuando el input autocompletado tiene el foco */
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #4c2882 inset;
  box-shadow: 0 0 0px 1000px #4c2882 inset;
  transition: background-color 5000s ease-in-out 0s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Estilos específicos cuando el input autocompletado tiene el foco */
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #4c2882 inset;
  box-shadow:
    0 0 0px 1000px #4c2882 inset,
    0 0 0 2px #8c15e9;
  border-color: transparent;
}

/* Optimización de imagen */
img {
  image-rendering: optimizeQuality;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
}

/* Mejorar suavizado en Chrome */
@media (-webkit-min-device-pixel-ratio: 2) {
  img {
    image-rendering: high-quality;
  }
}
</style>
