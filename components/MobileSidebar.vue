<script setup>
import { useRoute } from 'vue-router';
import { useDocsConfig } from '~/composables/useDocsConfig';
import { ref, computed } from 'vue';

const route = useRoute();
const { themeConfig } = useDocsConfig();

const isOpen = ref(false);
const currentPath = computed(() => route.path);

// Store the collapsed state of each section
const collapsedSections = ref(new Map());

// Initialize collapsed state from config
function initializeCollapsedState(items) {
  if (!items) return;
  
  items.forEach((section, index) => {
    if (section && section.collapsible) {
      // Use the config's collapsed state or default to false
      const key = `${section.text}-${index}`;
      if (!collapsedSections.value.has(key)) {
        collapsedSections.value.set(key, section.collapsed || false);
      }
    }
  });
}

const sidebarItems = computed(() => {
  const path = currentPath.value;
  
  // Make sure themeConfig and themeConfig.sidebar exist
  if (!themeConfig || !themeConfig.sidebar) {
    return [];
  }
  
  // Find the matching sidebar configuration based on the current path
  for (const [prefix, items] of Object.entries(themeConfig.sidebar)) {
    if (path.startsWith(prefix)) {
      // Initialize collapsed state for this sidebar
      initializeCollapsedState(items);
      return items || [];
    }
  }
  
  // Default to the first sidebar if no match and it exists
  if (Object.values(themeConfig.sidebar).length > 0) {
    const firstSidebar = Object.values(themeConfig.sidebar)[0];
    // Initialize collapsed state for the first sidebar
    initializeCollapsedState(firstSidebar);
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

// Toggle section collapse state
function toggleSection(section, index) {
  if (section && section.collapsible) {
    const key = `${section.text}-${index}`;
    collapsedSections.value.set(key, !collapsedSections.value.get(key));
  }
}

// Check if a section is collapsed
function isSectionCollapsed(section, index) {
  if (!section || !section.collapsible) return false;
  const key = `${section.text}-${index}`;
  return collapsedSections.value.get(key);
}

// Check if the current path is in a section's items
function isActiveSection(section) {
  if (!section || !section.items) return false;
  return section.items.some(item => item && item.link === currentPath.value);
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
            <div 
              class="flex items-center justify-between mb-2 cursor-pointer"
              :class="{ 'text-blue-600': isActiveSection(section) }"
              @click="toggleSection(section, sectionIndex)"
            >
              <h3 class="text-sm font-semibold" :class="isActiveSection(section) ? 'text-blue-600' : 'text-gray-500'">
                {{ section.text }}
              </h3>
              <div 
                v-if="section.collapsible" 
                class="text-gray-400 transition-transform duration-200"
                :class="isSectionCollapsed(section, sectionIndex) ? 'i-carbon-chevron-right' : 'i-carbon-chevron-down'"
              ></div>
            </div>
            
            <ul 
              v-if="section.items && section.items.length" 
              class="space-y-1 transition-all duration-200 overflow-hidden"
              :class="{ 'h-0 opacity-0': section.collapsible && isSectionCollapsed(section, sectionIndex) }"
            >
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