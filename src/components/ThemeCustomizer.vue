<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import Button from './Button.vue'
import Modal from './Modal.vue'
import { predefinedPresets } from '../presets/themePresets'
import { ThemePreset } from '../types/theme'

// Main state
const activePreset = ref('default')
const customPresets = ref<Record<string, ThemePreset>>({})
const newPresetName = ref('')
const showSavePresetModal = ref(false)

// Dynamic theme settings structure
const themeSettings = ref({
  colors: [
    { id: 'primaryColor', label: 'Primary Color', value: '#3b82f6', type: 'color' },
    { id: 'secondaryColor', label: 'Secondary Color', value: '#8b5cf6', type: 'color' },
    { id: 'accentColor', label: 'Accent Color', value: '#10b981', type: 'color' }
  ],
  typography: [
    { 
      id: 'bodyFont', 
      label: 'Body Font', 
      value: 'Inter', 
      type: 'select',
      options: [
        'Inter', 'Montserrat', 'Roboto', 'Open Sans', 'Nunito', 
        'Poppins', 'Lato', 'Source Sans Pro', 'Playfair Display', 'Merriweather'
      ]
    },
    { 
      id: 'headingFont', 
      label: 'Heading Font', 
      value: 'Montserrat', 
      type: 'select',
      options: [
        'Inter', 'Montserrat', 'Roboto', 'Open Sans', 'Nunito', 
        'Poppins', 'Lato', 'Source Sans Pro', 'Playfair Display', 'Merriweather'
      ]
    },
    { id: 'fontSize', label: 'Base Font Size', value: 16, type: 'range', min: 12, max: 24, step: 1, unit: 'px' },
    { id: 'lineHeight', label: 'Line Height', value: 1.5, type: 'range', min: 1, max: 2, step: 0.1 },
    { id: 'fontScale', label: 'Font Scale', value: 1, type: 'range', min: 0.8, max: 1.2, step: 0.05 }
  ],
  spacing: [
    { id: 'borderRadius', label: 'Border Radius', value: 4, type: 'range', min: 0, max: 16, step: 1, unit: 'px' },
    { id: 'spacing', label: 'Base Spacing Unit', value: 4, type: 'range', min: 2, max: 8, step: 1, unit: 'px' },
    { id: 'shadowIntensity', label: 'Shadow Intensity', value: 10, type: 'range', min: 0, max: 20, step: 1 }
  ],
  animation: [
    { id: 'animationSpeed', label: 'Animation Speed', value: 300, type: 'range', min: 100, max: 500, step: 50, unit: 'ms' },
    { 
      id: 'animationEasing', 
      label: 'Animation Easing', 
      value: 'ease', 
      type: 'select',
      options: [
        'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear',
        'cubic-bezier(0.34, 1.56, 0.64, 1)', 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      ]
    }
  ],
  layout: [
    { id: 'containerWidth', label: 'Container Width', value: 1280, type: 'range', min: 800, max: 1600, step: 40, unit: 'px' },
    { id: 'gridColumns', label: 'Grid Columns', value: 12, type: 'range', min: 4, max: 16, step: 1 }
  ]
})

// Create a flat map of all settings for easy access
const settingsMap = computed(() => {
  const map: Record<string, any> = {}
  
  Object.values(themeSettings.value).forEach(group => {
    group.forEach((setting: any) => {
      map[setting.id] = setting
    })
  })
  
  return map
})

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
  // Apply color settings
  const primaryHSL = hexToHSL(settingsMap.value.primaryColor.value)
  const secondaryHSL = hexToHSL(settingsMap.value.secondaryColor.value)
  const accentHSL = hexToHSL(settingsMap.value.accentColor.value)
  
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
  document.documentElement.style.setProperty('--radius-sm', `${settingsMap.value.borderRadius.value * 0.5}px`)
  document.documentElement.style.setProperty('--radius-md', `${settingsMap.value.borderRadius.value}px`)
  document.documentElement.style.setProperty('--radius-lg', `${settingsMap.value.borderRadius.value * 2}px`)
  
  // Update typography
  document.documentElement.style.setProperty('--font-sans', `'${settingsMap.value.bodyFont.value}', system-ui, sans-serif`)
  document.documentElement.style.setProperty('--font-heading', `'${settingsMap.value.headingFont.value}', system-ui, sans-serif`)
  document.documentElement.style.setProperty('--font-size-base', `${settingsMap.value.fontSize.value}px`)
  document.documentElement.style.setProperty('--line-height', `${settingsMap.value.lineHeight.value}`)
  document.documentElement.style.setProperty('--font-scale', `${settingsMap.value.fontScale.value}`)
  
  // Update spacing
  document.documentElement.style.setProperty('--spacing-unit', `${settingsMap.value.spacing.value}px`)
  document.documentElement.style.setProperty('--spacing-sm', `${settingsMap.value.spacing.value * 0.5}px`)
  document.documentElement.style.setProperty('--spacing-md', `${settingsMap.value.spacing.value}px`)
  document.documentElement.style.setProperty('--spacing-lg', `${settingsMap.value.spacing.value * 2}px`)
  
  // Update shadows
  const shadowBase = settingsMap.value.shadowIntensity.value / 10
  document.documentElement.style.setProperty('--shadow-sm', `0 1px ${Math.round(2 * shadowBase)}px 0 rgba(0, 0, 0, ${0.05 * shadowBase})`)
  document.documentElement.style.setProperty('--shadow-md', `0 4px ${Math.round(6 * shadowBase)}px -1px rgba(0, 0, 0, ${0.1 * shadowBase}), 0 2px ${Math.round(4 * shadowBase)}px -1px rgba(0, 0, 0, ${0.06 * shadowBase})`)
  document.documentElement.style.setProperty('--shadow-lg', `0 10px ${Math.round(15 * shadowBase)}px -3px rgba(0, 0, 0, ${0.1 * shadowBase}), 0 4px ${Math.round(6 * shadowBase)}px -2px rgba(0, 0, 0, ${0.05 * shadowBase})`)
  
  // Update animations
  document.documentElement.style.setProperty('--duration-normal', `${settingsMap.value.animationSpeed.value}ms`)
  document.documentElement.style.setProperty('--duration-fast', `${Math.round(settingsMap.value.animationSpeed.value * 0.5)}ms`)
  document.documentElement.style.setProperty('--duration-slow', `${Math.round(settingsMap.value.animationSpeed.value * 1.5)}ms`)
  document.documentElement.style.setProperty('--ease-default', settingsMap.value.animationEasing.value)
  
  // Update layout
  document.documentElement.style.setProperty('--container-width', `${settingsMap.value.containerWidth.value}px`)
  document.documentElement.style.setProperty('--grid-columns', `${settingsMap.value.gridColumns.value}`)
  
  // Save current settings to localStorage
  saveCurrentSettings()
}

// Save current settings to localStorage
const saveCurrentSettings = () => {
  const currentSettings: Record<string, any> = {
    activePreset: activePreset.value,
    customPresets: customPresets.value
  }
  
  // Save all settings values
  Object.values(themeSettings.value).forEach(group => {
    group.forEach((setting: any) => {
      currentSettings[setting.id] = setting.value
    })
  })
  
  localStorage.setItem('theme-settings', JSON.stringify(currentSettings))
}

// Reset to defaults
const resetToDefaults = () => {
  applyPreset('default')
}

// Apply a preset
const applyPreset = (presetKey: string) => {
  const preset = presetKey.startsWith('custom-') 
    ? customPresets.value[presetKey.replace('custom-', '')]
    : predefinedPresets[presetKey]
  
  if (preset) {
    // Update all settings from preset
    Object.values(themeSettings.value).forEach(group => {
      group.forEach((setting: any) => {
        if (preset[setting.id] !== undefined) {
          setting.value = preset[setting.id]
        }
      })
    })
    
    activePreset.value = presetKey
  }
}

// Save current settings as a new preset
const saveAsNewPreset = () => {
  if (!newPresetName.value.trim()) return
  
  const presetName = newPresetName.value.trim()
  const newPreset: any = { name: presetName }
  
  // Save all current settings to the preset
  Object.values(themeSettings.value).forEach(group => {
    group.forEach((setting: any) => {
      newPreset[setting.id] = setting.value
    })
  })
  
  customPresets.value[presetName] = newPreset as ThemePreset
  
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

// Watch for changes in all settings and apply them
watch(themeSettings, () => {
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
          // Load individual settings if no preset is active or preset doesn't exist
          Object.values(themeSettings.value).forEach(group => {
            group.forEach((setting: any) => {
              if (settings[setting.id] !== undefined) {
                setting.value = settings[setting.id]
              }
            })
          })
        }
      } else {
        // Load individual settings if no preset is active
        Object.values(themeSettings.value).forEach(group => {
          group.forEach((setting: any) => {
            if (settings[setting.id] !== undefined) {
              setting.value = settings[setting.id]
            }
          })
        })
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

// Helper function to render setting controls based on type
const renderSettingControl = (setting: any) => {
  switch (setting.type) {
    case 'color':
      return {
        template: `
          <div class="flex items-center gap-2">
            <input 
              type="color" 
              v-model="setting.value" 
              class="color-picker"
            />
            <input 
              type="text" 
              v-model="setting.value" 
              class="flex-1 px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground"
            />
          </div>
        `
      }
    case 'range':
      return {
        template: `
          <div>
            <input 
              type="range" 
              v-model="setting.value" 
              :min="setting.min" 
              :max="setting.max" 
              :step="setting.step" 
              class="w-full"
            />
            <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
              <span>{{ setting.min }}{{ setting.unit || '' }}</span>
              <span>{{ setting.max }}{{ setting.unit || '' }}</span>
            </div>
          </div>
        `
      }
    case 'select':
      return {
        template: `
          <select 
            v-model="setting.value"
            class="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option v-for="option in setting.options" :key="option" :value="option">{{ option }}</option>
          </select>
        `
      }
    default:
      return {
        template: `<div>Unknown setting type: {{ setting.type }}</div>`
      }
  }
}
</script>

<template>
  <div>
    <!-- Header Actions -->
    <div class="flex justify-between items-center gap-2 mb-4">
      <div class="flex gap-2">
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
      </div>
    </div>
    
    <!-- Presets Section -->
    <div class="customizer-block mb-6">
      <h4 class="customizer-block-title">Theme Presets</h4>
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
    
    <!-- Dynamic Settings Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Colors Section -->
      <div class="customizer-block">
        <h4 class="customizer-block-title">Colors</h4>
        
        <div v-for="setting in themeSettings.colors" :key="setting.id" class="customizer-item">
          <label class="block text-xs font-medium mb-1.5">{{ setting.label }} {{ setting.unit ? `(${setting.value}${setting.unit})` : '' }}</label>
          
          <!-- Color picker -->
          <div v-if="setting.type === 'color'" class="flex items-center gap-2">
            <input 
              type="color" 
              v-model="setting.value" 
              class="color-picker"
            />
            <input 
              type="text" 
              v-model="setting.value" 
              class="flex-1 px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground"
            />
          </div>
          
          <!-- Color preview for primary, secondary, accent -->
          <div v-if="setting.id === 'primaryColor'" class="flex mt-1.5 gap-1">
            <div class="h-4 flex-1 rounded-sm bg-primary-light"></div>
            <div class="h-4 flex-1 rounded-sm bg-primary"></div>
            <div class="h-4 flex-1 rounded-sm bg-primary-dark"></div>
          </div>
          <div v-if="setting.id === 'secondaryColor'" class="flex mt-1.5 gap-1">
            <div class="h-4 flex-1 rounded-sm bg-secondary-light"></div>
            <div class="h-4 flex-1 rounded-sm bg-secondary"></div>
            <div class="h-4 flex-1 rounded-sm bg-secondary-dark"></div>
          </div>
          <div v-if="setting.id === 'accentColor'" class="flex mt-1.5 gap-1">
            <div class="h-4 flex-1 rounded-sm" :style="{ backgroundColor: setting.value + '33' }"></div>
            <div class="h-4 flex-1 rounded-sm" :style="{ backgroundColor: setting.value }"></div>
            <div class="h-4 flex-1 rounded-sm" :style="{ backgroundColor: setting.value + 'dd' }"></div>
          </div>
        </div>
        
        <!-- Color Preview -->
        <div class="customizer-item mt-4 p-2 border border-border rounded-md bg-muted/30">
          <h5 class="text-xs font-medium mb-2">Preview</h5>
          <div class="grid grid-cols-3 gap-1.5">
            <Button variant="primary" size="sm" class="text-xs">Primary</Button>
            <Button variant="secondary" size="sm" class="text-xs">Secondary</Button>
            <Button variant="outline-primary" size="sm" class="text-xs">Outline</Button>
          </div>
        </div>
      </div>
      
      <!-- Typography Section -->
      <div class="customizer-block">
        <h4 class="customizer-block-title">Typography</h4>
        
        <div v-for="setting in themeSettings.typography" :key="setting.id" class="customizer-item">
          <label class="block text-xs font-medium mb-1.5">
            {{ setting.label }} {{ setting.unit ? `(${setting.value}${setting.unit})` : setting.value }}
          </label>
          
          <!-- Select control -->
          <select 
            v-if="setting.type === 'select'"
            v-model="setting.value"
            class="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option v-for="option in setting.options" :key="option" :value="option">{{ option }}</option>
          </select>
          
          <!-- Range control -->
          <template v-else-if="setting.type === 'range'">
            <input 
              type="range" 
              v-model="setting.value" 
              :min="setting.min" 
              :max="setting.max" 
              :step="setting.step" 
              class="w-full"
            />
            <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
              <span>{{ setting.min }}{{ setting.unit || '' }}</span>
              <span>{{ setting.max }}{{ setting.unit || '' }}</span>
            </div>
          </template>
          
          <!-- Font previews -->
          <p v-if="setting.id === 'bodyFont'" class="mt-1.5 text-sm" :style="{ fontFamily: setting.value }">
            Body text with {{ setting.value }}.
          </p>
          <h5 v-if="setting.id === 'headingFont'" class="mt-1.5 text-base font-bold" :style="{ fontFamily: setting.value }">
            Heading with {{ setting.value }}.
          </h5>
        </div>
      </div>
      
      <!-- Spacing & Effects Section -->
      <div class="customizer-block">
        <h4 class="customizer-block-title">Spacing & Effects</h4>
        
        <div v-for="setting in themeSettings.spacing" :key="setting.id" class="customizer-item">
          <label class="block text-xs font-medium mb-1.5">
            {{ setting.label }} {{ setting.unit ? `(${setting.value}${setting.unit})` : setting.value }}
          </label>
          
          <!-- Range control -->
          <input 
            type="range" 
            v-model="setting.value" 
            :min="setting.min" 
            :max="setting.max" 
            :step="setting.step" 
            class="w-full"
          />
          <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
            <span>{{ setting.min }}{{ setting.unit || '' }}</span>
            <span>{{ setting.max }}{{ setting.unit || '' }}</span>
          </div>
          
          <!-- Visual previews -->
          <div v-if="setting.id === 'borderRadius'" class="flex gap-2 mt-1.5">
            <div class="w-10 h-10 bg-primary" :style="{ borderRadius: setting.value * 0.5 + 'px' }"></div>
            <div class="w-10 h-10 bg-primary" :style="{ borderRadius: setting.value + 'px' }"></div>
            <div class="w-10 h-10 bg-primary" :style="{ borderRadius: setting.value * 2 + 'px' }"></div>
          </div>
          
          <div v-if="setting.id === 'spacing'" class="flex gap-1 mt-1.5">
            <div class="h-6 bg-primary rounded-sm" :style="{ width: setting.value * 0.5 + 'px' }"></div>
            <div class="h-6 bg-primary rounded-sm" :style="{ width: setting.value + 'px' }"></div>
            <div class="h-6 bg-primary rounded-sm" :style="{ width: setting.value * 2 + 'px' }"></div>
            <div class="h-6 bg-primary rounded-sm" :style="{ width: setting.value * 4 + 'px' }"></div>
          </div>
          
          <div v-if="setting.id === 'shadowIntensity'" class="flex gap-2 mt-1.5">
            <div class="w-10 h-10 bg-card border border-border rounded-md" 
                 :style="{ boxShadow: `0 1px ${Math.round(2 * setting.value/10)}px 0 rgba(0, 0, 0, ${0.05 * setting.value/10})` }"></div>
            <div class="w-10 h-10 bg-card border border-border rounded-md" 
                 :style="{ boxShadow: `0 4px ${Math.round(6 * setting.value/10)}px -1px rgba(0, 0, 0, ${0.1 * setting.value/10}), 0 2px ${Math.round(4 * setting.value/10)}px -1px rgba(0, 0, 0, ${0.06 * setting.value/10})` }"></div>
            <div class="w-10 h-10 bg-card border border-border rounded-md" 
                 :style="{ boxShadow: `0 10px ${Math.round(15 * setting.value/10)}px -3px rgba(0, 0, 0, ${0.1 * setting.value/10}), 0 4px ${Math.round(6 * setting.value/10)}px -2px rgba(0, 0, 0, ${0.05 * setting.value/10})` }"></div>
          </div>
        </div>
      </div>
      
      <!-- Animation Settings Section -->
      <div class="customizer-block">
        <h4 class="customizer-block-title">Animation</h4>
        
        <div v-for="setting in themeSettings.animation" :key="setting.id" class="customizer-item">
          <label class="block text-xs font-medium mb-1.5">
            {{ setting.label }} {{ setting.unit ? `(${setting.value}${setting.unit})` : '' }}
          </label>
          
          <!-- Range control -->
          <template v-if="setting.type === 'range'">
            <input 
              type="range" 
              v-model="setting.value" 
              :min="setting.min" 
              :max="setting.max" 
              :step="setting.step" 
              class="w-full"
            />
            <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </template>
          
          <!-- Select control -->
          <select 
            v-else-if="setting.type === 'select'"
            v-model="setting.value"
            class="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option v-for="option in setting.options" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      
      <!-- Layout Settings Section -->
      <div class="customizer-block">
        <h4 class="customizer-block-title">Layout</h4>
        
        <div v-for="setting in themeSettings.layout" :key="setting.id" class="customizer-item">
          <label class="block text-xs font-medium mb-1.5">
            {{ setting.label }} {{ setting.unit ? `(${setting.value}${setting.unit})` : setting.value }}
          </label>
          
          <!-- Range control -->
          <input 
            type="range" 
            v-model="setting.value" 
            :min="setting.min" 
            :max="setting.max" 
            :step="setting.step" 
            class="w-full"
          />
          <div class="flex justify-between text-xs text-muted-foreground mt-0.5">
            <span v-if="setting.id === 'containerWidth'">Narrow</span>
            <span v-else>{{ setting.min }}</span>
            
            <span v-if="setting.id === 'containerWidth'">Wide</span>
            <span v-else>{{ setting.max }}</span>
          </div>
          
          <!-- Grid columns preview -->
          <div v-if="setting.id === 'gridColumns'" class="flex gap-0.5 mt-1.5">
            <div 
              v-for="i in setting.value" 
              :key="i" 
              class="h-6 bg-primary opacity-80 first:rounded-l-sm last:rounded-r-sm" 
              :style="{ width: `${100/setting.value}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Save Preset Modal -->
    <Modal 
      :show="showSavePresetModal" 
      title="Save as Preset"
      maxWidth="sm"
      @close="showSavePresetModal = false"
    >
      <div class="p-4">
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
        <div class="flex justify-end gap-2 mt-4">
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
    </Modal>
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

/* Square color picker styling */
.color-picker {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.color-picker::-moz-color-swatch {
  border: none;
  border-radius: 4px;
}

/* Customizer block styling */
.customizer-block {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.customizer-block-title {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.customizer-item {
  margin-bottom: 1.25rem;
}

.customizer-item:last-child {
  margin-bottom: 0;
}
</style>