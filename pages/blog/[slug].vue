<template>
  <NuxtLayout name="page">
    <div v-if="post" class="max-w-3xl mx-auto">
      <!-- Post header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
          <Badge v-for="tag in post.tags" :key="tag" type="info" class="text-xs">{{ tag }}</Badge>
        </div>
        
        <h1 class="text-4xl font-bold mb-6">{{ post.title }}</h1>
        
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
            {{ post.author.initials }}
          </div>
          <div>
            <div class="font-medium">{{ post.author.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ post.author.role }}</div>
          </div>
        </div>
      </div>
      
      <!-- Featured image -->
      <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-8">
        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
          <div class="text-8xl text-primary-500">{{ post.emoji }}</div>
        </div>
      </div>
      
      <!-- Post content -->
      <div class="prose dark:prose-invert prose-primary max-w-none">
        <p class="text-xl mb-6">{{ post.excerpt }}</p>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
        
        <h2>Getting Started</h2>
        
        <p>Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
        
        <CodeGroup>
          <CodeBlock label="npm" active language="bash">
            npm install nuxt
          </CodeBlock>
          <CodeBlock label="yarn" language="bash">
            yarn add nuxt
          </CodeBlock>
          <CodeBlock label="pnpm" language="bash">
            pnpm add nuxt
          </CodeBlock>
        </CodeGroup>
        
        <h2>Key Features</h2>
        
        <p>Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
        
        <ul>
          <li>Feature one with detailed explanation</li>
          <li>Feature two with detailed explanation</li>
          <li>Feature three with detailed explanation</li>
        </ul>
        
        <Alert type="info">
          <p>This is an important note about the feature.</p>
        </Alert>
        
        <h2>Conclusion</h2>
        
        <p>Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
      </div>
      
      <!-- Post footer -->
      <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <div class="i-carbon-thumbs-up"></div>
              <span>Helpful</span>
            </button>
            <button class="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <div class="i-carbon-share"></div>
              <span>Share</span>
            </button>
          </div>
          
          <div class="flex items-center gap-4">
            <NuxtLink to="/blog" class="text-primary-600 dark:text-primary-400 hover:underline">
              Back to Blog
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Related posts -->
      <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-bold mb-6">Related Posts</h3>
        
        <div class="grid sm:grid-cols-2 gap-6">
          <div v-for="(relatedPost, index) in relatedPosts" :key="index" class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ relatedPost.date }}</span>
              <Badge type="info" class="text-xs">{{ relatedPost.tags[0] }}</Badge>
            </div>
            
            <h4 class="text-lg font-semibold mb-2 hover:text-primary-600 dark:hover:text-primary-400">
              <NuxtLink :to="`/blog/${relatedPost.slug}`">{{ relatedPost.title }}</NuxtLink>
            </h4>
            
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ relatedPost.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="flex flex-col items-center justify-center py-12">
      <div class="text-4xl mb-4">😢</div>
      <h2 class="text-2xl font-bold mb-2">Post Not Found</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
      <NuxtLink to="/blog" class="btn btn-primary">Back to Blog</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// Sample blog post data (in a real app, this would come from an API or content system)
const post = {
  title: "Getting Started with Nuxt 3",
  slug: "getting-started-with-nuxt-3",
  date: "May 20, 2025",
  excerpt: "Learn how to set up a new Nuxt 3 project and explore its key features for building modern web applications.",
  emoji: "🚀",
  author: {
    name: "Jane Doe",
    initials: "JD",
    role: "Senior Developer"
  },
  tags: ["Nuxt", "Tutorial", "Vue"]
}

// Sample related posts
const relatedPosts = [
  {
    title: "Building a Documentation Site with Nuxt Content",
    slug: "building-documentation-site-with-nuxt-content",
    date: "May 15, 2025",
    excerpt: "A comprehensive guide to creating a beautiful documentation site using Nuxt Content and UnoCSS.",
    tags: ["Documentation", "Nuxt Content"]
  },
  {
    title: "Advanced Markdown Features for Technical Documentation",
    slug: "advanced-markdown-features",
    date: "May 10, 2025",
    excerpt: "Discover powerful Markdown features that will take your technical documentation to the next level.",
    tags: ["Markdown", "Documentation"]
  }
]
</script>