<template>
  <NuxtLayout :name="layoutName">
    <div>
      <ContentDoc v-slot="{ doc }">
        <template v-if="doc">
          <div class="flex gap-8">
            <div class="prose dark:prose-invert prose-primary max-w-none flex-1">
              <h1 v-if="doc.title" id="page-title">{{ doc.title }}</h1>
              <ContentRenderer :value="doc" />
            </div>
          </div>
          
          <div v-if="prev || next" class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div class="flex justify-between">
              <NuxtLink 
                v-if="prev" 
                :to="prev._path" 
                class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <div class="i-carbon-arrow-left"></div>
                <span>{{ prev.title }}</span>
              </NuxtLink>
              <div v-else></div>
              
              <NuxtLink 
                v-if="next" 
                :to="next._path" 
                class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>{{ next.title }}</span>
                <div class="i-carbon-arrow-right"></div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </ContentDoc>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { path } = useRoute()

const { data: page } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})

// Determine the layout based on the path
const layoutName = computed(() => {
  if (path.startsWith('/docs/')) {
    return 'docs'
  }
  return 'default'
})

// Use ref for prev and next to ensure reactivity
const prev = ref(null)
const next = ref(null)

// Fetch prev and next in onMounted to avoid hydration mismatches
onMounted(async () => {
  try {
    const [prevDoc, nextDoc] = await Promise.all([
      queryContent()
        .where({ 
          _path: { $ne: path },
          _path: { $regex: path.split('/')[1] } // Only get related content in the same section
        })
        .sort({ _path: -1 })
        .findOne(),
      queryContent()
        .where({ 
          _path: { $ne: path },
          _path: { $regex: path.split('/')[1] } // Only get related content in the same section
        })
        .sort({ _path: 1 })
        .findOne()
    ])
    
    prev.value = prevDoc
    next.value = nextDoc
  } catch (error) {
    console.error('Error fetching prev/next navigation:', error)
  }
})
</script>