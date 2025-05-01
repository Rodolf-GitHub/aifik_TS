<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import SideBar from '@/components/common/navigation/SideBar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Botón de menú móvil -->
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-[100] w-12 h-12 bg-purple-600 text-white rounded-r-xl shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
    >
      <ChevronRight class="w-6 h-6" />
    </button>

    <!-- Sidebar responsive -->
    <SideBar v-model="isSidebarOpen" />

    <!-- Contenido principal -->
    <div class="lg:pl-64 transition-[padding] duration-300">
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
