<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// State for the TOC
const activeSection = ref('')
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const tocNavRef = ref<HTMLElement | null>(null)
const mobileTocRef = ref<HTMLElement | null>(null)
const sections = ref<Section[]>([])

// Define section interface
interface Section {
  id: string
  label: string
  element: HTMLElement
  level: number
  subsections?: Section[]
}

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

// Generate TOC from page structure
const generateTOC = () => {
  // Find all section elements with IDs and h2/h3/h4 headings
  const mainContent = document.getElementById('main-content')
  if (!mainContent) return
  
  const sectionElements = mainContent.querySelectorAll('section[id]')
  const newSections: Section[] = []
  
  sectionElements.forEach((sectionElement) => {
    const id = sectionElement.id
    const headingElement = sectionElement.querySelector('h2, h3, h4')
    
    if (id && headingElement) {
      const label = headingElement.textContent || id
      const level = parseInt(headingElement.tagName.substring(1)) - 1 // h2 = level 1, h3 = level 2, etc.
      
      // Create section object
      const section: Section = {
        id,
        label,
        element: sectionElement as HTMLElement,
        level,
        subsections: []
      }
      
      // Find subsections (h3 elements within this section)
      if (level === 1) { // Only for h2 sections
        const subsectionElements = sectionElement.querySelectorAll('h3[id], h4[id], div[id] > h3, div[id] > h4')
        
        subsectionElements.forEach((subsectionElement) => {
          const subsectionId = subsectionElement.id || (subsectionElement.parentElement?.id || '')
          if (subsectionId && subsectionId !== id) {
            const subsectionLabel = subsectionElement.textContent || subsectionId
            
            section.subsections?.push({
              id: subsectionId,
              label: subsectionLabel,
              element: (subsectionElement.id ? subsectionElement : subsectionElement.parentElement) as HTMLElement,
              level: parseInt(subsectionElement.tagName.substring(1)) - 1
            })
          }
        })
      }
      
      newSections.push(section)
    }
  })
  
  sections.value = newSections
  
  // Set initial active section
  if (newSections.length > 0 && !activeSection.value) {
    activeSection.value = newSections[0].id
  }
}

// Update active section based on scroll position
const updateActiveSection = () => {
  if (sections.value.length === 0) return
  
  // Get current scroll position
  const scrollY = window.scrollY
  
  // Check if page is scrolled for styling
  isScrolled.value = scrollY > 10
  
  // Find the current section
  let currentSection = sections.value[0].id
  
  // Check all sections
  for (const section of sections.value) {
    const sectionTop = section.element.offsetTop - 120 // Offset for header
    const sectionHeight = section.element.offsetHeight
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.id
      
      // Check subsections
      if (section.subsections && section.subsections.length > 0) {
        for (const subsection of section.subsections) {
          const subsectionElement = document.getElementById(subsection.id)
          if (subsectionElement) {
            const subsectionTop = subsectionElement.offsetTop - 120
            const subsectionHeight = subsectionElement.offsetHeight
            
            if (scrollY >= subsectionTop && scrollY < subsectionTop + subsectionHeight) {
              currentSection = subsection.id
              break
            }
          }
        }
      }
      
      break
    }
  }
  
  activeSection.value = currentSection
}

// Scroll active item into view in the TOC
const scrollActiveSectionIntoView = () => {
  // For desktop TOC
  if (tocNavRef.value) {
    const activeItem = tocNavRef.value.querySelector(`[aria-current="page"]`) as HTMLElement
    if (activeItem) {
      // Calculate the center position
      const containerHeight = tocNavRef.value.offsetHeight
      const itemTop = activeItem.offsetTop
      const itemHeight = activeItem.offsetHeight
      
      // Scroll to position that centers the active item
      tocNavRef.value.scrollTo({
        top: itemTop - (containerHeight / 2) + (itemHeight / 2),
        behavior: 'smooth'
      })
    }
  }
  
  // For mobile touch bar
  if (mobileTocRef.value) {
    const activeItem = mobileTocRef.value.querySelector(`[aria-current="page"]`) as HTMLElement
    if (activeItem) {
      // Calculate the center position
      const containerWidth = mobileTocRef.value.offsetWidth
      const itemLeft = activeItem.offsetLeft
      const itemWidth = activeItem.offsetWidth
      
      // Scroll to position that centers the active item
      mobileTocRef.value.scrollTo({
        left: itemLeft - (containerWidth / 2) + (itemWidth / 2),
        behavior: 'smooth'
      })
    }
  }
}

// Get main sections for mobile touch bar
const mainSections = computed(() => {
  return sections.value.filter(section => section.level === 1).map(section => ({
    id: section.id,
    label: section.label
  }))
})

// Watch for active section changes to scroll it into view
watch(activeSection, () => {
  // Use setTimeout to ensure DOM is updated before scrolling
  setTimeout(() => {
    scrollActiveSectionIntoView()
  }, 100)
})

// Watch for sections changes
watch(sections, () => {
  // Update active section when sections change
  updateActiveSection()
}, { deep: true })

onMounted(() => {
  // Generate TOC from page structure
  setTimeout(() => {
    generateTOC()
  }, 100)
  
  // Initialize active section
  updateActiveSection()
  
  // Add scroll event listener
  window.addEventListener('scroll', updateActiveSection)
  
  // Add resize event listener to regenerate TOC when window size changes
  window.addEventListener('resize', () => {
    setTimeout(() => {
      generateTOC()
    }, 100)
  })
  
  // Add mutation observer to detect DOM changes
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      generateTOC()
    }, 100)
  })
  
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    observer.observe(mainContent, {
      childList: true,
      subtree: true
    })
  }
  
  // Initial scroll to active section
  setTimeout(() => {
    scrollActiveSectionIntoView()
  }, 500)
})

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', generateTOC)
})
</script>

<template>
  <!-- Mobile Touch Bar TOC (visible on small and medium screens) -->
  <div class="lg:hidden fixed top-[60px] left-0 right-0 z-10 w-full">
    <!-- Mobile Touch Bar -->
    <div 
      ref="mobileTocRef"
      class="w-full overflow-x-auto scrollbar-hide bg-card border-b border-border transition-all duration-200 touch-pan-x"
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
        <span>
          {{ 
            sections.find(s => s.id === activeSection)?.label || 
            sections.flatMap(s => s.subsections || []).find(s => s.id === activeSection)?.label || 
            'Table of Contents' 
          }}
        </span>
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
      class="bg-card border-b border-border shadow-md overflow-y-auto max-h-[50vh] touch-pan-y"
      role="menu"
    >
      <ul class="p-4 space-y-3">
        <li v-for="section in sections" :key="section.id" role="menuitem">
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
                :href="`#${subsection.id}`" 
                :class="activeSection === subsection.id ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
                @click.prevent="handleLinkClick(subsection.id)"
              >
                {{ subsection.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <!-- Desktop sidebar TOC (visible on large screens) -->
  <div class="hidden lg:block sticky top-20 pr-6">
    <nav 
      ref="tocNavRef"
      aria-label="Table of Contents" 
      class="toc-nav hover-scrollable touch-pan-y"
    >
      <ul class="space-y-1">
        <li v-for="section in sections" :key="section.id">
          <a 
            :href="`#${section.id}`" 
            :class="[
              'block py-1.5 px-3 rounded-md transition-colors',
              activeSection === section.id 
                ? 'bg-primary-light text-primary font-medium' 
                : 'text-foreground hover:text-primary hover:bg-muted'
            ]"
            @click.prevent="handleLinkClick(section.id)"
            :aria-current="activeSection === section.id ? 'page' : undefined"
          >
            {{ section.label }}
          </a>
          
          <!-- Subsections -->
          <ul v-if="section.subsections && section.subsections.length > 0" class="pl-4 mt-1 mb-2 space-y-1">
            <li v-for="subsection in section.subsections" :key="subsection.id">
              <a 
                :href="`#${subsection.id}`" 
                :class="[
                  'block py-1 px-3 text-sm rounded-md transition-colors',
                  activeSection === subsection.id 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                ]"
                @click.prevent="handleLinkClick(subsection.id)"
                :aria-current="activeSection === subsection.id ? 'page' : undefined"
              >
                {{ subsection.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* TOC nav styling */
.toc-nav {
  width: 100%;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding-right: 10px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-muted) transparent;
}

.toc-nav::-webkit-scrollbar {
  width: 4px;
}

.toc-nav::-webkit-scrollbar-track {
  background: transparent;
}

.toc-nav::-webkit-scrollbar-thumb {
  background-color: var(--color-muted);
  border-radius: 4px;
}

/* Hover scrollable behavior */
.hover-scrollable {
  overflow-y: auto;
  scrollbar-width: thin;
}

/* Touch support for mobile */
.touch-pan-x {
  touch-action: pan-x;
}

.touch-pan-y {
  touch-action: pan-y;
}
</style>