# Déploiement — globia.app sur GitHub Pages

## Étape 1 — Créer le repo GitHub

1. Connecte-toi à GitHub avec le compte `laboapps`.
2. Crée un nouveau repo public : **`laboapps/globia`** (ou nom de ton choix).
3. Ne coche PAS "Add a README" (le repo doit être vide).

## Étape 2 — Pousser le projet local

```bash
cd C:\projets\Globia
git init
git add .
git commit -m "Initial commit: Globia/Sovara static site"
git branch -M main
git remote add origin https://github.com/laboapps/globia.git
git push -u origin main
```

## Étape 3 — Configurer GitHub Pages

1. Sur GitHub, va dans **Settings → Pages** (menu gauche).
2. **Source** : `Deploy from a branch`
3. **Branch** : `main` / `/ (root)`
4. Clique **Save**.

GitHub Pages générera l'URL `https://laboapps.github.io/globia/`.  
Mais le fichier `CNAME` redirigera automatiquement vers `globia.app`.

## Étape 4 — Vérifier le DNS (OVH)

Les enregistrements DNS OVH doivent pointer vers GitHub :

| Type | Nom | Valeur |
|------|-----|--------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | laboapps.github.io |

> Ces IPs sont les IPs officielles de GitHub Pages (valides en mai 2026).

Vérification DNS (attendre jusqu'à 48h, souvent < 15 min) :
```bash
nslookup globia.app
# Doit retourner une des IPs GitHub ci-dessus
```

## Étape 5 — Configurer le custom domain dans GitHub Pages

1. Dans **Settings → Pages → Custom domain**, entre : `globia.app`
2. Clique **Save**.
3. Coche **Enforce HTTPS** (disponible quelques minutes après la validation DNS).

## Étape 6 — Vérifications post-déploiement

- [ ] `https://globia.app/` → redirige vers `/en/` (ou langue navigateur)
- [ ] `https://globia.app/en/` → page EN s'affiche correctement
- [ ] `https://globia.app/fr/` → page FR
- [ ] `https://globia.app/de/` → page DE
- [ ] `https://globia.app/es/` → page ES
- [ ] `https://globia.app/ar/` → page AR avec RTL
- [ ] `https://globia.app/press/` → page presse
- [ ] `https://globia.app/404-test` → page 404 personnalisée
- [ ] HTTPS actif (cadenas vert dans le navigateur)
- [ ] Sitemap accessible : `https://globia.app/sitemap.xml`
- [ ] Robots.txt : `https://globia.app/robots.txt`
- [ ] OG image visible lors du partage sur X/LinkedIn (utiliser un outil de preview OG)

## Étape 7 — Lighthouse audit

Lancer Lighthouse (Chrome DevTools → Onglet Lighthouse) sur `https://globia.app/en/` :
- Performance : visé > 95
- Accessibility : visé > 95
- Best Practices : visé 100
- SEO : visé 100

## Mise à jour du site

Tout changement = commit + push :
```bash
git add .
git commit -m "Update: description du changement"
git push
```
GitHub Pages redéploie automatiquement en < 1 minute.

## Activer le bouton Play Store (lors du lancement public)

Dans chaque `/<lang>/index.html`, remplacer le `<button disabled>` par :
```html
<a class="btn-primary" href="https://play.google.com/store/apps/details?id=com.sovara.app" rel="noopener noreferrer" target="_blank">
  <!-- icône Play Store SVG -->
  Download on Google Play
</a>
```
Et mettre à jour le prix dans le JSON-LD : `"price": "4.99"` (déjà présent).
