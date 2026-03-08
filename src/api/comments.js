import { api } from './index'

// params — фільтрація, наприклад: getComments({ dealId: 1 })
export const getComments = (params) => api.get('/comments', { params })
export const createComment = (data) => api.post('/comments', data)
export const deleteComment = (id) => api.delete(`/comments/${id}`)
