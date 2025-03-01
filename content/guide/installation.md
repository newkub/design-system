# Installation

Follow these steps to install and set up your own documentation site.

## Prerequisites

- Node.js 16.x or higher
- npm, yarn, or pnpm

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nuxt-docs.git
cd nuxt-docs
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
nuxt-docs/
├── components/       # Vue components
├── content/          # Markdown content
├── layouts/          # Page layouts
├── pages/            # Vue pages
├── public/           # Static assets
├── app.vue           # App entry
├── nuxt.config.ts    # Nuxt configuration
└── uno.config.ts     # UnoCSS configuration
```

## Next Steps

Continue to the [Configuration](/guide/configuration) guide to learn how to customize your documentation site.