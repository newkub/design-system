<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { themeConfig } = useDocsConfig();
const { nav = [], logo, siteTitle, socialLinks = [] } = themeConfig || {};

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

// Check if a nav item is active
function isNavItemActive(item) {
  if (!item) return false;
  
  // For items with direct links
  if (item.link) {
    // Exact match for home page
    if (item.link === '/' && route.path === '/') return true;
    // Prefix match for other pages
    if (item.link !== '/' && route.path.startsWith(item.link)) return true;
  }
  
  // For dropdown items, check if any child is active
  if (item.items) {
    return item.items.some(subItem => 
      subItem.link === route.path || 
      (subItem.link !== '/' && route.path.startsWith(subItem.link))
    );
  }
  
  return false;
}
</script>

<template>
  <header class="sticky top-0 z-20 w-full border-b border-gray-200 bg-white h-16">
    <div class="max-w-full mx-auto flex items-center justify-between h-full px-6">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity" @click="closeMobileMenu">
          <img v-if="logo" :src="logo" alt="Logo" class="h-8 w-8" />
          <span class="text-lg font-semibold">{{ siteTitle }}</span>
        </NuxtLink>
      </div>
      
      <div class="flex items-center">
        <nav class="hidden md:flex items-center gap-4">
          <template v-for="item in nav" :key="item?.text">
            <NuxtLink 
              v-if="item && !item.items"
              :to="item.link"
              class="nav-link px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="isNavItemActive(item) ? 'active-nav-link' : 'inactive-nav-link'"
            >
              {{ item.text }}
            </NuxtLink>
            
            <div v-else-if="item && item.items" class="relative group">
              <button 
                class="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                :class="isNavItemActive(item) ? 'active-nav-link' : 'inactive-nav-link'"
              >
                {{ item.text }}
                <div class="i-carbon-chevron-down text-xs transition-transform group-hover:rotate-180"></div>
              </button>
              <div class="absolute top-full right-0 hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-40">
                <NuxtLink 
                  v-for="subItem in item.items" 
                  :key="subItem?.text"
                  :to="subItem.link"
                  class="block px-4 py-2 text-sm rounded-md transition-colors"
                  :class="route.path === subItem.link ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'"
                >
                  {{ subItem.text }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </nav>
        
        <!-- Social Links -->
        <div class="social-links hidden md:flex items-center ml-4 border-l border-gray-200 pl-4">
          <a 
            v-for="link in socialLinks" 
            :key="link.icon"
            :href="link.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link"
            :title="link.icon.charAt(0).toUpperCase() + link.icon.slice(1)"
          >
            <div :class="`i-logos-${link.icon} text-xl`"></div>
          </a>
        </div>
      </div>
      
      <button 
        class="md:hidden flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors" 
        @click="toggleMobileMenu"
        aria-label="Toggle mobile menu"
      >
        <div v-if="!isMobileMenuOpen" class="i-carbon-menu text-xl"></div>
        <div v-else class="i-carbon-close text-xl"></div>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 shadow-lg z-10"
    >
      <div class="px-4 py-2">
        <!-- Social Links for Mobile -->
        <div class="flex items-center justify-center gap-6 py-4 border-b border-gray-200 mb-2">
          <a 
            v-for="link in socialLinks" 
            :key="link.icon"
            :href="link.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link"
          >
            <div :class="`i-logos-${link.icon} text-xl`"></div>
          </a>
        </div>
        
        <template v-for="item in nav" :key="item?.text">
          <div v-if="item" class="py-2">
            <NuxtLink 
              v-if="!item.items" 
              :to="item.link" 
              class="block py-2 transition-colors"
              :class="isNavItemActive(item) ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'"
              @click="closeMobileMenu"
            >
              {{ item.text }}
            </NuxtLink>
            
            <div v-else>
              <div 
                class="py-2 font-medium flex items-center"
                :class="isNavItemActive(item) ? 'text-blue-600' : 'text-gray-900'"
              >
                {{ item.text }}
                <div class="i-carbon-chevron-down text-xs ml-1"></div>
              </div>
              <div class="pl-4 border-l border-gray-200">
                <NuxtLink 
                  v-for="subItem in item.items" 
                  :key="subItem?.text"
                  :to="subItem.link"
                  class="block py-2 transition-colors"
                  :class="route.path === subItem.link ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'"
                  @click="closeMobileMenu"
                >
                  {{ subItem.text }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.active-nav-link {
  color: #2563eb; /* blue-600 */
  background-color: #eff6ff; /* blue-50 */
}

.inactive-nav-link {
  color: #4b5563; /* gray-600 */
}

.inactive-nav-link:hover {
  color: #2563eb; /* blue-600 */
  background-color: #f3f4f6; /* gray-100 */
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280; /* gray-500 */
  transition: color 0.2s ease;
  width: 24px;
  height: 24px;
  border-radius: 4px;
}

.social-link:hover {
  color: #2563eb; /* blue-600 */
}
</style>