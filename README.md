# Anir Jung Thapa — Portfolio

A Next.js portfolio for [anirjungthapa.com.np](https://anirjungthapa.com.np), with selected work, project filters, theme switching, quick navigation (`Ctrl/⌘ + K`), and an easy way to get in touch.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` to generate the static production site in `out/`.

## Deploy on Netlify

The repository includes `netlify.toml`. Netlify should use `npm run build` and publish `out`. Connect this repository to the existing Netlify site and deploy the `main` branch. No environment variables are required.

Project details and URLs live in `app/portfolio.jsx`. The previous Vite implementation is retained in `src/` for reference; Next.js serves the `app/` directory.
