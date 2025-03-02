<template>
  <div v-if="headings.length > 0" class="docs-toc">
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

@media (max-width: 1280px) {
  .docs-toc {
    display: none;
  }
}
</style>