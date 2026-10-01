export default defineEventHandler(async () => {
  const db = useSupabaseAdmin()
  const sections = [{ slug: 'rules', take: 28 }, { slug: 'signs', take: 28 }, { slug: 'controls', take: 8 }]
  const output: any[] = []
  for (const section of sections) {
    const { data, error } = await db
      .from('questions')
      .select('id,type,prompt,difficulty,modules!inner(slug),question_options(id,option_text,position)')
      .eq('modules.slug', section.slug)
      .eq('is_published', true)
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    const picked = (data || []).sort(() => Math.random() - 0.5).slice(0, section.take)
    output.push(...picked.map((q: any) => ({
      id: q.id,
      module_slug: q.modules.slug,
      type: q.type,
      prompt: q.prompt,
      difficulty: q.difficulty,
      options: [...q.question_options].sort((a,b) => a.position-b.position)
    })))
  }
  return output
})
