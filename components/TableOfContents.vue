<template>
  <div class="toc-container sticky top-20 pl-4 border-l border-gray-200 dark:border-gray-800">
    <h3 class="text-sm font-semibold uppercase text-gray-500 mb-3">On This Page</h3>
    <nav>
      <ul class="space-y-2 text-sm">
        <li v-for="link in links" :key="link.id" class="toc-item" :class="{ 'pl-4': link.depth > 2 }">
          <a 
            :href="`#${link.id}`" 
            class="block py-1 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': activeId === link.id }"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
/**
 * @component TableOfContents
 * @description Displays a table of contents for the current page with active state tracking
 * @example
 * <TableOfContents :links="tocLinks" />
 */

interface TocLink {
  id: string;
  text: string;
  depth: number;
}

interface TableOfContentsProps {
  /**
   * Array of links to display in the table of contents
   */
  links: TocLink[];
}

const props = defineProps<TableOfContentsProps>()

const activeId = ref('')

onMounted(() => {
  observeHeadings()
  window.addEventListener('scroll', updateActiveHeading)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeId.value = id
    
    // Update URL hash without scrolling
    history.pushState(null, null, `#${id}`)
  }
}

function updateActiveHeading() {
  if (!props.links || props.links.length === 0) return
  
  const headings = props.links.map(link => document.getElementById(link.id)).filter(Boolean)
  
  if (headings.length === 0) return
  
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const rect = heading.getBoundingClientRect()
    
    // Check if the heading is in the viewport (with some offset)
    if (rect.top >= 0 && rect.top <= 200) {
      activeId.value = heading.id
      return
    }
  }
  
  // If we're at the top of the page, activate the first heading
  if (window.scrollY < 100 && headings.length > 0) {
    activeId.value = headings[0].id
  }
}

function observeHeadings() {
  // Initial update
  setTimeout(updateActiveHeading, 200)
}
</script>