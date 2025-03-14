import axios from "axios";

// Création d'une instance d'axios avec une base URL pour éviter les pb avec CORS.

const api = axios.create({
    baseURL: 'https://rocket4sales-backend.onrender.com/api'
})

// useApi gère les appels API
const useApi = () => {
    const fetchProfiles = async () => {
        try {
            const response = await api.get('/profiles'); // Appel au backend local
            return response.data; // Retourne directement les données
        } catch (error) {
            console.error("Error fetching profiles:", error);
            throw error;
        }
    }
    const fetchOneProfile = async (userId) => {
        try {
            const response = await api.get(`/profile/${userId}`); // Appel au backend local
            return response.data; // Retourne directement les données
        } catch (error) {
            console.error("Error fetching one profile:", error);
            throw error;
        }
    }

    // retour des methodes fetch pour les utiliser ailleurs
    return {
        fetchProfiles,
        fetchOneProfile
    }
}

export default useApi; // export du hook perso, pour l'utiliser ailleurs