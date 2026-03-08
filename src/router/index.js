import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      // DashboardLayout — рамка з sidebar, живе тут один раз
      // meta: requiresAuth тут захищає ВСІХ children одразу —
      // не треба писати це в кожному дочірньому маршруті окремо
      path: '/',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',       // / -> редирект на /dashboard
          redirect: '/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/UsersView.vue'),
        },
        {
          path: 'deals',
          name: 'deals',
          component: () => import('@/views/DealsView.vue'),
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: () => import('@/views/TasksView.vue'),
        },
      ]
    }
  ]
})

// Navigation Guard — виконується ПЕРЕД кожним переходом
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }

  if (to.meta.requiresGuest && auth.isLoggedIn) {
    return '/dashboard'
  }
})

export default router
