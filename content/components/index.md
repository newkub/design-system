---
title: Components
description: Explore our component library with usage examples and documentation.
---

# Components

Our component library provides a comprehensive set of UI components for building modern web applications. Each component is designed to be accessible, customizable, and easy to use.

## UI Components

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
  <NuxtLink 
    to="/components/alert" 
    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="i-carbon-warning-alt text-3xl text-primary-500"></div>
      <h2 class="text-xl font-semibold">Alert</h2>
    </div>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Displays an alert message with different styles based on type.
    </p>
  </NuxtLink>
  
  <NuxtLink 
    to="/components/badge" 
    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="i-carbon-tag text-3xl text-primary-500"></div>
      <h2 class="text-xl font-semibold">Badge</h2>
    </div>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      A small badge component for displaying status, labels, or counts.
    </p>
  </NuxtLink>
  
  <NuxtLink 
    to="/components/button" 
    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="i-carbon-button text-3xl text-primary-500"></div>
      <h2 class="text-xl font-semibold">Button</h2>
    </div>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Interactive button component with various styles and states.
    </p>
  </NuxtLink>
  
  <NuxtLink 
    to="/components/code-block" 
    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="i-carbon-code text-3xl text-primary-500"></div>
      <h2 class="text-xl font-semibold">Code Block</h2>
    </div>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Displays code snippets with syntax highlighting and copy functionality.
    </p>
  </NuxtLink>
</div>

## Component Guidelines

Our components follow these principles to ensure consistency and usability:

### Design Principles

- Consistent visual language across all components
- Responsive and adaptive to different screen sizes
- Accessible to all users, following WCAG guidelines
- Customizable while maintaining design integrity

### Implementation Guidelines

- Use TypeScript for type safety and better developer experience
- Include comprehensive documentation and examples
- Ensure proper testing for all components
- Support both light and dark modes