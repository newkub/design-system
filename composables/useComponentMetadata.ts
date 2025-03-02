import { ref, onMounted, computed, watch } from 'vue';
import type { ComponentMetadata, ComponentWithPreview, ComponentCategory } from '~/types/component-metadata';
import { extractMetadataFromSource, generateMarkdownDocs } from '~/utils/component-metadata-extractor';

export interface CategoryInfo {
  id: string;
  name: string;
}

export function useComponentMetadata() {
  const components = ref<ComponentWithPreview[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Categories for filtering
  const categories: CategoryInfo[] = [
    { id: 'all', name: 'All Components' },
    { id: 'layout', name: 'Layout' },
    { id: 'form', name: 'Form' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'data-display', name: 'Data Display' },
  ];

  // Get color for category badge
  function getCategoryColor(category: string): string {
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
  function getComponentCountByCategory(categoryId: string): number {
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
          component: 'DsButton',
          props: { variant: 'primary' },
          content: 'Button'
        },
        'alert': {
          component: 'DsAlert',
          props: { type: 'info', title: 'Information' },
          content: 'This is an alert message'
        },
        'badge': {
          component: 'DsBadge',
          props: { variant: 'primary' },
          content: 'Badge'
        },
        'card': {
          component: 'DsCard',
          props: { variant: 'bordered' },
          content: 'Card Content',
          slots: {
            header: 'Card Header',
            footer: 'Card Footer'
          }
        },
        'text': {
          component: 'DsText',
          props: { variant: 'h3', weight: 'semibold' },
          content: 'Typography'
        },
        'input': {
          component: 'DsInput',
          props: { label: 'Input Field', placeholder: 'Enter text...' }
        },
        'tabs': {
          component: 'DsTabs',
          props: { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], modelValue: 0 }
        }
      };
      
      return previewConfigs[componentId] || {
        component: `Ds${componentId.charAt(0).toUpperCase() + componentId.slice(1)}`,
        content: 'Preview'
      };
    };
  }

  // Load component metadata
  async function loadComponentMetadata() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Fetch component metadata from server API
      const response = await fetch('/api/components');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch components: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        // Add preview function to each component
        const componentsWithPreview: ComponentWithPreview[] = data.map(component => ({
          ...component,
          preview: createPreviewFunction(component.id)
        }));
        
        components.value = componentsWithPreview;
      } else {
        // Fallback to hardcoded components if API returns empty array
        useFallbackComponents();
      }
    } catch (err) {
      console.error('Error loading component metadata:', err);
      error.value = 'Failed to load component metadata';
      
      // Use fallback components on error
      useFallbackComponents();
    } finally {
      isLoading.value = false;
    }
  }

  // Use fallback hardcoded components
  function useFallbackComponents() {
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
        ],
        usage: {
          basic: '<DsButton variant="primary">Click Me</DsButton>',
          advanced: '<DsButton variant="primary" size="lg" @click="handleClick"><template #icon-left><div class="i-carbon-add"></div></template>Add New Item</DsButton>'
        }
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
        ],
        usage: {
          basic: '<DsAlert type="info" title="Information">This is an informational alert</DsAlert>',
          advanced: '<DsAlert type="warning" title="Warning" dismissible @dismiss="handleDismiss"><template #icon><div class="i-carbon-warning-alt"></div></template>This is a custom warning alert</DsAlert>'
        }
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
        ],
        usage: {
          basic: '<DsBadge variant="primary">New</DsBadge>',
          advanced: '<DsBadge variant="success" size="lg">Completed</DsBadge>'
        }
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
        ],
        usage: {
          basic: '<DsCard variant="default">This is a simple card</DsCard>',
          advanced: '<DsCard variant="elevated" hover><template #header><div class="flex justify-between items-center"><h3 class="font-bold">Card Title</h3><DsBadge variant="primary">New</DsBadge></div></template><p>This is the main content of the card.</p><p>You can add multiple paragraphs or components.</p><template #footer><div class="flex justify-end"><DsButton variant="primary">Action</DsButton></div></template></DsCard>'
        }
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
        ],
        usage: {
          basic: '<DsInput v-model="inputValue" label="Username" placeholder="Enter your username" />',
          advanced: '<DsInput v-model="email" label="Email Address" type="email" placeholder="example@domain.com" required :error="emailError" hint="We\'ll never share your email with anyone else."><template #prefix><div class="i-carbon-email"></div></template></DsInput>'
        }
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
        ],
        usage: {
          basic: '<DsTabs :tabs="[\'Tab 1\', \'Tab 2\']" v-model="activeTab" />',
          advanced: '<DsTabs :tabs="[\'Account\', \'Profile\', \'Settings\']" v-model="activeTab" /><div v-if="activeTab === 0">Account content here</div><div v-else-if="activeTab === 1">Profile content here</div><div v-else-if="activeTab === 2">Settings content here</div>'
        }
      }
    ];
    
    components.value = fallbackComponents;
  }

  // Generate markdown documentation for a component
  function generateComponentDocs(componentId: string): string {
    const component = components.value.find(c => c.id === componentId);
    
    if (!component) {
      return '# Component Not Found';
    }
    
    return generateMarkdownDocs(component);
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
    reloadMetadata: loadComponentMetadata,
    generateComponentDocs
  };
}