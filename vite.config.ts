import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        tailwindcss(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'img/GLASTOR-SVG.svg'],
          manifest: {
            name: 'GLASTOR® — Backend Engineering',
            short_name: 'GLASTOR',
            description: 'Arquitectura de Sistemas y Desarrollo Backend Avanzado',
            theme_color: '#030303',
            background_color: '#030303',
            display: 'standalone',
            icons: [
              {
                src: '/favicon/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/favicon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              },
              {
                src: '/favicon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ]
          }
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      optimizeDeps: {
        include: ['react-is']
      },
      build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          external: []
        }
      }
    };
});
