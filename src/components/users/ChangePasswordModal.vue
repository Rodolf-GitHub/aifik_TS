<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', passwordData: { old_password: string; new_password: string }): void
}>()

const passwordData = ref({
  old_password: '',
  new_password: ''
})

const closeModal = () => {
  emit('update:show', false)
  // Limpiar datos al cerrar
  passwordData.value = {
    old_password: '',
    new_password: ''
  }
}

const handleSubmit = () => {
  emit('save', passwordData.value)
  closeModal()
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña Actual</label>
          <input
            v-model="passwordData.old_password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
          <input
            v-model="passwordData.new_password"
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
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
