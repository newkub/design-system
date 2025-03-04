<script setup lang="ts">
import Button from '../ui/Button.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold">Buttons</h1>
      <p class="text-text-secondary mt-2">Versatile button components with different variants, sizes, and states.</p>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Button Variants</h2>
      
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Button Sizes</h2>
      
      <div class="flex flex-wrap gap-4 items-center">
        <Button size="small">Small</Button>
        <Button size="default">Default</Button>
        <Button size="large">Large</Button>
      </div>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Button with Icon</h2>
      
      <div class="flex flex-wrap gap-4 items-center">
        <Button>
          <Icon icon="carbon:add" class="mr-2 h-4 w-4" />
          Button with Icon
        </Button>
        
        <Button variant="outline">
          <Icon icon="carbon:download" class="mr-2 h-4 w-4" />
          Download
        </Button>
        
        <Button variant="primary" icon>
          <Icon icon="carbon:add" class="h-4 w-4" />
        </Button>
        
        <Button variant="outline" icon>
          <Icon icon="carbon:settings" class="h-4 w-4" />
        </Button>
      </div>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Disabled State</h2>
      
      <div class="flex flex-wrap gap-4">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Usage Example</h2>
      
      <div class="p-4 border border-border rounded-md bg-bg-primary">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium">Confirm your action</h3>
          <Button variant="ghost" icon>
            <Icon icon="carbon:close" class="h-4 w-4" />
          </Button>
        </div>
        <p class="text-text-secondary mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div class="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
    </div>
  </div>
</template>