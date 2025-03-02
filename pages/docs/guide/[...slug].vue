<template>
  <NuxtLayout name="docs">
    <ContentDoc :path="`/docs/guide/${route.params.slug.join('/')}`" />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
</script>