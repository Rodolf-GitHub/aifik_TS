<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title as string || 'Vista')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Encabezado de la vista -->
    <header class="bg-white shadow">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-semibold text-gray-800">{{ title }}</h1>
      </div>
    </header>

    <!-- Contenido de la vista -->
    <main class="p-6">
      <div class="bg-white rounded-lg shadow">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
