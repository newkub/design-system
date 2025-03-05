import type { Preview } from '@storybook/vue3'
import '../src/style.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview