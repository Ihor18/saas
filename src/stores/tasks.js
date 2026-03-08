import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import {
  getTasks as apiGetTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from '@/api/tasks.js'
import { useAuthStore } from '@/stores/auth.js'

export const useTasksStore = defineStore('tasks', () => {

  const tasks = ref([])
  const loading = ref(false)

  // фільтр по юзеру — null означає "всі задачі"
  const filterByUserId = ref(null)

  // при зміні фільтру — робимо новий запит
  watch(filterByUserId, (newVal) => {
    fetchTasks(newVal ? { userId: newVal } : {})
  })

  async function fetchTasks(params) {
    const auth = useAuthStore()

    // адмін бачить всі задачі, менеджер — тільки свої
    const roleFilter = auth.user?.role === 'admin'
      ? {}
      : { userId: auth.user?.id }

    loading.value = true
    try {
      const { data } = await apiGetTasks({ ...roleFilter, ...params })
      tasks.value = data
    } finally {
      loading.value = false
    }
  }

  async function createTask(payload) {
    const { data } = await apiCreateTask(payload)
    tasks.value.push(data)
  }

  async function updateTask(id, payload) {
    const { data } = await apiUpdateTask(id, payload)
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) tasks.value[index] = data
  }

  async function deleteTask(id) {
    await apiDeleteTask(id)
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return { tasks, loading, filterByUserId, fetchTasks, createTask, updateTask, deleteTask }
})
