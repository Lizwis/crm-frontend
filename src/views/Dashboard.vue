<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome back, {{ authStore.user?.name }}!</p>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  layout: 'auth',

  setup() {
    const authStore = useAuthStore()

    return {
      authStore,
    }
  },
}
</script>
