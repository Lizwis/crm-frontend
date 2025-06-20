<template>
  <div class="d-flex" id="wrapper">
    <nav id="sidebar" class="bg-light border-end">
      <div class="sidebar-heading px-3 py-4 fw-bold text-primary">MyApp</div>
      <div class="list-group list-group-flush">
        <router-link class="list-group-item list-group-item-action" to="/dashboard"
          >Dashboard</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/profile"
          >Profile</router-link
        >
      </div>
    </nav>

    <div id="page-content-wrapper" class="w-100">
      <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div class="container-fluid">
          <button class="btn btn-outline-primary" @click="toggleSidebar">☰</button>

          <div class="ms-auto d-flex align-items-center">
            <span class="me-3">Hi, {{ authStore.user?.name }}</span>
            <button class="btn btn-outline-danger btn-sm" @click="authStore.logout()">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div class="container-fluid p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toggleSidebar = () => {
  document.getElementById('sidebar').classList.toggle('d-none')
}
</script>

<style scoped>
#wrapper {
  min-height: 100vh;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
}

#page-content-wrapper {
  flex: 1;
}
</style>
