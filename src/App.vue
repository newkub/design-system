<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useStorage } from '@vueuse/core'
import Navbar from './components/layout/Navbar.vue'
import TableOfContents from './components/layout/TableOfContents.vue'
import ComponentPreview from './components/layout/ComponentPreview.vue'
import ButtonDemo from './components/demos/ButtonDemo.vue'
import AlertDemo from './components/demos/AlertDemo.vue'

const isDark = useStorage('design-system-dark-mode', false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// Initialize dark mode based on stored preference
if (isDark.value) {
  document.documentElement.classList.add('dark')
}

const components = [
  { id: 'buttons', title: 'Buttons', component: ButtonDemo },
  { id: 'alerts', title: 'Alerts', component: AlertDemo },
]

const activeComponent = ref(components[0])

// Track scroll position to update active component
const componentRefs = ref<Record<string, HTMLElement | null>>({})
const registerComponentRef = (id: string, el: HTMLElement | null) => {
  componentRefs.value[id] = el
}

const handleScroll = () => {
  const scrollPosition = window.scrollY + 100 // Add offset for navbar

  // Find the component that is currently in view
  for (const component of components) {
    const element = componentRefs.value[component.id]
    if (!element) continue

    const { top, bottom } = element.getBoundingClientRect()
    
    if (top <= 100 && bottom > 0) {
      activeComponent.value = component
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToComponent = (component: typeof activeComponent.value) => {
  const element = componentRefs.value[component.id]
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for navbar
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :is-dark="isDark" @toggle-theme="toggleDarkMode" />
    
    <div class="flex flex-1 overflow-hidden">
      <TableOfContents 
        :components="components" 
        :active-component="activeComponent" 
        @select="scrollToComponent" 
      />
      
      <main class="flex-1 overflow-y-auto p-6">
        <div v-for="component in components" :key="component.id" :ref="el => registerComponentRef(component.id, el)">
          <component :is="component.component" />
        </div>
      </main>
    </div>
  </div>
</template>