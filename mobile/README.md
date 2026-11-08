# MON CHANTIER Android (Expo)

Application Android indépendante du site Web, utilisant le même projet Firebase MON CHANTIER.

## Démarrage
1. Installer Node.js LTS et pnpm/npm.
2. Dans ce dossier : `npm install`.
3. Copier `.env.example` vers `.env` et renseigner les paramètres de l'application Firebase Web (Firebase Console > Project settings > General > Your apps).
4. `npm start` pour ouvrir Expo.
5. `npm run build:apk` lance un build EAS APK interne.

Package Android : `ci.monchantier.app`.

## État
La première interface Expo et le fichier d'initialisation Firebase sont en place. L'écran est encore un prototype avec annonces de démonstration; l'inscription, l'authentification, la publication persistante, les photos et le backend doivent encore être reliés et testés. Ne distribuez pas cette version comme production.
