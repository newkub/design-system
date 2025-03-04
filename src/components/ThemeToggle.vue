<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'

const isDark = ref(false)
const showThemeCustomizer = ref(false)
const activeTab = ref('colors')

// Theme settings
const themeColors = reactive({
  primary: 'hsl(214, 100%, 48%)',
  secondary: 'hsl(270, 100%, 48%)',
  background: 'hsl(210, 20%, 98%)',
  card: 'hsl(0, 0%, 100%)',
  muted: 'hsl(210, 20%, 94%)',
  border: 'hsl(210, 16%, 90%)'
})

const themeRadius = reactive({
  sm: '0.125rem',
  md: '0.25rem',
  lg: '0.5rem'
})

const themeShadow = reactive({
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
})

const themeSpacing = reactive({
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem'
})

const themeDuration = reactive({
  fast: '150ms',
  normal: '300ms',
  slow: '500ms'
})

// Computed properties for tab visibility
const showColorsTab = computed(() => activeTab.value === 'colors')
const showSpacingTab = computed(() => activeTab.value === 'spacing')
const showShadowsTab = computed(() => activeTab.value === 'shadows')
const showAnimationTab = computed(() => activeTab.value === 'animation')

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

const toggleCustomizer = () => {
  showThemeCustomizer.value = !showThemeCustomizer.value
}

const applyCustomTheme = () => {
  // Apply color theme
  applyColorTheme()
  
  // Apply radius theme
  Object.entries(themeRadius).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--radius-${key}`, value)
  })
  
  // Apply shadow theme
  Object.entries(themeShadow).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--shadow-${key}`, value)
  })
  
  // Apply spacing theme
  Object.entries(themeSpacing).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--spacing-${key}`, value)
    document.documentElement.style.setProperty(`--padding-${key}`, value)
  })
  
  // Apply duration theme
  Object.entries(themeDuration).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--duration-${key}`, value)
  })
  
  // Save theme to localStorage
  localStorage.setItem('customTheme', JSON.stringify({
    colors: themeColors,
    radius: themeRadius,
    shadow: themeShadow,
    spacing: themeSpacing,
    duration: themeDuration
  }))
}

const applyColorTheme = () => {
  // Apply primary color
  document.documentElement.style.setProperty('--color-primary', themeColors.primary)
  
  // Calculate light and dark variants
  const primaryHsl = parseHsl(themeColors.primary)
  if (primaryHsl) {
    document.documentElement.style.setProperty(
      '--color-primary-light', 
      `hsl(${primaryHsl.h}, ${primaryHsl.s}%, ${Math.min(primaryHsl.l + 40, 97)}%)`
    )
    document.documentElement.style.setProperty(
      '--color-primary-dark', 
      `hsl(${primaryHsl.h}, ${primaryHsl.s}%, ${Math.max(primaryHsl.l - 10, 20)}%)`
    )
  }
  
  // Apply secondary color
  document.documentElement.style.setProperty('--color-secondary', themeColors.secondary)
  
  // Calculate light and dark variants
  const secondaryHsl = parseHsl(themeColors.secondary)
  if (secondaryHsl) {
    document.documentElement.style.setProperty(
      '--color-secondary-light', 
      `hsl(${secondaryHsl.h}, ${secondaryHsl.s}%, ${Math.min(secondaryHsl.l + 40, 97)}%)`
    )
    document.documentElement.style.setProperty(
      '--color-secondary-dark', 
      `hsl(${secondaryHsl.h}, ${secondaryHsl.s}%, ${Math.max(secondaryHsl.l - 10, 20)}%)`
    )
  }
  
  // Apply other colors
  document.documentElement.style.setProperty('--color-background', themeColors.background)
  document.documentElement.style.setProperty('--color-card', themeColors.card)
  document.documentElement.style.setProperty('--color-muted', themeColors.muted)
  document.documentElement.style.setProperty('--color-border', themeColors.border)
}

// Parse HSL color string to get h, s, l values
const parseHsl = (hslString: string) => {
  const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/) || 
                hslString.match(/hsl\((\d+),\s*(\d+),\s*(\d+)\)/) ||
                hslString.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/)
  
  if (match) {
    return {
      h: parseInt(match[1]),
      s: parseInt(match[2]),
      l: parseInt(match[3])
    }
  }
  return null
}

const resetTheme = () => {
  // Reset to default theme
  document.documentElement.style.cssText = ''
  localStorage.removeItem('customTheme')
  
  // Reset reactive objects to default values
  Object.assign(themeColors, {
    primary: 'hsl(214, 100%, 48%)',
    secondary: 'hsl(270, 100%, 48%)',
    background: 'hsl(210, 20%, 98%)',
    card: 'hsl(0, 0%, 100%)',
    muted: 'hsl(210, 20%, 94%)',
    border: 'hsl(210, 16%, 90%)'
  })
  
  Object.assign(themeRadius, {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem'
  })
  
  Object.assign(themeShadow, {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  })
  
  Object.assign(themeSpacing, {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem'
  })
  
  Object.assign(themeDuration, {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  })
  
  // Apply dark mode if needed
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
  
  // Load custom theme if available
  const savedCustomTheme = localStorage.getItem('customTheme')
  if (savedCustomTheme) {
    try {
      const parsedTheme = JSON.parse(savedCustomTheme)
      
      // Apply saved theme values
      if (parsedTheme.colors) {
        Object.assign(themeColors, parsedTheme.colors)
      }
      
      if (parsedTheme.radius) {
        Object.assign(themeRadius, parsedTheme.radius)
      }
      
      if (parsedTheme.shadow) {
        Object.assign(themeShadow, parsedTheme.shadow)
      }
      
      if (parsedTheme.spacing) {
        Object.assign(themeSpacing, parsedTheme.spacing)
      }
      
      if (parsedTheme.duration) {
        Object.assign(themeDuration, parsedTheme.duration)
      }
      
      applyCustomTheme()
    } catch (e) {
      console.error('Failed to parse saved theme', e)
    }
  }
})
</script>

<template>
  <div class="relative">
    <button 
      @click="toggleCustomizer" 
      class="p-2 rounded-full hover:bg-muted transition-colors"
      aria-label="Customize theme"
    >
      <div class="i-mdi-palette text-xl text-secondary"></div>
    </button>
    
    <div v-if="showThemeCustomizer" class="absolute right-0 mt-2 w-80 bg-card rounded-md shadow-lg border border-border z-20 max-h-[80vh] overflow-auto">
      <div class="sticky top-0 bg-card border-b border-border p-3 flex justify-between items-center">
        <h3 class="text-md font-semibold">Theme Customizer</h3>
        <button @click="toggleCustomizer" class="text-muted-foreground hover:text-foreground">
          <div class="i-mdi-close"></div>
        </button>
      </div>
      
      <!-- Tabs -->
      <div class="flex border-b border-border">
        <button 
          @click="activeTab = 'colors'" 
          :class="['px-3 py-2 text-sm', activeTab === 'colors' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground']"
        >
          Colors
        </button>
        <button 
          @click="activeTab = 'spacing'" 
          :class="['px-3 py-2 text-sm', activeTab === 'spacing' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground']"
        >
          Spacing
        </button>
        <button 
          @click="activeTab = 'shadows'" 
          :class="['px-3 py-2 text-sm', activeTab === 'shadows' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground']"
        >
          Shadows
        </button>
        <button 
          @click="activeTab = 'animation'" 
          :class="['px-3 py-2 text-sm', activeTab === 'animation' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground']"
        >
          Animation
        </button>
      </div>
      
      <div class="p-4">
        <!-- Mode toggle (always visible) -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Mode</label>
          <button 
            @click="toggleTheme" 
            class="flex items-center justify-between w-full p-2 rounded-md border border-border"
          >
            <span>{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
            <div v-if="isDark" class="i-mdi-white-balance-sunny text-lg text-yellow-400"></div>
            <div v-else class="i-mdi-moon-waning-crescent text-lg text-primary"></div>
          </button>
        </div>
        
        <!-- Colors Tab -->
        <div v-if="showColorsTab" class="space-y-3">
          <div>
            <label for="primary-color" class="block text-sm font-medium mb-1">Primary</label>
            <div class="flex items-center">
              <input 
                type="color" 
                id="primary-color"
                v-model="themeColors.primary"
                class="w-8 h-8 rounded-md border border-border mr-2"
              >
              <input 
                type="text" 
                v-model="themeColors.primary"
                class="flex-1 p-1 text-sm rounded-md border border-border bg-background"
              >
            </div>
          </div>
          
          <div>
            <label for="secondary-color" class="block text-sm font-medium mb-1">Secondary</label>
            <div class="flex items-center">
              <input 
                type="color" 
                id="secondary-color"
                v-model="themeColors.secondary"
                class="w-8 h-8 rounded-md border border-border mr-2"
              >
              <input 
                type="text" 
                v-model="themeColors.secondary"
                class="flex-1 p-1 text-sm rounded-md border border-border bg-background"
              >
            </div>
          </div>
          
          <div>
            <label for="background-color" class="block text-sm font-medium mb-1">Background</label>
            <div class="flex items-center">
              <input 
                type="color" 
                id="background-color"
                v-model="themeColors.background"
                class="w-8 h-8 rounded-md border border-border mr-2"
              >
              <input 
                type="text" 
                v-model="themeColors.background"
                class="flex-1 p-1 text-sm rounded-md border border-border bg-background"
              >
            </div>
          </div>
          
          <div>
            <label for="card-color" class="block text-sm font-medium mb-1">Card</label>
            <div class="flex items-center">
              <input 
                type="color" 
                id="card-color"
                v-model="themeColors.card"
                class="w-8 h-8 rounded-md border border-border mr-2"
              >
              <input 
                type="text" 
                v-model="themeColors.card"
                class="flex-1 p-1 text-sm rounded-md border border-border bg-background"
              >
            </div>
          </div>
          
          <div>
            <label for="muted-color" class="block text-sm font-medium mb-1">Muted</label>
            <div class="flex items-center">
              <input 
                type="color" 
                id="muted-color"
                v-model="themeColors.muted"
                class="w-8 h-8 rounded-md border border-border mr-2"
              >
              <input 
                type="text" 
                v-model="themeColors.muted"
                class="flex-1 p-1 text-sm rounded-md border border-border bg-background"
              >
            </div>
          </div>
          
          <div>
            <label for="border-color" class="block text-sm font-medium mb-1">Border</label>
            <div class="flex items-center">
              <input 
                type="color" 
                id="border-color"
                v-model="themeColors.border"
                class="w-8 h-8 rounded-md border border-border mr-2"
              >
              <input 
                type="text" 
                v-model="themeColors.border"
                class="flex-1 p-1 text-sm rounded-md border border-border bg-background"
              >
            </div>
          </div>
        </div>
        
        <!-- Spacing Tab -->
        <div v-if="showSpacingTab" class="space-y-3">
          <div>
            <label for="spacing-sm" class="block text-sm font-medium mb-1">Small (sm)</label>
            <input 
              type="text" 
              id="spacing-sm"
              v-model="themeSpacing.sm"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
            <div class="mt-1 bg-primary h-2" :style="{ width: themeSpacing.sm }"></div>
          </div>
          
          <div>
            <label for="spacing-md" class="block text-sm font-medium mb-1">Medium (md)</label>
            <input 
              type="text" 
              id="spacing-md"
              v-model="themeSpacing.md"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
            <div class="mt-1 bg-primary h-2" :style="{ width: themeSpacing.md }"></div>
          </div>
          
          <div>
            <label for="spacing-lg" class="block text-sm font-medium mb-1">Large (lg)</label>
            <input 
              type="text" 
              id="spacing-lg"
              v-model="themeSpacing.lg"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
            <div class="mt-1 bg-primary h-2" :style="{ width: themeSpacing.lg }"></div>
          </div>
        </div>
        
        <!-- Shadows Tab -->
        <div v-if="showShadowsTab" class="space-y-3">
          <div>
            <label for="shadow-sm" class="block text-sm font-medium mb-1">Small (sm)</label>
            <input 
              type="text" 
              id="shadow-sm"
              v-model="themeShadow.sm"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
            <div class="mt-2 bg-card border border-border rounded-md p-2 h-10" :style="{ boxShadow: themeShadow.sm }"></div>
          </div>
          
          <div>
            <label for="shadow-md" class="block text-sm font-medium mb-1">Medium (md)</label>
            <input 
              type="text" 
              id="shadow-md"
              v-model="themeShadow.md"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
            <div class="mt-2 bg-card border border-border rounded-md p-2 h-10" :style="{ boxShadow: themeShadow.md }"></div>
          </div>
          
          <div>
            <label for="shadow-lg" class="block text-sm font-medium mb-1">Large (lg)</label>
            <input 
              type="text" 
              id="shadow-lg"
              v-model="themeShadow.lg"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
            <div class="mt-2 bg-card border border-border rounded-md p-2 h-10" :style="{ boxShadow: themeShadow.lg }"></div>
          </div>
        </div>
        
        <!-- Animation Tab -->
        <div v-if="showAnimationTab" class="space-y-3">
          <div>
            <label for="duration-fast" class="block text-sm font-medium mb-1">Fast</label>
            <input 
              type="text" 
              id="duration-fast"
              v-model="themeDuration.fast"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
          </div>
          
          <div>
            <label for="duration-normal" class="block text-sm font-medium mb-1">Normal</label>
            <input 
              type="text" 
              id="duration-normal"
              v-model="themeDuration.normal"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
          </div>
          
          <div>
            <label for="duration-slow" class="block text-sm font-medium mb-1">Slow</label>
            <input 
              type="text" 
              id="duration-slow"
              v-model="themeDuration.slow"
              class="w-full p-1 text-sm rounded-md border border-border bg-background"
            >
          </div>
          
          <div class="mt-2">
            <div class="text-sm font-medium mb-1">Preview</div>
            <div class="flex gap-2">
              <button 
                class="px-2 py-1 bg-primary text-white rounded-md"
                :style="{ transition: `all ${themeDuration.fast}` }"
              >
                Fast
              </button>
              <button 
                class="px-2 py-1 bg-primary text-white rounded-md"
                :style="{ transition: `all ${themeDuration.normal}` }"
              >
                Normal
              </button>
              <button 
                class="px-2 py-1 bg-primary text-white rounded-md"
                :style="{ transition: `all ${themeDuration.slow}` }"
              >
                Slow
              </button>
            </div>
          </div>
        </div>
        
        <!-- Action buttons (always visible) -->
        <div class="flex gap-2 mt-4">
          <button 
            @click="applyCustomTheme" 
            class="btn-primary flex-1"
          >
            Apply Theme
          </button>
          <button 
            @click="resetTheme" 
            class="btn-outline-primary"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-full hover:bg-muted transition-colors ml-2"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <div v-if="isDark" class="i-mdi-white-balance-sunny text-xl text-yellow-400"></div>
    <div v-else class="i-mdi-moon-waning-crescent text-xl text-primary"></div>
  </button>
</template>