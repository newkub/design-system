export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentEvent {
  name: string;
  description: string;
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface ComponentUsage {
  basic: string;
  advanced?: string;
}

export type ComponentCategory = 'layout' | 'form' | 'feedback' | 'navigation' | 'data-display';

export interface ComponentMetadata {
  id: string;
  title: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  usage?: ComponentUsage;
  props?: ComponentProp[];
  events?: ComponentEvent[];
  slots?: ComponentSlot[];
}

export interface ComponentPreview {
  component: string;
  props?: Record<string, any>;
  content?: string;
  slots?: Record<string, string>;
}

export interface ComponentWithPreview extends ComponentMetadata {
  preview: () => ComponentPreview;
}

// For component documentation in markdown format
export interface ComponentMarkdownDocs {
  id: string;
  title: string;
  description: string;
  usage: {
    basic: string;
    advanced?: string;
  };
  props: string;
  events?: string;
  slots?: string;
  examples: string[];
}