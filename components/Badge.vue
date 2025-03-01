<template>
  <span class="px-2 py-0.5 text-xs font-medium rounded-full" :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * @component Badge
 * @description A small badge component for displaying status, labels, or counts
 * @example
 * <Badge type="info">New</Badge>
 * <Badge type="success">Completed</Badge>
 * <Badge type="warning">Pending</Badge>
 * <Badge type="error">Failed</Badge>
 */

interface BadgeProps {
  /**
   * Type of badge that determines its appearance
   * @values info, success, warning, error
   */
  type?: 'info' | 'success' | 'warning' | 'error';
}

const props = withDefaults(defineProps<BadgeProps>(), {
  type: 'info'
})

const badgeClasses = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case 'success':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    case 'error':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  }
})
</script>