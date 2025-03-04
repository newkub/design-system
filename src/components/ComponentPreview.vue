<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from './Button.vue'

const props = defineProps<{
  title: string
  description?: string
  code: string
  componentName?: string
}>()

const isCodeVisible = ref(false)
const responsiveMode = ref('desktop') // desktop, tablet, mobile

const toggleCode = () => {
  isCodeVisible.value = !isCodeVisible.value
}

const setResponsiveMode = (mode: string) => {
  responsiveMode.value = mode
}

const previewClasses = computed(() => {
  switch (responsiveMode.value) {
    case 'mobile':
      return 'w-full max-w-[375px] mx-auto'
    case 'tablet':
      return 'w-full max-w-[768px] mx-auto'
    default:
      return 'w-full'
  }
})

const formatCode = (code: string) => {
  return code.trim()
}
</script>

<template>
  <div class="component-preview mb-8 border border-border rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-card border-b border-border p-4">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h3 class="text-lg font-heading font-semibold">{{ title }}</h3>
          <p v-if="description" class="text-sm text-muted-foreground mt-1">{{ description }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
          <!-- Responsive Controls -->
          <div class="flex border border-border rounded-md overflow-hidden">
            <button 
              @click="setResponsiveMode('desktop')" 
              class="p-2 text-sm transition-colors"
              :class="responsiveMode === 'desktop' ? 'bg-primary text-white' : 'bg-card hover:bg-muted'"
              aria-label="Desktop view"
            >
              <div class="i-mdi-monitor text-lg"></div>
            </button>
            <button 
              @click="setResponsiveMode('tablet')" 
              class="p-2 text-sm transition-colors"
              :class="responsiveMode === 'tablet' ? 'bg-primary text-white' : 'bg-card hover:bg-muted'"
              aria-label="Tablet view"
            >
              <div class="i-mdi-tablet text-lg"></div>
            </button>
            <button 
              @click="setResponsiveMode('mobile')" 
              class="p-2 text-sm transition-colors"
              :class="responsiveMode === 'mobile' ? 'bg-primary text-white' : 'bg-card hover:bg-muted'"
              aria-label="Mobile view"
            >
              <div class="i-mdi-cellphone text-lg"></div>
            </button>
          </div>
          
          <!-- Code Toggle -->
          <Button 
            variant="outline-primary" 
            size="sm" 
            @click="toggleCode"
            class="flex items-center gap-1"
          >
            <div class="i-mdi-code-tags text-lg"></div>
            <span class="hidden sm:inline">{{ isCodeVisible ? 'Hide Code' : 'View Code' }}</span>
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Preview Area -->
    <div class="bg-background p-4 sm:p-6 border-b border-border">
      <div class="preview-container">
        <div :class="previewClasses" class="transition-all duration-300">
          <slot></slot>
        </div>
      </div>
    </div>
    
    <!-- Code Area -->
    <div v-if="isCodeVisible" class="bg-muted p-4">
      <div class="code-container">
        <pre class="text-sm text-foreground"><code>{{ formatCode(code) }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-preview {
  max-width: 100%;
}

.preview-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
}

.code-container {
  width: 100%;
  overflow-x: auto;
}

/* Improve code display */
pre {
  white-space: pre-wrap;
  word-break: break-word;
  padding-bottom: 0.5rem;
}

pre code {
  display: block;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .component-preview {
    border-radius: var(--radius-md);
  }
}
</style>