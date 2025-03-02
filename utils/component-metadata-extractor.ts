import type { ComponentMetadata, ComponentProp, ComponentEvent, ComponentSlot, ComponentCategory } from '~/types/component-metadata';

/**
 * Extracts component metadata from Vue component source code
 * @param source The source code of the Vue component
 * @param fileName The file name of the component
 * @returns The extracted component metadata or null if no metadata is found
 */
export function extractMetadataFromSource(source: string, fileName: string): ComponentMetadata | null {
  try {
    // Extract metadata from JSDoc-style comment
    const metadataRegex = /@componentMetadata\s*\n\s*\*\s*({[\s\S]*?})\s*\n\s*\*/;
    const match = source.match(metadataRegex);
    
    if (match && match[1]) {
      // Parse the JSON metadata
      const metadataStr = match[1].replace(/\s*\*\s*/g, '');
      return JSON.parse(metadataStr);
    }
    
    // If no explicit metadata, try to extract from script setup
    return extractMetadataFromScript(source, fileName);
  } catch (err) {
    console.error('Error extracting metadata:', err);
    return null;
  }
}

/**
 * Extracts component metadata from the script section of a Vue component
 * @param source The source code of the Vue component
 * @param fileName The file name of the component
 * @returns The extracted component metadata or null if extraction fails
 */
function extractMetadataFromScript(source: string, fileName: string): ComponentMetadata | null {
  try {
    // Extract component name from filename
    const componentName = fileName.replace(/\.vue$/, '');
    const id = componentName.toLowerCase();
    
    // Extract props
    const props = extractProps(source);
    
    // Extract emits/events
    const events = extractEvents(source);
    
    // Extract slots from template
    const slots = extractSlots(source);
    
    // Try to determine category based on component name or content
    const category = determineCategory(componentName, source);
    
    // Create basic metadata
    return {
      id,
      title: componentName,
      description: `${componentName} component`,
      category,
      tags: [id],
      props,
      events,
      slots
    };
  } catch (err) {
    console.error('Error extracting metadata from script:', err);
    return null;
  }
}

/**
 * Extracts props from component source code
 * @param source The source code of the Vue component
 * @returns Array of component props
 */
function extractProps(source: string): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Match defineProps section
  const propsRegex = /defineProps\(\{([^}]*)\}\)/s;
  const propsMatch = source.match(propsRegex);
  
  if (propsMatch && propsMatch[1]) {
    const propsContent = propsMatch[1];
    
    // Match individual props
    const propRegex = /(\w+):\s*\{([^}]*)\}/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(propsContent)) !== null) {
      const propName = propMatch[1];
      const propContent = propMatch[2];
      
      // Extract prop type
      const typeMatch = /type:\s*([\w\[\]]+)/.exec(propContent);
      const type = typeMatch ? typeMatch[1] : 'any';
      
      // Extract default value
      const defaultMatch = /default:\s*([^,\n]+)/.exec(propContent);
      const defaultValue = defaultMatch ? defaultMatch[1].trim() : '""';
      
      // Extract description from comments
      const commentRegex = new RegExp(`${propName}[^]*?\/\\/\\s*(.+)`, 'i');
      const commentMatch = source.match(commentRegex);
      const description = commentMatch ? commentMatch[1].trim() : `${propName} property`;
      
      props.push({
        name: propName,
        type,
        default: defaultValue,
        description
      });
    }
  }
  
  return props;
}

/**
 * Extracts events from component source code
 * @param source The source code of the Vue component
 * @returns Array of component events
 */
function extractEvents(source: string): ComponentEvent[] {
  const events: ComponentEvent[] = [];
  
  // Match defineEmits section
  const emitsRegex = /defineEmits\(\[(.*?)\]\)/s;
  const emitsMatch = source.match(emitsRegex);
  
  if (emitsMatch && emitsMatch[1]) {
    const emitsContent = emitsMatch[1];
    
    // Match event names
    const eventRegex = /'([^']+)'/g;
    let eventMatch;
    
    while ((eventMatch = eventRegex.exec(emitsContent)) !== null) {
      const eventName = eventMatch[1];
      
      // Try to find description in comments
      const commentRegex = new RegExp(`${eventName}[^]*?\/\\/\\s*(.+)`, 'i');
      const commentMatch = source.match(commentRegex);
      const description = commentMatch 
        ? commentMatch[1].trim() 
        : `Emitted when ${eventName.replace(/:/g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      
      events.push({
        name: eventName,
        description
      });
    }
  }
  
  return events;
}

/**
 * Extracts slots from component template
 * @param source The source code of the Vue component
 * @returns Array of component slots
 */
function extractSlots(source: string): ComponentSlot[] {
  const slots: ComponentSlot[] = [];
  
  // Check for default slot
  if (source.includes('<slot>') || source.includes('<slot />')) {
    slots.push({
      name: 'default',
      description: 'Default slot content'
    });
  }
  
  // Match named slots
  const slotRegex = /<slot\s+name=["']([^"']+)["'][^>]*>/g;
  let slotMatch;
  
  while ((slotMatch = slotRegex.exec(source)) !== null) {
    const slotName = slotMatch[1];
    
    // Try to find description in comments
    const commentRegex = new RegExp(`slot[^]*?${slotName}[^]*?\/\\/\\s*(.+)`, 'i');
    const commentMatch = source.match(commentRegex);
    const description = commentMatch 
      ? commentMatch[1].trim() 
      : `${slotName} slot content`;
    
    slots.push({
      name: slotName,
      description
    });
  }
  
  return slots;
}

/**
 * Determines the component category based on name and content
 * @param componentName The name of the component
 * @param source The source code of the component
 * @returns The determined category
 */
function determineCategory(componentName: string, source: string): ComponentCategory {
  const name = componentName.toLowerCase();
  
  // Form components
  if (
    name.includes('input') || 
    name.includes('form') || 
    name.includes('select') || 
    name.includes('checkbox') || 
    name.includes('radio') || 
    name.includes('button')
  ) {
    return 'form';
  }
  
  // Layout components
  if (
    name.includes('layout') || 
    name.includes('grid') || 
    name.includes('container') || 
    name.includes('row') || 
    name.includes('col') || 
    name.includes('card')
  ) {
    return 'layout';
  }
  
  // Feedback components
  if (
    name.includes('alert') || 
    name.includes('toast') || 
    name.includes('notification') || 
    name.includes('modal') || 
    name.includes('dialog')
  ) {
    return 'feedback';
  }
  
  // Navigation components
  if (
    name.includes('nav') || 
    name.includes('menu') || 
    name.includes('sidebar') || 
    name.includes('tab') || 
    name.includes('pagination')
  ) {
    return 'navigation';
  }
  
  // Data display components
  if (
    name.includes('table') || 
    name.includes('list') || 
    name.includes('badge') || 
    name.includes('tag') || 
    name.includes('text') || 
    name.includes('typography')
  ) {
    return 'data-display';
  }
  
  // Default to data-display if can't determine
  return 'data-display';
}

/**
 * Generates markdown documentation from component metadata
 * @param metadata The component metadata
 * @returns Markdown documentation string
 */
export function generateMarkdownDocs(metadata: ComponentMetadata): string {
  let markdown = `# ${metadata.title}\n\n`;
  
  // Description
  markdown += `${metadata.description}\n\n`;
  
  // Category and tags
  markdown += `**Category:** ${metadata.category}\n\n`;
  markdown += `**Tags:** ${metadata.tags.join(', ')}\n\n`;
  
  // Usage
  if (metadata.usage) {
    markdown += `## Usage\n\n`;
    markdown += `### Basic\n\n\`\`\`vue\n${metadata.usage.basic}\n\`\`\`\n\n`;
    
    if (metadata.usage.advanced) {
      markdown += `### Advanced\n\n\`\`\`vue\n${metadata.usage.advanced}\n\`\`\`\n\n`;
    }
  }
  
  // Props
  if (metadata.props && metadata.props.length > 0) {
    markdown += `## Props\n\n`;
    markdown += `| Name | Type | Default | Description |\n`;
    markdown += `| ---- | ---- | ------- | ----------- |\n`;
    
    metadata.props.forEach(prop => {
      markdown += `| \`${prop.name}\` | \`${prop.type}\` | \`${prop.default}\` | ${prop.description} |\n`;
    });
    
    markdown += `\n`;
  }
  
  // Events
  if (metadata.events && metadata.events.length > 0) {
    markdown += `## Events\n\n`;
    markdown += `| Name | Description |\n`;
    markdown += `| ---- | ----------- |\n`;
    
    metadata.events.forEach(event => {
      markdown += `| \`${event.name}\` | ${event.description} |\n`;
    });
    
    markdown += `\n`;
  }
  
  // Slots
  if (metadata.slots && metadata.slots.length > 0) {
    markdown += `## Slots\n\n`;
    markdown += `| Name | Description |\n`;
    markdown += `| ---- | ----------- |\n`;
    
    metadata.slots.forEach(slot => {
      markdown += `| \`${slot.name}\` | ${slot.description} |\n`;
    });
    
    markdown += `\n`;
  }
  
  return markdown;
}