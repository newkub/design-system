<template>
  <component 
    :is="tag" 
    class="text"
    :class="[
      `text-${variant}`, 
      `text-${weight}`,
      { 'text-truncate': truncate }
    ]"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  tag: {
    type: String,
    default: 'p',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].includes(value)
  },
  variant: {
    type: String,
    default: 'body',
    validator: (value) => ['display', 'h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'].includes(value)
  },
  weight: {
    type: String,
    default: 'normal',
    validator: (value) => ['light', 'normal', 'medium', 'semibold', 'bold'].includes(value)
  },
  truncate: {
    type: Boolean,
    default: false
  }
});
</script>

<script>
import type { ComponentMetadataDefinition } from '~/types/component-metadata';

// Define component metadata using TypeScript
export const componentMetadata = {
  title: "Typography",
  description: "Typography components for displaying text with various styles.",
  category: "data-display",
  tags: ["text", "heading"],
  usage: {
    basic: "<Text variant=\"h1\" weight=\"bold\">Heading 1</Text>",
    advanced: "<div><Text variant=\"h2\" weight=\"semibold\">Section Title</Text><Text variant=\"body\">This is a paragraph of text that demonstrates the body text style.</Text><Text variant=\"small\" weight=\"medium\">This is smaller text that might be used for captions or notes.</Text></div>"
  },
  props: [
    { name: "tag", type: "String", default: "p", description: "HTML tag to render" },
    { name: "variant", type: "String", default: "body", description: "Typography variant (display, h1, h2, h3, h4, body, small, caption)" },
    { name: "weight", type: "String", default: "normal", description: "Font weight (light, normal, medium, semibold, bold)" },
    { name: "truncate", type: "Boolean", default: "false", description: "Whether to truncate text with ellipsis" }
  ]
} as ComponentMetadataDefinition;
</script>

<style>
/* Typography variants */
.text-display {
  @apply text-4xl sm:text-5xl leading-tight;
}

.text-h1 {
  @apply text-3xl sm:text-4xl leading-tight;
}

.text-h2 {
  @apply text-2xl sm:text-3xl leading-tight;
}

.text-h3 {
  @apply text-xl sm:text-2xl leading-snug;
}

.text-h4 {
  @apply text-lg sm:text-xl leading-snug;
}

.text-body {
  @apply text-base leading-normal;
}

.text-small {
  @apply text-sm leading-normal;
}

.text-caption {
  @apply text-xs leading-normal;
}

/* Font weights */
.text-light {
  @apply font-light;
}

.text-normal {
  @apply font-normal;
}

.text-medium {
  @apply font-medium;
}

.text-semibold {
  @apply font-semibold;
}

.text-bold {
  @apply font-bold;
}

/* Truncate */
.text-truncate {
  @apply truncate;
}
</style>