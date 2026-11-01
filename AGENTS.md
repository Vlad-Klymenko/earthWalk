# Deployment preference

The user requests GitHub Pages deployment after every meaningful change. GitHub Pages is now the primary publishing destination; the older private Sites publication is a retained earlier copy.

- GitHub repository: `Vlad-Klymenko/earthWalk`; local remote name: `github`.
- Publish the static `dist/` directory through `.github/workflows/pages.yml` on `main`.
- Before pushing a meaningful update, run `npm run prepare:site`, `npm run check` and the relevant tests. Perform browser verification for visual or walking changes.
- Push the final reviewed source to GitHub after each meaningful change, then inspect the corresponding Pages workflow and verify the published revision. Do not claim a successful deployment from a push alone.
- Preserve the public-data provenance and clear separation of mapped dimensions from reconstructed detail.

The current GitHub CLI credential can push ordinary source changes but cannot create or edit Actions workflows. The initial Pages workflow was committed through the signed-in GitHub web editor. Keep using ordinary pushes for game updates; use the web editor if the workflow itself needs an authorized change, then fetch and fast-forward the local checkout. Do not request broader token permissions for routine code publication.
