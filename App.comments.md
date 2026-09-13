# App.js — Commentaires / Documentation

Ce fichier regroupe toutes les explications qui ont été retirées du code
`App.js` pour garder le fichier propre. Il sert de documentation du projet.

---

## Mode de données (STATIC / MOCK DATA)

L'application n'appelle **aucun backend**. Elle utilise des données locales
fictives pour tester tout le parcours :
`signup -> welcome -> login -> dashboard`.

Remplacez ces données par de vrais appels API une fois que le backend est prêt.

---

## Comptes de démonstration

Quelques comptes pré-enregistrés avec lesquels vous pouvez vous connecter :

```js
const DEMO_USERS = [
  { name: 'Test User', phone: '0000', password: '1234' },
  { name: 'Sam', phone: '0001', password: 'test' },
];
```

- `sessionUsers` : liste des utilisateurs créés pendant la session (en mémoire).
- `loadSavedUsers()` : charge les utilisateurs sauvegardés d'une session précédente.
- `saveUsers()` : enregistre les utilisateurs localement (AsyncStorage).
- `findUser(phone)` : cherche un utilisateur par numéro (session + démo).

---

## Composants d'interface (UI helpers)

- `Field` : champ de saisie de base (texte, numéro, mot de passe masqué).
- `PasswordInput` : champ mot de passe avec bouton afficher / masquer (icône œil).
- `SubmitButton` : bouton avec dégradé bleu et indicateur de chargement.

---

## Écrans (Screens)

### SignUpScreen (Créer un compte)
- Valide les champs (nom, numéro, mot de passe, confirmation).
- Vérifie que les mots de passe correspondent.
- Vérifie que le numéro n'est pas déjà utilisé.
- Simule un délai réseau pour afficher le chargement.
- Sauvegarde le nouvel utilisateur localement, puis passe à l'écran d'accueil.

### WelcomeScreen (Bienvenue)
- Affiche le nom de l'utilisateur après l'inscription.
- Bouton « Se connecter » qui mène au login.

### LoginScreen (Connexion)
- Valide les champs (numéro, mot de passe).
- Simule un délai réseau.
- Vérifie les identifiants via `findUser`.
- Sauvegarde la session localement, puis passe au tableau de bord.

### DashboardScreen (Tableau de bord)
- **En-tête bleu** : avatar circulaire, message de bienvenue, bouton de déconnexion.
- **Carte solde** : solde disponible, numéro de téléphone, bouton « + Recharger ».
- **Grille de services** : 6 raccourcis circulaires (2 rangées de 3) :
  - Recharge (orange `#FD761A`)
  - Internet (vert foncé `#003527`)
  - Transfert (bleu foncé `#00496A`)
  - Facture / Retrait / Historique (rouge `#BA1A1A`)
- **Bannière promo** : offre spéciale.
- **Historique** : liste de transactions statiques (montants verts/rouges).
- **Barre de navigation basse** : Accueil, Recharge, Commandes, Profil.

---

## Point d'entrée (App)

- `screen` : état de navigation (`signup` | `welcome` | `login`).
- `user` : utilisateur connecté (null si non connecté).
- `useEffect` : charge les utilisateurs sauvegardés au premier rendu.
- `handleLogout` : supprime la session et revient à l'écran de connexion.
- Rend l'écran selon l'état :
  - `welcome` -> WelcomeScreen
  - `user` présent -> DashboardScreen
  - sinon -> SignUpScreen ou LoginScreen

---

## Styles

Le bloc `StyleSheet.create` contient tous les styles de l'application :
- Styles des écrans d'authentification (connexion, inscription, bienvenue).
- Styles du tableau de bord (en-tête, carte solde, services, promo, historique,
  barre de navigation).