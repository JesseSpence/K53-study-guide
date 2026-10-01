export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const moduleSlug = String(query.module || 'rules')
  const limit = Math.min(Number(query.limit || 10), 30)
  const db = useSupabaseAdmin()

  const { data, error } = await db
    .from('questions')
    .select('id,type,prompt,difficulty,modules!inner(slug),question_options(id,option_text,position)')
    .eq('modules.slug', moduleSlug)
    .eq('is_published', true)
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })

  return (data || [])
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
    .map((q: any) => ({
      id: q.id,
      module_slug: q.modules.slug,
      type: q.type,
      prompt: q.prompt,
      difficulty: q.difficulty,
      options: [...q.question_options].sort((a,b) => a.position - b.position)
    }))
})
