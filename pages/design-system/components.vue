<template>
  <NuxtLayout name="default">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Components</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Components</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore our component library with usage examples and documentation.
      </p>
      
      <!-- Component Categories -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button 
          v-for="category in componentCategories" 
          :key="category.id"
          class="px-4 py-2 rounded-full"
          :class="activeCategory === category.id ? 
            'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 
            'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'"
          @click="activeCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
      
      <!-- Alert Component -->
      <section v-if="activeCategory === 'all' || activeCategory === 'feedback'" class="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-4">Alert</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ getComponentDescription('Alert') }}
        </p>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Examples</h3>
          <div class="space-y-4">
            <Alert type="info">This is an information alert.</Alert>
            <Alert type="success">This is a success alert.</Alert>
            <Alert type="warning">This is a warning alert.</Alert>
            <Alert type="error">This is an error alert.</Alert>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Usage</h3>
          <CodeGroup>
            <CodeBlock label="Vue" active language="vue">
              <Alert type="info">This is an information alert.</Alert>
              <Alert type="success">This is a success alert.</Alert>
              <Alert type="warning">This is a warning alert.</Alert>
              <Alert type="error">This is an error alert.</Alert>
            </CodeBlock>
          </CodeGroup>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Props</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Default</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">type</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">String</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">'info'</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type of alert: 'info', 'success', 'warning', 'error'</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <!-- Badge Component -->
      <section v-if="activeCategory === 'all' || activeCategory === 'display'" class="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-4">Badge</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ getComponentDescription('Badge') }}
        </p>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Examples</h3>
          <div class="flex flex-wrap gap-3">
            <Badge type="info">Info</Badge>
            <Badge type="success">Success</Badge>
            <Badge type="warning">Warning</Badge>
            <Badge type="error">Error</Badge>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Usage</h3>
          <CodeGroup>
            <CodeBlock label="Vue" active language="vue">
              <Badge type="info">Info</Badge>
              <Badge type="success">Success</Badge>
              <Badge type="warning">Warning</Badge>
              <Badge type="error">Error</Badge>
            </CodeBlock>
          </CodeGroup>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Props</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Default</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">type</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">String</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">'info'</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type of badge: 'info', 'success', 'warning', 'error'</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <!-- CodeGroup and CodeBlock Components -->
      <section v-if="activeCategory === 'all' || activeCategory === 'content'" class="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-4">Code Group & Code Block</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ getComponentDescription('CodeGroup') }}
        </p>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Example</h3>
          <CodeGroup>
            <CodeBlock label="JavaScript" active language="js">
              function greeting(name) {
                return `Hello, ${name}!`;
              }
              
              console.log(greeting('World'));
            </CodeBlock>
            <CodeBlock label="Python" language="python">
              def greeting(name):
                  return f"Hello, {name}!"
                  
              print(greeting("World"))
            </CodeBlock>
            <CodeBlock label="PHP" language="php">
              function greeting($name) {
                  return "Hello, " . $name . "!";
              }
              
              echo greeting("World");
            </CodeBlock>
          </CodeGroup>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Usage</h3>
          <CodeGroup>
            <CodeBlock label="Vue" active language="vue">
              <CodeGroup>
                <CodeBlock label="JavaScript" active language="js">
                  function greeting(name) {
                    return `Hello, ${name}!`;
                  }
                  
                  console.log(greeting('World'));
                </CodeBlock>
                <CodeBlock label="Python" language="python">
                  def greeting(name):
                      return f"Hello, {name}!"
                      
                  print(greeting("World"))
                </CodeBlock>
              </CodeGroup>
            </CodeBlock>
          </CodeGroup>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">CodeBlock Props</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Default</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">label</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">String</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">-</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Label for the tab</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">active</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">Boolean</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">false</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Whether this tab is active by default</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">language</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">String</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">''</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Programming language for syntax highlighting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <!-- ComponentExample Component -->
      <section v-if="activeCategory === 'all' || activeCategory === 'content'" class="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-4">Component Example</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ getComponentDescription('ComponentExample') }}
        </p>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Example</h3>
          <ComponentExample :code="buttonExampleCode">
            <div class="flex gap-4">
              <button class="btn btn-primary">Primary Button</button>
              <button class="btn btn-outline">Outline Button</button>
            </div>
          </ComponentExample>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Usage</h3>
          <CodeGroup>
            <CodeBlock label="Vue" active language="vue">
              <ComponentExample :code="buttonExampleCode">
                <div class="flex gap-4">
                  <button class="btn btn-primary">Primary Button</button>
                  <button class="btn btn-outline">Outline Button</button>
                </div>
              </ComponentExample>
            </CodeBlock>
          </CodeGroup>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Props</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Default</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">code</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">Object</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Code examples in different formats (preview, vue, react)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
const componentCategories = [
  { id: 'all', name: 'All Components' },
  { id: 'display', name: 'Display' },
  { id: 'feedback', name: 'Feedback' },
  { id: 'content', name: 'Content' },
  { id: 'navigation', name: 'Navigation' }
]

const activeCategory = ref('all')

// Extract component descriptions from component files
function getComponentDescription(componentName) {
  const descriptions = {
    'Alert': 'Displays an alert message with different styles based on type',
    'Badge': 'A small badge component for displaying status, labels, or counts',
    'CodeGroup': 'A container for CodeBlock components that creates tabbed code examples',
    'CodeBlock': 'A code block component that works with CodeGroup to display code examples with tabs',
    'ComponentExample': 'Displays a component example with preview and code tabs'
  }
  
  return descriptions[componentName] || 'No description available'
}

// Example code for ComponentExample
const buttonExampleCode = {
  preview: `<div class="flex gap-4">
  <button class="btn btn-primary">Primary Button</button>
  <button class="btn btn-outline">Outline Button</button>
</div>`,
  vue: `<template>
  <div class="flex gap-4">
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-outline">Outline Button</button>
  </div>
</template>`,
  react: `function ButtonExample() {
  return (
    <div className="flex gap-4">
      <button className="btn btn-primary">Primary Button</button>
      <button className="btn btn-outline">Outline Button</button>
    </div>
  );
}`
}
</script>