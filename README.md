# 🎬 Les Têtes à Clap — Site Web

Site web de l'association **Les Têtes à Clap**, dédiée au cinéma à Beaucaire, Tarascon et Nîmes depuis 2006.

**Stack** : React + Vite · Hébergé gratuitement sur GitHub Pages

---

## 🚀 Déploiement rapide (5 minutes)

### Prérequis
- Un compte [GitHub](https://github.com)
- [Git](https://git-scm.com/) installé sur l'ordinateur
- [Node.js](https://nodejs.org/) v18+ installé

### Étapes

#### 1. Créer le repo GitHub
- Aller sur https://github.com/new
- Nom du repo : `les-tetes-a-clap` (ou `lestetesaclap.fr`)
- Visibilité : **Public** (requis pour GitHub Pages gratuit)
- Ne PAS cocher "Add a README"
- Cliquer **Create repository**

#### 2. Pousser le code
```bash
cd les-tetes-a-clap
git init
git add .
git commit -m "🎬 Premier déploiement du site"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/les-tetes-a-clap.git
git push -u origin main
```

#### 3. Activer GitHub Pages
- Aller dans **Settings** → **Pages**
- Source : sélectionner **GitHub Actions**
- Le site sera automatiquement déployé à chaque `git push`

#### 4. Configurer le domaine personnalisé (optionnel)
Pour utiliser `www.lestetesaclap.fr` :
1. Dans **Settings** → **Pages** → **Custom domain**, entrer `www.lestetesaclap.fr`
2. Chez le registrar du domaine, ajouter ces DNS :
   - `CNAME` : `www` → `VOTRE-USERNAME.github.io`
   - **OU** 4 enregistrements `A` pour l'apex (`lestetesaclap.fr`) :
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. Cocher **Enforce HTTPS** dans les settings GitHub Pages

---

## 🛠 Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev (http://localhost:5173)
npm run dev

# Construire pour la production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 📝 Modifier le contenu

### Ajouter un événement
Ouvrir `src/App.jsx` et modifier le tableau `EVENTS` en haut du fichier :

```javascript
const EVENTS = [
  {
    id: 1,
    title: "Nom du film",
    director: "Nom du réalisateur",
    date: "Mardi 24 mars 2026",
    time: "19h30",
    venue: "CGR Nîmes",
    guests: ["Invité 1", "Invité 2"],
    description: "Description de l'événement...",
    ticketUrl: "https://www.helloasso.com/...",
    upcoming: true,  // true = affiché en hero
  },
  // ...
];
```

### Ajouter un artiste au mur des étoiles
Modifier le tableau `ARTISTS` :
```javascript
const ARTISTS = [
  "Omar Sy", "Leïla Bekhti", // ...ajouter ici
];
```

### Mettre à jour les chiffres
Modifier le tableau `STATS` :
```javascript
const STATS = [
  { number: "20", label: "ans de passion", suffix: "" },
  // ...
];
```

### Publier les modifications
```bash
git add .
git commit -m "Ajout événement Mars 2026"
git push
```
→ Le site se met à jour automatiquement en ~2 minutes.

---

## 📁 Structure du projet

```
les-tetes-a-clap/
├── .github/workflows/deploy.yml   ← Déploiement automatique
├── public/
│   └── CNAME                      ← Domaine personnalisé
├── src/
│   ├── App.jsx                    ← Le site complet (contenu + design)
│   └── main.jsx                   ← Point d'entrée React
├── index.html                     ← HTML racine (SEO, meta, fonts)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Direction artistique

| Élément | Choix |
|---------|-------|
| Palette | Noir cinéma `#0C0A08` · Or `#D4A853` · Crème `#FAF3E0` |
| Titres | Playfair Display (serif élégante) |
| Corps | DM Sans (sans-serif lisible) |
| Ambiance | Grain de pellicule · Bandes de film · Effet projecteur |

---

## 📧 Contact

**Les Têtes à Clap**
4C Chemin des Romains, 30300 Beaucaire
contact@lestetesaclap.fr · 06 09 03 06 41

[Facebook](https://www.facebook.com/groups/115819288441382/) · [Instagram](https://www.instagram.com/lestetesaclap.fr/) · [HelloAsso](https://www.helloasso.com/associations/les-tetes-a-clap)
