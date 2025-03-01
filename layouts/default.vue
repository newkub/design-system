<template>
  <div class="flex flex-col min-h-screen w-full">
    <Navbar />
    <div class="flex-1 flex w-full">
      <Sidebar v-if="showSidebar" />
      <main class="flex-1 px-4 py-8 md:px-8 lg:px-12 w-full">
        <div class="max-w-5xl mx-auto w-full">
          <slot />
        </div>
      </main>
      <TableOfContents v-if="showToc && tocLinks.length > 0" :links="tocLinks" class="w-64 hidden xl:block shrink-0" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute()

// Table of contents data
const tocLinks = ref([])

// Determine if we should show the sidebar and TOC based on the route
const showSidebar = computed(() => {
  return route.path.startsWith('/guide/') || 
         route.path === '/guide';
})

const showToc = computed(() => {
  return route.path.startsWith('/guide/');
})

// Generate table of contents from headings
onMounted(() => {
  // Wait for content to be rendered
  setTimeout(() => {
    const headings = Array.from(document.querySelectorAll('main h2, main h3')).filter(Boolean)
    
    if (headings.length > 0) {
      tocLinks.value = headings.map(heading => {
        // If heading doesn't have an id, generate one from the text
        if (!heading.id) {
          heading.id = heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        
        return {
          id: heading.id,
          text: heading.textContent,
          depth: parseInt(heading.tagName.substring(1))
        }
      })
    }
  }, 200)
})
</script>