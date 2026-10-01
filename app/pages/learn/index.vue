<script setup lang="ts">
const { getModules } = useStudy()
const { data: modules } = await useAsyncData('modules', getModules)
</script>
<template>
  <main class="shell section page-top">
    <p class="eyebrow">LEARN</p>
    <h1>Study by topic</h1>
    <p class="lede">Work through the material in small lessons, then practise questions from the same module.</p>
    <div class="module-grid top-gap"><ModuleCard v-for="module in modules" :key="module.id" :module="module" /></div>
  </main>
</template>
