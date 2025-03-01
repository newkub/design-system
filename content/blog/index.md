---
title: Blog
description: Latest news, tutorials, and insights about Nuxt and web development.
---

# Blog

Latest news, tutorials, and insights about Nuxt and web development.

<div class="grid gap-8">
  <article v-for="(post, index) in blogPosts" :key="index" class="blog-post">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Featured image -->
      <div class="md:w-1/3">
        <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
            <div class="text-4xl text-primary-500">{{ post.emoji }}</div>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="md:w-2/3">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
          <Badge v-for="tag in post.tags.slice(0, 2)" :key="tag" type="info" class="text-xs">{{ tag }}</Badge>
        </div>
        
        <h2 class="text-2xl font-bold mb-2 hover:text-primary-600 dark:hover:text-primary-400">
          <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
        </h2>
        
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ post.excerpt }}</p>
        
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
            {{ post.author.initials }}
          </div>
          <span class="text-sm font-medium">{{ post.author.name }}</span>
        </div>
      </div>
    </div>
  </article>
  
  <div class="border-t border-gray-200 dark:border-gray-800 pt-8 mt-4">
    <div class="flex justify-center">
      <button class="btn btn-outline">Load More Posts</button>
    </div>
  </div>
</div>

<script setup>
// Sample blog posts data
const blogPosts = [
  {
    title: "Getting Started with Nuxt 3",
    slug: "getting-started-with-nuxt-3",
    date: "May 20, 2025",
    excerpt: "Learn how to set up a new Nuxt 3 project and explore its key features for building modern web applications.",
    emoji: "🚀",
    author: {
      name: "Jane Doe",
      initials: "JD"
    },
    tags: ["Nuxt", "Tutorial", "Vue"]
  },
  {
    title: "Building a Documentation Site with Nuxt Content",
    slug: "building-documentation-site-with-nuxt-content",
    date: "May 15, 2025",
    excerpt: "A comprehensive guide to creating a beautiful documentation site using Nuxt Content and UnoCSS.",
    emoji: "📚",
    author: {
      name: "John Smith",
      initials: "JS"
    },
    tags: ["Documentation", "Nuxt Content", "UnoCSS"]
  },
  {
    title: "Advanced Markdown Features for Technical Documentation",
    slug: "advanced-markdown-features",
    date: "May 10, 2025",
    excerpt: "Discover powerful Markdown features that will take your technical documentation to the next level.",
    emoji: "✨",
    author: {
      name: "Alex Johnson",
      initials: "AJ"
    },
    tags: ["Markdown", "Documentation", "Tips"]
  },
  {
    title: "Optimizing Performance in Nuxt Applications",
    slug: "optimizing-performance-nuxt-applications",
    date: "May 5, 2025",
    excerpt: "Learn practical techniques to improve the performance of your Nuxt applications for better user experience.",
    emoji: "⚡",
    author: {
      name: "Sarah Williams",
      initials: "SW"
    },
    tags: ["Performance", "Optimization", "Nuxt"]
  }
]
</script>

<style scoped>
.blog-post {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--un-border-opacity-20);
  transition: transform 0.2s ease;
}

.blog-post:hover {
  transform: translateY(-4px);
}

.blog-post:last-of-type {
  border-bottom: none;
}
</style>