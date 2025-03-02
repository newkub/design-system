import docsConfig from '~/docs.config';

export function useDocsConfig() {
  // Ensure we return a default object with themeConfig if docsConfig is undefined
  const defaultConfig = {
    title: 'Nuxt Docs',
    description: 'Documentation site built with Nuxt and UnoCSS',
    themeConfig: {
      nav: [],
      sidebar: {},
      logo: '/logo.svg',
      siteTitle: 'Nuxt Docs',
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024'
      },
      socialLinks: []
    }
  };

  // If docsConfig is undefined or null, return the default config
  if (!docsConfig) {
    return defaultConfig;
  }

  // Merge the default config with the user config
  return {
    ...defaultConfig,
    ...docsConfig,
    themeConfig: {
      ...defaultConfig.themeConfig,
      ...(docsConfig?.themeConfig || {})
    }
  };
}