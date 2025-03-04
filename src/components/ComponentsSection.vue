<script setup lang="ts">
import ComponentPreview from './ComponentPreview.vue'
import Button from './Button.vue'
import Alert from './Alert.vue'

// Sample code strings for the components
const buttonCode = `<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="success">Success Button</Button>
<Button variant="warning">Warning Button</Button>
<Button variant="danger">Danger Button</Button>
<Button variant="outline-primary">Outline Button</Button>

<!-- Button Sizes -->
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>

<!-- Disabled State -->
<Button variant="primary" disabled>Disabled</Button>`

const alertCode = `<Alert type="info" title="Information">
  This is an information alert.
</Alert>

<Alert type="success" title="Success">
  This is a success alert.
</Alert>

<Alert type="warning" title="Warning">
  This is a warning alert.
</Alert>

<Alert type="danger" title="Danger">
  This is a danger alert.
</Alert>

<!-- Dismissible Alert -->
<Alert type="info" title="Dismissible Alert" dismissible>
  This alert can be dismissed by clicking the close button.
</Alert>`
</script>

<template>
  <section id="components" class="mb-12">
    <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Components</h2>
    <p class="mb-8 text-foreground">
      Our design system includes a set of reusable components that you can use to build your applications.
      Each component is designed to be accessible, responsive, and customizable.
    </p>
    
    <!-- Buttons Component Preview -->
    <ComponentPreview 
      title="Buttons" 
      description="Buttons are used to trigger actions or events. They come in different variants and sizes."
      :code="buttonCode"
      component-name="Button"
    >
      <div class="space-y-8">
        <div>
          <h4 class="text-lg font-semibold mb-4">Button Variants</h4>
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline-primary">Outline</Button>
          </div>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">Button Sizes</h4>
          <div class="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">Button States</h4>
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Normal</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </ComponentPreview>
    
    <!-- Alerts Component Preview -->
    <ComponentPreview 
      title="Alerts" 
      description="Alerts are used to provide feedback to the user. They come in different types and can be dismissible."
      :code="alertCode"
      component-name="Alert"
    >
      <div class="space-y-4">
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
        <Alert type="info" title="Dismissible Alert" dismissible>
          This alert can be dismissed by clicking the close button.
        </Alert>
      </div>
    </ComponentPreview>
  </section>
</template>