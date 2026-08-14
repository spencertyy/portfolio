# Portfolio — Yuyao Tu

**[portfolio-sand-nine-91.vercel.app](https://portfolio-sand-nine-91.vercel.app)**

Design developer portfolio. Two case studies, a coursework index, a hand-built
token system, and no framework doing the styling.

## Stack

Next.js 16 (App Router, Turbopack, React Compiler) · TypeScript · plain CSS.

No Tailwind, no CSS-in-JS, no component library. The token system is one of the
things this site is meant to demonstrate, so importing someone else's scale
would have been arguing with the point.

## Structure

```
src/app/
├── tokens.css                    every colour, size, radius and shadow
├── globals.css                   reset, base typography, a11y baseline, layout
├── layout.tsx                    shell: fixed blue rail + reading surface
├── components/
│   ├── Nav.tsx                   aria-current drives both state and styling
│   └── RailFooter.tsx            contact marks, inline SVG, 44px targets
├── page.tsx                      hero + work index
├── ai-chat/page.tsx              case study 01
├── urban-studio/page.tsx         case study 02
├── coursework/
│   ├── projects.ts               the data — one entry per project
│   ├── page.tsx                  index grid
│   └── [slug]/page.tsx           detail page, statically generated per entry
└── about/page.tsx
```

## Adding a coursework project

One edit, one file. Append an entry to `PROJECTS` in
`src/app/coursework/projects.ts`:

```ts
{
  slug: "route-segment",          // becomes /coursework/route-segment
  title: "Project Name",
  context: "Course · University of Utah",
  year: "2024",
  summary: "One clause, shown under the title in the grid.",
  role: "What you personally did",  // optional
  stack: ["TypeScript", "React"],
  body: ["First paragraph.", "Second paragraph."],
  github: "https://github.com/...",  // optional
  live: "https://...",               // optional
  image: {                           // optional — a hatched tile stands in
    src: "/coursework/name.png",
    width: 1600,
    height: 1200,
    alt: "What the screenshot shows",
  },
}
```

`generateStaticParams` reads the same array, so the route is prerendered at
build time. No component needs touching.

## Type system

- The scale is **hand-tuned by role**, not generated from a ratio. One ratio has
  to compromise between dense UI and display type; ten steps chosen separately
  do not.
- Display steps are fluid — `clamp(min, A rem + B vw, max)`. The middle term
  mixes `rem` into `vw` deliberately: a pure `vw` value ignores the reader's
  browser font-size setting, which fails WCAG 1.4.4.
- Spacing is a 4pt grid with half steps, named for its pixel value, so
  `--space-10` is 10px and there is no arithmetic to do while reading a rule.
- Colours are named by context (`--color-ink` vs `--color-ink-on-brand`) rather
  than by shade, so a component never needs to know which surface it is on.
- The typeface is Fraunces, chosen over a heavier alternative for two things the
  layout depends on: lining figures, because numbers carry structure here, and a
  drawn italic rather than a synthesised slant.

## Accessibility baseline

`:focus-visible` rather than `:focus`. Reduced motion collapses transitions to
`0.01ms` rather than `none` — `none` stops `transitionend` from ever firing and
silently breaks anything waiting on it. Skip link. Icon-only links carry their
accessible name in `aria-label` and sit in 44px targets. Capitals are set with
`text-transform`, so the DOM keeps real casing for screen readers.

## Development

```bash
npm install
npm run dev -- -p 3002
npm run build
npm run lint
```

Deploys automatically from `main` via Vercel. No environment variables.
