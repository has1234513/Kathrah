// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage, meta: { guestOnly: true } },
    { path: '/register', component: RegisterPage, meta: { guestOnly: true } },
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  ],
})

// ─── Navigation guards ────────────────────────────────────────────────────────
// Lazily import the store so Pinia is already installed when the guard runs
router.beforeEach(async (to) => {
  const { useAuthStore } = await import('../stores/auth.js')
  const auth = useAuthStore()

  // On first navigation, try to rehydrate the session from the httpOnly cookie
  if (auth.user === null && !auth.loading) {
    await auth.fetchMe()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { path: '/dashboard' }
  }
})

export default router