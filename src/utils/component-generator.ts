import fs from 'fs'
import path from 'path'

interface ComponentTemplate {
  name: string
  description: string
  props?: Record<string, string>
  events?: string[]
  slots?: string[]
}

const generateComponent = (template: ComponentTemplate) => {
  const { name, description, props = {}, events = [], slots = [] } = template
  
  // Generate component file
  const componentContent = `<script setup lang="ts">
/**
 * ${description}
 * @component ${name}
 */

${Object.entries(props).map(([propName, propType]) => `const props = defineProps<{
  /** ${propName} description */
  ${propName}: ${propType}
}>()
`).join('\n')}

${events.map(event => `const emit = defineEmits<{
  (e: '${event}'): void
}>()`).join('\n')}
</script>

<template>
  <div>
    <!-- Component content -->
    <slot></slot>
    ${slots.map(slot => `<slot name="${slot}"></slot>`).join('\n    ')}
  </div>
</template>

<style scoped>
/* Component styles */
</style>
`

  // Generate test file
  const testContent = `import { describe, it, expect } from 'vitest'
import { mount } from '@testing-library/vue'
import ${name} from './${name}.vue'

describe('${name}', () => {
  it('renders properly', () => {
    const wrapper = mount(${name})
    expect(wrapper.element).toBeTruthy()
  })

  ${Object.keys(props).map(prop => `
  it('handles ${prop} prop correctly', () => {
    const wrapper = mount(${name}, {
      props: {
        ${prop}: 'test'
      }
    })
    // Add assertions
  })`).join('\n')}

  ${events.map(event => `
  it('emits ${event} event', async () => {
    const wrapper = mount(${name})
    // Add event trigger and assertions
  })`).join('\n')}
})
`

  // Generate story file
  const storyContent = `import type { Meta, StoryObj } from '@storybook/vue3'
import ${name} from './${name}.vue'

const meta = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
  argTypes: {
    ${Object.entries(props).map(([propName, propType]) => `
    ${propName}: {
      control: '${propType.toLowerCase()}',
      description: '${propName} description'
    }`).join(',')}
  }
} satisfies Meta<typeof ${name}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ${Object.keys(props).map(prop => `${prop}: 'default'`).join(',\n    ')}
  }
}
`

  return {
    component: componentContent,
    test: testContent,
    story: storyContent
  }
}

export { generateComponent, type ComponentTemplate }

export { generateComponent }