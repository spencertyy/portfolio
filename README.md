# Portfolio — Yuyao Tu

Design developer portfolio. Two case studies, a hand-built token system, and no
framework doing the styling.

## Stack

Next.js 16 (App Router, Turbopack, React Compiler) · TypeScript · plain CSS.

No Tailwind, no CSS-in-JS, no component library. The token system is one of the
things this site is meant to demonstrate, so importing someone else's scale
would have been arguing with the point.

## Structure

```
src/app/
├── tokens.css              every colour, size, radius and shadow — one source
├── globals.css             reset, base typography, a11y baseline, layout
├── layout.tsx              shell: fixed blue rail + reading surface
├── components/
│   ├── Nav.tsx             aria-current drives both the state and its styling
│   └── RailFooter.tsx      contact marks, inline SVG, 44px targets
├── page.tsx                hero + work index
├── ai-chat/page.tsx        case study 01
├── urban-studio/page.tsx   case study 02
└── about/page.tsx
```

## Notes on the type system

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

## Accessibility baseline

`:focus-visible` rather than `:focus`. Reduced motion collapses transitions to
`0.01ms` rather than `none` — `none` stops `transitionend` from ever firing and
silently breaks anything waiting on it. Skip link. Icon-only links carry their
accessible name in `aria-label` and sit in 44px targets.

## Development

```bash
npm install
npm run dev -- -p 3002
npm run build
npm run lint
```
