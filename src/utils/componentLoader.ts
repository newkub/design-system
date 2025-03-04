/**
 * Component Loader Utility
 * 
 * This utility helps with dynamically loading and analyzing Vue components.
 * In a real application with server-side capabilities, this would scan the
 * components directory and extract information about each component.
 */

import { Component } from 'vue'

// Interface for component metadata
export interface ComponentMeta {
  name: string
  component: Component
  code: string
  description: string
  props?: Record<string, any>
  events?: string[]
  slots?: string[]
}

// Function to get component name from filename
export const getComponentNameFromPath = (path: string): string => {
  const parts = path.split('/')
  const filename = parts[parts.length - 1]
  return filename.replace('.vue', '')
}

// Function to generate description based on component name
export const generateDescription = (componentName: string): string => {
  const descriptions: Record<string, string> = {
    'Button': 'Buttons are used to trigger actions or events. They come in different variants and sizes.',
    'Alert': 'Alerts are used to provide feedback to the user. They come in different types and can be dismissible.',
    'Modal': 'Modals are used to display content in a layer above the app. They can be used for dialogs, forms, or any content that requires user attention.',
    'ThemeToggle': 'Theme toggle allows users to switch between light and dark mode.',
    'ThemeCustomizer': 'Theme customizer allows users to customize the design system to their liking.',
    'Navbar': 'Navigation bar for the top of the page with responsive mobile menu.',
    'TableOfContents': 'Table of contents component for easy navigation within a page.',
    'ComponentPreview': 'Component for displaying code examples with preview.'
  }
  
  return descriptions[componentName] || `${componentName} component for the design system.`
}

// Function to get sample code for a component
export const getComponentCode = (componentName: string): string => {
  const sampleCodes: Record<string, string> = {
    'Button': `<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="success">Success Button</Button>
<Button variant="warning">Warning Button</Button>
<Button variant="danger">Danger Button</Button>
<Button variant="outline-primary">Outline Button</Button>

<!-- Button Sizes -->
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>

<!-- Disabled State -->
<Button variant="primary" disabled>Disabled</Button>`,

    'Alert': `<Alert type="info" title="Information">
  This is an information alert.
</Alert>

<Alert type="success" title="Success">
  This is a success alert.
</Alert>

<Alert type="warning" title="Warning">
  This is a warning alert.
</Alert>

<Alert type="danger" title="Danger">
  This is a danger alert.
</Alert>

<!-- Dismissible Alert -->
<Alert type="info" title="Dismissible Alert" dismissible>
  This alert can be dismissed by clicking the close button.
</Alert>`,

    'Modal': `<script setup>
import { ref } from 'vue'
import Button from './Button.vue'
import Modal from './Modal.vue'

const showModal = ref(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <Button @click="toggleModal">Open Modal</Button>
  
  <Modal :show="showModal" title="Example Modal" @close="toggleModal">
    <div class="p-4">
      <p>This is an example modal with a title and footer.</p>
    </div>
    
    <template #footer>
      <Button variant="outline-primary" size="sm" @click="toggleModal">Cancel</Button>
      <Button variant="primary" size="sm" @click="toggleModal">Confirm</Button>
    </template>
  </Modal>
</template>`,

    'ThemeToggle': `<ThemeToggle />`,

    'ThemeCustomizer': `<ThemeCustomizer />`
  }
  
  return sampleCodes[componentName] || `<${componentName} />`
}

// In a real application, this would dynamically load all components
// For now, we'll return a static list of component metadata
export const loadComponents = async (): Promise<ComponentMeta[]> => {
  // This is where we would use import.meta.glob in a real application
  // const componentFiles = import.meta.glob('../components/*.vue')
  
  // For now, return a static list
  return [
    {
      name: 'Button',
      component: {} as Component, // This would be the actual component in a real app
      code: getComponentCode('Button'),
      description: generateDescription('Button'),
      props: {
        variant: 'primary | secondary | success | warning | danger | outline-primary',
        size: 'sm | md | lg',
        disabled: 'boolean',
        type: 'button | submit | reset'
      },
      events: ['click'],
      slots: ['default']
    },
    {
      name: 'Alert',
      component: {} as Component,
      code: getComponentCode('Alert'),
      description: generateDescription('Alert'),
      props: {
        type: 'info | success | warning | danger',
        dismissible: 'boolean',
        title: 'string'
      },
      slots: ['default']
    },
    {
      name: 'Modal',
      component: {} as Component,
      code: getComponentCode('Modal'),
      description: generateDescription('Modal'),
      props: {
        show: 'boolean',
        title: 'string',
        maxWidth: 'sm | md | lg | xl | full'
      },
      events: ['close'],
      slots: ['default', 'footer']
    }
  ]
}