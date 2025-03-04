import React, { useState } from 'react';
import { Moon, Sun, Palette, Sliders } from 'lucide-react';
import { useTheme } from '../lib/hooks/useTheme';
import ThemeCustomizer from './ThemeCustomizer';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const toggleThemeCustomizer = () => {
    setIsThemeCustomizerOpen(!isThemeCustomizerOpen);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="text-primary-600 dark:text-primary-400">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="font-bold text-xl tracking-tight">Design System</div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium hover:bg-muted transition-colors"
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span className="sr-only">Toggle theme</span>
          </button>
          
          <button
            onClick={toggleThemeCustomizer}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors gap-2"
            title="Customize theme"
          >
            <Sliders size={16} />
            <span>Customize</span>
          </button>
        </div>
      </div>
      
      {isThemeCustomizerOpen && (
        <ThemeCustomizer onClose={() => setIsThemeCustomizerOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;