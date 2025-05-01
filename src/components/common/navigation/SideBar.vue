<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import {
  LogOut,
  Users,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import logoIcon from '@/assets/images/logo-icon.svg'
import logoBlanco from '@/assets/images/Logo-blanco.svg'
import sidebarBg from '@/assets/images/sidebar.jpg'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isCollapsed = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const authStore = useAuthStore()
const router = useRouter()

// Frases para el slider
const phrases = ref(['Simplifica tu gestión', 'Crece sin límites'])
const currentPhraseIndex = ref(0)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// Cambiar frase cada 4 segundos
setInterval(() => {
  currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.value.length
}, 4000)

// Inicializar store al montar el componente
onMounted(() => {
  authStore.initializeAuth()
})

const userName = computed(() => authStore.user?.username || '')
const userEmail = computed(() => authStore.user?.email || '')
const userId = computed(() => authStore.user?.id || '')

// Obtener iniciales del usuario
const getUserInitials = computed(() => {
  const username = authStore.user?.username || ''
  return username
    .split('@')[0]
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const navigationSections = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    route: '/dashboard'
  },
  {
    name: 'Usuarios',
    icon: Users,
    route: '/usuarios'
  }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const menuItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0.5rem 0',
} as const
</script>

<template>
  <aside
    class="fixed left-0 top-0 h-screen overflow-hidden transition-all duration-300 ease-in-out w-64 z-[100]"
    :class="[
      isCollapsed ? '-translate-x-full' : 'translate-x-0',
      'lg:translate-x-0'
    ]"
  >
    <!-- Imagen de fondo optimizada -->
    <img
      :src="sidebarBg"
      class="absolute inset-0 w-full h-full object-[left_center] pointer-events-none transition-all duration-300"
      :style="{
        'transform-origin': 'left center',
        'image-rendering': 'crisp-edges',
      }"
      alt="Fondo del sidebar"
    />

    <!-- Botón de toggle (solo visible en móvil) -->
    <div
      @click="toggleSidebar"
      class="lg:hidden absolute -right-12 top-4 w-12 h-12 bg-purple-600 text-white rounded-r-xl flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors shadow-lg z-[100]"
    >
      <component
        :is="isCollapsed ? ChevronRight : ChevronLeft"
        class="w-6 h-6"
      />
    </div>

    <!-- Contenido del sidebar -->
    <div class="relative z-10 p-3 h-full flex flex-col text-white">
      <!-- Logo con animación -->
      <div
        @click="router.push('/dashboard')"
        class="block mb-4 cursor-pointer"
      >
        <div class="flex items-center gap-3 px-4 py-4 bg-white/10 backdrop-blur-lg rounded-xl">
          <div class="relative">
            <div class="p-2 bg-purple-100 rounded-xl">
              <img
                :src="logoIcon"
                alt="Logo"
                class="w-8 h-8 object-contain"
              />
              <div
                class="absolute -top-1 -right-1 w-2 h-2 bg-cyan-300 rounded-full animate-ping-slow opacity-75"
              ></div>
              <div
                class="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-300 rounded-full animate-ping-slower opacity-75"
              ></div>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="h-7">
              <img
                :src="logoBlanco"
                alt="Logo texto"
                class="h-full w-auto object-contain brightness-200 filter"
              />
            </div>
            <!-- Slider de frases -->
            <div class="relative h-5 overflow-hidden">
              <transition name="slide-phrases">
                <p :key="currentPhraseIndex" class="absolute w-full text-xs text-white/60 truncate">
                  {{ phrases[currentPhraseIndex] }}
                </p>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Menú principal -->
      <nav class="flex-1 mt-6 overflow-y-auto scrollbar-hide">
        <ul class="w-full" :style="menuItemStyle">
          <li v-for="item in navigationSections" :key="item.route">
            <router-link
              :to="item.route"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              active-class="bg-white/20"
              @click="isCollapsed = true"
            >
              <component :is="item.icon" class="w-5 h-5 text-white" />
              <span class="text-sm font-medium text-white">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Perfil de usuario -->
      <div class="mt-2">
        <div class="px-3 py-3 bg-white/10 backdrop-blur-sm rounded-lg">
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-sm font-medium text-white">
                {{ getUserInitials }}
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-white truncate">
                {{ userName }}
              </div>
              <div class="text-xs text-white/60 truncate">
                {{ userEmail }}
              </div>
              <div class="text-[10px] text-white/40 truncate mt-0.5">
                ID: {{ userId }}
              </div>
            </div>
            <button
              @click="handleLogout"
              class="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              title="Cerrar sesión"
            >
              <LogOut class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Overlay para cerrar el sidebar en móvil -->
  <div
    v-if="!isCollapsed"
    class="lg:hidden fixed inset-0 bg-black/50 z-[90]"
    @click="isCollapsed = true"
  ></div>
</template>

<style scoped>
/* Optimización de imagen */
img {
  transform: scale(1.05) translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

@media (min-width: 640px) {
  img {
    object-position: 25% center;
  }
}

/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Animaciones */
@keyframes ping-slow {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes ping-slower {
  75%, 100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-ping-slower {
  animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Transiciones */
.slide-phrases-enter-active,
.slide-phrases-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-phrases-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-phrases-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Asegurar que el sidebar mantenga sus dimensiones en desktop */
@media (min-width: 1024px) {
  aside {
    transform: none !important;
  }
}
</style>
