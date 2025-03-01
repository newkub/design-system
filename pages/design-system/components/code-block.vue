<template>
  <NuxtLayout name="default">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <NuxtLink to="/design-system/components" class="text-primary-600 dark:text-primary-400 hover:underline">Components</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Code Block</span>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Main content -->
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-6">Code Block</h1>
          
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Code Block components display code snippets with syntax highlighting and additional features like copy buttons and language indicators.
          </p>
          
          <section id="examples" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Examples</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-3">Basic Code Block</h3>
                <CodeBlock label="JavaScript" language="js">
                  function greeting(name) {
                    return `Hello, ${name}!`;
                  }
                  
                  console.log(greeting('World'));
                </CodeBlock>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">Code Group with Multiple Languages</h3>
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
            </div>
          </section>
          
          <section id="usage" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Usage</h2>
            
            <p class="mb-4">
              Code blocks are used to display code snippets in documentation, tutorials, and examples. They provide syntax highlighting and other features to make code more readable.
            </p>
            
            <h3 class="text-xl font-semibold mb-3">Basic Usage</h3>
            <CodeGroup>
              <CodeBlock label="Vue" active language="vue">
                <CodeBlock label="JavaScript" language="js">
                  function greeting(name) {
                    return `Hello, ${name}!`;
                  }
                  
                  console.log(greeting('World'));
                </CodeBlock>
              </CodeBlock>
            </CodeGroup>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">With Code Group</h3>
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
          </section>
          
          <section id="components" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Components</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-3">CodeBlock</h3>
                <p class="mb-4">
                  The CodeBlock component displays a single code snippet with syntax highlighting.
                </p>
                
                <div class="overflow-x-auto">
                  <table class="w-full border-collapse">
                    <thead>
                      <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                        <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Prop</th>
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
              
              <div>
                <h3 class="text-xl font-semibold mb-3">CodeGroup</h3>
                <p class="mb-4">
                  The CodeGroup component groups multiple CodeBlock components together with tabs.
                </p>
                
                <div class="overflow-x-auto">
                  <table class="w-full border-collapse">
                    <thead>
                      <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                        <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Slot</th>
                        <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b border-gray-200 dark:border-gray-700">
                        <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">default</td>
                        <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">CodeBlock components to be grouped</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
          
          <section id="features" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Features</h2>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-semibold mb-2">Syntax Highlighting</h3>
                <p>
                  Code blocks use Shiki for syntax highlighting, supporting a wide range of programming languages.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Copy Button</h3>
                <p>
                  Each code block includes a copy button that allows users to easily copy the code to their clipboard.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Language Indicator</h3>
                <p>
                  Code blocks display the programming language in the top-right corner for easy identification.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Line Numbers</h3>
                <p>
                  Line numbers are displayed for each line of code, making it easier to reference specific parts of the code.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Dark Mode Support</h3>
                <p>
                  Code blocks automatically adapt to light and dark mode, ensuring good readability in both themes.
                </p>
              </div>
            </div>
          </section>
          
          <section id="accessibility" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Accessibility</h2>
            
            <p class="mb-4">
              The Code Block components follow accessibility best practices:
            </p>
            
            <ul class="list-disc pl-6 space-y-2">
              <li>Uses semantic HTML elements for structure</li>
              <li>Ensures sufficient color contrast for code syntax highlighting</li>
              <li>Provides keyboard navigation for code group tabs</li>
              <li>Includes accessible labels for copy buttons</li>
            </ul>
          </section>
          
          <section id="design-guidelines" class="mb-12">
            <h2 class="text-2xl font-bold mb-6">Design Guidelines</h2>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-semibold mb-2">Placement</h3>
                <p>
                  Place code blocks within the flow of content, typically after explanatory text that introduces the code.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Sizing</h3>
                <p>
                  Code blocks should be wide enough to accommodate the code without excessive horizontal scrolling.
                  For longer code snippets, consider showing only the relevant parts or breaking it into smaller, focused examples.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-2">Language Selection</h3>
                <p>
                  When using code groups with multiple languages, order the tabs by popularity or relevance to your audience.
                  The most commonly used language should be the first tab and active by default.
                </p>
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
                    <a href="#components" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Components</a>
                  </li>
                  <li>
                    <a href="#features" class="block py-1 hover:text-primary-600 dark:hover:text-primary-400">Features</a>
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