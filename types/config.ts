export interface NavItem {
  text: string
  link: string
  activeMatch?: string
}

export interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

export interface SidebarConfig {
  [path: string]: SidebarItem[]
}

export interface SocialLink {
  icon: string
  link: string
}

export interface ThemeConfig {
  logo?: string | { light: string; dark: string }
  nav?: NavItem[]
  sidebar?: SidebarConfig
  socialLinks?: SocialLink[]
  footer?: {
    message?: string
    copyright?: string
  }
  search?: {
    provider: 'local' | 'algolia'
    options?: any
  }
  carbonAds?: {
    code: string
    placement: string
  }
}

export interface HeadConfig {
  [tag: string]: [string, Record<string, string>]
}

export interface Config {
  title: string
  description: string
  base?: string
  head?: HeadConfig[]
  themeConfig: ThemeConfig
}

export function defineConfig(config: Config): Config {
  return config
}