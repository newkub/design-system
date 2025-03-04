import {
	defineConfig,
	presetUno,
	presetIcons,
	presetTypography,
	presetWebFonts,
} from "unocss";

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons({
			scale: 1.2,
			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle",
			},
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: [
					{
						name: "Inter",
						weights: [400, 500, 600, 700],
					},
					{
						name: "Roboto",
						weights: [400, 500, 700],
					},
					{
						name: "Open Sans",
						weights: [400, 600, 700],
					},
					{
						name: "Nunito",
						weights: [400, 600, 700],
					},
					{
						name: "Poppins",
						weights: [400, 500, 600, 700],
					},
					{
						name: "Lato",
						weights: [400, 700],
					},
					{
						name: "Source Sans Pro",
						weights: [400, 600, 700],
					},
				],
				heading: [
					{
						name: "Montserrat",
						weights: [700, 800],
					},
					{
						name: "Playfair Display",
						weights: [700, 800],
					},
					{
						name: "Merriweather",
						weights: [700, 900],
					},
				],
			},
		}),
	],
	theme: {
		colors: {
			// Use CSS variables for theming
			primary: {
				light: "var(--color-primary-light)",
				DEFAULT: "var(--color-primary)",
				dark: "var(--color-primary-dark)",
			},
			secondary: {
				light: "var(--color-secondary-light)",
				DEFAULT: "var(--color-secondary)",
				dark: "var(--color-secondary-dark)",
			},
			accent: {
				light: "var(--color-accent-light)",
				DEFAULT: "var(--color-accent)",
				dark: "var(--color-accent-dark)",
			},
			success: {
				light: "var(--color-success-light)",
				DEFAULT: "var(--color-success)",
				dark: "var(--color-success-dark)",
			},
			warning: {
				light: "var(--color-warning-light)",
				DEFAULT: "var(--color-warning)",
				dark: "var(--color-warning-dark)",
			},
			danger: {
				light: "var(--color-danger-light)",
				DEFAULT: "var(--color-danger)",
				dark: "var(--color-danger-dark)",
			},
			// Theme colors
			background: "var(--color-background)",
			foreground: "var(--color-foreground)",
			muted: "var(--color-muted)",
			"muted-foreground": "var(--color-muted-foreground)",
			card: "var(--color-card)",
			"card-foreground": "var(--color-card-foreground)",
			border: "var(--color-border)",
			input: "var(--color-input)",
			ring: "var(--color-ring)",
		},
		fontFamily: {
			sans: "var(--font-sans)",
			heading: "var(--font-heading)",
		},
		borderRadius: {
			none: "0",
			sm: "var(--radius-sm)",
			DEFAULT: "var(--radius-md)",
			md: "var(--radius-md)",
			lg: "var(--radius-lg)",
			full: "9999px",
		},
		spacing: {
			px: "1px",
			0: "0",
			sm: "var(--spacing-sm)",
			md: "var(--spacing-md)",
			lg: "var(--spacing-lg)",
			// Keep some numeric values for compatibility
			1: "0.25rem",
			2: "0.5rem",
			3: "0.75rem",
			4: "1rem",
			5: "1.25rem",
			6: "1.5rem",
			8: "2rem",
			10: "2.5rem",
			12: "3rem",
			16: "4rem",
			20: "5rem",
			24: "6rem",
			32: "8rem",
			40: "10rem",
			48: "12rem",
			64: "16rem",
		},
		// Add shadow tokens
		boxShadow: {
			none: "none",
			sm: "var(--shadow-sm)",
			DEFAULT: "var(--shadow-md)",
			md: "var(--shadow-md)",
			lg: "var(--shadow-lg)",
			xl: "var(--shadow-xl)",
		},
		// Add transition tokens
		transitionProperty: {},
	},
});