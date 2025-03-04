import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetTypography, presetWebFonts, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetTypography(),
        presetIcons(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            sans: [
              'Inter:100,200,300,400,500,600,700,800,900',
              'Roboto:100,300,400,500,700,900',
              'Open Sans:300,400,500,600,700,800',
              'Montserrat:100,200,300,400,500,600,700,800,900',
              'Lato:100,300,400,700,900',
              'Poppins:100,200,300,400,500,600,700,800,900',
              'Raleway:100,200,300,400,500,600,700,800,900',
              'Nunito:200,300,400,500,600,700,800,900',
              'Nunito Sans:200,300,400,600,700,800,900',
              'Merriweather:300,400,700,900',
              'Rubik:300,400,500,600,700,800,900',
              'Work Sans:100,200,300,400,500,600,700,800,900',
              'Mulish:200,300,400,500,600,700,800,900',
              'Source Sans Pro:200,300,400,600,700,900'
            ],
            mono: [
              'Fira Code:300,400,500,600,700',
              'Fira Mono:400,500,700',
              'JetBrains Mono:100,200,300,400,500,600,700,800',
              'Source Code Pro:200,300,400,500,600,700,900',
              'Ubuntu Mono:400,700',
              'Roboto Mono:100,200,300,400,500,600,700',
              'IBM Plex Mono:100,200,300,400,500,600,700'
            ],
            serif: [
              'Merriweather:300,400,700,900',
              'Playfair Display:400,500,600,700,800,900',
              'Lora:400,500,600,700',
              'Crimson Pro:200,300,400,500,600,700,800,900',
              'Libre Baskerville:400,700'
            ],
            display: [
              'Montserrat:100,200,300,400,500,600,700,800,900',
              'Oswald:200,300,400,500,600,700',
              'Bebas Neue:400',
              'Anton:400'
            ]
          },
        }),
      ],
      theme: {
        colors: {
          primary: {
            DEFAULT: 'var(--color-primary)',
            50: 'var(--color-primary-50)',
            100: 'var(--color-primary-100)',
            200: 'var(--color-primary-200)',
            300: 'var(--color-primary-300)',
            400: 'var(--color-primary-400)',
            500: 'var(--color-primary-500)',
            600: 'var(--color-primary-600)',
            700: 'var(--color-primary-700)',
            800: 'var(--color-primary-800)',
            900: 'var(--color-primary-900)',
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            50: 'var(--color-secondary-50)',
            100: 'var(--color-secondary-100)',
            200: 'var(--color-secondary-200)',
            300: 'var(--color-secondary-300)',
            400: 'var(--color-secondary-400)',
            500: 'var(--color-secondary-500)',
            600: 'var(--color-secondary-600)',
            700: 'var(--color-secondary-700)',
            800: 'var(--color-secondary-800)',
            900: 'var(--color-secondary-900)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            muted: 'var(--color-text-muted)',
            inverted: 'var(--color-text-inverted)',
          },
          bg: {
            primary: 'var(--color-bg-primary)',
            secondary: 'var(--color-bg-secondary)',
            muted: 'var(--color-bg-muted)',
          },
          border: 'var(--color-border)',
        },
      },
    }),
  ],
})