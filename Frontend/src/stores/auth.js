// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api/index.js'

export const useAuthStore = defineStore('auth', () => {
  // ─── State ────────────────────────────────────────────────────────────────
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ─── Getters ──────────────────────────────────────────────────────────────
  const isAuthenticated = computed(() => !!user.value)

  // ─── Actions ──────────────────────────────────────────────────────────────

  async function register({ email, password, name }) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/auth/register', { email, password, name })
      user.value = data.user
    } catch (err) {
      error.value = _extractMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function login({ email, password }) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/auth/login', { email, password })
      user.value = data.user
    } catch (err) {
      error.value = _extractMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      user.value = null
    }
  }

  async function fetchMe() {
    try {
      const { data } = await api.get('/auth/me')
      user.value = data.user
    } catch {
      user.value = null
    }
  }

  // Called by the interceptor when refresh fails
  function $reset() {
    user.value = null
    error.value = null
    loading.value = false
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function _extractMessage(err) {
    return (
      err.response?.data?.message ??
      err.response?.data?.error ??
      err.message ??
      'Something went wrong'
    )
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    fetchMe,
    $reset,
  }
})