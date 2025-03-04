<script setup lang="ts">
defineProps<{
  component: {
    id: string
    title: string
    component: any
  }
}>()
</script>

<template>
  <div>
    <component :is="component.component" />
  </div>
</template>