// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
  ],
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'bash', 'markdown', 'yaml', 'md'],
      shiki: {
        theme: {
          default: 'github-light',
          dark: 'github-dark'
        }
      }
    },
    documentDriven: true,
    markdown: {
      anchorLinks: {
        depth: 3,
        exclude: [1]
      },
      remarkPlugins: ['remark-emoji'],
      rehypePlugins: []
    },
    experimental: {
      clientDB: true,
      componentIslands: true
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  unocss: {
    preflight: true,
  },
  app: {
    head: {
      title: 'Nuxt Docs',
      meta: [
        { name: 'description', content: 'Documentation site built with Nuxt and UnoCSS' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})