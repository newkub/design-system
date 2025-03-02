<template>
  <div class="ds-input-wrapper">
    <label v-if="label" :for="id" class="ds-input__label">
      {{ label }}
      <span v-if="required" class="ds-input__required">*</span>
    </label>
    <div class="ds-input__container" :class="{ 'ds-input__container--error': error }">
      <div v-if="$slots['prefix']" class="ds-input__prefix">
        <slot name="prefix"></slot>
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="ds-input"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div v-if="$slots['suffix']" class="ds-input__suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <p v-if="error" class="ds-input__error">{{ error }}</p>
    <p v-else-if="hint" class="ds-input__hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>

<style>
.ds-input-wrapper {
  margin-bottom: 1rem;
}

.ds-input__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.ds-input__required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.ds-input__container {
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.ds-input__container:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.ds-input__container--error {
  border-color: #ef4444;
}

.ds-input__container--error:focus-within {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.ds-input {
  flex: 1;
  padding: 0.625rem 0.75rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #1f2937;
  width: 100%;
}

.ds-input::placeholder {
  color: #9ca3af;
}

.ds-input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.ds-input__prefix,
.ds-input__suffix {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  color: #6b7280;
  background-color: #f9fafb;
}

.ds-input__error {
  margin-top: 0.375rem;
  font-size: 0.875rem;
  color: #ef4444;
}

.ds-input__hint {
  margin-top: 0.375rem;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>