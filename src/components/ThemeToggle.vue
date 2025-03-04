<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const themes = [
  { id: 'light', name: 'Light', icon: 'i-mdi-white-balance-sunny' },
  { id: 'dark', name: 'Dark', icon: 'i-mdi-moon-waning-crescent' },
  { id: 'system', name: 'Auto', icon: 'i-mdi-theme-light-dark' }
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
}

const cycleTheme = () => {
  const currentIndex = themes.findIndex(t => t.id === activeTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  setTheme(themes[nextIndex].id)
}
</script>

<template>
  <div class="relative">
    <!-- Theme toggle button -->
    <button 
      @click="cycleTheme" 
      class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      :aria-label="`Current theme: ${activeTheme}. Click to cycle themes.`"
    >
      <div v-if="activeTheme === 'light'" class="i-mdi-white-balance-sunny text-yellow-400 text-xl"></div>
      <div v-else-if="activeTheme === 'dark'" class="i-mdi-moon-waning-crescent text-primary text-xl"></div>
      <div v-else class="i-mdi-theme-light-dark text-primary text-xl"></div>
    </button>
  </div>
</template>