<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import Button from './Button.vue'

// Main state
const isOpen = ref(false)
const activePreset = ref('default')
const customPresets = ref<Record<string, ThemePreset>>({})
const newPresetName = ref('')
const showSavePresetModal = ref(false)

// Theme state
const primaryColor = ref('#3b82f6') // Default blue
const secondaryColor = ref('#8b5cf6') // Default purple
const accentColor = ref('#10b981') // Default green accent
const borderRadius = ref(4) // Default border radius in px
const fontScale = ref(1) // Font size scale
const spacing = ref(4) // Base spacing unit
const shadowIntensity = ref(10) // Shadow intensity (0-20)

// Typography settings
const bodyFont = ref('Inter')
const headingFont = ref('Montserrat')
const fontSize = ref(16) // Base font size in px
const lineHeight = ref(1.5) // Line height multiplier

// Animation settings
const animationSpeed = ref(300) // in ms
const animationEasing = ref('ease')

// Layout settings
const containerWidth = ref(1280) // Max container width in px
const gridColumns = ref(12) // Number of grid columns

// Interface for theme presets
interface ThemePreset {
  name: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  borderRadius: number
  fontScale: number
  spacing: number
  shadowIntensity: number
  bodyFont: string
  headingFont: string
  fontSize: number
  lineHeight: number
  animationSpeed: number
  animationEasing: string
  containerWidth: number
  gridColumns: number
}

// Predefined presets
const predefinedPresets: Record<string, ThemePreset> = {
  default: {
    name: 'Default',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    borderRadius: 4,
    fontScale: 1,
    spacing: 4,
    shadowIntensity: 10,
    bodyFont: 'Inter',
    headingFont: 'Montserrat',
    fontSize: 16,
    lineHeight: 1.5,
    animationSpeed: 300,
    animationEasing: 'ease',
    containerWidth: 1280,
    gridColumns: 12
  },
  minimal: {
    name: 'Minimal',
    primaryColor: '#000000',
    secondaryColor: '#404040',
    accentColor: '#2563eb',
    borderRadius: 2,
    fontScale: 0.95,
    spacing: 4,
    shadowIntensity: 5,
    bodyFont: 'Inter',
    headingFont: 'Inter',
    fontSize: 16,
    lineHeight: 1.6,
    animationSpeed: 200,
    animationEasing: 'ease-out',
    containerWidth: 1200,
    gridColumns: 12
  },
  playful: {
    name: 'Playful',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    accentColor: '#06b6d4',
    borderRadius: 12,
    fontScale: 1.05,
    spacing: 5,
    shadowIntensity: 15,
    bodyFont: 'Nunito',
    headingFont: 'Nunito',
    fontSize: 18,
    lineHeight: 1.6,
    animationSpeed: 400,
    animationEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    containerWidth: 1320,
    gridColumns: 12
  }
}

// Available font options
const fontOptions = [
  'Inter',
  'Montserrat',
  'Roboto',
  'Open Sans',
  'Nunito',
  'Poppins',
  'Lato',
  'Source Sans Pro',
  'Playfair Display',
  'Merriweather'
]

// Available easing options
const easingOptions = [
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
]

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
  const accentHSL = hexToHSL(accentColor.value)
  
  // Update CSS variables for colors
  document.documentElement.style.setProperty('--color-primary', `hsl(${primaryHSL.h}, ${primaryHSL.s}%, 48%)`)
  document.documentElement.style.setProperty('--color-primary-light', `hsl(${primaryHSL.h}, ${primaryHSL.s}%, 97%)`)
  document.documentElement.style.setProperty('--color-primary-dark', `hsl(${primaryHSL.h}, ${primaryHSL.s}%, 38%)`)
  
  document.documentElement.style.setProperty('--color-secondary', `hsl(${secondaryHSL.h}, ${secondaryHSL.s}%, 48%)`)
  document.documentElement.style.setProperty('--color-secondary-light', `hsl(${secondaryHSL.h}, ${secondaryHSL.s}%, 97%)`)
  document.documentElement.style.setProperty('--color-secondary-dark', `hsl(${secondaryHSL.h}, ${secondaryHSL.s}%, 38%)`)
  
  document.documentElement.style.setProperty('--color-accent', `hsl(${accentHSL.h}, ${accentHSL.s}%, 48%)`)
  document.documentElement.style.setProperty('--color-accent-light', `hsl(${accentHSL.h}, ${accentHSL.s}%, 97%)`)
  document.documentElement.style.setProperty('--color-accent-dark', `hsl(${accentHSL.h}, ${accentHSL.s}%, 38%)`)
  
  // Update border radius
  document.documentElement.style.setProperty('--radius-sm', `${borderRadius.value * 0.5}px`)
  document.documentElement.style.setProperty('--radius-md', `${borderRadius.value}px`)
  document.documentElement.style.setProperty('--radius-lg', `${borderRadius.value * 2}px`)
  
  // Update typography
  document.documentElement.style.setProperty('--font-sans', `'${bodyFont.value}', system-ui, sans-serif`)
  document.documentElement.style.setProperty('--font-heading', `'${headingFont.value}', system-ui, sans-serif`)
  document.documentElement.style.setProperty('--font-size-base', `${fontSize.value}px`)
  document.documentElement.style.setProperty('--line-height', `${lineHeight.value}`)
  document.documentElement.style.setProperty('--font-scale', `${fontScale.value}`)
  
  // Update spacing
  document.documentElement.style.setProperty('--spacing-unit', `${spacing.value}px`)
  document.documentElement.style.setProperty('--spacing-sm', `${spacing.value * 0.5}px`)
  document.documentElement.style.setProperty('--spacing-md', `${spacing.value}px`)
  document.documentElement.style.setProperty('--spacing-lg', `${spacing.value * 2}px`)
  
  // Update shadows
  const shadowBase = shadowIntensity.value / 10
  document.documentElement.style.setProperty('--shadow-sm', `0 1px ${Math.round(2 * shadowBase)}px 0 rgba(0, 0, 0, ${0.05 * shadowBase})`)
  document.documentElement.style.setProperty('--shadow-md', `0 4px ${Math.round(6 * shadowBase)}px -1px rgba(0, 0, 0, ${0.1 * shadowBase}), 0 2px ${Math.round(4 * shadowBase)}px -1px rgba(0, 0, 0, ${0.06 * shadowBase})`)
  document.documentElement.style.setProperty('--shadow-lg', `0 10px ${Math.round(15 * shadowBase)}px -3px rgba(0, 0, 0, ${0.1 * shadowBase}), 0 4px ${Math.round(6 * shadowBase)}px -2px rgba(0, 0, 0, ${0.05 * shadowBase})`)
  
  // Update animations
  document.documentElement.style.setProperty('--duration-normal', `${animationSpeed.value}ms`)
  document.documentElement.style.setProperty('--duration-fast', `${Math.round(animationSpeed.value * 0.5)}ms`)
  document.documentElement.style.setProperty('--duration-slow', `${Math.round(animationSpeed.value * 1.5)}ms`)
  document.documentElement.style.setProperty('--ease-default', animationEasing.value)
  
  // Update layout
  document.documentElement.style.setProperty('--container-width', `${containerWidth.value}px`)
  document.documentElement.style.setProperty('--grid-columns', `${gridColumns.value}`)
  
  // Save current settings to localStorage
  saveCurrentSettings()
}

// Save current settings to localStorage
const saveCurrentSettings = () => {
  const currentSettings = {
    primaryColor: primaryColor.value,
    secondaryColor: secondaryColor.value,
    accentColor: accentColor.value,
    borderRadius: borderRadius.value,
    fontScale: fontScale.value,
    spacing: spacing.value,
    shadowIntensity: shadowIntensity.value,
    bodyFont: bodyFont.value,
    headingFont: headingFont.value,
    fontSize: fontSize.value,
    lineHeight: lineHeight.value,
    animationSpeed: animationSpeed.value,
    animationEasing: animationEasing.value,
    containerWidth: containerWidth.value,
    gridColumns: gridColumns.value,
    activePreset: activePreset.value,
    customPresets: customPresets.value
  }
  
  localStorage.setItem('theme-settings', JSON.stringify(currentSettings))
}

// Reset to defaults
const resetToDefaults = () => {
  applyPreset('default')
}

// Toggle the customizer
const toggleCustomizer = () => {
  isOpen.value = !isOpen.value
}

// Apply a preset
const applyPreset = (presetKey: string) => {
  const preset = presetKey.startsWith('custom-') 
    ? customPresets.value[presetKey.replace('custom-', '')]
    : predefinedPresets[presetKey]
  
  if (preset) {
    primaryColor.value = preset.primaryColor
    secondaryColor.value = preset.secondaryColor
    accentColor.value = preset.accentColor
    borderRadius.value = preset.borderRadius
    fontScale.value = preset.fontScale
    spacing.value = preset.spacing
    shadowIntensity.value = preset.shadowIntensity
    bodyFont.value = preset.bodyFont
    headingFont.value = preset.headingFont
    fontSize.value = preset.fontSize
    lineHeight.value = preset.lineHeight
    animationSpeed.value = preset.animationSpeed
    animationEasing.value = preset.animationEasing
    containerWidth.value = preset.containerWidth
    gridColumns.value = preset.gridColumns
    
    activePreset.value = presetKey
  }
}

// Save current settings as a new preset
const saveAsNewPreset = () => {
  if (!newPresetName.value.trim()) return
  
  const presetName = newPresetName.value.trim()
  
  customPresets.value[presetName] = {
    name: presetName,
    primaryColor: primaryColor.value,
    secondaryColor: secondaryColor.value,
    accentColor: accentColor.value,
    borderRadius: borderRadius.value,
    fontScale: fontScale.value,
    spacing: spacing.value,
    shadowIntensity: shadowIntensity.value,
    bodyFont: bodyFont.value,
    headingFont: headingFont.value,
    fontSize: fontSize.value,
    lineHeight: lineHeight.value,
    animationSpeed: animationSpeed.value,
    animationEasing: animationEasing.value,
    containerWidth: containerWidth.value,
    gridColumns: gridColumns.value
  }
  
  activePreset.value = `custom-${presetName}`
  newPresetName.value = ''
  showSavePresetModal.value = false
  
  // Save to localStorage
  saveCurrentSettings()
}

// Delete a custom preset
const deleteCustomPreset = (presetName: string) => {
  delete customPresets.value[presetName]
  
  if (activePreset.value === `custom-${presetName}`) {
    activePreset.value = 'default'
    applyPreset('default')
  }
  
  // Save to localStorage
  saveCurrentSettings()
}

// Computed properties for all available presets
const allPresets = computed(() => {
  const presets: Record<string, string> = {}
  
  // Add predefined presets
  Object.keys(predefinedPresets).forEach(key => {
    presets[key] = predefinedPresets[key].name
  })
  
  // Add custom presets
  Object.keys(customPresets.value).forEach(key => {
    presets[`custom-${key}`] = customPresets.value[key].name
  })
  
  return presets
})

// Watch for changes and apply them
watch([
  primaryColor, secondaryColor, accentColor, borderRadius, 
  fontScale, spacing, shadowIntensity, bodyFont, headingFont,
  fontSize, lineHeight, animationSpeed, animationEasing,
  containerWidth, gridColumns
], () => {
  applyThemeChanges()
}, { deep: true })

// Load saved theme on mount
onMounted(() => {
  try {
    const savedSettings = localStorage.getItem('theme-settings')
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      
      // Load custom presets
      if (settings.customPresets) {
        customPresets.value = settings.customPresets
      }
      
      // Apply active preset if it exists
      if (settings.activePreset) {
        activePreset.value = settings.activePreset
        
        if (settings.activePreset.startsWith('custom-') && customPresets.value[settings.activePreset.replace('custom-', '')]) {
          applyPreset(settings.activePreset)
        } else if (predefinedPresets[settings.activePreset]) {
          applyPreset(settings.activePreset)
        } else {
          // Fallback to default if preset doesn't exist
          applyPreset('default')
        }
      } else {
        // Load individual settings if no preset is active
        primaryColor.value = settings.primaryColor || primaryColor.value
        secondaryColor.value = settings.secondaryColor || secondaryColor.value
        accentColor.value = settings.accentColor || accentColor.value
        borderRadius.value = settings.borderRadius || borderRadius.value
        fontScale.value = settings.fontScale || fontScale.value
        spacing.value = settings.spacing || spacing.value
        shadowIntensity.value = settings.shadowIntensity || shadowIntensity.value
        bodyFont.value = settings.bodyFont || bodyFont.value
        headingFont.value = settings.headingFont || headingFont.value
        fontSize.value = settings.fontSize || fontSize.value
        lineHeight.value = settings.lineHeight || lineHeight.value
        animationSpeed.value = settings.animationSpeed || animationSpeed.value
        animationEasing.value = settings.animationEasing || animationEasing.value
        containerWidth.value = settings.containerWidth || containerWidth.value
        gridColumns.value = settings.gridColumns || gridColumns.value
      }
    }
    
    // Apply theme changes
    applyThemeChanges()
  } catch (error) {
    console.error('Error loading theme settings:', error)
    // Apply default theme if there's an error
    applyPreset('default')
  }
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
    
    <!-- Floating customizer widget -->
    <div 
      v-if="isOpen"
      class="fixed bottom-6 right-6 z-50 w-[90vw] max-w-3xl bg-card rounded-xl shadow-xl border border-border overflow-hidden transform transition-all duration-300 ease-out"
      :class="isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <!-- Header -->
      <div class="p-4 border-b border-border flex justify-between items-center bg-card">
        <h3 class="text-lg font-heading font-semibold text-primary flex items-center gap-2">
          <div class="i-mdi-palette text-lg"></div>
          Theme Customizer
        </h3>
        <div class="flex items-center gap-2">
          <Button 
            variant="outline-primary" 
            size="sm" 
            @click="resetToDefaults"
            class="text-sm"
          >
            <div class="i-mdi-refresh mr-1"></div>
            Reset
          </Button>
          <Button 
            variant="outline-primary" 
            size="sm" 
            @click="showSavePresetModal = true"
            class="text-sm"
          >
            <div class="i-mdi-content-save mr-1"></div>
            Save Preset
          </Button>
          <button 
            @click="toggleCustomizer" 
            class="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label="Close customizer"
          >
            <div class="i-mdi-close text-lg"></div>
          </button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-4 max-h-[70vh] overflow-y-auto">
        <!-- Presets Section -->
        <div class="mb-6">
          <h4 class="text-sm font-medium uppercase text-muted-foreground mb-3">Theme Presets</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div 
              v-for="(name, key) in allPresets" 
              :key="key"
              class="flex items-center justify-between bg-muted/30 rounded-md p-2"
            >
              <button 
                @click="applyPreset(key)"
                class="text-left py-1 px-2 rounded-md w-full transition-colors text-sm flex items-center"
                :class="activePreset === key ? 'text-primary font-medium' : 'text-foreground hover:text-primary'"
              >
                <div class="i-mdi-check-circle text-sm mr-1.5" v-if="activePreset === key"></div>
                <div class="i-mdi-circle-outline text-sm mr-1.5" v-else></div>
                {{ name }}
                <span v-if="key.startsWith('custom-')" class="text-xs text-muted-foreground ml-1">(Custom)</span>
              </button>
              <button 
                v-if="key.startsWith('custom-')"
                @click="deleteCustomPreset(key.replace('custom-', ''))"
                class="text-muted-foreground hover:text-danger p-1 rounded-md hover:bg-danger-light/30 transition-colors"
                aria-label="Delete preset"
              >
                <div class="i-mdi-delete-outline text-sm"></div>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Main Customization Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Colors Column -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium uppercase text-muted-foreground mb-3">Colors</h4>
            
            <!-- Primary Color -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Primary Color</label>
              <div class="flex items-center gap-2">
                <input 
                  type="color" 
                  v-model="primaryColor" 
                  class="w-8 h-8 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  v-model="primaryColor" 
                  class="flex-1 px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div class="flex mt-1.5 gap-1">
                <div class="h-4 flex-1 rounded-sm bg-primary-light"></div>
                <div class="h-4 flex-1 rounded-sm bg-primary"></div>
                <div class="h-4 flex-1 rounded-sm bg-primary-dark"></div>
              </div>
            </div>
            
            <!-- Secondary Color -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Secondary Color</label>
              <div class="flex items-center gap-2">
                <input 
                  type="color" 
                  v-model="secondaryColor" 
                  class="w-8 h-8 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  v-model="secondaryColor" 
                  class="flex-1 px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div class="flex mt-1.5 gap-1">
                <div class="h-4 flex-1 rounded-sm bg-secondary-light"></div>
                <div class="h-4 flex-1 rounded-sm bg-secondary"></div>
                <div class="h-4 flex-1 rounded-sm bg-secondary-dark"></div>
              </div>
            </div>
            
            <!-- Accent Color -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Accent Color</label>
              <div class="flex items-center gap-2">
                <input 
                  type="color" 
                  v-model="accentColor" 
                  class="w-8 h-8 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  v-model="accentColor" 
                  class="flex-1 px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div class="flex mt-1.5 gap-1">
                <div class="h-4 flex-1 rounded-sm" :style="{ backgroundColor: accentColor + '33' }"></div>
                <div class="h-4 flex-1 rounded-sm" :style="{ backgroundColor: accentColor }"></div>
                <div class="h-4 flex-1 rounded-sm" :style="{ backgroundColor: accentColor + 'dd' }"></div>
              </div>
            </div>
            
            <!-- Color Preview -->
            <div class="mt-4 p-2 border border-border rounded-md bg-muted/30">
              <h5 class="text-xs font-medium mb-2">Preview</h5>
              <div class="grid grid-cols-3 gap-1.5">
                <Button variant="primary" size="sm" class="text-xs">Primary</Button>
                <Button variant="secondary" size="sm" class="text-xs">Secondary</Button>
                <Button variant="outline-primary" size="sm" class="text-xs">Outline</Button>
              </div>
            </div>
          </div>
          
          <!-- Typography Column -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium uppercase text-muted-foreground mb-3">Typography</h4>
            
            <!-- Body Font -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Body Font</label>
              <select 
                v-model="bodyFont"
                class="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
              >
                <option v-for="font in fontOptions" :key="font" :value="font">{{ font }}</option>
              </select>
              <p class="mt-1.5 text-sm" :style="{ fontFamily: bodyFont }">
                Body text with {{ bodyFont }}.
              </p>
            </div>
            
            <!-- Heading Font -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Heading Font</label>
              <select 
                v-model="headingFont"
                class="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
              >
                <option v-for="font in fontOptions" :key="font" :value="font">{{ font }}</option>
              </select>
              <h5 class="mt-1.5 text-base font-bold" :style="{ fontFamily: headingFont }">
                Heading with {{ headingFont }}.
              </h5>
            </div>
            
            <!-- Base Font Size -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Base Font Size ({{ fontSize }}px)</label>
              <input 
                type="range" 
                v-model="fontSize" 
                min="12" 
                max="24" 
                step="1" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>12px</span>
                <span>24px</span>
              </div>
            </div>
            
            <!-- Line Height -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Line Height ({{ lineHeight }})</label>
              <input 
                type="range" 
                v-model="lineHeight" 
                min="1" 
                max="2" 
                step="0.1" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>1.0</span>
                <span>2.0</span>
              </div>
            </div>
            
            <!-- Font Scale -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Font Scale ({{ fontScale }})</label>
              <input 
                type="range" 
                v-model="fontScale" 
                min="0.8" 
                max="1.2" 
                step="0.05" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>0.8</span>
                <span>1.2</span>
              </div>
            </div>
          </div>
          
          <!-- Spacing & Effects Column -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium uppercase text-muted-foreground mb-3">Spacing & Effects</h4>
            
            <!-- Border Radius -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Border Radius ({{ borderRadius }}px)</label>
              <input 
                type="range" 
                v-model="borderRadius" 
                min="0" 
                max="16" 
                step="1" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>0px</span>
                <span>16px</span>
              </div>
              <div class="flex gap-2 mt-1.5">
                <div class="w-10 h-10 bg-primary" :style="{ borderRadius: borderRadius * 0.5 + 'px' }"></div>
                <div class="w-10 h-10 bg-primary" :style="{ borderRadius: borderRadius + 'px' }"></div>
                <div class="w-10 h-10 bg-primary" :style="{ borderRadius: borderRadius * 2 + 'px' }"></div>
              </div>
            </div>
            
            <!-- Base Spacing -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Base Spacing Unit ({{ spacing }}px)</label>
              <input 
                type="range" 
                v-model="spacing" 
                min="2" 
                max="8" 
                step="1" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>2px</span>
                <span>8px</span>
              </div>
              <div class="flex gap-1 mt-1.5">
                <div class="h-6 bg-primary rounded-sm" :style="{ width: spacing * 0.5 + 'px' }"></div>
                <div class="h-6 bg-primary rounded-sm" :style="{ width: spacing + 'px' }"></div>
                <div class="h-6 bg-primary rounded-sm" :style="{ width: spacing * 2 + 'px' }"></div>
                <div class="h-6 bg-primary rounded-sm" :style="{ width: spacing * 4 + 'px' }"></div>
              </div>
            </div>
            
            <!-- Shadow Intensity -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Shadow Intensity ({{ shadowIntensity }})</label>
              <input 
                type="range" 
                v-model="shadowIntensity" 
                min="0" 
                max="20" 
                step="1" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>None</span>
                <span>Heavy</span>
              </div>
              <div class="flex gap-2 mt-1.5">
                <div class="w-10 h-10 bg-card border border-border rounded-md" :style="{ boxShadow: `0 1px ${Math.round(2 * shadowIntensity/10)}px 0 rgba(0, 0, 0, ${0.05 * shadowIntensity/10})` }"></div>
                <div class="w-10 h-10 bg-card border border-border rounded-md" :style="{ boxShadow: `0 4px ${Math.round(6 * shadowIntensity/10)}px -1px rgba(0, 0, 0, ${0.1 * shadowIntensity/10}), 0 2px ${Math.round(4 * shadowIntensity/10)}px -1px rgba(0, 0, 0, ${0.06 * shadowIntensity/10})` }"></div>
                <div class="w-10 h-10 bg-card border border-border rounded-md" :style="{ boxShadow: `0 10px ${Math.round(15 * shadowIntensity/10)}px -3px rgba(0, 0, 0, ${0.1 * shadowIntensity/10}), 0 4px ${Math.round(6 * shadowIntensity/10)}px -2px rgba(0, 0, 0, ${0.05 * shadowIntensity/10})` }"></div>
              </div>
            </div>
            
            <!-- Animation Speed -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Animation Speed ({{ animationSpeed }}ms)</label>
              <input 
                type="range" 
                v-model="animationSpeed" 
                min="100" 
                max="500" 
                step="50" 
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
            
            <!-- Animation Easing -->
            <div>
              <label class="block text-xs font-medium mb-1.5">Animation Easing</label>
              <select 
                v-model="animationEasing"
                class="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
              >
                <option v-for="easing in easingOptions" :key="easing" :value="easing">{{ easing }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Backdrop for mobile -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/20 z-40"
      @click="toggleCustomizer"
    ></div>
    
    <!-- Save Preset Modal -->
    <div 
      v-if="showSavePresetModal" 
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
      @click.self="showSavePresetModal = false"
    >
      <div class="bg-card border border-border rounded-lg shadow-xl w-full max-w-xs p-4">
        <h3 class="text-lg font-heading font-semibold mb-3">Save as Preset</h3>
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1.5">Preset Name</label>
          <input 
            type="text" 
            v-model="newPresetName" 
            placeholder="My Custom Theme"
            class="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
            @keyup.enter="saveAsNewPreset"
          />
        </div>
        <div class="flex justify-end gap-2">
          <Button 
            variant="outline-primary" 
            size="sm" 
            @click="showSavePresetModal = false"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            @click="saveAsNewPreset"
            :disabled="!newPresetName.trim()"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Custom range input styling */
input[type="range"] {
  height: 4px;
}

input[type="range"]::-webkit-slider-thumb {
  width: 12px;
  height: 12px;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
}
</style>