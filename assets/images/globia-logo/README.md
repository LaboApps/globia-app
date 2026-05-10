# Globia — Pack Logo

Pack complet du logo Globia.
Couleurs de marque :
- Cyan studio : `#39C5CF`
- Texte clair : `#E6EDF3`
- Texte sombre / fond : `#0D1117`

Police du wordmark : **IBM Plex Sans 600** (les SVG la déclarent ; les PNG ont
été rendus avec DejaVu Sans Bold qui en est très proche pour les contextes
hors web — sur le web les SVG affichent IBM Plex Sans via Google Fonts).

---

## Structure du pack

```
/svg/                  → SVG sources (à utiliser sur le web, scalables)
/svg-render/           → SVG techniques (avec DejaVu Sans, pour rendu PNG)
/png/                  → PNG exportés à toutes les tailles utiles
/favicon.ico           → Favicon multi-résolutions (16/32/48)
/README.md             → Ce fichier
```

---

## Usage de chaque variante

### `mark-cyan` — Le bouclier seul, en cyan
Pour fonds sombres (recommandé). Header du site, mark dans une carte.
Tailles fournies : 16, 24, 32, 48, 64, 96, 128, 192, 256, 512, 1024 px.

### `mark-white` — Le bouclier en blanc
Pour fonds très sombres ou colorés où le cyan ne contrasterait pas assez.

### `mark-black` — Le bouclier en noir
Pour fonds clairs (papier, impression mode jour).

### `favicon` — Variante remplie pour favicon
Le mark plein cyan avec le G en négatif. Optimisé pour rester lisible
même à 16×16 (les bords fins du mark vide deviennent flous à cette taille).
À utiliser comme `<link rel="icon">` sur le site.
Tailles : 16, 32, 48, 96, 192, 512.
**Voir aussi `/favicon.ico`** (multi-résolution combinée 16+32+48).

### `lockup-dark` — Logo complet pour fond sombre
Mark cyan + GLO blanc + BIA cyan. C'est la signature principale du studio.
Usage : header de site, signature email, fond sombre uniquement.
Tailles fournies : 240, 360, 480, 720, 960, 1280, 1920 px de large.

### `lockup-light` — Logo complet pour fond clair
Mark cyan + GLO noir + BIA cyan.
Usage : documents, présentations, supports impression mode jour.

### `app-icon-dark` — Icône d'application carrée fond sombre
Carré 1024×1024 maximum, fond `#0D1117`, mark cyan, coins arrondis.
Pour stores Android/iOS futurs, profils GitHub, avatars sociaux.
Tailles : 48 (Android xxhdpi), 72, 96, 144, 192, 256, 384, 512 (iOS),
1024 (Play Store / App Store).

### `app-icon-cyan` — Variante app icon fond cyan
Inverse : fond cyan, mark sombre. Pour un look plus distinctif.

---

## Quels fichiers utiliser pour le site web ?

Pour **`/assets/images/logos/`** dans le repo Globia, copier :

```
/assets/images/logos/
├── globia-mark.svg            ← copie de svg/mark-cyan.svg
├── globia-lockup-dark.svg     ← copie de svg/lockup-dark.svg
├── globia-lockup-light.svg    ← copie de svg/lockup-light.svg
└── favicon.svg                ← copie de svg/mark-favicon.svg
```

À la racine du repo :
```
/favicon.ico                   ← copie de favicon.ico
```

Dans le `<head>` de chaque page :
```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/assets/images/logos/favicon.svg">
<link rel="apple-touch-icon" href="/png/app-icon-dark/app-icon-dark-192.png">
```

Dans le header HTML :
```html
<a href="/fr/" class="brand">
  <img src="/assets/images/logos/globia-lockup-dark.svg"
       alt="Globia"
       width="160" height="44">
</a>
```

---

## Espace de protection

Autour du mark seul, laisser une marge minimale égale à la moitié de la
hauteur du mark. Pour le lockup, marge équivalente à la hauteur du "G".

## Couleurs autorisées sur le mark

- Cyan `#39C5CF` (recommandé)
- Blanc `#E6EDF3`
- Noir `#0D1117`

## Couleurs INTERDITES

Pas de gradient sur le mark Globia.
Pas de vert (`#3FB950` est réservé à Sovara).
Pas d'autres couleurs.

---

Pack généré pour le site globia.app, mai 2026.
