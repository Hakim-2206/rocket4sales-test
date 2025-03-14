const express = require('express')
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour autoriser les requêtes CORS
app.use(cors({
    origin: '*', // Pour tester, remplacez par '*' (moins sécurisé mais permet de vérifier que le problème vient du CORS)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route pour récupérer les profils
app.get('/api/profiles', async (req, res) => {
    try {
        const apiUrl = 'http://92.161.62.7/people?nb_results=350';
        const response = await axios.get(apiUrl);
        res.json(response.data); // Renvoie les données de l'API
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({error: 'Failed to fetch profiles'});
    }
});

// Route pour récupérer un profil spécifique
app.get('/api/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const apiUrl = `http://92.161.62.7/experiences?person_id=${userId}`;
        const response = await axios.get(apiUrl);
        res.json(response.data); // Renvoie les données de l'API
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({error: 'Failed to fetch profile'});
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});