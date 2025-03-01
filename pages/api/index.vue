<template>
  <NuxtLayout>
    <div>
      <h1 class="text-3xl font-bold mb-6">API Reference</h1>
      
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink 
          v-for="doc in docs" 
          :key="doc._path" 
          :to="doc._path"
          class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <h2 class="text-xl font-semibold mb-2 text-primary-600 dark:text-primary-400">{{ doc.title }}</h2>
          <p class="text-gray-600 dark:text-gray-400">{{ doc.description || 'Learn more about this API' }}</p>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { data: docs } = await useAsyncData('api-index', () => {
  return queryContent('/api')
    .where({ _path: { $ne: '/api' } })
    .sort({ _path: 1 })
    .find()
})
</script>