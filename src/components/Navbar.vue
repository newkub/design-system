<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import ThemeCustomizer from './ThemeCustomizer.vue'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <header class="bg-card shadow-sm border-b border-border sticky top-0 z-20">
    <div class="container-content py-3 flex justify-between items-center">
      <a 
        href="#" 
        @click.prevent="scrollToTop" 
        class="flex items-center gap-2 hover:opacity-90 transition-opacity"
        aria-label="Design System - Back to top"
      >
        <div class="i-mdi-palette-swatch text-primary text-3xl"></div>
        <h1 class="text-xl md:text-2xl font-heading font-bold text-primary">Design System</h1>
      </a>
      <div class="flex items-center gap-3">
        <ThemeToggle />
        <ThemeCustomizer />
        <a href="https://github.com/yourusername/design-system" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors" aria-label="View on GitHub">
          <div class="i-mdi-github text-muted-foreground text-xl"></div>
        </a>
        <a 
          href="https://bolt.new/github.com/newkub/design-system" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Start Design
        </a>
      </div>
    </div>
  </header>
</template>