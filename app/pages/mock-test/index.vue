<script setup lang="ts">
const started = ref(false)
const questions = ref<any[]>([])
const current = ref(0)
const scores = reactive({ rules: 0, signs: 0, controls: 0 })
const answered = ref(false)

async function start() {
  questions.value = await $fetch('/api/questions/mock')
  current.value = 0
  scores.rules = scores.signs = scores.controls = 0
  started.value = true
}
function onAnswered(result: { correct: boolean }) {
  answered.value = true
  if (!result.correct) return
  const slug = questions.value[current.value].module_slug
  if (slug === 'rules') scores.rules++
  if (slug === 'signs') scores.signs++
  if (slug === 'controls') scores.controls++
}
function next() { current.value++; answered.value = false }
const finished = computed(() => started.value && current.value >= questions.value.length)
</script>
<template>
  <main class="shell quiz-page page-top">
    <template v-if="!started">
      <p class="eyebrow">FULL MOCK TEST</p><h1>64 questions. Real section split.</h1>
      <p class="lede">28 Rules, 28 Signs and 8 Vehicle Controls. Each section is marked separately.</p>
      <div class="score-cards top-gap"><div><strong>22/28</strong><span>Rules pass</span></div><div><strong>23/28</strong><span>Signs pass</span></div><div><strong>6/8</strong><span>Controls pass</span></div></div>
      <button class="btn primary top-gap" @click="start">Start mock test</button>
    </template>
    <template v-else-if="!finished">
      <div class="quiz-toolbar"><div><p class="eyebrow">MOCK TEST</p><h1>{{ current+1 }} / {{ questions.length }}</h1></div><span>{{ questions[current].module_slug }}</span></div>
      <div class="progress-track"><span :style="{ width: `${((current+1)/questions.length)*100}%` }"></span></div>
      <QuizCard :key="questions[current].id" :question="questions[current]" :number="current+1" @answered="onAnswered" />
      <div class="quiz-footer"><span>Rules {{ scores.rules }} · Signs {{ scores.signs }} · Controls {{ scores.controls }}</span><button v-if="answered" class="btn primary" @click="next">{{ current === questions.length-1 ? 'Finish' : 'Next →' }}</button></div>
    </template>
    <template v-else>
      <p class="eyebrow">RESULT</p><h1>Your mock test score</h1>
      <div class="score-cards top-gap"><div><strong>{{ scores.rules }}/28</strong><span>{{ scores.rules >= 22 ? 'Pass' : 'Needs work' }} · Rules</span></div><div><strong>{{ scores.signs }}/28</strong><span>{{ scores.signs >= 23 ? 'Pass' : 'Needs work' }} · Signs</span></div><div><strong>{{ scores.controls }}/8</strong><span>{{ scores.controls >= 6 ? 'Pass' : 'Needs work' }} · Controls</span></div></div>
      <button class="btn primary top-gap" @click="started=false">Try again</button>
    </template>
  </main>
</template>
