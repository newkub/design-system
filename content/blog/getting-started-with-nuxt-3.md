---
title: Getting Started with Nuxt 3
date: May 20, 2025
author:
  name: Jane Doe
  initials: JD
  role: Senior Developer
tags: 
  - Nuxt
  - Tutorial
  - Vue
emoji: 🚀
excerpt: Learn how to set up a new Nuxt 3 project and explore its key features for building modern web applications.
---

# Getting Started with Nuxt 3

<div class="flex items-center gap-3 mb-4">
  <span class="text-sm text-gray-500 dark:text-gray-400">{{ $frontmatter.date }}</span>
  <Badge v-for="tag in $frontmatter.tags" :key="tag" type="info" class="text-xs">{{ tag }}</Badge>
</div>

<div class="flex items-center gap-4 mb-6">
  <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
    {{ $frontmatter.author.initials }}
  </div>
  <div>
    <div class="font-medium">{{ $frontmatter.author.name }}</div>
    <div class="text-sm text-gray-500 dark:text-gray-400">{{ $frontmatter.author.role }}</div>
  </div>
</div>

<!-- Featured image -->
<div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-8">
  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
    <div class="text-8xl text-primary-500">{{ $frontmatter.emoji }}</div>
  </div>
</div>

{{ $frontmatter.excerpt }}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.

## Getting Started

Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

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

## Key Features

Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

- Feature one with detailed explanation
- Feature two with detailed explanation
- Feature three with detailed explanation

<Alert type="info">
  <p>This is an important note about the feature.</p>
</Alert>

## Conclusion

Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

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

<script setup>
// Any additional script logic can go here
</script>