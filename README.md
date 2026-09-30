# philwarner.dev

My portfolio site. It's still a work in progress. The hero and projects are done, and skills, experience, and the footer are next.

## Why plain HTML/CSS/JS

No framework and no build step, on purpose. It's a small site, and I wanted to get back to the fundamentals: design tokens, CSS custom properties, and a little vanilla JS. Everything the browser gets is exactly what's in this repo.

## What's in here

- `index.html`: the whole page
- `styles.css`: tokens up top (colors, spacing, type), then base styles, utilities, and one block per section
- `main.js`: the light/dark/system theme switch, plus starting the project video (it skips autoplay if you have reduce motion turned on)
- `assets/`: images, icons, and the RepoPulse demo video

A few things I care about:

- **Light and dark mode.** It follows your OS by default, and you can override it with the switch in the header. The choice is saved, and an inline script in the `<head>` applies it before the page paints, so there's no flash of the wrong theme.
- **Mobile first.** The base styles are for phones, and `min-width` media queries build up to desktop.
- **Accessibility.** Real buttons with `aria-pressed`, labeled icon buttons, and respect for reduced motion.

## Running it locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. You need a server because the paths start with `/`, so opening the file directly won't work.

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

Hosted on Vercel.
