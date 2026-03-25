<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <span class="footer__logo">Kath<span>rah</span></span>
        <p class="footer__tagline">
          An Ecosystem for African Muslim Thought, Innovation, and Action.<br />
          A Project of The Muslim Thinker NPC.
        </p>
      </div>

      <div class="footer__nav">
        <div class="footer__col">
          <h4>Navigation</h4>
          <a href="#platform">Platform</a>
          <a href="#database">Database</a>
          <a href="#repository">Repository</a>
          <a href="#mentorship">Mentorship Hub</a>
        </div>
        <div class="footer__col">
          <h4>Resources</h4>
          <a href="/about">About Us</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/marketplace">Book Marketplace</a>
        </div>
        <div class="footer__col footer__subscribe">
          <h4>Subscribe</h4>
          <p>Stay updated with our newsletter</p>
          <div class="subscribe-form">
            <input
              v-model="email"
              type="email"
              placeholder="Your email address"
              class="subscribe-input"
            />
            <button class="subscribe-btn" @click="subscribe">Subscribe</button>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p>© {{ year }} Kathrah. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const year = new Date().getFullYear()
const subscribe = () => {
  if (email.value) {
    alert(`Thank you! ${email.value} has been subscribed.`)
    email.value = ''
  }
}
</script>

<style scoped>
.footer {
  background: var(--teal-deep);
  color: rgba(255,255,255,0.75);
  padding: 80px 2rem 0;
}

.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(201,168,76,0.2);
}

.footer__logo {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--white);
}
.footer__logo span { color: var(--gold); }

.footer__tagline {
  font-size: 0.85rem;
  line-height: 1.7;
  margin-top: 0.75rem;
  max-width: 260px;
}

.footer__nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 2rem;
}

.footer__col h4 {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold-light);
  margin-bottom: 1rem;
  font-weight: 500;
}

.footer__col a {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.6rem;
  color: rgba(255,255,255,0.65);
  transition: color 0.2s;
}
.footer__col a:hover { color: var(--white); }

.footer__subscribe p {
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
}

.subscribe-form {
  display: flex;
  gap: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid rgba(201,168,76,0.35);
}

.subscribe-input {
  flex: 1;
  background: rgba(255,255,255,0.06);
  border: none;
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.55rem 0.85rem;
  outline: none;
}
.subscribe-input::placeholder { color: rgba(255,255,255,0.35); }

.subscribe-btn {
  background: var(--gold-dim);
  color: var(--white);
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.55rem 1rem;
  transition: background 0.2s;
  white-space: nowrap;
}
.subscribe-btn:hover { background: var(--gold); }

.footer__bottom {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.25rem 0;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.35);
  text-align: center;
}

@media (max-width: 900px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .footer__nav {
    grid-template-columns: 1fr 1fr;
  }
  .footer__subscribe {
    grid-column: 1 / -1;
  }
}
@media (max-width: 540px) {
  .footer__nav { grid-template-columns: 1fr; }
}
</style>
