<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="wrapper">

    <!-- SIDEBAR -->
    <aside class="navbar navbar-vertical navbar-expand-lg">
      <div class="container-fluid">

        <!-- Назва проєкту -->
        <a class="navbar-brand" href="#">SaaS CRM</a>

        <!-- Навігаційні посилання -->
        <!-- RouterLink — це як <a>, але без перезавантаження сторінки -->
        <!-- active-class — додає клас коли це посилання відповідає поточному URL -->
        <ul class="navbar-nav pt-lg-3">
          <li class="nav-item">
            <RouterLink to="/dashboard" class="nav-link" active-class="active">
              Dashboard
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/users" class="nav-link" active-class="active">
              Користувачі
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/deals" class="nav-link" active-class="active">
              Угоди
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/tasks" class="nav-link" active-class="active">
              Задачі
            </RouterLink>
          </li>
        </ul>

        <!-- Ім'я юзера + вихід -->
        <div class="mt-auto pb-3">
          <div class="text-muted small mb-2">{{ auth.user?.name }}</div>
          <button class="btn btn-outline-danger btn-sm w-100" @click="logout">
            Вийти
          </button>
        </div>

      </div>
    </aside>

    <!-- ОСНОВНИЙ КОНТЕНТ -->
    <!-- Сюди Vue підставляє потрібний View залежно від URL -->
    <div class="page-wrapper">
      <div class="page-body">
        <div class="container-xl">
          <RouterView />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
