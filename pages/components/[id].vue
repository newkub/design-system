<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useComponentMetadata } from '~/composables/useComponentMetadata';

const route = useRoute();
const componentId = String(route.params.id);

const { components, generateComponentDocs } = useComponentMetadata();
const markdownContent = ref('');
const isLoading = ref(true);

onMounted(async () => {
  try {
    // First try to load from content directory
    const { data } = await useAsyncData(`component-${componentId}`, () => 
      queryContent(`/components/${componentId}`).find()
    );
    
    if (data.value && data.value.length > 0) {
      // Content file exists, use ContentDoc to render it
      isLoading.value = false;
      return;
    }
    
    // If no content file, generate markdown from component metadata
    markdownContent.value = generateComponentDocs(componentId);
    isLoading.value = false;
  } catch (err) {
    console.error('Error loading component documentation:', err);
    markdownContent.value = generateComponentDocs(componentId);
    isLoading.value = false;
  }
});
</script>

<template>
  <NuxtLayout name="docs">
    <div v-if="isLoading" class="py-12 flex justify-center">
      <div class="i-carbon-circle-dash text-5xl text-gray-300 animate-spin"></div>
    </div>
    
    <div v-else>
      <!-- Try to use ContentDoc first -->
      <ContentDoc :path="`/components/${componentId}`">
        <!-- Fallback to generated markdown if no content file exists -->
        <template #not-found>
          <div class="prose py-8" v-if="markdownContent">
            <ContentRenderer :value="{ body: markdownContent }" />
          </div>
          <div v-else class="text-center py-12">
            <h1 class="text-3xl font-bold mb-4">Component Not Found</h1>
            <p class="text-gray-600 mb-6">The component you're looking for doesn't exist or has no documentation.</p>
            <NuxtLink to="/components" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Components
            </NuxtLink>
          </div>
        </template>
      </ContentDoc>
    </div>
  </NuxtLayout>
</template>