<script setup lang="ts">
import Button from './components/Button.vue'
import Alert from './components/Alert.vue'
import TableOfContents from './components/TableOfContents.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ThemeCustomizer from './components/ThemeCustomizer.vue'
import ThemeModeSwitcher from './components/ThemeModeSwitcher.vue'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <!-- Skip to content link for keyboard users -->
  <a href="#main-content" class="skip-to-content">Skip to content</a>
  
  <div class="min-h-screen font-sans">
    <header class="bg-card shadow-sm border-b border-border sticky top-0 z-20">
      <div class="container-content py-3 flex justify-between items-center">
        <a 
          href="#" 
          @click.prevent="scrollToTop" 
          class="flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label="Design System - Back to top"
        >
          <div class="i-mdi-palette-swatch text-primary text-3xl"></div>
          <h1 class="text-xl md:text-2xl font-heading font-bold text-primary">Design System</h1>
        </a>
        <div class="flex items-center gap-3">
          <ThemeToggle />
          <ThemeCustomizer />
          <a href="https://github.com/yourusername/design-system" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-colors" aria-label="View on GitHub">
            <div class="i-mdi-github text-muted-foreground text-xl"></div>
          </a>
        </div>
      </div>
    </header>

    <div class="container-content py-8 flex flex-col lg:flex-row">
      <aside class="w-full lg:w-64 lg:sticky lg:top-20 lg:self-start">
        <TableOfContents />
      </aside>

      <main id="main-content" class="flex-1 max-w-3xl mx-auto" tabindex="-1">
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

        <section id="theme" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Theme System</h2>
          <p class="mb-4 text-foreground">
            Our design system supports both light and dark modes. You can toggle between them using the theme switch in the header.
          </p>
          <div class="card mb-6">
            <h3 class="text-xl font-heading font-semibold mb-3">Theme Variables</h3>
            <p class="mb-4">
              All colors and design tokens are defined as CSS variables, making it easy to customize the theme.
            </p>
            <div class="flex gap-4 flex-wrap">
              <Button variant="primary" @click="document.documentElement.classList.toggle('dark')">
                Toggle Theme
              </Button>
            </div>
          </div>
        </section>

        <section id="colors" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Color Tokens</h2>
          <p class="mb-4 text-foreground">
            Our design system uses two main colors: primary (blue) and secondary (purple), along with utility colors for different states.
          </p>

          <h3 id="primary-colors" class="text-2xl font-heading font-semibold mt-8 mb-4 text-primary">Primary Colors</h3>
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="flex flex-col items-center">
              <div class="bg-primary-light w-16 h-16 rounded-md shadow-sm"></div>
              <span class="text-sm mt-1">Light</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="bg-primary w-16 h-16 rounded-md shadow-sm"></div>
              <span class="text-sm mt-1">Default</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="bg-primary-dark w-16 h-16 rounded-md shadow-sm"></div>
              <span class="text-sm mt-1">Dark</span>
            </div>
          </div>

          <h3 id="secondary-colors" class="text-2xl font-heading font-semibold mt-8 mb-4 text-secondary">Secondary Colors</h3>
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="flex flex-col items-center">
              <div class="bg-secondary-light w-16 h-16 rounded-md shadow-sm"></div>
              <span class="text-sm mt-1">Light</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="bg-secondary w-16 h-16 rounded-md shadow-sm"></div>
              <span class="text-sm mt-1">Default</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="bg-secondary-dark w-16 h-16 rounded-md shadow-sm"></div>
              <span class="text-sm mt-1">Dark</span>
            </div>
          </div>

          <h3 id="semantic-colors" class="text-2xl font-heading font-semibold mt-8 mb-4 text-primary">Semantic Colors</h3>
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="card p-4 flex flex-col items-center">
              <div class="bg-background w-16 h-16 rounded-md shadow-sm border border-border"></div>
              <span class="text-sm mt-2">Background</span>
            </div>
            <div class="card p-4 flex flex-col items-center">
              <div class="bg-card w-16 h-16 rounded-md shadow-sm border border-border"></div>
              <span class="text-sm mt-2">Card</span>
            </div>
            <div class="card p-4 flex flex-col items-center">
              <div class="bg-muted w-16 h-16 rounded-md shadow-sm"></div>
              <span class="text-sm mt-2">Muted</span>
            </div>
          </div>
        </section>

        <section id="typography" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Typography</h2>
          <p class="mb-4 text-foreground">
            We use Inter for body text and Montserrat for headings to create a clear visual hierarchy.
          </p>

          <div class="space-y-6 mb-8">
            <div>
              <h1 class="font-heading text-4xl font-bold text-primary">Heading 1</h1>
              <p class="text-sm text-muted-foreground mt-1">font-heading, text-4xl, font-bold</p>
            </div>
            <div>
              <h2 class="font-heading text-3xl font-bold text-primary">Heading 2</h2>
              <p class="text-sm text-muted-foreground mt-1">font-heading, text-3xl, font-bold</p>
            </div>
            <div>
              <h3 class="font-heading text-2xl font-semibold text-primary">Heading 3</h3>
              <p class="text-sm text-muted-foreground mt-1">font-heading, text-2xl, font-semibold</p>
            </div>
            <div>
              <p class="text-base">Body text uses the Inter font family for optimal readability across devices and screen sizes.</p>
              <p class="text-sm text-muted-foreground mt-1">font-sans, text-base</p>
            </div>
          </div>
        </section>

        <section id="spacing" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Spacing</h2>
          <p class="mb-4 text-foreground">
            Our spacing system is based on a simple small, medium, and large scale.
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-center">
              <div class="w-sm h-8 bg-primary rounded-md"></div>
              <span class="ml-4 text-sm">Spacing Small (0.5rem)</span>
            </div>
            <div class="flex items-center">
              <div class="w-md h-8 bg-primary rounded-md"></div>
              <span class="ml-4 text-sm">Spacing Medium (1rem)</span>
            </div>
            <div class="flex items-center">
              <div class="w-lg h-8 bg-primary rounded-md"></div>
              <span class="ml-4 text-sm">Spacing Large (2rem)</span>
            </div>
          </div>
        </section>

        <section id="radius" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Border Radius</h2>
          <p class="mb-4 text-foreground">
            We use a consistent border radius system to create a cohesive look and feel.
          </p>

          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-primary rounded-sm"></div>
              <span class="text-sm mt-2">Small</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-primary rounded-md"></div>
              <span class="text-sm mt-2">Medium (Default)</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-primary rounded-lg"></div>
              <span class="text-sm mt-2">Large</span>
            </div>
          </div>
        </section>

        <section id="buttons" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Buttons</h2>
          <p class="mb-4 text-foreground">
            Buttons are used to trigger actions or events. They come in different variants and sizes.
          </p>

          <h3 id="button-variants" class="text-2xl font-heading font-semibold mt-8 mb-4 text-primary">Button Variants</h3>
          <div class="flex flex-wrap gap-4 mb-8">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline-primary">Outline</Button>
          </div>

          <h3 id="button-sizes" class="text-2xl font-heading font-semibold mt-8 mb-4 text-primary">Button Sizes</h3>
          <div class="flex flex-wrap gap-4 items-center mb-8">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>

          <h3 id="button-states" class="text-2xl font-heading font-semibold mt-8 mb-4 text-primary">Button States</h3>
          <div class="flex flex-wrap gap-4 mb-8">
            <Button variant="primary">Normal</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        <section id="alerts" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Alerts</h2>
          <p class="mb-4 text-foreground">
            Alerts are used to provide feedback to the user. They come in different types and can be dismissible.
          </p>

          <h3 id="alert-types" class="text-2xl font-heading font-semibold mt-8 mb-4 text-primary">Alert Types</h3>
          <div class="space-y-4 mb-8">
            <Alert type="info" title="Information">
              This is an information alert. It provides general information to the user.
            </Alert>
            <Alert type="success" title="Success">
              This is a success alert. It indicates that an action was completed successfully.
            </Alert>
            <Alert type="warning" title="Warning">
              This is a warning alert. It indicates that something might need attention.
            </Alert>
            <Alert type="danger" title="Danger">
              This is a danger alert. It indicates that something went wrong or needs immediate attention.
            </Alert>
          </div>

          <h3 id="dismissible-alerts" class="text-2xl font-heading font-semibold mt-8 mb-4 text-primary">Dismissible Alerts</h3>
          <div class="space-y-4 mb-8">
            <Alert type="info" title="Dismissible Alert" dismissible>
              This alert can be dismissed by clicking the close button.
            </Alert>
          </div>
        </section>

        <section id="icons" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Icons</h2>
          <p class="mb-4 text-foreground">
            We use Material Design Icons through UnoCSS's icon preset.
          </p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="flex flex-col items-center p-4 bg-muted rounded-md">
              <div class="i-mdi-home text-3xl text-primary"></div>
              <span class="text-sm mt-2">i-mdi-home</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-muted rounded-md">
              <div class="i-mdi-account text-3xl text-primary"></div>
              <span class="text-sm mt-2">i-mdi-account</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-muted rounded-md">
              <div class="i-mdi-cog text-3xl text-primary"></div>
              <span class="text-sm mt-2">i-mdi-cog</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-muted rounded-md">
              <div class="i-mdi-bell text-3xl text-primary"></div>
              <span class="text-sm mt-2">i-mdi-bell</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-muted rounded-md">
              <div class="i-mdi-white-balance-sunny text-3xl text-yellow-400"></div>
              <span class="text-sm mt-2">i-mdi-white-balance-sunny</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-muted rounded-md">
              <div class="i-mdi-moon-waning-crescent text-3xl text-primary"></div>
              <span class="text-sm mt-2">i-mdi-moon-waning-crescent</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-muted rounded-md">
              <div class="i-mdi-palette text-3xl text-primary"></div>
              <span class="text-sm mt-2">i-mdi-palette</span>
            </div>
          </div>
        </section>

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
import ThemeModeSwitcher from './components/ThemeModeSwitcher.vue'

// Then use them in your template
&lt;Button variant="primary"&gt;Click Me&lt;/Button&gt;
&lt;Alert type="success" title="Great job!"&gt;Your action was successful.&lt;/Alert&gt;
&lt;ThemeToggle /&gt;
&lt;ThemeCustomizer /&gt;
&lt;ThemeModeSwitcher /&gt;
            </pre>
          </div>
        </section>

        <section id="customization" class="mb-12">
          <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Customization</h2>
          <p class="mb-4 text-foreground">
            You can customize the design system by modifying the CSS variables in the <code>style.css</code> file
            or by updating the UnoCSS configuration in the <code>uno.config.ts</code> file.
          </p>
          <p class="mb-4 text-foreground">
            You can also use the theme customizer in the header to change colors, typography, spacing, and more in real-time.
            Click on the palette icon to open the customizer panel.
          </p>
          <div class="card p-4 mt-4">
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
      </main>
    </div>
  </div>
</template>