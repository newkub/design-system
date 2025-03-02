<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { themeConfig } = useDocsConfig();

// Components data with previews, titles, and tags
const components = [
  {
    id: 'docs',
    title: 'Documentation',
    description: 'Comprehensive guides and references for our design system.',
    category: 'resources',
    tags: ['guides', 'reference'],
    link: '/docs',
    preview: null
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Latest updates, insights, and best practices from our team.',
    category: 'resources',
    tags: ['news', 'updates'],
    link: '/blog',
    preview: null
  },
  {
    id: 'api',
    title: 'API Reference',
    description: 'Detailed documentation for developers integrating with our API.',
    category: 'developer',
    tags: ['developer', 'integration'],
    link: '/api',
    preview: null
  },
  {
    id: 'changelog',
    title: 'Changelog',
    description: 'Track new features, improvements, and bug fixes.',
    category: 'updates',
    tags: ['versioning', 'releases'],
    link: '/changelog',
    preview: null
  },
  {
    id: 'form',
    title: 'Form Elements',
    description: 'A collection of form elements including inputs, checkboxes, and radio buttons.',
    category: 'components',
    tags: ['input', 'form-controls'],
    link: '/components/form',
    preview: () => ({
      component: 'DsForm',
      props: { variant: 'standard' },
      content: 'Form Example'
    })
  },
  {
    id: 'account',
    title: 'Account Management',
    description: 'Manage user accounts, settings, and authentication.',
    category: 'user',
    tags: ['profile', 'security'],
    link: '/account',
    preview: null
  }
];

// Get color for category badge
function getCategoryColor(category) {
  const colorMap = {
    'layout': 'bg-purple-100 text-purple-800',
    'form': 'bg-blue-100 text-blue-800',
    'feedback': 'bg-amber-100 text-amber-800',
    'navigation': 'bg-green-100 text-green-800',
    'data-display': 'bg-indigo-100 text-indigo-800',
    'resources': 'bg-teal-100 text-teal-800',
    'developer': 'bg-violet-100 text-violet-800',
    'updates': 'bg-orange-100 text-orange-800',
    'components': 'bg-emerald-100 text-emerald-800',
    'user': 'bg-pink-100 text-pink-800'
  };
  
  return colorMap[category] || 'bg-gray-100 text-gray-800';
}
</script>

<template>
  <NuxtLayout name="page">
    <!-- Hero Section -->
    <div class="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">Showcase</h1>
      </div>
    </div>
    
    <!-- Components Grid -->
    <div class="py-8 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="component in components" 
            :key="component.id"
            class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300"
          >
            <!-- Component Preview -->
            <div class="h-32 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-200">
              <component 
                v-if="component.preview"
                :is="component.preview().component" 
                v-bind="component.preview().props"
              >
                {{ component.preview().content }}
                <template v-if="component.preview().slots" v-for="(slotContent, name) in component.preview().slots" #[name]>
                  {{ slotContent }}
                </template>
              </component>
              <div v-else class="text-gray-400 text-sm">Preview not available</div>
            </div>
            
            <div class="p-4">
              <!-- Component Title and Link -->
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-bold">{{ component.title }}</h3>
                <NuxtLink 
                  :to="component.link" 
                  class="text-blue-600 hover:text-blue-800"
                >
                  <div class="i-carbon-arrow-right"></div>
                </NuxtLink>
              </div>
              
              <!-- Component Description -->
              <p class="text-gray-600 text-sm mb-4">{{ component.description }}</p>
              
              <!-- Tags and Category -->
              <div class="flex flex-wrap items-center gap-2 mt-auto">
                <!-- Category Badge -->
                <span 
                  class="text-xs px-2 py-1 rounded-full"
                  :class="getCategoryColor(component.category)"
                >
                  {{ component.category }}
                </span>
                
                <!-- Tags -->
                <span 
                  v-for="tag in component.tags" 
                  :key="tag"
                  class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="py-12 px-4 bg-gray-50">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Submit Showcase</h2>
        <p class="text-gray-600 mb-6">Share your project with the community. We'd love to see what you've built with our design system.</p>
        <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Submit Your Project
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>