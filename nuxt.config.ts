// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
  ],
  content: {
    highlight: {
      theme: 'github-light',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'bash', 'markdown']
    },
    documentDriven: true
  },
  unocss: {
    preflight: true,
    icons: true,
    presets: [
      'uno',
      'icons'
    ]
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/design-system.css',
  ],
  app: {
    head: {
      title: 'Nuxt Docs',
      meta: [
        { name: 'description', content: 'Documentation site built with Nuxt and UnoCSS' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  // Add auto-imports for components
  components: [
    { path: '~/components', pathPrefix: false }
  ]
})