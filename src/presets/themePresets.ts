import { ThemePreset } from '../types/theme'

// Predefined presets
export const predefinedPresets: Record<string, ThemePreset> = {
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