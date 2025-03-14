import axios from "axios";

// Création d'une instance d'axios avec une base URL pour éviter les pb avec CORS.
// base URL = "/api", pour que toutes les requêtes à l'API se fassent via ce point de départ.
// voir le fichier `vite.config`
const api = axios.create({
    baseURL: "/api" // utilisation du proxy configuré dans vite.config
})

// useApi gère les appels API
const useApi = () => {
    const fetchProfiles = async () => {
        return await api.get("/people?nb_results=350") // appel api, fonction get de axios
    }
    const fetchOneProfile = async (userId) => {
        return await api.get(`/experiences?person_id=${userId}`)
    }

    // retour des methodes fetch pour les utiliser ailleurs
    return {
        fetchProfiles,
        fetchOneProfile
    }
}

export default useApi; // export du hook perso, pour l'utiliser ailleurs