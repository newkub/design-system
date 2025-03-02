<template>
  <div 
    class="ds-card"
    :class="[
      `ds-card--${variant}`,
      { 'ds-card--hover': hover }
    ]"
  >
    <div v-if="$slots.header" class="ds-card__header">
      <slot name="header"></slot>
    </div>
    <div class="ds-card__body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="ds-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered', 'elevated'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  }
});
</script>

<style>
.ds-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
}

.ds-card--default {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.ds-card--bordered {
  border: 1px solid #e5e7eb;
}

.ds-card--elevated {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.ds-card--hover:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.ds-card__header {
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.ds-card__body {
  padding: 1.25rem;
}

.ds-card__footer {
  padding: 1.25rem;
  border-top: 1px solid #e5e7eb;
}
</style>