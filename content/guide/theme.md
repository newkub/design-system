# Theme Customization

Learn how to customize the appearance of your documentation site.

## UnoCSS Customization

You can customize the theme by modifying the `uno.config.ts` file:

```ts
// uno.config.ts
export default defineConfig({
  // ...
  theme: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  },
  shortcuts: {
    // Custom shortcuts
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-primary': 'bg-primary-500 text-white hover:bg-primary-600',
  }
})
```

## Layout Customization

You can customize the layout by modifying the components in the `layouts` and `components` directories:

- `layouts/default.vue` - Main layout
- `components/SiteHeader.vue` - Header component
- `components/SiteSidebar.vue` - Sidebar component
- `components/SiteFooter.vue` - Footer component

## Dark Mode

The site supports dark mode out of the box. You can customize the dark mode appearance by using the `dark:` prefix in your UnoCSS classes:

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Dark mode compatible content
</div>
```

## Custom Components

You can create custom components to use in your Markdown content:

1. Create a component in the `components` directory:

```vue
<!-- components/InfoBox.vue -->
<template>
  <div class="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg my-4">
    <div class="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium mb-2">
      <div class="i-carbon-information"></div>
      <span>Information</span>
    </div>
    <div class="text-blue-700 dark:text-blue-300">
      <slot />
    </div>
  </div>
</template>
```

2. Use it in your Markdown:

```md
<info-box>
  This is important information that needs to be highlighted.
</info-box>
```

## Next Steps

Continue to the [Deployment](/guide/deployment) guide to learn how to deploy your documentation site.