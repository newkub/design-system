import { SidebarItem, NavItem, ThemeConfig, DocsConfig } from './types/docs-config';

const themeConfig: ThemeConfig = {
  logo: '/logo.svg',
  siteTitle: 'Nuxt Docs',
  nav: [
    { text: 'Guide', link: '/guide/' },
    { text: 'Design System', link: '/design-system/' },
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
          { text: 'Customize Theme', link: '/design-system/customize-theme' },
    
        ]
      },
      {
        text: 'Core Components',
        collapsible: true,
        items: [
          { text: 'Buttons', link: '/design-system/buttons' },
          { text: 'Typography', link: '/design-system/typography' },
          { text: 'Cards', link: '/design-system/cards' },
          { text: 'Alerts', link: '/design-system/alerts' },
          { text: 'Badges', link: '/design-system/badges' },
          { text: 'Inputs', link: '/design-system/inputs' },
          { text: 'Checkboxes', link: '/design-system/checkboxes' },
          { text: 'Radio Buttons', link: '/design-system/radio-buttons' },
          { text: 'Select Menus', link: '/design-system/select-menus' },
          { text: 'Toggles', link: '/design-system/toggles' },
          { text: 'Sliders', link: '/design-system/sliders' },
          { text: 'Date Pickers', link: '/design-system/date-pickers' },
          { text: 'File Upload', link: '/design-system/file-upload' },
          { text: 'Tabs', link: '/design-system/tabs' },
          { text: 'Breadcrumbs', link: '/design-system/breadcrumbs' },
          { text: 'Pagination', link: '/design-system/pagination' },
          { text: 'Navbar', link: '/design-system/navbar' },
          { text: 'Sidebar', link: '/design-system/sidebar' },
          { text: 'Menu', link: '/design-system/menu' },
          { text: 'Dropdown', link: '/design-system/dropdown' },
          { text: 'Stepper', link: '/design-system/stepper' },
          { text: 'Modals', link: '/design-system/modals' },
          { text: 'Tooltips', link: '/design-system/tooltips' },
          { text: 'Popovers', link: '/design-system/popovers' },
          { text: 'Progress', link: '/design-system/progress' },
          { text: 'Spinners', link: '/design-system/spinners' },
          { text: 'Skeleton Loaders', link: '/design-system/skeleton-loaders' },
          { text: 'Toast Notifications', link: '/design-system/toast-notifications' },
          { text: 'Snackbars', link: '/design-system/snackbars' },
          { text: 'Tables', link: '/design-system/tables' },
          { text: 'Lists', link: '/design-system/lists' },
          { text: 'Tree View', link: '/design-system/tree-view' },
          { text: 'Timeline', link: '/design-system/timeline' },
          { text: 'Avatars', link: '/design-system/avatars' },
          { text: 'Badges', link: '/design-system/badges' },
          { text: 'Stats Cards', link: '/design-system/stats-cards' },
          { text: 'Charts', link: '/design-system/charts' },
          { text: 'Image Gallery', link: '/design-system/image-gallery' },
          { text: 'Carousel', link: '/design-system/carousel' },
          { text: 'Video Player', link: '/design-system/video-player' },
          { text: 'Audio Player', link: '/design-system/audio-player' },
          { text: 'Icons', link: '/design-system/icons' }
          
        ]
      },
   
     
      {
        text: 'Layout Components',
        collapsible: true,
        items: [
          { text: 'Grid System', link: '/design-system/grid-system' },
          { text: 'Containers', link: '/design-system/containers' },
          { text: 'Dividers', link: '/design-system/dividers' },
          { text: 'Accordion', link: '/design-system/accordion' },
          { text: 'Tabs Panel', link: '/design-system/tabs-panel' },
          { text: 'Split Panes', link: '/design-system/split-panes' },
          { text: 'Masonry Layout', link: '/design-system/masonry-layout' },
          { text: 'Clipboard', link: '/design-system/clipboard' },
          { text: 'Infinite Scroll', link: '/design-system/infinite-scroll' },
          { text: 'Virtual Scroll', link: '/design-system/virtual-scroll' },
          { text: 'Drag and Drop', link: '/design-system/drag-and-drop' },
          { text: 'Resizable', link: '/design-system/resizable' },
          { text: 'Sortable', link: '/design-system/sortable' },
          { text: 'Color Picker', link: '/design-system/color-picker' }
        ]
      },
      {
        text: 'Patterns',
        collapsible: true,
        items: [
          { text: 'Forms', link: '/design-system/patterns/forms' },
          { text: 'Navigation', link: '/design-system/patterns/navigation' },
          { text: 'Layouts', link: '/design-system/patterns/layouts' },
          { text: 'Authentication', link: '/design-system/patterns/authentication' },
          { text: 'Data Tables', link: '/design-system/patterns/data-tables' },
          { text: 'Search', link: '/design-system/patterns/search' },
          { text: 'Filtering', link: '/design-system/patterns/filtering' },
          { text: 'Onboarding', link: '/design-system/patterns/onboarding' },
          { text: 'Empty States', link: '/design-system/patterns/empty-states' },
          { text: 'Error Handling', link: '/design-system/patterns/error-handling' },
          { text: 'Notifications', link: '/design-system/patterns/notifications' },
          { text: 'Wizards', link: '/design-system/patterns/wizards' },
          { text: 'Responsive Design', link: '/design-system/patterns/responsive-design' }
        ]
      },

    ],
    '/showcase/': [
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