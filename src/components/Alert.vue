<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  type?: 'info' | 'success' | 'warning' | 'danger'
  dismissible?: boolean
  title?: string
}>()

const visible = ref(true)

const close = () => {
  visible.value = false
}
</script>

<template>
  <div v-if="visible" :class="`alert-${type || 'info'} flex items-start`">
    <div class="flex-grow">
      <div v-if="title" class="font-bold mb-1">{{ title }}</div>
      <div>
        <slot></slot>
      </div>
    </div>
    <button 
      v-if="dismissible" 
      @click="close" 
      class="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      aria-label="Close"
    >
      <div class="i-mdi-close"></div>
    </button>
  </div>
</template>