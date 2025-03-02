<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { themeConfig } = useDocsConfig();

// Sample blog posts data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'Introducing Our New Design System',
    excerpt: 'We're excited to announce the launch of our new design system, built to help developers create consistent and beautiful interfaces.',
    date: '2024-05-15',
    author: 'Jane Smith',
    category: 'Updates',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: '/blog/introducing-design-system'
  },
  {
    id: 2,
    title: 'How to Use Component Composition',
    excerpt: 'Learn how to compose complex UI components from simpler building blocks using our design system.',
    date: '2024-05-10',
    author: 'John Doe',
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: '/blog/component-composition'
  },
  {
    id: 3,
    title: 'Case Study: Redesigning Our Dashboard',
    excerpt: 'A deep dive into how we used our design system to redesign our dashboard for better usability and performance.',
    date: '2024-05-05',
    author: 'Alex Johnson',
    category: 'Case Studies',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
    slug: '/blog/dashboard-redesign-case-study'
  },
  {
    id: 4,
    title: 'Optimizing Performance in Design Systems',
    excerpt: 'Best practices for ensuring your design system components are performant and efficient.',
    date: '2024-04-28',
    author: 'Sarah Williams',
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    slug: '/blog/optimizing-performance'
  }
];

// Get unique categories
const categories = [...new Set(blogPosts.map(post => post.category))];
</script>

<template>
  <NuxtLayout name="page">
    <div class="blog-header bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p class="text-xl opacity-90 max-w-3xl">Latest news, tutorials, and insights about our design system and development practices.</p>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Category Filter -->
      <div class="mb-10 flex flex-wrap gap-2">
        <button class="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors">
          All
        </button>
        <button 
          v-for="category in categories" 
          :key="category"
          class="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
        >
          {{ category }}
        </button>
      </div>
      
      <!-- Featured Post -->
      <div class="mb-16">
        <div class="bg-white rounded-xl overflow-hidden shadow-lg">
          <div class="md:flex">
            <div class="md:w-1/2">
              <img 
                :src="blogPosts[0].image" 
                :alt="blogPosts[0].title"
                class="h-64 md:h-full w-full object-cover"
              />
            </div>
            <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div class="flex items-center mb-4">
                <span class="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">{{ blogPosts[0].category }}</span>
                <span class="text-gray-500 text-sm ml-3">{{ blogPosts[0].date }}</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ blogPosts[0].title }}</h2>
              <p class="text-gray-600 mb-6">{{ blogPosts[0].excerpt }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                    {{ blogPosts[0].author.charAt(0) }}
                  </div>
                  <span class="ml-2 text-gray-700">{{ blogPosts[0].author }}</span>
                </div>
                <NuxtLink :to="blogPosts[0].slug" class="text-blue-600 font-medium hover:text-blue-800">
                  Read more →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Blog Post Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="post in blogPosts.slice(1)" 
          :key="post.id"
          class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <img 
            :src="post.image" 
            :alt="post.title"
            class="h-48 w-full object-cover"
          />
          <div class="p-6">
            <div class="flex items-center mb-3">
              <span class="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">{{ post.category }}</span>
              <span class="text-gray-500 text-sm ml-3">{{ post.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ post.title }}</h3>
            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm">
                  {{ post.author.charAt(0) }}
                </div>
                <span class="ml-2 text-sm text-gray-700">{{ post.author }}</span>
              </div>
              <NuxtLink :to="post.slug" class="text-blue-600 font-medium hover:text-blue-800 text-sm">
                Read more →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Newsletter Signup -->
      <div class="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
        <div class="md:flex items-center justify-between">
          <div class="md:w-2/3 mb-6 md:mb-0">
            <h3 class="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
            <p class="text-gray-600">Get the latest updates, tutorials and resources directly to your inbox.</p>
          </div>
          <div class="md:w-1/3">
            <div class="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.blog-header {
  position: relative;
}

.blog-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80');
  background-size: cover;
  opacity: 0.1;
  z-index: 0;
}

.blog-header > div {
  position: relative;
  z-index: 1;
}
</style>