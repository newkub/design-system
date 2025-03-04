<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'

// Define the theme state interface
interface ThemeState {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    card: string
    muted: string
    border: string
  }
  typography: {
    fontSans: string
    fontHeading: string
    fontSize: number
    lineHeight: number
  }
  spacing: {
    unit: number
    borderRadius: number
  }
  effects: {
    shadowIntensity: number
    transitionSpeed: number
  }
}

// Define preset interface
interface Preset {
  id: string
  name: string
  description: string
  theme: ThemeState
}

// Available font options
const fontOptions = {
  sans: ['Inter', 'Roboto', 'Open Sans', 'Nunito', 'Poppins', 'Lato', 'Source Sans Pro'],
  heading: ['Montserrat', 'Playfair Display', 'Merriweather']
}

// Default theme state
const defaultTheme: ThemeState = {
  colors: {
    primary: '#1a73e8',
    secondary: '#7b1fa2',
    accent: '#16a085',
    background: '#f6f8fa',
    card: '#ffffff',
    muted: '#f0f2f5',
    border: '#e1e5eb'
  },
  typography: {
    fontSans: 'Inter',
    fontHeading: 'Montserrat',
    fontSize: 16,
    lineHeight: 1.5
  },
  spacing: {
    unit: 4,
    borderRadius: 4
  },
  effects: {
    shadowIntensity: 10,
    transitionSpeed: 300
  }
}

// Predefined presets
const presets: Preset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and professional design with blue accent',
    theme: defaultTheme
  },
  {
    id: 'modern-purple',
    name: 'Modern Purple',
    description: 'Modern design with purple accents',
    theme: {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: '#6200ee',
        secondary: '#03dac6',
        accent: '#bb86fc',
        background: '#f5f5f5',
        card: '#ffffff',
        muted: '#f0f0f0',
        border: '#e0e0e0'
      },
      typography: {
        ...defaultTheme.typography,
        fontSans: 'Poppins',
        fontHeading: 'Poppins'
      }
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Dark theme with blue accents',
    theme: {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: '#60a5fa',
        secondary: '#a78bfa',
        accent: '#34d399',
        background: '#121212',
        card: '#1e1e1e',
        muted: '#282828',
        border: '#404040'
      }
    }
  }
]

// State
const isOpen = ref(false)
const activeTab = ref('colors')
const themeState = reactive<ThemeState>(JSON.parse(JSON.stringify(defaultTheme)))
const isDarkMode = ref(false)

// Tabs for the customizer
const tabs = [
  { id: 'colors', label: 'Colors', icon: 'i-mdi-palette' },
  { id: 'typography', label: 'Typography', icon: 'i-mdi-format-font' },
  { id: 'spacing', label: 'Spacing', icon: 'i-mdi-ruler' },
  { id: 'effects', label: 'Effects', icon: 'i-mdi-blur' },
  { id: 'presets', label: 'Presets', icon: 'i-mdi-bookmark-multiple' }
]

// Toggle the customizer
const toggleCustomizer = () => {
  isOpen.value = !isOpen.value
}

// Close the customizer
const closeCustomizer = () => {
  isOpen.value = false
}

// Set active tab
const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}

// Apply a preset
const applyPreset = (preset: Preset) => {
  Object.assign(themeState, JSON.parse(JSON.stringify(preset.theme)))
  applyTheme()
}

// Apply the current theme state to the document
const applyTheme = () => {
  // Apply colors
  document.documentElement.style.setProperty('--color-primary', themeState.colors.primary)
  document.documentElement.style.setProperty('--color-primary-light', adjustColor(themeState.colors.primary, 40))
  document.documentElement.style.setProperty('--color-primary-dark', adjustColor(themeState.colors.primary, -20))
  
  document.documentElement.style.setProperty('--color-secondary', themeState.colors.secondary)
  document.documentElement.style.setProperty('--color-secondary-light', adjustColor(themeState.colors.secondary, 40))
  document.documentElement.style.setProperty('--color-secondary-dark', adjustColor(themeState.colors.secondary, -20))
  
  document.documentElement.style.setProperty('--color-accent', themeState.colors.accent)
  document.documentElement.style.setProperty('--color-accent-light', adjustColor(themeState.colors.accent, 40))
  document.documentElement.style.setProperty('--color-accent-dark', adjustColor(themeState.colors.accent, -20))
  
  // Only apply background/card/muted colors if they match the current theme mode
  if ((isDarkMode.value && isColorDark(themeState.colors.background)) || 
      (!isDarkMode.value && !isColorDark(themeState.colors.background))) {
    document.documentElement.style.setProperty('--color-background', themeState.colors.background)
    document.documentElement.style.setProperty('--color-card', themeState.colors.card)
    document.documentElement.style.setProperty('--color-muted', themeState.colors.muted)
    document.documentElement.style.setProperty('--color-border', themeState.colors.border)
  }
  
  // Apply typography
  document.documentElement.style.setProperty('--font-sans', `'${themeState.typography.fontSans}', system-ui, sans-serif`)
  document.documentElement.style.setProperty('--font-heading', `'${themeState.typography.fontHeading}', system-ui, sans-serif`)
  document.documentElement.style.setProperty('--font-size-base', `${themeState.typography.fontSize}px`)
  document.documentElement.style.setProperty('--line-height', themeState.typography.lineHeight.toString())
  
  // Apply spacing
  document.documentElement.style.setProperty('--spacing-unit', `${themeState.spacing.unit}px`)
  document.documentElement.style.setProperty('--radius-md', `${themeState.spacing.borderRadius}px`)
  document.documentElement.style.setProperty('--radius-sm', `${themeState.spacing.borderRadius / 2}px`)
  document.documentElement.style.setProperty('--radius-lg', `${themeState.spacing.borderRadius * 2}px`)
  
  // Apply effects
  const shadowIntensity = themeState.effects.shadowIntensity / 100
  document.documentElement.style.setProperty('--shadow-sm', `0 1px 2px 0 rgba(0, 0, 0, ${shadowIntensity * 0.05})`)
  document.documentElement.style.setProperty('--shadow-md', `0 4px 6px -1px rgba(0, 0, 0, ${shadowIntensity * 0.1}), 0 2px 4px -1px rgba(0, 0, 0, ${shadowIntensity * 0.06})`)
  document.documentElement.style.setProperty('--shadow-lg', `0 10px 15px -3px rgba(0, 0, 0, ${shadowIntensity * 0.1}), 0 4px 6px -2px rgba(0, 0, 0, ${shadowIntensity * 0.05})`)
  document.documentElement.style.setProperty('--shadow-xl', `0 20px 25px -5px rgba(0, 0, 0, ${shadowIntensity * 0.1}), 0 10px 10px -5px rgba(0, 0, 0, ${shadowIntensity * 0.04})`)
  
  document.documentElement.style.setProperty('--duration-normal', `${themeState.effects.transitionSpeed}ms`)
  document.documentElement.style.setProperty('--duration-fast', `${Math.round(themeState.effects.transitionSpeed / 2)}ms`)
  document.documentElement.style.setProperty('--duration-slow', `${Math.round(themeState.effects.transitionSpeed * 1.5)}ms`)
  
  // Save to localStorage
  saveTheme()
}

// Helper function to adjust color lightness
const adjustColor = (hex: string, amount: number): string => {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)
  
  // Convert to HSL
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  let l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    
    h /= 6
  }
  
  // Adjust lightness
  l = Math.max(0, Math.min(1, l + amount / 100))
  
  // Convert back to RGB
  let r2 = 0, g2 = 0, b2 = 0
  
  if (s === 0) {
    r2 = g2 = b2 = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    
    r2 = hue2rgb(p, q, h + 1/3)
    g2 = hue2rgb(p, q, h)
    b2 = hue2rgb(p, q, h - 1/3)
  }
  
  // Convert to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`
}

// Check if a color is dark
const isColorDark = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  
  // Calculate perceived brightness (YIQ formula)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return yiq < 128
}

// Save theme to localStorage
const saveTheme = () => {
  localStorage.setItem('custom-theme', JSON.stringify(themeState))
}

// Load theme from localStorage
const loadTheme = () => {
  const savedTheme = localStorage.getItem('custom-theme')
  if (savedTheme) {
    try {
      const parsedTheme = JSON.parse(savedTheme)
      Object.assign(themeState, parsedTheme)
    } catch (e) {
      console.error('Failed to parse saved theme', e)
    }
  }
}

// Reset to default theme
const resetTheme = () => {
  Object.assign(themeState, JSON.parse(JSON.stringify(defaultTheme)))
  applyTheme()
}

// Check if dark mode is active
const checkDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
}

// Watch for dark mode changes
watch(isDarkMode, () => {
  applyTheme()
})

onMounted(() => {
  loadTheme()
  applyTheme()
  checkDarkMode()
  
  // Listen for dark mode changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        checkDarkMode()
      }
    })
  })
  
  observer.observe(document.documentElement, { attributes: true })
})

// Handle click outside to close
const handleClickOutside = (event: MouseEvent) => {
  const customizer = document.getElementById('theme-customizer')
  const customizerButton = document.getElementById('theme-customizer-button')
  
  if (customizer && !customizer.contains(event.target as Node) && 
      customizerButton && !customizerButton.contains(event.target as Node)) {
    closeCustomizer()
  }
}

// Add click outside listener when component is mounted
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

// Remove click outside listener when component is unmounted
onMounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div class="relative">
    <!-- Theme customizer button -->
    <button 
      id="theme-customizer-button"
      @click="toggleCustomizer" 
      class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors"
      :aria-label="isOpen ? 'Close theme customizer' : 'Open theme customizer'"
      :aria-expanded="isOpen"
      aria-controls="theme-customizer"
    >
      <div class="i-mdi-palette text-muted-foreground text-xl"></div>
    </button>
    
    <!-- Theme customizer widget -->
    <div 
      v-if="isOpen" 
      id="theme-customizer" 
      class="absolute right-0 top-12 w-80 bg-card border border-border rounded-md shadow-lg z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-border p-3">
        <h3 id="customizer-title" class="text-lg font-heading font-semibold">Theme Customizer</h3>
        <button 
          @click="closeCustomizer" 
          class="text-muted-foreground hover:text-foreground"
          aria-label="Close customizer"
        >
          <div class="i-mdi-close text-lg"></div>
        </button>
      </div>
      
      <!-- Tabs -->
      <div class="border-b border-border overflow-x-auto">
        <div class="flex">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            class="px-3 py-2 text-sm flex items-center justify-center whitespace-nowrap"
            :class="activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'"
            :aria-selected="activeTab === tab.id"
            :aria-controls="`tab-${tab.id}`"
          >
            <div :class="`${tab.icon} mr-1.5`"></div>
            {{ tab.label }}
          </button>
        </div>
      </div>
      
      <!-- Content area with scrolling -->
      <div class="max-h-[60vh] overflow-y-auto p-4">
        <!-- Colors tab -->
        <div v-if="activeTab === 'colors'" id="tab-colors" role="tabpanel" aria-labelledby="tab-colors">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Primary Color</label>
              <div class="flex items-center">
                <input 
                  type="color" 
                  v-model="themeState.colors.primary" 
                  @change="applyTheme"
                  class="w-10 h-10 rounded-md mr-2 border border-border"
                />
                <input 
                  type="text" 
                  v-model="themeState.colors.primary" 
                  @change="applyTheme"
                  class="flex-1 bg-muted border border-border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Secondary Color</label>
              <div class="flex items-center">
                <input 
                  type="color" 
                  v-model="themeState.colors.secondary" 
                  @change="applyTheme"
                  class="w-10 h-10 rounded-md mr-2 border border-border"
                />
                <input 
                  type="text" 
                  v-model="themeState.colors.secondary" 
                  @change="applyTheme"
                  class="flex-1 bg-muted border border-border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Accent Color</label>
              <div class="flex items-center">
                <input 
                  type="color" 
                  v-model="themeState.colors.accent" 
                  @change="applyTheme"
                  class="w-10 h-10 rounded-md mr-2 border border-border"
                />
                <input 
                  type="text" 
                  v-model="themeState.colors.accent" 
                  @change="applyTheme"
                  class="flex-1 bg-muted border border-border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Background Color</label>
              <div class="flex items-center">
                <input 
                  type="color" 
                  v-model="themeState.colors.background" 
                  @change="applyTheme"
                  class="w-10 h-10 rounded-md mr-2 border border-border"
                />
                <input 
                  type="text" 
                  v-model="themeState.colors.background" 
                  @change="applyTheme"
                  class="flex-1 bg-muted border border-border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Card Color</label>
              <div class="flex items-center">
                <input 
                  type="color" 
                  v-model="themeState.colors.card" 
                  @change="applyTheme"
                  class="w-10 h-10 rounded-md mr-2 border border-border"
                />
                <input 
                  type="text" 
                  v-model="themeState.colors.card" 
                  @change="applyTheme"
                  class="flex-1 bg-muted border border-border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Muted Color</label>
              <div class="flex items-center">
                <input 
                  type="color" 
                  v-model="themeState.colors.muted" 
                  @change="applyTheme"
                  class="w-10 h-10 rounded-md mr-2 border border-border"
                />
                <input 
                  type="text" 
                  v-model="themeState.colors.muted" 
                  @change="applyTheme"
                  class="flex-1 bg-muted border border-border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Border Color</label>
              <div class="flex items-center">
                <input 
                  type="color" 
                  v-model="themeState.colors.border" 
                  @change="applyTheme"
                  class="w-10 h-10 rounded-md mr-2 border border-border"
                />
                <input 
                  type="text" 
                  v-model="themeState.colors.border" 
                  @change="applyTheme"
                  class="flex-1 bg-muted border border-border rounded-md px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Typography tab -->
        <div v-if="activeTab === 'typography'" id="tab-typography" role="tabpanel" aria-labelledby="tab-typography">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Body Font</label>
              <select 
                v-model="themeState.typography.fontSans" 
                @change="applyTheme"
                class="w-full bg-muted border border-border rounded-md px-2 py-1.5"
              >
                <option v-for="font in fontOptions.sans" :key="font" :value="font">{{ font }}</option>
              </select>
              <p class="mt-1 text-sm text-muted-foreground">Sample: <span :style="`font-family: ${themeState.typography.fontSans}`">The quick brown fox jumps over the lazy dog.</span></p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Heading Font</label>
              <select 
                v-model="themeState.typography.fontHeading" 
                @change="applyTheme"
                class="w-full bg-muted border border-border rounded-md px-2 py-1.5"
              >
                <option v-for="font in fontOptions.heading" :key="font" :value="font">{{ font }}</option>
              </select>
              <p class="mt-1 text-sm text-muted-foreground">Sample: <span :style="`font-family: ${themeState.typography.fontHeading}; font-weight: bold;`">The quick brown fox jumps over the lazy dog.</span></p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Base Font Size: {{ themeState.typography.fontSize }}px</label>
              <input 
                type="range" 
                v-model.number="themeState.typography.fontSize" 
                @change="applyTheme"
                min="12" 
                max="20" 
                step="1"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-1">
                <span>12px</span>
                <span>16px</span>
                <span>20px</span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Line Height: {{ themeState.typography.lineHeight }}</label>
              <input 
                type="range" 
                v-model.number="themeState.typography.lineHeight" 
                @change="applyTheme"
                min="1.2" 
                max="2" 
                step="0.1"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1.2</span>
                <span>1.5</span>
                <span>2.0</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Spacing tab -->
        <div v-if="activeTab === 'spacing'" id="tab-spacing" role="tabpanel" aria-labelledby="tab-spacing">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Spacing Unit: {{ themeState.spacing.unit }}px</label>
              <input 
                type="range" 
                v-model.number="themeState.spacing.unit" 
                @change="applyTheme"
                min="2" 
                max="8" 
                step="1"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-1">
                <span>2px</span>
                <span>4px</span>
                <span>8px</span>
              </div>
              <div class="flex items-center mt-2 gap-2">
                <div class="h-8 bg-primary" :style="`width: ${themeState.spacing.unit}px`"></div>
                <div class="h-8 bg-primary" :style="`width: ${themeState.spacing.unit * 2}px`"></div>
                <div class="h-8 bg-primary" :style="`width: ${themeState.spacing.unit * 4}px`"></div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Border Radius: {{ themeState.spacing.borderRadius }}px</label>
              <input 
                type="range" 
                v-model.number="themeState.spacing.borderRadius" 
                @change="applyTheme"
                min="0" 
                max="12" 
                step="1"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0px</span>
                <span>6px</span>
                <span>12px</span>
              </div>
              <div class="flex items-center mt-2 gap-4">
                <div class="h-16 w-16 bg-primary" :style="`border-radius: ${themeState.spacing.borderRadius / 2}px`"></div>
                <div class="h-16 w-16 bg-primary" :style="`border-radius: ${themeState.spacing.borderRadius}px`"></div>
                <div class="h-16 w-16 bg-primary" :style="`border-radius: ${themeState.spacing.borderRadius * 2}px`"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Effects tab -->
        <div v-if="activeTab === 'effects'" id="tab-effects" role="tabpanel" aria-labelledby="tab-effects">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Shadow Intensity: {{ themeState.effects.shadowIntensity }}%</label>
              <input 
                type="range" 
                v-model.number="themeState.effects.shadowIntensity" 
                @change="applyTheme"
                min="0" 
                max="20" 
                step="1"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>10%</span>
                <span>20%</span>
              </div>
              <div class="flex items-center mt-2 gap-4">
                <div class="h-16 w-16 bg-card border border-border rounded-md" style="box-shadow: var(--shadow-sm)">SM</div>
                <div class="h-16 w-16 bg-card border border-border rounded-md" style="box-shadow: var(--shadow-md)">MD</div>
                <div class="h-16 w-16 bg-card border border-border rounded-md" style="box-shadow: var(--shadow-lg)">LG</div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Transition Speed: {{ themeState.effects.transitionSpeed }}ms</label>
              <input 
                type="range" 
                v-model.number="themeState.effects.transitionSpeed" 
                @change="applyTheme"
                min="100" 
                max="500" 
                step="50"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-muted-foreground mt-1">
                <span>100ms</span>
                <span>300ms</span>
                <span>500ms</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Presets tab -->
        <div v-if="activeTab === 'presets'" id="tab-presets" role="tabpanel" aria-labelledby="tab-presets">
          <div class="space-y-4">
            <div v-for="preset in presets" :key="preset.id" class="border border-border rounded-md overflow-hidden">
              <div class="p-3 flex justify-between items-center">
                <div>
                  <h4 class="font-medium">{{ preset.name }}</h4>
                  <p class="text-sm text-muted-foreground">{{ preset.description }}</p>
                </div>
                <button 
                  @click="applyPreset(preset)" 
                  class="px-