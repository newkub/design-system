# Configuration

Learn how to configure your application to suit your needs.

## Basic Configuration

The main configuration file is `nuxt.config.ts`. Here you can define various options for your application:

```ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'My App',
      meta: [
        { name: 'description', content: 'My app description' }
      ]
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  modules: [
    '@nuxt/content',
    '@unocss/nuxt'
  ]
})
```

## Documentation Configuration

The documentation site is configured through the `docs.config.ts` file:

```ts
export default {
  title: 'My Documentation',
  description: 'Documentation for my project',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/' }
          ]
        }
      ]
    }
  }
}
```

## Environment Variables

You can use environment variables to configure your application for different environments:

```bash
# .env
API_URL=https://api.example.com
```

Access them in your application:

```ts
const apiUrl = process.env.API_URL
```

## Advanced Configuration

For more advanced configuration options, refer to the API documentation.