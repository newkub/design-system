import { defineConfig, presetUno, presetIcons, presetTypography, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        heading: 'Montserrat:700,800',
      },
    }),
  ],
  theme: {
    colors: {
      // Use CSS variables for theming
      primary: {
        light: 'var(--color-primary-light)',
        DEFAULT: 'var(--color-primary)',
        dark: 'var(--color-primary-dark)',
      },
      secondary: {
        light: 'var(--color-secondary-light)',
        DEFAULT: 'var(--color-secondary)',
        dark: 'var(--color-secondary-dark)',
      },
      success: {
        light: 'var(--color-success-light)',
        DEFAULT: 'var(--color-success)',
        dark: 'var(--color-success-dark)',
      },
      warning: {
        light: 'var(--color-warning-light)',
        DEFAULT: 'var(--color-warning)',
        dark: 'var(--color-warning-dark)',
      },
      danger: {
        light: 'var(--color-danger-light)',
        DEFAULT: 'var(--color-danger)',
        dark: 'var(--color-danger-dark)',
      },
      // Theme colors
      background: 'var(--color-background)',
      foreground: 'var(--color-foreground)',
      muted: 'var(--color-muted)',
      'muted-foreground': 'var(--color-muted-foreground)',
      card: 'var(--color-card)',
      'card-foreground': 'var(--color-card-foreground)',
      border: 'var(--color-border)',
      input: 'var(--color-input)',
      ring: 'var(--color-ring)',
    },
    fontFamily: {
      sans: 'var(--font-sans)',
      heading: 'var(--font-heading)',
    },
    borderRadius: {
      none: '0',
      sm: 'var(--radius-sm)',
      DEFAULT: 'var(--radius-md)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      full: '9999px',
    },
    spacing: {
      px: '1px',
      0: '0',
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
      // Keep some numeric values for compatibility
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      64: '16rem',
    },
    // Add shadow tokens
    boxShadow: {
      none: 'none',
      sm: 'var(--shadow-sm)',
      DEFAULT: 'var(--shadow-md)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      xl: 'var(--shadow-xl)',
    },
    // Add transition tokens
    transitionProperty: {
      none: 'none',
      all: 'var(--transition-all)',
      default: 'var(--transition-default)',
      colors: 'var(--transition-colors)',
      opacity: 'var(--transition-opacity)',
      shadow: 'var(--transition-shadow)',
      transform: 'var(--transition-transform)',
    },
    transitionDuration: {
      fast: 'var(--duration-fast)',
      DEFAULT: 'var(--duration-normal)',
      normal: 'var(--duration-normal)',
      slow: 'var(--duration-slow)',
    },
    transitionTimingFunction: {
      DEFAULT: 'var(--ease-default)',
      linear: 'var(--ease-linear)',
      in: 'var(--ease-in)',
      out: 'var(--ease-out)',
      'in-out': 'var(--ease-in-out)',
    },
    // Add padding tokens
    padding: {
      none: '0',
      sm: 'var(--padding-sm)',
      DEFAULT: 'var(--padding-md)',
      md: 'var(--padding-md)',
      lg: 'var(--padding-lg)',
      xl: 'var(--padding-xl)',
    },
  },
  shortcuts: {
    // Button shortcuts
    'btn': 'py-2 px-4 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors',
    'btn-primary': 'btn bg-primary text-white hover:bg-primary-dark focus:ring-primary dark:bg-primary dark:hover:bg-primary-light',
    'btn-secondary': 'btn bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary dark:bg-secondary dark:hover:bg-secondary-light',
    'btn-success': 'btn bg-success text-white hover:bg-success-dark focus:ring-success dark:bg-success dark:hover:bg-success-light',
    'btn-warning': 'btn bg-warning text-white hover:bg-warning-dark focus:ring-warning dark:bg-warning dark:hover:bg-warning-light',
    'btn-danger': 'btn bg-danger text-white hover:bg-danger-dark focus:ring-danger dark:bg-danger dark:hover:bg-danger-light',
    'btn-outline': 'btn bg-transparent border border-solid focus:ring-gray-400',
    'btn-outline-primary': 'btn-outline border-primary text-primary hover:bg-primary-light dark:border-primary dark:text-primary dark:hover:bg-primary-light',
    
    // Alert shortcuts
    'alert': 'p-4 mb-4 rounded-md border-l-4',
    'alert-info': 'alert bg-primary-light border-primary text-primary-dark dark:bg-primary-light/30 dark:border-primary dark:text-primary-light',
    'alert-success': 'alert bg-success-light border-success text-success-dark dark:bg-success-light/30 dark:border-success dark:text-success-light',
    'alert-warning': 'alert bg-warning-light border-warning text-warning-dark dark:bg-warning-light/30 dark:border-warning dark:text-warning-light',
    'alert-danger': 'alert bg-danger-light border-danger text-danger-dark dark:bg-danger-light/30 dark:border-danger dark:text-danger-light',
    
    // Layout shortcuts
    'container-content': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'card': 'bg-card rounded-md shadow-md p-6 border border-border text-card-foreground',
    'section': 'py-12',
    
    // New shortcuts for common patterns
    'flex-center': 'flex items-center justify-center',
    'grid-responsive': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    'input-base': 'w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50',
    'card-hover': 'transition-shadow hover:shadow-lg cursor-pointer',
    'nav-link': 'text-foreground hover:text-primary transition-colors',
    'nav-link-active': 'text-primary font-medium',
  },
})