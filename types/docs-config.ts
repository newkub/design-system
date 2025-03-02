export interface NavItemWithLink {
  text: string;
  link: string;
}

export interface NavItemWithChildren {
  text: string;
  items: NavItemWithLink[];
}

export type NavItem = NavItemWithLink | NavItemWithChildren;

export interface SidebarLink {
  text: string;
  link: string;
}

export interface SidebarItem {
  text: string;
  items?: SidebarLink[];
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface SocialLink {
  icon: string;
  link: string;
}

export interface FooterConfig {
  message?: string;
  copyright?: string;
}

export interface ThemeConfig {
  logo?: string;
  siteTitle?: string;
  nav?: NavItem[];
  sidebar?: Record<string, SidebarItem[]>;
  footer?: FooterConfig;
  socialLinks?: SocialLink[];
}

export interface DocsConfig {
  title: string;
  description: string;
  themeConfig: ThemeConfig;
}