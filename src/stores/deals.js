import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import {
  getDeals as apiGetDeals,
  createDeal as apiCreateDeal,
  updateDeal as apiUpdateDeal,
  deleteDeal as apiDeleteDeal,
} from '@/api/deals.js'
import { useAuthStore } from '@/stores/auth.js'
import {
  getComments as apiGetComments,
  createComment as apiCreateComment,
  deleteComment as apiDeleteComment,
} from '@/api/comments.js'

export const useDealsStore = defineStore('deals', () => {

  const deals = ref([])
  const loading = ref(false)

  // фільтр по статусу — '' означає "всі статуси"
  const filterByStatus = ref('')

  // при зміні фільтру — робимо новий запит
  watch(filterByStatus, (newVal) => {
    fetchDeals(newVal ? { status: newVal } : {})
  })

  async function fetchDeals(params) {
    const auth = useAuthStore()

    // адмін бачить всі угоди, менеджер — тільки свої
    const roleFilter = auth.user?.role === 'admin'
      ? {}
      : { userId: auth.user?.id }

    loading.value = true
    try {
      const { data } = await apiGetDeals({ ...roleFilter, ...params })
      deals.value = data
    } finally {
      loading.value = false
    }
  }

  async function createDeal(payload) {
    const { data } = await apiCreateDeal(payload)
    deals.value.push(data)
  }

  async function updateDeal(id, payload) {
    const { data } = await apiUpdateDeal(id, payload)
    const index = deals.value.findIndex(d => d.id === id)
    if (index !== -1) deals.value[index] = data
  }

  async function deleteDeal(id) {
    await apiDeleteDeal(id)
    deals.value = deals.value.filter(d => d.id !== id)
  }

  // --- Comments ---
  const comments = ref([])

  async function fetchComments(dealId) {
    const { data } = await apiGetComments({ dealId })
    comments.value = data
  }

  async function addComment(payload) {
    const { data } = await apiCreateComment(payload)
    comments.value.push(data)
  }

  async function removeComment(id) {
    await apiDeleteComment(id)
    comments.value = comments.value.filter(c => c.id !== id)
  }

  return {
    deals, loading, filterByStatus, fetchDeals, createDeal, updateDeal, deleteDeal,
    comments, fetchComments, addComment, removeComment,
  }
})
