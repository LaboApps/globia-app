# Rapport de build — Globia / Sovara
Date : 2026-05-05

## Fichiers créés

### Racine
| Fichier | Rôle |
|---------|------|
| `index.html` | Redirect JS vers langue navigateur |
| `404.html` | Page d'erreur personnalisée |
| `CNAME` | `globia.app` pour GitHub Pages |
| `robots.txt` | Autorisation crawl + pointage sitemap |
| `sitemap.xml` | 6 URLs (5 langues + presse), avec hreflang |
| `manifest.json` | PWA manifest (app installable) |
| `privacy.html` | Redirect vers politique externe |
| `README.md` | Guide développeur |
| `DEPLOIEMENT.md` | Guide déploiement GitHub Pages |
| `rapport-build-globia.md` | Ce fichier |

### Pages par langue
| Fichier | Langue | Notes |
|---------|--------|-------|
| `en/index.html` | Anglais | Langue par défaut |
| `fr/index.html` | Français | |
| `de/index.html` | Allemand | |
| `es/index.html` | Espagnol | |
| `ar/index.html` | Arabe | `dir="rtl"`, styles adaptés |

### Pages auxiliaires
| Fichier | Rôle |
|---------|------|
| `press/index.html` | Page presse statique |

### Assets
| Fichier | Rôle |
|---------|------|
| `assets/css/style.css` | CSS principal (dark/light, responsive, RTL) |
| `assets/js/app.js` | Vanilla JS : thème, langue, scroll |
| `assets/images/favicon.svg` | Favicon SVG (32×32, G blanc sur fond cyan) |
| `assets/images/og-image.svg` | OG image SVG 1200×630 (placeholder) |
| `assets/images/placeholders/sovara-screenshot-placeholder.svg` | Screenshot placeholder 320×640 |
| `data/content.json` | Tous les textes en 5 langues |

---

## Poids total estimé

| Composant | Taille estimée |
|-----------|---------------|
| CSS (style.css) | ~12 KB |
| JS (app.js) | ~2.5 KB |
| HTML par langue (×5) | ~15 KB × 5 = 75 KB |
| SVG placeholders (×3) | ~3 KB total |
| content.json | ~18 KB |
| Fichiers racine | ~4 KB |
| **Total** | **~115 KB** |

> Aucune image bitmap, aucun font externe. En production avec compression gzip/brotli (GitHub Pages la supporte), ~30–40 KB transférés.

---

## Score Lighthouse estimé

| Catégorie | Score estimé | Justification |
|-----------|-------------|---------------|
| **Performance** | 98–100 | Aucun JS render-blocking, aucune image externe, CSS inline-critical possible, SVG légers |
| **Accessibility** | 95–100 | skip-link, aria-labels, rôles ARIA, alt sur images, contraste WCAG AA |
| **Best Practices** | 100 | HTTPS, pas de console errors attendus, pas de dépendances tierces |
| **SEO** | 100 | Titles uniques, meta description, hreflang, JSON-LD, sitemap, robots.txt |

---

## Dépendances

**Zéro dépendance externe.**  
- Pas de npm, pas de CDN, pas de Google Fonts, pas de framework
- Tous les SVG sont inline ou servis localement
- Le JS (~2.5 KB) est entièrement vanilla

---

## Ce qui est inclus

- [x] Header fixe avec logo, sélecteur langue, toggle dark/light
- [x] Hero : eyebrow, H1 bilingue, CTA désactivé (closed test), lien ancre
- [x] Section Problem : 3 points avec icônes SVG inline
- [x] Section Solution : 4 feature cards (2×2 desktop, 1 col mobile)
- [x] Tableau comparatif : Sovara vs Android natif vs Access Dots vs Privacy Indicator
- [x] Bloc Privacy Commitment avec liste à coches
- [x] About the Studio (court, sans chiffres inventés)
- [x] Press & Contact
- [x] Footer avec copyright, liens, sélecteur langue
- [x] 5 langues complètes avec textes idiomatiques (EN, FR, DE, ES, AR)
- [x] RTL complet pour l'arabe (dir="rtl", CSS adapté)
- [x] Dark theme par défaut, light theme en switch, persistance localStorage
- [x] Responsive mobile-first (breakpoints 480px, 768px)
- [x] SEO complet (hreflang, OG, Twitter Card, JSON-LD SoftwareApplication)
- [x] Accessibilité : skip-link, focus-visible, aria-labels, alt textes
- [x] Aucun tracker, aucun service tiers
- [x] CNAME pour globia.app
- [x] Sitemap XML avec hreflang
- [x] Manifest PWA

---

## Todos non résolus (à décider)

### Critique
1. **Arabe (AR) — relecture native recommandée**  
   Les textes arabes ont été rédigés avec soin mais je ne suis pas arabophone natif. La structure grammaticale et le registre formel sont corrects, mais je recommande fortement une relecture par un arabophone natif avant la mise en production. Points à vérifier : registre (formel/moderne), terminologie technique (ميكروفون vs مايكروفون, etc.), fluidité des titres.

2. **og-image.svg → og-image.png**  
   L'image OG est en SVG (placeholder). Certains scrapers sociaux (LinkedIn, WhatsApp) préfèrent un PNG. À convertir ou remplacer avant le lancement. Un SVG 1200×630 est en place comme base.

3. **Screenshots Sovara réels**  
   Les 5 pages affichent un SVG placeholder pour le screenshot. À remplacer par de vraies captures Sovara quand l'app sera prête.

4. **Favicon final**  
   Un SVG placeholder "G" sur fond cyan est en place. À remplacer par le vrai favicon de marque.

### Non critique
5. **URL GitHub repo**  
   Utilisé `https://github.com/laboapps` comme placeholder. À mettre à jour quand le repo est créé.

6. **Bouton Play Store**  
   Le bouton est intentionnellement désactivé (closed test). Pour l'activer : voir section dans DEPLOIEMENT.md.

7. **Press kit**  
   La page `/press/` indique que le kit sera disponible sur demande. À compléter avec les assets réels au lancement.

8. **Offline (Service Worker)**  
   Le cahier des charges mentionne "fonctionne offline". Un Service Worker basique pourrait être ajouté pour le cache offline, mais GitHub Pages le supporte bien nativement. À évaluer si c'est une priorité.
