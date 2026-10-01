<script setup lang="ts">
const { getModules } = useStudy()
const { data: modules } = await useAsyncData('home-modules', getModules)
</script>

<template>
  <main>
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow">SOUTH AFRICAN LEARNER'S LICENCE</p>
        <h1>Learn K53 without reading a textbook.</h1>
        <p class="hero-text">Short lessons, rapid-fire sign practice, mistake review and a 64-question mock test built around the real test sections.</p>
        <div class="hero-actions">
          <NuxtLink to="/learn" class="btn primary">Start learning</NuxtLink>
          <NuxtLink to="/mock-test" class="btn ghost">Try a mock test</NuxtLink>
        </div>
      </div>
      <div class="score-orbit">
        <div class="orb big"><strong>22/28</strong><span>Rules</span></div>
        <div class="orb"><strong>23/28</strong><span>Signs</span></div>
        <div class="orb"><strong>6/8</strong><span>Controls</span></div>
      </div>
    </section>

    <section class="shell section">
      <div class="section-head"><div><p class="eyebrow">STUDY MAP</p><h2>Pick a module</h2></div><NuxtLink to="/learn">View all →</NuxtLink></div>
      <div class="module-grid">
        <ModuleCard v-for="module in modules" :key="module.id" :module="module" />
      </div>
    </section>
  </main>
</template>
