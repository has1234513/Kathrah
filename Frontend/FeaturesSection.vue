<template>
  <section class="features" id="features">
    <div class="features__inner">
      <div class="section-header">
        <p class="section-tag">What We Offer</p>
        <h2 class="section-title">Our Key Features</h2>
      </div>
      <div class="features__grid">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="feature-card"
          :style="{ animationDelay: i * 0.1 + 's' }"
        >
          <div class="feature-card__icon" v-html="feature.icon"></div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__desc">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Searchable Database',
    desc: 'A structured network of African and global Muslim intellectuals, scholars, and professionals with detailed profiles.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="14" cy="14" r="8" stroke="#0a2e2e" stroke-width="2"/><path d="M20 20 L27 27" stroke="#c9a84c" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },
  {
    title: 'Mentorship Platform',
    desc: 'Connect emerging thinkers with experienced mentors through structured media across sectors and disciplines.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="10" cy="10" r="5" stroke="#0a2e2e" stroke-width="2"/><circle cx="22" cy="10" r="5" stroke="#c9a84c" stroke-width="2"/><path d="M4 28 C4 22 16 22 16 28" stroke="#0a2e2e" stroke-width="2" stroke-linecap="round"/><path d="M16 28 C16 22 28 22 28 28" stroke="#c9a84c" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    title: 'Hypothetical Lab',
    desc: 'A space to challenge ideas, test theories, pose big questions, and stimulate intellectual debate.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4 L16 12 M12 8 L20 8" stroke="#c9a84c" stroke-width="2" stroke-linecap="round"/><path d="M10 12 L6 26 L26 26 L22 12 Z" stroke="#0a2e2e" stroke-width="2" stroke-linejoin="round"/><path d="M12 20 Q16 17 20 20" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  {
    title: 'Digital Repository',
    desc: 'A curated digital library of articles, book reviews, and scholarly resources contributing to contemporary thought.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="4" width="20" height="26" rx="2" stroke="#0a2e2e" stroke-width="2"/><path d="M10 10 L22 10 M10 15 L22 15 M10 20 L16 20" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round"/></svg>`
  }
]
</script>

<style scoped>
.features {
  padding: 100px 2rem;
  background: var(--white);
}
.features__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.section-tag {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-dim);
  margin-bottom: 0.6rem;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 600;
  color: var(--text-dark);
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: var(--off-white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 2rem 1.6rem;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  animation: fadeUp 0.6s ease both;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--gold-dim);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.feature-card__icon {
  width: 52px;
  height: 52px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.feature-card__title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.6rem;
}

.feature-card__desc {
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--text-muted);
}
</style>
