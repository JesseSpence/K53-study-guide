<script setup lang="ts">
import type { QuizQuestion } from '~/../shared/types/study'
const props = defineProps<{ question: QuizQuestion; number: number }>()
const emit = defineEmits<{ answered: [payload: { correct: boolean; explanation: string }] }>()
const selected = ref<string | null>(null)
const result = ref<{ correct: boolean; explanation: string; correctOptionId: string } | null>(null)
const pending = ref(false)

async function submit(optionId: string) {
  if (result.value || pending.value) return
  selected.value = optionId
  pending.value = true
  try {
    const response = await $fetch<{ correct: boolean; explanation: string; correctOptionId: string }>('/api/questions/check', {
      method: 'POST',
      body: { questionId: props.question.id, optionId }
    })
    result.value = response
    emit('answered', response)
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <article class="quiz-card">
    <div class="quiz-meta">
      <span>Question {{ number }}</span>
      <span>{{ question.difficulty }}</span>
    </div>
    <h2>{{ question.prompt }}</h2>
    <div class="answer-grid">
      <button
        v-for="(option, index) in question.options"
        :key="option.id"
        class="answer-btn"
        :class="{
          selected: selected === option.id,
          correct: result && option.id === result.correctOptionId,
          wrong: result && selected === option.id && !result.correct
        }"
        :disabled="!!result || pending"
        @click="submit(option.id)"
      >
        <span class="answer-letter">{{ String.fromCharCode(65 + index) }}</span>
        {{ option.option_text }}
      </button>
    </div>
    <div v-if="result" class="explanation" :class="result.correct ? 'good' : 'bad'">
      <strong>{{ result.correct ? 'Correct' : 'Not quite' }}</strong>
      <p>{{ result.explanation }}</p>
    </div>
  </article>
</template>
