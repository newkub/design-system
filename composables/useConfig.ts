import docsConfig from '../docs-config'

export function useConfig() {
  return docsConfig
}

export function useThemeConfig() {
  return docsConfig.themeConfig
}

export function useSidebar() {
  const route = useRoute()
  const config = useConfig()
  
  // Find the matching sidebar for the current route
  const path = computed(() => {
    const routePath = route.path
    const sidebarPaths = Object.keys(config.themeConfig.sidebar || {})
    
    // Find the longest matching path
    const matchingPath = sidebarPaths
      .filter(path => routePath.startsWith(path))
      .sort((a, b) => b.length - a.length)[0]
    
    return matchingPath || '/'
  })
  
  const sidebar = computed(() => {
    return config.themeConfig.sidebar?.[path.value] || []
  })
  
  return {
    sidebar,
    path
  }
}

export function useNav() {
  const config = useConfig()
  return {
    nav: computed(() => config.themeConfig.nav || [])
  }
}