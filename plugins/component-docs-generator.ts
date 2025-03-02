import { defineNuxtPlugin } from '#app';
import { extractMetadataFromSource, generateMarkdownDocs } from '~/utils/component-metadata-extractor';
import type { ComponentMetadata } from '~/types/component-metadata';

export default defineNuxtPlugin(async (nuxtApp) => {
  // This plugin would be used in a real-world scenario to dynamically generate
  // component documentation from metadata
  
  // For demonstration purposes, we'll just set up a global property
  nuxtApp.provide('componentDocs', {
    // Generate markdown documentation for a component
    generateDocs: (componentId: string, metadata: ComponentMetadata) => {
      return generateMarkdownDocs(metadata);
    },
    
    // Extract metadata from component source
    extractMetadata: (source: string, fileName: string) => {
      return extractMetadataFromSource(source, fileName);
    }
  });
});