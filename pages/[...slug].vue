<template>
  <NuxtLayout name="docs">
    <div class="prose py-8">
      <MobileTableOfContents />
      <ContentDoc>
        <template #not-found>
          <div class="text-center py-12">
            <h1 class="text-3xl font-bold mb-4">Page Not Found</h1>
            <p class="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
            <NuxtLink to="/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Home
            </NuxtLink>
          </div>
        </template>
      </ContentDoc>
    </div>
  </NuxtLayout>
</template>

<script setup>
// This ensures headings have IDs for the table of contents
import { useHead } from '#imports';

useHead({
  script: [
    {
      innerHTML: `
        document.addEventListener('DOMContentLoaded', () => {
          const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4');
          headings.forEach(heading => {
            if (!heading.id) {
              const id = heading.textContent
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              heading.id = id;
            }
          });
        });
      `,
      type: 'text/javascript'
    }
  ]
});
</script>