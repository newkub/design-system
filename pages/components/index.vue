<script setup>
import { ref, computed } from 'vue';
import { useComponentMetadata } from '~/composables/useComponentMetadata';

const { components, isLoading, categories, getCategoryColor, getComponentCountByCategory } = useComponentMetadata();

// State for component modal
const isModalOpen = ref(false);
const selectedComponent = ref(null);

// State for category filter
const activeCategory = ref('all');

// State for search
const searchQuery = ref('');

// Computed property for filtered components
const filteredComponents = computed(() => {
  let filtered = components.value;
  
  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(component => component.category === activeCategory.value);
  }
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(component => 
      component.title.toLowerCase().includes(query) || 
      component.description.toLowerCase().includes(query) ||
      component.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  return filtered;
});

// Alias for search results
const searchResults = computed(() => filteredComponents.value);

// Functions for component modal
function openComponentModal(component) {
  selectedComponent.value = component;
  isModalOpen.value = true;
}

function closeComponentModal() {
  isModalOpen.value = false;
}

// Function to set active category
function setCategory(categoryId) {
  activeCategory.value = categoryId;
}
</script>

<template>
  <NuxtLayout name="page">
    <!-- Hero Section -->
    <div class="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">Components</h1>
        <p class="text-lg text-gray-600 mb-6">
          Explore our library of reusable components for building consistent interfaces
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-md mx-auto relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div class="i-carbon-search text-gray-400"></div>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            class="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search components..."
          />
        </div>
      </div>
    </div>
    
    <!-- Category Filter -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex flex-wrap items-center gap-2">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="px-4 py-2 text-sm rounded-full transition-colors"
            :class="activeCategory === category.id ? 
              'bg-blue-100 text-blue-700 font-medium' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            @click="setCategory(category.id)"
          >
            {{ category.name }} ({{ getComponentCountByCategory(category.id) }})
          </button>
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="py-12 px-4 bg-white">
      <div class="max-w-6xl mx-auto text-center">
        <div class="i-carbon-circle-dash text-5xl text-gray-300 animate-spin mx-auto mb-4"></div>
        <p class="text-gray-500">Loading components...</p>
      </div>
    </div>
    
    <!-- Components Grid -->
    <div v-else class="py-8 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <!-- No results message -->
        <div v-if="searchResults.length === 0" class="text-center py-12">
          <div class="i-carbon-search text-5xl text-gray-300 mx-auto mb-4"></div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">No components found</h3>
          <p class="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
        
        <!-- Components grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComponentCard 
            v-for="component in searchResults" 
            :key="component.id"
            :component="component"
            @open-modal="openComponentModal"
          />
        </div>
      </div>
    </div>
    
    <!-- Component Modal -->
    <ComponentModal 
      :is-open="isModalOpen" 
      :component="selectedComponent || {}"
      @close="closeComponentModal"
    />
    
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