# Rapport – Prompt 4 : Page produit Sovara

**Date :** 2026-05-05  
**Projet :** Globia / Sovara  
**Domaine :** globia.app  
**Scope :** Ajout de la page produit dédiée `/sovara/` (racine + 5 versions linguistiques)

---

## 1. Fichiers créés

### Pages HTML – Page produit Sovara (5 langues)

| Fichier | Langue | URL finale |
|---|---|---|
| `en/sovara/index.html` | English | https://globia.app/en/sovara/ |
| `fr/sovara/index.html` | Français | https://globia.app/fr/sovara/ |
| `de/sovara/index.html` | Deutsch | https://globia.app/de/sovara/ |
| `es/sovara/index.html` | Español | https://globia.app/es/sovara/ |
| `ar/sovara/index.html` | العربية (RTL) | https://globia.app/ar/sovara/ |

### Page de redirection racine

| Fichier | Rôle |
|---|---|
| `sovara/index.html` | Détection langue → redirect `/xx/sovara/` |

### SVG placeholders

| Fichier | Dimensions | Contenu simulé |
|---|---|---|
| `assets/images/placeholders/sovara-demo-wide.svg` | 1280×720 (16:9) | Interface Sovara complète : alertes, historique, stats, sidebar |
| `assets/images/placeholders/sovara-screen-alert.svg` | 320×640 (portrait) | Écran alertes avec point rouge et liste historique |
| `assets/images/placeholders/sovara-screen-history.svg` | 320×640 (portrait) | Historique chronologique avec filtres chips |
| `assets/images/placeholders/sovara-screen-details.svg` | 320×640 (portrait) | Vue détail application avec champs et boutons d'action |
| `assets/images/placeholders/sovara-screen-whitelist.svg` | 320×640 (portrait) | Gestion whitelist avec toggles interrupteurs |

---

## 2. Fichiers modifiés

### CSS – Nouveaux composants Sovara

**`assets/css/style.css`** — Blocs CSS ajoutés :

- `.breadcrumb` — barre de navigation retour
- `.back-link` — lien ← retour vers home avec hover
- `.sovara-hero` — section hero pleine largeur avec gradient
- `.sovara-hero-content` — contenu centré du hero
- `.demo-visual` — conteneur 16:9 pour la démonstration large
- `.steps-grid` — grille 4 colonnes (desktop) → 2 colonnes (mobile)
- `.step-card` — carte étape avec hover lift
- `.step-number` — numéro accent cerclé (40×40px)
- `.step-label` — badge texte muted
- `.screenshots-grid` — grille 4 colonnes → 2 colonnes (≤900px)
- `.screenshot-item` — conteneur phone portrait avec label
- `.truth-grid` — grille 3 colonnes → 1 colonne (mobile)
- `.truth-card` — carte avec bordure gauche accent ; RTL : bordure droite
- `.audience-grid` — grille 4 colonnes → 2 colonnes → 1 colonne
- `.audience-card` — carte avec emoji 2rem et hover lift

### Contenu JSON – Clé `sovara_page`

**`data/content.json`** — Clé `sovara_page` ajoutée pour chaque langue :

Structure par langue :
```json
"sovara_page": {
  "meta": { "title": "...", "description": "..." },
  "hero": { "eyebrow": "...", "h1": "...", "subtitle": "...", "cta_disabled": "..." },
  "steps": {
    "step1": { "label": "...", "title": "...", "body": "..." },
    "step2": { "label": "...", "title": "...", "body": "..." },
    "step3": { "label": "...", "title": "...", "body": "..." },
    "step4": { "label": "...", "title": "...", "body": "..." }
  },
  "screenshots": { "title": "...", "alt1": "...", "alt2": "...", "alt3": "...", "alt4": "..." },
  "technical": {
    "title": "...",
    "truth1": { "title": "...", "body": "..." },
    "truth2": { "title": "...", "body": "..." },
    "truth3": { "title": "...", "body": "..." }
  },
  "audience": {
    "title": "...",
    "card1": { "icon": "...", "title": "...", "body": "..." },
    "card2": { "icon": "...", "title": "...", "body": "..." },
    "card3": { "icon": "...", "title": "...", "body": "..." },
    "card4": { "icon": "...", "title": "...", "body": "..." }
  },
  "back_link": "..."
}
```

Langues couvertes : EN · FR · DE · ES · AR

### Pages home – Mise à jour des liens

**`en/index.html`, `fr/index.html`, `de/index.html`, `es/index.html`, `ar/index.html`**

Deux modifications par fichier :

1. **CTA "Comment ça marche"** — `href` mis à jour :
   - Avant : `href="#how-it-works"`
   - Après : `href="/xx/sovara/"` (xx = code langue)

2. **Lien "Voir la page produit complète"** — ajouté avant la section Comparison :
   ```html
   <div class="container" style="text-align:center; padding-bottom: var(--section-gap);">
     <a class="btn-secondary" href="/xx/sovara/" style="font-size:1rem;">
       [texte traduit] →
     </a>
   </div>
   ```

   Textes par langue :
   - EN : "See the full product page →"
   - FR : "Voir la page produit complète →"
   - DE : "Zur vollständigen Produktseite →"
   - ES : "Ver la página completa del producto →"
   - AR : "← عرض صفحة المنتج الكاملة"

### Sitemap

**`sitemap.xml`** — 5 nouvelles entrées `<url>` ajoutées :

- `https://globia.app/en/sovara/` (priority 0.9, hreflang x-default)
- `https://globia.app/fr/sovara/` (priority 0.8)
- `https://globia.app/de/sovara/` (priority 0.8)
- `https://globia.app/es/sovara/` (priority 0.8)
- `https://globia.app/ar/sovara/` (priority 0.8)

Chaque entrée contient 5 balises `<xhtml:link rel="alternate" hreflang="...">` pour le SEO multilingue.

---

## 3. Confirmation des 5 sections

Chaque page `/xx/sovara/` contient exactement ces sections, dans l'ordre :

| # | Section | Classe CSS | Contenu |
|---|---|---|---|
| — | Header | `.site-header` | Réutilisé depuis le layout commun |
| 1 | Hero | `.sovara-hero` | Eyebrow + H1 + sous-titre + CTA désactivé + démo 16:9 |
| 2 | Étapes | `.problem` | 4 cartes `.step-card` numérotées (1→4) |
| 3 | Captures | `<section>` | Grille 2×2 de 4 `.screenshot-item` |
| 4 | Vérités techniques | `.comparison` | 3 `.truth-card` avec bordure accent |
| 5 | Pour qui | `.about` | 4 `.audience-card` avec icône emoji |
| — | Footer | `.site-footer` | Réutilisé depuis le layout commun |

**CTA Play Store :** désactivé sur toutes les versions (`disabled`, `aria-disabled="true"`, cursor not-allowed) — statut "test fermé".

---

## 4. Confirmation des 5 versions linguistiques

| Langue | Fichier | dir | lang | back_link direction |
|---|---|---|---|---|
| English | `en/sovara/index.html` | ltr | `en` | ← à gauche |
| Français | `fr/sovara/index.html` | ltr | `fr` | ← à gauche |
| Deutsch | `de/sovara/index.html` | ltr | `de` | ← à gauche |
| Español | `es/sovara/index.html` | ltr | `es` | ← à gauche |
| العربية | `ar/sovara/index.html` | **rtl** | `ar` | → à droite |

**RTL Arabic :** `<html lang="ar" dir="rtl">`, flèche inversée "العودة إلى Globia →", règles CSS `[dir="rtl"]` actives pour truth-cards et breadcrumb.

Chaque fichier inclut :
- Balises hreflang vers les 5 URLs `/xx/sovara/`
- JSON-LD `SoftwareApplication` avec `applicationCategory: "UtilitiesApplication"`
- Meta OG (title, description, image)
- Canonical URL

---

## 5. Confirmation des placeholders

| SVG | Usage dans la page | Ratio |
|---|---|---|
| `sovara-demo-wide.svg` | `.demo-visual` dans le Hero | 16:9 (1280×720) |
| `sovara-screen-alert.svg` | Screenshot #1 (Alertes) | Portrait téléphone |
| `sovara-screen-history.svg` | Screenshot #2 (Historique) | Portrait téléphone |
| `sovara-screen-details.svg` | Screenshot #3 (Détails) | Portrait téléphone |
| `sovara-screen-whitelist.svg` | Screenshot #4 (Whitelist) | Portrait téléphone |

Tous les SVG sont auto-hébergés, sans ressource externe, sans bitmap. Le SVG wide simule une UI complète (sidebar, alertes, stats). Les 4 écrans simulant des captures Android sont en 320×640 px.

---

## 6. Confirmation de la mise à jour des liens home

✅ **5 fichiers home modifiés** : `en/`, `fr/`, `de/`, `es/`, `ar/`  
✅ **CTA "How it works / Comment ça marche / Wie es funktioniert / Cómo funciona / كيف يعمل"** : pointe désormais vers `/xx/sovara/`  
✅ **Lien "Voir page produit complète"** : ajouté avant la section Comparison dans chaque home  
✅ **Textes traduits** dans chaque langue

---

## 7. Confirmation de la mise à jour du sitemap

✅ **sitemap.xml** : 11 URLs totales (6 home + 5 sovara)  
✅ **hreflang xhtml:link** : présent sur toutes les entrées sovara  
✅ **x-default** : `/en/sovara/` désigné comme défaut  
✅ **lastmod** : 2026-05-05  
✅ **changefreq** : weekly pour les pages sovara  
✅ **priority** : 0.9 (EN) et 0.8 (FR/DE/ES/AR)

---

## Structure complète du projet

```
C:\projets\Globia\
├── index.html                        (redirect racine → /xx/)
├── CNAME                             (globia.app)
├── robots.txt
├── sitemap.xml                       ← MODIFIÉ (11 URLs)
├── manifest.json
├── data/
│   └── content.json                  ← MODIFIÉ (sovara_page ajouté)
├── assets/
│   ├── css/style.css                 ← MODIFIÉ (15+ nouvelles classes)
│   ├── js/app.js
│   └── images/
│       ├── favicon.svg
│       ├── og-image.svg
│       └── placeholders/
│           ├── hero-placeholder.svg
│           ├── sovara-demo-wide.svg  ← CRÉÉ
│           ├── sovara-screen-alert.svg    ← CRÉÉ
│           ├── sovara-screen-history.svg  ← CRÉÉ
│           ├── sovara-screen-details.svg  ← CRÉÉ
│           └── sovara-screen-whitelist.svg ← CRÉÉ
├── sovara/
│   └── index.html                    ← CRÉÉ (redirect racine)
├── en/
│   ├── index.html                    ← MODIFIÉ (liens sovara)
│   └── sovara/index.html             ← CRÉÉ
├── fr/
│   ├── index.html                    ← MODIFIÉ
│   └── sovara/index.html             ← CRÉÉ
├── de/
│   ├── index.html                    ← MODIFIÉ
│   └── sovara/index.html             ← CRÉÉ
├── es/
│   ├── index.html                    ← MODIFIÉ
│   └── sovara/index.html             ← CRÉÉ
└── ar/
    ├── index.html                    ← MODIFIÉ
    └── sovara/index.html             ← CRÉÉ
```

---

---

## INFOS À COPIER-COLLER

```
====================================================
CHECKLIST VALIDATION – PAGE PRODUIT SOVARA
Prompt 4 – Globia / globia.app
Date : 2026-05-05
====================================================

FICHIERS CRÉÉS (à vérifier dans l'explorateur)
-----------------------------------------------
[ ] sovara/index.html
[ ] en/sovara/index.html
[ ] fr/sovara/index.html
[ ] de/sovara/index.html
[ ] es/sovara/index.html
[ ] ar/sovara/index.html
[ ] assets/images/placeholders/sovara-demo-wide.svg
[ ] assets/images/placeholders/sovara-screen-alert.svg
[ ] assets/images/placeholders/sovara-screen-history.svg
[ ] assets/images/placeholders/sovara-screen-details.svg
[ ] assets/images/placeholders/sovara-screen-whitelist.svg

FICHIERS MODIFIÉS (à vérifier dans VS Code)
--------------------------------------------
[ ] data/content.json        → clé "sovara_page" visible pour 5 langues
[ ] assets/css/style.css     → classes .step-card, .truth-card, .audience-card, .demo-visual…
[ ] en/index.html            → btn "How it works" → /en/sovara/ + lien page produit
[ ] fr/index.html            → btn "Comment ça marche" → /fr/sovara/ + lien page produit
[ ] de/index.html            → btn "Wie es funktioniert" → /de/sovara/ + lien page produit
[ ] es/index.html            → btn "Cómo funciona" → /es/sovara/ + lien page produit
[ ] ar/index.html            → btn "كيف يعمل" → /ar/sovara/ + lien page produit
[ ] sitemap.xml              → 11 URLs (6 home + 5 sovara)

TESTS NAVIGATION DANS LE NAVIGATEUR
-------------------------------------
[ ] Ouvrir en/index.html → cliquer "How it works" → arrive sur en/sovara/index.html
[ ] Ouvrir en/index.html → cliquer "See the full product page" → arrive sur en/sovara/index.html
[ ] Ouvrir ar/sovara/index.html → vérifier RTL (texte aligné à droite, ← devenu →)
[ ] Vérifier démo SVG 16:9 visible dans le hero de chaque sovara/
[ ] Vérifier grille 2×2 screenshots visible
[ ] Vérifier que le bouton Play Store est désactivé (grisé, cursor: not-allowed)
[ ] Tester le toggle dark/light depuis la page sovara
[ ] Vérifier le lien "← Retour" fonctionne vers la home correspondante

TESTS SEO (inspecter le <head>)
---------------------------------
[ ] <title> contient "Sovara" + nom de la langue
[ ] <meta name="description"> présent et non vide
[ ] 5 balises <link rel="alternate" hreflang=".."> pointant vers /xx/sovara/
[ ] <link rel="canonical"> pointe vers l'URL canonique correcte
[ ] <script type="application/ld+json"> contient "SoftwareApplication"
[ ] <meta property="og:title"> présent

VALIDATION SITEMAP
-------------------
[ ] Ouvrir sitemap.xml → compter 11 blocs <url>
[ ] Vérifier https://globia.app/en/sovara/ avec hreflang x-default
[ ] Valider sur https://validator.w3.org/feed/ (coller le contenu XML)

DÉPLOIEMENT GITHUB PAGES
--------------------------
[ ] git add -A
[ ] git commit -m "feat: add Sovara product page (5 languages)"
[ ] git push origin main
[ ] Vérifier https://globia.app/sovara/ redirige bien vers /en/sovara/
[ ] Vérifier https://globia.app/en/sovara/ charge sans erreur 404
[ ] Vérifier https://globia.app/ar/sovara/ affiche bien en RTL

====================================================
```
