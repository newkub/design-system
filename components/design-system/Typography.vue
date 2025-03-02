<template>
  <component 
    :is="tag" 
    class="ds-typography"
    :class="[
      `ds-typography--${variant}`,
      `ds-typography--${weight}`,
      { 'ds-typography--truncate': truncate }
    ]"
  >
    <slot></slot>
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: 'p'
  },
  variant: {
    type: String,
    default: 'body',
    validator: (value) => ['display', 'h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'].includes(value)
  },
  weight: {
    type: String,
    default: 'normal',
    validator: (value) => ['light', 'normal', 'medium', 'semibold', 'bold'].includes(value)
  },
  truncate: {
    type: Boolean,
    default: false
  }
});
</script>

<style>
.ds-typography {
  margin: 0;
}

/* Variants */
.ds-typography--display {
  font-size: 3rem;
  line-height: 1.2;
}

.ds-typography--h1 {
  font-size: 2.25rem;
  line-height: 1.25;
}

.ds-typography--h2 {
  font-size: 1.875rem;
  line-height: 1.3;
}

.ds-typography--h3 {
  font-size: 1.5rem;
  line-height: 1.375;
}

.ds-typography--h4 {
  font-size: 1.25rem;
  line-height: 1.4;
}

.ds-typography--body {
  font-size: 1rem;
  line-height: 1.5;
}

.ds-typography--small {
  font-size: 0.875rem;
  line-height: 1.5;
}

.ds-typography--caption {
  font-size: 0.75rem;
  line-height: 1.5;
}

/* Weights */
.ds-typography--light {
  font-weight: 300;
}

.ds-typography--normal {
  font-weight: 400;
}

.ds-typography--medium {
  font-weight: 500;
}

.ds-typography--semibold {
  font-weight: 600;
}

.ds-typography--bold {
  font-weight: 700;
}

/* Truncate */
.ds-typography--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>