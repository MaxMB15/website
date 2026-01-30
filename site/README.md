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

1. Connect the repo to Netlify.
2. Build settings are in `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://yoursite.com`) for correct sitemap/OG URLs.

No extra config needed; the project is built as a static export.

## Project Structure

- `src/app/` – App Router pages and layout
- `src/components/` – React components
- `src/lib/` – Shared data and utilities
- `public/` – Static assets and images

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
