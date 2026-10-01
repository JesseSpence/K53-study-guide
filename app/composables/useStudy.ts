import type { Lesson, StudyModule, QuizQuestion } from '~/../shared/types/study'

export function useStudy() {
  const supabase = useSupabaseClient()

  async function getModules() {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_published', true)
      .order('position')
    if (error) throw error
    return data as StudyModule[]
  }

  async function getModule(slug: string) {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    if (error) throw error
    return data as StudyModule
  }

  async function getLessons(moduleId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .eq('is_published', true)
      .order('position')
    if (error) throw error
    return data as Lesson[]
  }

  async function getLesson(moduleSlug: string, lessonSlug: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*, modules!inner(slug,title), facts(*)')
      .eq('slug', lessonSlug)
      .eq('modules.slug', moduleSlug)
      .eq('is_published', true)
      .single()
    if (error) throw error
    return data
  }

  async function getPractice(module = 'rules', limit = 10) {
    return await $fetch<QuizQuestion[]>('/api/questions', { query: { module, limit } })
  }

  return { getModules, getModule, getLessons, getLesson, getPractice }
}
