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
    id: 'button',
    title: 'Button',
    description: 'Buttons allow users to trigger an action or event with a single click.',
    category: 'form',
    tags: ['interactive', 'action'],
    link: '/design-system/buttons',
    preview: () => ({
      component: 'DsButton',
      props: { variant: 'primary' },
      content: 'Button'
    })
  },
  {
    id: 'alert',
    title: 'Alert',
    description: 'Alerts display important messages to the user.',
    category: 'feedback',
    tags: ['notification', 'message'],
    link: '/design-system/alerts',
    preview: () => ({
      component: 'DsAlert',
      props: { type: 'info', title: 'Information' },
      content: 'This is an alert message'
    })
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'Badges are small status descriptors for UI elements.',
    category: 'data-display',
    tags: ['label', 'status'],
    link: '/design-system/badges',
    preview: () => ({
      component: 'DsBadge',
      props: { variant: 'primary' },
      content: 'Badge'
    })
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Cards contain content and actions about a single subject.',
    category: 'layout',
    tags: ['container', 'content'],
    link: '/design-system/cards',
    preview: () => ({
      component: 'DsCard',
      props: { variant: 'bordered' },
      content: 'Card Content',
      slots: {
        header: 'Card Header',
        footer: 'Card Footer'
      }
    })
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Typography components for displaying text with various styles.',
    category: 'data-display',
    tags: ['text', 'heading'],
    link: '/design-system/typography',
    preview: () => ({
      component: 'DsTypography',
      props: { variant: 'h3', weight: 'semibold' },
      content: 'Typography'
    })
  },
  {
    id: 'input',
    title: 'Input',
    description: 'Input fields allow users to enter text.',
    category: 'form',
    tags: ['form', 'text'],
    link: '/design-system/inputs',
    preview: () => ({
      component: 'DsInput',
      props: { label: 'Input Field', placeholder: 'Enter text...' }
    })
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Tabs organize content into separate views which users can switch between.',
    category: 'navigation',
    tags: ['navigation', 'content'],
    link: '/design-system/tabs',
    preview: () => ({
      component: 'DsTabs',
      props: { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], modelValue: 0 }
    })
  },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Breadcrumbs show the current page location within a navigational hierarchy.',
    category: 'navigation',
    tags: ['navigation', 'location'],
    link: '/design-system/breadcrumbs',
    preview: null
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    description: 'Dropdowns display a list of options that can be selected.',
    category: 'navigation',
    tags: ['selection', 'menu'],
    link: '/design-system/dropdown',
    preview: null
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Modals display content that requires user interaction.',
    category: 'feedback',
    tags: ['dialog', 'popup'],
    link: '/design-system/modals',
    preview: null
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'Tooltips display informative text when users hover over an element.',
    category: 'data-display',
    tags: ['info', 'hover'],
    link: '/design-system/tooltips',
    preview: null
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Progress indicators show the completion status of an operation.',
    category: 'feedback',
    tags: ['loading', 'status'],
    link: '/design-system/progress',
    preview: null
  },
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'Avatars represent a user or entity.',
    category: 'data-display',
    tags: ['user', 'image'],
    link: '/design-system/avatars',
    preview: null
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Checkboxes allow users to select multiple options from a set.',
    category: 'form',
    tags: ['selection', 'toggle'],
    link: '/design-system/checkboxes',
    preview: null
  },
  {
    id: 'radio',
    title: 'Radio Button',
    description: 'Radio buttons allow users to select one option from a set.',
    category: 'form',
    tags: ['selection', 'toggle'],
    link: '/design-system/radio-buttons',
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

// Get component count by category
function getComponentCountByCategory(categoryId) {
  if (categoryId === 'all') {
    return components.length;
  }
  return components.filter(component => component.category === categoryId).length;
}

// Modal state
const isModalOpen = ref(false);
const selectedComponent = ref(null);

function openComponentModal(component) {
  selectedComponent.value = component;
  isModalOpen.value = true;
}

function closeComponentModal() {
  isModalOpen.value = false;
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