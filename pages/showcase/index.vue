<template>
  <NuxtLayout name="page">
    <div>
      <h1 class="text-3xl font-bold mb-6">Showcase</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore beautiful websites and applications built with Nuxt and UnoCSS.
      </p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Showcase items -->
        <div v-for="(item, index) in showcaseItems" :key="index" class="showcase-item group">
          <div class="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 aspect-video mb-3">
            <div class="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-primary-700/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div class="text-4xl text-primary-500">{{ item.icon }}</div>
            </div>
          </div>
          <h3 class="font-semibold text-lg mb-1">{{ item.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">{{ item.description }}</p>
          <div class="mt-2 flex gap-2">
            <Badge v-for="tag in item.tags" :key="tag" type="info" class="text-xs">{{ tag }}</Badge>
          </div>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Have a project you'd like to showcase?
        </p>
        <a href="https://github.com/yourusername/nuxt-docs/issues/new" target="_blank" class="btn btn-primary">
          Submit Your Project
        </a>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Sample showcase items
const showcaseItems = [
  {
    title: "E-commerce Platform",
    description: "A modern e-commerce platform with cart, checkout, and payment integration.",
    icon: "🛍️",
    tags: ["E-commerce", "Nuxt 3", "UnoCSS"]
  },
  {
    title: "Portfolio Template",
    description: "A beautiful portfolio template for designers and developers.",
    icon: "🎨",
    tags: ["Portfolio", "Responsive", "Animation"]
  },
  {
    title: "Blog Platform",
    description: "A content-focused blog platform with markdown support.",
    icon: "📝",
    tags: ["Blog", "Content", "Markdown"]
  },
  {
    title: "Admin Dashboard",
    description: "A comprehensive admin dashboard with analytics and user management.",
    icon: "📊",
    tags: ["Dashboard", "Admin", "Charts"]
  },
  {
    title: "Social Network",
    description: "A social networking platform with real-time messaging.",
    icon: "👥",
    tags: ["Social", "Real-time", "Messaging"]
  },
  {
    title: "Learning Management",
    description: "An educational platform for courses and learning materials.",
    icon: "🎓",
    tags: ["Education", "Courses", "Learning"]
  }
]
</script>

<style>
.showcase-item {
  transition: transform 0.2s;
}

.showcase-item:hover {
  transform: translateY(-4px);
}
</style>