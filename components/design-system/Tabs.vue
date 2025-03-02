<template>
  <div class="ds-tabs">
    <div class="ds-tabs__header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="ds-tabs__tab"
        :class="{ 'ds-tabs__tab--active': modelValue === index }"
        @click="$emit('update:modelValue', index)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="ds-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Number,
    default: 0
  }
});

defineEmits(['update:modelValue']);
</script>

<style>
.ds-tabs {
  width: 100%;
}

.ds-tabs__header {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.ds-tabs__tab {
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ds-tabs__tab:hover {
  color: #3b82f6;
}

.ds-tabs__tab--active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.ds-tabs__content {
  padding: 1rem 0;
}
</style>