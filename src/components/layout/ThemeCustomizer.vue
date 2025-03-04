<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Font options
const fontCategories = [
  { 
    id: 'sans', 
    label: 'Sans Serif',
    fonts: [
      'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Lato', 
      'Poppins', 'Raleway', 'Nunito', 'Nunito Sans', 'Rubik', 
      'Work Sans', 'Mulish', 'Source Sans Pro'
    ]
  },
  { 
    id: 'serif', 
    label: 'Serif',
    fonts: [
      'Merriweather', 'Playfair Display', 'Lora', 'Crimson Pro', 'Libre Baskerville'
    ]
  },
  { 
    id: 'mono', 
    label: 'Monospace',
    fonts: [
      'Fira Code', 'Fira Mono', 'JetBrains Mono', 'Source Code Pro', 
      'Ubuntu Mono', 'Roboto Mono', 'IBM Plex Mono'
    ]
  },
  { 
    id: 'display', 
    label: 'Display',
    fonts: [
      'Montserrat', 'Oswald', 'Bebas Neue', 'Anton'
    ]
  }
]

const selectedFontCategory = ref('sans')
const selectedFont = ref('Inter')

// Color customization
const primaryColor = ref('#0284c7') // Default primary color
const secondaryColor = ref('#c026d3') // Default secondary color

// Border radius customization
const borderRadius = ref(6) // Default border radius in pixels

// Spacing customization
const baseSpacing = ref(4) // Default base spacing in pixels

// Transition duration
const transitionDuration = ref(150) // Default transition duration in ms

// Shadow intensity
const shadowIntensity = ref(10) // Default shadow intensity (0-20)

// Active tab
const activeTab = ref('typography')

// Generate color shades
const generateColorShades = (baseColor: string) => {
  // This is a simplified version - in a real app you'd use a color library
  // to generate proper color shades
  return {
    lightest: adjustBrightness(baseColor, 0.9),
    lighter: adjustBrightness(baseColor, 0.8),
    light: adjustBrightness(baseColor, 0.6),
    medium: adjustBrightness(baseColor, 0.4),
    default: adjustBrightness(baseColor, 0.2),
    dark: baseColor,
    darker: adjustBrightness(baseColor, -0.2),
    darkest: adjustBrightness(baseColor, -0.4),
  }
}

// Simple function to adjust color brightness
function adjustBrightness(hex: string, factor: number) {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  // Adjust brightness
  r = Math.min(255, Math.max(0, Math.round(r + 255 * factor)))
  g = Math.min(255, Math.max(0, Math.round(g + 255 * factor)))
  b = Math.min(255, Math.max(0, Math.round(b + 255 * factor)))

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Apply theme changes
const applyThemeChanges = debounce(() => {
  // Apply font
  document.documentElement.style.setProperty('--font-family', `'${selectedFont.value}', system-ui, sans-serif`)

  // Apply primary color shades
  const primaryShades = generateColorShades(primaryColor.value)
  Object.entries(primaryShades).forEach(([shade, color]) => {
    document.documentElement.style.setProperty(`--color-primary-${shade}`, color)
  })
  document.documentElement.style.setProperty('--color-primary', primaryColor.value)

  // Apply secondary color shades
  const secondaryShades = generateColorShades(secondaryColor.value)
  Object.entries(secondaryShades).forEach(([shade, color]) => {
    document.documentElement.style.setProperty(`--color-secondary-${shade}`, color)
  })
  document.documentElement.style.setProperty('--color-secondary', secondaryColor.value)

  // Apply border radius
  const radiusValue = `${borderRadius.value / 16}rem`
  document.documentElement.style.setProperty('--radius-md', radiusValue)
  document.documentElement.style.setProperty('--radius-sm', `${borderRadius.value / 24}rem`)
  document.documentElement.style.setProperty('--radius-lg', `${borderRadius.value / 12}rem`)
  document.documentElement.style.setProperty('--radius-xl', `${borderRadius.value / 8}rem`)

  // Apply spacing
  document.documentElement.style.setProperty('--spacing-1', `${baseSpacing.value / 4}rem`)
  document.documentElement.style.setProperty('--spacing-2', `${baseSpacing.value / 2}rem`)
  document.documentElement.style.setProperty('--spacing-4', `${baseSpacing.value}rem`)
  document.documentElement.style.setProperty('--spacing-8', `${baseSpacing.value * 2}rem`)

  // Apply transition duration
  document.documentElement.style.setProperty('--duration-150', `${transitionDuration.value}ms`)
  document.documentElement.style.setProperty('--duration-200', `${transitionDuration.value * 1.33}ms`)
  document.documentElement.style.setProperty('--duration-300', `${transitionDuration.value * 2}ms`)

  // Apply shadow intensity
  const shadowOpacity = shadowIntensity.value / 100
  document.documentElement.style.setProperty(
    '--shadow-md', 
    `0 4px 6px -1px rgba(0, 0, 0, ${shadowOpacity}), 0 2px 4px -1px rgba(0, 0, 0, ${shadowOpacity * 0.6})`
  )
}, 100)

// Watch for changes and apply them
watch(
  [selectedFont, primaryColor, secondaryColor, borderRadius, baseSpacing, transitionDuration, shadowIntensity], 
  applyThemeChanges, 
  { immediate: true }
)

// Update font category when font changes
watch(selectedFont, (newFont) => {
  for (const category of fontCategories) {
    if (category.fonts.includes(newFont)) {
      selectedFontCategory.value = category.id
      break
    }
  }
})

// Get fonts for the selected category
const fontsForCategory = computed(() => {
  const category = fontCategories.find(c => c.id === selectedFontCategory.value)
  return category ? category.fonts : []
})

// Update font when category changes
watch(selectedFontCategory, (newCategory) => {
  const category = fontCategories.find(c => c.id === newCategory)
  if (category && category.fonts.length > 0) {
    selectedFont.value = category.fonts[0]
  }
})

// Reset to defaults
const resetToDefaults = () => {
  selectedFontCategory.value = 'sans'
  selectedFont.value = 'Inter'
  primaryColor.value = '#0284c7'
  secondaryColor.value = '#c026d3'
  borderRadius.value = 6
  baseSpacing.value = 4
  transitionDuration.value = 150
  shadowIntensity.value = 10
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex justify-end">
    <div class="fixed inset-0 bg-bg-overlay" @click="emit('close')"></div>
    <div class="relative w-80 bg-bg-primary shadow-xl h-full">
      <div class="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-bg-primary z-10">
        <h2 class="text-lg font-semibold">Theme Customizer</h2>
        <div class="flex items-center gap-2">
          <button 
            class="p-1.5 rounded-md hover:bg-bg-muted transition-colors text-sm"
            @click="resetToDefaults"
          >
            Reset
          </button>
          <button 
            class="p-1.5 rounded-md hover:bg-bg-muted transition-colors"
            @click="emit('close')"
          >
            <Icon icon="carbon:close" class="text-lg" />
          </button>
        </div>
      </div>
      
      <!-- Tabs -->
      <div class="flex border-b border-border">
        <button 
          v-for="tab in ['typography', 'colors', 'layout', 'effects']" 
          :key="tab"
          class="flex-1 py-2 text-sm font-medium transition-colors"
          :class="activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'"
          @click="activeTab = tab"
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
        </button>
      </div>
      
      <div class="p-4 overflow-y-auto" style="height: calc(100% - 105px)">
        <!-- Typography Tab -->
        <div v-if="activeTab === 'typography'" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Font Category</label>
            <select 
              v-model="selectedFontCategory"
              class="w-full p-2 border border-border rounded-md bg-bg-primary text-sm"
            >
              <option v-for="category in fontCategories" :key="category.id" :value="category.id">
                {{ category.label }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Font Family</label>
            <select 
              v-model="selectedFont"
              class="w-full p-2 border border-border rounded-md bg-bg-primary text-sm"
            >
              <option v-for="font in fontsForCategory" :key="font" :value="font">
                {{ font }}
              </option>
            </select>
          </div>
          
          <div class="p-3 border border-border rounded-md" :style="{ fontFamily: `'${selectedFont}', system-ui, sans-serif` }">
            <p class="text-sm mb-1">The quick brown fox jumps over the lazy dog.</p>
            <p class="text-lg font-bold">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz 0123456789</p>
          </div>
        </div>
        
        <!-- Colors Tab -->
        <div v-if="activeTab === 'colors'" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Primary Color</label>
            <div class="flex items-center gap-3">
              <input 
                v-model="primaryColor"
                type="color" 
                class="w-10 h-10 rounded-md overflow-hidden cursor-pointer"
              />
              <input 
                v-model="primaryColor"
                type="text" 
                class="flex-1 p-2 border border-border rounded-md bg-bg-primary text-sm"
              />
            </div>
            <div class="flex mt-2 rounded-md overflow-hidden">
              <div 
                v-for="shade in ['lightest', 'lighter', 'light', 'medium', 'default', 'dark', 'darker', 'darkest']" 
                :key="shade"
                class="h-6 flex-1 text-[0px]"
                :style="{ backgroundColor: `var(--color-primary-${shade})` }"
              >{{ shade }}</div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Secondary Color</label>
            <div class="flex items-center gap-3">
              <input 
                v-model="secondaryColor"
                type="color" 
                class="w-10 h-10 rounded-md overflow-hidden cursor-pointer"
              />
              <input 
                v-model="secondaryColor"
                type="text" 
                class="flex-1 p-2 border border-border rounded-md bg-bg-primary text-sm"
              />
            </div>
            <div class="flex mt-2 rounded-md overflow-hidden">
              <div 
                v-for="shade in ['lightest', 'lighter', 'light', 'medium', 'default', 'dark', 'darker', 'darkest']" 
                :key="shade"
                class="h-6 flex-1 text-[0px]"
                :style="{ backgroundColor: `var(--color-secondary-${shade})` }"
              >{{ shade }}</div>
            </div>
          </div>
          
          <div class="p-3 border border-border rounded-md space-y-3">
            <div class="p-2 bg-primary-lightest text-primary-darkest rounded-md text-sm">
              Primary Lightest
            </div>
            <div class="p-2 bg-primary text-text-inverted rounded-md text-sm">
              Primary Default
            </div>
            <div class="p-2 bg-secondary-lightest text-secondary-darkest rounded-md text-sm">
              Secondary Lightest
            </div>
            <div class="p-2 bg-secondary text-text-inverted rounded-md text-sm">
              Secondary Default
            </div>
          </div>
        </div>
        
        <!-- Layout Tab -->
        <div v-if="activeTab === 'layout'" class="space-y-6">
          <div>
            <div class="flex justify-between mb-1">
              <label class="text-sm font-medium">Border Radius</label>
              <span class="text-sm text-text-secondary">{{ borderRadius }}px</span>
            </div>
            <input 
              v-model="borderRadius"
              type="range" 
              min="0" 
              max="20" 
              step="1"
              class="w-full"
            />
            <div class="flex gap-4 mt-3">
              <div 
                class="w-16 h-16 bg-primary text-text-inverted flex items-center justify-center text-sm"
                :style="{ borderRadius: `${borderRadius}px` }"
              >
                {{ borderRadius }}px
              </div>
              <div 
                class="w-16 h-16 bg-secondary text-text-inverted flex items-center justify-center text-sm"
                :style="{ borderRadius: `${borderRadius}px` }"
              >
                {{ borderRadius }}px
              </div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between mb-1">
              <label class="text-sm font-medium">Base Spacing</label>
              <span class="text-sm text-text-secondary">{{ baseSpacing }}px</span>
            </div>
            <input 
              v-model="baseSpacing"
              type="range" 
              min="2" 
              max="8" 
              step="0.5"
              class="w-full"
            />
            <div class="flex gap-2 mt-3 items-end">
              <div 
                class="w-8 bg-primary flex items-center justify-center text-[0px]"
                :style="{ height: `${baseSpacing * 1}px` }"
              >1x</div>
              <div 
                class="w-8 bg-primary flex items-center justify-center text-[0px]"
                :style="{ height: `${baseSp