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

Every push to `main` builds the Next.js app, runs `npm run export` to produce the `out/` directory, and then pushes those files to the `gh-pages` branch via GitHub Actions.

Required repository settings:

```
Settings -> Pages -> Build and deployment -> Source = gh-pages branch / root
```

The workflow file is:

```
.github/workflows/deploy-pages.yml
```

The action uses `peaceiris/actions-gh-pages` so the exported files are kept in sync with the `gh-pages` branch automatically—you do not need to commit `out/` yourself.
