<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const { getModule, getLessons } = useStudy()
const { data: module } = await useAsyncData(`module-${slug}`, () => getModule(slug))
const { data: lessons } = await useAsyncData(`lessons-${slug}`, () => module.value ? getLessons(module.value.id) : [])
</script>
<template>
  <main v-if="module" class="shell section page-top">
    <NuxtLink to="/learn" class="back-link">← All modules</NuxtLink>
    <p class="eyebrow">{{ module.title }}</p>
    <h1>{{ module.title }}</h1>
    <p class="lede">{{ module.description }}</p>
    <div class="lesson-list top-gap">
      <NuxtLink v-for="lesson in lessons" :key="lesson.id" :to="`/lesson/${module.slug}/${lesson.slug}`" class="lesson-row">
        <span class="lesson-number">{{ String(lesson.position).padStart(2,'0') }}</span>
        <div><h3>{{ lesson.title }}</h3><p>{{ lesson.summary }}</p></div>
        <span>{{ lesson.estimated_minutes }} min →</span>
      </NuxtLink>
    </div>
    <NuxtLink :to="`/practice?module=${module.slug}`" class="btn primary top-gap">Practise {{ module.title }}</NuxtLink>
  </main>
</template>
