<template>
  <div class="p-4 border rounded-lg my-4" :class="alertClasses">
    <div class="flex items-center gap-2 font-medium mb-2" :class="textColorClass">
      <div :class="iconClass"></div>
      <span>{{ title }}</span>
    </div>
    <div :class="textColorClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component Alert
 * @description Displays an alert message with different styles based on type
 * @example
 * <Alert type="info">This is an information message</Alert>
 * <Alert type="success">Operation completed successfully</Alert>
 * <Alert type="warning">Be careful with this action</Alert>
 * <Alert type="error">An error occurred</Alert>
 */

interface AlertProps {
  /**
   * Type of alert that determines its appearance
   * @values info, success, warning, error
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Custom title for the alert
   * If not provided, a default title based on the type will be used
   */
  title?: string;
}

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  title: undefined
})

const alertClasses = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
    case 'success':
      return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800'
    case 'warning':
      return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800'
    case 'error':
      return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'
    default:
      return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
  }
})

const textColorClass = computed(() => {
  switch (props.type) {
    case 'info':
      return 'text-blue-700 dark:text-blue-300'
    case 'success':
      return 'text-green-700 dark:text-green-300'
    case 'warning':
      return 'text-yellow-700 dark:text-yellow-300'
    case 'error':
      return 'text-red-700 dark:text-red-300'
    default:
      return 'text-blue-700 dark:text-blue-300'
  }
})

const iconClass = computed(() => {
  switch (props.type) {
    case 'info':
      return 'i-carbon-information'
    case 'success':
      return 'i-carbon-checkmark-outline'
    case 'warning':
      return 'i-carbon-warning'
    case 'error':
      return 'i-carbon-warning-alt'
    default:
      return 'i-carbon-information'
  }
})

const title = computed(() => {
  if (props.title) return props.title
  
  switch (props.type) {
    case 'info':
      return 'Information'
    case 'success':
      return 'Success'
    case 'warning':
      return 'Warning'
    case 'error':
      return 'Error'
    default:
      return 'Information'
  }
})
</script>