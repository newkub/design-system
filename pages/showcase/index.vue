<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { themeConfig } = useDocsConfig();

// Showcase templates data
const showcaseTemplates = [
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'A comprehensive documentation template with sidebar navigation.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    link: '/showcase/documentation',
    color: 'blue'
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'A modern blog template with category filtering and featured posts.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    link: '/showcase/blog',
    color: 'green'
  },
  {
    id: 'changelog',
    title: 'Changelog',
    description: 'A clean changelog template to showcase product updates and releases.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
    link: '/showcase/changelog',
    color: 'purple'
  },
   {
    id: 'api',
    title: 'API',
    description: 'A clean changelog template to showcase product updates and releases.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
    link: '/showcase/api',
    color: 'purple'
  }
];

// Example projects data
const exampleProjects = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'A professional portfolio template for showcasing your work.',
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    link: '/showcase/examples/portfolio',
    color: 'indigo'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'An admin dashboard template with charts and data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    link: '/showcase/examples/dashboard',
    color: 'cyan'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'A complete e-commerce template with product listings and checkout.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    link: '/showcase/examples/ecommerce',
    color: 'amber'
  }
];

// Get color class based on color name
function getColorClass(color, type) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-600',
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-600',
    },
    indigo: {
      bg: 'bg-indigo-500',
      text: 'text-indigo-600',
    },
    cyan: {
      bg: 'bg-cyan-500',
      text: 'text-cyan-600',
    },
    amber: {
      bg: 'bg-amber-500',
      text: 'text-amber-600',
    }
  };
  
  return colorMap[color]?.[type] || colorMap.blue[type];
}
</script>

<template>
  <NuxtLayout name="page">
    <!-- Hero Section -->
    <div class="py-12 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">Showcase</h1>
        <p class="text-lg text-gray-600 mb-0">
          Explore our collection of templates and examples
        </p>
      </div>
    </div>
    
    <!-- Templates Section -->
    <div class="py-12 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold mb-8 text-center">Templates</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="template in showcaseTemplates" 
            :key="template.id"
            class="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
          >
            <div class="h-40 overflow-hidden">
              <img 
                :src="template.image" 
                :alt="template.title"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="p-4">
              <h3 class="text-lg font-bold mb-2">{{ template.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ template.description }}</p>
              
              <NuxtLink 
                :to="template.link" 
                class="text-sm px-3 py-1.5 rounded-md text-white inline-block"
                :class="getColorClass(template.color, 'bg')"
              >
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    

  </NuxtLayout>
</template>