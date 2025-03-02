<template>
  <NuxtLayout name="docs">
    <ContentDoc :path="`/api/${slug ? slug.join('/') : 'index'}`" v-slot="{ doc }">
      <div v-if="doc">
        <ContentRenderer :value="doc" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-12">
        <div class="text-4xl mb-4">😢</div>
        <h2 class="text-2xl font-bold mb-2">Page Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
        <NuxtLink to="/api/" class="btn btn-primary">Back to API</NuxtLink>
      </div>
    </ContentDoc>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
</script>