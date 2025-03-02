<script setup>
import { useRoute } from 'vue-router';
import { useDocsConfig } from '~/composables/useDocsConfig';

const route = useRoute();
const { themeConfig } = useDocsConfig();

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
</script>

<template>
  <aside class="docs-sidebar w-64 border-r border-gray-200 bg-gray-50 hidden md:block overflow-y-auto">
    <div class="p-4">
      <div v-for="(section, sectionIndex) in sidebarItems" :key="section?.text || sectionIndex" class="mb-6" v-if="section && section.text">
        <h3 class="text-sm font-semibold text-gray-500 mb-2">{{ section.text }}</h3>
        <ul class="space-y-1" v-if="section.items && section.items.length">
          <li v-for="(item, itemIndex) in section.items" :key="item?.text || itemIndex" v-if="item && item.text && item.link">
            <NuxtLink 
              :to="item.link" 
              class="block px-2 py-1.5 text-sm rounded-md"
              :class="currentPath === item.link ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'"
            >
              {{ item.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style>
.docs-sidebar {
  height: 100vh;
  position: sticky;
  top: 0;
}
</style>