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
  }
]

// Initialize all sections as open by default
const sectionOpen = ref(navigation.map(() => true))

// Initialize categories state
const categoryOpen = ref({})

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