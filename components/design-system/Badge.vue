<template>
  <span 
    class="ds-badge"
    :class="[
      `ds-badge--${variant}`,
      `ds-badge--${size}`
    ]"
  >
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});
</script>

<style>
.ds-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 500;
}

/* Sizes */
.ds-badge--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}

.ds-badge--md {
  padding: 0.25rem 0.625rem;
  font-size: 0.875rem;
}

.ds-badge--lg {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

/* Variants */
.ds-badge--primary {
  background-color: #3b82f6;
  color: white;
}

.ds-badge--secondary {
  background-color: #6b7280;
  color: white;
}

.ds-badge--success {
  background-color: #22c55e;
  color: white;
}

.ds-badge--warning {
  background-color: #f59e0b;
  color: white;
}

.ds-badge--danger {
  background-color: #ef4444;
  color: white;
}

.ds-badge--info {
  background-color: #0ea5e9;
  color: white;
}
</style>