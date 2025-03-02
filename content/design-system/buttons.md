# Buttons

Buttons are used to trigger actions or events.

## Basic Usage

```vue
<DsButton>Default Button</DsButton>
```

## Variants

We provide several button variants to express different actions:

```vue
<DsButton variant="primary">Primary</DsButton>
<DsButton variant="secondary">Secondary</DsButton>
<DsButton variant="outline">Outline</DsButton>
<DsButton variant="ghost">Ghost</DsButton>
<DsButton variant="danger">Danger</DsButton>
```

## Sizes

Buttons come in different sizes:

```vue
<DsButton size="sm">Small</DsButton>
<DsButton size="md">Medium</DsButton>
<DsButton size="lg">Large</DsButton>
```

## Full Width

Make a button take the full width of its container:

```vue
<DsButton full>Full Width Button</DsButton>
```

## Disabled State

Disable a button to indicate that it's not interactive:

```vue
<DsButton disabled>Disabled Button</DsButton>
```

## With Icons

Add icons to your buttons:

```vue
<DsButton>
  <template #icon-left>
    <div class="i-carbon-add"></div>
  </template>
  Add Item
</DsButton>

<DsButton>
  Next
  <template #icon-right>
    <div class="i-carbon-arrow-right"></div>
  </template>
</DsButton>
```