```md
# Configuration

Learn how to configure your documentation site to match your needs.

## Nuxt Configuration

The main configuration file is `nuxt.config.ts`. Here you can configure various aspects of your Nuxt application.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // Your configuration here
})
```

## Content Module

The Content module is configured in the `nuxt.config.ts` file:

```ts
content: {
  highlight: {
    theme: 'github-light',
    preload: ['json', 'js', 'ts', 'html', 'css', 'vue']
  },
  documentDriven: true
}
```

## UnoCSS Configuration

UnoCSS is configured in the `uno.config.ts` file:

```ts
// uno.config.ts
import { defineConfig, presetUno, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    // Other presets
  ],
  // Your configuration here
})
```

## Color Mode

The Color Mode module is configured in the `nuxt.config.ts` file:

```ts
colorMode: {
  classSuffix: '',
  preference: 'light',
  fallback: 'light'
}
```

## Next Steps

Continue to the [Markdown](/docs/guide/markdown) guide to learn how to write content for your documentation site.
```