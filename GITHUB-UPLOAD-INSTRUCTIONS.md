# Exact GitHub upload sequence

1. Extract `nexgenbinary-staging-deployment-safe.zip` on your computer.
2. Open the `nexgenbinary-stage` repository and remain on the `main` branch.
3. Select **Add file → Upload files**.
4. Drag the extracted package contents into the upload area. The repository root must receive `package.json`, `package-lock.json`, `site`, `scripts`, and `.github` directly.
5. Confirm the file list includes `site/index.html` and `scripts/build.mjs`.
6. Commit all files in one commit.
7. Open **Actions** and confirm the build completes.

## Workflow verification

Open `.github/workflows/astro.yml` after upload. The new file contains:

```yaml
uses: actions/checkout@v5
uses: actions/setup-node@v6
node-version: '22'
uses: actions/upload-pages-artifact@v5
uses: actions/deploy-pages@v5
```

The package is still compatible with the old Node 20 workflow, so a missed workflow replacement will not recreate the previous `exit code 127` error.
