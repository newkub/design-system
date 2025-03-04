<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const showThemeOptions = ref(false)
const themes = [
  { id: 'light', name: 'Light', icon: 'i-mdi-white-balance-sunny' },
  { id: 'dark', name: 'Dark', icon: 'i-mdi-moon-waning-crescent' },
  { id: 'system', name: 'System', icon: 'i-mdi-monitor' }
]
const activeTheme = ref('light')

onMounted(() => {
  // Check if user has a theme preference in localStorage
  const savedTheme = localStorage.getItem('theme-mode')
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
    activeTheme.value = 'dark'
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark')
    isDark.value = false
    activeTheme.value = 'light'
  } else if (savedTheme === 'system' || !savedTheme) {
    // Check system preference
    activeTheme.value = 'system'
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
      isDark.value = true
    } else {
      document.documentElement.classList.remove('dark')
      isDark.value = false
    }
    
    // Save system preference
    if (!savedTheme) {
      localStorage.setItem('theme-mode', 'system')
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (activeTheme.value === 'system') {
        if (e.matches) {
          document.documentElement.classList.add('dark')
          isDark.value = true
        } else {
          document.documentElement.classList.remove('dark')
          isDark.value = false
        }
      }
    })
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme-mode', 'dark')
    activeTheme.value = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme-mode', 'light')
    activeTheme.value = 'light'
  }
}

const setTheme = (themeId: string) => {
  activeTheme.value = themeId
  
  if (themeId === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
      isDark.value = true
    } else {
      document.documentElement.classList.remove('dark')
      isDark.value = false
    }
    localStorage.setItem('theme-mode', 'system')
  } else if (themeId === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
    localStorage.setItem('theme-mode', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    isDark.value = false
    localStorage.setItem('theme-mode', 'light')
  }
  
  showThemeOptions.value = false
}

const toggleThemeOptions = () => {
  showThemeOptions.value = !showThemeOptions.value
}
</script>

<template>
  <div class="relative">
    <!-- Theme toggle button -->
    <button 
      @click="toggleThemeOptions" 
      class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      aria-haspopup="true"
      :aria-expanded="showThemeOptions"
    >
      <div v-if="activeTheme === 'light'" class="i-mdi-white-balance-sunny text-yellow-400 text-xl"></div>
      <div v-else-if="activeTheme === 'dark'" class="i-mdi-moon-waning-crescent text-primary text-xl"></div>
      <div v-else class="i-mdi-monitor text-primary text-xl"></div>
    </button>
    
    <!-- Theme options dropdown -->
    <div 
      v-show="showThemeOptions" 
      class="absolute right-0 mt-2 w-40 bg-card border border-border rounded-md shadow-lg z-50"
    >
      <div class="py-1">
        <button 
          v-for="theme in themes" 
          :key="theme.id"
          @click="setTheme(theme.id)"
          class="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-muted transition-colors"
          :class="activeTheme === theme.id ? 'text-primary font-medium' : 'text-foreground'"
        >
          <div :class="theme.icon"></div>
          {{ theme.name }}
          <div v-if="activeTheme === theme.id" class="i-mdi-check ml-auto text-primary"></div>
        </button>
      </div>
    </div>
  </div>
</template>