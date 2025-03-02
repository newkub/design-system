<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    <div class="input-container" :class="{ 'input-container-error': error }">
      <div v-if="$slots['prefix']" class="input-prefix">
        <slot name="prefix"></slot>
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="input-field"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div v-if="$slots['suffix']" class="input-suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <p v-if="error" class="input-error">{{ error }}</p>
    <p v-else-if="hint" class="input-hint">{{ hint }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { ComponentMetadataDefinition } from '~/types/component-metadata';

defineProps({
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

// Define component metadata using TypeScript
export const componentMetadata: ComponentMetadataDefinition = {
  title: "Input",
  description: "Input fields allow users to enter text.",
  category: "form",
  tags: ["form", "text"],
  usage: {
    basic: "<Input v-model=\"inputValue\" label=\"Username\" placeholder=\"Enter your username\" />",
    advanced: "<Input v-model=\"email\" label=\"Email Address\" type=\"email\" placeholder=\"example@domain.com\" required :error=\"emailError\" hint=\"We'll never share your email with anyone else.\"><template #prefix><div class=\"i-carbon-email\"></div></template></Input>"
  },
  props: [
    { name: "modelValue", type: "String/Number", default: "\"\"", description: "Input value (v-model)" },
    { name: "label", type: "String", default: "\"\"", description: "Input label" },
    { name: "type", type: "String", default: "text", description: "Input type (text, password, email, etc.)" },
    { name: "placeholder", type: "String", default: "\"\"", description: "Input placeholder" },
    { name: "hint", type: "String", default: "\"\"", description: "Helper text below the input" },
    { name: "error", type: "String", default: "\"\"", description: "Error message" },
    { name: "id", type: "String", default: "\"\"", description: "Input ID attribute" },
    { name: "disabled", type: "Boolean", default: "false", description: "Whether the input is disabled" },
    { name: "required", type: "Boolean", default: "false", description: "Whether the input is required" }
  ],
  events: [
    { name: "update:modelValue", description: "Emitted when the input value changes" }
  ],
  slots: [
    { name: "prefix", description: "Content to display before the input" },
    { name: "suffix", description: "Content to display after the input" }
  ]
};
</script>

<style>
.input-wrapper {
  @apply mb-4;
}

.input-label {
  @apply block mb-2 text-sm font-medium text-gray-700;
}

.input-required {
  @apply text-red-500 ml-1;
}

.input-container {
  @apply flex border border-gray-300 rounded-md overflow-hidden transition-all;
}

.input-container:focus-within {
  @apply border-blue-500 ring-2 ring-blue-100;
}

.input-container-error {
  @apply border-red-500;
}

.input-container-error:focus-within {
  @apply ring-2 ring-red-100;
}

.input-field {
  @apply flex-1 py-2.5 px-3 border-none outline-none bg-transparent text-base text-gray-800 w-full;
}

.input-field::placeholder {
  @apply text-gray-400;
}

.input-field:disabled {
  @apply bg-gray-100 cursor-not-allowed;
}

.input-prefix,
.input-suffix {
  @apply flex items-center px-3 text-gray-500 bg-gray-50;
}

.input-error {
  @apply mt-1.5 text-sm text-red-500;
}

.input-hint {
  @apply mt-1.5 text-sm text-gray-500;
}
</style>