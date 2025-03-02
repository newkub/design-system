<template>
  <div v-if="headings.length > 0" class="docs-toc">
    <!-- Desktop TOC -->
    <div class="desktop-toc">
      <div class="docs-toc__title">On this page</div>
      <nav class="docs-toc__nav">
        <ul class="docs-toc__list">
          <li 
            v-for="heading in headings" 
            :key="heading.id" 
            class="docs-toc__item"
            :class="`docs-toc__item--${heading.depth}`"
          >
            <a 
              :href="`#${heading.id}`" 
              class="docs-toc__link"
              :class="{ 'docs-toc__link--active': activeId === heading.id }"
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
        class="mobile-toc__toggle"
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
        class="mobile-toc__menu"
      >
        <ul class="mobile-toc__list">
          <li 
            v-for="heading in headings" 
            :key="heading.id" 
            class="mobile-toc__item"
            :class="`mobile-toc__item--${heading.depth}`"
          >
            <a 
              :href="`#${heading.id}`" 
              class="mobile-toc__link"
              :class="{ 'mobile-toc__link--active': activeId === heading.id }"
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

.docs-toc__title {
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.docs-toc__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.docs-toc__item {
  margin-bottom: 0.5rem;
}

.docs-toc__item--2 {
  margin-left: 0;
}

.docs-toc__item--3 {
  margin-left: 1rem;
  font-size: 0.8125rem;
}

.docs-toc__link {
  color: #6b7280;
  text-decoration: none;
  display: block;
  padding: 0.25rem 0;
  transition: color 0.2s;
  border-left: 2px solid transparent;
  padding-left: 0.75rem;
  margin-left: -0.75rem;
  line-height: 1.4;
}

.docs-toc__link:hover {
  color: #3b82f6;
}

.docs-toc__link--active {
  color: #3b82f6;
  border-left-color: #3b82f6;
  font-weight: 500;
}

/* Mobile TOC styles */
.mobile-toc {
  display: none;
  margin: 1.5rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.mobile-toc__toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border: none;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  text-align: left;
}

.mobile-toc__menu {
  border-top: 1px solid #e5e7eb;
  padding: 0.75rem 0;
  background-color: white;
}

.mobile-toc__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-toc__item {
  margin: 0;
}

.mobile-toc__item--2 {
  padding-left: 1rem;
}

.mobile-toc__item--3 {
  padding-left: 2rem;
}

.mobile-toc__link {
  display: block;
  padding: 0.5rem 1rem;
  color: #6b7280;
  text-decoration: none;
}

.mobile-toc__link:hover {
  background-color: #f3f4f6;
  color: #3b82f6;
}

.mobile-toc__link--active {
  color: #3b82f6;
  font-weight: 500;
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