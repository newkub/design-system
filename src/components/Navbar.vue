<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import ThemeCustomizer from './ThemeCustomizer.vue'
import Modal from './Modal.vue'
import { ref, onMounted } from 'vue'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const isMenuOpen = ref(false)
const showThemeModal = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleThemeModal = () => {
  showThemeModal.value = !showThemeModal.value
}

const menuItems = [
  { label: 'Components', href: '#components' },
  { label: 'Utils', href: '#utils' },
]
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
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-4">
        <nav class="flex items-center mr-4">
          <ul class="flex gap-4">
            <li v-for="item in menuItems" :key="item.label">
              <a 
                :href="item.href" 
                class="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
        <button 
          @click="toggleThemeModal"
          class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
          aria-label="Open theme customizer"
        >
          <div class="i-mdi-palette text-primary text-xl"></div>
        </button>
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
      
      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <button 
          @click="toggleThemeModal"
          class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
          aria-label="Open theme customizer"
        >
          <div class="i-mdi-palette text-primary text-xl"></div>
        </button>
        <button 
          @click="toggleMenu" 
          class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle menu"
          aria-expanded="isMenuOpen"
        >
          <div v-if="!isMenuOpen" class="i-mdi-menu text-foreground text-xl"></div>
          <div v-else class="i-mdi-close text-foreground text-xl"></div>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden bg-card border-b border-border shadow-md"
    >
      <nav class="container-content py-4">
        <ul class="space-y-3">
          <li v-for="item in menuItems" :key="item.label">
            <a 
              :href="item.href" 
              class="block text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
          </li>
          <li class="pt-2 border-t border-border">
            <div class="flex items-center gap-2">
              <a href="https://github.com/yourusername/design-system" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors" aria-label="View on GitHub">
                <div class="i-mdi-github text-muted-foreground text-xl"></div>
              </a>
              <a 
                href="https://bolt.new/github.com/newkub/design-system" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Start Design
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Theme Customizer Modal -->
    <Modal 
      :show="showThemeModal" 
      title="Theme Customizer"
      maxWidth="xl"
      @close="toggleThemeModal"
    >
      <div class="p-4">
        <ThemeCustomizer />
      </div>
    </Modal>
  </header>
</template>