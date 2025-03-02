import { defineConfig } from './types/config'

export default defineConfig({
  title: 'Nuxt Documentation',
  description: 'A comprehensive guide to building modern web applications with Nuxt and UnoCSS.',
  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }]
  ],
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg'
    },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Components', link: '/components/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Showcase', link: '/showcase/' },
      { text: 'Changelog', link: '/changelog/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' }
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Markdown', link: '/guide/markdown' },
            { text: 'Theme Customization', link: '/guide/theme' },
            { text: 'Deployment', link: '/guide/deployment' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Components API', link: '/api/components' },
            { text: 'Configuration API', link: '/api/config' },
            { text: 'Frontmatter API', link: '/api/frontmatter' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'UI Components',
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Button', link: '/components/button' },
            { text: 'Code Block', link: '/components/code-block' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/nuxt-docs' },
      { icon: 'twitter', link: 'https://twitter.com/yourusername' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()}`
    },
    search: {
      provider: 'local'
    },
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    }
  }
})