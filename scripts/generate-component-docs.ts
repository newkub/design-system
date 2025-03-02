#!/usr/bin/env node

/**
 * This script generates markdown documentation files for all components
 * based on their metadata.
 * 
 * Usage:
 * npm run generate-docs
 */

import fs from 'fs';
import path from 'path';
import { extractMetadataFromSource, generateMarkdownDocs } from '../utils/component-metadata-extractor';

// Paths
const COMPONENTS_DIR = path.resolve(process.cwd(), 'components');
const DOCS_DIR = path.resolve(process.cwd(), 'content/components');

// Ensure docs directory exists
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

// Process all Vue components
async function generateDocs() {
  try {
    const files = fs.readdirSync(COMPONENTS_DIR)
      .filter(file => file.endsWith('.vue'));
    
    console.log(`Found ${files.length} component files`);
    
    let generatedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(COMPONENTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract component name (without .vue extension)
      const componentName = file.replace(/\.vue$/, '');
      const componentId = componentName.toLowerCase();
      
      // Extract metadata from component source
      const metadata = extractMetadataFromSource(content, file);
      
      if (metadata) {
        // Generate markdown documentation
        const markdown = generateMarkdownDocs(metadata);
        
        // Write to file
        const docsFilePath = path.join(DOCS_DIR, `${componentId}.md`);
        fs.writeFileSync(docsFilePath, markdown);
        
        console.log(`Generated documentation for ${componentName}`);
        generatedCount++;
      } else {
        console.warn(`Could not extract metadata from ${file}`);
      }
    }
    
    console.log(`Successfully generated documentation for ${generatedCount} components`);
  } catch (err) {
    console.error('Error generating component documentation:', err);
    process.exit(1);
  }
}

// Run the script
generateDocs();