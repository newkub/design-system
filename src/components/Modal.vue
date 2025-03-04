<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  show: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Handle escape key to close modal
const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.show) {
    emit('close')
  }
}

// Prevent body scrolling when modal is open
watch(() => props.show, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Add event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

// Clean up event listeners
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.body.style.overflow = ''
})

// Get max width class based on prop
const getMaxWidthClass = () => {
  switch (props.maxWidth) {
    case 'sm': return 'max-w-md'
    case 'md': return 'max-w-lg'
    case 'lg': return 'max-w-2xl'
    case 'xl': return 'max-w-4xl'
    case 'full': return 'max-w-full'
    default: return 'max-w-2xl'
  }
}
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-black/50 transition-opacity" 
          @click="emit('close')"
          aria-hidden="true"
        ></div>
        
        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div 
              v-if="show"
              :class="['relative transform overflow-hidden rounded-lg bg-card text-left shadow-xl transition-all sm:my-8 w-full', getMaxWidthClass()]"
            >
              <!-- Header -->
              <div v-if="title" class="flex items-center justify-between p-4 border-b border-border">
                <h3 class="text-lg font-heading font-semibold text-primary">{{ title }}</h3>
                <button 
                  @click="emit('close')" 
                  class="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <div class="i-mdi-close text-lg"></div>
                </button>
              </div>
              
              <!-- Content -->
              <div>
                <slot></slot>
              </div>
              
              <!-- Footer -->
              <div v-if="$slots.footer" class="bg-muted/30 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-border">
                <slot name="footer"></slot>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </Teleport>
</template>