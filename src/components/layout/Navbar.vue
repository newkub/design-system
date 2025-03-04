<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ThemeCustomizer from './ThemeCustomizer.vue'

defineProps<{
  isDark: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleTheme'): void
}>()

const showCustomizer = ref(false)

const toggleCustomizer = () => {
  showCustomizer.value = !showCustomizer.value
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-bg-primary shadow-sm">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 flex items-center justify-center bg-primary rounded-md text-text-inverted">
          <Icon icon="carbon:palette" class="text-2xl" />
        </div>
        <h1 class="text-xl font-bold">Design System</h1>
      </div>
      
      <div class="flex items-center gap-4">
        <button 
          class="p-2 rounded-full hover:bg-bg-muted transition-colors"
          @click="emit('toggleTheme')"
          title="Toggle theme"
        >
          <Icon :icon="isDark ? 'carbon:sun' : 'carbon:moon'" class="text-xl" />
        </button>
        
        <button 
          class="p-2 rounded-full hover:bg-bg-muted transition-colors"
          @click="toggleCustomizer"
          title="Customize theme"
        >
          <Icon icon="carbon:settings-adjust" class="text-xl" />
        </button>
      </div>
    </div>
    
    <ThemeCustomizer v-if="showCustomizer" @close="showCustomizer = false" />
  </header>
</template>