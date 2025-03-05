import { ThemePreset } from '../types/theme'

interface ColorPalette {
  light: string
  DEFAULT: string
  dark: string
}

const generateColorPalette = (baseColor: string): ColorPalette => {
  // Convert hex to HSL and generate variations
  const hexToHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    
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
      
      h /= 6
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 }
  }
  
  const hsl = hexToHSL(baseColor)
  
  return {
    light: `hsl(${hsl.h}, ${hsl.s}%, 97%)`,
    DEFAULT: baseColor,
    dark: `hsl(${hsl.h}, ${hsl.s}%, 38%)`
  }
}

const generateTheme = (preset: ThemePreset) => {
  const colors = {
    primary: generateColorPalette(preset.primaryColor),
    secondary: generateColorPalette(preset.secondaryColor),
    accent: generateColorPalette(preset.accentColor)
  }
  
  const spacing = {
    unit: `${preset.spacing}px`,
    sm: `${preset.spacing * 0.5}px`,
    md: `${preset.spacing}px`,
    lg: `${preset.spacing * 2}px`
  }
  
  const typography = {
    fontFamily: {
      sans: `'${preset.bodyFont}', system-ui, sans-serif`,
      heading: `'${preset.headingFont}', system-ui, sans-serif`
    },
    fontSize: `${preset.fontSize}px`,
    lineHeight: preset.lineHeight.toString(),
    scale: preset.fontScale.toString()
  }
  
  const radius = {
    sm: `${preset.borderRadius * 0.5}px`,
    md: `${preset.borderRadius}px`,
    lg: `${preset.borderRadius * 2}px`
  }
  
  return {
    colors,
    spacing,
    typography,
    radius
  }
}

export { generateTheme, generateColorPalette }