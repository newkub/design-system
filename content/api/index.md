# API Reference

Welcome to the API reference documentation. This section provides detailed information about the API and components available in the framework.

## Overview

The API is organized into several categories:

- **Components**: UI components for building interfaces
- **Composables**: Reusable Vue composition functions
- **Utilities**: Helper functions for common tasks

## Usage

Import and use the components and functions in your Vue components:

```vue
<script setup>
import { useMyFeature } from '~/composables/useMyFeature'

const { data, loading } = useMyFeature()
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>{{ data }}</div>
  </div>
</template>
```

## API Stability

The API follows semantic versioning:

- **Stable**: APIs marked as stable will not change within a major version
- **Experimental**: APIs marked as experimental may change in minor versions
- **Deprecated**: APIs marked as deprecated will be removed in a future version

## Next Steps

Explore the [Components](/api/components) section to learn about available UI components.