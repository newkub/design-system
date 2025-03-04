import React from 'react';
import { Button } from '../lib/components/Button';
import ComponentPreview from '../components/ComponentPreview';
import { Download, Send, Trash } from 'lucide-react';

const ButtonsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 id="buttons" className="text-3xl font-bold mb-4">Buttons</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Versatile button components with different variants, sizes, and states.
        </p>
      </div>
      
      <ComponentPreview
        title="Button Variants"
        description="Different button styles for various purposes."
        code={`<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Button Sizes"
        description="Buttons come in different sizes to fit your design needs."
        code={`<Button size="small">Small</Button>\n<Button size="default">Default</Button>\n<Button size="large">Large</Button>`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="small">Small</Button>
          <Button size="default">Default</Button>
          <Button size="large">Large</Button>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Button with Icon"
        description="Buttons can include icons to enhance visual communication."
        code={`<Button leftIcon={<Download size={16} />}>Button with Icon</Button>\n<Button rightIcon={<Send size={16} />}>Send Message</Button>\n<Button variant="destructive" leftIcon={<Trash size={16} />}>Delete Item</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<Download size={16} />}>
            Button with Icon
          </Button>
          <Button rightIcon={<Send size={16} />}>
            Send Message
          </Button>
          <Button variant="destructive" leftIcon={<Trash size={16} />}>
            Delete Item
          </Button>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Button States"
        description="Buttons can be disabled or show loading states."
        code={`<Button isDisabled>Disabled</Button>\n<Button isLoading>Loading</Button>\n<Button isLoading leftIcon={<Download size={16} />}>Downloading</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button isDisabled>Disabled</Button>
          <Button isLoading>Loading</Button>
          <Button isLoading leftIcon={<Download size={16} />}>
            Downloading
          </Button>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Full Width Button"
        description="Buttons can take up the full width of their container."
        code={`<Button fullWidth>Full Width Button</Button>`}
      >
        <div className="w-full">
          <Button fullWidth>Full Width Button</Button>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default ButtonsPage;