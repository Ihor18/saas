import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  // createWebHistory — "красиві" URL без #: /login замість /#/login
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      name: 'login',
      // Lazy loading — компонент завантажується тільки коли юзер переходить на цю сторінку
      // Це прискорює початкове завантаження додатку
      component: () => import('@/views/LoginView.vue'),
      // meta — довільні дані маршруту, використовуємо в guard нижче
      meta: { requiresGuest: true } // тільки для незалогінених
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true } // тільки для залогінених
    },
    {
      // Якщо юзер відкриває / — перекидаємо на /dashboard
      path: '/',
      redirect: '/dashboard'
    }
  ]
})

// Navigation Guard — виконується ПЕРЕД кожним переходом між сторінками
// to — сторінка куди переходимо
// from — сторінка звідки переходимо (не використовуємо тут)
router.beforeEach((to) => {
  // Отримуємо store тут (не на верхньому рівні!), бо Pinia
  // має бути ініціалізована до виклику useAuthStore()
  const auth = useAuthStore()

  // Якщо сторінка вимагає авторизації і юзер НЕ залогінений
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login' // редирект на логін
  }

  // Якщо сторінка тільки для гостей (логін) і юзер вже залогінений
  if (to.meta.requiresGuest && auth.isLoggedIn) {
    return '/dashboard' // редирект на дашборд
  }

  // undefined або нічого — дозволяємо перехід
})

export default router
