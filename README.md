# EYGN Frontend

React 19 + Vite + Tailwind v4 frontend for the Ethiopian Youth Global Network (EYGN) website,
built against the EYGN Website Development Brief. Deployed as a Vercel SPA.

Talks to `eygn-api` (Express + Prisma, separate repo) — see `.env.example` for
`VITE_API_BASE_URL`. The API's full endpoint contract lives in that repo at
`.claude/skills/eygn-api/references/api-contract.md`.

## Setup

    cp .env.example .env.local   # point VITE_API_BASE_URL at a running eygn-api, or leave the
                                  # default (http://localhost:8080/api/v1) for local dev
    npm install
    npm run dev                   # http://localhost:3000

## Build

    npm run build       # outputs to dist/
    npm run preview      # serve the production build locally

## Verify

    npm run lint          # tsc --noEmit
    npm run build

## Deployment (free tier)

`vercel.json` adds the SPA rewrite `react-router` needs on static hosting (every path falls back
to `index.html` — without it, a direct visit or refresh on e.g. `/programs` 404s, since there's no
server-side route for it on Vercel's static host).

1. Vercel dashboard → **Add New → Project** → import this repo.
2. Set `VITE_API_BASE_URL` to the deployed `eygn-api` URL with `/api/v1` appended (e.g.
   `https://eygn-api.onrender.com/api/v1`), and `VITE_SITE_URL` to this deployment's own URL once
   you know it (used for canonical/OG URLs — see `.env.example` for the rest, all optional).
3. Once deployed, add this site's real URL to `eygn-api`'s `CORS_ORIGIN` env var (comma-separated
   with the admin dashboard's URL), or every request will be rejected by CORS.
