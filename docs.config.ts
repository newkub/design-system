import { SidebarItem, NavItem, ThemeConfig, DocsConfig } from './types/docs-config';

const themeConfig: ThemeConfig = {
  logo: '/logo.svg',
  siteTitle: 'Nuxt Docs',
  nav: [
    { text: 'Guide', link: '/guide/' },
    { text: 'Design System', link: '/design-system/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'Changelog', link: '/changelog/' },
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
        collapsible: true,
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Installation', link: '/guide/installation' }
        ]
      },
      {
        text: 'Essentials',
        collapsible: true,
        items: [
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Routing', link: '/guide/routing' }
        ]
      }
    ],
    '/design-system/': [
      {
        text: 'Overview',
        collapsible: true,
        items: [
          { text: 'Introduction', link: '/design-system/' },
          { text: 'Design Principles', link: '/design-system/principles' },
          { text: 'Color System', link: '/design-system/colors' }
        ]
      },
      {
        text: 'Components',
        collapsible: true,
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
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Forms', link: '/design-system/patterns/forms' },
          { text: 'Navigation', link: '/design-system/patterns/navigation' },
          { text: 'Layouts', link: '/design-system/patterns/layouts' }
        ]
      }
    ],
    '/blog/': [
      {
        text: 'Recent Posts',
        collapsible: true,
        items: [
          { text: 'All Posts', link: '/blog/' }
        ]
      },
      {
        text: 'Categories',
        collapsible: true,
        items: [
          { text: 'Tutorials', link: '/blog/category/tutorials' },
          { text: 'Updates', link: '/blog/category/updates' },
          { text: 'Case Studies', link: '/blog/category/case-studies' }
        ]
      }
    ],
    '/changelog/': [
      {
        text: 'Releases',
        collapsible: true,
        items: [
          { text: 'All Releases', link: '/changelog/' },
          { text: 'Major Releases', link: '/changelog/major' },
          { text: 'Beta Releases', link: '/changelog/beta' }
        ]
      }
    ],
    '/api/': [
      {
        text: 'API Reference',
        collapsible: true,
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
};

const config: DocsConfig = {
  title: 'Nuxt Docs',
  description: 'Documentation site built with Nuxt and UnoCSS',
  themeConfig
};

export default config;