import { defineConfig, presetUno, presetTypography, presetWebFonts, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'Fira Code:400,500,600'
      }
    })
  ],
  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      }
    }
  },
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md transition-colors duration-200',
    'btn-primary': 'bg-primary-500 text-white hover:bg-primary-600',
    'btn-outline': 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50',
  }
})