<template>
  <div class="prose mx-auto py-8 px-4">
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
</template>