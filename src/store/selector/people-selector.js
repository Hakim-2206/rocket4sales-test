// Sélecteur pour accéder à la liste complète des personnes
export const selectPeoples = (state) => state.peoples.peoples

// Sélecteur pour accéder à la liste des personnes filtrées
export const selectFilteredPeoples = (state) => state.peoples.filteredPeoples

// Sélecteur pour accéder aux expériences d'un utilisateur
export const selectOneProfile = (state) => state.peoples.experiences

// Sélecteur pour vérifier l'état de chargement
export const selectIsLoading = (state) => state.peoples.isLoading

// Sélecteur pour accéder aux erreurs lors des appels api
export const selectError = (state) => state.peoples.error;
