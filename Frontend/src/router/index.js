// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/dashboard", component: DashboardPage },
  ],
});
