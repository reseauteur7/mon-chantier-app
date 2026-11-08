# MON CHANTIER

Application indépendante de GOLDOR pour les annonces de chantiers, travaux, matériaux et professionnels du BTP en Côte d’Ivoire.

## Fonctionnalités présentes
- Interface Web React/Vite et application Android Expo.
- Inscription et connexion par email/mot de passe via Firebase Authentication.
- Création et consultation d'annonces Firestore (chantier, travaux, matériaux, professionnels).
- Profil utilisateur Firestore après connexion.
- Règles Firestore et index composites déclarés.
- Configuration EAS pour un APK Android de prévisualisation.

## État de préparation
Le dépôt contient le code, mais l'application n'est pas encore certifiée prête pour le public. Il reste à configurer Firebase, déployer les règles/index, tester les parcours réels et générer/tester l'APK.

Les photos ne sont pas encore intégrées au formulaire de publication. Le module Web Supabase Storage est isolé; le bucket et ses politiques ne sont pas vérifiés. L'ajout de photos n'est donc pas disponible.

## Configuration Firebase (MON CHANTIER uniquement)
1. Ouvrir le projet Firebase `mon-chantier-8fc9f`.
2. Activer Authentication > Sign-in method > Email/Password.
3. Copier la configuration Web dans `.env.local` depuis `.env.example`.
4. Copier la configuration Android dans `mobile/.env` depuis `mobile/.env.example`.
5. Depuis la racine, avec Firebase CLI et le bon compte:
   ```bash
   firebase login
   firebase use mon-chantier-8fc9f
   firebase deploy --only firestore:rules,firestore:indexes
   ```
6. Ne jamais committer `.env.local`, `mobile/.env`, clé Admin ou service-account.

## Lancer le Web
À la racine:
```bash
npm install
npm run dev
```
Build:
```bash
npm run build
npm run preview
```

## Lancer Android
Dans `mobile/`:
```bash
npm install
npx expo start
```
Build APK de test via EAS:
```bash
npx eas login
npx eas build -p android --profile preview
```
Le profil `preview` est configuré pour produire un APK. Un compte EAS et une configuration Firebase valide sont requis. La compilation n'est pas réputée réussie tant que le build EAS n'a pas fini et que l'APK n'a pas été installé/testé.

## Séparation avec GOLDOR
- MON CHANTIER est un dépôt et une application distincts.
- Aucun changement ne doit être effectué dans le dépôt GOLDOR.
- Les annonces, catégories, champs et règles MON CHANTIER lui sont propres.

## Reste avant diffusion
1. Renseigner les configurations Firebase Web et Android.
2. Déployer les règles et index Firestore.
3. Tester inscription, connexion, profil, publication, consultation et suppression sur Web et Android.
4. Intégrer et tester l'upload photo avec bucket et règles sûres.
5. Générer et tester l'APK.
6. Déployer le Web et vérifier l'URL publique.
7. Ajouter contact annonceur, politique de confidentialité et conditions d'utilisation avant ouverture au public.
