<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';
import { ref } from 'vue';

const { themeConfig } = useDocsConfig();
const { nav = [], logo, siteTitle } = themeConfig || {};

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>

<template>
  <header class="sticky top-0 z-20 w-full border-b border-gray-200 bg-white h-16">
    <div class="max-w-full mx-auto flex items-center justify-between h-full px-6">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="flex items-center gap-2" @click="closeMobileMenu">
          <img v-if="logo" :src="logo" alt="Logo" class="h-8 w-8" />
          <span class="text-lg font-semibold">{{ siteTitle }}</span>
        </NuxtLink>
      </div>
      
      <nav class="hidden md:flex items-center gap-4">
        <template v-for="item in nav" :key="item?.text">
          <NuxtLink 
            v-if="item && !item.items"
            :to="item.link"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
          >
            {{ item.text }}
          </NuxtLink>
          
          <div v-else-if="item && item.items" class="relative group">
            <button class="flex items-center gap-1 text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
              {{ item.text }}
              <div class="i-carbon-chevron-down text-xs transition-transform group-hover:rotate-180"></div>
            </button>
            <div class="absolute top-full right-0 hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-40">
              <NuxtLink 
                v-for="subItem in item.items" 
                :key="subItem?.text"
                :to="subItem.link"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {{ subItem.text }}
              </NuxtLink>
            </div>
          </div>
        </template>
      </nav>
      
      <button 
        class="md:hidden flex items-center justify-center" 
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
        <template v-for="item in nav" :key="item?.text">
          <div v-if="item" class="py-2">
            <NuxtLink 
              v-if="!item.items" 
              :to="item.link" 
              class="block py-2 text-gray-700 hover:text-gray-900"
              @click="closeMobileMenu"
            >
              {{ item.text }}
            </NuxtLink>
            
            <div v-else>
              <div class="py-2 font-medium text-gray-900 flex items-center">
                {{ item.text }}
                <div class="i-carbon-chevron-down text-xs ml-1"></div>
              </div>
              <div class="pl-4 border-l border-gray-200">
                <NuxtLink 
                  v-for="subItem in item.items" 
                  :key="subItem?.text"
                  :to="subItem.link"
                  class="block py-2 text-gray-700 hover:text-gray-900"
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