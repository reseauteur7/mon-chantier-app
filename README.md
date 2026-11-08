# MON CHANTIER

Application indépendante de GOLDOR pour les annonces de chantiers, travaux, matériaux et professionnels du BTP en Côte d’Ivoire.

## Fonctionnalités présentes dans le dépôt
- Interface Web React/Vite et application Android Expo.
- Connexion et création de compte par email/mot de passe avec Firebase Authentication.
- Création et consultation d'annonces Firestore (chantier, travaux, matériaux, professionnels).
- Profil utilisateur Firestore créé/actualisé après connexion.
- Règles Firestore restrictives et index composites déclarés.
- Configuration EAS pour produire un APK Android de prévisualisation.

## État de préparation — transparence
Le dépôt contient le code de base, mais une version **prête à utiliser par le public n'est pas encore certifiée**. Il reste à configurer les clients Firebase avec les valeurs du projet, activer Email/Mot de passe dans Firebase Authentication, déployer les règles et index Firestore, puis exécuter les tests réels Web/Android.

Les photos ne sont pas encore reliées au formulaire de publication. Le module Web Supabase Storage est isolé, mais le bucket et ses politiques ne sont pas vérifiés et le module n'est pas intégré à la publication. Ne considérez donc pas l'ajout de photos comme disponible.

## Configuration Firebase (MON CHANTIER uniquement)
1. Dans Firebase Console, ouvrir le projet `mon-chantier-8fc9f`.
2. Activer Authentication > Sign-in method > Email/Password.
3. Créer une application Web et recopier les valeurs de configuration dans `.env.local` à partir de `.env.example`.
4. Pour Android/Expo, recopier les valeurs dans `mobile/.env` à partir de `mobile/.env.example`.
5. Déployer `firestore.rules` et `firestore.indexes.json` avec Firebase CLI depuis la racine du dépôt, après connexion au bon projet:
   ```bash
   firebase login
   firebase use mon-chantier-8fc9f
   firebase deploy --only firestore:rules,firestore:indexes
   `````
6. Ne jamais committer `.env.local`, `mobile/.env`, clé Admin ou service-account.

## Lancer le Web
À la racine:
```bash
npm install
npm run dev
`````
Production:
```bash
npm run build
npm run preview
`````

## Lancer Android
Dans `mobile/`:
```bash
npm install
npx expo start
`````
Pour construire l'APK de test avec EAS:
```bash
npx eas login
npx eas build -p android --profile preview
`````
Le profil `preview` est configuré pour produire un APK. Un compte EAS et une configuration Firebase valide sont nécessaires. La compilation n'est pas réputée réussie tant que le build EAS n'a pas terminé et que l'APK n'a pas été installé/testé sur un appareil.

## Règle de séparation avec GOLDOR
- MON CHANTIER est un dépôt et une application distincts.
- Aucun changement ne doit être effectué dans le dépôt GOLDOR.
- Les annonces, catégories, champs et règles MON CHANTIER lui sont propres.

## Prochaines étapes avant diffusion
1. Renseigner les configurations Firebase Web et Android.
2. Déployer les règles et index Firestore.
3. Vérifier création de compte, connexion, profil, publication, consultation et suppression d'annonce sur Web et Android.
4. Intégrer et tester l'upload photo (bucket et règles sûres).
5. Générer et tester l'APK.
6. Déployer le Web sur un hébergeur et vérifier l'URL publique.
7. Ajouter gestion des erreurs, contact annonceur, politique de confidentialité et conditions d'utilisation avant ouverture au public.
