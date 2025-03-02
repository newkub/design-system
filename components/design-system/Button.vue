<template>
  <button
    :class="[
      'ds-button',
      `ds-button--${variant}`,
      `ds-button--${size}`,
      { 'ds-button--full': full }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  full: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>

<style>
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.ds-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.ds-button--primary {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
}
.ds-button--primary:hover:not(:disabled) {
  background-color: #2563eb;
  border-color: #2563eb;
}

.ds-button--secondary {
  background-color: #f3f4f6;
  color: #1f2937;
  border: 1px solid #e5e7eb;
}
.ds-button--secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.ds-button--outline {
  background-color: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}
.ds-button--outline:hover:not(:disabled) {
  background-color: rgba(59, 130, 246, 0.05);
}

.ds-button--ghost {
  background-color: transparent;
  color: #1f2937;
  border: 1px solid transparent;
}
.ds-button--ghost:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.ds-button--danger {
  background-color: #ef4444;
  color: white;
  border: 1px solid #ef4444;
}
.ds-button--danger:hover:not(:disabled) {
  background-color: #dc2626;
  border-color: #dc2626;
}

/* Sizes */
.ds-button--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.ds-button--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.ds-button--lg {
  padding: 0.625rem 1.25rem;
  font-size: 1.125rem;
}

.ds-button--full {
  width: 100%;
}
</style>