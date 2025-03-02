import { SidebarItem, NavItem, ThemeConfig, DocsConfig } from './types/docs-config';

const themeConfig: ThemeConfig = {
  logo: '/logo.svg',
  siteTitle: 'Design System',
  nav: [
    { text: 'Guide', link: '/guide/' },
    { text: 'Components', link: '/components' },
    { text: 'Showcase', link: '/showcase/' },
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
        text: 'Get Started',
        collapsible: true,
        items: [
          { text: 'Design Principles', link: '/guide/design-principles' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'Customize Theme', link: '/guide/customize-theme' },
        ]
      },
      {
        text: 'Design System',
        collapsible: true,
        items: [
          { text: 'Tokens', link: '/guide/tokens' },
          { text: 'Components', link: '/guide/components' },
          { text: 'Patterns', link: '/guide/patterns' },
          { text: 'Templates', link: '/guide/templates' },
          { text: 'Showcase', link: '/guide/showcase' }

        ]
      }
    ],
    '/showcase/': [
      {
        text: 'Components',
        collapsible: true,
        items: [
          { text: 'All Components', link: '/showcase/components' },
          { text: 'Layout Components', link: '/showcase/components?category=layout' },
          { text: 'Form Components', link: '/showcase/components?category=form' },
          { text: 'Feedback Components', link: '/showcase/components?category=feedback' },
          { text: 'Navigation Components', link: '/showcase/components?category=navigation' },
          { text: 'Data Display Components', link: '/showcase/components?category=data-display' }
        ]
      },
      {
        text: 'Templates',
        collapsible: true,
        items: [
          { text: 'Overview', link: '/showcase/' },
          { text: 'Documentation', link: '/showcase/documentation' },
          { text: 'Blog', link: '/showcase/blog' },
          { text: 'Changelog', link: '/showcase/changelog' }
        ]
      },
      {
        text: 'Examples',
        collapsible: true,
        items: [
          { text: 'Portfolio', link: '/showcase/examples/portfolio' },
          { text: 'Dashboard', link: '/showcase/examples/dashboard' },
          { text: 'E-commerce', link: '/showcase/examples/ecommerce' }
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
    { icon: 'i-carbon-logo-github', link: 'https://github.com' },
    { icon: 'i-carbon-logo-twitter', link: 'https://twitter.com' },
    { icon: 'i-carbon-logo-discord', link: 'https://discord.com' },
    { icon: 'i-carbon-logo-linkedin', link: 'https://linkedin.com' }
  ]
};

const config: DocsConfig = {
  title: 'Nuxt Docs',
  description: 'Documentation site built with Nuxt and UnoCSS',
  themeConfig
};

export default config;