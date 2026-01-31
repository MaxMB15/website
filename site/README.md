# Portfolio Website

Personal portfolio site built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **TypeScript**: 5.x
- **Build**: Static export (suitable for Netlify, GitHub Pages, etc.)

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm)

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses Turbopack in dev.

### Build (static export)

```bash
npm run build
```

Output is written to the `out/` directory. Serve it with any static host:

```bash
npx serve out
```

### Lint

```bash
npm run lint
```

## Deployment (Netlify)

[![Netlify Status](https://api.netlify.com/api/v1/badges/df5dc8f5-eff1-4702-b74f-a50dc86b379e/deploy-status)](https://app.netlify.com/projects/maxboksem/deploys)

1. Connect the repo to Netlify.
2. Build settings are in `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Functions**: `netlify/functions`
3. **Environment variables** (in Netlify dashboard → Site settings → Environment variables):
   - `NEXT_PUBLIC_SITE_URL` (optional): Production URL (e.g. `https://yoursite.com`) for sitemap/OG URLs.
   - **Footer resume & contact (Turnstile)**:
     - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile site key (public).
     - `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret key (server-only; used by Netlify functions).
     - `CONTACT_EMAIL`: Email returned by “Get contact info” after verification (server-only).
   - **Cloudflare Web Analytics** (optional): `NEXT_PUBLIC_CF_BEACON_TOKEN` — add your beacon token from Cloudflare Web Analytics to enable tracking.

Before each build, `prebuild` copies `public/resume.pdf` into `netlify/functions/verify-resume/` so the resume download function can serve it. The downloaded file is named **Max_Boksem_Resume.pdf** (custom filename set in the function).

## Project Structure

- `src/app/` – App Router pages and layout
- `src/components/` – React components
- `src/lib/` – Shared data and utilities
- `public/` – Static assets and images

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
