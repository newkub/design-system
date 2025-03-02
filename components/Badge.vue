<template>
  <span 
    class="badge"
    :class="[`badge-${variant}`, `badge-${size}`]"
  >
    <slot></slot>
  </span>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});
</script>

<script>
import type { ComponentMetadataDefinition } from '~/types/component-metadata';

// Define component metadata using TypeScript
export const componentMetadata = {
  title: "Badge",
  description: "Badges are small status descriptors for UI elements.",
  category: "data-display",
  tags: ["label", "status"],
  usage: {
    basic: "<Badge variant=\"primary\">New</Badge>",
    advanced: "<Badge variant=\"success\" size=\"lg\">Completed</Badge>"
  },
  props: [
    { name: "variant", type: "String", default: "primary", description: "Badge style variant (primary, secondary, success, warning, danger, info)" },
    { name: "size", type: "String", default: "md", description: "Badge size (sm, md, lg)" }
  ]
} as ComponentMetadataDefinition;
</script>

<style>
.badge {
  @apply inline-flex items-center justify-center font-medium rounded-full;
}

/* Badge sizes */
.badge-sm {
  @apply text-xs px-2 py-0.5;
}

.badge-md {
  @apply text-sm px-2.5 py-0.5;
}

.badge-lg {
  @apply text-sm px-3 py-1;
}

/* Badge variants */
.badge-primary {
  @apply bg-blue-100 text-blue-800;
}

.badge-secondary {
  @apply bg-gray-100 text-gray-800;
}

.badge-success {
  @apply bg-green-100 text-green-800;
}

.badge-warning {
  @apply bg-amber-100 text-amber-800;
}

.badge-danger {
  @apply bg-red-100 text-red-800;
}

.badge-info {
  @apply bg-sky-100 text-sky-800;
}
</style>