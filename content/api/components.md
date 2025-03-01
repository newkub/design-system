# Components API

Reference for all built-in components available in your documentation site.

## Content Components

These components are provided by the Nuxt Content module and can be used in your Markdown files.

### `<ContentDoc>`

Renders a document from the content directory.

```vue
<ContentDoc path="/guide/getting-started" />
```

### `<ContentList>`

Lists documents from the content directory.

```vue
<ContentList path="/guide" v-slot="{ list }">
  <div v-for="article in list" :key="article._path">
    <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
  </div>
</ContentList>
```

### `<ContentQuery>`

Query documents from the content directory.

```vue
<ContentQuery path="/guide" :where="{ tags: 'important' }" v-slot="{ data }">
  <div v-for="article in data" :key="article._path">
    <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
  </div>
</ContentQuery>
```

### `<ContentRenderer>`

Renders a content document.

```vue
<ContentRenderer :value="document" />
```

### `<ContentNavigation>`

Generates navigation from content.

```vue
<ContentNavigation v-slot="{ navigation }">
  <div v-for="link in navigation" :key="link._path">
    <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
  </div>
</ContentNavigation>
```

## Custom Components

These are custom components included in this documentation site.

### `<InfoBox>`

Displays information in a highlighted box.

```vue
<info-box>
  This is important information.
</info-box>
```

### `<CodeGroup>`

Groups multiple code blocks together with tabs.

```vue
<code-group>
  <code-block label="npm" active>
    npm install package-name
  </code-block>
  <code-block label="yarn">
    yarn add package-name
  </code-block>
  <code-block label="pnpm">
    pnpm add package-name
  </code-block>
</code-group>
```

### `<Alert>`

Displays an alert message.

```vue
<alert type="warning">
  This feature is experimental.
</alert>
```

Available types: `info`, `success`, `warning`, `error`

### `<Badge>`

Displays a small badge.

```vue
<badge type="info">New</badge>
```

Available types: `info`, `success`, `warning`, `error`

## Usage in Markdown

You can use these components directly in your Markdown files:

```md
# My Page

<info-box>
  This is important information.
</info-box>

## Installation

<code-group>
  <code-block label="npm" active>
    npm install my-package
  </code-block>
  <code-block label="yarn">
    yarn add my-package
  </code-block>
</code-group>

<alert type="warning">
  This feature is experimental.
</alert>

## Features

- Feature one <badge type="info">New</badge>
- Feature two
- Feature three <badge type="success">Updated</badge>
```