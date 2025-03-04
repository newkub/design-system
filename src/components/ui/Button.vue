<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link'
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: boolean
}>(), {
  variant: 'primary',
  size: 'default',
  disabled: false,
  type: 'button',
  icon: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed(() => {
  const classes = ['inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2']
  
  // Size classes
  if (props.size === 'small') {
    classes.push('text-sm h-8 px-3 rounded-md')
  } else if (props.size === 'large') {
    classes.push('text-base h-12 px-6 rounded-lg')
  } else {
    classes.push('text-sm h-10 px-4 rounded-md')
  }
  
  // Icon button
  if (props.icon) {
    if (props.size === 'small') {
      classes.push('h-8 w-8 p-0')
    } else if (props.size === 'large') {
      classes.push('h-12 w-12 p-0')
    } else {
      classes.push('h-10 w-10 p-0')
    }
  }
  
  // Variant classes
  if (props.variant === 'primary') {
    classes.push('bg-primary text-text-inverted hover:bg-primary-700 active:bg-primary-800')
  } else if (props.variant === 'secondary') {
    classes.push('bg-bg-muted text-text-primary hover:bg-bg-muted/80 active:bg-bg-muted/90')
  } else if (props.variant === 'outline') {
    classes.push('border border-border bg-transparent hover:bg-bg-muted active:bg-bg-muted/80')
  } else if (props.variant === 'destructive') {
    classes.push('bg-red-500 text-white hover:bg-red-600 active:bg-red-700')
  } else if (props.variant === 'ghost') {
    classes.push('bg-transparent hover:bg-bg-muted active:bg-bg-muted/80')
  } else if (props.variant === 'link') {
    classes.push('bg-transparent text-primary underline-offset-4 hover:underline')
  }
  
  // Disabled state
  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed pointer-events-none')
  }
  
  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>