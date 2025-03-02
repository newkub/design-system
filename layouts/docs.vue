<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <div class="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      <!-- Left sidebar - Navigation -->
      <DocSidebar class="w-64 shrink-0" />
      
      <!-- Main content -->
      <div class="flex-1 prose dark:prose-invert prose-primary max-w-none">
        <slot />
      </div>
      
      <!-- Right sidebar - Table of contents -->
      <div class="w-64 hidden lg:block shrink-0">
        <TableOfContents :links="tocLinks" />
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
// Get the current route
const route = useRoute()

// Extract headings from the page content to build the table of contents
const { data: page } = await useAsyncData(`content-${route.path}`, () => {
  return queryContent().where({ _path: route.path }).findOne()
})

// Transform headings into TOC links
const tocLinks = computed(() => {
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