<template>
  <button 
    class="button"
    :class="[
      `button-${variant}`,
      `button-${size}`,
      { 'button-full': full },
      { 'button-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots['icon-left']" class="button-icon button-icon-left">
      <slot name="icon-left"></slot>
    </span>
    
    <span class="button-content">
      <slot></slot>
    </span>
    
    <span v-if="$slots['icon-right']" class="button-icon button-icon-right">
      <slot name="icon-right"></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
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

/**
 * @componentMetadata
 * {
 *   "id": "button",
 *   "title": "Button",
 *   "description": "Buttons allow users to trigger an action or event with a single click.",
 *   "category": "form",
 *   "tags": ["interactive", "action"],
 *   "usage": {
 *     "basic": "<Button variant=\"primary\">Click Me</Button>",
 *     "advanced": "<Button variant=\"primary\" size=\"lg\" @click=\"handleClick\"><template #icon-left><div class=\"i-carbon-add\"></div></template>Add New Item</Button>"
 *   },
 *   "props": [
 *     { "name": "variant", "type": "String", "default": "primary", "description": "Button style variant (primary, secondary, outline, ghost, danger)" },
 *     { "name": "size", "type": "String", "default": "md", "description": "Button size (sm, md, lg)" },
 *     { "name": "disabled", "type": "Boolean", "default": "false", "description": "Whether the button is disabled" },
 *     { "name": "full", "type": "Boolean", "default": "false", "description": "Whether the button takes full width" }
 *   ],
 *   "events": [
 *     { "name": "click", "description": "Emitted when the button is clicked" }
 *   ],
 *   "slots": [
 *     { "name": "default", "description": "Button content" },
 *     { "name": "icon-left", "description": "Icon to display before the button text" },
 *     { "name": "icon-right", "description": "Icon to display after the button text" }
 *   ]
 * }
 */
</script>

<style>
.button {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
}

/* Variants */
.button-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.button-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500;
}

.button-outline {
  @apply border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500;
}

.button-ghost {
  @apply bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500;
}

.button-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

/* Sizes */
.button-sm {
  @apply text-sm px-3 py-1.5 rounded;
}

.button-md {
  @apply text-base px-4 py-2;
}

.button-lg {
  @apply text-lg px-6 py-3;
}

/* Full width */
.button-full {
  @apply w-full;
}

/* Disabled state */
.button-disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

/* Icon positioning */
.button-icon {
  @apply flex items-center justify-center;
}

.button-icon-left {
  @apply mr-2;
}

.button-icon-right {
  @apply ml-2;
}
</style>