import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/App.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Sigue siendo necesario para que el servidor sea visible
        port: 5173,      // Asegúrate que el puerto sea el que usa Vite
        hmr: {
            host: 'localhost', // Fuerza al navegador a usar 'localhost'
        }
    }
});