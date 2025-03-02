<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { title, description, themeConfig } = useDocsConfig();
const features = [
  {
    icon: 'i-carbon-document-multiple',
    title: 'Comprehensive Docs',
    description: 'Detailed documentation with examples and API references.'
  },
  {
    icon: 'i-carbon-lightning',
    title: 'Fast & Efficient',
    description: 'Built with Nuxt and UnoCSS for optimal performance.'
  },
  {
    icon: 'i-carbon-code',
    title: 'Developer Friendly',
    description: 'Easy to extend and customize to fit your needs.'
  }
];
</script>

<template>
  <NuxtLayout name="page">
    <!-- Hero Section -->
    <div class="hero py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-3xl mx-auto text-center">
        <img v-if="themeConfig?.logo" :src="themeConfig.logo" alt="Logo" class="h-24 w-24 mx-auto mb-6" />
        <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
          {{ title || 'Nuxt Docs' }}
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {{ description || 'Documentation site built with Nuxt and UnoCSS' }}
        </p>
        
        <div class="flex justify-center gap-4">
          <NuxtLink to="/guide/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Get Started
          </NuxtLink>
          <NuxtLink to="/guide/" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200">
            View Content
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Features Section -->
    <div class="py-16 px-4 bg-white">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index" class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div :class="[feature.icon, 'text-3xl text-blue-600 mb-4']"></div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Why Section -->
    <div class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Why Choose Our Framework</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold mb-3 flex items-center">
              <div class="i-carbon-checkmark-filled text-green-500 mr-2"></div>
              Modern Architecture
            </h3>
            <p class="text-gray-600">Built on top of Nuxt 3 with the latest web technologies for optimal performance.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold mb-3 flex items-center">
              <div class="i-carbon-checkmark-filled text-green-500 mr-2"></div>
              Developer Experience
            </h3>
            <p class="text-gray-600">Intuitive APIs and comprehensive documentation to help you build faster.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold mb-3 flex items-center">
              <div class="i-carbon-checkmark-filled text-green-500 mr-2"></div>
              Customizable
            </h3>
            <p class="text-gray-600">Easily extend and customize to fit your specific project requirements.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold mb-3 flex items-center">
              <div class="i-carbon-checkmark-filled text-green-500 mr-2"></div>
              Production Ready
            </h3>
            <p class="text-gray-600">Optimized for production with built-in performance optimizations.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="py-16 px-4 bg-blue-600 text-white">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl opacity-90 mb-8">Dive into our documentation and start building amazing applications today.</p>
        <NuxtLink to="/guide/" class="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-block">
          Read the Docs
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.hero {
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-image: radial-gradient(circle at 25% 25%, rgba(0, 220, 130, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  z-index: -1;
}
</style>