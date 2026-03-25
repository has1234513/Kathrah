<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar__inner">
      <a href="/" class="navbar__logo">
        <!-- Replace src with your actual logo asset -->
        <span class="logo-text">Kath<span class="logo-accent">rah</span></span>
      </a>
      <nav class="navbar__links">
        <a href="#platform">Platform</a>
        <a href="#database">Database</a>
        <a href="#repository">Repository</a>
      </nav>
      <div class="navbar__actions">
        <a href="/login" class="btn-ghost">Sign in</a>
        <a href="/register" class="btn-primary">Join the Network</a>
      </div>
      <button class="navbar__burger" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="navbar__mobile" :class="{ open: menuOpen }">
      <a href="#platform" @click="menuOpen=false">Platform</a>
      <a href="#database" @click="menuOpen=false">Database</a>
      <a href="#repository" @click="menuOpen=false">Repository</a>
      <a href="/login" @click="menuOpen=false">Sign in</a>
      <a href="/register" class="btn-primary" @click="menuOpen=false">Join the Network</a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => { isScrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background 0.3s, box-shadow 0.3s;
}
.navbar.scrolled {
  background: rgba(255,255,255,0.97);
  box-shadow: 0 1px 16px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
}
.navbar__inner {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 2rem;
}
.navbar__logo { flex-shrink: 0; }
.logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-dark);
  letter-spacing: 0.02em;
}
.logo-accent { color: var(--gold); }

.navbar__links {
  display: flex;
  gap: 2rem;
  margin-left: auto;
}
.navbar__links a {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-muted);
  transition: color 0.2s;
}
.navbar__links a:hover { color: var(--text-dark); }

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.btn-ghost {
  font-size: 0.875rem;
  color: var(--text-muted);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  transition: color 0.2s;
}
.btn-ghost:hover { color: var(--text-dark); }

.btn-primary {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--white);
  background: var(--teal-deep);
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-sm);
  transition: background 0.2s, transform 0.15s;
}
.btn-primary:hover {
  background: var(--teal-light);
  transform: translateY(-1px);
}

.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  padding: 4px;
  margin-left: auto;
}
.navbar__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-dark);
  border-radius: 2px;
}

.navbar__mobile {
  display: none;
  flex-direction: column;
  background: var(--white);
  padding: 1rem 2rem 1.5rem;
  gap: 1rem;
  border-top: 1px solid var(--border);
}
.navbar__mobile a {
  font-size: 1rem;
  color: var(--text-muted);
}
.navbar__mobile .btn-primary {
  align-self: flex-start;
}

@media (max-width: 768px) {
  .navbar__links, .navbar__actions { display: none; }
  .navbar__burger { display: flex; }
  .navbar__mobile.open { display: flex; }
  .navbar.scrolled { background: var(--white); }
}
</style>
