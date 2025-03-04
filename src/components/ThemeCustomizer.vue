<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import Button from './Button.vue'

// Main state
const isOpen = ref(false)
const activePreset = ref('default')
const customPresets = ref<Record<string, ThemePreset>>({})
const newPresetName = ref('')
const showSavePresetModal = ref(false)
const showPublishModal = ref(false)
const publishDescription = ref('')
const activeTab = ref('presets')

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

// Glassmorphism settings
const glassOpacity = ref(0.7)
const glassBlur = ref(10)
const glassBorder = ref(1)

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
  glassOpacity?: number
  glassBlur?: number
  glassBorder?: number
  description?: string
  author?: string
  downloads?: number
  rating?: number
  tags?: string[]
  createdAt?: string
  updatedAt?: string
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
    gridColumns: 12,
    glassOpacity: 0.7,
    glassBlur: 10,
    glassBorder: 1,
    description: 'The default theme with a clean, modern look',
    author: 'System',
    downloads: 1245,
    rating: 4.5,
    tags: ['clean', 'modern', 'versatile'],
    createdAt: '2025-01-01'
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
    gridColumns: 12,
    glassOpacity: 0.5,
    glassBlur: 5,
    glassBorder: 1,
    description: 'A minimalist black and white theme with subtle blue accents',
    author: 'System',
    downloads: 982,
    rating: 4.7,
    tags: ['minimal', 'monochrome', 'clean'],
    createdAt: '2025-01-02'
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
    gridColumns: 12,
    glassOpacity: 0.8,
    glassBlur: 15,
    glassBorder: 2,
    description: 'A fun and playful theme with rounded corners and vibrant colors',
    author: 'System',
    downloads: 756,
    rating: 4.3,
    tags: ['playful', 'rounded', 'vibrant'],
    createdAt: '2025-01-03'
  },
  corporate: {
    name: 'Corporate',
    primaryColor: '#0f172a',
    secondaryColor: '#475569',
    accentColor: '#0ea5e9',
    borderRadius: 3,
    fontScale: 1,
    spacing: 4,
    shadowIntensity: 8,
    bodyFont: 'Source Sans Pro',
    headingFont: 'Montserrat',
    fontSize: 16,
    lineHeight: 1.5,
    animationSpeed: 250,
    animationEasing: 'ease',
    containerWidth: 1280,
    gridColumns: 12,
    glassOpacity: 0.6,
    glassBlur: 8,
    glassBorder: 1,
    description: 'A professional theme suitable for business applications',
    author: 'System',
    downloads: 1102,
    rating: 4.6,
    tags: ['business', 'professional', 'corporate'],
    createdAt: '2025-01-04'
  },
  nature: {
    name: 'Nature',
    primaryColor: '#16a34a',
    secondaryColor: '#65a30d',
    accentColor: '#0d9488',
    borderRadius: 6,
    fontScale: 1.02,
    spacing: 4,
    shadowIntensity: 10,
    bodyFont: 'Roboto',
    headingFont: 'Merriweather',
    fontSize: 16,
    lineHeight: 1.6,
    animationSpeed: 300,
    animationEasing: 'ease',
    containerWidth: 1280,
    gridColumns: 12,
    glassOpacity: 0.7,
    glassBlur: 10,
    glassBorder: 1,
    description: 'A refreshing green theme inspired by nature',
    author: 'System',
    downloads: 687,
    rating: 4.4,
    tags: ['nature', 'green', 'organic'],
    createdAt: '2025-01-05'
  },
  luxury: {
    name: 'Luxury',
    primaryColor: '#854d0e',
    secondaryColor: '#422006',
    accentColor: '#ca8a04',
    borderRadius: 4,
    fontScale: 1,
    spacing: 4,
    shadowIntensity: 12,
    bodyFont: 'Playfair Display',
    headingFont: 'Playfair Display',
    fontSize: 16,
    lineHeight: 1.6,
    animationSpeed: 350,
    animationEasing: 'ease-in-out',
    containerWidth: 1280,
    gridColumns: 12,
    glassOpacity: 0.75,
    glassBlur: 12,
    glassBorder: 1,
    description: 'An elegant gold and brown theme with a luxury feel',
    author: 'System',
    downloads: 542,
    rating: 4.8,
    tags: ['luxury', 'elegant', 'gold'],
    createdAt: '2025-01-06'
  },
  tech: {
    name: 'Tech',
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    accentColor: '#0ea5e9',
    borderRadius: 2,
    fontScale: 0.98,
    spacing: 4,
    shadowIntensity: 8,
    bodyFont: 'Inter',
    headingFont: 'Poppins',
    fontSize: 16,
    lineHeight: 1.5,
    animationSpeed: 250,
    animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    containerWidth: 1280,
    gridColumns: 12,
    glassOpacity: 0.65,
    glassBlur: 8,
    glassBorder: 1,
    description: 'A modern tech-inspired theme with blue and purple tones',
    author: 'System',
    downloads: 892,
    rating: 4.5,
    tags: ['tech', 'modern', 'digital'],
    createdAt: '2025-01-07'
  },
  retro: {
    name: 'Retro',
    primaryColor: '#f97316',
    secondaryColor: '#eab308',
    accentColor: '#ef4444',
    borderRadius: 0,
    fontScale: 1.05,
    spacing: 5,
    shadowIntensity: 15,
    bodyFont: 'Roboto',
    headingFont: 'Montserrat',
    fontSize: 16,
    lineHeight: 1.5,
    animationSpeed: 300,
    animationEasing: 'ease',
    containerWidth: 1200,
    gridColumns: 12,
    glassOpacity: 0.6,
    glassBlur: 5,
    glassBorder: 2,
    description: 'A nostalgic theme with retro colors and sharp edges',
    author: 'System',
    downloads: 478,
    rating: 4.2,
    tags: ['retro', 'vintage', 'nostalgic'],
    createdAt: '2025-01-08'
  },
  pastel: {
    name: 'Pastel',
    primaryColor: '#a78bfa',
    secondaryColor: '#f9a8d4',
    accentColor: '#93c5fd',
    borderRadius: 8,
    fontScale: 1.02,
    spacing: 4,
    shadowIntensity: 6,
    bodyFont: 'Nunito',
    headingFont: 'Poppins',
    fontSize: 16,
    lineHeight: 1.6,
    animationSpeed: 350,
    animationEasing: 'ease',
    containerWidth: 1280,
    gridColumns: 12,
    glassOpacity: 0.8,
    glassBlur: 15,
    glassBorder: 1,
    description: 'A soft theme with pastel colors and rounded corners',
    author: 'System',
    downloads: 623,
    rating: 4.6,
    tags: ['pastel', 'soft', 'gentle'],
    createdAt: '2025-01-09'
  },
  dark: {
    name: 'Dark Mode',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    borderRadius: 4,
    fontScale: 1,
    spacing: 4,
    shadowIntensity: 15,
    bodyFont: 'Inter',
    headingFont: 'Montserrat',
    fontSize: 16,
    lineHeight: 1.5,
    animationSpeed: 300,
    animationEasing: 'ease',
    containerWidth: 1280,
    gridColumns: 12,
    glassOpacity: 0.5,
    glassBlur: 10,
    glassBorder: 1,
    description: 'A dark theme optimized for low-light environments',
    author: 'System',
    downloads: 1356,
    rating: 4.9,
    tags: ['dark', 'night', 'low-light'],
    createdAt: '2025-01-10'
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

// Marketplace presets (combination of predefined and published user presets)
const marketplacePresets = ref<Record<string, ThemePreset>>(predefinedPresets)

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
  
  // Update glassmorphism
  document.documentElement.style.setProperty('--glass-opacity', `${glassOpacity.value}`)
  document.documentElement.style.setProperty('--glass-blur', `${glassBlur.value}px`)
  document.documentElement.style.setProperty('--glass-border', `${glassBorder.value}px`)
  
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
    glassOpacity: glassOpacity.value,
    glassBlur: glassBlur.value,
    glassBorder: glassBorder.value,
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
  let preset: ThemePreset | undefined
  
  if (presetKey.startsWith('custom-')) {
    preset = customPresets.value[presetKey.replace('custom-', '')]
  } else if (presetKey.startsWith('market-')) {
    preset = marketplacePresets.value[presetKey.replace('market-', '')]
  } else {
    preset = predefinedPresets[presetKey]
  }
  
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
    
    // Apply glassmorphism settings if available
    if (preset.glassOpacity !== undefined) glassOpacity.value = preset.glassOpacity
    if (preset.glassBlur !== undefined) glassBlur.value = preset.glassBlur
    if (preset.glassBorder !== undefined) glassBorder.value = preset.glassBorder
    
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
    gridColumns: gridColumns.value,
    glassOpacity: glassOpacity.value,
    glassBlur: glassBlur.value,
    glassBorder: glassBorder.value,
    author: 'You',
    createdAt: new Date().toISOString().split('T')[0]
  }
  
  activePreset.value = `custom-${presetName}`
  newPresetName.value = ''
  showSavePresetModal.value = false
  
  // Save to localStorage
  saveCurrentSettings()
}

// Publish a preset to the marketplace
const publishPreset = () => {
  if (!activePreset.value.startsWith('custom-')) return
  
  const presetName = activePreset.value.replace('custom-', '')
  const preset = customPresets.value[presetName]
  
  if (preset) {
    // Add to marketplace with additional metadata
    marketplacePresets.value[presetName] = {
      ...preset,
      description: publishDescription.value || `A custom theme by ${preset.author || 'Anonymous'}`,
      downloads: 0,
      rating: 5.0,
      tags: ['custom', 'community'],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    
    publishDescription.value = ''
    showPublishModal.value = false
    
    // Switch to marketplace tab
    activeTab.value = 'marketplace'
  }
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

// Download a preset from marketplace
const downloadPreset = (presetKey: string) => {
  const preset = marketplacePresets.value[presetKey]
  
  if (preset) {
    // Increment download count
    marketplacePresets.value[presetKey] = {
      ...preset,
      downloads: (preset.downloads || 0) + 1
    }
    
    // Apply the preset
    applyPreset(`market-${presetKey}`)
  }
}

// Rate a preset in marketplace
const ratePreset = (presetKey: string, rating: number) => {
  const preset = marketplacePresets.value[presetKey]
  
  if (preset) {
    // Update rating (in a real app, this would be an average)
    marketplacePresets.value[presetKey] = {
      ...preset,
      rating
    }
  }
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

// Filter marketplace presets by search term
const searchTerm = ref('')
const filteredMarketplacePresets = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  
  if (!term) return marketplacePresets.value
  
  const filtered: Record<string, ThemePreset> = {}
  
  Object.entries(marketplacePresets.value).forEach(([key, preset]) => {
    const nameMatch = preset.name.toLowerCase().includes(term)
    const descMatch = preset.description?.toLowerCase().includes(term)
    const authorMatch = preset.author?.toLowerCase().includes(term)
    const tagsMatch = preset.tags?.some(tag => tag.toLowerCase().includes(term))
    
    if (nameMatch || descMatch || authorMatch || tagsMatch) {
      filtered[key] = preset
    }
  })
  
  return filtered
})

// Sort marketplace presets
const sortOption = ref('popular')
const sortedMarketplacePresets = computed(() => {
  const presets = Object.entries(filteredMarketplacePresets.value)
  
  switch (sortOption.value) {
    case 'popular':
      return presets.sort((a, b) => (b[1].downloads || 0) - (a[1].downloads || 0))
    case 'rating':
      return presets.sort((a, b) => (b[1].rating || 0) - (a[1].rating || 0))
    case 'newest':
      return presets.sort((a, b) => {
        const dateA = a[1].createdAt || ''
        const dateB = b[1].createdAt || ''
        return dateB.localeCompare(dateA)
      })
    case 'name':
      return presets.sort((a, b) => a[1].name.localeCompare(b[1].name))
    default:
      return presets
  }
})

// Watch for changes and apply them
watch([
  primaryColor, secondaryColor, accentColor, borderRadius, 
  fontScale, spacing, shadowIntensity, bodyFont, headingFont,
  fontSize, lineHeight, animationSpeed, animationEasing,
  containerWidth, gridColumns, glassOpacity, glassBlur, glassBorder
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
        glassOpacity.value = settings.glassOpacity || glassOpacity.value
        glassBlur.value = settings.glassBlur || glassBlur.value
        glassBorder.value = settings.glassBorder || glassBorder.value
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
    <!-- Customizer toggle button with animation -->
    <button 
      @click="toggleCustomizer" 
      class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors palette-icon"
      aria-label="Customize theme"
    >
      <div class="i-mdi-palette text-primary text-xl"></div>
    </button>
    
    <!-- Fullscreen customizer with glassmorphism -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12"
    >
      <!-- Glassmorphism panel -->
      <div 
        class="w-full max-w-7xl h-[85vh] bg-card/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 ease-out flex flex-col"
        :class="isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
        :style="{
          '--tw-backdrop-blur': `blur(${glassBlur.value}px)`,
          backgroundColor: `rgba(var(--rgb-card), ${glassOpacity.value})`,
          borderWidth: `${glassBorder.value}px`
        }"
      >
        <!-- Header -->
        <div class="p-4 border-b border-border/50 flex justify-between items-center bg-card/30 backdrop-blur-sm">
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
              class="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted/50 transition-colors"
              aria-label="Close customizer"
            >
              <div class="i-mdi-close text-lg"></div>
            </button>
          </div>
        </div>
        
        <!-- Content -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Tabs sidebar -->
          <div class="w-48 lg:w-56 border-r border-border/50 bg-card/30 backdrop-blur-sm">
            <div class="p-4">
              <div class="space-y-1">
                <button 
                  @click="activeTab = 'presets'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'presets' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-palette-swatch text-lg"></div>
                  <span>My Presets</span>
                </button>
                <button 
                  @click="activeTab = 'marketplace'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'marketplace' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-store text-lg"></div>
                  <span>Marketplace</span>
                </button>
                <button 
                  @click="activeTab = 'colors'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'colors' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-palette text-lg"></div>
                  <span>Colors</span>
                </button>
                <button 
                  @click="activeTab = 'typography'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'typography' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-format-font text-lg"></div>
                  <span>Typography</span>
                </button>
                <button 
                  @click="activeTab = 'spacing'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'spacing' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-ruler text-lg"></div>
                  <span>Spacing & Borders</span>
                </button>
                <button 
                  @click="activeTab = 'effects'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'effects' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-blur text-lg"></div>
                  <span>Effects & Glass</span>
                </button>
                <button 
                  @click="activeTab = 'animation'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'animation' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-animation text-lg"></div>
                  <span>Animation</span>
                </button>
                <button 
                  @click="activeTab = 'layout'" 
                  class="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
                  :class="activeTab === 'layout' ? 'bg-primary text-white' : 'hover:bg-muted/50 text-foreground'"
                >
                  <div class="i-mdi-view-grid text-lg"></div>
                  <span>Layout</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Tab content -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- My Presets Tab -->
            <div v-if="activeTab === 'presets'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-heading font-semibold">My Presets</h2>
                <Button 
                  variant="primary" 
                  size="sm" 
                  @click="showSavePresetModal = true"
                >
                  <div class="i-mdi-plus mr-1"></div>
                  New Preset
                </Button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- System Presets -->
                <div 
                  v-for="(preset, key) in predefinedPresets" 
                  :key="key"
                  class="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all"
                >
                  <div class="absolute inset-0 bg-gradient-to-br opacity-10"
                    :style="{
                      backgroundImage: `linear-gradient(to bottom right, ${preset.primaryColor}, ${preset.secondaryColor})`
                    }"
                  ></div>
                  <div class="relative p-4">
                    <div class="flex justify-between items-start mb-3">
                      <h3 class="font-heading font-semibold text-lg">{{ preset.name }}</h3>
                      <span class="text-xs px-2 py-0.5 bg-muted/50 rounded-full">System</span>
                    </div>
                    
                    <div class="flex gap-2 mb-3">
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.primaryColor }"></div>
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.secondaryColor }"></div>
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.accentColor }"></div>
                    </div>
                    
                    <div class="text-xs text-muted-foreground mb-4">
                      {{ preset.description }}
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <div class="flex items-center text-xs text-muted-foreground">
                        <div class="i-mdi-download mr-1"></div>
                        {{ preset.downloads || 0 }}
                        <div class="i-mdi-star text-yellow-400 ml-3 mr-1"></div>
                        {{ preset.rating || 0 }}/5
                      </div>
                      
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        @click="applyPreset(key)"
                        :class="activePreset === key ? 'bg-primary-light' : ''"
                      >
                        <div class="i-mdi-check mr-1" v-if="activePreset === key"></div>
                        <span v-if="activePreset === key">Applied</span>
                        <span v-else>Apply</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <!-- Custom Presets -->
                <div 
                  v-for="(preset, key) in customPresets" 
                  :key="`custom-${key}`"
                  class="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all"
                >
                  <div class="absolute inset-0 bg-gradient-to-br opacity-10"
                    :style="{
                      backgroundImage: `linear-gradient(to bottom right, ${preset.primaryColor}, ${preset.secondaryColor})`
                    }"
                  ></div>
                  <div class="relative p-4">
                    <div class="flex justify-between items-start mb-3">
                      <h3 class="font-heading font-semibold text-lg">{{ preset.name }}</h3>
                      <span class="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Custom</span>
                    </div>
                    
                    <div class="flex gap-2 mb-3">
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.primaryColor }"></div>
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.secondaryColor }"></div>
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.accentColor }"></div>
                    </div>
                    
                    <div class="text-xs text-muted-foreground mb-4">
                      Created by {{ preset.author || 'You' }} on {{ preset.createdAt || 'Unknown date' }}
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        @click="showPublishModal = true; activePreset = `custom-${key}`"
                        v-if="!preset.updatedAt"
                      >
                        <div class="i-mdi-publish mr-1"></div>
                        Publish
                      </Button>
                      
                      <span v-else class="text-xs text-muted-foreground">
                        <div class="i-mdi-check-circle inline-block mr-1"></div>
                        Published
                      </span>
                      
                      <div class="flex gap-2">
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          @click="deleteCustomPreset(key)"
                        >
                          <div class="i-mdi-delete-outline"></div>
                        </Button>
                        
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          @click="applyPreset(`custom-${key}`)"
                          :class="activePreset === `custom-${key}` ? 'bg-primary-light' : ''"
                        >
                          <div class="i-mdi-check mr-1" v-if="activePreset === `custom-${key}`"></div>
                          <span v-if="activePreset === `custom-${key}`">Applied</span>
                          <span v-else>Apply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Marketplace Tab -->
            <div v-if="activeTab === 'marketplace'" class="space-y-6">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 class="text-xl font-heading font-semibold">Theme Marketplace</h2>
                
                <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <!-- Search -->
                  <div class="relative flex-1">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <div class="i-mdi-magnify text-muted-foreground"></div>
                    </div>
                    <input 
                      type="text" 
                      v-model="searchTerm"
                      placeholder="Search themes..." 
                      class="w-full pl-10 pr-4 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                    />
                  </div>
                  
                  <!-- Sort -->
                  <select 
                    v-model="sortOption"
                    class="px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
              
              <!-- Results count -->
              <div class="text-sm text-muted-foreground">
                Showing {{ Object.keys(filteredMarketplacePresets).length }} themes
              </div>
              
              <!-- Marketplace grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                  v-for="[key, preset] in sortedMarketplacePresets" 
                  :key="`market-${key}`"
                  class="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all"
                >
                  <div class="absolute inset-0 bg-gradient-to-br opacity-10"
                    :style="{
                      backgroundImage: `linear-gradient(to bottom right, ${preset.primaryColor}, ${preset.secondaryColor})`
                    }"
                  ></div>
                  <div class="relative p-4">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="font-heading font-semibold text-lg">{{ preset.name }}</h3>
                      <span 
                        class="text-xs px-2 py-0.5 rounded-full"
                        :class="preset.author === 'System' ? 'bg-muted/50' : 'bg-primary/10 text-primary'"
                      >
                        {{ preset.author === 'System' ? 'Official' : 'Community' }}
                      </span>
                    </div>
                    
                    <div class="flex gap-2 mb-3">
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.primaryColor }"></div>
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.secondaryColor }"></div>
                      <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: preset.accentColor }"></div>
                    </div>
                    
                    <div class="text-xs text-muted-foreground mb-2">
                      {{ preset.description }}
                    </div>
                    
                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1 mb-3">
                      <span 
                        v-for="tag in preset.tags" 
                        :key="tag"
                        class="text-xs px-2 py-0.5 bg-muted/30 rounded-full"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <div class="flex items-center text-xs text-muted-foreground">
                        <div class="i-mdi-download mr-1"></div>
                        {{ preset.downloads || 0 }}
                        <div class="i-mdi-star text-yellow-400 ml-3 mr-1"></div>
                        {{ preset.rating || 0 }}/5
                      </div>
                      
                      <Button 
                        variant="primary" 
                        size="sm" 
                        @click="downloadPreset(key); applyPreset(`market-${key}`)"
                      >
                        <div class="i-mdi-download mr-1"></div>
                        Use Theme
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Empty state -->
              <div 
                v-if="Object.keys(filteredMarketplacePresets).length === 0"
                class="flex flex-col items-center justify-center py-12 text-center"
              >
                <div class="i-mdi-magnify text-6xl text-muted-foreground mb-4"></div>
                <h3 class="text-xl font-heading font-semibold mb-2">No themes found</h3>
                <p class="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button 
                  variant="outline-primary" 
                  @click="searchTerm = ''; sortOption = 'popular'"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            
            <!-- Colors Tab -->
            <div v-if="activeTab === 'colors'" class="space-y-6">
              <h2 class="text-xl font-heading font-semibold">Colors</h2>
              
              <div class="space-y-6">
                <!-- Primary Color -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Primary Color</label>
                  <div class="flex items-center gap-3">
                    <input 
                      type="color" 
                      v-model="primaryColor" 
                      class="color-picker w-12 h-12"
                    />
                    <input 
                      type="text" 
                      v-model="primaryColor" 
                      class="flex-1 px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                    />
                  </div>
                  <div class="flex gap-2">
                    <div class="h-8 flex-1 rounded-md bg-primary-light"></div>
                    <div class="h-8 flex-1 rounded-md bg-primary"></div>
                    <div class="h-8 flex-1 rounded-md bg-primary-dark"></div>
                  </div>
                </div>
                
                <!-- Secondary Color -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Secondary Color</label>
                  <div class="flex items-center gap-3">
                    <input 
                      type="color" 
                      v-model="secondaryColor" 
                      class="color-picker w-12 h-12"
                    />
                    <input 
                      type="text" 
                      v-model="secondaryColor" 
                      class="flex-1 px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                    />
                  </div>
                  <div class="flex gap-2">
                    <div class="h-8 flex-1 rounded-md bg-secondary-light"></div>
                    <div class="h-8 flex-1 rounded-md bg-secondary"></div>
                    <div class="h-8 flex-1 rounded-md bg-secondary-dark"></div>
                  </div>
                </div>
                
                <!-- Accent Color -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Accent Color</label>
                  <div class="flex items-center gap-3">
                    <input 
                      type="color" 
                      v-model="accentColor" 
                      class="color-picker w-12 h-12"
                    />
                    <input 
                      type="text" 
                      v-model="accentColor" 
                      class="flex-1 px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                    />
                  </div>
                  <div class="flex gap-2">
                    <div class="h-8 flex-1 rounded-md" :style="{ backgroundColor: accentColor + '33' }"></div>
                    <div class="h-8 flex-1 rounded-md" :style="{ backgroundColor: accentColor }"></div>
                    <div class="h-8 flex-1 rounded-md" :style="{ backgroundColor: accentColor + 'dd' }"></div>
                  </div>
                </div>
                
                <!-- Color Preview -->
                <div class="p-4 border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm">
                  <h3 class="text-sm font-medium mb-3">Preview</h3>
                  <div class="grid grid-cols-3 gap-2">
                    <Button variant="primary" size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                    <Button variant="outline-primary" size="sm">Outline</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Typography Tab -->
            <div v-if="activeTab === 'typography'" class="space-y-6">
              <h2 class="text-xl font-heading font-semibold">Typography</h2>
              
              <div class="space-y-6">
                <!-- Body Font -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Body Font</label>
                  <select 
                    v-model="bodyFont"
                    class="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                  >
                    <option v-for="font in fontOptions" :key="font" :value="font">{{ font }}</option>
                  </select>
                  <p class="p-3 border border-border/50 rounded-md bg-card/50 backdrop-blur-sm" :style="{ fontFamily: bodyFont }">
                    This is body text using {{ bodyFont }} font. The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
                
                <!-- Heading Font -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Heading Font</label>
                  <select 
                    v-model="headingFont"
                    class="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                  >
                    <option v-for="font in fontOptions" :key="font" :value="font">{{ font }}</option>
                  </select>
                  <h3 class="p-3 border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-xl font-bold" :style="{ fontFamily: headingFont }">
                    This is a heading using {{ headingFont }} font.
                  </h3>
                </div>
                
                <!-- Base Font Size -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Base Font Size ({{ fontSize }}px)</label>
                  <input 
                    type="range" 
                    v-model="fontSize" 
                    min="12" 
                    max="24" 
                    step="1" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>12px</span>
                    <span>24px</span>
                  </div>
                </div>
                
                <!-- Line Height -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Line Height ({{ lineHeight }})</label>
                  <input 
                    type="range" 
                    v-model="lineHeight" 
                    min="1" 
                    max="2" 
                    step="0.1" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>1.0</span>
                    <span>2.0</span>
                  </div>
                </div>
                
                <!-- Font Scale -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Font Scale ({{ fontScale }})</label>
                  <input 
                    type="range" 
                    v-model="fontScale" 
                    min="0.8" 
                    max="1.2" 
                    step="0.05" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>0.8</span>
                    <span>1.2</span>
                  </div>
                </div>
                
                <!-- Typography Preview -->
                <div class="p-4 border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm space-y-4">
                  <h3 class="text-sm font-medium mb-2">Preview</h3>
                  <h1 class="font-heading text-3xl font-bold">Heading 1</h1>
                  <h2 class="font-heading text-2xl font-bold">Heading 2</h2>
                  <h3 class="font-heading text-xl font-semibold">Heading 3</h3>
                  <p>This is a paragraph of text that demonstrates the body font, size, and line height settings. The quick brown fox jumps over the lazy dog.</p>
                </div>
              </div>
            </div>
            
            <!-- Spacing & Borders Tab -->
            <div v-if="activeTab === 'spacing'" class="space-y-6">
              <h2 class="text-xl font-heading font-semibold">Spacing & Borders</h2>
              
              <div class="space-y-6">
                <!-- Border Radius -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Border Radius ({{ borderRadius }}px)</label>
                  <input 
                    type="range" 
                    v-model="borderRadius" 
                    min="0" 
                    max="16" 
                    step="1" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>0px (Sharp)</span>
                    <span>16px (Rounded)</span>
                  </div>
                  <div class="flex gap-4 mt-2">
                    <div class="w-16 h-16 bg-primary" :style="{ borderRadius: borderRadius * 0.5 + 'px' }"></div>
                    <div class="w-16 h-16 bg-primary" :style="{ borderRadius: borderRadius + 'px' }"></div>
                    <div class="w-16 h-16 bg-primary" :style="{ borderRadius: borderRadius * 2 + 'px' }"></div>
                  </div>
                </div>
                
                <!-- Base Spacing -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Base Spacing Unit ({{ spacing }}px)</label>
                  <input 
                    type="range" 
                    v-model="spacing" 
                    min="2" 
                    max="8" 
                    step="1" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>2px (Compact)</span>
                    <span>8px (Spacious)</span>
                  </div>
                  <div class="flex items-end gap-1 mt-2">
                    <div class="h-8 bg-primary rounded-sm" :style="{ width: spacing * 0.5 + 'px' }"></div>
                    <div class="h-12 bg-primary rounded-sm" :style="{ width: spacing + 'px' }"></div>
                    <div class="h-16 bg-primary rounded-sm" :style="{ width: spacing * 2 + 'px' }"></div>
                    <div class="h-20 bg-primary rounded-sm" :style="{ width: spacing * 4 + 'px' }"></div>
                  </div>
                </div>
                
                <!-- Spacing Preview -->
                <div class="p-4 border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm">
                  <h3 class="text-sm font-medium mb-3">Preview</h3>
                  <div class="flex flex-col gap-2">
                    <Button variant="primary" class="w-full">Button with Current Spacing</Button>
                    <div class="card">
                      <h4 class="text-lg font-heading font-semibold mb-2">Card with Current Radius</h4>
                      <p class="text-sm">This card demonstrates the current border radius and spacing settings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Effects & Glass Tab -->
            <div v-if="activeTab === 'effects'" class="space-y-6">
              <h2 class="text-xl font-heading font-semibold">Effects & Glass</h2>
              
              <div class="space-y-6">
                <!-- Shadow Intensity -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Shadow Intensity ({{ shadowIntensity }})</label>
                  <input 
                    type="range" 
                    v-model="shadowIntensity" 
                    min="0" 
                    max="20" 
                    step="1" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>None</span>
                    <span>Heavy</span>
                  </div>
                  <div class="flex gap-4 mt-2">
                    <div class="w-16 h-16 bg-card border border-border rounded-md" :style="{ boxShadow: `0 1px ${Math.round(2 * shadowIntensity/10)}px 0 rgba(0, 0, 0, ${0.05 * shadowIntensity/10})` }"></div>
                    <div class="w-16 h-16 bg-card border border-border rounded-md" :style="{ boxShadow: `0 4px ${Math.round(6 * shadowIntensity/10)}px -1px rgba(0, 0, 0, ${0.1 * shadowIntensity/10}), 0 2px ${Math.round(4 * shadowIntensity/10)}px -1px rgba(0, 0, 0, ${0.06 * shadowIntensity/10})` }"></div>
                    <div class="w-16 h-16 bg-card border border-border rounded-md" :style="{ boxShadow: `0 10px ${Math.round(15 * shadowIntensity/10)}px -3px rgba(0, 0, 0, ${0.1 * shadowIntensity/10}), 0 4px ${Math.round(6 * shadowIntensity/10)}px -2px rgba(0, 0, 0, ${0.05 * shadowIntensity/10})` }"></div>
                  </div>
                </div>
                
                <!-- Glass Opacity -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Glass Opacity ({{ glassOpacity }})</label>
                  <input 
                    type="range" 
                    v-model="glassOpacity" 
                    min="0.1" 
                    max="1" 
                    step="0.05" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>Transparent</span>
                    <span>Solid</span>
                  </div>
                  <div class="flex gap-4 mt-2">
                    <div 
                      v-for="opacity in [0.3, 0.6, 0.9]" 
                      :key="opacity"
                      class="w-16 h-16 border border-white/20 rounded-md backdrop-blur-md"
                      :style="{ backgroundColor: `rgba(var(--rgb-card), ${opacity})` }"
                    ></div>
                  </div>
                </div>
                
                <!-- Glass Blur -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Glass Blur ({{ glassBlur }}px)</label>
                  <input 
                    type="range" 
                    v-model="glassBlur" 
                    min="0" 
                    max="20" 
                    step="1" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>No Blur</span>
                    <span>Maximum Blur</span>
                  </div>
                  <div class="flex gap-4 mt-2">
                    <div 
                      v-for="blur in [2, 8, 16]" 
                      :key="blur"
                      class="w-16 h-16 bg-card/70 border border-white/20 rounded-md"
                      :style="{ backdropFilter: `blur(${blur}px)` }"
                    ></div>
                  </div>
                </div>
                
                <!-- Glass Border -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Glass Border ({{ glassBorder }}px)</label>
                  <input 
                    type="range" 
                    v-model="glassBorder" 
                    min="0" 
                    max="3" 
                    step="0.5" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>No Border</span>
                    <span>Thick Border</span>
                  </div>
                  <div class="flex gap-4 mt-2">
                    <div 
                      v-for="border in [0, 1, 2]" 
                      :key="border"
                      class="w-16 h-16 bg-card/70 backdrop-blur-md rounded-md"
                      :style="{ borderWidth: `${border}px`, borderColor: 'rgba(255, 255, 255, 0.2)' }"
                    ></div>
                  </div>
                </div>
                
                <!-- Glass Preview -->
                <div class="p-4 border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm">
                  <h3 class="text-sm font-medium mb-3">Preview</h3>
                  <div 
                    class="p-4 rounded-lg"
                    :style="{
                      backgroundColor: `rgba(var(--rgb-card), ${glassOpacity})`,
                      backdropFilter: `blur(${glassBlur}px)`,
                      borderWidth: `${glassBorder}px`,
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      boxShadow: `0 10px ${Math.round(15 * shadowIntensity/10)}px -3px rgba(0, 0, 0, ${0.1 * shadowIntensity/10})`
                    }"
                  >
                    <h4 class="text-lg font-heading font-semibold mb-2">Glassmorphism Card</h4>
                    <p class="text-sm">This card demonstrates the current glass effect settings with your chosen opacity, blur, and border.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Animation Tab -->
            <div v-if="activeTab === 'animation'" class="space-y-6">
              <h2 class="text-xl font-heading font-semibold">Animation</h2>
              
              <div class="space-y-6">
                <!-- Animation Speed -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Animation Speed ({{ animationSpeed }}ms)</label>
                  <input 
                    type="range" 
                    v-model="animationSpeed" 
                    min="100" 
                    max="500" 
                    step="50" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>Fast (100ms)</span>
                    <span>Slow (500ms)</span>
                  </div>
                </div>
                
                <!-- Animation Easing -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Animation Easing</label>
                  <select 
                    v-model="animationEasing"
                    class="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
                  >
                    <option v-for="easing in easingOptions" :key="easing" :value="easing">{{ easing }}</option>
                  </select>
                </div>
                
                <!-- Animation Preview -->
                <div class="p-4 border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm">
                  <h3 class="text-sm font-medium mb-3">Preview</h3>
                  <div class="flex flex-wrap gap-4">
                    <div class="animation-demo">
                      <div 
                        class="w-16 h-16 bg-primary rounded-md hover:translate-y-[-8px]"
                        :style="{ 
                          transition: `transform ${animationSpeed}ms ${animationEasing}` 
                        }"
                      ></div>
                      <span class="text-xs text-center block mt-2">Hover (Transform)</span>
                    </div>
                    
                    <div class="animation-demo">
                      <div 
                        class="w-16 h-16 bg-primary rounded-md hover:bg-primary-dark"
                        :style="{ 
                          transition: `background-color ${animationSpeed}ms ${animationEasing}` 
                        }"
                      ></div>
                      <span class="text-xs text-center block mt-2">Hover (Color)</span>
                    </div>
                    
                    <div class="animation-demo">
                      <div 
                        class="w-16 h-16 bg-primary rounded-md hover:scale-110"
                        :style="{ 
                          transition: `transform ${animationSpeed}ms ${animationEasing}` 
                        }"
                      ></div>
                      <span class="text-xs text-center block mt-2">Hover (Scale)</span>
                    </div>
                    
                    <div class="animation-demo">
                      <div 
                        class="w-16 h-16 bg-primary rounded-md hover:rotate-45"
                        :style="{ 
                          transition: `transform ${animationSpeed}ms ${animationEasing}` 
                        }"
                      ></div>
                      <span class="text-xs text-center block mt-2">Hover (Rotate)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Layout Tab -->
            <div v-if="activeTab === 'layout'" class="space-y-6">
              <h2 class="text-xl font-heading font-semibold">Layout</h2>
              
              <div class="space-y-6">
                <!-- Container Width -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Container Width ({{ containerWidth }}px)</label>
                  <input 
                    type="range" 
                    v-model="containerWidth" 
                    min="800" 
                    max="1600" 
                    step="40" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>Narrow (800px)</span>
                    <span>Wide (1600px)</span>
                  </div>
                  <div class="relative h-8 bg-muted/30 rounded-md overflow-hidden">
                    <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 bg-primary/20 border-l border-r border-primary/30"
                      :style="{ width: `${Math.min(100, containerWidth / 16)}%` }"
                    ></div>
                  </div>
                </div>
                
                <!-- Grid Columns -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Grid Columns ({{ gridColumns }})</label>
                  <input 
                    type="range" 
                    v-model="gridColumns" 
                    min="4" 
                    max="16" 
                    step="1" 
                    class="w-full"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>4 Columns</span>
                    <span>16 Columns</span>
                  </div>
                  <div class="flex gap-0.5 mt-2">
                    <div 
                      v-for="i in gridColumns" 
                      :key="i" 
                      class="h-8 bg-primary opacity-80 first:rounded-l-md last:rounded-r-md" 
                      :style="{ width: `${100/gridColumns}%` }"
                    ></div>
                  </div>
                </div>
                
                <!-- Layout Preview -->
                <div class="p-4 border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm">
                  <h3 class="text-sm font-medium mb-3">Preview</h3>
                  <div class="grid gap-2" :style="{ gridTemplateColumns: `repeat(${Math.min(6, gridColumns)}, 1fr)` }">
                    <div 
                      v-for="i in Math.min(6, gridColumns)" 
                      :key="i"
                      class="bg-primary p-2 rounded-md text-white text-center text-xs"
                    >
                      Col {{ i }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Save Preset Modal -->
    <div 
      v-if="showSavePresetModal" 
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
      @click.self="showSavePresetModal = false"
    >
      <div class="bg-card/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 class="text-xl font-heading font-semibold mb-4">Save as Preset</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Preset Name</label>
          <input 
            type="text" 
            v-model="newPresetName" 
            placeholder="My Custom Theme"
            class="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground"
            @keyup.enter="saveAsNewPreset"
          />
        </div>
        <div class="flex justify-end gap-3">
          <Button 
            variant="outline-primary" 
            @click="showSavePresetModal = false"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            @click="saveAsNewPreset"
            :disabled="!newPresetName.trim()"
          >
            Save Preset
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Publish to Marketplace Modal -->
    <div 
      v-if="showPublishModal" 
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
      @click.self="showPublishModal = false"
    >
      <div class="bg-card/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 class="text-xl font-heading font-semibold mb-4">Publish to Marketplace</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Description</label>
          <textarea 
            v-model="publishDescription" 
            placeholder="Describe your theme..."
            class="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-card/50 backdrop-blur-sm text-foreground h-24 resize-none"
          ></textarea>
        </div>
        <div class="flex justify-end gap-3">
          <Button 
            variant="outline-primary" 
            @click="showPublishModal = false"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            @click="publishPreset"
            :disabled="!publishDescription.trim()"
          >
            Publish
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
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: var(--color-muted);
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  border: none;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  border: none;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--color-ring);
}

input[type="range"]:focus::-moz-range-thumb {
  box-shadow: 0 0 0 3px var(--color-ring);
}

/* Square color picker styling */
.color-picker {
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

/* Palette icon animation */
.palette-icon {
  position: relative;
  overflow: hidden;
}

.palette-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 1%, var(--color-primary) 1%) center/15000%;
  opacity: 0;
  transition: background 0.5s, opacity 0.5s;
}

.palette-icon:hover::after {
  opacity: 0.1;
}

.palette-icon:active::after {
  background-size: 100%;
  opacity: 0.2;
  transition: 0s;
}

.palette-icon .i-mdi-palette {
  transition: transform 0.3s ease;
}

.palette-icon:hover .i-mdi-palette {
  transform: rotate(15deg) scale(1.1);
}

/* Animation demo hover effects */
.animation-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>