<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { themeConfig } = useDocsConfig();

// Showcase templates data
const showcaseTemplates = [
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'A comprehensive documentation template with sidebar navigation, search functionality, and responsive design.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    features: ['Sidebar navigation', 'Table of contents', 'Search functionality', 'Dark mode support'],
    link: '/showcase/documentation',
    demoLink: '/guide/',
    color: 'blue'
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'A modern blog template with category filtering, featured posts, and newsletter signup.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    features: ['Category filtering', 'Featured posts', 'Author profiles', 'Newsletter signup'],
    link: '/showcase/blog',
    demoLink: '/blog/',
    color: 'green'
  },
  {
    id: 'changelog',
    title: 'Changelog',
    description: 'A clean and organized changelog template to showcase your product updates and releases.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
    features: ['Version history', 'Release notes', 'Feature highlights', 'Bug fix tracking'],
    link: '/showcase/changelog',
    demoLink: '/changelog/',
    color: 'purple'
  }
];

// Example projects data
const exampleProjects = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'A professional portfolio template for showcasing your work and skills.',
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    link: '/showcase/examples/portfolio',
    color: 'indigo'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'An admin dashboard template with charts, tables, and data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    link: '/showcase/examples/dashboard',
    color: 'cyan'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'A complete e-commerce template with product listings, cart, and checkout.',
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
      bgLight: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-500',
      bgLight: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200'
    },
    indigo: {
      bg: 'bg-indigo-500',
      bgLight: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200'
    },
    cyan: {
      bg: 'bg-cyan-500',
      bgLight: 'bg-cyan-50',
      text: 'text-cyan-600',
      border: 'border-cyan-200'
    },
    amber: {
      bg: 'bg-amber-500',
      bgLight: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-200'
    }
  };
  
  return colorMap[color]?.[type] || colorMap.blue[type];
}
</script>

<template>
  <NuxtLayout name="page">
    <!-- Hero Section -->
    <div class="showcase-hero py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">Showcase</h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore our collection of templates and examples to jumpstart your next project.
          From documentation sites to blogs and dashboards, we've got you covered.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#templates" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Templates
          </a>
          <a href="#examples" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200">
            Explore Examples
          </a>
        </div>
      </div>
    </div>
    
    <!-- Templates Section -->
    <div id="templates" class="py-16 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Templates</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Ready-to-use templates for common use cases. Each template is fully responsive and customizable.
          </p>
        </div>
        
        <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          <div 
            v-for="template in showcaseTemplates" 
            :key="template.id"
            class="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div class="h-48 overflow-hidden">
              <img 
                :src="template.image" 
                :alt="template.title"
                class="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            
            <div class="p-6">
              <div class="flex items-center mb-3">
                <span 
                  :class="[getColorClass(template.color, 'bgLight'), getColorClass(template.color, 'text'), 'px-3 py-1 rounded-full text-sm font-medium']"
                >
                  {{ template.title }}
                </span>
              </div>
              
              <h3 class="text-xl font-bold mb-3">{{ template.title }} Template</h3>
              <p class="text-gray-600 mb-4">{{ template.description }}</p>
              
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-gray-500 mb-2">Features:</h4>
                <ul class="grid grid-cols-2 gap-x-2 gap-y-1">
                  <li 
                    v-for="(feature, index) in template.features" 
                    :key="index"
                    class="flex items-center text-sm text-gray-600"
                  >
                    <div class="i-carbon-checkmark-filled text-green-500 mr-1"></div>
                    {{ feature }}
                  </li>
                </ul>
              </div>
              
              <div class="flex items-center justify-between">
                <NuxtLink 
                  :to="template.link" 
                  class="text-sm font-medium hover:underline"
                  :class="getColorClass(template.color, 'text')"
                >
                  View Details
                </NuxtLink>
                <NuxtLink 
                  :to="template.demoLink" 
                  class="text-sm px-4 py-2 rounded-lg text-white transition-colors"
                  :class="getColorClass(template.color, 'bg')"
                >
                  Live Demo
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Examples Section -->
    <div id="examples" class="py-16 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Example Projects</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Complete example projects showcasing different use cases and implementations.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in exampleProjects" 
            :key="project.id"
            class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="h-40 overflow-hidden">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3">{{ project.title }}</h3>
              <p class="text-gray-600 mb-4">{{ project.description }}</p>
              
              <NuxtLink 
                :to="project.link" 
                class="inline-block px-4 py-2 rounded-lg text-white transition-colors"
                :class="getColorClass(project.color, 'bg')"
              >
                Explore
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Build Your Project?</h2>
        <p class="text-xl opacity-90 mb-8">
          Get started with our templates and examples to create your next amazing project.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/guide/" class="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-block">
            Read the Docs
          </NuxtLink>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium inline-block">
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.showcase-hero {
  position: relative;
  background-color: #f9fafb;
}

.showcase-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
  z-index: 0;
}

.showcase-hero > div {
  position: relative;
  z-index: 1;
}
</style>