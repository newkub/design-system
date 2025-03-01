<template>
  <NuxtLayout name="default">
    <!-- Hero section -->
    <div class="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="md:w-1/2">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Nuxt Documentation
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A comprehensive guide to building modern web applications with Nuxt and UnoCSS.
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/docs/guide/getting-started" class="btn btn-primary">
                Get Started
              </NuxtLink>
              <NuxtLink to="/docs/guide" class="btn btn-outline">
                Documentation
              </NuxtLink>
            </div>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <div class="w-64 h-64 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 rounded-full flex items-center justify-center">
              <div class="i-logos-nuxt-icon text-8xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Features section -->
    <div class="py-16 bg-white dark:bg-gray-950">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-document text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Comprehensive Docs</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Detailed documentation with examples and guides for all Nuxt features.
            </p>
          </div>
          
          <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-assembly text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Design System</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              A complete design system with components, tokens, and templates.
            </p>
          </div>
          
          <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-api text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">API Reference</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Detailed API documentation with interactive examples and code snippets.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Getting started section -->
    <div class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Get Started Quickly
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Start building with Nuxt in minutes. Our documentation provides everything you need to create modern, performant web applications.
            </p>
            <NuxtLink to="/docs/guide/installation" class="btn btn-primary">
              Installation Guide
            </NuxtLink>
          </div>
          <div class="md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <pre class="language-bash"><code>npx nuxi init my-project
cd my-project
npm install
npm run dev</code></pre>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Latest updates section -->
    <div class="py-16 bg-white dark:bg-gray-950">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Latest Updates</h2>
          <NuxtLink to="/changelog" class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
            <span>View all updates</span>
            <div class="i-carbon-arrow-right"></div>
          </NuxtLink>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">New Color Palette</h3>
                <p class="text-gray-600 dark:text-gray-400">Updated primary and secondary color palettes with improved accessibility.</p>
              </div>
              <Badge type="info">New</Badge>
            </div>
          </div>
          
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">Form Components</h3>
                <p class="text-gray-600 dark:text-gray-400">Added new form components including select, checkbox, and radio buttons.</p>
              </div>
              <Badge type="success">Updated</Badge>
            </div>
          </div>
          
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">Page Templates</h3>
                <p class="text-gray-600 dark:text-gray-400">New page templates for common layouts and use cases.</p>
              </div>
              <Badge type="info">New</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>