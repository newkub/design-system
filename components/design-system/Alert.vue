<template>
  <div 
    class="ds-alert"
    :class="`ds-alert--${type}`"
    role="alert"
  >
    <div class="ds-alert__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div v-else-if="type" class="ds-alert__icon">
      <div v-if="type === 'info'" class="i-carbon-information text-xl"></div>
      <div v-else-if="type === 'success'" class="i-carbon-checkmark-filled text-xl"></div>
      <div v-else-if="type === 'warning'" class="i-carbon-warning text-xl"></div>
      <div v-else-if="type === 'error'" class="i-carbon-warning-alt text-xl"></div>
    </div>
    <div class="ds-alert__content">
      <div v-if="title" class="ds-alert__title">{{ title }}</div>
      <div class="ds-alert__message">
        <slot></slot>
      </div>
    </div>
    <button 
      v-if="dismissible" 
      class="ds-alert__close"
      @click="$emit('dismiss')"
      aria-label="Close alert"
    >
      <div class="i-carbon-close text-lg"></div>
    </button>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  }
});

defineEmits(['dismiss']);
</script>

<style>
.ds-alert {
  display: flex;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.ds-alert__icon {
  flex-shrink: 0;
  margin-right: 0.75rem;
  display: flex;
  align-items: flex-start;
}

.ds-alert__content {
  flex: 1;
}

.ds-alert__title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.ds-alert__close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  opacity: 0.7;
}

.ds-alert__close:hover {
  opacity: 1;
}

/* Alert types */
.ds-alert--info {
  background-color: #eff6ff;
  border-left: 4px solid #3b82f6;
  color: #1e40af;
}

.ds-alert--success {
  background-color: #f0fdf4;
  border-left: 4px solid #22c55e;
  color: #166534;
}

.ds-alert--warning {
  background-color: #fffbeb;
  border-left: 4px solid #f59e0b;
  color: #92400e;
}

.ds-alert--error {
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  color: #b91c1c;
}
</style>