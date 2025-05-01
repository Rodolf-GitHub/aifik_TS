<script setup lang="ts">
import { ref } from 'vue'
import type { UserCreate } from '@/types/user.type'

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', userData: UserCreate): void
}>()

const userData = ref<UserCreate>({
  username: '',
  email: '',
  password: '',
  aaff_id: null
})

const closeModal = () => {
  emit('update:show', false)
  // Limpiar datos al cerrar
  userData.value = {
    username: '',
    email: '',
    password: '',
    aaff_id: null
  }
}

const handleSubmit = () => {
  emit('save', userData.value)
  closeModal()
}
</script>

<template>
  <div class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Crear Nuevo Usuario</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input
            v-model="userData.username"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="userData.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="userData.password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
