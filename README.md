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
