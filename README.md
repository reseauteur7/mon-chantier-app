# MON CHANTIER

Application indépendante de GOLDOR pour les annonces de chantiers, travaux, matériaux et prestations.

## Règle de séparation
- GOLDOR sert uniquement de référence technique pour les composants génériques éventuellement réutilisables.
- Aucun formulaire de publication GOLDOR n'est repris.
- MON CHANTIER possède ses propres publications, catégories, champs, images et règles de gestion.
- Le dépôt GOLDOR ne doit pas être modifié dans le cadre de ce projet.

## Publication MON CHANTIER
Chaque annonce est propre à MON CHANTIER et comprend, selon la catégorie :
- catégorie et type d'annonce;
- titre, description et photos;
- localisation (ville/commune/quartier);
- prix ou budget, unité et négociabilité;
- coordonnées/contact du publieur;
- statut de publication (brouillon, publiée, suspendue, clôturée);
- date de création et de mise à jour.

### Catégories initiales
- Chantier / projet de construction
- Travaux et services BTP
- Matériaux et équipements
- Professionnels / entreprises

Les champs détaillés doivent être définis par catégorie dans le formulaire MON CHANTIER, sans réutiliser le formulaire GOLDOR.

## État
Le dépôt était vide lors de l'initialisation. Ce README pose le périmètre; il ne constitue pas encore une application compilable. La prochaine étape est d'ajouter le code de l'application et ses propres écrans de publication.
## Firebase (MON CHANTIER uniquement)

Le client Firebase est initialisé dans `src/firebase.js`. Il lit les variables `VITE_FIREBASE_*` du fichier local `.env.local`. Ne placez jamais de clé Admin/service-account dans le frontend.

1. Dans Firebase Console > Paramètres du projet > Général > Vos applications, créez une application Web.
2. Copiez la configuration Web dans `.env.local` (à partir de `.env.example`).
3. Activez Authentication > Fournisseurs > E-mail/Mot de passe et Google.
4. Les règles de départ sont dans `firestore.rules`. Elles sont volontairement restrictives et doivent être adaptées/testées avant d'ouvrir la lecture publique des annonces.
5. Le dépôt n'inclut pas de secrets. `.env.local` est ignoré par Git.

La configuration n'est pas encore reliée à l'interface de connexion/publication; ces écrans et les opérations Firestore seront ajoutés ensuite.
