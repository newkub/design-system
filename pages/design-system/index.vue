<template>
  <NuxtLayout name="design-system">
    <div>
      <h1 class="text-4xl font-bold mb-6">Design System</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        A comprehensive guide to our design system, including design tokens, components, and pages.
      </p>
      
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <NuxtLink to="/design-system/tokens" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-carbon-color-palette text-3xl text-primary-500"></div>
            <h2 class="text-xl font-semibold">Theme</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Explore our theme tokens including colors, typography, spacing, and more.
          </p>
          
          <div class="flex justify-end">
            <span class="text-primary-600 dark:text-primary-400 flex items-center gap-1">
              <span>View theme</span>
              <div class="i-carbon-arrow-right"></div>
            </span>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/design-system/components" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-carbon-assembly text-3xl text-primary-500"></div>
            <h2 class="text-xl font-semibold">Components</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Browse our component library with usage guidelines and code examples.
          </p>
          
          <div class="flex justify-end">
            <span class="text-primary-600 dark:text-primary-400 flex items-center gap-1">
              <span>View components</span>
              <div class="i-carbon-arrow-right"></div>
            </span>
          </div>
        </NuxtLink>
        
        <NuxtLink to="/design-system/templates" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-carbon-template text-3xl text-primary-500"></div>
            <h2 class="text-xl font-semibold">Templates</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Discover pre-built templates for common layouts and patterns.
          </p>
          
          <div class="flex justify-end">
            <span class="text-primary-600 dark:text-primary-400 flex items-center gap-1">
              <span>View templates</span>
              <div class="i-carbon-arrow-right"></div>
            </span>
          </div>
        </NuxtLink>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
        <h2 class="text-2xl font-bold mb-4">Getting Started</h2>
        
        <p class="mb-4">
          Our design system provides a consistent framework for creating cohesive user experiences across all our products.
          It includes design tokens, components, and pages that can be used to build interfaces quickly and consistently.
        </p>
        
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 class="text-xl font-semibold mb-3">For Designers</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Use our design tokens for consistent styling</li>
              <li>Access component libraries for design tools</li>
              <li>Learn about our design principles and guidelines</li>
              <li>Explore page templates and patterns</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold mb-3">For Developers</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Install the component library via npm</li>
              <li>Set up design tokens in your project</li>
              <li>Learn how to use and customize components</li>
              <li>Implement responsive pages and layouts</li>
            </ul>
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <a href="#" class="btn btn-primary">
            Installation Guide
          </a>
          
          <a href="#" class="btn btn-outline">
            Design Principles
          </a>
        </div>
      </div>
      
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Design Principles</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-accessibility text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Accessible</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Our design system is built with accessibility in mind, ensuring that all users can interact with our products regardless of their abilities.
            </p>
          </div>
          
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-chart-line-smooth text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Consistent</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Consistency across all products and platforms creates a unified experience that users can learn once and apply everywhere.
            </p>
          </div>
          
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-flexibility text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">Flexible</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Components and patterns are designed to be adaptable to different contexts and use cases while maintaining consistency.
            </p>
          </div>
          
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="i-carbon-user-profile text-3xl text-primary-500"></div>
              <h3 class="text-xl font-semibold">User-Centered</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Our design decisions are driven by user needs and feedback, ensuring that our products are intuitive and easy to use.
            </p>
          </div>
        </div>
      </div>
      
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Latest Updates</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">New Color Palette</h3>
                <p class="text-gray-600 dark:text-gray-400">Updated primary and secondary color palettes with improved accessibility.</p>
              </div>
              <Badge type="info">New</Badge>
            </div>
          </div>
          
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold mb-1">Form Components</h3>
                <p class="text-gray-600 dark:text-gray-400">Added new form components including select, checkbox, and radio buttons.</p>
              </div>
              <Badge type="success">Updated</Badge>
            </div>
          </div>
          
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
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