```md
# Deployment

Learn how to deploy your documentation site to production.

## Static Site Generation

Nuxt supports static site generation, which is perfect for documentation sites. To generate a static site:

```bash
npm run generate
```

This will create a `.output/public` directory with your static site.

## Deployment Options

### Netlify

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run generate`
   - Publish directory: `.output/public`

### Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Import your project to Vercel
3. Configure the build settings:
   - Framework preset: Nuxt.js
   - Build command: `npm run generate`
   - Output directory: `.output/public`

### GitHub Pages

1. Generate your static site
2. Push the generated files to the `gh-pages` branch

You can automate this with GitHub Actions:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run generate
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .output/public
```

## Custom Domain

If you want to use a custom domain:

1. Purchase a domain from a domain registrar
2. Configure your DNS settings to point to your hosting provider
3. Configure your hosting provider to use your custom domain

## Next Steps

Congratulations! You've completed the guide. Now you can start creating your own documentation content.
```