export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  supabase: {
    redirect: false
  },
  app: {
    head: {
      title: 'K53 Study',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#101726' }
      ]
    }
  },
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  }
})
