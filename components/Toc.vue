<template>
  <div v-if="headings.length > 0" class="docs-toc">
    <!-- Desktop TOC -->
    <div class="desktop-toc">
      <div class="font-semibold text-gray-500 mb-3 text-sm uppercase tracking-wide">On this page</div>
      <nav>
        <ul class="list-none p-0 m-0">
          <li 
            v-for="heading in headings" 
            :key="heading.id" 
            class="mb-2"
            :class="{ 'ml-0': heading.depth === 2, 'ml-4': heading.depth === 3 }"
          >
            <a 
              :href="`#${heading.id}`" 
              class="block py-1 text-gray-600 no-underline hover:text-blue-600 text-sm leading-tight"
              :class="{ 'text-blue-600 font-medium border-l-2 border-blue-600 pl-2 -ml-2': activeId === heading.id }"
              @click.prevent="scrollToHeading(heading.id)"
            >
              {{ heading.text }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    
    <!-- Mobile TOC -->
    <div class="mobile-toc">
      <button 
        class="w-full flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-md font-medium text-gray-700"
        @click="isOpen = !isOpen"
        :aria-expanded="isOpen"
        aria-controls="mobile-toc-menu"
      >
        <span>On this page</span>
        <div :class="isOpen ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'" class="text-sm"></div>
      </button>
      
      <div 
        id="mobile-toc-menu"
        v-show="isOpen" 
        class="border-x border-b border-gray-200 rounded-b-md p-3 bg-white"
      >
        <ul class="list-none p-0 m-0">
          <li 
            v-for="heading in headings" 
            :key="heading.id" 
            :class="{ 'pl-0': heading.depth === 2, 'pl-4': heading.depth === 3 }"
          >
            <a 
              :href="`#${heading.id}`" 
              class="block py-2 text-gray-700 hover:text-blue-600"
              :class="{ 'text-blue-600 font-medium': activeId === heading.id }"
              @click="handleMobileClick(heading.id)"
            >
              {{ heading.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Mobile Sidebar Toggle Button (Replaces MobileSidebar component) -->
    <div class="sidebar-toggle md:hidden">
      <button 
        class="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-20"
        @click="toggleSidebar"
        aria-label="Toggle sidebar"
      >
        <div v-if="!isSidebarOpen" class="i-carbon-list text-xl"></div>
        <div v-else class="i-carbon-close text-xl"></div>
      </button>
      
      <!-- Mobile Sidebar Overlay -->
      <div 
        v-if="isSidebarOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-10"
        @click="closeSidebar"
      ></div>
      
      <!-- Mobile Sidebar Content -->
      <aside 
        class="fixed right-0 top-0 bottom-0 w-3/4 bg-white z-20 transform transition-transform duration-300 overflow-y-auto"
        :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
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
                      :class="currentPath === item.link ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:(text-gray-900 bg-gray-100)'"
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDocsConfig } from '~/composables/useDocsConfig';

const props = defineProps({
  selector: {
    type: String,
    default: '.prose h2, .prose h3'
  },
  minHeadings: {
    type: Number,
    default: 2
  }
});

const headings = ref([]);
const activeId = ref('');
const observer = ref(null);
const isOpen = ref(false);

// Mobile sidebar state
const isSidebarOpen = ref(false);
const route = useRoute();
const { themeConfig } = useDocsConfig();
const currentPath = computed(() => route.path);

// Store the collapsed state of each section
const collapsedSections = ref(new Map());

onMounted(async () => {
  // Wait for content to be fully rendered
  await nextTick();
  
  // Get all headings from the content
  const elements = document.querySelectorAll(props.selector);
  
  if (elements.length >= props.minHeadings) {
    headings.value = Array.from(elements).map(el => ({
      id: el.id,
      text: el.textContent,
      depth: parseInt(el.tagName.charAt(1))
    }));
    
    // Set up intersection observer for active heading detection
    setupIntersectionObserver();
  }
  
  // Initialize collapsed state for sidebar
  initializeCollapsedState(sidebarItems.value);
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

function setupIntersectionObserver() {
  observer.value = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
          break;
        }
      }
    },
    {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    }
  );
  
  // Observe all headings
  headings.value.forEach(heading => {
    const element = document.getElementById(heading.id);
    if (element) {
      observer.value.observe(element);
    }
  });
}

function scrollToHeading(id) {
  const element = document.getElementById(id);
  if (element) {
    // Update URL hash
    window.history.pushState({}, '', `#${id}`);
    
    // Scroll to element with offset for header
    const headerHeight = 80; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - headerHeight,
      behavior: 'smooth'
    });
  }
}

function handleMobileClick(id) {
  scrollToHeading(id);
  // Close the mobile TOC after clicking
  isOpen.value = false;
}

// Mobile sidebar functions
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebar() {
  isSidebarOpen.value = false;
}

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

// Get sidebar items based on current path
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
    return Object.values(themeConfig.sidebar)[0] || [];
  }
  
  // Return empty array if no sidebar config found
  return [];
});
</script>

<style>
.docs-toc {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  width: 240px;
  padding-left: 1.5rem;
  font-size: 0.875rem;
}

.desktop-toc {
  display: block;
}

/* Mobile TOC styles */
.mobile-toc {
  display: none;
  margin: 1.5rem 0;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .desktop-toc {
    display: none;
  }
  
  .mobile-toc {
    display: block;
  }
}

/* Sidebar toggle button styles */
.sidebar-toggle button {
  z-index: 30;
}
</style>