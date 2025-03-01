---
title: Documentation
description: A comprehensive guide to building modern web applications with Nuxt and UnoCSS.
---

# Documentation

A comprehensive guide to building modern web applications with Nuxt and UnoCSS.

<div class="grid md:grid-cols-2 gap-6">
  <NuxtLink 
    v-for="doc in docs" 
    :key="doc._path" 
    :to="doc._path"
    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <h2 class="text-xl font-semibold mb-2 text-primary-600 dark:text-primary-400">{{ doc.title }}</h2>
    <p class="text-gray-600 dark:text-gray-400">{{ doc.description || 'Learn more about this topic' }}</p>
  </NuxtLink>
</div>

<script setup>
const { data: docs } = await useAsyncData('docs-index', () => {
  return queryContent('/docs/guide')
    .where({ _path: { $ne: '/docs/guide' } })
    .sort({ _path: 1 })
    .find()
})
</script>