<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10 w-full">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-400">
        <div class="i-logos-nuxt-icon text-2xl"></div>
        Design System
      </NuxtLink>
      
      <nav class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink to="/design-system/tokens" class="nav-link relative py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Theme</NuxtLink>
          <NuxtLink to="/design-system/components" class="nav-link relative py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Components</NuxtLink>
          <NuxtLink to="/design-system/templates" class="nav-link relative py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Templates</NuxtLink>
          <NuxtLink to="/docs" class="nav-link relative py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Documentation</NuxtLink>
        </div>
        
        <!-- Mobile menu button -->
        <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <div v-if="mobileMenuOpen" class="i-carbon-close text-lg"></div>
          <div v-else class="i-carbon-menu text-lg"></div>
        </button>
        
        <button @click="toggleDark()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div v-if="isDark" class="i-carbon-moon text-lg"></div>
          <div v-else class="i-carbon-sun text-lg"></div>
        </button>
        
        <a href="https://github.com/yourusername/design-system" target="_blank" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div class="i-carbon-logo-github text-lg"></div>
        </a>
      </nav>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div class="container mx-auto px-4 py-2 space-y-2">
        <NuxtLink 
          to="/design-system/tokens" 
          class="block py-2 hover:text-primary-600 dark:hover:text-primary-400" 
          @click="mobileMenuOpen = false"
        >
          Theme
        </NuxtLink>
        <NuxtLink 
          to="/design-system/components" 
          class="block py-2 hover:text-primary-600 dark:hover:text-primary-400" 
          @click="mobileMenuOpen = false"
        >
          Components
        </NuxtLink>
        <NuxtLink 
          to="/design-system/templates" 
          class="block py-2 hover:text-primary-600 dark:hover:text-primary-400" 
          @click="mobileMenuOpen = false"
        >
          Templates
        </NuxtLink>
        <NuxtLink 
          to="/docs" 
          class="block py-2 hover:text-primary-600 dark:hover:text-primary-400" 
          @click="mobileMenuOpen = false"
        >
          Documentation
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const mobileMenuOpen = ref(false)

function toggleDark() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--un-text-primary-600);
  transition: width 0.3s ease;
}

.dark .nav-link::after {
  background-color: var(--un-text-primary-400);
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active {
  color: var(--un-text-primary-600);
  font-weight: 500;
}

.dark .router-link-active {
  color: var(--un-text-primary-400);
}

.router-link-active::after {
  width: 100%;
}
</style>