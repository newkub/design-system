<template>
  <NuxtLayout name="design-system">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/design-system" class="text-primary-600 dark:text-primary-400 hover:underline">Design System</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Theme</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Theme</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Theme tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.
      </p>

      <div class="sticky top-20 bg-white dark:bg-gray-900 z-10 py-4 border-b border-gray-200 dark:border-gray-800 mb-8">
        <div class="flex flex-wrap gap-4">
          <a href="#colors" class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Colors</a>
          <a href="#typography" class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Typography</a>
          <a href="#spacing" class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Spacing</a>
          <a href="#shadows" class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Shadows</a>
          <a href="#border-radius" class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Border Radius</a>
          <a href="#shortcuts" class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Shortcuts</a>
        </div>
      </div>
      
      <!-- Colors -->
      <section class="mb-16" id="colors">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <div class="i-carbon-color-palette text-primary-500"></div>
          Colors
        </h2>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Primary Colors</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" :key="`primary-${shade}`" class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">primary-{{ shade }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ unoConfig.theme.colors.primary[shade] }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div :class="`bg-primary-${shade} h-8 w-16 rounded`"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Grayscale</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" :key="`gray-${shade}`" class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">gray-{{ shade }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ getGrayColor(shade) }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div :class="`bg-gray-${shade} h-8 w-16 rounded`"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Semantic Colors</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">green-500</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">#10b981</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div class="bg-green-500 h-8 w-16 rounded"></div>
                  </td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Success</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">red-500</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">#ef4444</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div class="bg-red-500 h-8 w-16 rounded"></div>
                  </td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Error</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">yellow-500</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">#f59e0b</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div class="bg-yellow-500 h-8 w-16 rounded"></div>
                  </td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Warning</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">blue-500</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">#3b82f6</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div class="bg-blue-500 h-8 w-16 rounded"></div>
                  </td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">Info</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h3 class="text-xl font-semibold mb-4">Color Configuration</h3>
          <p class="mb-4">Colors are defined in the <code>uno.config.ts</code> file:</p>
          <pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
theme: {
  colors: {
    primary: {
      50: '{{ unoConfig.theme.colors.primary[50] }}',
      100: '{{ unoConfig.theme.colors.primary[100] }}',
      200: '{{ unoConfig.theme.colors.primary[200] }}',
      300: '{{ unoConfig.theme.colors.primary[300] }}',
      400: '{{ unoConfig.theme.colors.primary[400] }}',
      500: '{{ unoConfig.theme.colors.primary[500] }}',
      600: '{{ unoConfig.theme.colors.primary[600] }}',
      700: '{{ unoConfig.theme.colors.primary[700] }}',
      800: '{{ unoConfig.theme.colors.primary[800] }}',
      900: '{{ unoConfig.theme.colors.primary[900] }}',
    }
  }
}</pre>
        </div>
        
        <ComponentExample :code="colorUsageCode">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-lg">
              <div class="text-primary-800 dark:text-primary-200 font-medium">Primary Background</div>
            </div>
            <div class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="text-gray-800 dark:text-gray-200 font-medium">Neutral Background</div>
            </div>
            <div class="p-4 bg-white dark:bg-gray-800 border border-primary-500 dark:border-primary-500 rounded-lg">
              <div class="text-primary-500 dark:text-primary-400 font-medium">Primary Border</div>
            </div>
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div class="text-primary-600 dark:text-primary-400 font-medium">Primary Text</div>
            </div>
          </div>
        </ComponentExample>
      </section>
      
      <!-- Typography -->
      <section class="mb-16" id="typography">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <div class="i-carbon-text-font text-primary-500"></div>
          Typography
        </h2>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Font Families</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">font-sans</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ unoConfig.webFonts.sans }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-sans">The quick brown fox jumps over the lazy dog</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">font-mono</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ unoConfig.webFonts.mono }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono">The quick brown fox jumps over the lazy dog</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h3 class="text-xl font-semibold mb-4">Font Configuration</h3>
          <p class="mb-4">Fonts are defined in the <code>uno.config.ts</code> file:</p>
          <pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
presetWebFonts({
  fonts: {
    sans: '{{ unoConfig.webFonts.sans }}',
    mono: '{{ unoConfig.webFonts.mono }}'
  }
})</pre>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Font Sizes</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(size, index) in ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']" :key="size" class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">text-{{ size }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ getFontSizeValue(size) }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div :class="`text-${size}`">The quick brown fox</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Font Weights</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(weight, label) in {normal: 400, medium: 500, semibold: 600, bold: 700}" :key="label" class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">font-{{ label }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ weight }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div :class="`font-${label}`">The quick brown fox jumps over the lazy dog</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <ComponentExample :code="typographyUsageCode">
          <div class="space-y-4">
            <h1 class="text-4xl font-bold">Heading 1</h1>
            <h2 class="text-3xl font-bold">Heading 2</h2>
            <h3 class="text-2xl font-bold">Heading 3</h3>
            <h4 class="text-xl font-semibold">Heading 4</h4>
            <p class="text-base">This is a paragraph of text. It demonstrates the base font size and weight used for body text in the application.</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">This is smaller text often used for captions or secondary information.</p>
          </div>
        </ComponentExample>
      </section>
      
      <!-- Spacing -->
      <section class="mb-16" id="spacing">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <div class="i-carbon-ruler text-primary-500"></div>
          Spacing
        </h2>
        
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Spacing Scale</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                  <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="size in [0, 1, 2, 3, 4, 6, 8, 12, 16]" :key="`spacing-${size}`" class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ size }}</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ size * 0.25 }}rem ({{ size * 4 }}px)</td>
                  <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <div :class="`h-4 bg-primary-200 dark:bg-primary-800`" :style="`width: ${size * 0.25}rem`"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <ComponentExample :code="spacingUsageCode">
          <div class="space-y-4">
            <div class="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-4 (1rem / 16px padding)</div>
            <div class="p-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-6 (1.5rem / 24px padding)</div>
            <div class="p-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-8 (2rem / 32px padding)</div>
            
            <div class="flex gap-4 items-center">
              <div class="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-lg"></div>
              <div class="w-16 h-16 bg-primary-300 dark:bg-primary-700 rounded-lg"></div>
              <div class="w-16 h-16 bg-primary-400 dark:bg-primary-600 rounded-lg"></div>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">gap-4 (1rem / 16px gap)</div>
          </div>
        </ComponentExample>
      </section>
      
      <!-- Shadows -->
      <section class="mb-16" id="shadows">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <div class="i-carbon-shadow text-primary-500"></div>
          Shadows
        </h2>
        
        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shadow in ['sm', 'md', 'lg', 'xl', '2xl']" :key="`shadow-${shadow}`" class="border-b border-gray-200 dark:border-gray-700">
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">shadow-{{ shadow }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ getShadowValue(shadow) }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  <div class="bg-white dark:bg-gray-800 h-16 w-16 rounded" :class="`shadow-${shadow}`"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <ComponentExample :code="shadowUsageCode">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">Card with Shadow</h3>
              <p class="text-gray-600 dark:text-gray-400">This card uses a medium shadow (shadow-md) to create elevation.</p>
            </div>
            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 class="text-lg font-semibold mb-2">Interactive Card</h3>
              <p class="text-gray-600 dark:text-gray-400">This card changes shadow on hover for an interactive effect.</p>
            </div>
          </div>
        </ComponentExample>
      </section>
      
      <!-- Border Radius -->
      <section class="mb-16" id="border-radius">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <div class="i-carbon-corner text-primary-500"></div>
          Border Radius
        </h2>
        
        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Token</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="radius in ['none', 'sm', 'md', 'lg', 'xl', 'full']" :key="`radius-${radius}`" class="border-b border-gray-200 dark:border-gray-700">
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">rounded-{{ radius }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ getBorderRadiusValue(radius) }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  <div :class="`w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-${radius}`"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <ComponentExample :code="radiusUsageCode">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button class="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Rounded Button (lg)
            </button>
            <div class="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
              Rounded Box (xl)
            </div>
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                A
              </div>
              <span>Avatar (full)</span>
            </div>
          </div>
        </ComponentExample>
      </section>
      
      <!-- Shortcuts -->
      <section class="mb-16" id="shortcuts">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <div class="i-carbon-shortcut text-primary-500"></div>
          Shortcuts
        </h2>
        
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h3 class="text-xl font-semibold mb-4">Shortcut Configuration</h3>
          <p class="mb-4">Shortcuts are defined in the <code>uno.config.ts</code> file:</p>
          <pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
shortcuts: {
  'btn': '{{ unoConfig.shortcuts.btn }}',
  'btn-primary': '{{ unoConfig.shortcuts["btn-primary"] }}',
  'btn-outline': '{{ unoConfig.shortcuts["btn-outline"] }}',
}</pre>
        </div>
        
        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Shortcut</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Value</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">btn</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ unoConfig.shortcuts.btn }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  <button class="btn">Button</button>
                </td>
              </tr>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">btn-primary</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ unoConfig.shortcuts["btn-primary"] }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  <button class="btn btn-primary">Primary</button>
                </td>
              </tr>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">btn-outline</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ unoConfig.shortcuts["btn-outline"] }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  <button class="btn btn-outline">Outline</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Import the uno config directly
import unoConfig from '../../uno.config'

// Extract web fonts from the config
const webFonts = {
  sans: 'Inter:400,500,600,700',
  mono: 'Fira Code:400,500,600'
}

// Add the web fonts to the uno config for template access
unoConfig.webFonts = webFonts

// Get gray color values
function getGrayColor(shade: number): string {
  const grayColors = {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
  
  return grayColors[shade] || 'N/A'
}

function getFontSizeValue(size: string): string {
  const sizeMap = {
    'xs': '0.75rem (12px)',
    'sm': '0.875rem (14px)',
    'base': '1rem (16px)',
    'lg': '1.125rem (18px)',
    'xl': '1.25rem (20px)',
    '2xl': '1.5rem (24px)',
    '3xl': '1.875rem (30px)',
    '4xl': '2.25rem (36px)',
    '5xl': '3rem (48px)'
  }
  
  return sizeMap[size] || '1rem (16px)'
}

function getShadowValue(shadow: string): string {
  const shadowMap = {
    'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  }
  
  return shadowMap[shadow] || 'none'
}

function getBorderRadiusValue(radius: string): string {
  const radiusMap = {
    'none': '0px',
    'sm': '0.125rem (2px)',
    'md': '0.375rem (6px)',
    'lg': '0.5rem (8px)',
    'xl': '0.75rem (12px)',
    'full': '9999px'
  }
  
  return radiusMap[radius] || '0px'
}

// Code examples
const colorUsageCode = {
  preview: `<div class="p-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-lg">
  <div class="text-primary-800 dark:text-primary-200 font-medium">Primary Background</div>
</div>

<div class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
  <div class="text-gray-800 dark:text-gray-200 font-medium">Neutral Background</div>
</div>

<div class="p-4 bg-white dark:bg-gray-800 border border-primary-500 dark:border-primary-500 rounded-lg">
  <div class="text-primary-500 dark:text-primary-400 font-medium">Primary Border</div>
</div>

<div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
  <div class="text-primary-600 dark:text-primary-400 font-medium">Primary Text</div>
</div>`,
  vue: `<template>
  <div class="p-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-lg">
    <div class="text-primary-800 dark:text-primary-200 font-medium">Primary Background</div>
  </div>
  
  <div class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div class="text-gray-800 dark:text-gray-200 font-medium">Neutral Background</div>
  </div>
  
  <div class="p-4 bg-white dark:bg-gray-800 border border-primary-500 dark:border-primary-500 rounded-lg">
    <div class="text-primary-500 dark:text-primary-400 font-medium">Primary Border</div>
  </div>
  
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
    <div class="text-primary-600 dark:text-primary-400 font-medium">Primary Text</div>
  </div>
</template>`,
  react: `function ColorExamples() {
  return (
    <>
      <div className="p-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-lg">
        <div className="text-primary-800 dark:text-primary-200 font-medium">Primary Background</div>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="text-gray-800 dark:text-gray-200 font-medium">Neutral Background</div>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 border border-primary-500 dark:border-primary-500 rounded-lg">
        <div className="text-primary-500 dark:text-primary-400 font-medium">Primary Border</div>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-primary-600 dark:text-primary-400 font-medium">Primary Text</div>
      </div>
    </>
  );
}`
}

const typographyUsageCode = {
  preview: `<h1 class="text-4xl font-bold">Heading 1</h1>
<h2 class="text-3xl font-bold">Heading 2</h2>
<h3 class="text-2xl font-bold">Heading 3</h3>
<h4 class="text-xl font-semibold">Heading 4</h4>
<p class="text-base">This is a paragraph of text. It demonstrates the base font size and weight used for body text in the application.</p>
<p class="text-sm text-gray-600 dark:text-gray-400">This is smaller text often used for captions or secondary information.</p>`,
  vue: `<template>
  <h1 class="text-4xl font-bold">Heading 1</h1>
  <h2 class="text-3xl font-bold">Heading 2</h2>
  <h3 class="text-2xl font-bold">Heading 3</h3>
  <h4 class="text-xl font-semibold">Heading 4</h4>
  <p class="text-base">This is a paragraph of text. It demonstrates the base font size and weight used for body text in the application.</p>
  <p class="text-sm text-gray-600 dark:text-gray-400">This is smaller text often used for captions or secondary information.</p>
</template>`,
  react: `function TypographyExamples() {
  return (
    <>
      <h1 className="text-4xl font-bold">Heading 1</h1>
      <h2 className="text-3xl font-bold">Heading 2</h2>
      <h3 className="text-2xl font-bold">Heading 3</h3>
      <h4 className="text-xl font-semibold">Heading 4</h4>
      <p className="text-base">This is a paragraph of text. It demonstrates the base font size and weight used for body text in the application.</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">This is smaller text often used for captions or secondary information.</p>
    </>
  );
}`
}

const spacingUsageCode = {
  preview: `<div class="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-4 (1rem / 16px padding)</div>
<div class="p-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-6 (1.5rem / 24px padding)</div>
<div class="p-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-8 (2rem / 32px padding)</div>

<div class="flex gap-4 items-center">
  <div class="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-lg"></div>
  <div class="w-16 h-16 bg-primary-300 dark:bg-primary-700 rounded-lg"></div>
  <div class="w-16 h-16 bg-primary-400 dark:bg-primary-600 rounded-lg"></div>
</div>
<div class="text-sm text-gray-600 dark:text-gray-400">gap-4 (1rem / 16px gap)</div>`,
  vue: `<template>
  <div class="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-4 (1rem / 16px padding)</div>
  <div class="p-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-6 (1.5rem / 24px padding)</div>
  <div class="p-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-8 (2rem / 32px padding)</div>
  
  <div class="flex gap-4 items-center">
    <div class="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-lg"></div>
    <div class="w-16 h-16 bg-primary-300 dark:bg-primary-700 rounded-lg"></div>
    <div class="w-16 h-16 bg-primary-400 dark:bg-primary-600 rounded-lg"></div>
  </div>
  <div class="text-sm text-gray-600 dark:text-gray-400">gap-4 (1rem / 16px gap)</div>
</template>`,
  react: `function SpacingExamples() {
  return (
    <>
      <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-4 (1rem / 16px padding)</div>
      <div className="p-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-6 (1.5rem / 24px padding)</div>
      <div className="p-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg">p-8 (2rem / 32px padding)</div>
      
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-lg"></div>
        <div className="w-16 h-16 bg-primary-300 dark:bg-primary-700 rounded-lg"></div>
        <div className="w-16 h-16 bg-primary-400 dark:bg-primary-600 rounded-lg"></div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">gap-4 (1rem / 16px gap)</div>
    </>
  );
}`
}

const shadowUsageCode = {
  preview: `<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h3 class="text-lg font-semibold mb-2">Card with Shadow</h3>
  <p class="text-gray-600 dark:text-gray-400">This card uses a medium shadow (shadow-md) to create elevation.</p>
</div>

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
  <h3 class <h3 class="text-lg font-semibold mb-2">Interactive Card</h3>
  <p class="text-gray-600 dark:text-gray-400">This card changes shadow on hover for an interactive effect.</p>
</div>`,
  vue: `<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-2">Card with Shadow</h3>
    <p class="text-gray-600 dark:text-gray-400">This card uses a medium shadow (shadow-md) to create elevation.</p>
  </div>
  
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <h3 class="text-lg font-semibold mb-2">Interactive Card</h3>
    <p class="text-gray-600 dark:text-gray-400">This card changes shadow on hover for an interactive effect.</p>
  </div>
</template>`,
  react: `function ShadowExamples() {
  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Card with Shadow</h3>
        <p className="text-gray-600 dark:text-gray-400">This card uses a medium shadow (shadow-md) to create elevation.</p>
      </div>
      
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
        <p className="text-gray-600 dark:text-gray-400">This card changes shadow on hover for an interactive effect.</p>
      </div>
    </>
  );
}`
}

const radiusUsageCode = {
  preview: `<button class="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
  Rounded Button (lg)
</button>

<div class="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
  Rounded Box (xl)
</div>

<div class="flex items-center gap-2">
  <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
    A
  </div>
  <span>Avatar (full)</span>
</div>`,
  vue: `<template>
  <button class="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
    Rounded Button (lg)
  </button>
  
  <div class="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
    Rounded Box (xl)
  </div>
  
  <div class="flex items-center gap-2">
    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
      A
    </div>
    <span>Avatar (full)</span>
  </div>
</template>`,
  react: `function BorderRadiusExamples() {
  return (
    <>
      <button className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
        Rounded Button (lg)
      </button>
      
      <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
        Rounded Box (xl)
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
          A
        </div>
        <span>Avatar (full)</span>
      </div>
    </>
  );
}`
}
</script>