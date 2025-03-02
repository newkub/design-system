<template>
  <button 
    class="button"
    :class="[
      `button-${variant}`, 
      `button-${size}`,
      { 'button-full': full, 'button-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="$slots['icon-left']" class="button-icon-left">
      <slot name="icon-left"></slot>
    </span>
    <span class="button-content">
      <slot></slot>
    </span>
    <span v-if="$slots['icon-right']" class="button-icon-right">
      <slot name="icon-right"></slot>
    </span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  full: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>

<script>
import type { ComponentMetadataDefinition } from '~/types/component-metadata';

// Define component metadata using TypeScript
export const componentMetadata = {
  title: "Button",
  description: "Buttons allow users to trigger an action or event with a single click.",
  category: "form",
  tags: ["interactive", "action"],
  usage: {
    basic: "<Button variant=\"primary\">Click Me</Button>",
    advanced: "<Button variant=\"primary\" size=\"lg\" @click=\"handleClick\"><template #icon-left><div class=\"i-carbon-add\"></div></template>Add New Item</Button>"
  },
  props: [
    { name: "variant", type: "String", default: "primary", description: "Button style variant (primary, secondary, outline, ghost, danger)" },
    { name: "size", type: "String", default: "md", description: "Button size (sm, md, lg)" },
    { name: "disabled", type: "Boolean", default: "false", description: "Whether the button is disabled" },
    { name: "full", type: "Boolean", default: "false", description: "Whether the button takes full width" }
  ],
  events: [
    { name: "click", description: "Emitted when the button is clicked" }
  ],
  slots: [
    { name: "default", description: "Button content" },
    { name: "icon-left", description: "Icon to display before the button text" },
    { name: "icon-right", description: "Icon to display after the button text" }
  ]
} as ComponentMetadataDefinition;
</script>

<style>
.button {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
}

/* Button sizes */
.button-sm {
  @apply text-sm px-3 py-1.5;
}

.button-md {
  @apply text-sm px-4 py-2;
}

.button-lg {
  @apply text-base px-5 py-2.5;
}

/* Button variants */
.button-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.button-secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500;
}

.button-outline {
  @apply border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-blue-500;
}

.button-ghost {
  @apply bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500;
}

.button-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

/* Button states */
.button-disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

.button-full {
  @apply w-full;
}

/* Button icon positioning */
.button-icon-left {
  @apply mr-2 -ml-1;
}

.button-icon-right {
  @apply ml-2 -mr-1;
}
</style>