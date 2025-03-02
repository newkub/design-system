<template>
  <div 
    class="card"
    :class="[
      `card-${variant}`,
      { 'card-hover': hover }
    ]"
  >
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'bordered', 'elevated'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  }
});

/**
 * @componentMetadata
 * {
 *   "id": "card",
 *   "title": "Card",
 *   "description": "Cards contain content and actions about a single subject.",
 *   "category": "layout",
 *   "tags": ["container", "content"],
 *   "usage": {
 *     "basic": "<Card variant=\"default\">This is a simple card</Card>",
 *     "advanced": "<Card variant=\"elevated\" hover><template #header><div class=\"flex justify-between items-center\"><h3 class=\"font-bold\">Card Title</h3><Badge variant=\"primary\">New</Badge></div></template><p>This is the main content of the card.</p><p>You can add multiple paragraphs or components.</p><template #footer><div class=\"flex justify-end\"><Button variant=\"primary\">Action</Button></div></template></Card>"
 *   },
 *   "props": [
 *     { "name": "variant", "type": "String", "default": "default", "description": "Card style variant (default, bordered, elevated)" },
 *     { "name": "hover", "type": "Boolean", "default": "false", "description": "Whether to show hover effect" }
 *   ],
 *   "slots": [
 *     { "name": "default", "description": "Card content" },
 *     { "name": "header", "description": "Card header content" },
 *     { "name": "footer", "description": "Card footer content" }
 *   ]
 * }
 */
</script>

<style>
.card {
  @apply bg-white rounded-lg overflow-hidden;
}

/* Variants */
.card-default {
  @apply shadow-sm;
}

.card-bordered {
  @apply border border-gray-200;
}

.card-elevated {
  @apply shadow-md;
}

/* Hover effect */
.card-hover {
  @apply transition-shadow duration-200;
}

.card-hover:hover {
  @apply shadow-lg;
}

/* Card sections */
.card-header {
  @apply p-4 border-b border-gray-200;
}

.card-body {
  @apply p-4;
}

.card-footer {
  @apply p-4 border-t border-gray-200;
}
</style>