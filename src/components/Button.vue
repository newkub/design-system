<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline-primary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const getButtonClass = (variant: string = 'primary', size: string = 'md') => {
  const sizeClass = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  }[size]

  return `btn-${variant} ${sizeClass} ${variant.includes('outline') ? '' : 'text-white'}`
}
</script>

<template>
  <button
    :class="getButtonClass(variant, size)"
    :disabled="disabled"
    :type="type || 'button'"
    @click="emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>