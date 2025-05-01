<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-purple-700">404</h1>
      <h2 class="text-2xl font-semibold mt-4 mb-8">Página no encontrada</h2>
      <p class="text-gray-600 mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div class="space-x-4">
        <button
          @click="goBack"
          class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Volver atrás
        </button>
        <router-link
          to="/"
          class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors inline-block"
        >
          Ir al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>