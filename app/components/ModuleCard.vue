<script setup lang="ts">
import type { StudyModule } from '~/../shared/types/study'
defineProps<{ module: StudyModule }>()
</script>

<template>
  <NuxtLink :to="`/learn/${module.slug}`" class="module-card" :style="{ '--accent': module.accent || '#68d391' }">
    <div class="module-icon">{{ module.icon || '•' }}</div>
    <div>
      <p class="eyebrow">MODULE {{ module.position }}</p>
      <h3>{{ module.title }}</h3>
      <p>{{ module.description }}</p>
      <div v-if="module.pass_score && module.question_count" class="pass-pill">
        Pass target: {{ module.pass_score }}/{{ module.question_count }}
      </div>
    </div>
    <span class="arrow">→</span>
  </NuxtLink>
</template>
