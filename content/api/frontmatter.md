# Frontmatter API

Reference for all frontmatter options available in your Markdown files.

## Basic Frontmatter

Every Markdown file can include frontmatter at the top of the file:

```md
---
title: Page Title
description: Page description for SEO
---
```

## Available Properties

### `title`

The title of the page. Used in:
- Browser tab title
- Search results
- Navigation links (when auto-generated)

```md
---
title: Getting Started with Nuxt Docs
---
```

### `description`

A short description of the page. Used for SEO and social media sharing.

```md
---
description: Learn how to get started with our documentation site built with Nuxt and UnoCSS.
---
```

### `layout`

Specify a custom layout for the page.

```md
---
layout: custom
---
```

### `head`

Additional head tags for the page.

```md
---
head:
  meta:
    - name: 'keywords'
      content: 'nuxt, docs, documentation'
  link:
    - rel: 'canonical'
      href: 'https://example.com/guide'
---
```

### `navigation`

Control how the page appears in navigation.

```md
---
navigation:
  title: 'Custom Nav Title' # Override the title in navigation
  icon: 'carbon:document' # Icon for the navigation item
  order: 2 # Order in the navigation
---
```

### `toc`

Control the table of contents.

```md
---
toc:
  enabled: true
  maxDepth: 3
---
```

### `draft`

Mark a page as draft (not shown in production).

```md
---
draft: true
---
```

## Example with Multiple Properties

```md
---
title: Advanced Configuration
description: Learn about advanced configuration options for your documentation site.
layout: article
navigation:
  title: 'Advanced Config'
  icon: 'carbon:settings'
  order: 5
toc:
  enabled: true
  maxDepth: 3
---

# Advanced Configuration

Content starts here...
```