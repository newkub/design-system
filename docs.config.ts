export default {
  title: 'Nuxt Docs',
  description: 'Documentation site built with Nuxt and UnoCSS',
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Nuxt Docs',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      { 
        text: 'Links',
        items: [
          { text: 'GitHub', link: 'https://github.com' },
          { text: 'Discord', link: 'https://discord.com' }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Routing', link: '/guide/routing' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Components', link: '/api/components' }
          ]
        }
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
      { icon: 'twitter', link: 'https://twitter.com' }
    ]
  }
}