import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [
        react(),
        tailwindcss(),
    ],
    build: {
        outDir: 'dist', // Dossier de sortie pour les fichiers de production
    },
    server: {
        proxy: {
            '/api': 'https://rocket4sales-backend.onrender.com', // Redirige les requêtes /api vers ton backend
        }
    }

})
