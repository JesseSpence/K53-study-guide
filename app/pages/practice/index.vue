<script setup lang="ts">
const route = useRoute()
const moduleSlug = ref(String(route.query.module || 'rules'))
const { getPractice } = useStudy()
const questions = ref(await getPractice(moduleSlug.value, 10))
const current = ref(0)
const correct = ref(0)
const answered = ref(false)

async function changeModule() {
  questions.value = await getPractice(moduleSlug.value, 10)
  current.value = 0; correct.value = 0; answered.value = false
}
function onAnswered(result: { correct: boolean }) {
  answered.value = true
  if (result.correct) correct.value++
}
function next() { if (current.value < questions.value.length - 1) { current.value++; answered.value = false } }
</script>
<template>
  <main class="shell quiz-page page-top">
    <div class="quiz-toolbar">
      <div><p class="eyebrow">PRACTICE</p><h1>Quick quiz</h1></div>
      <select v-model="moduleSlug" @change="changeModule"><option value="rules">Rules</option><option value="signs">Signs</option><option value="controls">Controls</option></select>
    </div>
    <div class="progress-track"><span :style="{ width: `${((current+1)/questions.length)*100}%` }"></span></div>
    <QuizCard v-if="questions[current]" :key="questions[current].id" :question="questions[current]" :number="current+1" @answered="onAnswered" />
    <div class="quiz-footer"><span>{{ correct }} correct so far</span><button v-if="answered && current < questions.length-1" class="btn primary" @click="next">Next question →</button><div v-else-if="answered" class="pass-pill">Finished: {{ correct }}/{{ questions.length }}</div></div>
  </main>
</template>
