<template>
  <aside class="w-64 border-r border-gray-200 dark:border-gray-800 hidden md:block p-4 shrink-0">
    <div class="sticky top-20">
      <ContentNavigation v-slot="{ navigation }">
        <div v-for="(section, index) in navigation" :key="index" class="mb-6">
          <div 
            class="flex items-center justify-between font-semibold text-sm uppercase text-gray-500 mb-2 cursor-pointer"
            @click="toggleSection(index)"
          >
            <h3>{{ section.title || 'Navigation' }}</h3>
            <div :class="sectionOpen[index] ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
          </div>
          <ul v-show="sectionOpen[index]" class="space-y-1">
            <li v-for="item in section.children" :key="item._path">
              <template v-if="item.children && item.children.length">
                <!-- Category with sub-items -->
                <div 
                  class="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  @click="toggleCategory(item._path)"
                >
                  <span>{{ item.title }}</span>
                  <div :class="categoryOpen[item._path] ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
                </div>
                <ul v-show="categoryOpen[item._path]" class="pl-4 space-y-1 mt-1">
                  <li v-for="subItem in item.children" :key="subItem._path">
                    <NuxtLink :to="subItem._path" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                      :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': isActive(subItem._path) }">
                      {{ subItem.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </template>
              <NuxtLink v-else :to="item._path" class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" 
                :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': isActive(item._path) }">
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </ContentNavigation>
    </div>
  </aside>
</template>

<script setup>
const route = useRoute()

// Initialize all sections as open by default
const sectionOpen = ref([])
const categoryOpen = ref({})

onMounted(() => {
  // Set all sections to open by default
  sectionOpen.value = Array(10).fill(true)
})

function toggleSection(index) {
  sectionOpen.value[index] = !sectionOpen.value[index]
}

function toggleCategory(path) {
  categoryOpen.value[path] = !categoryOpen.value[path]
}

function isActive(path) {
  return route.path === path
}
</script>