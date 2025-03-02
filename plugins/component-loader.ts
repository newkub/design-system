import { defineNuxtPlugin } from '#app';
import type { ComponentMetadata, ComponentWithPreview } from '~/types/component-metadata';

export default defineNuxtPlugin(async (nuxtApp) => {
  // This plugin dynamically loads component metadata from all components
  
  // Function to create preview for a component
  function createPreviewFunction(componentId: string): ComponentWithPreview['preview'] {
    return () => {
      // Default preview configurations based on component type
      const previewConfigs: Record<string, any> = {
        'button': {
          component: 'Button',
          props: { variant: 'primary' },
          content: 'Button'
        },
        'alert': {
          component: 'Alert',
          props: { type: 'info', title: 'Information' },
          content: 'This is an alert message'
        },
        'badge': {
          component: 'Badge',
          props: { variant: 'primary' },
          content: 'Badge'
        },
        'card': {
          component: 'Card',
          props: { variant: 'bordered' },
          content: 'Card Content',
          slots: {
            header: 'Card Header',
            footer: 'Card Footer'
          }
        },
        'text': {
          component: 'Text',
          props: { variant: 'h3', weight: 'semibold' },
          content: 'Typography'
        },
        'input': {
          component: 'Input',
          props: { label: 'Input Field', placeholder: 'Enter text...' }
        },
        'tabs': {
          component: 'Tabs',
          props: { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], modelValue: 0 }
        }
      };
      
      return previewConfigs[componentId] || {
        component: componentId.charAt(0).toUpperCase() + componentId.slice(1),
        content: 'Preview'
      };
    };
  }

  // Function to load component metadata from all components
  async function loadAllComponentMetadata() {
    try {
      // In a browser environment, we'll use a server API endpoint
      const response = await fetch('/api/components');
      if (!response.ok) {
        throw new Error('Failed to fetch components');
      }
      
      const components = await response.json();
      return components;
    } catch (error) {
      console.error('Error loading component metadata:', error);
      
      // Fallback to manually loading known components
      // This would be replaced with a more dynamic approach in a real implementation
      const componentModules = import.meta.glob('../components/*.vue', { eager: true });
      
      const components: ComponentWithPreview[] = [];
      
      for (const path in componentModules) {
        try {
          const module = componentModules[path];
          
          if (module && 'componentMetadata' in module) {
            const metadata = module.componentMetadata;
            if (metadata) {
              // Extract component name from path
              const fileName = path.split('/').pop()?.replace('.vue', '');
              const componentId = metadata.id || (fileName ? fileName.toLowerCase() : '');
              
              if (componentId) {
                // Create complete metadata with preview function
                const componentWithPreview: ComponentWithPreview = {
                  ...metadata,
                  id: componentId,
                  preview: createPreviewFunction(componentId)
                };
                
                components.push(componentWithPreview);
              }
            }
          } else {
            // Component without metadata
            const fileName = path.split('/').pop()?.replace('.vue', '');
            if (fileName) {
              const componentId = fileName.toLowerCase();
              
              // Create minimal metadata for components without explicit metadata
              const componentWithPreview: ComponentWithPreview = {
                id: componentId,
                title: fileName,
                description: `${fileName} component`,
                category: 'layout', // Default category
                tags: [componentId],
                preview: createPreviewFunction(componentId)
              };
              
              components.push(componentWithPreview);
            }
          }
        } catch (err) {
          console.error(`Error processing component at ${path}:`, err);
        }
      }
      
      return components;
    }
  }

  // Provide component metadata to the application
  nuxtApp.provide('componentMetadata', {
    getComponents: loadAllComponentMetadata,
    
    // This would be used to watch for file changes
    watchComponents: (callback: (components: ComponentMetadata[]) => void) => {
      // In a real implementation, this would set up a WebSocket connection
      // or use server-sent events to notify the client of changes
      return () => {
        // Cleanup function
      };
    }
  });
});