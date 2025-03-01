<template>
  <NuxtLayout name="page">
    <ContentDoc :path="`/blog/${slug}`" v-slot="{ doc }">
      <div v-if="doc" class="max-w-3xl mx-auto">
        <div class="prose dark:prose-invert prose-primary max-w-none">
          <ContentRenderer :value="doc" />
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-12">
        <div class="text-4xl mb-4">😢</div>
        <h2 class="text-2xl font-bold mb-2">Post Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
        <NuxtLink to="/blog" class="btn btn-primary">Back to Blog</NuxtLink>
      </div>
    </ContentDoc>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
</script>