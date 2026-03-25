<template>
  <section class="hero">
    <div class="hero__bg-pattern"></div>
    <div class="hero__inner">
      <div class="hero__content" :class="{ visible: mounted }">
        <p class="hero__eyebrow">بسم الله الرحمن الرحيم</p>
        <h1 class="hero__title">
          Kathrah: An Ecosystem for African Muslim
          <em>Thought, Innovation, and Action</em>
        </h1>
        <p class="hero__subtitle">
          Building a dynamic intellectual ecosystem that documents, connects, and
          mobilises Muslim researchers, professionals, and emerging thinkers across
          Africa and beyond.
        </p>
        <div class="hero__cta">
          <a href="/register" class="cta-primary">Join the Network</a>
          <a href="#features" class="cta-secondary">Learn more</a>
        </div>
      </div>
    </div>
    <div class="hero__divider"></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const mounted = ref(false)
onMounted(() => setTimeout(() => mounted.value = true, 80))
</script>

<style scoped>
.hero {
  position: relative;
  padding: 160px 2rem 100px;
  text-align: center;
  overflow: hidden;
  background: var(--off-white);
}
.hero__bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(201,168,76,0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(10,46,46,0.06) 0%, transparent 50%);
  pointer-events: none;
}
/* subtle geometric Islamic-inspired lines */
.hero__bg-pattern::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23c9a84c' stroke-width='0.3' stroke-opacity='0.2'/%3E%3C/svg%3E");
  background-size: 60px 60px;
}

.hero__inner {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
}

.hero__content {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.hero__content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero__eyebrow {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--gold-dim);
  letter-spacing: 0.08em;
  margin-bottom: 1.2rem;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-dark);
  margin-bottom: 1.4rem;
}
.hero__title em {
  font-style: italic;
  color: var(--teal-deep);
}

.hero__subtitle {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-muted);
  max-width: 580px;
  margin: 0 auto 2.4rem;
}

.hero__cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-primary {
  display: inline-block;
  background: var(--teal-deep);
  color: var(--white);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1.8rem;
  border-radius: var(--radius-sm);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}
.cta-primary:hover {
  background: var(--teal-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(10,46,46,0.25);
}

.cta-secondary {
  display: inline-block;
  border: 1.5px solid var(--gold-dim);
  color: var(--gold-dim);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1.8rem;
  border-radius: var(--radius-sm);
  transition: background 0.2s, color 0.2s;
}
.cta-secondary:hover {
  background: var(--gold-dim);
  color: var(--white);
}

.hero__divider {
  margin-top: 80px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold-dim), transparent);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
