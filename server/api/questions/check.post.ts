export default defineEventHandler(async (event) => {
  const body = await readBody<{ questionId?: string; optionId?: string }>(event)
  if (!body.questionId || !body.optionId) throw createError({ statusCode: 400, statusMessage: 'questionId and optionId are required' })
  const db = useSupabaseAdmin()
  const { data: option, error: optionError } = await db
    .from('question_options')
    .select('id,is_correct,question_id')
    .eq('id', body.optionId)
    .eq('question_id', body.questionId)
    .single()
  if (optionError) throw createError({ statusCode: 400, statusMessage: 'Invalid answer option' })
  const { data: question, error: qError } = await db.from('questions').select('explanation').eq('id', body.questionId).single()
  if (qError) throw createError({ statusCode: 500, statusMessage: qError.message })
  const { data: correct } = await db.from('question_options').select('id').eq('question_id', body.questionId).eq('is_correct', true).single()
  return { correct: !!option.is_correct, explanation: question.explanation, correctOptionId: correct?.id }
})
