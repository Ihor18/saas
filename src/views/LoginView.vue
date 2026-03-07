<script setup>
// ref — для реактивних змінних (input поля, стани завантаження)
import { ref } from 'vue'

// useRouter — програмна навігація (router.push('/dashboard'))
import { useRouter } from 'vue-router'

// Наш auth store де зберігається токен і юзер
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

// Реактивні змінні для полів форми
// Кожна зміна в <input v-model="email"> автоматично оновлює email.value
const email = ref('')
const password = ref('')

// Стан завантаження — показуємо спінер на кнопці поки йде запит
const loading = ref(false)

// Текст помилки — показуємо якщо логін провалився
const error = ref('')

async function handleLogin() {
  // Скидаємо попередню помилку
  error.value = ''
  loading.value = true

  try {
    // Викликаємо action з нашого store
    // auth.login може кинути Error якщо дані невалідні
    await auth.login(email.value, password.value)

    // Якщо все ОК — переходимо на дашборд
    router.push('/dashboard')
  } catch (e) {
    // Якщо помилка — показуємо повідомлення юзеру
    error.value = 'Невірний email або пароль'
  } finally {
    // finally виконується ЗАВЖДИ (і при успіху, і при помилці)
    loading.value = false
  }
}
</script>

<template>
  <!--
    page page-center — Tabler класи, центрують контент на весь екран
  -->
  <div class="page page-center">
    <div class="container container-tight py-4">

      <!-- Логотип / назва проєкту -->
      <div class="text-center mb-4">
        <span class="fw-bold fs-2 text-primary">SaaS CRM</span>
      </div>

      <!-- Картка з формою -->
      <div class="card card-md">
        <div class="card-body">
          <h2 class="h2 text-center mb-4">Вхід в систему</h2>

          <!--
            v-if — показуємо блок помилки тільки коли є текст помилки
            alert-danger — червоний блок з Tabler/Bootstrap
          -->
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>

          <!--
            @submit.prevent — слухаємо подію submit форми
            .prevent — це модифікатор, він викликає event.preventDefault()
            щоб сторінка не перезавантажувалась при сабміті
          -->
          <form @submit.prevent="handleLogin">

            <!-- Поле Email -->
            <div class="mb-3">
              <label class="form-label">Email</label>
              <!--
                v-model — двостороннє прив'язування:
                email.value -> відображається в полі
                введення в поле -> оновлює email.value
              -->
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="your@email.com"
                required
                autofocus
              />
            </div>

            <!-- Поле Пароль -->
            <div class="mb-2">
              <label class="form-label">Пароль</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Введіть пароль"
                required
              />
            </div>

            <div class="form-footer">
              <!--
                :class — динамічне додавання класу
                { 'btn-loading': loading } — додає клас btn-loading коли loading = true
                Tabler автоматично показує спінер на кнопці при btn-loading

                :disabled — блокуємо кнопку поки йде запит
                щоб юзер не міг клікнути кілька разів
              -->
              <button
                type="submit"
                class="btn btn-primary w-100"
                :class="{ 'btn-loading': loading }"
                :disabled="loading"
              >
                Увійти
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- Підказка для розробки -->
      <div class="text-center mt-3 text-muted small">
        Будь-який email + пароль від 3 символів
      </div>

    </div>
  </div>
</template>
