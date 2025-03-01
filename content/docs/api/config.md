```md
# Configuration API

Reference for all configuration options available in your documentation site.

## Nuxt Configuration

### `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  // Modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
  ],
  
  // Content module configuration
  content: {
    // Syntax highlighting theme
    highlight: {
      theme: 'github-light',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue']
    },
    // Document-driven mode
    documentDriven: true
  },
  
  // Color mode configuration
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  
  // UnoCSS configuration
  unocss: {
    preflight: true,
  },
  
  // App configuration
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
```

## UnoCSS Configuration

### `uno.config.ts`

```ts
import { defineConfig, presetUno, presetTypography, presetWebFonts, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'Fira Code:400,500,600'
      }
    })
  ],
  theme: {
    colors: {
      primary: {
        // Custom color palette
      }
    }
  },
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md transition-colors duration-200',
    'btn-primary': 'bg-primary-500 text-white hover:bg-primary-600',
    'btn-outline': 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50',
  }
})
```
```