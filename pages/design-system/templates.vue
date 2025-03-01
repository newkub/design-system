<template>
  <NuxtLayout name="design-system">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Templates</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Templates</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Pre-built page templates and layout patterns that can be used to quickly create consistent user interfaces.
      </p>
      
      <!-- Template Categories -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button 
          v-for="category in templateCategories" 
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
      
      <!-- Templates Grid -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div v-for="(template, index) in filteredTemplates" :key="index" class="template-card">
          <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 border border-gray-200 dark:border-gray-700">
            <div class="w-full h-full p-4">
              <!-- Template Preview -->
              <div v-if="template.id === 'dashboard'" class="w-full h-full bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex flex-col">
                <div class="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                  <div class="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div class="ml-auto flex gap-2">
                    <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
                <div class="flex flex-1">
                  <div class="w-48 border-r border-gray-200 dark:border-gray-700 p-4">
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                    </div>
                  </div>
                  <div class="flex-1 p-4">
                    <div class="grid grid-cols-3 gap-4 mb-4">
                      <div class="h-20 bg-primary-100 dark:bg-primary-900/30 rounded p-2">
                        <div class="h-4 w-16 bg-primary-200 dark:bg-primary-800 rounded mb-2"></div>
                        <div class="h-6 w-12 bg-primary-300 dark:bg-primary-700 rounded"></div>
                      </div>
                      <div class="h-20 bg-green-100 dark:bg-green-900/30 rounded p-2">
                        <div class="h-4 w-16 bg-green-200 dark:bg-green-800 rounded mb-2"></div>
                        <div class="h-6 w-12 bg-green-300 dark:bg-green-700 rounded"></div>
                      </div>
                      <div class="h-20 bg-blue-100 dark:bg-blue-900/30 rounded p-2">
                        <div class="h-4 w-16 bg-blue-200 dark:bg-blue-800 rounded mb-2"></div>
                        <div class="h-6 w-12 bg-blue-300 dark:bg-blue-700 rounded"></div>
                      </div>
                    </div>
                    <div class="h-40 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div v-else-if="template.id === 'landing'" class="w-full h-full bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex flex-col">
                <div class="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                  <div class="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div class="ml-auto flex gap-4">
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-20 h-8 bg-primary-200 dark:bg-primary-800 rounded"></div>
                  </div>
                </div>
                <div class="flex-1 p-4">
                  <div class="h-32 flex items-center justify-between mb-8">
                    <div class="w-1/2">
                      <div class="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div class="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div class="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div class="h-10 w-32 bg-primary-200 dark:bg-primary-800 rounded"></div>
                    </div>
                    <div class="w-1/3 h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-16 bg-gray-100 dark:bg-gray-800 rounded p-2 flex items-center">
                      <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                      <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div class="h-16 bg-gray-100 dark:bg-gray-800 rounded p-2 flex items-center">
                      <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                      <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div class="h-16 bg-gray-100 dark:bg-gray-800 rounded p-2 flex items-center">
                      <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                      <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else-if="template.id === 'blog'" class="w-full h-full bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex flex-col">
                <div class="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                  <div class="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div class="ml-auto flex gap-4">
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div class="flex-1 p-4">
                  <div class="mb-6">
                    <div class="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div class="flex gap-2 mb-4">
                      <div class="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
                      <div class="h-6 w-24 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>
                    <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else-if="template.id === 'documentation'" class="w-full h-full bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 flex flex-col">
                <div class="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                  <div class="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div class="ml-auto flex gap-4">
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
                <div class="flex flex-1">
                  <div class="w-48 border-r border-gray-200 dark:border-gray-700 p-4">
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                      <div class="h-4 bg-primary-200 dark:bg-primary-800 rounded w-20"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </div>
                  </div>
                  <div class="flex-1 p-4">
                    <div class="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div class="space-y-2 mb-4">
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div class="h-32 bg-gray-100 dark:bg-gray-800 rounded mb-4 p-2">
                      <div class="space-y-2">
                        <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div class="w-48 border-l border-gray-200 dark:border-gray-700 p-4">
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-4xl text-gray-300 dark:text-gray-600">{{ template.icon }}</div>
              </div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold mb-2">{{ template.name }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ template.description }}</p>
          
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <Badge v-for="tag in template.tags" :key="tag" type="info">{{ tag }}</Badge>
            </div>
            <button class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              <span>Preview</span>
              <div class="i-carbon-arrow-right"></div>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Template Details -->
      <div v-if="selectedTemplate" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-12">
        <div class="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold">{{ selectedTemplate.name }}</h3>
            <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Download</button>
          </div>
        </div>
        
        <div class="p-6">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 border border-gray-200 dark:border-gray-700">
                <!-- Template preview image would go here -->
                <div class="w-full h-full flex items-center justify-center">
                  <div class="text-6xl text-gray-300 dark:text-gray-600">{{ selectedTemplate.icon }}</div>
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <h4 class="font-medium mb-1">Description</h4>
                  <p class="text-gray-600 dark:text-gray-400">{{ selectedTemplate.description }}</p>
                </div>
                
                <div>
                  <h4 class="font-medium mb-1">Tags</h4>
                  <div class="flex flex-wrap gap-2">
                    <Badge v-for="tag in selectedTemplate.tags" :key="tag" type="info">{{ tag }}</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-4">Template Code</h4>
              <ComponentExample :code="getTemplateCode(selectedTemplate)">
                <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                  Preview not available in this view. Download the template to see the full code.
                </div>
              </ComponentExample>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Usage Guidelines -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
        <h2 class="text-2xl font-bold mb-4">Usage Guidelines</h2>
        
        <div class="space-y-4">
          <p>
            Our templates are designed to provide consistent starting points for common page types and layouts.
            Follow these guidelines when using templates:
          </p>
          
          <ul class="list-disc pl-6 space-y-2">
            <li>Use templates as starting points and customize them to fit your specific needs</li>
            <li>Maintain the core layout structure to ensure consistency across the application</li>
            <li>Follow the component hierarchy and organization patterns</li>
            <li>Adapt the content while preserving the design patterns</li>
            <li>Refer to the component documentation for details on individual components used in templates</li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const activeCategory = ref('all')
const selectedTemplate = ref(null)

// Initialize with query parameter if available
onMounted(() => {
  if (route.query.category && templateCategories.some(c => c.id === route.query.category)) {
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

const templateCategories = [
  { id: 'all', name: 'All Templates' },
  { id: 'page', name: 'Page Templates' },
  { id: 'section', name: 'Section Templates' },
  { id: 'layout', name: 'Layout Templates' }
]

const templates = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'A comprehensive dashboard layout with statistics, charts, and data tables.',
    icon: '📊',
    category: 'page',
    tags: ['Admin', 'Dashboard', 'Analytics']
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'A marketing-focused landing page with hero section, features, and call-to-action.',
    icon: '🏠',
    category: 'page',
    tags: ['Marketing', 'Homepage']
  },
  {
    id: 'blog',
    name: 'Blog Post',
    description: 'A clean and readable blog post layout with author info and related posts.',
    icon: '📝',
    category: 'page',
    tags: ['Content', 'Blog']
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'A documentation page with sidebar navigation and content sections.',
    icon: '📚',
    category: 'page',
    tags: ['Docs', 'Reference']
  },
  {
    id: 'settings',
    name: 'Settings Page',
    description: 'A user settings page with form sections and navigation tabs.',
    icon: '⚙️',
    category: 'page',
    tags: ['User', 'Settings', 'Forms']
  },
  {
    id: 'profile',
    name: 'User Profile',
    description: 'A user profile page with personal information and activity history.',
    icon: '👤',
    category: 'page',
    tags: ['User', 'Profile']
  },
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'A prominent hero section with headline, description, and call-to-action.',
    icon: '🦸',
    category: 'section',
    tags: ['Marketing', 'Hero']
  },
  {
    id: 'features',
    name: 'Features Grid',
    description: 'A grid layout for showcasing product or service features.',
    icon: '✨',
    category: 'section',
    tags: ['Marketing', 'Features']
  },
  {
    id: 'sidebar',
    name: 'Sidebar Layout',
    description: 'A responsive layout with collapsible sidebar navigation.',
    icon: '📑',
    category: 'layout',
    tags: ['Layout', 'Navigation']
  },
  {
    id: 'cards',
    name: 'Card Grid',
    description: 'A responsive grid layout for displaying card-based content.',
    icon: '🃏',
    category: 'layout',
    tags: ['Layout', 'Cards']
  }
]

const filteredTemplates = computed(() => {
  if (activeCategory.value === 'all') {
    return templates
  }
  return templates.filter(template => template.category === activeCategory.value)
})

// Template code examples
function getTemplateCode(template) {
  const codeExamples = {
    dashboard: {
      preview: `<div class="flex h-screen bg-gray-100 dark:bg-gray-900">
  <!-- Sidebar -->
  <div class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
    <!-- Sidebar content -->
  </div>
  
  <!-- Main content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <!-- Header content -->
    </header>
    
    <!-- Main content -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto p-4">
      <!-- Dashboard content -->
    </main>
  </div>
</div>`,
      vue: `<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <div class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div class="p-4">
        <h1 class="text-xl font-semibold">Dashboard</h1>
      </div>
      <nav class="mt-4">
        <!-- Navigation items -->
      </nav>
    </div>
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium">Dashboard</h2>
          <div class="flex items-center gap-4">
            <!-- User profile -->
          </div>
        </div>
      </header>
      
      <!-- Main content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <!-- Stat cards -->
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <!-- Chart -->
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <!-- Table -->
        </div>
      </main>
    </div>
  </div>
</template>`,
      react: `function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <nav className="mt-4">
          {/* Navigation items */}
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Dashboard</h2>
            <div className="flex items-center gap-4">
              {/* User profile */}
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Stat cards */}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            {/* Chart */}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            {/* Table */}
          </div>
        </main>
      </div>
    </div>
  );
}`
    },
    documentation: {
      preview: `<div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Sidebar -->
  <div class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
    <!-- Sidebar content -->
  </div>
  
  <!-- Main content -->
  <div class="flex-1">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <!-- Header content -->
    </header>
    
    <!-- Content -->
    <div class="flex">
      <main class="flex-1 p-6">
        <!-- Documentation content -->
      </main>
      
      <!-- Table of contents -->
      <div class="w-64 p-6 border-l border-gray-200 dark:border-gray-700">
        <!-- TOC content -->
      </div>
    </div>
  </div>
</div>`,
      vue: `<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div class="p-4">
        <h1 class="text-xl font-semibold">Documentation</h1>
      </div>
      <nav class="mt-4 p-4">
        <!-- Navigation items -->
      </nav>
    </div>
    
    <!-- Main content -->
    <div class="flex-1">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium">Documentation</h2>
          <div class="flex items-center gap-4">
            <!-- Actions -->
          </div>
        </div>
      </header>
      
      <!-- Content -->
      <div class="flex">
        <main class="flex-1 p-6">
          <h1 class="text-3xl font-bold mb-6">Getting Started</h1>
          <p class="mb-4">Documentation content goes here...</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Installation</h2>
          <p class="mb-4">Installation instructions go here...</p>
          
          <!-- Code block example -->
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4">
            <pre><code>npm install package-name</code></pre>
          </div>
        </main>
        
        <!-- Table of contents -->
        <div class="w-64 p-6 border-l border-gray-200 dark:border-gray-700">
          <h3 class="text-sm font-semibold uppercase text-gray-500 mb-4">On This Page</h3>
          <nav>
            <!-- TOC items -->
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>`,
      react: `function Documentation() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-semibold">Documentation</h1>
        </div>
        <nav className="mt-4 p-4">
          {/* Navigation items */}
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Documentation</h2>
            <div className="flex items-center gap-4">
              {/* Actions */}
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex">
          <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6">Getting Started</h1>
            <p className="mb-4">Documentation content goes here...</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Installation</h2>
            <p className="mb-4">Installation instructions go here...</p>
            
            {/* Code block example */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4">
              <pre><code>npm install package-name</code></pre>
            </div>
          </main>
          
          {/* Table of contents */}
          <div className="w-64 p-6 border-l border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">On This Page</h3>
            <nav>
              {/* TOC items */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}`
    }
  }
  
  return codeExamples[template.id] || {
    preview: `<!-- ${template.name} template preview -->`,
    vue: `<template>\n  <!-- ${template.name} template content -->\n</template>`,
    react: `function ${template.name.replace(/\s+/g, '')}() {\n  return (\n    <div>\n      {/* ${template.name} template content */}\n    </div>\n  );\n}`
  }
}
</script>

<style scoped>
.template-card {
  transition: transform 0.2s ease;
}

.template-card:hover {
  transform: translateY(-4px);
}
</style>