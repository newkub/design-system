<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="closeModal"
    ></div>
    
    <!-- Modal Container -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <div 
        class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 class="text-xl font-bold">{{ component.title }}</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
            @click="closeModal"
          >
            <div class="i-carbon-close text-xl"></div>
          </button>
        </div>
        
        <!-- Modal Content -->
        <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
          <!-- Left Panel: Component Variants -->
          <div class="md:w-1/2 border-r border-gray-200 overflow-y-auto p-4">
            <h3 class="text-lg font-semibold mb-4">Component Variants</h3>
            
            <div class="space-y-6">
              <!-- Primary Variant -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Default</h4>
                <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                  <component 
                    v-if="component.preview"
                    :is="component.preview().component" 
                    v-bind="component.preview().props"
                  >
                    {{ component.preview().content }}
                    <template v-if="component.preview().slots" v-for="(slotContent, name) in component.preview().slots" #[name]>
                      {{ slotContent }}
                    </template>
                  </component>
                </div>
              </div>
              
              <!-- Additional Variants based on component type -->
              <template v-if="component.id === 'button'">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Secondary</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsButton variant="secondary">Secondary Button</DsButton>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Outline</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsButton variant="outline">Outline Button</DsButton>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Ghost</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsButton variant="ghost">Ghost Button</DsButton>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Danger</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsButton variant="danger">Danger Button</DsButton>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Sizes</h4>
                  <div class="flex items-center justify-center gap-4 p-6 bg-white rounded border border-gray-200">
                    <DsButton variant="primary" size="sm">Small</DsButton>
                    <DsButton variant="primary" size="md">Medium</DsButton>
                    <DsButton variant="primary" size="lg">Large</DsButton>
                  </div>
                </div>
              </template>
              
              <template v-else-if="component.id === 'alert'">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Success</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsAlert type="success" title="Success">This is a success alert</DsAlert>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Warning</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsAlert type="warning" title="Warning">This is a warning alert</DsAlert>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Error</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsAlert type="error" title="Error">This is an error alert</DsAlert>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Dismissible</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsAlert type="info" title="Dismissible" dismissible>This alert can be dismissed</DsAlert>
                  </div>
                </div>
              </template>
              
              <template v-else-if="component.id === 'badge'">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Variants</h4>
                  <div class="flex flex-wrap items-center justify-center gap-4 p-6 bg-white rounded border border-gray-200">
                    <DsBadge variant="primary">Primary</DsBadge>
                    <DsBadge variant="secondary">Secondary</DsBadge>
                    <DsBadge variant="success">Success</DsBadge>
                    <DsBadge variant="warning">Warning</DsBadge>
                    <DsBadge variant="danger">Danger</DsBadge>
                    <DsBadge variant="info">Info</DsBadge>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Sizes</h4>
                  <div class="flex items-center justify-center gap-4 p-6 bg-white rounded border border-gray-200">
                    <DsBadge variant="primary" size="sm">Small</DsBadge>
                    <DsBadge variant="primary" size="md">Medium</DsBadge>
                    <DsBadge variant="primary" size="lg">Large</DsBadge>
                  </div>
                </div>
              </template>
              
              <template v-else-if="component.id === 'card'">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Default</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsCard variant="default" class="w-full max-w-sm">
                      <template #header>Card Header</template>
                      Card Content
                      <template #footer>Card Footer</template>
                    </DsCard>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Bordered</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsCard variant="bordered" class="w-full max-w-sm">
                      <template #header>Card Header</template>
                      Card Content
                      <template #footer>Card Footer</template>
                    </DsCard>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Elevated</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsCard variant="elevated" class="w-full max-w-sm">
                      <template #header>Card Header</template>
                      Card Content
                      <template #footer>Card Footer</template>
                    </DsCard>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Hover Effect</h4>
                  <div class="flex items-center justify-center p-6 bg-white rounded border border-gray-200">
                    <DsCard variant="default" hover class="w-full max-w-sm">
                      <template #header>Hover Card</template>
                      Hover over this card to see the effect
                      <template #footer>Card Footer</template>
                    </DsCard>
                  </div>
                </div>
              </template>
              
              <!-- Add more component-specific variants as needed -->
            </div>
          </div>
          
          <!-- Right Panel: Usage -->
          <div class="md:w-1/2 overflow-y-auto p-4">
            <h3 class="text-lg font-semibold mb-4">Usage</h3>
            
            <div class="space-y-6">
              <!-- Basic Usage -->
              <div>
                <h4 class="text-md font-medium mb-2">Basic Usage</h4>
                <pre class="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
<code>&lt;template&gt;
  &lt;{{ getComponentTag(component.id) }} {{ getComponentProps(component.id) }}&gt;
    {{ getComponentContent(component.id) }}
  &lt;/{{ getComponentTag(component.id) }}&gt;
&lt;/template&gt;</code>
                </pre>
              </div>
              
              <!-- Props -->
              <div>
                <h4 class="text-md font-medium mb-2">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(prop, index) in getComponentProps(component.id, true)" :key="index">
                        <td class="px-4 py-2 text-sm text-gray-900">{{ prop.name }}</td>
                        <td class="px-4 py-2 text-sm text-gray-500">{{ prop.type }}</td>
                        <td class="px-4 py-2 text-sm text-gray-500">{{ prop.default }}</td>
                        <td class="px-4 py-2 text-sm text-gray-500">{{ prop.description }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- Events (if applicable) -->
              <div v-if="getComponentEvents(component.id).length > 0">
                <h4 class="text-md font-medium mb-2">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(event, index) in getComponentEvents(component.id)" :key="index">
                        <td class="px-4 py-2 text-sm text-gray-900">{{ event.name }}</td>
                        <td class="px-4 py-2 text-sm text-gray-500">{{ event.description }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- Slots (if applicable) -->
              <div v-if="getComponentSlots(component.id).length > 0">
                <h4 class="text-md font-medium mb-2">Slots</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(slot, index) in getComponentSlots(component.id)" :key="index">
                        <td class="px-4 py-2 text-sm text-gray-900">{{ slot.name }}</td>
                        <td class="px-4 py-2 text-sm text-gray-500">{{ slot.description }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- Examples -->
              <div>
                <h4 class="text-md font-medium mb-2">Examples</h4>
                
                <!-- Example 1 -->
                <div class="mb-4">
                  <h5 class="text-sm font-medium text-gray-700 mb-2">Basic Example</h5>
                  <pre class="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
<code>&lt;template&gt;
  {{ getComponentExample(component.id, 1) }}
&lt;/template&gt;</code>
                  </pre>
                </div>
                
                <!-- Example 2 -->
                <div>
                  <h5 class="text-sm font-medium text-gray-700 mb-2">Advanced Example</h5>
                  <pre class="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
<code>&lt;template&gt;
  {{ getComponentExample(component.id, 2) }}
&lt;/template&gt;</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  component: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

// Helper functions for component documentation
function getComponentTag(componentId) {
  const componentMap = {
    'button': 'DsButton',
    'alert': 'DsAlert',
    'badge': 'DsBadge',
    'card': 'DsCard',
    'typography': 'DsTypography',
    'input': 'DsInput',
    'tabs': 'DsTabs'
  };
  
  return componentMap[componentId] || 'Component';
}

function getComponentProps(componentId, detailed = false) {
  if (detailed) {
    // Return detailed props for documentation
    const propsMap = {
      'button': [
        { name: 'variant', type: 'String', default: 'primary', description: 'Button style variant (primary, secondary, outline, ghost, danger)' },
        { name: 'size', type: 'String', default: 'md', description: 'Button size (sm, md, lg)' },
        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the button is disabled' },
        { name: 'full', type: 'Boolean', default: 'false', description: 'Whether the button takes full width' }
      ],
      'alert': [
        { name: 'type', type: 'String', default: 'info', description: 'Alert type (info, success, warning, error)' },
        { name: 'title', type: 'String', default: '""', description: 'Alert title' },
        { name: 'dismissible', type: 'Boolean', default: 'false', description: 'Whether the alert can be dismissed' }
      ],
      'badge': [
        { name: 'variant', type: 'String', default: 'primary', description: 'Badge style variant (primary, secondary, success, warning, danger, info)' },
        { name: 'size', type: 'String', default: 'md', description: 'Badge size (sm, md, lg)' }
      ],
      'card': [
        { name: 'variant', type: 'String', default: 'default', description: 'Card style variant (default, bordered, elevated)' },
        { name: 'hover', type: 'Boolean', default: 'false', description: 'Whether to show hover effect' }
      ],
      'typography': [
        { name: 'tag', type: 'String', default: 'p', description: 'HTML tag to render' },
        { name: 'variant', type: 'String', default: 'body', description: 'Typography variant (display, h1, h2, h3, h4, body, small, caption)' },
        { name: 'weight', type: 'String', default: 'normal', description: 'Font weight (light, normal, medium, semibold, bold)' },
        { name: 'truncate', type: 'Boolean', default: 'false', description: 'Whether to truncate text with ellipsis' }
      ],
      'input': [
        { name: 'modelValue', type: 'String/Number', default: '""', description: 'Input value (v-model)' },
        { name: 'label', type: 'String', default: '""', description: 'Input label' },
        { name: 'type', type: 'String', default: 'text', description: 'Input type (text, password, email, etc.)' },
        { name: 'placeholder', type: 'String', default: '""', description: 'Input placeholder' },
        { name: 'hint', type: 'String', default: '""', description: 'Helper text below the input' },
        { name: 'error', type: 'String', default: '""', description: 'Error message' },
        { name: 'id', type: 'String', default: '""', description: 'Input ID attribute' },
        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the input is disabled' },
        { name: 'required', type: 'Boolean', default: 'false', description: 'Whether the input is required' }
      ],
      'tabs': [
        { name: 'tabs', type: 'Array', default: '[]', description: 'Array of tab names' },
        { name: 'modelValue', type: 'Number', default: '0', description: 'Index of the active tab (v-model)' }
      ]
    };
    
    return propsMap[componentId] || [];
  } else {
    // Return props string for template example
    const propsMap = {
      'button': 'variant="primary"',
      'alert': 'type="info" title="Information"',
      'badge': 'variant="primary"',
      'card': 'variant="default"',
      'typography': 'variant="body" weight="normal"',
      'input': 'label="Input" placeholder="Enter text..."',
      'tabs': ':tabs="[\'Tab 1\', \'Tab 2\']" v-model="activeTab"'
    };
    
    return propsMap[componentId] || '';
  }
}

function getComponentContent(componentId) {
  const contentMap = {
    'button': 'Button Text',
    'alert': 'This is an alert message',
    'badge': 'Badge',
    'card': 'Card Content',
    'typography': 'Text content',
    'input': '',
    'tabs': ''
  };
  
  return contentMap[componentId] || 'Content';
}

function getComponentEvents(componentId) {
  const eventsMap = {
    'button': [
      { name: 'click', description: 'Emitted when the button is clicked' }
    ],
    'alert': [
      { name: 'dismiss', description: 'Emitted when the alert is dismissed' }
    ],
    'input': [
      { name: 'update:modelValue', description: 'Emitted when the input value changes' }
    ],
    'tabs': [
      { name: 'update:modelValue', description: 'Emitted when the active tab changes' }
    ]
  };
  
  return eventsMap[componentId] || [];
}

function getComponentSlots(componentId) {
  const slotsMap = {
    'button': [
      { name: 'default', description: 'Button content' },
      { name: 'icon-left', description: 'Icon to display before the button text' },
      { name: 'icon-right', description: 'Icon to display after the button text' }
    ],
    'alert': [
      { name: 'default', description: 'Alert content' },
      { name: 'icon', description: 'Custom icon for the alert' }
    ],
    'card': [
      { name: 'default', description: 'Card content' },
      { name: 'header', description: 'Card header content' },
      { name: 'footer', description: 'Card footer content' }
    ],
    'input': [
      { name: 'prefix', description: 'Content to display before the input' },
      { name: 'suffix', description: 'Content to display after the input' }
    ]
  };
  
  return slotsMap[componentId] || [];
}

function getComponentExample(componentId, exampleNumber) {
  const examples = {
    'button': {
      1: `<DsButton variant="primary">Click Me</DsButton>`,
      2: `<DsButton 
  variant="primary" 
  size="lg" 
  @click="handleClick"
>
  <template #icon-left>
    <div class="i-carbon-add"></div>
  </template>
  Add New Item
</DsButton>`
    },
    'alert': {
      1: `<DsAlert type="info" title="Information">
  This is an informational alert
</DsAlert>`,
      2: `<DsAlert 
  type="warning" 
  title="Warning" 
  dismissible 
  @dismiss="handleDismiss"
>
  <template #icon>
    <div class="i-carbon-warning-alt"></div>
  </template>
  This is a custom warning alert
</DsAlert>`
    },
    'badge': {
      1: `<DsBadge variant="primary">New</DsBadge>`,
      2: `<DsBadge variant="success" size="lg">Completed</DsBadge>`
    },
    'card': {
      1: `<DsCard variant="default">
  This is a simple card
</DsCard>`,
      2: `<DsCard variant="elevated" hover>
  <template #header>
    <div class="flex justify-between items-center">
      <h3 class="font-bold">Card Title</h3>
      <DsBadge variant="primary">New</DsBadge>
    </div>
  </template>
  
  <p>This is the main content of the card.</p>
  <p>You can add multiple paragraphs or components.</p>
  
  <template #footer>
    <div class="flex justify-end">
      <DsButton variant="primary">Action</DsButton>
    </div>
  </template>
</DsCard>`
    },
    'typography': {
      1: `<DsTypography variant="h1" weight="bold">Heading 1</DsTypography>`,
      2: `<div>
  <DsTypography variant="h2" weight="semibold">Section Title</DsTypography>
  <DsTypography variant="body">
    This is a paragraph of text that demonstrates the body text style.
  </DsTypography>
  <DsTypography variant="small" weight="medium">
    This is smaller text that might be used for captions or notes.
  </DsTypography>
</div>`
    },
    'input': {
      1: `<DsInput 
  v-model="inputValue" 
  label="Username" 
  placeholder="Enter your username"
/>`,
      2: `<DsInput 
  v-model="email" 
  label="Email Address" 
  type="email" 
  placeholder="example@domain.com"
  required
  :error="emailError"
  hint="We'll never share your email with anyone else."
>
  <template #prefix>
    <div class="i-carbon-email"></div>
  </template>
</DsInput>`
    },
    'tabs': {
      1: `<DsTabs :tabs="['Tab 1', 'Tab 2']" v-model="activeTab" />`,
      2: `<DsTabs 
  :tabs="['Account', 'Profile', 'Settings']" 
  v-model="activeTab"
/>

<div v-if="activeTab === 0">
  Account content here
</div>
<div v-else-if="activeTab === 1">
  Profile content here
</div>
<div v-else-if="activeTab === 2">
  Settings content here
</div>`
    }
  };
  
  return examples[componentId]?.[exampleNumber] || `<${getComponentTag(componentId)} ${getComponentProps(componentId)}>${getComponentContent(componentId)}</${getComponentTag(componentId)}>`;
}
</script>