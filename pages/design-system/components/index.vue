<template>
  <NuxtLayout name="design-system">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Components</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Components</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore our component library with usage examples and documentation.
      </p>
      
      <!-- Component Categories -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button 
          v-for="category in componentCategories" 
          :key="category.id"
          class="px-4 py-2 rounded-full"
          :class="activeCategory === category.id ? 
            'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 
            'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'"
          @click="activeCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <NuxtLink 
          v-for="component in filteredComponents" 
          :key="component.id" 
          :to="`/design-system/components/${component.id}`"
          class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-3 mb-4">
            <div :class="`text-3xl text-primary-500 ${component.icon}`"></div>
            <h2 class="text-xl font-semibold">{{ component.name }}</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ component.description }}
          </p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <Badge v-for="tag in component.tags" :key="tag" type="info" class="text-xs">{{ tag }}</Badge>
          </div>
          
          <div class="flex justify-end">
            <span class="text-primary-600 dark:text-primary-400 flex items-center gap-1">
              <span>View component</span>
              <div class="i-carbon-arrow-right"></div>
            </span>
          </div>
        </NuxtLink>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
        <h2 class="text-2xl font-bold mb-4">Component Guidelines</h2>
        
        <p class="mb-4">
          Our components follow these principles to ensure consistency and usability:
        </p>
        
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 class="text-xl font-semibold mb-3">Design Principles</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Consistent visual language across all components</li>
              <li>Responsive and adaptive to different screen sizes</li>
              <li>Accessible to all users, following WCAG guidelines</li>
              <li>Customizable while maintaining design integrity</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold mb-3">Implementation Guidelines</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Use TypeScript for type safety and better developer experience</li>
              <li>Include comprehensive documentation and examples</li>
              <li>Ensure proper testing for all components</li>
              <li>Support both light and dark modes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const activeCategory = ref('all')

// Initialize with query parameter if available
onMounted(() => {
  if (route.query.category && componentCategories.some(c => c.id === route.query.category)) {
    activeCategory.value = route.query.category as string
  }
})

// Watch for category changes and update URL
watch(activeCategory, (newCategory) => {
  if (newCategory !== 'all') {
    navigateTo({
      query: { ...route.query, category: newCategory }
    })
  } else {
    navigateTo({
      query: { ...route.query, category: undefined }
    })
  }
})

const componentCategories = [
  { id: 'all', name: 'All Components' },
  { id: 'display', name: 'Display' },
  { id: 'layout', name: 'Layout' },
  { id: 'navigation', name: 'Navigation' },
  { id: 'form', name: 'Form' },
  { id: 'feedback', name: 'Feedback' },
  { id: 'data', name: 'Data Display' }
]

// Component metadata
interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  category: string;
}

const components: ComponentInfo[] = [
  // Display components
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'Displays user profile images or initials in a circular format',
    icon: 'i-carbon-user-avatar',
    tags: ['Display', 'User'],
    category: 'display'
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'A small badge component for displaying status, labels, or counts',
    icon: 'i-carbon-tag',
    tags: ['Display', 'Label'],
    category: 'display'
  },
  {
    id: 'button',
    name: 'Button',
    description: 'Interactive button component with various styles and states',
    icon: 'i-carbon-button',
    tags: ['Input', 'Action'],
    category: 'display'
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Container component for organizing related content and actions',
    icon: 'i-carbon-document',
    tags: ['Layout', 'Container'],
    category: 'display'
  },
  {
    id: 'divider',
    name: 'Divider',
    description: 'Visual separator between content sections',
    icon: 'i-carbon-horizontal-view',
    tags: ['Display', 'Layout'],
    category: 'display'
  },
  {
    id: 'icon',
    name: 'Icon',
    description: 'Visual symbols for representing actions, objects, or concepts',
    icon: 'i-carbon-star',
    tags: ['Display', 'Visual'],
    category: 'display'
  },
  {
    id: 'image',
    name: 'Image',
    description: 'Enhanced image component with lazy loading and fallbacks',
    icon: 'i-carbon-image',
    tags: ['Display', 'Media'],
    category: 'display'
  },
  {
    id: 'progress',
    name: 'Progress',
    description: 'Visual indicator of progress for tasks or processes',
    icon: 'i-carbon-progress-bar',
    tags: ['Display', 'Feedback'],
    category: 'display'
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'Placeholder for content while it is loading',
    icon: 'i-carbon-box',
    tags: ['Display', 'Loading'],
    category: 'display'
  },
  {
    id: 'tag',
    name: 'Tag',
    description: 'Compact element for labeling, categorizing, or organizing items',
    icon: 'i-carbon-tag-group',
    tags: ['Display', 'Label'],
    category: 'display'
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'Displays additional information on hover or focus',
    icon: 'i-carbon-chat',
    tags: ['Display', 'Overlay'],
    category: 'display'
  },
  
  // Layout components
  {
    id: 'container',
    name: 'Container',
    description: 'Wrapper component for constraining content width',
    icon: 'i-carbon-container-software',
    tags: ['Layout', 'Structure'],
    category: 'layout'
  },
  {
    id: 'grid',
    name: 'Grid',
    description: 'Responsive grid layout system for organizing content',
    icon: 'i-carbon-grid',
    tags: ['Layout', 'Structure'],
    category: 'layout'
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'Vertical or horizontal stacking of elements with consistent spacing',
    icon: 'i-carbon-stack',
    tags: ['Layout', 'Structure'],
    category: 'layout'
  },
  
  // Navigation components
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navigation aid showing the current location in a hierarchy',
    icon: 'i-carbon-chevron-right',
    tags: ['Navigation', 'Path'],
    category: 'navigation'
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'Toggleable menu for displaying a list of actions or options',
    icon: 'i-carbon-caret-down',
    tags: ['Navigation', 'Menu'],
    category: 'navigation'
  },
  {
    id: 'menu',
    name: 'Menu',
    description: 'List of options or actions for users to choose from',
    icon: 'i-carbon-menu',
    tags: ['Navigation', 'Options'],
    category: 'navigation'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Components for site navigation and wayfinding',
    icon: 'i-carbon-navigation',
    tags: ['Navigation', 'Menu'],
    category: 'navigation'
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Controls for navigating through multiple pages of content',
    icon: 'i-carbon-page-first',
    tags: ['Navigation', 'Pages'],
    category: 'navigation'
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Organizes content into multiple sections with tab navigation',
    icon: 'i-carbon-tab',
    tags: ['Navigation', 'Content'],
    category: 'navigation'
  },
  
  // Form components
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Form control that allows selecting multiple options',
    icon: 'i-carbon-checkbox',
    tags: ['Form', 'Input'],
    category: 'form'
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Form control for collecting text input from users',
    icon: 'i-carbon-text-input',
    tags: ['Form', 'Input'],
    category: 'form'
  },
  {
    id: 'radio',
    name: 'Radio',
    description: 'Form control that allows selecting one option from a group',
    icon: 'i-carbon-radio-button',
    tags: ['Form', 'Input'],
    category: 'form'
  },
  {
    id: 'select',
    name: 'Select',
    description: 'Form control for selecting an option from a dropdown list',
    icon: 'i-carbon-list-dropdown',
    tags: ['Form', 'Input'],
    category: 'form'
  },
  {
    id: 'slider',
    name: 'Slider',
    description: 'Form control for selecting a value from a range',
    icon: 'i-carbon-slider',
    tags: ['Form', 'Input'],
    category: 'form'
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'Toggle control for binary options',
    icon: 'i-carbon-toggle',
    tags: ['Form', 'Input'],
    category: 'form'
  },
  {
    id: 'textarea',
    name: 'Textarea',
    description: 'Form control for multi-line text input',
    icon: 'i-carbon-text-area',
    tags: ['Form', 'Input'],
    category: 'form'
  },
  
  // Feedback components
  {
    id: 'alert',
    name: 'Alert',
    description: 'Displays an alert message with different styles based on type',
    icon: 'i-carbon-warning-alt',
    tags: ['Feedback', 'Notification'],
    category: 'feedback'
  },
  {
    id: 'dialog',
    name: 'Dialog',
    description: 'Modal dialog for focused user interactions',
    icon: 'i-carbon-dialog',
    tags: ['Feedback', 'Overlay'],
    category: 'feedback'
  },
  {
    id: 'modal',
    name: 'Modal',
    description: 'Dialog component for displaying content in a layer above the page',
    icon: 'i-carbon-popup',
    tags: ['Overlay', 'Dialog'],
    category: 'feedback'
  },
  {
    id: 'notification',
    name: 'Notification',
    description: 'Displays important messages or updates to users',
    icon: 'i-carbon-notification',
    tags: ['Feedback', 'Alert'],
    category: 'feedback'
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'Displays floating content relative to a target element',
    icon: 'i-carbon-popup',
    tags: ['Feedback', 'Overlay'],
    category: 'feedback'
  },
  {
    id: 'toast',
    name: 'Toast',
    description: 'Brief, non-disruptive message for providing feedback',
    icon: 'i-carbon-notification',
    tags: ['Feedback', 'Notification'],
    category: 'feedback'
  },
  
  // Data display components
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'Vertically stacked sections that can be expanded/collapsed',
    icon: 'i-carbon-collapse-all',
    tags: ['Data', 'Interactive'],
    category: 'data'
  },
  {
    id: 'code-block',
    name: 'Code Block',
    description: 'Displays code snippets with syntax highlighting and copy functionality',
    icon: 'i-carbon-code',
    tags: ['Content', 'Code'],
    category: 'data'
  },
  {
    id: 'list',
    name: 'List',
    description: 'Displays a collection of items in an ordered or unordered list',
    icon: 'i-carbon-list',
    tags: ['Data', 'Collection'],
    category: 'data'
  },
  {
    id: 'table',
    name: 'Table',
    description: 'Displays tabular data with sorting and pagination',
    icon: 'i-carbon-table',
    tags: ['Data', 'Display'],
    category: 'data'
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Displays a sequence of events or activities in chronological order',
    icon: 'i-carbon-chart-line-smooth',
    tags: ['Data', 'Chronology'],
    category: 'data'
  }
]

const filteredComponents = computed(() => {
  if (activeCategory.value === 'all') {
    return components
  }
  return components.filter(component => component.category === activeCategory.value)
})
</script>