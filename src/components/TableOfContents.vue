<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const activeSection = ref('introduction')
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
  return [
    { id: 'introduction', label: 'Intro' },
    { id: 'theme', label: 'Theme' },
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Type' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'icons', label: 'Icons' },
    { id: 'usage', label: 'Usage' },
    { id: 'customization', label: 'Custom' }
  ]
})

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
        <span>{{ mainSections.find(s => s.id === activeSection)?.label || 'Table of Contents' }}</span>
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
        <li role="menuitem">
          <a 
            href="#introduction" 
            :class="activeSection === 'introduction' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('introduction')"
          >
            Introduction
          </a>
        </li>
        <li role="menuitem">
          <a 
            href="#theme" 
            :class="activeSection === 'theme' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('theme')"
          >
            Theme System
          </a>
        </li>
        <li role="menuitem">
          <a 
            href="#colors" 
            :class="activeSection === 'colors' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('colors')"
          >
            Color Tokens
          </a>
          <ul class="pl-4 mt-2 space-y-2">
            <li role="menuitem">
              <a 
                href="#primary-colors" 
                :class="activeSection === 'primary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('primary-colors')"
              >
                Primary Colors
              </a>
            </li>
            <li role="menuitem">
              <a 
                href="#secondary-colors" 
                :class="activeSection === 'secondary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('secondary-colors')"
              >
                Secondary Colors
              </a>
            </li>
            <li role="menuitem">
              <a 
                href="#semantic-colors" 
                :class="activeSection === 'semantic-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('semantic-colors')"
              >
                Semantic Colors
              </a>
            </li>
          </ul>
        </li>
        <li role="menuitem">
          <a 
            href="#typography" 
            :class="activeSection === 'typography' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('typography')"
          >
            Typography
          </a>
        </li>
        <li role="menuitem">
          <a 
            href="#spacing" 
            :class="activeSection === 'spacing' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('spacing')"
          >
            Spacing
          </a>
        </li>
        <li role="menuitem">
          <a 
            href="#radius" 
            :class="activeSection === 'radius' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('radius')"
          >
            Border Radius
          </a>
        </li>
        <li role="menuitem">
          <a 
            href="#buttons" 
            :class="activeSection === 'buttons' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('buttons')"
          >
            Buttons
          </a>
          <ul class="pl-4 mt-2 space-y-2">
            <li role="menuitem">
              <a 
                href="#button-variants" 
                :class="activeSection === 'button-variants' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('button-variants')"
              >
                Button Variants
              </a>
            </li>
            <li role="menuitem">
              <a 
                href="#button-sizes" 
                :class="activeSection === 'button-sizes' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('button-sizes')"
              >
                Button Sizes
              </a>
            </li>
            <li role="menuitem">
              <a 
                href="#button-states" 
                :class="activeSection === 'button-states' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('button-states')"
              >
                Button States
              </a>
            </li>
          </ul>
        </li>
        <li role="menuitem">
          <a 
            href="#alerts" 
            :class="activeSection === 'alerts' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('alerts')"
          >
            Alerts
          </a>
          <ul class="pl-4 mt-2 space-y-2">
            <li role="menuitem">
              <a 
                href="#alert-types" 
                :class="activeSection === 'alert-types' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('alert-types')"
              >
                Alert Types
              </a>
            </li>
            <li role="menuitem">
              <a 
                href="#dismissible-alerts" 
                :class="activeSection === 'dismissible-alerts' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click.prevent="handleLinkClick('dismissible-alerts')"
              >
                Dismissible Alerts
              </a>
            </li>
          </ul>
        </li>
        <li role="menuitem">
          <a 
            href="#icons" 
            :class="activeSection === 'icons' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('icons')"
          >
            Icons
          </a>
        </li>
        <li role="menuitem">
          <a 
            href="#usage" 
            :class="activeSection === 'usage' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('usage')"
          >
            Usage
          </a>
        </li>
        <li role="menuitem">
          <a 
            href="#customization" 
            :class="activeSection === 'customization' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click.prevent="handleLinkClick('customization')"
          >
            Customization
          </a>
        </li>
      </ul>
    </div>
  </div>

  <!-- Desktop TOC (lg screens and up) -->
  <nav class="sticky top-20 hidden lg:block" aria-label="Desktop Table of Contents">
    <h3 class="text-lg font-heading font-semibold mb-4 text-primary">Contents</h3>
    <ul class="space-y-3">
      <li>
        <a 
          href="#introduction" 
          :class="activeSection === 'introduction' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('introduction')"
          :aria-current="activeSection === 'introduction' ? 'page' : undefined"
        >
          Introduction
        </a>
      </li>
      <li>
        <a 
          href="#theme" 
          :class="activeSection === 'theme' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('theme')"
          :aria-current="activeSection === 'theme' ? 'page' : undefined"
        >
          Theme System
        </a>
      </li>
      <li>
        <a 
          href="#colors" 
          :class="activeSection === 'colors' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('colors')"
          :aria-current="activeSection === 'colors' ? 'page' : undefined"
        >
          Color Tokens
        </a>
        <ul class="pl-4 mt-2 space-y-2">
          <li>
            <a 
              href="#primary-colors" 
              :class="activeSection === 'primary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('primary-colors')"
              :aria-current="activeSection === 'primary-colors' ? 'page' : undefined"
            >
              Primary Colors
            </a>
          </li>
          <li>
            <a 
              href="#secondary-colors" 
              :class="activeSection === 'secondary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('secondary-colors')"
              :aria-current="activeSection === 'secondary-colors' ? 'page' : undefined"
            >
              Secondary Colors
            </a>
          </li>
          <li>
            <a 
              href="#semantic-colors" 
              :class="activeSection === 'semantic-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('semantic-colors')"
              :aria-current="activeSection === 'semantic-colors' ? 'page' : undefined"
            >
              Semantic Colors
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a 
          href="#typography" 
          :class="activeSection === 'typography' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('typography')"
          :aria-current="activeSection === 'typography' ? 'page' : undefined"
        >
          Typography
        </a>
      </li>
      <li>
        <a 
          href="#spacing" 
          :class="activeSection === 'spacing' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('spacing')"
          :aria-current="activeSection === 'spacing' ? 'page' : undefined"
        >
          Spacing
        </a>
      </li>
      <li>
        <a 
          href="#radius" 
          :class="activeSection === 'radius' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('radius')"
          :aria-current="activeSection === 'radius' ? 'page' : undefined"
        >
          Border Radius
        </a>
      </li>
      <li>
        <a 
          href="#buttons" 
          :class="activeSection === 'buttons' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('buttons')"
          :aria-current="activeSection === 'buttons' ? 'page' : undefined"
        >
          Buttons
        </a>
        <ul class="pl-4 mt-2 space-y-2">
          <li>
            <a 
              href="#button-variants" 
              :class="activeSection === 'button-variants' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('button-variants')"
              :aria-current="activeSection === 'button-variants' ? 'page' : undefined"
            >
              Button Variants
            </a>
          </li>
          <li>
            <a 
              href="#button-sizes" 
              :class="activeSection === 'button-sizes' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('button-sizes')"
              :aria-current="activeSection === 'button-sizes' ? 'page' : undefined"
            >
              Button Sizes
            </a>
          </li>
          <li>
            <a 
              href="#button-states" 
              :class="activeSection === 'button-states' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('button-states')"
              :aria-current="activeSection === 'button-states' ? 'page' : undefined"
            >
              Button States
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a 
          href="#alerts" 
          :class="activeSection === 'alerts' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('alerts')"
          :aria-current="activeSection === 'alerts' ? 'page' : undefined"
        >
          Alerts
        </a>
        <ul class="pl-4 mt-2 space-y-2">
          <li>
            <a 
              href="#alert-types" 
              :class="activeSection === 'alert-types' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('alert-types')"
              :aria-current="activeSection === 'alert-types' ? 'page' : undefined"
            >
              Alert Types
            </a>
          </li>
          <li>
            <a 
              href="#dismissible-alerts" 
              :class="activeSection === 'dismissible-alerts' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click.prevent="handleLinkClick('dismissible-alerts')"
              :aria-current="activeSection === 'dismissible-alerts' ? 'page' : undefined"
            >
              Dismissible Alerts
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a 
          href="#icons" 
          :class="activeSection === 'icons' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('icons')"
          :aria-current="activeSection === 'icons' ? 'page' : undefined"
        >
          Icons
        </a>
      </li>
      <li>
        <a 
          href="#usage" 
          :class="activeSection === 'usage' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('usage')"
          :aria-current="activeSection === 'usage' ? 'page' : undefined"
        >
          Usage
        </a>
      </li>
      <li>
        <a 
          href="#customization" 
          :class="activeSection === 'customization' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click.prevent="handleLinkClick('customization')"
          :aria-current="activeSection === 'customization' ? 'page' : undefined"
        >
          Customization
        </a>
      </li>
    </ul>
  </nav>
  
  <!-- Spacer for mobile to account for fixed TOC -->
  <div class="lg:hidden h-[110px]"></div>
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
</style>