<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UserUpdate } from '@/types/user.type'

const props = defineProps<{
  show: boolean
  userData: UserUpdate
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', userData: UserUpdate): void
}>()

const localUserData = ref<UserUpdate>({
  username: props.userData.username,
  email: props.userData.email
})

// Actualizar datos locales cuando cambian las props
watch(() => props.userData, (newData) => {
  localUserData.value = {
    username: newData.username,
    email: newData.email
  }
}, { deep: true })

const closeModal = () => {
  emit('update:show', false)
}

const handleSubmit = () => {
  emit('save', localUserData.value)
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Editar Usuario</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input
            v-model="localUserData.username"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="localUserData.email"
            type="email"
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
