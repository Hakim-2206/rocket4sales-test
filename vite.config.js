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
        outDir: 'dist',
        sourcemap: true,
        minify: 'terser', // Minifie le code JavaScript
        terserOptions: {
            compress: true, // Active la compression
        },
        assetsInlineLimit: 4096, // Inline les petits assets
        // Dossier de sortie pour les fichiers de production
    },
    server: {
        proxy: {
            '/api': process.env.VITE_API_URL || 'https://rocket4sales-backend.onrender.com', // Redirige les requêtes /api vers ton backend
        }
    }

})
