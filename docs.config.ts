export default {
  title: 'Nuxt Docs',
  description: 'Documentation site built with Nuxt and UnoCSS',
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Nuxt Docs',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Design System', link: '/design-system/' },
      { 
        text: 'Components',
        items: [
          { text: 'Buttons', link: '/design-system/buttons' },
          { text: 'Typography', link: '/design-system/typography' },
          { text: 'Cards', link: '/design-system/cards' },
          { text: 'Alerts', link: '/design-system/alerts' },
          { text: 'Inputs', link: '/design-system/inputs' }
        ]
      },
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
      '/design-system/': [
        {
          text: 'Overview',
          items: [
            { text: 'Introduction', link: '/design-system/' },
            { text: 'Design Principles', link: '/design-system/principles' },
            { text: 'Color System', link: '/design-system/colors' }
          ]
        },
        {
          text: 'Components',
          items: [
            { text: 'Buttons', link: '/design-system/buttons' },
            { text: 'Typography', link: '/design-system/typography' },
            { text: 'Cards', link: '/design-system/cards' },
            { text: 'Alerts', link: '/design-system/alerts' },
            { text: 'Badges', link: '/design-system/badges' },
            { text: 'Tabs', link: '/design-system/tabs' },
            { text: 'Inputs', link: '/design-system/inputs' }
          ]
        },
        {
          text: 'Patterns',
          items: [
            { text: 'Forms', link: '/design-system/patterns/forms' },
            { text: 'Navigation', link: '/design-system/patterns/navigation' },
            { text: 'Layouts', link: '/design-system/patterns/layouts' }
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