<template>
  <NuxtLayout name="design-system">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <NuxtLink to="/design-system/components" class="text-primary-600 dark:text-primary-400 hover:underline">Components</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Badge</span>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Main content -->
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-6">Badge</h1>
          
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Badges are small visual indicators used to highlight status, count, or labels. They help draw attention to important information.
          </p>
          
          <section id="examples" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Examples</h2>
            
            <div class="flex flex-wrap gap-3">
              <Badge type="info">Info</Badge>
              <Badge type="success">Success</Badge>
              <Badge type="warning">Warning</Badge>
              <Badge type="error">Error</Badge>
            </div>
          </section>
          
          <section id="usage" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Usage</h2>
            
            <p class="mb-4">
              Badges should be used to highlight information that needs to stand out from surrounding content. Common use cases include:
            </p>
            
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Status indicators (active, pending, completed)</li>
              <li>Counters (notification count, items in cart)</li>
              <li>Labels (new, featured, sale)</li>
              <li>Tags (categories, attributes)</li>
            </ul>
            
            <CodeGroup>
              <CodeBlock label="Vue" active language="vue">
                <Badge type="info">Info</Badge>
                <Badge type="success">Success</Badge>
                <Badge type="warning">Warning</Badge>
                <Badge type="error">Error</Badge>
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
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type of badge: 'info', 'success', 'warning', 'error'</td>
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
                    <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Content of the badge</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section id="custom-examples" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Custom Examples</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-3">With Numbers</h3>
                <div class="flex flex-wrap gap-3">
                  <Badge type="info">42</Badge>
                  <Badge type="success">7</Badge>
                  <Badge type="warning">99+</Badge>
                </div>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <Badge type="info">42</Badge>
                    <Badge type="success">7</Badge>
                    <Badge type="warning">99+</Badge>
                  </CodeBlock>
                </CodeGroup>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">In Context</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <span>Notifications</span>
                    <Badge type="error">5</Badge>
                  </div>
                  <div class="flex items-center gap-2">
                    <span>Feature</span>
                    <Badge type="info">New</Badge>
                  </div>
                  <div class="flex items-center gap-2">
                    <span>Status</span>
                    <Badge type="success">Active</Badge>
                  </div>
                </div>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <div class="flex items-center gap-2">
                      <span>Notifications</span>
                      <Badge type="error">5</Badge>
                    </div>
                    <div class="flex items-center gap-2">
                      <span>Feature</span>
                      <Badge type="info">New</Badge>
                    </div>
                    <div class="flex items-center gap-2">
                      <span>Status</span>
                      <Badge type="success">Active</Badge>
                    </div>
                  </CodeBlock>
                </CodeGroup>
              </div>
            </div>
          </section>
          
          <section id="accessibility" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
            
            <p class="mb-4">
              The Badge component follows accessibility best practices:
            </p>
            
            <ul class="list-disc pl-6 space-y-2">
              <li>Uses semantic colors to convey meaning</li>
              <li>Maintains sufficient color contrast for readability</li>
              <li>Keeps text readable even at small sizes</li>
              <li>Should be used alongside descriptive text for screen readers</li>
            </ul>
          </section>
          
          <section id="design-guidelines" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Design Guidelines</h2>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-semibold mb-2">Placement</h3>
                <p>
                  Place badges close to the content they relate to. For counters, place badges to the right or top-right of the element.
                  For status indicators, place badges near the item name or title.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Size and Content</h3>
                <p>
                  Keep badge content short and concise. For numbers, use "99+" for large values.
                  Badges should be small enough to not dominate the UI but large enough to be readable.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Color Usage</h3>
                <p>
                  Use colors consistently to maintain meaning across the application:
                </p>
                <ul class="list-disc pl-6 mt-2">
                  <li><span class="text-blue-600 dark:text-blue-400">Blue</span> for information or neutral states</li>
                  <li><span class="text-green-600 dark:text-green-400">Green</span> for success or active states</li>
                  <li><span class="text-yellow-600 dark:text-yellow-400">Yellow</span> for warnings or pending states</li>
                  <li><span class="text-red-600 dark:text-red-400">Red</span> for errors or critical states</li>
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