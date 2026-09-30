# philwarner.dev

My portfolio site.

## Why plain HTML/CSS/JS

No framework and no build step, on purpose. It's a small site, and I wanted to get back to the fundamentals: design tokens, CSS custom properties, and a little vanilla JS. Everything the browser gets is exactly what's in `src/`.

## What's in here

- `src/`: the site itself, and the only folder that gets deployed
  - `index.html`: the whole page
  - `styles.css`: tokens up top (colors, spacing, type), then base styles, utilities, and one block per section
  - `main.js`: the light/dark/system theme switch, the copy-email button, and starting the project video (it skips autoplay if you have reduce motion turned on)
  - `assets/`: icons, the favicon, the RepoPulse demo video, and `img/` (generated image sizes)
- `images/`: full-size originals for the images on the site
- `scripts/images.js`: turns the originals into the sizes in `src/assets/img/`

A few things I care about:

- **Light and dark mode.** It follows your OS by default, and you can override it with the switch in the header. The choice is saved, and an inline script in the `<head>` applies it before the page paints, so there's no flash of the wrong theme.
- **Mobile first.** The base styles are for phones, and `min-width` media queries build up to desktop.
- **Accessibility.** Real buttons with `aria-pressed`, labeled icon buttons, and respect for reduced motion.

## Running it locally

```sh
npm run dev
```

Then open http://localhost:8000. It's just `python3 -m http.server` serving `src/`. You need a server because the paths start with `/`, so opening the file directly won't work.

## Images

Originals go in `images/`. Then:

```sh
npm run images
```

It uses [sharp](https://sharp.pixelplumbing.com/) to crop each one (per-image shapes live in `CROPS` at the top of the script) and write 800px and full-size versions in AVIF, WebP, and JPEG to `src/assets/img/`, with metadata stripped. The page serves them with `<picture>` and `srcset`, so each browser picks the smallest format and size it can use. Vercel doesn't run the script, so I run it locally and commit the output.

## Linting and formatting

```sh
npm install
npm run lint          # ESLint
npm run format        # Prettier, fixes files
npm run format:check  # Prettier, just reports
```

`main.js` has `// @ts-check` at the top, so VS Code type-checks it with TypeScript without needing a build.

## Projects on the site

- [NotWordle](https://notwordle.app/): a full-stack Wordle clone with a PostgreSQL-backed word list
- [RepoPulse](https://repopulse.tech): explore GitHub repositories through data

Hosted on Vercel, with the project's Root Directory set to `src`.
