<template>
  <div class="code-group">
    <div class="flex overflow-x-auto mb-0 bg-gray-100 dark:bg-gray-800 rounded-t-lg border border-gray-200 dark:border-gray-700 border-b-0">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="px-4 py-2 text-sm font-medium"
        :class="activeTabIndex === index ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'"
        @click="setActiveTab(index)"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="relative">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component CodeGroup
 * @description A container for CodeBlock components that creates tabbed code examples
 * @example
 * <CodeGroup>
 *   <CodeBlock label="JavaScript" active language="js">
 *     console.log('Hello world');
 *   </CodeBlock>
 *   <CodeBlock label="Python" language="python">
 *     print('Hello world')
 *   </CodeBlock>
 * </CodeGroup>
 */

interface Tab {
  label: string;
  language?: string;
}

const tabs = ref<Tab[]>([])
const activeTabIndex = ref(0)

// Provide context to child components
provide('codeGroup', {
  registerTab: (label: string, active: boolean, language?: string) => {
    const index = tabs.value.length
    tabs.value.push({ label, language })
    
    if (active) {
      activeTabIndex.value = index
    }
    
    return index
  },
  activeTabIndex
})

function setActiveTab(index: number) {
  activeTabIndex.value = index
}
</script>

<style scoped>
.code-group {
  margin: 1.5rem 0;
}

.code-group pre {
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>