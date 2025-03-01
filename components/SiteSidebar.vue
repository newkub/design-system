<template>
  <aside class="w-64 border-r border-gray-200 dark:border-gray-800 hidden md:block p-4 shrink-0">
    <div class="sticky top-20">
      <div v-for="(section, index) in navigation" :key="index" class="mb-6">
        <div 
          class="flex items-center justify-between font-semibold text-sm uppercase text-gray-500 mb-2 cursor-pointer"
          @click="toggleSection(index)"
        >
          <h3>{{ section.title }}</h3>
          <div :class="sectionOpen[index] ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
        </div>
        <ul v-show="sectionOpen[index]" class="space-y-1">
          <li v-for="item in section.items" :key="item.link">
            <template v-if="item.items">
              <!-- Category with sub-items -->
              <div 
                class="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                @click="toggleCategory(item.id)"
              >
                <span>{{ item.text }}</span>
                <div :class="categoryOpen[item.id] ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
              </div>
              <ul v-show="categoryOpen[item.id]" class="pl-4 space-y-1 mt-1">
                <li v-for="subItem in item.items" :key="subItem.link">
                  <NuxtLink :to="subItem.link" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                    :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': isActive(subItem.link) }">
                    {{ subItem.text }}
                  </NuxtLink>
                </li>
              </ul>
            </template>
            <NuxtLink v-else :to="item.link" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
              :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': isActive(item.link) }">
              {{ item.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
const route = useRoute()

const navigation = [
  {
    title: 'Introduction',
    items: [
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Installation', link: '/guide/installation' },
      { text: 'Configuration', link: '/guide/configuration' },
    ]
  },
  {
    title: 'Features',
    items: [
      { text: 'Markdown', link: '/guide/markdown' },
      { text: 'Theme Customization', link: '/guide/theme' },
      { text: 'Deployment', link: '/guide/deployment' },
    ]
  },
  {
    title: 'Design System',
    items: [
      { text: 'Overview', link: '/design-system' },
      { text: 'Design Tokens', link: '/design-system/tokens' },
      { 
        text: 'Primitives', 
        link: '/design-system/primitives',
        id: 'primitives',
        items: [
          { text: 'Colors', link: '/design-system/primitives/colors' },
          { text: 'Typography', link: '/design-system/primitives/typography' },
          { text: 'Spacing', link: '/design-system/primitives/spacing' },
          { text: 'Shadows', link: '/design-system/primitives/shadows' },
          { text: 'Border Radius', link: '/design-system/primitives/border-radius' },
          { text: 'Icons', link: '/design-system/primitives/icons' },
          { text: 'Grid', link: '/design-system/primitives/grid' },
        ]
      },
      { 
        text: 'Components', 
        link: '/design-system/components',
        id: 'components',
        items: [
          // Display components
          { text: 'Avatar', link: '/design-system/components/avatar' },
          { text: 'Badge', link: '/design-system/components/badge' },
          { text: 'Button', link: '/design-system/components/button' },
          { text: 'Card', link: '/design-system/components/card' },
          { text: 'Divider', link: '/design-system/components/divider' },
          { text: 'Icon', link: '/design-system/components/icon' },
          { text: 'Image', link: '/design-system/components/image' },
          { text: 'Progress', link: '/design-system/components/progress' },
          { text: 'Skeleton', link: '/design-system/components/skeleton' },
          { text: 'Tag', link: '/design-system/components/tag' },
          { text: 'Tooltip', link: '/design-system/components/tooltip' },
          
          // Layout components
          { text: 'Container', link: '/design-system/components/container' },
          { text: 'Grid', link: '/design-system/components/grid' },
          { text: 'Stack', link: '/design-system/components/stack' },
          
          // Navigation components
          { text: 'Breadcrumb', link: '/design-system/components/breadcrumb' },
          { text: 'Dropdown', link: '/design-system/components/dropdown' },
          { text: 'Menu', link: '/design-system/components/menu' },
          { text: 'Navigation', link: '/design-system/components/navigation' },
          { text: 'Pagination', link: '/design-system/components/pagination' },
          { text: 'Tabs', link: '/design-system/components/tabs' },
          
          // Form components
          { text: 'Checkbox', link: '/design-system/components/checkbox' },
          { text: 'Input', link: '/design-system/components/input' },
          { text: 'Radio', link: '/design-system/components/radio' },
          { text: 'Select', link: '/design-system/components/select' },
          { text: 'Slider', link: '/design-system/components/slider' },
          { text: 'Switch', link: '/design-system/components/switch' },
          { text: 'Textarea', link: '/design-system/components/textarea' },
          
          // Feedback components
          { text: 'Alert', link: '/design-system/components/alert' },
          { text: 'Dialog', link: '/design-system/components/dialog' },
          { text: 'Modal', link: '/design-system/components/modal' },
          { text: 'Notification', link: '/design-system/components/notification' },
          { text: 'Popover', link: '/design-system/components/popover' },
          { text: 'Toast', link: '/design-system/components/toast' },
          
          // Data display components
          { text: 'Accordion', link: '/design-system/components/accordion' },
          { text: 'Code Block', link: '/design-system/components/code-block' },
          { text: 'List', link: '/design-system/components/list' },
          { text: 'Table', link: '/design-system/components/table' },
          { text: 'Timeline', link: '/design-system/components/timeline' },
        ]
      },
      { text: 'Pages', link: '/design-system/pages' },
      { text: 'Templates', link: '/design-system/templates' },
    ]
  }
]

// Initialize all sections as open by default
const sectionOpen = ref(navigation.map(() => true))

// Initialize categories state
const categoryOpen = ref({
  components: true,
  primitives: true
})

function toggleSection(index) {
  sectionOpen.value[index] = !sectionOpen.value[index]
}

function toggleCategory(id) {
  categoryOpen.value[id] = !categoryOpen.value[id]
}

function isActive(path) {
  return route.path === path
}
</script>