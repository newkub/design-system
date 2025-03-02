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
    <div class="p-4 pt-6">
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
</template>

<style>
.docs-sidebar {
  height: calc(100vh - 64px); /* Subtract header height */
  position: sticky;
  top: 64px; /* Match header height */
}
</style>