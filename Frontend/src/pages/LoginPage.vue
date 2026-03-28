<template>
  <div class="auth-page">

    <!-- Left: Form Panel -->
    <div class="auth-form-panel">
      <div class="auth-form-panel__top">
        <a href="/" class="auth-brand">
          <span class="auth-brand__icon">⬡</span>
          <span class="auth-brand__name">Kathrah.</span>
        </a>
      </div>

      <div class="auth-form-wrap">
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">Enter your email and password to sign in to your account</p>

        <div class="auth-form">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="m@example.com"
              autocomplete="email"
              :disabled="auth.loading"
              required
            />
          </div>

          <div class="form-field">
            <div class="label-row">
              <label for="password">Password</label>
              <a href="/forgot-password" class="forgot-link">Forgot password?</a>
            </div>
            <div class="input-wrap">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                :disabled="auth.loading"
                required
              />
              <button type="button" class="toggle-pw" @click="showPassword = !showPassword" aria-label="Toggle password">
                <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <p v-if="auth.error" class="form-error">{{ auth.error }}</p>

          <button
            class="btn-submit"
            :disabled="auth.loading"
            @click="handleSubmit"
          >
            <span v-if="auth.loading" class="spinner"></span>
            <span v-else>Sign in</span>
          </button>

          <div class="divider"><span>Or continue with</span></div>

          <a href="http://localhost:4000/api/auth/google" class="btn-google">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Sign in with Google
          </a>
        </div>

        <p class="auth-switch">
          Don't have an account?
          <a href="/register">Sign up</a>
        </p>
      </div>
    </div>

    <!-- Right: Brand Panel -->
    <div class="auth-brand-panel">
      <div class="auth-brand-panel__inner">
        <div class="brand-logo">
          <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" class="hex-svg">
            <polygon points="100,4 196,54 196,174 100,224 4,174 4,54" stroke="#c9a84c" stroke-width="5" fill="none"/>
            <polygon points="100,22 178,66 178,162 100,206 22,162 22,66" stroke="#1a5252" stroke-width="3" fill="#0d3d3d"/>
            <path d="M70 80 Q100 60 130 80 Q145 100 130 125 Q100 145 70 125 Q55 100 70 80Z" stroke="#c9a84c" stroke-width="2.5" fill="none"/>
            <path d="M85 95 Q100 85 115 95 L118 130 Q100 140 82 130 Z" stroke="#c9a84c" stroke-width="1.5" fill="rgba(201,168,76,0.1)"/>
            <circle cx="100" cy="115" r="6" fill="#c9a84c" opacity="0.6"/>
          </svg>
        </div>
        <h2 class="brand-name">KATHRAH</h2>
        <p class="brand-tagline1">Muslim Intellectual Capital Database &amp; a mentorshub</p>
        <p class="brand-tagline2"><em>Where Knowledge is shared and Leadership is strengthened</em></p>
        <div class="brand-diamonds">
          <span class="diamond sm"></span>
          <span class="diamond lg"></span>
          <span class="diamond sm"></span>
        </div>
      </div>
      <div class="brand-panel__texture"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: '', password: '' })
const showPassword = ref(false)

const handleSubmit = async () => {
  if (!form.email || !form.password) {
    auth.error = 'Please fill in all fields.'
    return
  }
  try {
    await auth.login({ email: form.email, password: form.password })
        if (!res.ok) {
      error.value = data.message ?? 'Invalid credentials.'
      return
    }
    // Store user so the guard knows we're authenticated
    localStorage.setItem('kathrah_user', JSON.stringify(data.user))
    const redirect = route.query.redirect ?? '/dashboard'
    router.push(redirect)
  } catch (e) {
      error.value = e.message ?? 'Login failed.'
    }
}
</script>

<style scoped>
.auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* ── Left panel ── */
.auth-form-panel {
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  background: var(--white);
}
.auth-form-panel__top { margin-bottom: auto; }

.auth-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-dark);
}
.auth-brand__icon { font-size: 1.2rem; }

.auth-form-wrap {
  max-width: 400px;
  width: 100%;
  margin: auto;
  padding: 2rem 0;
}

.auth-title {
  font-family: var(--font-body);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.4rem;
  text-align: center;
}
.auth-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.label-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.forgot-link {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}
.forgot-link:hover { color: var(--text-dark); }

.form-field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-dark);
}

.form-field input,
.input-wrap input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.85rem;
  font-size: 0.9rem;
  font-family: var(--font-body);
  color: var(--text-dark);
  background: var(--white);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
.form-field input:focus,
.input-wrap input:focus {
  border-color: var(--teal-light);
  box-shadow: 0 0 0 3px rgba(10,46,46,0.08);
}
.form-field input:disabled,
.input-wrap input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.toggle-pw {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.2s;
}
.toggle-pw:hover { color: var(--text-dark); }

.form-error {
  font-size: 0.83rem;
  color: #c0392b;
  background: #fdf0ef;
  border: 1px solid #f5c6c2;
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
}

.btn-submit {
  width: 100%;
  background: var(--text-dark);
  color: var(--white);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.7rem;
  border-radius: var(--radius-sm);
  transition: background 0.2s, transform 0.15s, opacity 0.2s;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
}
.btn-submit:hover:not(:disabled) {
  background: var(--teal-deep);
  transform: translateY(-1px);
}
.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Loading spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.8rem;
}
.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.btn-google {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: var(--white);
  color: var(--text-dark);
  border: 1px solid var(--border);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.65rem;
  border-radius: var(--radius-sm);
  transition: background 0.2s, border-color 0.2s;
  cursor: pointer;
  text-decoration: none;
}
.btn-google:hover {
  background: var(--off-white);
  border-color: #ccc;
}

.auth-switch {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 1.4rem;
}
.auth-switch a {
  color: var(--text-dark);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ── Right panel ── */
.auth-brand-panel {
  position: relative;
  background: var(--teal-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.brand-panel__texture {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.auth-brand-panel__inner {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.brand-logo { width: 160px; height: 160px; margin-bottom: 0.5rem; }
.hex-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 24px rgba(201,168,76,0.25));
}
.brand-name {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--off-white);
}
.brand-tagline1 { font-size: 1rem; color: rgba(255,255,255,0.75); }
.brand-tagline2 {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-style: italic;
  color: rgba(255,255,255,0.55);
}
.brand-diamonds {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
}
.diamond { background: var(--gold); transform: rotate(45deg); display: block; }
.diamond.sm { width: 10px; height: 10px; opacity: 0.7; }
.diamond.lg { width: 16px; height: 16px; }

@media (max-width: 768px) {
  .auth-page { grid-template-columns: 1fr; }
  .auth-brand-panel { min-height: 260px; order: -1; }
  .auth-form-panel { padding: 1.5rem; }
  .brand-name { font-size: 2.2rem; }
  .brand-logo { width: 100px; height: 100px; }
}
</style>