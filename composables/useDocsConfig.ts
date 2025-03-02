import docsConfig from '~/docs.config';

export function useDocsConfig() {
  // Ensure we return a default object with themeConfig if docsConfig is undefined
  return {
    ...docsConfig,
    themeConfig: {
      nav: [],
      sidebar: {},
      ...(docsConfig?.themeConfig || {})
    }
  };
}