# Portfolio

A playful, animation-rich portfolio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize Content

Edit [`data/portfolio.ts`](data/portfolio.ts) to update your name, projects, experience, and contact links.

### Portrait image

Add Ella's final portrait at `public/images/ella-portrait.jpg`. The About section will use that file automatically and gracefully fall back to `public/images/ella-portrait-placeholder.svg` until it is available. No layout changes are required.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Deploy — no extra configuration needed

Or use the Vercel CLI:

```bash
npx vercel
```
