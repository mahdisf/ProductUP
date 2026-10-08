# Product Practice

A Phase 0 Product Management learning prototype. Three advanced lessons use realistic decisions, immediate feedback, and local progress. No account or backend is required.

## Run locally

```sh
npm ci
npm run dev
```

## Publish on GitHub Pages

Push this directory as the public [`mahdisf/ProductUP`](https://github.com/mahdisf/ProductUP) repository with `main` as the default branch. In **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The included workflow publishes `dist/` on each push to `main`.

GitHub Pages serves a project repository at `https://mahdisf.github.io/ProductUP/`. Since the existing user site uses `mahdisf.ir` as its custom domain, GitHub Pages should also serve this project at `https://mahdisf.ir/ProductUP/` as long as this project repository has no separate custom domain.

Progress and validation responses are stored in each visitor's browser only. They are not collected centrally.
