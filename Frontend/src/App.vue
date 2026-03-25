<template>
  <div id="kathrah-app">
    <NavBar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <TopicsSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import TopicsSection from './components/TopicsSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style>
#kathrah-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
