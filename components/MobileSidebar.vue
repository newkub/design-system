<script setup>
import { useRoute } from 'vue-router';
import { useDocsConfig } from '~/composables/useDocsConfig';
import { ref } from 'vue';

const route = useRoute();
const { themeConfig } = useDocsConfig();

const isOpen = ref(false);
const currentPath = computed(() => route.path);

const sidebarItems = computed(() => {
  const path = currentPath.value;
  
  // Make sure themeConfig and themeConfig.sidebar exist
  if (!themeConfig || !themeConfig.sidebar) {
    return [];
  }
  
  // Find the matching sidebar configuration based on the current path
  for (const [prefix, items] of Object.entries(themeConfig.sidebar)) {
    if (path.startsWith(prefix)) {
      return items || [];
    }
  }
  
  // Default to the first sidebar if no match and it exists
  if (Object.values(themeConfig.sidebar).length > 0) {
    const firstSidebar = Object.values(themeConfig.sidebar)[0];
    return firstSidebar || [];
  }
  
  // Return empty array if no sidebar config found
  return [];
});

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

function closeSidebar() {
  isOpen.value = false;
}
</script>

<template>
  <div class="md:hidden">
    <!-- Sidebar Toggle Button -->
    <button 
      class="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-20"
      @click="toggleSidebar"
      aria-label="Toggle sidebar"
    >
      <div v-if="!isOpen" class="i-carbon-list text-xl"></div>
      <div v-else class="i-carbon-close text-xl"></div>
    </button>
    
    <!-- Mobile Sidebar -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      @click="closeSidebar"
    ></div>
    
    <aside 
      class="fixed right-0 top-0 bottom-0 w-3/4 bg-white z-20 transform transition-transform duration-300 overflow-y-auto"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="p-4">
        <template v-for="(section, sectionIndex) in sidebarItems" :key="sectionIndex">
          <div v-if="section && section.text" class="mb-6">
            <h3 class="text-sm font-semibold text-gray-500 mb-2">{{ section.text }}</h3>
            <ul v-if="section.items && section.items.length" class="space-y-1">
              <template v-for="(item, itemIndex) in section.items" :key="itemIndex">
                <li v-if="item && item.text && item.link">
                  <NuxtLink 
                    :to="item.link" 
                    class="block px-2 py-1.5 text-sm rounded-md"
                    :class="currentPath === item.link ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'"
                    @click="closeSidebar"
                  >
                    {{ item.text }}
                  </NuxtLink>
                </li>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </aside>
  </div>
</template>