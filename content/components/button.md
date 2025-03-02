# Button Component

Buttons allow users to trigger an action or event with a single click.

**Category:** form

**Tags:** interactive, action

## Usage

### Basic

```vue
<DsButton variant="primary">Click Me</DsButton>
```

### Advanced

```vue
<DsButton 
  variant="primary" 
  size="lg" 
  @click="handleClick"
>
  <template #icon-left>
    <div class="i-carbon-add"></div>
  </template>
  Add New Item
</DsButton>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `String` | `primary` | Button style variant (primary, secondary, outline, ghost, danger) |
| `size` | `String` | `md` | Button size (sm, md, lg) |
| `disabled` | `Boolean` | `false` | Whether the button is disabled |
| `full` | `Boolean` | `false` | Whether the button takes full width |

## Events

| Name | Description |
| ---- | ----------- |
| `click` | Emitted when the button is clicked |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | Button content |
| `icon-left` | Icon to display before the button text |
| `icon-right` | Icon to display after the button text |