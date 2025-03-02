import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
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