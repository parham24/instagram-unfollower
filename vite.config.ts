import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      plugins: [
        VitePWA({
          registerType: 'autoUpdate',
          manifest: {
            name: 'آنفالویاب اینستاگرام',
            short_name: 'آنفالویاب',
            description: 'ابزاری برای تحلیل دنبال‌کنندگان و دنبال‌شوندگان اینستاگرام',
            theme_color: '#8A2BE2',
            background_color: '#1a202c',
            start_url: '/',
            display: 'standalone',
            lang: 'fa',
            icons: [
              { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
              { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
            ]
          }
        })
      ]
    };
});
