> **Branche `landing`** : version réduite pour la mise en ligne temporaire (aucun accès aux autres pages du site). Contenu : `index.html` (copie d'`entreprises.html`), `entreprises.html`, `chemin-de-vie.html`, `mentions-legales.html`, `404.html`, `pour/` et les images qu'elles utilisent. Le site complet est sur les branches `main` et `optimisation`. Ne fusionne jamais `landing` dans `main`.

# Site de Delwood

Site statique (HTML, CSS, un fichier JavaScript). Aucun outil de compilation : les fichiers de ce dossier sont ceux qui se publient.

## Pages

| Fichier | Rôle |
| --- | --- |
| `index.html`, `oeuvres.html`, `fresques.html`, `fresques/*.html`, `art-architecture.html`, `a-propos.html`, `contact.html` | Site public |
| `entreprises.html` | Page d'atterrissage du démarchage d'entreprises |
| `mentions-legales.html` | Mentions légales |
| `pour/_modele/index.html` | Gabarit des pages dédiées (`noindex, nofollow`) |
| `404.html` | Page d'erreur |

## Créer une page dédiée à une cible

1. Copier `pour/_modele/` en `pour/<slug>/` (slug en minuscules, sans accent, tirets).
2. Dans `pour/<slug>/index.html`, remplacer `{{Entreprise}}`, `{{accroche}}`, `{{offre}}` et `{{projection}}`.
   Écrire les valeurs avec leurs entités HTML si elles contiennent `&`, `<`, `>` ou un guillemet droit (`&amp;`, `&lt;`, `&gt;`, `&quot;`) : `{{Entreprise}}` apparaît dans le titre et dans un attribut `value`.
3. Dans le mail, envoyer `https://delwood.fr/pour/<slug>/`. Le champ caché « Origine » du formulaire reprend le slug de l'adresse. Sur `entreprises.html`, il reprend `?utm_campaign=<slug>`.
4. Ne pas ajouter `pour/` au plan du site. Ne pas non plus l'interdire dans `robots.txt` : un robot qui ne peut pas lire la page ne verrait pas son `noindex`, et `robots.txt` annoncerait l'existence du dossier. Les pages ne sont reliées depuis aucune autre page.

## Mise en ligne sur delwood.fr

Rien n'est configuré à ce jour. Deux options.

### Option A : rester sur GitHub Pages avec delwood.fr

1. Fusionner la branche à publier dans `main` (le site public est servi depuis `main`).
2. Créer à la racine un fichier `CNAME` contenant une seule ligne : `delwood.fr`. (Non créé : à faire seulement si cette option est retenue.)
3. Chez le registrar, dans la zone DNS de `delwood.fr` :
   * quatre enregistrements `A` sur le domaine nu (`@`) : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` ;
   * un enregistrement `CNAME` pour `www` vers le nom d'hôte GitHub Pages du compte propriétaire du dépôt (indiqué dans Settings, Pages) ;
   * supprimer tout autre enregistrement `A`, `AAAA` ou `CNAME` en conflit sur ces noms.
4. Sur GitHub : Settings, Pages, champ « Custom domain » : `delwood.fr`, puis cocher « Enforce HTTPS » dès que le certificat est prêt (quelques minutes à quelques heures après la propagation DNS).
5. Vérifier `https://delwood.fr/`, `https://delwood.fr/entreprises.html` et une adresse inexistante (la page 404 doit s'afficher).

À savoir : le dépôt appartient au compte `loupeirrot` et il est public, donc les pages `pour/<slug>/` seraient lisibles par quiconque connaît l'adresse du dépôt, même en `noindex`.

### Option B : héberger les fichiers chez le registrar

1. Activer l'hébergement web et le certificat SSL sur `delwood.fr`, et faire pointer le domaine vers cet hébergement.
2. Envoyer par FTP ou SFTP, à la racine du dossier web (souvent `www/`), ces éléments et rien d'autre :
   * `index.html`, `oeuvres.html`, `fresques.html`, `art-architecture.html`, `a-propos.html`, `contact.html`, `entreprises.html`, `mentions-legales.html`, `404.html` ;
   * le dossier `fresques/` ;
   * le dossier `assets/` (`css`, `js`, `img`, `fonts`, `video`, `docs`) ;
   * le dossier `pour/`, sans `_modele/` (n'y mettre que les pages dédiées terminées) ;
   * `robots.txt` et `sitemap.xml`.
3. Ne pas envoyer : `.git/`, `.gitignore`, `README.md`, `.DS_Store`, `CNAME`.
4. Pour que la page 404 s'affiche, ajouter à la racine un fichier `.htaccess` contenant `ErrorDocument 404 /404.html` (hébergement Apache, ce qui est le cas des offres mutualisées courantes).
5. Vérifier les mêmes adresses qu'à l'option A.

## Points ouverts

Les repères `[À FOURNIR : …]` visibles dans les pages sont à remplacer avant mise en ligne. Pour les retrouver :

```bash
grep -rn "À FOURNIR" --include=*.html .
```
