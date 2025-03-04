<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Button from './Button.vue'

const isOpen = ref(false)
const primaryColor = ref('#3b82f6') // Default blue
const secondaryColor = ref('#8b5cf6') // Default purple
const borderRadius = ref(4) // Default border radius in px

// Convert hex to hsl for CSS variables
const hexToHSL = (hex: string) => {
  // Remove the # if present
  hex = hex.replace(/^#/, '')
  
  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255
  let g = parseInt(hex.substring(2, 4), 16) / 255
  let b = parseInt(hex.substring(4, 6), 16) / 255
  
  // Find the min and max values to calculate the lightness
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    
    h = h / 6
  }
  
  // Convert to degrees, percentage, percentage
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)
  
  return { h, s, l }
}

// Apply theme changes
const applyThemeChanges = () => {
  const primaryHSL = hexToHSL(primaryColor.value)
  const secondaryHSL = hexToHSL(secondaryColor.value)
  
  // Update CSS variables for light mode
  document.documentElement.style.setProperty('--color-primary', `hsl(${primaryHSL.h}, ${primaryHSL.s}%, 48%)`)
  document.documentElement.style.setProperty('--color-primary-light', `hsl(${primaryHSL.h}, ${primaryHSL.s}%, 97%)`)
  document.documentElement.style.setProperty('--color-primary-dark', `hsl(${primaryHSL.h}, ${primaryHSL.s}%, 38%)`)
  
  document.documentElement.style.setProperty('--color-secondary', `hsl(${secondaryHSL.h}, ${secondaryHSL.s}%, 48%)`)
  document.documentElement.style.setProperty('--color-secondary-light', `hsl(${secondaryHSL.h}, ${secondaryHSL.s}%, 97%)`)
  document.documentElement.style.setProperty('--color-secondary-dark', `hsl(${secondaryHSL.h}, ${secondaryHSL.s}%, 38%)`)
  
  // Update border radius
  document.documentElement.style.setProperty('--radius-sm', `${borderRadius.value * 0.5}px`)
  document.documentElement.style.setProperty('--radius-md', `${borderRadius.value}px`)
  document.documentElement.style.setProperty('--radius-lg', `${borderRadius.value * 2}px`)
  
  // Save to localStorage
  localStorage.setItem('theme-primary', primaryColor.value)
  localStorage.setItem('theme-secondary', secondaryColor.value)
  localStorage.setItem('theme-border-radius', borderRadius.value.toString())
}

// Reset to defaults
const resetToDefaults = () => {
  primaryColor.value = '#3b82f6'
  secondaryColor.value = '#8b5cf6'
  borderRadius.value = 4
  
  // Remove custom styles
  document.documentElement.style.removeProperty('--color-primary')
  document.documentElement.style.removeProperty('--color-primary-light')
  document.documentElement.style.removeProperty('--color-primary-dark')
  document.documentElement.style.removeProperty('--color-secondary')
  document.documentElement.style.removeProperty('--color-secondary-light')
  document.documentElement.style.removeProperty('--color-secondary-dark')
  document.documentElement.style.removeProperty('--radius-sm')
  document.documentElement.style.removeProperty('--radius-md')
  document.documentElement.style.removeProperty('--radius-lg')
  
  // Clear localStorage
  localStorage.removeItem('theme-primary')
  localStorage.removeItem('theme-secondary')
  localStorage.removeItem('theme-border-radius')
}

// Toggle the customizer
const toggleCustomizer = () => {
  isOpen.value = !isOpen.value
}

// Watch for changes and apply them
watch([primaryColor, secondaryColor, borderRadius], () => {
  applyThemeChanges()
}, { deep: true })

// Load saved theme on mount
onMounted(() => {
  const savedPrimary = localStorage.getItem('theme-primary')
  const savedSecondary = localStorage.getItem('theme-secondary')
  const savedBorderRadius = localStorage.getItem('theme-border-radius')
  
  if (savedPrimary) primaryColor.value = savedPrimary
  if (savedSecondary) secondaryColor.value = savedSecondary
  if (savedBorderRadius) borderRadius.value = parseInt(savedBorderRadius)
  
  // Apply saved theme
  applyThemeChanges()
})
</script>

<template>
  <div class="relative">
    <!-- Customizer toggle button -->
    <button 
      @click="toggleCustomizer" 
      class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      aria-label="Customize theme"
    >
      <div class="i-mdi-palette text-primary text-xl"></div>
    </button>
    
    <!-- Customizer panel -->
    <div 
      v-show="isOpen" 
      class="absolute right-0 mt-2 w-80 bg-card border border-border rounded-md shadow-lg z-50"
    >
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-heading font-semibold text-primary">Theme Customizer</h3>
          <button 
            @click="toggleCustomizer" 
            class="text-muted-foreground hover:text-foreground"
            aria-label="Close customizer"
          >
            <div class="i-mdi-close text-lg"></div>
          </button>
        </div>
        
        <div class="space-y-4">
          <!-- Primary Color -->
          <div>
            <label class="block text-sm font-medium mb-1">Primary Color</label>
            <div class="flex items-center gap-3">
              <input 
                type="color" 
                v-model="primaryColor" 
                class="w-10 h-10 rounded cursor-pointer"
              />
              <input 
                type="text" 
                v-model="primaryColor" 
                class="flex-1 px-3 py-1 border border-border rounded-md bg-background text-foreground"
              />
            </div>
          </div>
          
          <!-- Secondary Color -->
          <div>
            <label class="block text-sm font-medium mb-1">Secondary Color</label>
            <div class="flex items-center gap-3">
              <input 
                type="color" 
                v-model="secondaryColor" 
                class="w-10 h-10 rounded cursor-pointer"
              />
              <input 
                type="text" 
                v-model="secondaryColor" 
                class="flex-1 px-3 py-1 border border-border rounded-md bg-background text-foreground"
              />
            </div>
          </div>
          
          <!-- Border Radius -->
          <div>
            <label class="block text-sm font-medium mb-1">Border Radius ({{ borderRadius }}px)</label>
            <input 
              type="range" 
              v-model="borderRadius" 
              min="0" 
              max="16" 
              step="1" 
              class="w-full"
            />
            <div class="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0px</span>
              <span>8px</span>
              <span>16px</span>
            </div>
          </div>
          
          <!-- Preview -->
          <div class="mt-4 p-3 border border-border rounded-md">
            <h4 class="text-sm font-medium mb-2">Preview</h4>
            <div class="flex flex-wrap gap-2">
              <div class="w-8 h-8 rounded-md" :style="{ backgroundColor: primaryColor }"></div>
              <div class="w-8 h-8 rounded-md" :style="{ backgroundColor: secondaryColor }"></div>
              <div class="w-8 h-8 bg-background border border-border rounded-md"></div>
            </div>
            <div class="flex gap-2 mt-2">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex justify-between mt-4">
            <Button variant="outline-primary" size="sm" @click="resetToDefaults">Reset to Defaults</Button>
            <Button variant="primary" size="sm" @click="toggleCustomizer">Close</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>