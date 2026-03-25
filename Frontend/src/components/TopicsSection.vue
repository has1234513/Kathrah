<template>
  <section class="topics" id="topics">
    <div class="topics__inner">
      <div class="section-header">
        <p class="section-tag">Explore</p>
        <h2 class="section-title">Featured Topics</h2>
      </div>
      <div class="topics__grid">
        <a
          v-for="topic in topics"
          :key="topic.title"
          href="#"
          class="topic-card"
        >
          <div class="topic-card__accent"></div>
          <h3 class="topic-card__title">{{ topic.title }}</h3>
          <p class="topic-card__desc">{{ topic.desc }}</p>
          <span class="topic-card__arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const topics = [
  {
    title: 'Islamic Ethics In the Digital Age',
    desc: 'Examining ethical frameworks for Muslims in an increasingly digital world.'
  },
  {
    title: 'Environmental Justice: An Islamic Perspective',
    desc: 'Grounding environmental stewardship through Islamic principles.'
  },
  {
    title: 'Science and Religion: Bridging Worldviews',
    desc: 'Reconciling scientific discovery with religious understanding.'
  },
  {
    title: 'Contemporary Muslim Thought in Africa',
    desc: 'Highlighting the contributions of African Muslim thinkers in global discourse.'
  }
]
</script>

<style scoped>
.topics {
  padding: 100px 2rem;
  background: var(--off-white);
  position: relative;
  overflow: hidden;
}
.topics::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold-dim), transparent);
}
.topics::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold-dim), transparent);
}

.topics__inner {
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

.topics__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.topic-card {
  display: block;
  position: relative;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.5rem 1.5rem;
  transition: transform 0.25s, box-shadow 0.25s;
  overflow: hidden;
}
.topic-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}
.topic-card:hover .topic-card__accent {
  width: 100%;
}

.topic-card__accent {
  position: absolute;
  top: 0; left: 0;
  height: 3px;
  width: 40px;
  background: var(--gold);
  border-radius: 0 0 2px 0;
  transition: width 0.4s ease;
}

.topic-card__title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.6rem;
  line-height: 1.4;
}

.topic-card__desc {
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.topic-card__arrow {
  font-size: 1rem;
  color: var(--gold-dim);
  transition: transform 0.2s;
  display: inline-block;
}
.topic-card:hover .topic-card__arrow {
  transform: translateX(4px);
}
</style>
