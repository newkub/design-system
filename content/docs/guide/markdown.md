```md
# Markdown

Learn how to write content using Markdown with enhanced features.

## Basic Markdown

Nuxt Content supports all standard Markdown syntax:

```md
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- List item 1
- List item 2
  - Nested item

1. Ordered item 1
2. Ordered item 2

[Link text](https://example.com)

![Alt text](https://example.com/image.jpg)

> Blockquote text

`Inline code`

```js
// Code block with syntax highlighting
function hello() {
  console.log('Hello world')
}
```

## Frontmatter

You can add metadata to your Markdown files using frontmatter:

```md
---
title: My Page Title
description: Page description for SEO
---

# Content starts here
```

## Vue Components

You can use Vue components directly in your Markdown:

```md
# My Page

<info-box>
  This is a custom component in Markdown
</info-box>

The rest of the Markdown content...
```

## Code Highlighting

Code blocks are automatically highlighted:

```js
// JavaScript code with syntax highlighting
function greeting(name) {
  return `Hello, ${name}!`
}
```

```vue
<!-- Vue component with syntax highlighting -->
<template>
  <div>{{ message }}</div>
</template>

<script setup>
const message = ref('Hello World!')
</script>
```

## Next Steps

Continue to the [Theme Customization](/docs/guide/theme) guide to learn how to customize the appearance of your documentation site.
```