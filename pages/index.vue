<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { title, description } = useDocsConfig();
</script>

<template>
  <div class="py-12 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-xl text-gray-600 mb-8">{{ description }}</p>
      
      <div class="flex justify-center gap-4">
        <NuxtLink to="/guide/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </NuxtLink>
        <NuxtLink to="/examples/" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
          View Examples
        </NuxtLink>
      </div>
    </div>
    
    <div class="mt-16 max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="i-carbon-document-multiple text-3xl text-blue-600 mb-4"></div>
        <h2 class="text-xl font-semibold mb-2">Comprehensive Docs</h2>
        <p class="text-gray-600">Detailed documentation with examples and API references.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="i-carbon-lightning text-3xl text-blue-600 mb-4"></div>
        <h2 class="text-xl font-semibold mb-2">Fast & Efficient</h2>
        <p class="text-gray-600">Built with Nuxt and UnoCSS for optimal performance.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="i-carbon-code text-3xl text-blue-600 mb-4"></div>
        <h2 class="text-xl font-semibold mb-2">Developer Friendly</h2>
        <p class="text-gray-600">Easy to extend and customize to fit your needs.</p>
      </div>
    </div>
  </div>
</template>