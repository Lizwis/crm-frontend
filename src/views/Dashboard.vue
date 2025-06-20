<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome back, {{ authStore.user?.name }}!</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

defineOptions({
  layout: 'auth',
})
</script>
