import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

interface ThemeConfig {
  fontSize: {
    base: string;
    sm: string;
    lg: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  spacing: {
    base: string;
    sm: string;
    lg: string;
  };
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light theme
  
  const [colors, setColors] = useState<ThemeColors>({
    primary: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim() || '#6366f1',
    secondary: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-500').trim() || '#a855f7',
    success: getComputedStyle(document.documentElement).getPropertyValue('--color-success-500').trim() || '#10b981',
    warning: getComputedStyle(document.documentElement).getPropertyValue('--color-warning-500').trim() || '#f59e0b',
    error: getComputedStyle(document.documentElement).getPropertyValue('--color-error-500').trim() || '#ef4444',
    info: getComputedStyle(document.documentElement).getPropertyValue('--color-info-500').trim() || '#0ea5e9',
  });
  
  const [config, setConfig] = useState<ThemeConfig>({
    fontSize: {
      base: getComputedStyle(document.documentElement).getPropertyValue('--font-size-base').trim() || '1rem',
      sm: getComputedStyle(document.documentElement).getPropertyValue('--font-size-sm').trim() || '0.875rem',
      lg: getComputedStyle(document.documentElement).getPropertyValue('--font-size-lg').trim() || '1.125rem',
    },
    radius: {
      sm: getComputedStyle(document.documentElement).getPropertyValue('--radius-sm').trim() || '0.25rem',
      md: getComputedStyle(document.documentElement).getPropertyValue('--radius-md').trim() || '0.375rem',
      lg: getComputedStyle(document.documentElement).getPropertyValue('--radius-lg').trim() || '0.5rem',
    },
    spacing: {
      base: getComputedStyle(document.documentElement).getPropertyValue('--spacing-4').trim() || '1rem',
      sm: getComputedStyle(document.documentElement).getPropertyValue('--spacing-2').trim() || '0.5rem',
      lg: getComputedStyle(document.documentElement).getPropertyValue('--spacing-8').trim() || '2rem',
    },
  });
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);
  
  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Function to update a color
  const updateColor = (colorName: keyof ThemeColors, value: string) => {
    // Update state
    setColors(prev => ({ ...prev, [colorName]: value }));
    
    // Update CSS variables
    const root = document.documentElement;
    
    // Generate color shades (simplified version)
    const baseColor = value;
    const lighterColor = adjustColorBrightness(baseColor, 40);
    const lightestColor = adjustColorBrightness(baseColor, 90);
    const darkerColor = adjustColorBrightness(baseColor, -20);
    const darkestColor = adjustColorBrightness(baseColor, -40);
    
    // Set CSS variables for the color
    root.style.setProperty(`--color-${colorName}-50`, lightestColor);
    root.style.setProperty(`--color-${colorName}-100`, adjustColorBrightness(baseColor, 80));
    root.style.setProperty(`--color-${colorName}-200`, adjustColorBrightness(baseColor, 60));
    root.style.setProperty(`--color-${colorName}-300`, lighterColor);
    root.style.setProperty(`--color-${colorName}-400`, adjustColorBrightness(baseColor, 20));
    root.style.setProperty(`--color-${colorName}-500`, baseColor);
    root.style.setProperty(`--color-${colorName}-600`, adjustColorBrightness(baseColor, -10));
    root.style.setProperty(`--color-${colorName}-700`, darkerColor);
    root.style.setProperty(`--color-${colorName}-800`, adjustColorBrightness(baseColor, -30));
    root.style.setProperty(`--color-${colorName}-900`, darkestColor);
    root.style.setProperty(`--color-${colorName}-950`, adjustColorBrightness(baseColor, -50));
  };
  
  // Function to update config
  const updateConfig = (
    category: keyof ThemeConfig,
    size: keyof ThemeConfig['fontSize'] | keyof ThemeConfig['radius'] | keyof ThemeConfig['spacing'],
    value: string
  ) => {
    // Update state
    setConfig(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [size]: value,
      },
    }));
    
    // Update CSS variables
    const root = document.documentElement;
    
    if (category === 'fontSize') {
      if (size === 'sm') root.style.setProperty('--font-size-sm', value);
      if (size === 'base') root.style.setProperty('--font-size-base', value);
      if (size === 'lg') root.style.setProperty('--font-size-lg', value);
    } else if (category === 'radius') {
      if (size === 'sm') root.style.setProperty('--radius-sm', value);
      if (size === 'md') root.style.setProperty('--radius-md', value);
      if (size === 'lg') root.style.setProperty('--radius-lg', value);
    } else if (category === 'spacing') {
      if (size === 'sm') root.style.setProperty('--spacing-2', value);
      if (size === 'base') root.style.setProperty('--spacing-4', value);
      if (size === 'lg') root.style.setProperty('--spacing-8', value);
    }
  };
  
  // Reset theme to defaults
  const resetTheme = () => {
    const root = document.documentElement;
    root.removeAttribute('style');
    
    // Re-read default values
    setColors({
      primary: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500').trim() || '#6366f1',
      secondary: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-500').trim() || '#a855f7',
      success: getComputedStyle(document.documentElement).getPropertyValue('--color-success-500').trim() || '#10b981',
      warning: getComputedStyle(document.documentElement).getPropertyValue('--color-warning-500').trim() || '#f59e0b',
      error: getComputedStyle(document.documentElement).getPropertyValue('--color-error-500').trim() || '#ef4444',
      info: getComputedStyle(document.documentElement).getPropertyValue('--color-info-500').trim() || '#0ea5e9',
    });
    
    setConfig({
      fontSize: {
        base: getComputedStyle(document.documentElement).getPropertyValue('--font-size-base').trim() || '1rem',
        sm: getComputedStyle(document.documentElement).getPropertyValue('--font-size-sm').trim() || '0.875rem',
        lg: getComputedStyle(document.documentElement).getPropertyValue('--font-size-lg').trim() || '1.125rem',
      },
      radius: {
        sm: getComputedStyle(document.documentElement).getPropertyValue('--radius-sm').trim() || '0.25rem',
        md: getComputedStyle(document.documentElement).getPropertyValue('--radius-md').trim() || '0.375rem',
        lg: getComputedStyle(document.documentElement).getPropertyValue('--radius-lg').trim() || '0.5rem',
      },
      spacing: {
        base: getComputedStyle(document.documentElement).getPropertyValue('--spacing-4').trim() || '1rem',
        sm: getComputedStyle(document.documentElement).getPropertyValue('--spacing-2').trim() || '0.5rem',
        lg: getComputedStyle(document.documentElement).getPropertyValue('--spacing-8').trim() || '2rem',
      },
    });
  };
  
  // Helper function to adjust color brightness
  function adjustColorBrightness(hex: string, percent: number): string {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Adjust brightness
    r = Math.max(0, Math.min(255, r + (percent / 100) * 255));
    g = Math.max(0, Math.min(255, g + (percent / 100) * 255));
    b = Math.max(0, Math.min(255, b + (percent / 100) * 255));
    
    // Convert back to hex
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  }
  
  return {
    theme,
    setTheme,
    colors,
    updateColor,
    config,
    updateConfig,
    resetTheme,
  };
}