## Development

Run the local development server:

```bash
npm run dev
```

Run a production export locally:

```bash
npm run build
```

The static site output is generated directly in `out/` when `output: "export"` is set in `next.config.js`.

## GitHub Pages Deployment

This repository deploys to GitHub Pages using GitHub Actions from the `main` branch.

Required repository settings:

```
Settings -> Pages -> Build and deployment -> Source = GitHub Actions
```

The workflow file is:

```
.github/workflows/deploy-pages.yml
```

Every push to `main` triggers a fresh static export and publishes the contents of `out/` to GitHub Pages.
