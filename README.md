# Portfolio v2

An independent recreation of Prince Charles Clemente’s editorial portfolio using React, TypeScript, Vite, Mantine, CSS, GSAP, and Framer Motion.

## Run

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

All assets are local. Photographs and technology marks were copied from `../portfolio-assets`; the supplied portfolio provides the project screenshots, student/instructor photographs, background, crown, and original reveal-mask illustration. Update section content in `src/App.tsx` and presentation in `src/styles.css`.

The skills track loops with CSS masking. GSAP continuously loops the panel layouts and SVG reveal-mask strokes independently of scroll; Framer Motion owns 0.75-second section entrances. The fixed theme toggle uses Mantine’s persisted color scheme: warm gold accents in dark mode and pastel peach, lilac, mint, and butter panels in light mode. Reduced-motion mode disables the loop and scroll effects. No backend or deployment is required.
