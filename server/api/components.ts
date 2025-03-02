import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';
import type { ComponentMetadata } from '~/types/component-metadata';
import { extractMetadataFromSource } from '~/utils/component-metadata-extractor';

export default defineEventHandler(async (event) => {
  try {
    const componentsDir = path.resolve(process.cwd(), 'components');
    const files = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.vue'));
    
    const components: ComponentMetadata[] = [];
    
    for (const file of files) {
      const filePath = path.join(componentsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract metadata from component source
      const metadata = extractMetadataFromSource(content, file);
      
      if (metadata) {
        components.push(metadata);
      }
    }
    
    return components;
  } catch (err) {
    console.error('Error loading components:', err);
    return { error: 'Failed to load components' };
  }
});