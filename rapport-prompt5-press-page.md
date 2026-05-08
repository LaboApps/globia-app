# Rapport – Prompt 5 : Page presse / Press kit

**Date :** 2026-05-05  
**Projet :** Globia / Sovara  
**Domaine :** globia.app  
**Scope :** Ajout de la page presse dédiée `/press/` (racine + 5 versions linguistiques)

---

## 1. Fichiers créés

### Pages HTML — Press kit (5 langues)

| Fichier | Langue | URL finale |
|---|---|---|
| `en/press/index.html` | English | https://globia.app/en/press/ |
| `fr/press/index.html` | Français | https://globia.app/fr/press/ |
| `de/press/index.html` | Deutsch | https://globia.app/de/press/ |
| `es/press/index.html` | Español | https://globia.app/es/press/ |
| `ar/press/index.html` | العربية (RTL) | https://globia.app/ar/press/ |

### Page de redirection racine

| Fichier | Rôle |
|---|---|
| `press/index.html` | Détection langue → redirect `/xx/press/` (remplace l'ancien placeholder) |

### SVG logos placeholders

| Fichier | Dimensions | Fond |
|---|---|---|
| `assets/images/press/globia-logo-dark.svg` | 240×72 | Sombre (#0a0e14) |
| `assets/images/press/globia-logo-light.svg` | 240×72 | Clair (#f6f8fa) |
| `assets/images/press/sovara-icon-dark.svg` | 120×120 | Sombre (#0a0e14) |
| `assets/images/press/sovara-icon-light.svg` | 120×120 | Clair (#f6f8fa) |

---

## 2. Fichiers modifiés

### CSS — Nouveaux composants press page

**`assets/css/style.css`** — Bloc "Press page additions" ajouté :

- `.press-hero`, `.press-hero::before`, `.press-hero-content` — hero de la page presse
- `.press-hero h1`, `.press-hero .hero-sub`, `.press-updated` — typographie hero
- `.btn-download` — bouton accent pour téléchargement ZIP
- `.pitch-block`, `.pitch-header`, `.pitch-label`, `.pitch-text` — blocs pitch copiables
- `.copy-btn`, `.copy-btn.copied` — bouton copier avec feedback visuel vert
- `.facts-table`, `.facts-table td`, `.fact-url` — tableau 2 colonnes sans min-width
- `.logo-grid`, `.logo-item`, `.logo-preview`, `.logo-preview-light/.dark` — grille logos
- `.logo-meta`, `.logo-name`, `.logo-links` — métadonnées logos
- `.press-shots-grid`, `.press-shot-item`, `.press-shot-label`, `.press-shot-links` — grille screenshots
- `.promo-block`, `.promo-footer`, `.promo-label` — bloc image promotionnelle
- `.press-sub-h3` — titre de sous-section en majuscules
- `.media-list` — liste contenu ZIP
- `.press-contact-block`, `.press-contact-email`, `.press-review-note` — bloc contact
- `.sources-intro`, `.sources-list`, `.sources-note` — sources & vérification
- RTL overrides : `.pitch-header`, `.sources-list li`, `.media-list li`, etc.
- Responsive : logo-grid 2 colonnes (≤900px), press-shots-grid 2 colonnes

### JS — Fonction Copy

**`assets/js/app.js`** — Ajouté :

- `fallbackCopy(text, cb)` — fallback `execCommand('copy')` pour anciens navigateurs
- `initCopyButtons()` — itère sur `[data-copy-target]`, utilise `navigator.clipboard` avec fallback
- Feedback visuel "Copied!" pendant 2 secondes via `.copied` CSS class
- Appel `initCopyButtons()` dans le handler `DOMContentLoaded`
- Total ajouté : ~28 lignes

### Contenu JSON — Clé `press_page`

**`data/content.json`** — Clé `press_page` ajoutée pour chaque langue :

Structure par langue :
```json
"press_page": {
  "meta": { "title": "...", "description": "..." },
  "back_link": "...",
  "hero": { "eyebrow": "...", "h1": "...", "subtitle": "...", "cta_zip": "...", "updated": "..." },
  "pitch": {
    "title": "...", "subtitle": "...",
    "oneliner_label": "...", "oneliner": "...",
    "short_label": "...", "short": "...",
    "full_label": "...", "full_p1": "...", "full_p2": "...",
    "copy_label": "..."
  },
  "contact": { "title": "...", "email": "...", "response": "...", "languages": "...", "available": "...", "review_note": "..." }
}
```

Langues couvertes : EN · FR · DE · ES · AR  
Note : les sections `facts`, `assets`, `media`, `studio`, `sources` sont statiques dans le HTML car elles ne changent pas entre les pages (seule la langue des labels varie).

### Sitemap

**`sitemap.xml`** — 5 nouvelles entrées ajoutées (16 URLs totales) :

- `https://globia.app/en/press/` (priority 0.8, hreflang x-default, changefreq monthly)
- `https://globia.app/fr/press/` (priority 0.7)
- `https://globia.app/de/press/` (priority 0.7)
- `https://globia.app/es/press/` (priority 0.7)
- `https://globia.app/ar/press/` (priority 0.7)

### Pages home — Lien vers press kit

**`en/index.html`, `fr/index.html`, `de/index.html`, `es/index.html`, `ar/index.html`**  
Ajout dans la section press de chaque home, après le texte "kit sur demande" :

```html
<p style="margin-top:1rem;">
  <a class="btn-secondary" href="/xx/press/">[texte traduit] →</a>
</p>
```

Textes traduits :
- EN : "View full press kit →"
- FR : "Voir le kit presse complet →"
- DE : "Zur vollständigen Pressemappe →"
- ES : "Ver el kit de prensa completo →"
- AR : "← عرض حزمة الصحافة الكاملة"

---

## 3. Confirmation des 8 sections

Chaque page `/xx/press/` contient exactement ces sections :

| # | Section | ID HTML | Contenu |
|---|---|---|---|
| — | Header | `.site-header` | Réutilisé depuis le layout commun |
| — | Breadcrumb | `.breadcrumb` | ← Retour à Globia |
| Hero | Hero | `.press-hero` | Eyebrow + H1 + sous-titre + bouton ZIP + date mise à jour |
| 1 | Quick pitch | `#pitch` | 3 blocs pitch (one-liner, court, complet) avec bouton Copy |
| 2 | Key facts | `#facts` | Tableau 2 colonnes avec 17 entrées techniques |
| 3 | Differentiators | `#differentiators` | Tableau comparatif 4 colonnes + note sources avec URLs |
| 4 | Visual assets | `#assets` | Grille logos (4) + grille screenshots (4) + image promo |
| 5 | High-res media | `#media` | Lien ZIP + liste exhaustive du contenu de l'archive |
| 6 | About studio | `#about` | 2 paragraphes honnêtes LocalFirst Apps |
| 7 | Press contact | `#contact` | Email + délai réponse + langues + note codes révision |
| 8 | Sources | `#sources` | 4 liens sourcés + intro vérification indépendante |
| — | Footer | `.site-footer` | Réutilisé depuis le layout commun |

---

## 4. Confirmation des 5 versions linguistiques

| Langue | Fichier | dir | lang | Spécificité |
|---|---|---|---|---|
| English | `en/press/index.html` | ltr | `en` | Version de référence |
| Français | `fr/press/index.html` | ltr | `fr` | Pitchs idiomatiques pour Numerama/Frandroid |
| Deutsch | `de/press/index.html` | ltr | `de` | Pitchs idiomatiques pour Heise/Golem |
| Español | `es/press/index.html` | ltr | `es` | Pitchs adaptés presse hispanophone |
| العربية | `ar/press/index.html` | **rtl** | `ar` | RTL complet, pitchs style journalistique arabe |

**RTL Arabic :** `<html lang="ar" dir="rtl">`, flèche inversée "← عرض حزمة الصحافة الكاملة" en home, `text-align:right` sur les titres de sections, overrides CSS `[dir="rtl"]` actifs.

**SEO chaque page :**
- `<title>` localisé
- `<meta name="description">` ≈150 chars
- 5 balises `<link rel="alternate" hreflang="..">` vers `/xx/press/`
- `<link rel="canonical">`
- JSON-LD `WebPage` avec `about: SoftwareApplication`
- OG + Twitter Card

---

## 5. Confirmation du bouton Copy fonctionnel

**Implémentation :**
- HTML : `<button class="copy-btn" data-copy-target="pitch-oneliner" data-copied="Copied!">Copy</button>`
- Texte cible dans `<div id="pitch-oneliner">...</div>`
- JS : `navigator.clipboard.writeText()` + fallback `execCommand('copy')`
- Feedback : texte du bouton → "Copied!" + classe `.copied` (couleur verte) pendant 2 secondes
- Code ajouté dans `assets/js/app.js` : 28 lignes (fonctions `fallbackCopy` + `initCopyButtons`)

**3 boutons par page :** one-liner / short paragraph / full paragraph (2 `<p>` copiés ensemble)

---

## 6. Liste des assets placeholders à remplacer

| Asset | Fichier actuel | À remplacer par |
|---|---|---|
| Logo Globia dark | `assets/images/press/globia-logo-dark.svg` | Logo vectoriel réel sur fond sombre |
| Logo Globia light | `assets/images/press/globia-logo-light.svg` | Logo vectoriel réel sur fond clair |
| Icône Sovara dark | `assets/images/press/sovara-icon-dark.svg` | Icône app finale sur fond sombre |
| Icône Sovara light | `assets/images/press/sovara-icon-light.svg` | Icône app finale sur fond clair |
| Screenshot alert | `assets/images/placeholders/sovara-screen-alert.svg` | PNG réel 1080×2340 |
| Screenshot history | `assets/images/placeholders/sovara-screen-history.svg` | PNG réel 1080×2340 |
| Screenshot details | `assets/images/placeholders/sovara-screen-details.svg` | PNG réel 1080×2340 |
| Screenshot whitelist | `assets/images/placeholders/sovara-screen-whitelist.svg` | PNG réel 1080×2340 |
| Image promo | `assets/images/og-image.svg` | PNG réel 1200×630 |
| **ZIP press kit** | `/press/sovara-press-kit.zip` | **À créer manuellement** |

**Note ZIP :** Le lien `/press/sovara-press-kit.zip` existe dans la page mais le fichier n'est pas créé (impossible en HTML statique). L'utilisateur doit :
1. Rassembler les vrais assets (logos PNG, screenshots PNG, PDFs)
2. Les compresser en ZIP nommé `sovara-press-kit.zip`
3. Déposer le fichier à `C:\projets\Globia\press\sovara-press-kit.zip`
4. Inclure dans le ZIP : logos SVG+PNG, screenshots PNG, og-image PNG, fact-sheet PDF, page PDF

---

## 7. Confirmation du lien depuis la home

✅ **5 fichiers home modifiés** : `en/`, `fr/`, `de/`, `es/`, `ar/`  
✅ Lien ajouté **dans la section press existante**, après le texte "kit sur demande"  
✅ Chaque lien pointe vers `/xx/press/` (code langue correct)  
✅ Texte traduit dans chaque langue  
✅ RTL arabe : flèche à gauche (←) avant le texte

---

## Structure des nouveaux fichiers créés

```
C:\projets\Globia\
├── press/
│   └── index.html            ← MODIFIÉ (redirect → /xx/press/)
├── en/press/index.html       ← CRÉÉ
├── fr/press/index.html       ← CRÉÉ
├── de/press/index.html       ← CRÉÉ
├── es/press/index.html       ← CRÉÉ
├── ar/press/index.html       ← CRÉÉ
├── assets/
│   ├── css/style.css         ← MODIFIÉ (+200 lignes CSS press)
│   ├── js/app.js             ← MODIFIÉ (+28 lignes Copy function)
│   └── images/press/
│       ├── globia-logo-dark.svg   ← CRÉÉ (placeholder)
│       ├── globia-logo-light.svg  ← CRÉÉ (placeholder)
│       ├── sovara-icon-dark.svg   ← CRÉÉ (placeholder)
│       └── sovara-icon-light.svg  ← CRÉÉ (placeholder)
├── data/content.json         ← MODIFIÉ (press_page pour 5 langues)
├── sitemap.xml               ← MODIFIÉ (16 URLs totales)
├── en/index.html             ← MODIFIÉ (lien press kit)
├── fr/index.html             ← MODIFIÉ
├── de/index.html             ← MODIFIÉ
├── es/index.html             ← MODIFIÉ
└── ar/index.html             ← MODIFIÉ
```

---

---

## INFOS À COPIER-COLLER

```
====================================================
CHECKLIST VALIDATION — PAGE PRESSE / PRESS KIT
Prompt 5 – Globia / globia.app
Date : 2026-05-05
====================================================

FICHIERS CRÉÉS (vérifier dans l'explorateur)
---------------------------------------------
[ ] press/index.html                    (doit redirecter, pas afficher de page)
[ ] en/press/index.html
[ ] fr/press/index.html
[ ] de/press/index.html
[ ] es/press/index.html
[ ] ar/press/index.html
[ ] assets/images/press/globia-logo-dark.svg
[ ] assets/images/press/globia-logo-light.svg
[ ] assets/images/press/sovara-icon-dark.svg
[ ] assets/images/press/sovara-icon-light.svg

FICHIERS MODIFIÉS (vérifier dans VS Code)
------------------------------------------
[ ] press/index.html        → ne contient plus de HTML page, juste le redirect JS
[ ] assets/css/style.css    → bloc "Press page additions" visible en bas
[ ] assets/js/app.js        → fonctions fallbackCopy + initCopyButtons + appel DOMContentLoaded
[ ] data/content.json       → clé "press_page" pour les 5 langues
[ ] sitemap.xml             → 16 URLs (6 home + 5 sovara + 5 press)
[ ] en/index.html           → lien "View full press kit →" dans la section press
[ ] fr/index.html           → lien "Voir le kit presse complet →"
[ ] de/index.html           → lien "Zur vollständigen Pressemappe →"
[ ] es/index.html           → lien "Ver el kit de prensa completo →"
[ ] ar/index.html           → lien "← عرض حزمة الصحافة الكاملة"

TESTS NAVIGATION DANS LE NAVIGATEUR (serveur local)
------------------------------------------------------
[ ] http://localhost:8080/press/          → redirect vers /en/press/ ou /fr/press/
[ ] http://localhost:8080/en/press/       → page s'affiche OK
[ ] http://localhost:8080/fr/press/       → page s'affiche OK
[ ] http://localhost:8080/de/press/       → page s'affiche OK
[ ] http://localhost:8080/es/press/       → page s'affiche OK
[ ] http://localhost:8080/ar/press/       → page RTL correcte (arabe aligné droite)
[ ] /en/index.html → cliquer "View full press kit →" → arrive sur /en/press/
[ ] Tester dark/light toggle depuis la page press

TEST BOUTON COPY (CRITIQUE)
-----------------------------
[ ] Aller sur /en/press/#pitch
[ ] Cliquer "Copy" sur le one-liner → vérifier que le texte est dans le presse-papier
[ ] Vérifier que le bouton affiche "Copied!" en vert pendant 2 secondes
[ ] Vérifier que le bouton revient à "Copy" après 2 secondes
[ ] Tester aussi "Copy" sur le paragraphe complet (2 <p>) → vérifier que les 2 paragraphes sont copiés avec saut de ligne

TESTS SEO (inspecter le <head> de /en/press/)
----------------------------------------------
[ ] <title> = "Press kit — Sovara by LocalFirst Apps"
[ ] <meta name="description"> présent
[ ] 5 balises <link rel="alternate" hreflang=".."> vers /xx/press/
[ ] <link rel="alternate" hreflang="x-default"> pointe vers /en/press/
[ ] <link rel="canonical"> présent
[ ] JSON-LD type "WebPage" avec "about" SoftwareApplication

TESTS VISUELS
--------------
[ ] Section Hero : eyebrow + H1 + sous-titre + bouton cyan + date
[ ] Section Pitchs : 3 blocs avec label en majuscules + bouton Copy
[ ] Section Facts : tableau 2 colonnes, pas de scroll horizontal sur mobile
[ ] Section Comparaison : tableau 4 colonnes identique à la home + note sources avec URLs cliquables
[ ] Section Assets : 4 logos (2 fonds dark, 2 fonds clair) + 4 screenshots + image promo
[ ] Section Contact : email cliquable + bloc visuel distinct
[ ] RTL arabe : tous les textes alignés à droite, tableau inversé

VALIDATION SITEMAP
-------------------
[ ] Ouvrir sitemap.xml → compter 16 blocs <url>
[ ] Vérifier /en/press/ avec hreflang x-default
[ ] Vérifier changefreq="monthly" pour les pages press

TÂCHES MANUELLES REQUISES AVANT LANCEMENT
-------------------------------------------
[ ] Créer le ZIP press kit réel :
    - Logos Globia réels (SVG + PNG @1x @2x @3x)
    - Icône Sovara réelle (SVG + PNG)
    - Screenshots app réels (PNG 1080×2340)
    - Image promo réelle (PNG 1200×630)
    - Fact sheet PDF
    - Page press en PDF
    → Nommer : sovara-press-kit.zip
    → Déposer à : C:\projets\Globia\press\sovara-press-kit.zip

[ ] Remplacer les 4 logos placeholders SVG dans assets/images/press/
[ ] Remplacer les 4 screenshots SVG dans assets/images/placeholders/
[ ] Remplacer l'og-image.svg par le PNG final

DÉPLOIEMENT GITHUB PAGES
--------------------------
[ ] git add -A
[ ] git commit -m "feat: add press kit page (5 languages)"
[ ] git push origin main
[ ] Vérifier https://globia.app/press/ redirige vers /en/press/ ou /fr/press/
[ ] Vérifier https://globia.app/en/press/ charge sans erreur 404
[ ] Vérifier https://globia.app/ar/press/ affiche en RTL
[ ] Vérifier que le bouton Copy fonctionne en production (HTTPS requis pour navigator.clipboard)

NOTE CLIPBOARD : navigator.clipboard nécessite HTTPS. En localhost non-HTTPS,
le fallback execCommand('copy') prend le relais automatiquement.
Sur GitHub Pages (HTTPS), navigator.clipboard fonctionnera normalement.

====================================================
```
