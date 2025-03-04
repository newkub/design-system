<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const themes = [
  { id: 'light', name: 'Light', icon: 'i-mdi-white-balance-sunny' },
  { id: 'dark', name: 'Dark', icon: 'i-mdi-moon-waning-crescent' }
]
const activeTheme = ref('light')

const emit = defineEmits(['click'])

onMounted(() => {
  // Check if user has a theme preference in localStorage
  const savedTheme = localStorage.getItem('theme-mode')
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
    activeTheme.value = 'dark'
  } else {
    // Default to light mode
    document.documentElement.classList.remove('dark')
    isDark.value = false
    activeTheme.value = 'light'
    
    // Save light mode preference if not already set
    if (!savedTheme) {
      localStorage.setItem('theme-mode', 'light')
    }
  }
})

const toggleTheme = () => {
  if (activeTheme.value === 'light') {
    // Switch to dark mode
    document.documentElement.classList.add('dark')
    isDark.value = true
    activeTheme.value = 'dark'
    localStorage.setItem('theme-mode', 'dark')
  } else {
    // Switch to light mode
    document.documentElement.classList.remove('dark')
    isDark.value = false
    activeTheme.value = 'light'
    localStorage.setItem('theme-mode', 'light')
  }
  
  // Emit click event for parent components
  emit('click')
}
</script>

<template>
  <div class="relative">
    <!-- Theme toggle button -->
    <button 
      @click="toggleTheme" 
      class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      :aria-label="`Current theme: ${activeTheme}. Click to toggle theme.`"
    >
      <div v-if="activeTheme === 'light'" class="i-mdi-white-balance-sunny text-yellow-400 text-xl"></div>
      <div v-else class="i-mdi-moon-waning-crescent text-primary text-xl"></div>
    </button>
  </div>
</template>