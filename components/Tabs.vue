<template>
  <div class="tabs">
    <div class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="tabs-tab"
        :class="{ 'tabs-tab-active': modelValue === index }"
        @click="$emit('update:modelValue', index)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  tabs: {
    type: Array as () => string[],
    required: true
  },
  modelValue: {
    type: Number,
    default: 0
  }
});

defineEmits(['update:modelValue']);

/**
 * @componentMetadata
 * {
 *   "id": "tabs",
 *   "title": "Tabs",
 *   "description": "Tabs organize content into separate views which users can switch between.",
 *   "category": "navigation",
 *   "tags": ["navigation", "content"],
 *   "usage": {
 *     "basic": "<Tabs :tabs=\"['Tab 1', 'Tab 2']\" v-model=\"activeTab\" />",
 *     "advanced": "<Tabs :tabs=\"['Account', 'Profile', 'Settings']\" v-model=\"activeTab\" /><div v-if=\"activeTab === 0\">Account content here</div><div v-else-if=\"activeTab === 1\">Profile content here</div><div v-else-if=\"activeTab === 2\">Settings content here</div>"
 *   },
 *   "props": [
 *     { "name": "tabs", "type": "Array", "default": "[]", "description": "Array of tab names" },
 *     { "name": "modelValue", "type": "Number", "default": "0", "description": "Index of the active tab (v-model)" }
 *   ],
 *   "events": [
 *     { "name": "update:modelValue", "description": "Emitted when the active tab changes" }
 *   ]
 * }
 */
</script>

<style>
.tabs {
  @apply w-full;
}

.tabs-header {
  @apply flex border-b border-gray-200 mb-4;
}

.tabs-tab {
  @apply py-3 px-4 bg-transparent border-none border-b-2 border-transparent font-medium text-gray-500 cursor-pointer transition-all hover:text-blue-500;
}

.tabs-tab-active {
  @apply text-blue-500 border-b-blue-500;
}

.tabs-content {
  @apply py-4;
}
</style>