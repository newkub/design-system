<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('introduction')
const isMobileMenuOpen = ref(false)

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
}

// Update active section based on scroll position
const updateActiveSection = () => {
  const sections = document.querySelectorAll('section[id]')
  
  // Get current scroll position
  const scrollY = window.scrollY
  
  // Find the current section
  sections.forEach((section) => {
    const sectionElement = section as HTMLElement
    const sectionHeight = sectionElement.offsetHeight
    const sectionTop = sectionElement.offsetTop - 100 // Offset for header
    const sectionId = sectionElement.getAttribute('id') || ''
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      activeSection.value = sectionId
    }
  })
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
  <!-- Desktop TOC (lg screens and up) -->
  <nav class="sticky top-20 hidden lg:block">
    <h3 class="text-lg font-heading font-semibold mb-4 text-primary">Contents</h3>
    <ul class="space-y-3">
      <li>
        <a 
          href="#introduction" 
          :class="activeSection === 'introduction' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('introduction')"
        >
          Introduction
        </a>
      </li>
      <li>
        <a 
          href="#theme" 
          :class="activeSection === 'theme' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('theme')"
        >
          Theme System
        </a>
      </li>
      <li>
        <a 
          href="#colors" 
          :class="activeSection === 'colors' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('colors')"
        >
          Color Tokens
        </a>
        <ul class="pl-4 mt-2 space-y-2">
          <li>
            <a 
              href="#primary-colors" 
              :class="activeSection === 'primary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('primary-colors')"
            >
              Primary Colors
            </a>
          </li>
          <li>
            <a 
              href="#secondary-colors" 
              :class="activeSection === 'secondary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('secondary-colors')"
            >
              Secondary Colors
            </a>
          </li>
          <li>
            <a 
              href="#semantic-colors" 
              :class="activeSection === 'semantic-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('semantic-colors')"
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
          @click="handleLinkClick('typography')"
        >
          Typography
        </a>
      </li>
      <li>
        <a 
          href="#spacing" 
          :class="activeSection === 'spacing' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('spacing')"
        >
          Spacing
        </a>
      </li>
      <li>
        <a 
          href="#radius" 
          :class="activeSection === 'radius' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('radius')"
        >
          Border Radius
        </a>
      </li>
      <li>
        <a 
          href="#buttons" 
          :class="activeSection === 'buttons' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('buttons')"
        >
          Buttons
        </a>
        <ul class="pl-4 mt-2 space-y-2">
          <li>
            <a 
              href="#button-variants" 
              :class="activeSection === 'button-variants' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('button-variants')"
            >
              Button Variants
            </a>
          </li>
          <li>
            <a 
              href="#button-sizes" 
              :class="activeSection === 'button-sizes' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('button-sizes')"
            >
              Button Sizes
            </a>
          </li>
          <li>
            <a 
              href="#button-states" 
              :class="activeSection === 'button-states' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('button-states')"
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
          @click="handleLinkClick('alerts')"
        >
          Alerts
        </a>
        <ul class="pl-4 mt-2 space-y-2">
          <li>
            <a 
              href="#alert-types" 
              :class="activeSection === 'alert-types' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('alert-types')"
            >
              Alert Types
            </a>
          </li>
          <li>
            <a 
              href="#dismissible-alerts" 
              :class="activeSection === 'dismissible-alerts' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
              @click="handleLinkClick('dismissible-alerts')"
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
          @click="handleLinkClick('icons')"
        >
          Icons
        </a>
      </li>
      <li>
        <a 
          href="#usage" 
          :class="activeSection === 'usage' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('usage')"
        >
          Usage
        </a>
      </li>
      <li>
        <a 
          href="#customization" 
          :class="activeSection === 'customization' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
          @click="handleLinkClick('customization')"
        >
          Customization
        </a>
      </li>
    </ul>
  </nav>

  <!-- Mobile TOC button (visible on small and medium screens) -->
  <div class="lg:hidden">
    <button 
      @click="toggleMobileMenu" 
      class="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-4"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="mobile-toc"
    >
      <span class="i-mdi-menu text-xl"></span>
      <span class="font-medium">Table of Contents</span>
      <span 
        class="i-mdi-chevron-down text-lg transition-transform" 
        :class="{ 'rotate-180': isMobileMenuOpen }"
      ></span>
    </button>

    <!-- Mobile TOC dropdown -->
    <div 
      id="mobile-toc"
      v-show="isMobileMenuOpen" 
      class="bg-card border border-border rounded-md shadow-md p-4 mb-6"
    >
      <ul class="space-y-3">
        <li>
          <a 
            href="#introduction" 
            :class="activeSection === 'introduction' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('introduction')"
          >
            Introduction
          </a>
        </li>
        <li>
          <a 
            href="#theme" 
            :class="activeSection === 'theme' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('theme')"
          >
            Theme System
          </a>
        </li>
        <li>
          <a 
            href="#colors" 
            :class="activeSection === 'colors' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('colors')"
          >
            Color Tokens
          </a>
          <ul class="pl-4 mt-2 space-y-2">
            <li>
              <a 
                href="#primary-colors" 
                :class="activeSection === 'primary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('primary-colors')"
              >
                Primary Colors
              </a>
            </li>
            <li>
              <a 
                href="#secondary-colors" 
                :class="activeSection === 'secondary-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('secondary-colors')"
              >
                Secondary Colors
              </a>
            </li>
            <li>
              <a 
                href="#semantic-colors" 
                :class="activeSection === 'semantic-colors' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('semantic-colors')"
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
            @click="handleLinkClick('typography')"
          >
            Typography
          </a>
        </li>
        <li>
          <a 
            href="#spacing" 
            :class="activeSection === 'spacing' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('spacing')"
          >
            Spacing
          </a>
        </li>
        <li>
          <a 
            href="#radius" 
            :class="activeSection === 'radius' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('radius')"
          >
            Border Radius
          </a>
        </li>
        <li>
          <a 
            href="#buttons" 
            :class="activeSection === 'buttons' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('buttons')"
          >
            Buttons
          </a>
          <ul class="pl-4 mt-2 space-y-2">
            <li>
              <a 
                href="#button-variants" 
                :class="activeSection === 'button-variants' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('button-variants')"
              >
                Button Variants
              </a>
            </li>
            <li>
              <a 
                href="#button-sizes" 
                :class="activeSection === 'button-sizes' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('button-sizes')"
              >
                Button Sizes
              </a>
            </li>
            <li>
              <a 
                href="#button-states" 
                :class="activeSection === 'button-states' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('button-states')"
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
            @click="handleLinkClick('alerts')"
          >
            Alerts
          </a>
          <ul class="pl-4 mt-2 space-y-2">
            <li>
              <a 
                href="#alert-types" 
                :class="activeSection === 'alert-types' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('alert-types')"
              >
                Alert Types
              </a>
            </li>
            <li>
              <a 
                href="#dismissible-alerts" 
                :class="activeSection === 'dismissible-alerts' ? 'text-primary text-sm' : 'text-muted-foreground hover:text-primary transition-colors text-sm'"
                @click="handleLinkClick('dismissible-alerts')"
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
            @click="handleLinkClick('icons')"
          >
            Icons
          </a>
        </li>
        <li>
          <a 
            href="#usage" 
            :class="activeSection === 'usage' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('usage')"
          >
            Usage
          </a>
        </li>
        <li>
          <a 
            href="#customization" 
            :class="activeSection === 'customization' ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'"
            @click="handleLinkClick('customization')"
          >
            Customization
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>