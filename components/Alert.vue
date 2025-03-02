<template>
  <div 
    class="flex p-4 rounded-md mb-4"
    :class="`alert-${type}`"
    role="alert"
  >
    <div v-if="$slots.icon" class="flex-shrink-0 mr-3 flex items-start">
      <slot name="icon"></slot>
    </div>
    <div v-else-if="type" class="flex-shrink-0 mr-3 flex items-start">
      <div v-if="type === 'info'" class="i-carbon-information text-xl"></div>
      <div v-else-if="type === 'success'" class="i-carbon-checkmark-filled text-xl"></div>
      <div v-else-if="type === 'warning'" class="i-carbon-warning text-xl"></div>
      <div v-else-if="type === 'error'" class="i-carbon-warning-alt text-xl"></div>
    </div>
    <div class="flex-1">
      <div v-if="title" class="font-semibold mb-1">{{ title }}</div>
      <div>
        <slot></slot>
      </div>
    </div>
    <button 
      v-if="dismissible" 
      class="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center opacity-70 hover:opacity-100"
      @click="$emit('dismiss')"
      aria-label="Close alert"
    >
      <div class="i-carbon-close text-lg"></div>
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value: string) => ['info', 'success', 'warning', 'error'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  }
});

defineEmits(['dismiss']);

/**
 * @componentMetadata
 * {
 *   "id": "alert",
 *   "title": "Alert",
 *   "description": "Alerts display important messages to the user.",
 *   "category": "feedback",
 *   "tags": ["notification", "message"],
 *   "usage": {
 *     "basic": "<Alert type=\"info\" title=\"Information\">This is an informational alert</Alert>",
 *     "advanced": "<Alert type=\"warning\" title=\"Warning\" dismissible @dismiss=\"handleDismiss\"><template #icon><div class=\"i-carbon-warning-alt\"></div></template>This is a custom warning alert</Alert>"
 *   },
 *   "props": [
 *     { "name": "type", "type": "String", "default": "info", "description": "Alert type (info, success, warning, error)" },
 *     { "name": "title", "type": "String", "default": "\"\"", "description": "Alert title" },
 *     { "name": "dismissible", "type": "Boolean", "default": "false", "description": "Whether the alert can be dismissed" }
 *   ],
 *   "events": [
 *     { "name": "dismiss", "description": "Emitted when the alert is dismissed" }
 *   ],
 *   "slots": [
 *     { "name": "default", "description": "Alert content" },
 *     { "name": "icon", "description": "Custom icon for the alert" }
 *   ]
 * }
 */
</script>

<style>
/* Alert types */
.alert-info {
  @apply bg-blue-50 border-l-4 border-blue-500 text-blue-800;
}

.alert-success {
  @apply bg-green-50 border-l-4 border-green-500 text-green-800;
}

.alert-warning {
  @apply bg-amber-50 border-l-4 border-amber-500 text-amber-800;
}

.alert-error {
  @apply bg-red-50 border-l-4 border-red-500 text-red-800;
}
</style>