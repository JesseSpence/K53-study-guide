export type ModuleSlug = 'rules' | 'signs' | 'controls' | 'numbers' | 'traps' | 'mock'

export interface StudyModule {
  id: string
  slug: ModuleSlug | string
  title: string
  description: string | null
  icon: string | null
  accent: string | null
  position: number
  pass_score: number | null
  question_count: number | null
}

export interface Lesson {
  id: string
  module_id: string
  slug: string
  title: string
  summary: string | null
  body_md: string | null
  position: number
  estimated_minutes: number
}

export interface QuizOption {
  id: string
  option_text: string
  position: number
}

export interface QuizQuestion {
  id: string
  module_slug: string
  type: string
  prompt: string
  difficulty: string
  options: QuizOption[]
}
