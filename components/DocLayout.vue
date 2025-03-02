<template>
  <div class="flex flex-col min-h-screen">
    <DocNavbar />
    
    <div class="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      <!-- Sidebar -->
      <DocSidebar class="w-64 shrink-0" />
      
      <!-- Main content -->
      <div class="flex-1 prose dark:prose-invert prose-primary max-w-none">
        <slot />
      </div>
      
      <!-- Table of contents -->
      <div v-if="showToc" class="w-64 hidden lg:block shrink-0">
        <TableOfContents :links="tocLinks" />
      </div>
    </div>
    
    <DocFooter />
  </div>
</template>

<script setup>
// Get the current route
const route = useRoute()
const props = defineProps({
  showToc: {
    type: Boolean,
    default: true
  },
  tocLinks: {
    type: Array,
    default: () => []
  }
})

// Extract headings from the page content to build the table of contents if not provided
const { data: page } = await useAsyncData(`content-${route.path}`, () => {
  return queryContent().where({ _path: route.path }).findOne()
})

// Transform headings into TOC links if not provided
const computedTocLinks = computed(() => {
  if (props.tocLinks && props.tocLinks.length > 0) {
    return props.tocLinks
  }
  
  if (!page.value || !page.value.body || !page.value.body.toc) {
    return []
  }
  
  return page.value.body.toc.links.map(link => ({
    id: link.id,
    text: link.text,
    depth: link.depth
  }))
})
</script>