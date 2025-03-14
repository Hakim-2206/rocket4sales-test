# React + Vite

# Rocket4Sales - Test - Hakim 

 Application web conçue pour consommer une API de gestion de profils. Elle permet de visualiser des membres, de filtrer les résultats, et de consulter les détails de chaque profil, y compris leurs expériences professionnelles.
 Viuel disponible ici  : https://rocket4sales-frontend.onrender.com/
## Fonctionnalités

- **Affichage des profils** : Liste des membres de l'équipe.
- **Pagination**: Navigation fluide entre les pages de résultats.
- **Filtrage** : Recherche des membres par nom.
- **Détails des profils** : Page dédiée pour afficher les expériences professionnelles regroupées par entreprise.
- **Animation** : Animations fluides avec Framer Motion.

- ## Technologies utilisées

- **Frontend** : React + Vite
- **Styling** : Tailwind CSS
- **Gestion d'état** : Redux Toolkit
- **Routing** : React Router
- **Requêtes API** : Axios
- **Animations** : Framer Motion
- **Icônes** : React Icons

- ## Problématique et solutions :

- Au départ, on gérait tout dans le front (avec service.api et slice), mais ça ne marchait pas en prod à cause de problèmes de sécurité (CORS, gestion des erreurs). J'ai donc ajouté un backend avec Node.js et Express servant de pont entre l'API et notre front, ce qui nous permet de mieux gérer les erreurs et de sécuriser les requêtes. maintenant tout fonctionne bien.

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/hakim-2206/rocket4sales-test.git
   cd rocket4sales-test
   npm install
   npm run dev
