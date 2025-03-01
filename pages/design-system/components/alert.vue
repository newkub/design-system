<template>
  <NuxtLayout name="default">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <NuxtLink to="/design-system/components" class="text-primary-600 dark:text-primary-400 hover:underline">Components</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Alert</span>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Main content -->
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-6">Alert</h1>
          
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Alerts display important messages to users, with different styles based on the type of message.
          </p>
          
          <section id="examples" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Examples</h2>
            
            <div class="space-y-4">
              <Alert type="info">This is an information alert.</Alert>
              <Alert type="success">This is a success alert.</Alert>
              <Alert type="warning">This is a warning alert.</Alert>
              <Alert type="error">This is an error alert.</Alert>
            </div>
          </section>
          
          <section id="usage" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Usage</h2>
            
            <p class="mb-4">
              Alerts should be used to provide feedback to users or highlight important information. Different types of alerts can be used to convey different levels of importance:
            </p>
            
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Info:</strong> For general information or tips</li>
              <li><strong>Success:</strong> For successful operations or positive feedback</li>
              <li><strong>Warning:</strong> For potential issues or things to be aware of</li>
              <li><strong>Error:</strong> For errors or critical issues that need attention</li>
            </ul>
            
            <CodeGroup>
              <CodeBlock label="Vue" active language="vue">
                <Alert type="info">This is an information alert.</Alert>
                <Alert type="success">This is a success alert.</Alert>
                <Alert type="warning">This is a warning alert.</Alert>
                <Alert type="error">This is an error alert.</Alert>
              </CodeBlock>
            </CodeGroup>
          </section>
          
          <section id="props" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Props</h2>
            
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
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">title</td>
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">String</td>
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">Based on type</td>
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Custom title for the alert</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section id="slots" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Slots</h2>
            
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                    <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
                    <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">default</td>
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Content of the alert</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section id="custom-examples" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Custom Examples</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-3">With Custom Title</h3>
                <Alert type="info" title="Custom Information">This alert has a custom title.</Alert>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <Alert type="info" title="Custom Information">This alert has a custom title.</Alert>
                  </CodeBlock>
                </CodeGroup>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">With Rich Content</h3>
                <Alert type="warning">
                  <p>This is a warning with <strong>rich content</strong>.</p>
                  <ul class="list-disc pl-6 mt-2">
                    <li>Item one</li>
                    <li>Item two</li>
                  </ul>
                </Alert>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <Alert type="warning">
                      <p>This is a warning with <strong>rich content</strong>.</p>
                      <ul class="list-disc pl-6 mt-2">
                        <li>Item one</li>
                        <li>Item two</li>
                      </ul>
                    </Alert>
                  </CodeBlock>
                </CodeGroup>
              </div>
            </div>
          </section>
          
          <section id="accessibility" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
            
            <p class="mb-4">
              The Alert component follows accessibility best practices:
            </p>
            
            <ul class="list-disc pl-6 space-y-2">
              <li>Uses semantic colors to convey meaning</li>
              <li>Maintains sufficient color contrast for readability</li>
              <li>Includes clear, descriptive titles</li>
              <li>Structured with proper heading hierarchy</li>
            </ul>
          </section>
          
          <section id="design-guidelines" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Design Guidelines</h2>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-semibold mb-2">Placement</h3>
                <p>
                  Place alerts at the top of the content they relate to. For form validation, place alerts near the relevant form fields.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Content</h3>
                <p>
                  Keep alert messages clear and concise. Include specific information about what happened and what the user should do next.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Color Usage</h3>
                <p>
                  Use colors consistently to maintain meaning across the application:
                </p>
                <ul class="list-disc pl-6 mt-2">
                  <li><span class="text-blue-600 dark:text-blue-400">Blue</span> for information</li>
                  <li><span class="text-green-600 dark:text-green-400">Green</span> for success</li>
                  <li><span class="text-yellow-600 dark:text-yellow-400">Yellow</span> for warnings</li>
                  <li><span class="text-red-600 dark:text-red-400">Red</span> for errors</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        
        <!-- Table of contents -->
        <div class="w-64 hidden lg:block shrink-0">
          <div class="sticky top-20">
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 class="text-sm font-semibold uppercase text-gray-500 mb-3">On This Page</h3>
              <nav>
                <ul class="space-y-2 text-sm">
                  <li>
                    <a href="#examples" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Examples</a>
                  </li>
                  <li>
                    <a href="#usage" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Usage</a>
                  </li>
                  <li>
                    <a href="#props" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Props</a>
                  </li>
                  <li>
                    <a href="#slots" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Slots</a>
                  </li>
                  <li>
                    <a href="#custom-examples" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Custom Examples</a>
                  </li>
                  <li>
                    <a href="#accessibility" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Accessibility</a>
                  </li>
                  <li>
                    <a href="#design-guidelines" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Design Guidelines</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Component documentation
</script>