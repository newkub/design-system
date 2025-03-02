import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';
import type { ComponentMetadata, ComponentWithPreview } from '~/types/component-metadata';

export default defineEventHandler(async (event) => {
  // This API endpoint scans the components directory and extracts metadata from each component file
  
  try {
    const componentsDir = path.resolve(process.cwd(), 'components');
    const files = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.vue'));
    
    const components: ComponentWithPreview[] = [];
    
    for (const file of files) {
      const filePath = path.join(componentsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      try {
        // Extract component name from filename
        const componentName = file.replace('.vue', '');
        const componentId = componentName.toLowerCase();
        
        // Try to extract metadata from the component
        let metadata: ComponentMetadata | null = null;
        
        // First, try to find exported componentMetadata
        const metadataMatch = content.match(/export\s+const\s+componentMetadata\s*=\s*({[\s\S]*?});/);
        if (metadataMatch && metadataMatch[1]) {
          try {
            // This is a simplified approach - in a real implementation, you would use
            // a proper TypeScript parser to extract the type information
            const metadataStr = metadataMatch[1]
              .replace(/\/\/.*$/gm, '') // Remove single-line comments
              .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
            
            // Convert to valid JSON (this is a simplification)
            const jsonStr = metadataStr
              .replace(/(\w+):/g, '"$1":') // Convert property names to quoted strings
              .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
            
            metadata = JSON.parse(jsonStr);
          } catch (err) {
            console.error(`Error parsing exported metadata for ${file}:`, err);
          }
        }
        
        // If that fails, try the old comment-based approach as fallback
        if (!metadata) {
          const commentMatch = content.match(/@componentMetadata\s*\n\s*\*\s*({[\s\S]*?})\s*\n\s*\*/);
          if (commentMatch && commentMatch[1]) {
            try {
              const metadataStr = commentMatch[1].replace(/\s*\*\s*/g, '');
              metadata = JSON.parse(metadataStr);
            } catch (err) {
              console.error(`Error parsing comment metadata for ${file}:`, err);
            }
          }
        }
        
        // If we still don't have metadata, create minimal metadata
        if (!metadata) {
          metadata = {
            id: componentId,
            title: componentName,
            description: `${componentName} component`,
            category: 'layout', // Default category
            tags: [componentId]
          };
        }
        
        // Ensure the component has an ID
        if (!metadata.id) {
          metadata.id = componentId;
        }
        
        // Create preview function (this will be added on the client side)
        const componentWithPreview: ComponentWithPreview = {
          ...metadata,
          preview: () => ({
            component: componentName,
            content: 'Preview'
          })
        };
        
        components.push(componentWithPreview);
      } catch (err) {
        console.error(`Error processing component ${file}:`, err);
      }
    }
    
    return components;
  } catch (err) {
    console.error('Error loading components:', err);
    return { error: 'Failed to load components', details: String(err) };
  }
});