<script setup>
import { ref, computed } from 'vue';
import { useDocsConfig } from '~/composables/useDocsConfig';

const { themeConfig } = useDocsConfig();

// Component categories for filtering
const categories = [
  { id: 'all', name: 'All Components' },
  { id: 'layout', name: 'Layout' },
  { id: 'form', name: 'Form' },
  { id: 'feedback', name: 'Feedback' },
  { id: 'navigation', name: 'Navigation' },
  { id: 'data-display', name: 'Data Display' },
];

// Active category for filtering
const activeCategory = ref('all');

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


// Computed property for filtered components
const filteredComponents = computed(() => {
  if (activeCategory.value === 'all') {
    return components;
  }
  return components.filter(component => component.category === activeCategory.value);
});

// Function to set active category
function setCategory(categoryId) {
  activeCategory.value = categoryId;
}

// Search functionality
const searchQuery = ref('');
const searchResults = computed(() => {
  if (!searchQuery.value) return filteredComponents.value;
  
  const query = searchQuery.value.toLowerCase();
  return filteredComponents.value.filter(component => 
    component.title.toLowerCase().includes(query) || 
    component.description.toLowerCase().includes(query) || 
    component.tags.some(tag => tag.toLowerCase().includes(query))
  );
});

// Get color for category badge
function getCategoryColor(category) {
  const colorMap = {
    'layout': 'bg-purple-100 text-purple-800',
    'form': 'bg-blue-100 text-blue-800',
    'feedback': 'bg-amber-100 text-amber-800',
    'navigation': 'bg-green-100 text-green-800',
    'data-display': 'bg-indigo-100 text-indigo-800'
  };
  
  return colorMap[category] || 'bg-gray-100 text-gray-800';
}

// Get component count by category
function getComponentCountByCategory(categoryId) {
  if (categoryId === 'all') {
    return components.length;
  }
  return components.filter(component => component.category === categoryId).length;
}
</script>

<template>
  <NuxtLayout name="page">
    <!-- Hero Section -->
    <div class="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">Components</h1>
        <p class="text-lg text-gray-600 mb-6">
          Browse our collection of UI components for building beautiful interfaces
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-md mx-auto relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div class="i-carbon-search text-gray-400"></div>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search components..."
          />
        </div>
      </div>
    </div>
    
    <!-- Category Filter -->
    <div class="bg-white border-b border-gray-200 sticky top-16 z-10">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex flex-wrap items-center gap-2">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="px-4 py-2 text-sm rounded-full transition-colors flex items-center gap-2"
            :class="activeCategory === category.id ? 
              'bg-blue-100 text-blue-700 font-medium' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            @click="setCategory(category.id)"
          >
            {{ category.name }}
            <span class="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-white text-gray-700">
              {{ getComponentCountByCategory(category.id) }}
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Components Grid -->
    <div class="py-8 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <!-- No results message -->
        <div v-if="searchResults.length === 0" class="text-center py-12">
          <div class="i-carbon-search text-5xl text-gray-300 mx-auto mb-4"></div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">No components found</h3>
          <p class="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
        
        <!-- Components grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="component in searchResults" 
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
        <h2 class="text-2xl font-bold mb-4">Need a custom component?</h2>
        <p class="text-gray-600 mb-6">Our design system is constantly evolving. If you need a component that's not listed here, let us know.</p>
        <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Request Component
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>