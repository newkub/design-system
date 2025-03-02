<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { themeConfig } = useDocsConfig();

// Sample blog posts data
const featuredPost = {
  id: 'featured-post',
  title: 'Getting Started with Our Framework',
  description: 'Learn how to set up and start using our framework in your projects.',
  image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  date: 'May 15, 2024',
  author: 'John Doe',
  category: 'Tutorials'
};

const blogPosts = [
  {
    id: 'post-1',
    title: 'New Features in Version 1.2.0',
    description: 'Explore the latest features and improvements in our newest release.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'May 10, 2024',
    author: 'Jane Smith',
    category: 'Updates'
  },
  {
    id: 'post-2',
    title: 'Building Responsive Layouts',
    description: 'Learn how to create responsive layouts that work on all devices.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'May 5, 2024',
    author: 'Alex Johnson',
    category: 'Tutorials'
  },
  {
    id: 'post-3',
    title: 'Case Study: E-commerce Migration',
    description: 'How we helped a client migrate their e-commerce platform to our framework.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
    date: 'April 28, 2024',
    author: 'Sarah Williams',
    category: 'Case Studies'
  },
  {
    id: 'post-4',
    title: 'Optimizing Performance',
    description: 'Tips and tricks for optimizing your application performance.',
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    date: 'April 20, 2024',
    author: 'Michael Brown',
    category: 'Tutorials'
  },
  {
    id: 'post-5',
    title: 'Community Spotlight: Best Projects',
    description: 'Showcasing the best projects built by our community members.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'April 15, 2024',
    author: 'Emily Davis',
    category: 'Community'
  },
  {
    id: 'post-6',
    title: 'Upcoming Features in 1.3.0',
    description: 'A sneak peek at what\'s coming in our next release.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'April 10, 2024',
    author: 'David Wilson',
    category: 'Updates'
  }
];

// Categories for filtering
const categories = [
  { name: 'All', count: blogPosts.length + 1 }, // +1 for featured post
  { name: 'Tutorials', count: blogPosts.filter(post => post.category === 'Tutorials').length + (featuredPost.category === 'Tutorials' ? 1 : 0) },
  { name: 'Updates', count: blogPosts.filter(post => post.category === 'Updates').length + (featuredPost.category === 'Updates' ? 1 : 0) },
  { name: 'Case Studies', count: blogPosts.filter(post => post.category === 'Case Studies').length + (featuredPost.category === 'Case Studies' ? 1 : 0) },
  { name: 'Community', count: blogPosts.filter(post => post.category === 'Community').length + (featuredPost.category === 'Community' ? 1 : 0) }
];

// Active category for filtering (reactive)
const activeCategory = ref('All');

// Computed property for filtered posts
const filteredPosts = computed(() => {
  if (activeCategory.value === 'All') {
    return blogPosts;
  }
  return blogPosts.filter(post => post.category === activeCategory.value);
});

// Show featured post based on category filter
const showFeaturedPost = computed(() => {
  return activeCategory.value === 'All' || featuredPost.category === activeCategory.value;
});

// Function to set active category
function setCategory(category) {
  activeCategory.value = category;
}
</script>

<template>
  <NuxtLayout name="page">
    <!-- Blog Header -->
    <div class="py-12 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">Blog Template</h1>
        <p class="text-lg text-gray-600 mb-0">
          A modern blog template with category filtering and featured posts
        </p>
      </div>
    </div>
    
    <!-- Category Filter -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex flex-wrap items-center gap-2">
          <button 
            v-for="category in categories" 
            :key="category.name"
            class="px-4 py-2 text-sm rounded-full transition-colors"
            :class="activeCategory === category.name ? 
              'bg-blue-100 text-blue-700 font-medium' : 
              'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            @click="setCategory(category.name)"
          >
            {{ category.name }} ({{ category.count }})
          </button>
        </div>
      </div>
    </div>
    
    <!-- Featured Post (if category matches) -->
    <div v-if="showFeaturedPost" class="py-8 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md">
          <div class="md:flex">
            <div class="md:w-1/2">
              <img 
                :src="featuredPost.image" 
                :alt="featuredPost.title"
                class="w-full h-full object-cover"
                style="max-height: 400px;"
              />
            </div>
            <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div class="flex items-center mb-4">
                <span class="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">Featured</span>
                <span class="text-gray-500 text-sm ml-3">{{ featuredPost.date }}</span>
              </div>
              <h2 class="text-2xl font-bold mb-3">{{ featuredPost.title }}</h2>
              <p class="text-gray-600 mb-4">{{ featuredPost.description }}</p>
              <div class="flex items-center justify-between mt-auto">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <span class="text-sm text-gray-700">{{ featuredPost.author }}</span>
                </div>
                <span class="text-sm text-blue-600 font-medium">{{ featuredPost.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Blog Posts Grid -->
    <div class="py-8 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div class="h-48 overflow-hidden">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-500 text-sm">{{ post.date }}</span>
                <span class="text-sm text-blue-600 font-medium">{{ post.category }}</span>
              </div>
              
              <h3 class="text-lg font-bold mb-2">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ post.description }}</p>
              
              <div class="flex items-center mt-4 pt-4 border-t border-gray-100">
                <div class="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                <span class="text-sm text-gray-700">{{ post.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Newsletter Section -->
    <div class="py-12 px-4 bg-gray-50">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
        <p class="text-gray-600 mb-6">Get the latest updates and articles delivered straight to your inbox.</p>
        
        <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>