<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div>
    <h2 class="mb-4">Dashboard</h2>

    <div class="alert alert-success">
      Привіт, <strong>{{ auth.user?.name }}</strong>! Ти успішно увійшов.
    </div>

    <!-- TODO: статистика, останні активності -->
  </div>
</template>
