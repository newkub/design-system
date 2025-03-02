# Design System

Welcome to our design system documentation. This section covers all the components, styles, and guidelines for building consistent user interfaces.

## Components

Our design system includes a variety of components that can be used to build interfaces:

- Buttons
- Cards
- Alerts
- Badges
- Typography
- Tabs
- Inputs
- And more...

## Usage

Import components from the design system:

```vue
<script setup>
import { DsButton, DsCard } from '~/components/design-system';
</script>

<template>
  <DsCard variant="bordered">
    <template #header>
      <h3>Card Title</h3>
    </template>
    
    <p>Card content goes here.</p>
    
    <template #footer>
      <DsButton>Click Me</DsButton>
    </template>
  </DsCard>
</template>
```

## Guidelines

Follow our design guidelines to ensure consistency across your application.