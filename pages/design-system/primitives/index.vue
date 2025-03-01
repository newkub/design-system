<template>
  <NuxtLayout name="design-system">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Primitives</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Primitives</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Design primitives are the fundamental building blocks of our design system. They define the visual language and ensure consistency across all components and interfaces.
      </p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <NuxtLink 
          v-for="primitive in primitives" 
          :key="primitive.id" 
          :to="`/design-system/primitives/${primitive.id}`"
          class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-3 mb-4">
            <div :class="`text-3xl text-primary-500 ${primitive.icon}`"></div>
            <h2 class="text-xl font-semibold">{{ primitive.name }}</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ primitive.description }}
          </p>
          
          <div class="flex justify-end">
            <span class="text-primary-600 dark:text-primary-400 flex items-center gap-1">
              <span>View details</span>
              <div class="i-carbon-arrow-right"></div>
            </span>
          </div>
        </NuxtLink>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
        <h2 class="text-2xl font-bold mb-4">Using Primitives</h2>
        
        <p class="mb-4">
          Design primitives provide the foundation for our design system. They ensure visual consistency and help create a cohesive user experience across all interfaces.
        </p>
        
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 class="text-xl font-semibold mb-3">For Designers</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Use these primitives as the foundation for all designs</li>
              <li>Maintain consistency by adhering to these guidelines</li>
              <li>Reference these values in design tools and documentation</li>
              <li>Avoid creating custom values outside this system</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold mb-3">For Developers</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Use the provided CSS variables or utility classes</li>
              <li>Reference the design tokens in your code</li>
              <li>Avoid hardcoding values that are defined in the system</li>
              <li>Ensure proper implementation across all platforms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Primitive metadata
interface PrimitiveInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const primitives: PrimitiveInfo[] = [
  {
    id: 'colors',
    name: 'Colors',
    description: 'Color palette including primary, secondary, and semantic colors for consistent branding and visual communication.',
    icon: 'i-carbon-color-palette'
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Font families, sizes, weights, and line heights that establish a clear typographic hierarchy.',
    icon: 'i-carbon-text-font'
  },
  {
    id: 'spacing',
    name: 'Spacing',
    description: 'Consistent spacing values for margins, padding, and layout to create visual rhythm and hierarchy.',
    icon: 'i-carbon-ruler'
  },
  {
    id: 'shadows',
    name: 'Shadows',
    description: 'Elevation system using shadows to create depth and hierarchy in the interface.',
    icon: 'i-carbon-shadow'
  },
  {
    id: 'border-radius',
    name: 'Border Radius',
    description: 'Consistent corner rounding for UI elements to maintain visual harmony.',
    icon: 'i-carbon-corner'
  },
  {
    id: 'icons',
    name: 'Icons',
    description: 'Consistent icon system for visual communication and interface actions.',
    icon: 'i-carbon-star'
  },
  {
    id: 'grid',
    name: 'Grid',
    description: 'Layout grid system for consistent alignment and spacing of elements.',
    icon: 'i-carbon-grid'
  }
]
</script>

<style scoped>
.primitive-card {
  transition: transform 0.2s ease;
}

.primitive-card:hover {
  transform: translateY(-4px);
}
</style>