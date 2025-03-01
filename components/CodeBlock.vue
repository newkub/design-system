<template>
  <div v-show="isActive" class="code-block">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * @component CodeBlock
 * @description A code block component that works with CodeGroup to display code examples with tabs
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

interface CodeBlockProps {
  /**
   * Label for the tab
   */
  label: string;
  /**
   * Whether this tab is active by default
   */
  active?: boolean;
  /**
   * Programming language for syntax highlighting
   */
  language?: string;
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  active: false,
  language: ''
})

const codeGroup = inject('codeGroup', null)
const tabIndex = ref(0)

onMounted(() => {
  if (codeGroup) {
    tabIndex.value = codeGroup.registerTab(props.label, props.active, props.language)
    
    // Add language attribute to pre tag
    setTimeout(() => {
      if (props.language) {
        const preElement = document.querySelector('.code-block pre')
        if (preElement) {
          preElement.setAttribute('data-language', props.language)
        }
      }
    }, 0)
  }
})

const isActive = computed(() => {
  if (codeGroup) {
    return codeGroup.activeTabIndex.value === tabIndex.value
  }
  return true
})
</script>