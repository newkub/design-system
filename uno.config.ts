import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
      collections: {
        'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        'logos': () => import('@iconify-json/logos/icons.json').then(i => i.default),
      }
    }),
  ],
  shortcuts: {
    // Add any shortcuts you need here
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-primary': 'bg-blue-500 text-white hover:bg-blue-700',
  },
  theme: {
    colors: {
      // You can extend the color palette here
    }
  }
})