<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  title?: string
  icon?: string
}>(), {
  variant: 'default',
  title: '',
  icon: ''
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return {
        container: 'bg-primary-50 border-primary text-primary-800',
        icon: 'text-primary'
      }
    case 'secondary':
      return {
        container: 'bg-secondary-50 border-secondary text-secondary-800',
        icon: 'text-secondary'
      }
    case 'success':
      return {
        container: 'bg-green-50 border-green-500 text-green-800',
        icon: 'text-green-500'
      }
    case 'warning':
      return {
        container: 'bg-yellow-50 border-yellow-500 text-yellow-800',
        icon: 'text-yellow-500'
      }
    case 'danger':
      return {
        container: 'bg-red-50 border-red-500 text-red-800',
        icon: 'text-red-500'
      }
    case 'info':
      return {
        container: 'bg-blue-50 border-blue-500 text-blue-800',
        icon: 'text-blue-500'
      }
    default:
      return {
        container: 'bg-bg-muted border-border text-text-primary',
        icon: 'text-text-secondary'
      }
  }
})

const defaultIcons = {
  default: 'carbon:information',
  primary: 'carbon:information',
  secondary: 'carbon:information',
  success: 'carbon:checkmark-filled',
  warning: 'carbon:warning-filled',
  danger: 'carbon:error-filled',
  info: 'carbon:information-filled'
}

const iconToShow = computed(() => {
  return props.icon || defaultIcons[props.variant]
})
</script>

<template>
  <div 
    class="p-4 rounded-md border-l-4 flex gap-3"
    :class="variantClasses.container"
  >
    <Icon 
      v-if="iconToShow" 
      :icon="iconToShow" 
      class="flex-shrink-0 h-5 w-5 mt-0.5"
      :class="variantClasses.icon"
    />
    
    <div class="flex-1">
      <h5 v-if="title" class="font-medium mb-1">{{ title }}</h5>
      <div class="text-sm">
        <slot />
      </div>
    </div>
  </div>
</template>