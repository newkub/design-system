<template>
  <DocLayout :toc-links="tocLinks">
    <slot />
  </DocLayout>
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