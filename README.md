# Anir Jung Thapa — Portfolio

A Next.js portfolio for [anirjungthapa.com.np](https://anirjungthapa.com.np). It keeps the original dark design, animated network, custom cursor, scroll effects, and selected work.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` to generate the static production site in `out/`.

## Deploy on Netlify

The repository includes `netlify.toml`. Netlify should use `npm run build` and publish `out`. Connect this repository to the existing Netlify site and deploy the `main` branch. No environment variables are required.

The App Router entry point is in `app/`. The portfolio components and project URLs live in `src/`.
