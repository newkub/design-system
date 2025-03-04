// Interface for theme presets
export interface ThemePreset {
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