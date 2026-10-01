<script setup lang="ts">
const route = useRoute()
const moduleSlug = String(route.params.module)
const lessonSlug = String(route.params.slug)
const { getLesson } = useStudy()
const { data: lesson } = await useAsyncData(`lesson-${moduleSlug}-${lessonSlug}`, () => getLesson(moduleSlug, lessonSlug))
</script>
<template>
  <main v-if="lesson" class="shell lesson-page page-top">
    <NuxtLink :to="`/learn/${moduleSlug}`" class="back-link">← Back to {{ lesson.modules.title }}</NuxtLink>
    <p class="eyebrow">LESSON {{ lesson.position }}</p>
    <h1>{{ lesson.title }}</h1>
    <p class="lede">{{ lesson.summary }}</p>
    <article class="lesson-body">
      <section v-for="fact in [...lesson.facts].sort((a,b) => a.position-b.position)" :key="fact.id" class="fact-card" :class="`fact-${fact.fact_type}`">
        <span class="fact-label">{{ fact.fact_type }}</span>
        <h2>{{ fact.title }}</h2>
        <p>{{ fact.content }}</p>
        <div v-if="fact.numeric_value" class="number-chip">{{ fact.numeric_value }} {{ fact.unit }}</div>
      </section>
    </article>
    <NuxtLink :to="`/practice?module=${moduleSlug}`" class="btn primary">Practise this module</NuxtLink>
  </main>
</template>
