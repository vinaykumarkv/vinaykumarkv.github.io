## Development

Run the local development server:

```bash
npm run dev
```

Run a production export locally:

```bash
npm run build
```

The static site output is generated in `out/`.

## GitHub Pages Deployment

This repository deploys to GitHub Pages using GitHub Actions from the `main` branch.

Required repository settings:

```text
Settings -> Pages -> Build and deployment -> Source = GitHub Actions
```

The workflow file is:

```text
.github/workflows/deploy-pages.yml
```

Every push to `main` triggers a fresh static export and publishes the contents of `out/` to GitHub Pages.
