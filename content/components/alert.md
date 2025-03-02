# Alert Component

Alerts display important messages to the user.

**Category:** feedback

**Tags:** notification, message

## Usage

### Basic

```vue
<DsAlert type="info" title="Information">
  This is an informational alert
</DsAlert>
```

### Advanced

```vue
<DsAlert 
  type="warning" 
  title="Warning" 
  dismissible 
  @dismiss="handleDismiss"
>
  <template #icon>
    <div class="i-carbon-warning-alt"></div>
  </template>
  This is a custom warning alert
</DsAlert>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `type` | `String` | `info` | Alert type (info, success, warning, error) |
| `title` | `String` | `""` | Alert title |
| `dismissible` | `Boolean` | `false` | Whether the alert can be dismissed |

## Events

| Name | Description |
| ---- | ----------- |
| `dismiss` | Emitted when the alert is dismissed |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` | Alert content |
| `icon` | Custom icon for the alert |