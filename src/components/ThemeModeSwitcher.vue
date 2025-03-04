<script setup lang="ts">
import { ref, onMounted } from 'vue'

const themes = [
  { id: 'light', name: 'Light', icon: 'i-mdi-white-balance-sunny' },
  { id: 'dark', name: 'Dark', icon: 'i-mdi-moon-waning-crescent' },
  { id: 'system', name: 'System', icon: 'i-mdi-monitor' }
]
const activeTheme = ref('light')

onMounted(() => {
  // Check if user has a theme preference in localStorage
  const savedTheme = localStorage.getItem('theme-mode')
  
  if (savedTheme && themes.some(t => t.id === savedTheme)) {
    activeTheme.value = savedTheme
  } else {
    activeTheme.value = 'system'
    localStorage.setItem('theme-mode', 'system')
  }
  
  applyTheme(activeTheme.value)
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (activeTheme.value === 'system') {
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  })
})

const applyTheme = (themeId: string) => {
  if (themeId === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else if (themeId === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const setTheme = (themeId: string) => {
  activeTheme.value = themeId
  localStorage.setItem('theme-mode', themeId)
  applyTheme(themeId)
}
</script>

<template>
  <div class="flex items-center bg-muted rounded-lg p-1">
    <button 
      v-for="theme in themes" 
      :key="theme.id"
      @click="setTheme(theme.id)"
      class="flex items-center justify-center p-2 rounded-md transition-colors"
      :class="activeTheme === theme.id ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'"
      :aria-label="`Switch to ${theme.name} theme`"
      :aria-pressed="activeTheme === theme.id"
    >
      <div :class="`${theme.icon} text-lg`"></div>
    </button>
  </div>
</template>