import React, { ReactNode, useState } from 'react';
import { Code } from 'lucide-react';

interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: ReactNode;
  code?: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  title,
  description,
  children,
  code,
}) => {
  const [showCode, setShowCode] = useState(false);
  
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm mb-10 overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          {code && (
            <button 
              onClick={() => setShowCode(!showCode)}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1.5 px-2 py-1 rounded-md hover:bg-muted transition-colors"
            >
              <Code size={16} />
              <span>{showCode ? 'Hide code' : 'Show code'}</span>
            </button>
          )}
        </div>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      
      <div className="p-6 bg-component-preview-bg">
        <div className="flex flex-col gap-6 w-full">
          {children}
        </div>
      </div>
      
      {code && showCode && (
        <div className="p-4 bg-component-code-bg border-t border-border">
          <pre className="text-sm overflow-x-auto p-4 rounded-md bg-muted">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ComponentPreview;