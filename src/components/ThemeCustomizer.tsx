import React, { useEffect, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, RotateCcw } from 'lucide-react';
import { useTheme } from '../lib/hooks/useTheme';
import { Button } from '../lib/components/Button';

interface ThemeCustomizerProps {
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onClose }) => {
  const { colors, updateColor, config, updateConfig, resetTheme } = useTheme();
  const [activeColor, setActiveColor] = React.useState<keyof typeof colors>('primary');
  const widgetRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <div className="fixed top-20 right-4 z-50 w-80 rounded-lg border border-border bg-card shadow-lg" ref={widgetRef}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-medium">Customize Theme</h3>
        <div className="flex gap-2">
          <button
            onClick={resetTheme}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input hover:bg-muted transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw size={16} />
            <span className="sr-only">Reset</span>
          </button>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input hover:bg-muted transition-colors"
          >
            <X size={16} />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <h4 className="text-sm font-medium mb-3">Colors</h4>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(colors).map(([name, color]) => (
                <button
                  key={name}
                  onClick={() => setActiveColor(name as keyof typeof colors)}
                  className={`h-10 rounded-md flex items-center justify-center text-xs ${
                    activeColor === name ? 'ring-2 ring-primary-500 ring-offset-2' : 'ring-1 ring-border'
                  }`}
                  style={{ backgroundColor: color }}
                  title={`${name} (${color})`}
                >
                  <span className={`font-medium ${['primary', 'secondary'].includes(name) || name.includes('dark') ? 'text-white' : 'text-gray-900'}`}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block flex justify-between">
                  <span>{activeColor.charAt(0).toUpperCase() + activeColor.slice(1)}</span>
                  <span className="text-muted-foreground text-xs">--color-{activeColor}-500</span>
                </label>
                <HexColorPicker
                  color={colors[activeColor]}
                  onChange={(color) => updateColor(activeColor, color)}
                  className="w-full mb-2"
                />
                <input
                  type="text"
                  value={colors[activeColor]}
                  onChange={(e) => updateColor(activeColor, e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Font Sizes */}
          <div>
            <h4 className="text-sm font-medium mb-3">Font Sizes</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="font-size-sm" className="text-sm font-medium">
                    Small
                  </label>
                  <span className="text-muted-foreground text-xs">--font-size-sm</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="font-size-sm-range"
                    type="range"
                    min="0.7"
                    max="1"
                    step="0.025"
                    value={parseFloat(config.fontSize.sm)}
                    onChange={(e) => updateConfig('fontSize', 'sm', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.fontSize.sm}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="font-size-base" className="text-sm font-medium">
                    Base
                  </label>
                  <span className="text-muted-foreground text-xs">--font-size-base</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="font-size-base-range"
                    type="range"
                    min="0.9"
                    max="1.2"
                    step="0.025"
                    value={parseFloat(config.fontSize.base)}
                    onChange={(e) => updateConfig('fontSize', 'base', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.fontSize.base}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="font-size-lg" className="text-sm font-medium">
                    Large
                  </label>
                  <span className="text-muted-foreground text-xs">--font-size-lg</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="font-size-lg-range"
                    type="range"
                    min="1.1"
                    max="1.4"
                    step="0.025"
                    value={parseFloat(config.fontSize.lg)}
                    onChange={(e) => updateConfig('fontSize', 'lg', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.fontSize.lg}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Border Radius */}
          <div>
            <h4 className="text-sm font-medium mb-3">Border Radius</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="radius-sm" className="text-sm font-medium">
                    Small
                  </label>
                  <span className="text-muted-foreground text-xs">--radius-sm</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="radius-sm-range"
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.025"
                    value={parseFloat(config.radius.sm)}
                    onChange={(e) => updateConfig('radius', 'sm', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.radius.sm}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="radius-md" className="text-sm font-medium">
                    Medium
                  </label>
                  <span className="text-muted-foreground text-xs">--radius-md</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="radius-md-range"
                    type="range"
                    min="0.1"
                    max="0.75"
                    step="0.025"
                    value={parseFloat(config.radius.md)}
                    onChange={(e) => updateConfig('radius', 'md', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.radius.md}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="radius-lg" className="text-sm font-medium">
                    Large
                  </label>
                  <span className="text-muted-foreground text-xs">--radius-lg</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="radius-lg-range"
                    type="range"
                    min="0.25"
                    max="1"
                    step="0.025"
                    value={parseFloat(config.radius.lg)}
                    onChange={(e) => updateConfig('radius', 'lg', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.radius.lg}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Spacing */}
          <div>
            <h4 className="text-sm font-medium mb-3">Spacing</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="spacing-sm" className="text-sm font-medium">
                    Small
                  </label>
                  <span className="text-muted-foreground text-xs">--spacing-2</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="spacing-sm-range"
                    type="range"
                    min="0.25"
                    max="0.75"
                    step="0.05"
                    value={parseFloat(config.spacing.sm)}
                    onChange={(e) => updateConfig('spacing', 'sm', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.spacing.sm}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="spacing-base" className="text-sm font-medium">
                    Base
                  </label>
                  <span className="text-muted-foreground text-xs">--spacing-4</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="spacing-base-range"
                    type="range"
                    min="0.75"
                    max="1.5"
                    step="0.05"
                    value={parseFloat(config.spacing.base)}
                    onChange={(e) => updateConfig('spacing', 'base', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.spacing.base}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="spacing-lg" className="text-sm font-medium">
                    Large
                  </label>
                  <span className="text-muted-foreground text-xs">--spacing-8</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    id="spacing-lg-range"
                    type="range"
                    min="1.5"
                    max="3"
                    step="0.1"
                    value={parseFloat(config.spacing.lg)}
                    onChange={(e) => updateConfig('spacing', 'lg', `${e.target.value}rem`)}
                    className="w-full"
                  />
                  <span className="text-sm w-16 text-right">{config.spacing.lg}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;