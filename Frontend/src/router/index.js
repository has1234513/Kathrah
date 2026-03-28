import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/login", component: LoginPage, meta: { guestOnly: true } },
    { path: "/register", component: RegisterPage, meta: { guestOnly: true } },
    { path: "/dashboard", component: DashboardPage, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  // Check for access token cookie or localStorage flag
  const isAuthenticated = !!localStorage.getItem('kathrah_user')

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Not logged in, trying to access protected route → go to login
    next('/login')
  } else if (to.meta.guestOnly && isAuthenticated) {
    // Already logged in, trying to access login/register → go to dashboard
    next('/dashboard')
  } else {
    next()
  }
})

export default router