<script setup lang="ts">
import Button from './components/Button.vue'
import Alert from './components/Alert.vue'
import TableOfContents from './components/TableOfContents.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import Navbar from './components/Navbar.vue'
import ComponentsSection from './components/ComponentsSection.vue'
import ThemeCustomizer from './components/ThemeCustomizer.vue'
import { ref } from 'vue'

const themeCustomizerRef = ref<InstanceType<typeof ThemeCustomizer> | null>(null)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const openThemeCustomizer = () => {
  if (themeCustomizerRef.value) {
    themeCustomizerRef.value.toggleCustomizer()
  }
}
</script>

<template>
  <!-- Skip to content link for keyboard users -->
  <a href="#main-content" class="skip-to-content">Skip to content</a>
  
  <div class="min-h-screen font-sans">
    <Navbar />

    <div class="container-content py-8 flex flex-col lg:flex-row">
      <aside class="w-full lg:w-64 lg:sticky lg:top-20 lg:self-start">
        <TableOfContents />
      </aside>

      <main id="main-content" class="flex-1 max-w-3xl mx-auto" tabindex="-1">
        <!-- Introduction Section -->
        <section id="introduction" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Introduction</h2>
          <p class="mb-4 text-foreground">
            This is a simple design system built with Vue 3, TypeScript, and UnoCSS. It includes reusable components
            like buttons and alerts that you can use in your projects.
          </p>
          <Alert title="Welcome!" type="info" class="mt-4">
            This design system is a starting point for your project. Feel free to customize it to fit your needs.
          </Alert>
        </section>

         <!-- Usage Section -->
        <section id="usage" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Usage</h2>
          <p class="mb-4 text-foreground">
            To use these components in your Vue application, simply import them from the components directory.
          </p>

          <div class="bg-muted p-4 rounded-md">
            <pre class="text-sm text-foreground">
import Button from './components/Button.vue'
import Alert from './components/Alert.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ThemeCustomizer from './components/ThemeCustomizer.vue'

// Then use them in your template
&lt;Button variant="primary"&gt;Click Me&lt;/Button&gt;
&lt;Alert type="success" title="Great job!"&gt;Your action was successful.&lt;/Alert&gt;
&lt;ThemeToggle /&gt;
&lt;ThemeCustomizer /&gt;
            </pre>
          </div>
        </section>

        <!-- Customization Section -->
        <section id="customization" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Theme Customization</h2>
          <p class="mb-4 text-foreground">
            You can customize the design system by modifying the CSS variables in the <code>style.css</code> file
            or by updating the UnoCSS configuration in the <code>uno.config.ts</code> file.
          </p>
          <p class="mb-4 text-foreground">
            You can also use the theme customizer below to change colors, typography, spacing, and more in real-time.
          </p>
          
          <div class="card p-6 mt-6 flex flex-col items-center">
            <h3 class="text-xl font-heading font-semibold mb-4">Try the Theme Customizer</h3>
            <p class="text-center mb-6">Click on the button below to open the customizer panel</p>
            <div class="flex justify-center">
              <Button 
                variant="primary" 
                @click="openThemeCustomizer"
                class="flex items-center gap-2"
              >
                <div class="i-mdi-palette text-lg"></div>
                Open Theme Customizer
              </Button>
              <ThemeCustomizer ref="themeCustomizerRef" />
            </div>
          </div>
          
          <div class="card p-4 mt-6">
            <h3 class="text-xl font-heading font-semibold mb-3">Theme Customization Options</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Colors - Primary, secondary, and accent colors for UI elements</li>
              <li>Typography - Font families, sizes, and scales</li>
              <li>Spacing & Borders - Control spacing units and border radius</li>
              <li>Effects & Animation - Shadow intensity and animation settings</li>
              <li>Layout - Container width and grid columns</li>
            </ul>
            <p class="mt-3">
              Your customizations are saved to your browser's local storage and will persist between visits.
              You can also save your customizations as presets for quick switching between different themes.
            </p>
          </div>
        </section>

        <!-- Components Section -->
        <ComponentsSection />
        
       </main>
    </div>
  </div>
</template>