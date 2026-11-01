# Deployment preference

The user requests GitHub Pages deployment after every meaningful change.

- GitHub repository: `Vlad-Klymenko/earthWalk`; local remote name: `github`.
- Publish the static `dist/` directory through `.github/workflows/pages.yml` on `main`.
- Before pushing a meaningful update, run `npm run prepare:site`, `npm run check` and the relevant tests. Perform browser verification for visual or walking changes.
- Push the final reviewed source to GitHub after each meaningful change, then inspect the corresponding Pages workflow and verify the published revision. Do not claim a successful deployment from a push alone.
- Preserve the public-data provenance and clear separation of mapped dimensions from reconstructed detail.
