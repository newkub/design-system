<template>
  <NuxtLayout name="design-system">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Pages</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Pages</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore the page examples available in the application. These pages demonstrate common layouts and patterns.
      </p>
      
      <!-- Page Categories -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button 
          v-for="category in pageCategories" 
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
      
      <!-- Pages Grid -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div v-for="(page, index) in filteredPages" :key="index" class="page-card">
          <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 border border-gray-200 dark:border-gray-700">
            <div class="w-full h-full p-4">
              <!-- Page Preview -->
              <div class="w-full h-full bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
                <!-- Header -->
                <div class="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                  <div class="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div class="ml-auto flex gap-2">
                    <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="flex-1 p-4 overflow-hidden">
                  <div class="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div class="space-y-2 mb-4">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  
                  <!-- Page-specific content -->
                  <div v-if="page.id === 'login'" class="mt-4 space-y-4">
                    <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="h-10 bg-primary-200 dark:bg-primary-800 rounded"></div>
                  </div>
                  
                  <div v-else-if="page.id === 'profile'" class="mt-4">
                    <div class="flex gap-4 mb-4">
                      <div class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div class="flex-1">
                        <div class="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div class="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
                      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
                      <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  
                  <div v-else-if="page.id === 'settings'" class="mt-4 flex">
                    <div class="w-1/3">
                      <div class="space-y-2">
                        <div class="h-8 bg-primary-100 dark:bg-primary-900/30 rounded"></div>
                        <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
                      </div>
                    </div>
                    <div class="w-2/3 pl-4">
                      <div class="space-y-4">
                        <div class="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div class="h-10 bg-primary-200 dark:bg-primary-800 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold mb-2">{{ page.name }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ page.description }}</p>
          
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <Badge v-for="tag in page.tags" :key="tag" type="info">{{ tag }}</Badge>
            </div>
            <NuxtLink :to="page.path" class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              <span>View Page</span>
              <div class="i-carbon-arrow-right"></div>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Usage Guidelines -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
        <h2 class="text-2xl font-bold mb-4">Page Structure</h2>
        
        <div class="space-y-4">
          <p>
            Our pages follow a consistent structure to ensure a cohesive user experience:
          </p>
          
          <ul class="list-disc pl-6 space-y-2">
            <li>Each page uses a layout component that provides the common structure</li>
            <li>The main content area is responsive and adapts to different screen sizes</li>
            <li>Navigation elements are consistent across pages</li>
            <li>Dark mode support is implemented throughout all pages</li>
            <li>Accessibility considerations are built into the page structure</li>
          </ul>
          
          <div class="mt-4">
            <h3 class="text-xl font-semibold mb-2">Common Layouts</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 class="font-medium mb-2">Default Layout</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Standard layout with header, footer, and main content area.</p>
              </div>
              <div class="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 class="font-medium mb-2">Page Layout</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Simple layout without sidebar, focused on content.</p>
              </div>
              <div class="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 class="font-medium mb-2">Design System Layout</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Specialized layout for design system pages.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const activeCategory = ref('all')

// Initialize with query parameter if available
onMounted(() => {
  if (route.query.category && pageCategories.some(c => c.id === route.query.category)) {
    activeCategory.value = route.query.category
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

const pageCategories = [
  { id: 'all', name: 'All Pages' },
  { id: 'auth', name: 'Authentication' },
  { id: 'user', name: 'User Pages' },
  { id: 'content', name: 'Content Pages' }
]

const pages = [
  {
    id: 'login',
    name: 'Login Page',
    description: 'User authentication page with login form.',
    path: '/design-system/pages/login',
    category: 'auth',
    tags: ['Authentication', 'Form']
  },
  {
    id: 'register',
    name: 'Registration Page',
    description: 'User registration page with sign-up form.',
    path: '/design-system/pages/register',
    category: 'auth',
    tags: ['Authentication', 'Form']
  },
  {
    id: 'profile',
    name: 'User Profile',
    description: 'User profile page with personal information and settings.',
    path: '/design-system/pages/profile',
    category: 'user',
    tags: ['User', 'Profile']
  },
  {
    id: 'settings',
    name: 'Settings Page',
    description: 'User settings page with various configuration options.',
    path: '/design-system/pages/settings',
    category: 'user',
    tags: ['User', 'Settings', 'Form']
  },
  {
    id: 'article',
    name: 'Article Page',
    description: 'Content page for displaying articles or blog posts.',
    path: '/design-system/pages/article',
    category: 'content',
    tags: ['Content', 'Blog']
  },
  {
    id: 'product',
    name: 'Product Page',
    description: 'E-commerce product page with details and purchase options.',
    path: '/design-system/pages/product',
    category: 'content',
    tags: ['E-commerce', 'Product']
  }
]

const filteredPages = computed(() => {
  if (activeCategory.value === 'all') {
    return pages
  }
  return pages.filter(page => page.category === activeCategory.value)
})
</script>

<style scoped>
.page-card {
  transition: transform 0.2s;
}

.page-card:hover {
  transform: translateY(-4px);
}
</style>