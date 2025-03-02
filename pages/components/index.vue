<template>
  <NuxtLayout name="page">
    <!-- Hero Section -->
    <div class="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">Components</h1>
        <p class="text-lg text-gray-600 mb-6">
          Explore our library of reusable components for building consistent user interfaces.
        </p>
        
        <!-- Search and Filter -->
        <div class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div class="i-carbon-search text-gray-400"></div>
            </div>
            <input 
              type="text" 
              placeholder="Search components..." 
              class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="searchQuery"
            />
          </div>
          <select 
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="activeCategory"
          >
            <option 
              v-for="category in categories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }} ({{ getComponentCountByCategory(category.id) }})
            </option>
          </select>
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

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useComponentMetadata } from '~/composables/useComponentMetadata';

// Get component metadata
const { components, isLoading, error, categories, getCategoryColor, getComponentCountByCategory } = useComponentMetadata();

// Search and filter state
const searchQuery = ref('');
const activeCategory = ref('all');
const isModalOpen = ref(false);
const selectedComponent = ref(null);

// Computed property for filtered and searched components
const searchResults = computed(() => {
  let results = components.value;
  
  // Filter by category
  if (activeCategory.value !== 'all') {
    results = results.filter(component => component.category === activeCategory.value);
  }
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(component => {
      return (
        component.title.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });
  }
  
  return results;
});

// Open component modal
function openComponentModal(component) {
  selectedComponent.value = component;
  isModalOpen.value = true;
}

// Close component modal
function closeComponentModal() {
  isModalOpen.value = false;
}
</script>