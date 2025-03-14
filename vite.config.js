import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    /*base: "/rocket4sales-test",*/
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://92.161.62.7', // L'URL de l'API
                changeOrigin: true, // Modifie l'origine de la requete http pour contourner les pb de cors
                // rewrite réécrit l'url en supprimant le prefixe '/api"
                // (ex: http://localhost:3000/api/people  devient  http://92.161.62.7/people)
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }

})
