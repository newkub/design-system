<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10 w-full">
    <div class="w-full px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-400">
        <img v-if="logo" :src="logoSrc" alt="Logo" class="h-8" />
        <div v-else class="i-logos-nuxt-icon text-2xl"></div>
        {{ siteTitle }}
      </NuxtLink>
      
      <nav class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink 
            v-for="item in nav" 
            :key="item.link" 
            :to="item.link" 
            class="nav-link relative py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" 
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': isActive(item.link, item.activeMatch) }"
          >
            {{ item.text }}
          </NuxtLink>
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
        
        <a v-for="link in socialLinks" :key="link.link" :href="link.link" target="_blank" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div :class="`i-carbon-logo-${link.icon} text-lg`"></div>
        </a>
      </nav>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div class="px-4 py-2 space-y-2">
        <NuxtLink 
          v-for="item in nav" 
          :key="item.link" 
          :to="item.link" 
          class="block py-2 hover:text-primary-600 dark:hover:text-primary-400" 
          @click="mobileMenuOpen = false"
        >
          {{ item.text }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const mobileMenuOpen = ref(false)

const { themeConfig } = useConfig()
const { nav } = useNav()

const siteTitle = computed(() => useConfig().title)
const logo = computed(() => themeConfig.logo)
const logoSrc = computed(() => {
  if (!logo.value) return null
  
  if (typeof logo.value === 'string') {
    return logo.value
  }
  
  return isDark.value ? logo.value.dark : logo.value.light
})

const socialLinks = computed(() => themeConfig.socialLinks || [])

function toggleDark() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Check if the current route matches the given path or activeMatch pattern
function isActive(path, activeMatch) {
  if (activeMatch) {
    return new RegExp(activeMatch).test(route.path)
  }
  return route.path.startsWith(path)
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
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