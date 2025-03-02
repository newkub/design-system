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

  // Extract component metadata from component source code
  function extractMetadataFromSource(source: string): ComponentMetadata | null {
    try {
      const metadataRegex = /@componentMetadata\s*\n\s*\*\s*({[\s\S]*?})\s*\n\s*\*/;
      const match = source.match(metadataRegex);
      
      if (match && match[1]) {
        // Parse the JSON metadata
        const metadataStr = match[1].replace(/\s*\*\s*/g, '');
        return JSON.parse(metadataStr);
      }
      
      return null;
    } catch (err) {
      console.error('Error extracting metadata:', err);
      return null;
    }
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
      // In a real-world scenario, we would use a server API or Nuxt's glob import
      // Since we're in a browser environment, we'll simulate this with a fetch request
      
      // For demonstration, we'll use the components we've defined
      const componentFiles = [
        { name: 'Button.vue', path: '/components/Button.vue' },
        { name: 'Alert.vue', path: '/components/Alert.vue' },
        { name: 'Badge.vue', path: '/components/Badge.vue' },
        { name: 'Card.vue', path: '/components/Card.vue' },
        { name: 'Input.vue', path: '/components/Input.vue' },
        { name: 'Tabs.vue', path: '/components/Tabs.vue' },
        { name: 'Text.vue', path: '/components/Text.vue' }
      ];
      
      const loadedComponents: ComponentWithPreview[] = [];
      
      for (const file of componentFiles) {
        try {
          // In a real implementation, we would fetch the file content
          // Here we'll use the component's metadata directly
          const response = await fetch(file.path);
          const source = await response.text();
          
          const metadata = extractMetadataFromSource(source);
          
          if (metadata) {
            // Add preview function
            const componentWithPreview: ComponentWithPreview = {
              ...metadata,
              preview: createPreviewFunction(metadata.id)
            };
            
            loadedComponents.push(componentWithPreview);
          }
        } catch (err) {
          console.warn(`Failed to load metadata for ${file.name}:`, err);
        }
      }
      
      // For demonstration purposes, if we couldn't load the metadata from files,
      // we'll use hardcoded metadata
      if (loadedComponents.length === 0) {
        const fallbackComponents: ComponentWithPreview[] = [
          {
            id: 'button',
            title: 'Button',
            description: 'Buttons allow users to trigger an action or event with a single click.',
            category: 'form',
            tags: ['interactive', 'action'],
            preview: createPreviewFunction('button'),
            props: [
              { name: 'variant', type: 'String', default: 'primary', description: 'Button style variant' },
              { name: 'size', type: 'String', default: 'md', description: 'Button size' },
              { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the button is disabled' },
              { name: 'full', type: 'Boolean', default: 'false', description: 'Whether the button takes full width' }
            ],
            events: [
              { name: 'click', description: 'Emitted when the button is clicked' }
            ],
            slots: [
              { name: 'default', description: 'Button content' },
              { name: 'icon-left', description: 'Icon to display before the button text' },
              { name: 'icon-right', description: 'Icon to display after the button text' }
            ]
          },
          {
            id: 'alert',
            title: 'Alert',
            description: 'Alerts display important messages to the user.',
            category: 'feedback',
            tags: ['notification', 'message'],
            preview: createPreviewFunction('alert'),
            props: [
              { name: 'type', type: 'String', default: 'info', description: 'Alert type' },
              { name: 'title', type: 'String', default: '""', description: 'Alert title' },
              { name: 'dismissible', type: 'Boolean', default: 'false', description: 'Whether the alert can be dismissed' }
            ],
            events: [
              { name: 'dismiss', description: 'Emitted when the alert is dismissed' }
            ],
            slots: [
              { name: 'default', description: 'Alert content' },
              { name: 'icon', description: 'Custom icon for the alert' }
            ]
          },
          {
            id: 'badge',
            title: 'Badge',
            description: 'Badges are small status descriptors for UI elements.',
            category: 'data-display',
            tags: ['label', 'status'],
            preview: createPreviewFunction('badge'),
            props: [
              { name: 'variant', type: 'String', default: 'primary', description: 'Badge style variant' },
              { name: 'size', type: 'String', default: 'md', description: 'Badge size' }
            ]
          },
          {
            id: 'card',
            title: 'Card',
            description: 'Cards contain content and actions about a single subject.',
            category: 'layout',
            tags: ['container', 'content'],
            preview: createPreviewFunction('card'),
            props: [
              { name: 'variant', type: 'String', default: 'default', description: 'Card style variant' },
              { name: 'hover', type: 'Boolean', default: 'false', description: 'Whether to show hover effect' }
            ],
            slots: [
              { name: 'default', description: 'Card content' },
              { name: 'header', description: 'Card header content' },
              { name: 'footer', description: 'Card footer content' }
            ]
          },
          {
            id: 'text',
            title: 'Typography',
            description: 'Typography components for displaying text with various styles.',
            category: 'data-display',
            tags: ['text', 'heading'],
            preview: createPreviewFunction('text'),
            props: [
              { name: 'tag', type: 'String', default: 'p', description: 'HTML tag to render' },
              { name: 'variant', type: 'String', default: 'body', description: 'Typography variant' },
              { name: 'weight', type: 'String', default: 'normal', description: 'Font weight' },
              { name: 'truncate', type: 'Boolean', default: 'false', description: 'Whether to truncate text with ellipsis' }
            ]
          },
          {
            id: 'input',
            title: 'Input',
            description: 'Input fields allow users to enter text.',
            category: 'form',
            tags: ['form', 'text'],
            preview: createPreviewFunction('input'),
            props: [
              { name: 'modelValue', type: 'String/Number', default: '""', description: 'Input value (v-model)' },
              { name: 'label', type: 'String', default: '""', description: 'Input label' },
              { name: 'type', type: 'String', default: 'text', description: 'Input type' },
              { name: 'placeholder', type: 'String', default: '""', description: 'Input placeholder' },
              { name: 'hint', type: 'String', default: '""', description: 'Helper text below the input' },
              { name: 'error', type: 'String', default: '""', description: 'Error message' },
              { name: 'id', type: 'String', default: '""', description: 'Input ID attribute' },
              { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the input is disabled' },
              { name: 'required', type: 'Boolean', default: 'false', description: 'Whether the input is required' }
            ],
            events: [
              { name: 'update:modelValue', description: 'Emitted when the input value changes' }
            ],
            slots: [
              { name: 'prefix', description: 'Content to display before the input' },
              { name: 'suffix', description: 'Content to display after the input' }
            ]
          },
          {
            id: 'tabs',
            title: 'Tabs',
            description: 'Tabs organize content into separate views which users can switch between.',
            category: 'navigation',
            tags: ['navigation', 'content'],
            preview: createPreviewFunction('tabs'),
            props: [
              { name: 'tabs', type: 'Array', default: '[]', description: 'Array of tab names' },
              { name: 'modelValue', type: 'Number', default: '0', description: 'Index of the active tab (v-model)' }
            ],
            events: [
              { name: 'update:modelValue', description: 'Emitted when the active tab changes' }
            ]
          }
        ];
        
        components.value = fallbackComponents;
      } else {
        components.value = loadedComponents;
      }
    } catch (err) {
      error.value = 'Failed to load component metadata';
      console.error(error.value, err);
    } finally {
      isLoading.value = false;
    }
  }

  // Watch for file system changes (in a real implementation)
  function watchForFileChanges() {
    // In a real implementation, this would use a file watcher or WebSocket
    // For demonstration, we'll just reload metadata periodically
    const intervalId = setInterval(() => {
      loadComponentMetadata();
    }, 30000); // Check every 30 seconds
    
    // Clean up on unmount
    onUnmounted(() => {
      clearInterval(intervalId);
    });
  }

  onMounted(() => {
    loadComponentMetadata();
    watchForFileChanges();
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