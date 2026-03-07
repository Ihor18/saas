<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

// Отримуємо store — тут зберігаються дані залогіненого юзера
const auth = useAuthStore()

// useRouter для програмного редиректу після логауту
const router = useRouter()

function logout() {
  // Очищаємо store (токен, юзера, ljlocalStorage)
  auth.logout()
  // Перекидаємо на логін
  router.push('/login')
}
</script>

<template>
  <div class="page">
    <div class="container-xl py-4">

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h2 mb-0">Dashboard</h1>
        <button class="btn btn-outline-danger" @click="logout">
          Вийти
        </button>
      </div>

      <!--
        auth.user?.name — optional chaining (?.)
        якщо user = null, не кидає помилку, просто повертає undefined
      -->
      <div class="alert alert-success">
        Привіт, <strong>{{ auth.user?.name }}</strong>! Ти успішно увійшов.
      </div>

    </div>
  </div>
</template>
