# Components

This section documents the available UI components in the framework.

## Button

A customizable button component.

### Usage

```vue
<template>
  <Button variant="primary" size="md">Click me</Button>
</template>
```

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | The visual style of the button |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the button |
| disabled | `boolean` | `false` | Whether the button is disabled |

### Events

| Name | Description |
|------|-------------|
| click | Emitted when the button is clicked |

## Card

A container component for displaying content in a card format.

### Usage

```vue
<template>
  <Card title="My Card">
    <p>This is the card content.</p>
  </Card>
</template>
```

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | `''` | The title of the card |
| bordered | `boolean` | `true` | Whether to show a border around the card |

### Slots

| Name | Description |
|------|-------------|
| default | The content of the card |
| header | Custom header content (overrides the title prop) |
| footer | Footer content for the card |