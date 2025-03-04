<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  // Check if user has a theme preference in localStorage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
  } else if (savedTheme === 'light' || savedTheme === null) {
    // Default to light mode (either explicitly set or not set at all)
    document.documentElement.classList.remove('dark')
    isDark.value = false
    // Ensure light mode is saved
    localStorage.setItem('theme', 'light')
  } else {
    // Check system preference only if no preference is saved
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
      isDark.value = true
    } else {
      // Default to light mode if system doesn't prefer dark
      document.documentElement.classList.remove('dark')
      isDark.value = false
      localStorage.setItem('theme', 'light')
    }
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <button 
    @click="toggleTheme" 
    class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <div v-if="isDark" class="i-mdi-white-balance-sunny text-yellow-400 text-xl"></div>
    <div v-else class="i-mdi-moon-waning-crescent text-primary text-xl"></div>
  </button>
</template>