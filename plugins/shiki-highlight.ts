import { defineNuxtPlugin } from '#app'
import { getHighlighter, Highlighter } from 'shiki'
import { watch } from 'vue'

// Create a singleton instance
let highlighterInstance: Highlighter | null = null

async function getHighlighterInstance(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await getHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [
        'javascript', 'typescript', 'vue', 'html', 'css', 'json', 
        'bash', 'markdown', 'yaml', 'md', 'ts', 'js'
      ]
    })
  }
  return highlighterInstance
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const colorMode = nuxtApp.$colorMode
  
  // Get the singleton highlighter instance
  await getHighlighterInstance()
  
  // Add custom styles to code blocks
  nuxtApp.hook('app:mounted', () => {
    const applyHighlightStyles = () => {
      const theme = colorMode.value === 'dark' ? 'github-dark' : 'github-light'
      
      // Apply line numbers and other styling
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((codeBlock) => {
          if (!codeBlock.classList.contains('shiki-enhanced')) {
            // Add line numbers
            const codeLines = codeBlock.innerHTML.split('\n')
            if (codeLines.length > 1) {
              codeBlock.innerHTML = codeLines
                .map(line => `<span class="line">${line}</span>`)
                .join('\n')
            }
            
            // Add copy button
            const pre = codeBlock.parentElement
            if (pre && !pre.previousElementSibling?.classList.contains('code-block-header')) {
              const header = document.createElement('div')
              header.className = 'code-block-header'
              
              const copyButton = document.createElement('button')
              copyButton.className = 'copy-button'
              copyButton.innerHTML = '<span class="i-carbon-copy"></span><span>Copy</span>'
              copyButton.addEventListener('click', () => {
                const code = codeBlock.textContent || ''
                navigator.clipboard.writeText(code).then(() => {
                  copyButton.innerHTML = '<span class="i-carbon-checkmark"></span><span>Copied!</span>'
                  setTimeout(() => {
                    copyButton.innerHTML = '<span class="i-carbon-copy"></span><span>Copy</span>'
                  }, 2000)
                })
              })
              
              header.appendChild(copyButton)
              pre.parentNode?.insertBefore(header, pre)
            }
            
            codeBlock.classList.add('shiki-enhanced')
          }
        })
        
        // Add language badges to code blocks
        document.querySelectorAll('pre').forEach((pre) => {
          const code = pre.querySelector('code')
          if (code && code.className) {
            const match = code.className.match(/language-(\w+)/)
            if (match && match[1]) {
              pre.setAttribute('data-language', match[1])
            }
          }
        })
      }, 50)
    }
    
    // Apply initially
    applyHighlightStyles()
    
    // Watch for color mode changes using Vue's watch function
    watch(() => colorMode.value, () => {
      setTimeout(applyHighlightStyles, 50)
    })
    
    // Apply when route changes
    nuxtApp.$router.afterEach(() => {
      setTimeout(applyHighlightStyles, 50)
    })
  })
  
  // Clean up on app:beforeExit
  nuxtApp.hook('app:beforeExit', () => {
    if (highlighterInstance) {
      highlighterInstance.dispose()
      highlighterInstance = null
    }
  })
})