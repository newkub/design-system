<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, PropType } from 'vue'

// Define section interface
interface Section {
  id: string
  label: string
  subsections?: Section[]
}

// Define props
const props = defineProps({
  sections: {
    type: Array as PropType<Section[]>,
    required: false,
    default: () => []
  },
  defaultActiveSection: {
    type: String,
    default: ''
  }
})

const activeSection = ref(props.defaultActiveSection || (props.sections.length > 0 ? props.sections[0].id : ''))
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu when a link is clicked
const handleLinkClick = (sectionId: string) => {
  activeSection.value = sectionId
  if (window.innerWidth < 1024) { // lg breakpoint
    isMobileMenuOpen.value = false
  }
  
  // Scroll to the section with offset for the fixed header
  const section = document.getElementById(sectionId)
  if (section) {
    const headerHeight = 60 // Approximate header height
    const mobileNavHeight = 48 // Approximate mobile nav height
    const offset = headerHeight + mobileNavHeight
    
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: sectionTop - offset,
      behavior: 'smooth'
    })
  }
}

// Update active section based on scroll position
const updateActiveSection = () => {
  const sections = document.querySelectorAll('section[id]')
  
  // Get current scroll position
  const scrollY = window.scrollY
  
  // Check if page is scrolled for styling
  isScrolled.value = scrollY > 10
  
  // Find the current section
  sections.forEach((section) => {
    const sectionElement = section as HTMLElement
    const sectionHeight = sectionElement.offsetHeight
    const sectionTop = sectionElement.offsetTop - 120 // Offset for header and mobile nav
    const sectionId = sectionElement.getAttribute('id') || ''
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      activeSection.value = sectionId
    }
  })
}

// Get main sections for mobile touch bar
const mainSections = computed(() => {
  return props.sections.map(section => ({
    id: section.id,
    label: section.label
  }))
})

// Get all sections including subsections flattened
const allSections = computed(() => {
  const result: Section[] = []
  
  props.sections.forEach(section => {
    result.push(section)
    if (section.subsections) {
      section.subsections.forEach(subsection => {
        result.push(subsection)
      })
    }
  })
  
  return result
})

// Find parent section for a given subsection
const findParentSection = (subsectionId: string): string | null => {
  for (const section of props.sections) {
    if (section.subsections) {
      for (const subsection of section.subsections) {
        if (subsection.id === subsectionId) {
          return section.id
        }
      }
    }
  }
  return null
}

// Check if a section has subsections
const hasSubsections = (sectionId: string): boolean => {
  const section = props.sections.find(s => s.id === sectionId)
  return section?.subsections && section.subsections.length > 0
}

// Get subsections for a section
const getSubsections = (sectionId: string): Section[] => {
  const section = props.sections.find(s => s.id === sectionId)
  return section?.subsections || []
}

onMounted(() => {
  // Initialize active section
  updateActiveSection()
  
  // Add scroll event listener
  window.addEventListener('scroll', updateActiveSection)
})

onUnmounted(() => {
  // Clean up event listener
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <!-- Mobile Touch Bar TOC (visible on small and medium screens) -->
  <div class="lg:hidden fixed top-[60px] left-0 right-0 z-10 w-full">
    <!-- Mobile Touch Bar -->
    <div 
      class="w-full overflow-x-auto scrollbar-hide bg-card border-b border-border transition-all duration-200"
      :class="{ 'shadow-sm': isScrolled }"
      aria-label="Table of Contents"
      role="navigation"
    >
      <div class="flex whitespace-nowrap px-4 py-3">
        <a 
          v-for="section in mainSections" 
          :key="section.id"
          :href="`#${section.id}`"
          :class="[
            'px-3 py-1 mx-1 rounded-full text-sm transition-colors',
            activeSection === section.id 
              ? 'bg-primary text-white font-medium' 
              : 'text-foreground hover:bg-muted'
          ]"
          @click.prevent="handleLinkClick(section.id)"
          :aria-current="activeSection === section.id ? 'page' : undefined"
        >
          {{ section.label }}
        </a>
      </div>
    </div>

    <!-- Mobile Dropdown (for subsections) -->
    <button 
      @click="toggleMobileMenu" 
      class="flex items-center justify-between w-full px-4 py-3 bg-card border-b border-border text-foreground hover:text-primary transition-colors"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="mobile-toc-dropdown"
    >
      <span class="font-medium flex items-center">
        <span class="i-mdi-menu-open text-xl mr-2"></span>
        <span>{{ mainSections.find(s => s.id === activeSection)?.label || allSections.find(s => s.id === activeSection)?.label || 'Table of Contents' }}</span>
      </span>
      <span 
        class="i-mdi-chevron-down text-lg transition-transform" 
        :class="{ 'rotate-180': isMobileMenuOpen }"
        aria-hidden="true"
      ></span>
    </button>

    <!-- Mobile TOC dropdown -->
    <div 
      id="mobile-toc-dropdown"
      v-show="isMobileMenuOpen" 
      class="bg-card border-b border-border shadow-md"
      role="menu"
    >
      <ul class="p-4 space-y-3">
        <li v-for="section in props.sections" :key="section.id" role="menuitem">
          <a 
            :href="`#${section.id}`" 
            :class="activeSection === section.id ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick(section.id)"
          >
            {{ section.label }}
          </a>
          <ul v-if="section.subsections && section.subsections.length > 0" class="pl-4 mt-2 space-y-2">
            <li v-for="subsection in section.subsections" :key="subsection.id" role="menuitem">
              <a 
                :href="`