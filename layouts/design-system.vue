<template>
  <div class="flex flex-col min-h-screen w-full">
    <SiteHeader />
    <div class="flex-1 flex w-full">
      <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block p-4 shrink-0">
        <div class="sticky top-20">
          <div class="mb-6">
            <div class="font-semibold text-sm uppercase text-gray-500 mb-2">
              <h3>Design System</h3>
            </div>
            <ul class="space-y-1">
              <li>
                <NuxtLink to="/design-system" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                  :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system' }">
                  Overview
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/design-system/tokens" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                  :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/tokens' }">
                  Theme
                </NuxtLink>
              </li>
              
              <!-- Components with sub-items -->
              <li>
                <div 
                  class="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  @click="toggleComponentsMenu"
                >
                  <NuxtLink to="/design-system/components" class="block flex-1" 
                    :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.path.startsWith('/design-system/components') }">
                    Components
                  </NuxtLink>
                  <div :class="componentsMenuOpen ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
                </div>
                <ul v-show="componentsMenuOpen" class="pl-4 space-y-1 mt-1">
                  <li v-for="component in componentsList" :key="component.path">
                    <NuxtLink :to="component.path" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === component.path }">
                      {{ component.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              
              <!-- Templates with sub-items -->
              <li>
                <div 
                  class="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  @click="toggleTemplatesMenu"
                >
                  <NuxtLink to="/design-system/templates" class="block flex-1" 
                    :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/templates' }">
                    Templates
                  </NuxtLink>
                  <div :class="templatesMenuOpen ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
                </div>
                <ul v-show="templatesMenuOpen" class="pl-4 space-y-1 mt-1">
                  <li>
                    <NuxtLink to="/design-system/templates/landing" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/templates/landing' }">
                      Landing Page
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/design-system/templates/dashboard" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/templates/dashboard' }">
                      Dashboard
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/design-system/templates/blog" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/templates/blog' }">
                      Blog
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              
              <!-- Pages with sub-items -->
              <li>
                <div 
                  class="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  @click="togglePagesMenu"
                >
                  <NuxtLink to="/design-system/pages" class="block flex-1" 
                    :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/pages' }">
                    Pages
                  </NuxtLink>
                  <div :class="pagesMenuOpen ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
                </div>
                <ul v-show="pagesMenuOpen" class="pl-4 space-y-1 mt-1">
                  <li>
                    <NuxtLink to="/design-system/pages/login" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/pages/login' }">
                      Login
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/design-system/pages/profile" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/pages/profile' }">
                      Profile
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/design-system/pages/settings" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': $route.path === '/design-system/pages/settings' }">
                      Settings
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <main class="flex-1 px-4 py-8 md:px-8 lg:px-12 w-full">
        <div class="max-w-5xl mx-auto w-full">
          <slot />
        </div>
      </main>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
const route = useRoute()
const componentsMenuOpen = ref(true)
const templatesMenuOpen = ref(true)
const pagesMenuOpen = ref(true)

// Auto-open menus if we're on a related page
onMounted(() => {
  if (route.path.startsWith('/design-system/components')) {
    componentsMenuOpen.value = true
  }
  if (route.path.startsWith('/design-system/templates')) {
    templatesMenuOpen.value = true
  }
  if (route.path.startsWith('/design-system/pages')) {
    pagesMenuOpen.value = true
  }
})

// Watch for route changes to update menu state
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/design-system/components')) {
    componentsMenuOpen.value = true
  }
  if (newPath.startsWith('/design-system/templates')) {
    templatesMenuOpen.value = true
  }
  if (newPath.startsWith('/design-system/pages')) {
    pagesMenuOpen.value = true
  }
})

function toggleComponentsMenu() {
  componentsMenuOpen.value = !componentsMenuOpen.value
}

function toggleTemplatesMenu() {
  templatesMenuOpen.value = !templatesMenuOpen.value
}

function togglePagesMenu() {
  pagesMenuOpen.value = !pagesMenuOpen.value
}

// List of components for the sidebar
const componentsList = [
  // Display components
  { name: 'Avatar', path: '/design-system/components/avatar' },
  { name: 'Badge', path: '/design-system/components/badge' },
  { name: 'Button', path: '/design-system/components/button' },
  { name: 'Card', path: '/design-system/components/card' },
  { name: 'Divider', path: '/design-system/components/divider' },
  { name: 'Icon', path: '/design-system/components/icon' },
  { name: 'Image', path: '/design-system/components/image' },
  { name: 'Progress', path: '/design-system/components/progress' },
  { name: 'Skeleton', path: '/design-system/components/skeleton' },
  { name: 'Tag', path: '/design-system/components/tag' },
  { name: 'Tooltip', path: '/design-system/components/tooltip' },
  
  // Layout components
  { name: 'Container', path: '/design-system/components/container' },
  { name: 'Grid', path: '/design-system/components/grid' },
  { name: 'Stack', path: '/design-system/components/stack' },
  
  // Navigation components
  { name: 'Breadcrumb', path: '/design-system/components/breadcrumb' },
  { name: 'Dropdown', path: '/design-system/components/dropdown' },
  { name: 'Menu', path: '/design-system/components/menu' },
  { name: 'Navigation', path: '/design-system/components/navigation' },
  { name: 'Pagination', path: '/design-system/components/pagination' },
  { name: 'Tabs', path: '/design-system/components/tabs' },
  
  // Form components
  { name: 'Checkbox', path: '/design-system/components/checkbox' },
  { name: 'Input', path: '/design-system/components/input' },
  { name: 'Radio', path: '/design-system/components/radio' },
  { name: 'Select', path: '/design-system/components/select' },
  { name: 'Slider', path: '/design-system/components/slider' },
  { name: 'Switch', path: '/design-system/components/switch' },
  { name: 'Textarea', path: '/design-system/components/textarea' },
  
  // Feedback components
  { name: 'Alert', path: '/design-system/components/alert' },
  { name: 'Dialog', path: '/design-system/components/dialog' },
  { name: 'Modal', path: '/design-system/components/modal' },
  { name: 'Notification', path: '/design-system/components/notification' },
  { name: 'Popover', path: '/design-system/components/popover' },
  { name: 'Toast', path: '/design-system/components/toast' },
  
  // Data display components
  { name: 'Accordion', path: '/design-system/components/accordion' },
  { name: 'Code Block', path: '/design-system/components/code-block' },
  { name: 'List', path: '/design-system/components/list' },
  { name: 'Table', path: '/design-system/components/table' },
  { name: 'Timeline', path: '/design-system/components/timeline' },
]
</script>