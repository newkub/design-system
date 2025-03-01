<template>
  <div class="component-example mb-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Preview section -->
      <div class="p-6">
        <slot />
      </div>
      
      <!-- Code section -->
      <div v-if="code" class="border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900">
          <div class="flex items-center gap-2">
            <button 
              v-for="tab in tabs" 
              :key="tab"
              class="px-3 py-1 text-sm rounded-full"
              :class="activeTab === tab ? 
                'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 
                'hover:bg-gray-200 dark:hover:bg-gray-700'"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>
          <button 
            class="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            @click="copyCode"
          >
            <div :class="copied ? 'i-carbon-checkmark' : 'i-carbon-copy'"></div>
            <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>
        
        <div class="relative">
          <pre v-show="activeTab === 'Preview'" class="language-html p-4 m-0 text-sm overflow-x-auto"><code>{{ code.preview }}</code></pre>
          <pre v-show="activeTab === 'Vue'" class="language-vue p-4 m-0 text-sm overflow-x-auto"><code>{{ code.vue }}</code></pre>
          <pre v-show="activeTab === 'React'" class="language-jsx p-4 m-0 text-sm overflow-x-auto"><code>{{ code.react }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component ComponentExample
 * @description Displays a component example with preview and code tabs
 * @example
 * <ComponentExample :code="buttonCode">
 *   <button class="btn btn-primary">Primary Button</button>
 * </ComponentExample>
 */

interface CodeExamples {
  preview?: string;
  vue?: string;
  react?: string;
}

interface ComponentExampleProps {
  /**
   * Code examples in different formats
   */
  code?: CodeExamples;
}

const props = withDefaults(defineProps<ComponentExampleProps>(), {
  code: () => ({
    preview: '',
    vue: '',
    react: ''
  })
})

const tabs = ['Preview', 'Vue', 'React']
const activeTab = ref('Preview')
const copied = ref(false)

function copyCode() {
  const codeToCopy = props.code[activeTab.value.toLowerCase()]
  navigator.clipboard.writeText(codeToCopy)
  
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>