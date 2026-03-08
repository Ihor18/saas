import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import {
  getUsers as apiGetUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from '@/api/users.js'

export const useUsersStore = defineStore('users', () => {

  const users = ref([])
  const loading = ref(false)
  const searchQuery = ref('')

  // watch на верхньому рівні store — ініціалізується один раз
  // слідкує за searchQuery і робить новий запит з debounce 300ms
  let timer = null
  watch(searchQuery, (newVal) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fetchUsers({ name: newVal })
    }, 300)
  })

  async function fetchUsers(params) {
    loading.value = true
    try {
      const { data } = await apiGetUsers(params)
      users.value = data
    } finally {
      loading.value = false
    }
  }

  async function createUser(payload) {
    const { data } = await apiCreateUser(payload)
    // додаємо локально — не робимо зайвий fetchUsers
    users.value.push(data)
  }

  async function updateUser(id, payload) {
    const { data } = await apiUpdateUser(id, payload)
    // знаходимо індекс і замінюємо об'єкт в масиві
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) users.value[index] = data
  }

  async function deleteUser(id) {
    await apiDeleteUser(id)
    // фільтруємо локально — не робимо зайвий fetchUsers
    users.value = users.value.filter(u => u.id !== id)
  }

  return { users, loading, searchQuery, fetchUsers, createUser, updateUser, deleteUser }
})
