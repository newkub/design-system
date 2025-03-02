---
title: Alert Component
description: Displays an alert message with different styles based on type
---

# Alert

Alerts display important messages to users, with different styles based on the type of message.

## Examples

<div class="space-y-4">
  <Alert type="info">This is an information alert.</Alert>
  <Alert type="success">This is a success alert.</Alert>
  <Alert type="warning">This is a warning alert.</Alert>
  <Alert type="error">This is an error alert.</Alert>
</div>

## Usage

Alerts should be used to provide feedback to users or highlight important information. Different types of alerts can be used to convey different levels of importance:

- **Info**: For general information or tips
- **Success**: For successful operations or positive feedback
- **Warning**: For potential issues or things to be aware of
- **Error**: For errors or critical issues that need attention

```vue
<Alert type="info">This is an information alert.</Alert>
<Alert type="success">This is a success alert.</Alert>
<Alert type="warning">This is a warning alert.</Alert>
<Alert type="error">This is an error alert.</Alert>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | String | 'info' | Type of alert: 'info', 'success', 'warning', 'error' |
| title | String | Based on type | Custom title for the alert |

## Slots

| Name | Description |
| ---- | ----------- |
| default | Content of the alert |

## Custom Examples

### With Custom Title

<Alert type="info" title="Custom Information">This alert has a custom title.</Alert>

```vue
<Alert type="info" title="Custom Information">This alert has a custom title.</Alert>
```

### With Rich Content

<Alert type="warning">
  <p>This is a warning with <strong>rich content</strong>.</p>
  <ul class="list-disc pl-6 mt-2">
    <li>Item one</li>
    <li>Item two</li>
  </ul>
</Alert>

```vue
<Alert type="warning">
  <p>This is a warning with <strong>rich content</strong>.</p>
  <ul class="list-disc pl-6 mt-2">
    <li>Item one</li>
    <li>Item two</li>
  </ul>
</Alert>
```

## Accessibility

The Alert component follows accessibility best practices:

- Uses semantic colors to convey meaning
- Maintains sufficient color contrast for readability
- Includes clear, descriptive titles
- Structured with proper heading hierarchy

## Design Guidelines

### Placement

Place alerts at the top of the content they relate to. For form validation, place alerts near the relevant form fields.

### Content

Keep alert messages clear and concise. Include specific information about what happened and what the user should do next.

### Color Usage

Use colors consistently to maintain meaning across the application:

- <span class="text-blue-600 dark:text-blue-400">Blue</span> for information
- <span class="text-green-600 dark:text-green-400">Green</span> for success
- <span class="text-yellow-600 dark:text-yellow-400">Yellow</span> for warnings
- <span class="text-red-600 dark:text-red-400">Red</span> for errors