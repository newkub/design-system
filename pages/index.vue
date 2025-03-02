<template>
  <NuxtLayout name="page">
    <div class="container mx-auto px-4 py-16 max-w-6xl">
      <!-- Hero Section -->
      <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div class="md:w-1/2">
          <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600">
            Design System Documentation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            A comprehensive guide to our design system, components, and best practices for building beautiful, consistent user interfaces.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/docs/guide/getting-started" class="btn btn-primary">
              Get Started
            </NuxtLink>
            <NuxtLink to="/design-system/components" class="btn btn-outline">
              View Components
            </NuxtLink>
          </div>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <div class="w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center">
            <div class="i-carbon-assembly text-8xl text-primary-500"></div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Why Use Our Design System?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-accessibility text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Accessible</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Built with accessibility in mind, ensuring all users can interact with our products regardless of abilities.
            </p>
          </div>
          
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-chart-line-smooth text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Consistent</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Consistency across all products creates a unified experience that users can learn once and apply everywhere.
            </p>
          </div>
          
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-flexibility text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Flexible</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Components and patterns are designed to be adaptable to different contexts while maintaining consistency.
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Links Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Explore Our Documentation</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink to="/docs/guide/getting-started" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-document text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Getting Started</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Learn the basics and get up and running with our design system quickly.
            </p>
          </NuxtLink>
          
          <NuxtLink to="/design-system/tokens" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-color-palette text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Design Tokens</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Explore our design tokens including colors, typography, spacing, and more.
            </p>
          </NuxtLink>
          
          <NuxtLink to="/design-system/components" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-assembly text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Components</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Browse our component library with usage guidelines and code examples.
            </p>
          </NuxtLink>
          
          <NuxtLink to="/design-system/templates" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-template text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Templates</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Discover pre-built templates for common layouts and patterns.
            </p>
          </NuxtLink>
          
          <NuxtLink to="/docs/guide/theme" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-paint-brush text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Theming</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Learn how to customize and extend the design system to match your brand.
            </p>
          </NuxtLink>
          
          <NuxtLink to="/showcase" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-catalog text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Showcase</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              See examples of beautiful projects built with our design system.
            </p>
          </NuxtLink>
        </div>
      </div>

      <!-- Latest Updates Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Latest Updates</h2>
        <div class="space-y-4">
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">New Color Palette</h3>
                <p class="text-gray-600 dark:text-gray-400">Updated primary and secondary color palettes with improved accessibility.</p>
              </div>
              <Badge type="info">New</Badge>
            </div>
          </div>
          
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">Form Components</h3>
                <p class="text-gray-600 dark:text-gray-400">Added new form components including select, checkbox, and radio buttons.</p>
              </div>
              <Badge type="success">Updated</Badge>
            </div>
          </div>
          
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">Page Templates</h3>
                <p class="text-gray-600 dark:text-gray-400">New page templates for common layouts and use cases.</p>
              </div>
              <Badge type="info">New</Badge>
            </div>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <NuxtLink to="/changelog" class="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1">
            <span>View all updates</span>
            <div class="i-carbon-arrow-right"></div>
          </NuxtLink>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg p-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Dive into our documentation and start building beautiful, consistent user interfaces with our design system.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/docs/guide/getting-started" class="btn btn-primary">
            Read the Docs
          </NuxtLink>
          <NuxtLink to="/design-system/components" class="btn btn-outline">
            Explore Components
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Home page setup
</script>