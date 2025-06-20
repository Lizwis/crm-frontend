import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Adjust path if needed
import Login from '../views/auth/login.vue'
import Dashboard from '../views/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ],
})

// ✅ Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Ensure authStore is hydrated
  if (!authStore.user && localStorage.getItem('token')) {
    await authStore.getUser()
  }

  const isLoggedIn = !!authStore.user

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login if not authenticated
    return next({ path: '/' })
  }

  if (to.meta.guestOnly && isLoggedIn) {
    // Redirect to dashboard if already logged in
    return next({ path: '/dashboard' })
  }

  next()
})

export default router
