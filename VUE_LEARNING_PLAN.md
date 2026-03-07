# Vue 3 — Навчальний план + Технічне завдання SaaS CRM

## Зміст
1. [Технічне завдання](#технічне-завдання)
2. [Швидкий старт з Vue 3](#швидкий-старт-з-vue-3)
3. [Покрокова дорожня карта](#покрокова-дорожня-карта)
4. [Практичні поради](#практичні-поради)
5. [Корисні ресурси](#корисні-ресурси)

---

## Технічне завдання

> **Навчальний проєкт: SaaS CRM на Vue 3**

### Мета проєкту

Створити фронтенд SaaS CRM системи для швидкого вивчення Vue 3, Composition API, Pinia, та сучасної архітектури фронтенд-додатків. Основний фокус — реальна структура комерційного проєкту без складної верстки.

---

### Основний стек технологій

| Технологія | Призначення |
|---|---|
| **Vue 3** (Composition API) | Основний фреймворк |
| **Vite** | Збірка та dev-сервер |
| **Pinia** | State management |
| **Vue Router** | Маршрутизація |
| **Axios** | HTTP клієнт / API layer |
| **Bootstrap** або Admin шаблон | UI компоненти |
| **json-server** або mock | Локальний mock API |

---

### Архітектура проєкту

```
src/
├── api/          — робота з API (Axios інстанси, endpoints)
├── components/   — перевикористовувані компоненти
├── modules/      — модулі CRM (users, deals, tasks)
├── composables/  — бізнес-логіка (useUsers, useDeals...)
├── stores/       — Pinia store
├── router/       — маршрути + guards
└── layouts/      — layout сторінок (AuthLayout, DashboardLayout)
```

---

### Функціональні модулі CRM

#### 1. Авторизація
- [ ] Login сторінка
- [ ] JWT або mock token
- [ ] Navigation Guard для router
- [ ] Logout

#### 2. Dashboard
- [ ] Статистика (кількість користувачів, угод)
- [ ] Останні активності

#### 3. Користувачі (Users)
- [ ] Таблиця користувачів
- [ ] Пошук
- [ ] Фільтри
- [ ] Пагінація
- [ ] Створення / Редагування користувача (CRUD)

#### 4. Deals / Leads
- [ ] CRM таблиця угод
- [ ] Статуси угод
- [ ] Фільтрація
- [ ] Зміна статусу

#### 5. Tasks
- [ ] Створення задач
- [ ] Прив'язка до користувача
- [ ] Статуси задач
- [ ] Deadline

---

### Vue функціонал, який необхідно використати

- `ref` / `reactive`
- `computed`
- `watch` / `watchEffect`
- Composition API (`setup()` або `<script setup>`)
- Pinia store
- Router guards (`beforeEach`, `meta.requiresAuth`)
- Reusable components
- Composables

---

### Очікуваний результат

Після завершення проєкту розробник повинен впевнено працювати з Vue 3, розуміти архітектуру SPA, будувати CRUD інтерфейси та писати фронтенд близький до комерційного рівня.

---

## Швидкий старт з Vue 3

> Якщо ти знаєш JavaScript та базово знайомий з будь-яким фреймворком — Vue 3 можна освоїти за 2–3 тижні активної практики.

### Що треба знати ДО Vue

Перед початком переконайся, що розумієш:
- ES6+: `const/let`, стрілочні функції, деструктуризація, spread/rest
- Проміси та `async/await`
- Робота з DOM (хоча б базово)
- HTTP запити (fetch / Axios)

---

## Покрокова дорожня карта

### Тиждень 1 — Основи Vue 3

**День 1–2: Синтаксис шаблонів**
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
  <p>Doubled: {{ doubled }}</p>
</template>
```

Що вивчити:
- `{{ }}` — інтерполяція
- `v-if` / `v-else` — умовний рендеринг
- `v-for` — рендеринг списків (завжди з `:key`!)
- `v-bind` (`:`) — прив'язка атрибутів
- `v-on` (`@`) — обробники подій
- `v-model` — двостороннє прив'язування

**День 3–4: Composition API**
```vue
<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// ref — для примітивів
const name = ref('')

// reactive — для об'єктів
const user = reactive({ id: null, email: '' })

// watch — слідкувати за змінами
watch(name, (newVal) => {
  console.log('Name changed:', newVal)
})

// Lifecycle hooks
onMounted(() => {
  // Виконується після монтування компонента
})
</script>
```

**День 5–7: Компоненти**
```vue
<!-- ParentComponent.vue -->
<script setup>
import ChildCard from './ChildCard.vue'
const handleEvent = (data) => console.log(data)
</script>

<template>
  <ChildCard
    :title="'Hello'"
    @custom-event="handleEvent"
  />
</template>

<!-- ChildCard.vue -->
<script setup>
const props = defineProps({ title: String })
const emit = defineEmits(['custom-event'])
</script>

<template>
  <div @click="emit('custom-event', 'payload')">{{ props.title }}</div>
</template>
```

Що вивчити:
- `defineProps` / `defineEmits`
- Слоти (`<slot>`)
- `provide` / `inject`

---

### Тиждень 2 — Екосистема

**День 8–9: Vue Router**
```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

// Navigation Guard
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }
})

export default router
```

**День 10–11: Pinia**
```js
// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)

  const isLoggedIn = computed(() => !!token.value)

  function login(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
  }

  return { token, isLoggedIn, login, logout }
})
```

**День 12–14: Composables (найважливіший патерн!)**
```js
// composables/useUsers.js
import { ref } from 'vue'
import { api } from '@/api'

export function useUsers() {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchUsers(params = {}) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/users', { params })
      users.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { users, loading, error, fetchUsers }
}
```

Composable — це просто функція, яка повертає реактивний стан. Виноси туди всю бізнес-логіку з компонентів.

---

### Тиждень 3 — Проєкт SaaS CRM

На третьому тижні одразу будуєш проєкт за ТЗ вище. Порядок роботи:

1. **Scaffold проєкту**
   ```bash
   npm create vue@latest saas-crm
   cd saas-crm && npm install
   npm install pinia vue-router axios
   ```

2. **Налаштуй Mock API**
   ```bash
   npm install -D json-server
   ```
   Створи `db.json` з тестовими даними для users, deals, tasks.

3. **Будуй модулі послідовно:**
   - Auth (Login + Guard) → Dashboard → Users CRUD → Deals → Tasks

---

## Практичні поради

### Головні помилки новачків

| Помилка | Правильно |
|---|---|
| Забувають `.value` у ref | `count.value++`, не `count++` |
| Мутують props напряму | Emit подію або використовуй store |
| Логіка прямо в шаблоні | Виноси в `computed` або composable |
| Один величезний компонент | Розбивай на маленькі компоненти |
| `v-for` без `:key` | Завжди `v-for="item in list" :key="item.id"` |

### Корисні патерни

**Axios інстанс з interceptors:**
```js
// api/index.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore().logout()
    }
    return Promise.reject(error)
  }
)
```

**Generic CRUD composable:**
```js
// composables/useCrud.js
import { ref } from 'vue'
import { api } from '@/api'

export function useCrud(endpoint) {
  const items = ref([])
  const loading = ref(false)

  const fetch = async (params) => {
    loading.value = true
    const { data } = await api.get(endpoint, { params }).finally(() => loading.value = false)
    items.value = data
  }

  const create = async (payload) => {
    const { data } = await api.post(endpoint, payload)
    items.value.push(data)
  }

  const update = async (id, payload) => {
    const { data } = await api.put(`${endpoint}/${id}`, payload)
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) items.value[idx] = data
  }

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`)
    items.value = items.value.filter(i => i.id !== id)
  }

  return { items, loading, fetch, create, update, remove }
}
```

---

## Корисні ресурси

### Документація
- [vuejs.org](https://vuejs.org) — офіційна документація (дуже хороша, читай її!)
- [pinia.vuejs.org](https://pinia.vuejs.org) — Pinia docs
- [router.vuejs.org](https://router.vuejs.org) — Vue Router docs

### Практика
- Будуй проєкт з цього ТЗ — це найефективніший спосіб
- Копіюй патерни з офіційних прикладів, а потім розбирай як вони працюють
- Дивись на помилки у Vue DevTools (розширення для браузера)

### Ключові теми для поглибленого вивчення
- [ ] `defineAsyncComponent` — lazy loading компонентів
- [ ] `Teleport` — рендеринг поза деревом DOM
- [ ] `Transition` / `TransitionGroup` — анімації
- [ ] `useTemplateRef` — нові шаблонні refs
- [ ] SSR з Nuxt 3 (наступний крок після Vue 3)

---

> **Головний принцип:** Не читай — роби. Кожну концепцію одразу закріплюй практикою в коді проєкту.