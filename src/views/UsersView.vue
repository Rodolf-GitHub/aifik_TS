<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { UserCreate, UserUpdate, AllUsersResponse } from '@/types/user.type'
import { Plus, Pencil, Trash2, Key } from 'lucide-vue-next'
import { userService } from '@/services/user.service'
import EditUserModal from '@/components/users/EditUserModal.vue'
import ChangePasswordModal from '@/components/users/ChangePasswordModal.vue'
import CreateUserModal from '@/components/users/CreateUserModal.vue'

// Estado local
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showPasswordModal = ref(false)
const selectedUserId = ref('')
const users = ref<AllUsersResponse[]>([])

const editUserData = ref<UserUpdate>({
  username: '',
  email: ''
})

// Cargar usuarios al montar el componente
onMounted(async () => {
  await loadUsers()
})

const loadUsers = async () => {
  try {
    users.value = await userService.getAllUsers()
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

// Métodos
const handleCreateUser = async (userData: UserCreate) => {
  try {
    await userService.createUser(userData)
    await loadUsers()
  } catch (error) {
    console.error('Error al crear usuario:', error)
  }
}

const handleEditUser = async (userData: UserUpdate) => {
  try {
    await userService.updateUser(selectedUserId.value, userData)
    await loadUsers()
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
  }
}

const handleChangePassword = async (passwordData: { old_password: string; new_password: string }) => {
  try {
    await userService.changePassword(selectedUserId.value, passwordData)
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
  }
}

const handleDeleteUser = async (id: string) => {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      await userService.deleteUser(id)
      await loadUsers()
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
    }
  }
}

const openEditModal = async (userId: string) => {
  try {
    const user = await userService.getUserById(userId)
    selectedUserId.value = userId
    editUserData.value = {
      username: user.username,
      email: user.email
    }
    showEditModal.value = true
  } catch (error) {
    console.error('Error al obtener usuario:', error)
  }
}

const openPasswordModal = (userId: string) => {
  selectedUserId.value = userId
  showPasswordModal.value = true
}
</script>

<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h1>
      <button
        @click="showCreateModal = true"
        class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Plus class="w-5 h-5" />
        Nuevo Usuario
      </button>
    </div>

    <!-- Tabla de usuarios -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'usuario_sin_rol'
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end gap-2">
                <button
                  @click="openEditModal(user.id)"
                  class="text-purple-600 hover:text-purple-900"
                  title="Editar usuario"
                >
                  <Pencil class="w-5 h-5" />
                </button>
                <button
                  @click="openPasswordModal(user.id)"
                  class="text-blue-600 hover:text-blue-900"
                  title="Cambiar contraseña"
                >
                  <Key class="w-5 h-5" />
                </button>
                <button
                  @click="handleDeleteUser(user.id)"
                  class="text-red-600 hover:text-red-900"
                  title="Eliminar usuario"
                >
                  <Trash2 class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modales -->
    <CreateUserModal
      v-if="showCreateModal"
      v-model:show="showCreateModal"
      @save="handleCreateUser"
    />

    <EditUserModal
      v-model:show="showEditModal"
      :user-data="editUserData"
      @save="handleEditUser"
    />

    <ChangePasswordModal
      v-model:show="showPasswordModal"
      @save="handleChangePassword"
    />
  </div>
</template>
