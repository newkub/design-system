<template>
  <div v-if="headings.length > 0" class="mobile-toc">
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
            @click="handleClick(heading.id)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

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
const isOpen = ref(false);
const observer = ref(null);

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

function handleClick(id) {
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
    
    // Close the mobile TOC
    isOpen.value = false;
  }
}
</script>

<style>
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

@media (max-width: 1280px) {
  .mobile-toc {
    display: block;
  }
}
</style>