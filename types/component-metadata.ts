export interface ComponentMetadata {
  id: string;
  title: string;
  description: string;
  category: 'layout' | 'form' | 'feedback' | 'navigation' | 'data-display';
  tags: string[];
  usage?: {
    basic: string;
    advanced?: string;
  };
  props?: {
    name: string;
    type: string;
    default: string;
    description: string;
  }[];
  events?: {
    name: string;
    description: string;
  }[];
  slots?: {
    name: string;
    description: string;
  }[];
}

export interface ComponentWithPreview extends ComponentMetadata {
  preview: () => {
    component: string;
    props?: Record<string, any>;
    content?: string;
    slots?: Record<string, string>;
  };
}

// Define a type for component metadata that can be used directly in components
export type ComponentMetadataDefinition = Omit<ComponentMetadata, 'id'> & {
  id?: string; // Make id optional as it can be derived from the component name
};