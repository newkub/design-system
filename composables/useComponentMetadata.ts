import { ref, onMounted, computed } from 'vue';
import type { ComponentMetadata, ComponentWithPreview } from '~/types/component-metadata';

export function useComponentMetadata() {
  const components = ref<ComponentWithPreview[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Components' },
    { id: 'layout', name: 'Layout' },
    { id: 'form', name: 'Form' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'data-display', name: 'Data Display' },
  ];

  // Get color for category badge
  function getCategoryColor(category: string) {
    const colorMap: Record<string, string> = {
      'layout': 'bg-purple-100 text-purple-800',
      'form': 'bg-blue-100 text-blue-800',
      'feedback': 'bg-amber-100 text-amber-800',
      'navigation': 'bg-green-100 text-green-800',
      'data-display': 'bg-indigo-100 text-indigo-800'
    };
    
    return colorMap[category] || 'bg-gray-100 text-gray-800';
  }

  // Get component count by category
  function getComponentCountByCategory(categoryId: string) {
    if (categoryId === 'all') {
      return components.value.length;
    }
    return components.value.filter(component => component.category === categoryId).length;
  }

  // Create preview function for a component
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

  // Load component metadata
  async function loadComponentMetadata() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Use the nuxtApp's componentMetadata provider
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$componentMetadata) {
        const loadedComponents = await nuxtApp.$componentMetadata.getComponents();
        
        // Ensure each component has a preview function
        components.value = loadedComponents.map(component => {
          if (typeof component.preview !== 'function') {
            return {
              ...component,
              preview: createPreviewFunction(component.id)
            };
          }
          return component;
        });
      } else {
        // Fallback to hardcoded components if the provider is not available
        components.value = [
          {
            id: 'button',
            title: 'Button',
            description: 'Buttons allow users to trigger an action or event with a single click.',
            category: 'form',
            tags: ['interactive', 'action'],
            preview: createPreviewFunction('button')
          },
          {
            id: 'alert',
            title: 'Alert',
            description: 'Alerts display important messages to the user.',
            category: 'feedback',
            tags: ['notification', 'message'],
            preview: createPreviewFunction('alert')
          },
          {
            id: 'badge',
            title: 'Badge',
            description: 'Badges are small status descriptors for UI elements.',
            category: 'data-display',
            tags: ['label', 'status'],
            preview: createPreviewFunction('badge')
          },
          {
            id: 'card',
            title: 'Card',
            description: 'Cards contain content and actions about a single subject.',
            category: 'layout',
            tags: ['container', 'content'],
            preview: createPreviewFunction('card')
          },
          {
            id: 'text',
            title: 'Typography',
            description: 'Typography components for displaying text with various styles.',
            category: 'data-display',
            tags: ['text', 'heading'],
            preview: createPreviewFunction('text')
          },
          {
            id: 'input',
            title: 'Input',
            description: 'Input fields allow users to enter text.',
            category: 'form',
            tags: ['form', 'text'],
            preview: createPreviewFunction('input')
          },
          {
            id: 'tabs',
            title: 'Tabs',
            description: 'Tabs organize content into separate views which users can switch between.',
            category: 'navigation',
            tags: ['navigation', 'content'],
            preview: createPreviewFunction('tabs')
          }
        ];
      }
    } catch (err) {
      error.value = 'Failed to load component metadata';
      console.error(error.value, err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadComponentMetadata();
  });

  return {
    components,
    isLoading,
    error,
    categories,
    getCategoryColor,
    getComponentCountByCategory,
    reloadMetadata: loadComponentMetadata
  };
}