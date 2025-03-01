<template>
  <NuxtLayout name="design-system">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <NuxtLink to="/design-system/components" class="text-primary-600 dark:text-primary-400 hover:underline">Components</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Button</span>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Main content -->
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-6">Button</h1>
          
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Buttons allow users to take actions and make choices with a single tap. They communicate calls to action and allow users to interact with the application.
          </p>
          
          <section id="examples" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Examples</h2>
            
            <div class="flex flex-wrap gap-4">
              <button class="btn btn-primary">Primary</button>
              <button class="btn btn-outline">Outline</button>
              <button class="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Secondary</button>
              <button class="py-2 px-4 text-primary-600 dark:text-primary-400 hover:underline">Text Button</button>
            </div>
          </section>
          
          <section id="usage" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Usage</h2>
            
            <p class="mb-4">
              Buttons should be used for important actions that users need to take. The style of the button should match the importance of the action:
            </p>
            
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Primary:</strong> For the main action on a page or in a section</li>
              <li><strong>Outline:</strong> For secondary actions that are still important</li>
              <li><strong>Secondary:</strong> For less important actions</li>
              <li><strong>Text:</strong> For the least important actions or in space-constrained areas</li>
            </ul>
            
            <CodeGroup>
              <CodeBlock label="Vue" active language="vue">
                <button class="btn btn-primary">Primary</button>
                <button class="btn btn-outline">Outline</button>
                <button class="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Secondary</button>
                <button class="py-2 px-4 text-primary-600 dark:text-primary-400 hover:underline">Text Button</button>
              </CodeBlock>
            </CodeGroup>
          </section>
          
          <section id="variants" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Variants</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-3">Sizes</h3>
                <div class="flex flex-wrap items-center gap-4">
                  <button class="py-1 px-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600">Small</button>
                  <button class="btn btn-primary">Default</button>
                  <button class="py-3 px-6 text-lg bg-primary-500 text-white rounded-lg hover:bg-primary-600">Large</button>
                </div>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <button class="py-1 px-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600">Small</button>
                    <button class="btn btn-primary">Default</button>
                    <button class="py-3 px-6 text-lg bg-primary-500 text-white rounded-lg hover:bg-primary-600">Large</button>
                  </CodeBlock>
                </CodeGroup>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">With Icons</h3>
                <div class="flex flex-wrap gap-4">
                  <button class="btn btn-primary flex items-center gap-2">
                    <div class="i-carbon-add"></div>
                    <span>Add Item</span>
                  </button>
                  <button class="btn btn-outline flex items-center gap-2">
                    <span>Download</span>
                    <div class="i-carbon-download"></div>
                  </button>
                  <button class="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600">
                    <div class="i-carbon-edit"></div>
                  </button>
                </div>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <button class="btn btn-primary flex items-center gap-2">
                      <div class="i-carbon-add"></div>
                      <span>Add Item</span>
                    </button>
                    <button class="btn btn-outline flex items-center gap-2">
                      <span>Download</span>
                      <div class="i-carbon-download"></div>
                    </button>
                    <button class="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600">
                      <div class="i-carbon-edit"></div>
                    </button>
                  </CodeBlock>
                </CodeGroup>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">States</h3>
                <div class="flex flex-wrap gap-4">
                  <button class="btn btn-primary">Default</button>
                  <button class="btn btn-primary opacity-70 cursor-not-allowed">Disabled</button>
                  <button class="btn btn-primary flex items-center gap-2">
                    <div class="i-carbon-circle-dash animate-spin"></div>
                    <span>Loading</span>
                  </button>
                </div>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <button class="btn btn-primary">Default</button>
                    <button class="btn btn-primary opacity-70 cursor-not-allowed">Disabled</button>
                    <button class="btn btn-primary flex items-center gap-2">
                      <div class="i-carbon-circle-dash animate-spin"></div>
                      <span>Loading</span>
                    </button>
                  </CodeBlock>
                </CodeGroup>
              </div>
            </div>
          </section>
          
          <section id="button-groups" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Button Groups</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-3">Horizontal Group</h3>
                <div class="inline-flex rounded-md shadow-sm">
                  <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                    Day
                  </button>
                  <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                    Week
                  </button>
                  <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                    Month
                  </button>
                </div>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <div class="inline-flex rounded-md shadow-sm">
                      <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                        Day
                      </button>
                      <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                        Week
                      </button>
                      <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                        Month
                      </button>
                    </div>
                  </CodeBlock>
                </CodeGroup>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">Action Group</h3>
                <div class="flex gap-4">
                  <button class="btn btn-outline">Cancel</button>
                  <button class="btn btn-primary">Save</button>
                </div>
                
                <CodeGroup class="mt-4">
                  <CodeBlock label="Vue" active language="vue">
                    <div class="flex gap-4">
                      <button class="btn btn-outline">Cancel</button>
                      <button class="btn btn-primary">Save</button>
                    </div>
                  </CodeBlock>
                </CodeGroup>
              </div>
            </div>
          </section>
          
          <section id="accessibility" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
            
            <p class="mb-4">
              Buttons should be accessible to all users:
            </p>
            
            <ul class="list-disc pl-6 space-y-2">
              <li>Use semantic <code>&lt;button&gt;</code> elements for actions</li>
              <li>Ensure buttons have descriptive text that explains their action</li>
              <li>Maintain sufficient color contrast between button text and background</li>
              <li>Provide visual feedback for hover, focus, and active states</li>
              <li>Ensure buttons are keyboard accessible and have focus styles</li>
              <li>For icon-only buttons, include aria-label attributes</li>
            </ul>
          </section>
          
          <section id="design-guidelines" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Design Guidelines</h2>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-semibold mb-2">Button Hierarchy</h3>
                <p>
                  Establish a clear visual hierarchy of buttons to guide users through the interface:
                </p>
                <ul class="list-disc pl-6 mt-2">
                  <li>Use primary buttons for the main action on a page</li>
                  <li>Use outline or secondary buttons for alternative actions</li>
                  <li>Limit the number of primary buttons on a page to avoid confusion</li>
                  <li>Group related actions together</li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Labeling</h3>
                <p>
                  Button labels should be clear and action-oriented:
                </p>
                <ul class="list-disc pl-6 mt-2">
                  <li>Use verbs that describe the action (e.g., "Save", "Delete", "Create")</li>
                  <li>Keep labels short and concise</li>
                  <li>Be specific about the action (e.g., "Save Changes" instead of just "Save")</li>
                  <li>Use sentence case for button labels</li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Placement</h3>
                <p>
                  Button placement should be consistent and follow common patterns:
                </p>
                <ul class="list-disc pl-6 mt-2">
                  <li>Place primary actions on the right in action groups</li>
                  <li>Align form buttons with the form fields</li>
                  <li>Position the most important buttons where they are easily accessible</li>
                  <li>Maintain consistent button placement across similar interfaces</li>
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
                    <a href="#variants" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Variants</a>
                  </li>
                  <li>
                    <a href="#button-groups" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Button Groups</a>
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