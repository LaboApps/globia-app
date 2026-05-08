# Globia — Sovara landing site

Static site for [globia.app](https://globia.app), promoting **Sovara** by LocalFirst Apps.  
Built in pure HTML/CSS/JS — no frameworks, no trackers, no build step.

## Local development

Open any language page directly in a browser:

```
/en/index.html
/fr/index.html
/de/index.html
/es/index.html
/ar/index.html
```

For best results (correct relative paths for `/assets/`), serve locally:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx, no install needed)
npx serve .
```

Then visit `http://localhost:8080/en/`.

The root `index.html` reads browser language and redirects automatically.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (e.g. `laboapps/globia`).
2. Go to **Settings → Pages**.
3. Set **Source** to `main` branch, root `/`.
4. GitHub Pages will serve the site. The `CNAME` file routes `globia.app` automatically.

Full deployment steps: see [DEPLOIEMENT.md](./DEPLOIEMENT.md).

## Modifying content

All user-facing text lives in `/data/content.json`, organized by language key (`en`, `fr`, `de`, `es`, `ar`).

Edit the JSON file, then update the corresponding `/<lang>/index.html` — the HTML files are currently static (no build step). If you want a build step to auto-generate HTML from JSON, that can be added later.

## Adding a language

1. Add the new language key to `/data/content.json`.
2. Duplicate `/en/index.html` into `/<newlang>/index.html`.
3. Translate all text in the new HTML file.
4. Update the `<select>` options in all existing language files.
5. Add `<link rel="alternate" hreflang="<newlang>">` in all HTML `<head>` sections.
6. Add the new URL to `sitemap.xml`.
7. Update `redirectToLang()` in `/assets/js/app.js` (add to `SUPPORTED_LANGS` array).

## Replacing placeholder assets

| File | Replace with |
|------|-------------|
| `/assets/images/placeholders/sovara-screenshot-placeholder.svg` | Real Sovara screenshot (PNG/WebP, 320×640 or similar) |
| `/assets/images/og-image.svg` | Final OG image (PNG preferred, 1200×630) |
| `/assets/images/favicon.svg` | Final brand favicon |

## Structure

```
/
├── CNAME
├── index.html              (language redirect)
├── 404.html
├── robots.txt
├── sitemap.xml
├── manifest.json
├── privacy.html            (redirect to external policy)
├── en/index.html
├── fr/index.html
├── de/index.html
├── es/index.html
├── ar/index.html           (RTL)
├── press/index.html
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   └── images/
│       ├── favicon.svg
│       ├── og-image.svg
│       └── placeholders/sovara-screenshot-placeholder.svg
└── data/
    └── content.json        (all translations)
```
