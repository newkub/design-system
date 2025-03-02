<template>
  <NuxtLayout name="docs">
    <ContentDoc :path="`/docs/api/${route.params.slug.join('/')}`" />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
</script>