import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import checker from "vite-plugin-checker";
// @ts-ignore
import { VitePWA } from 'vite-plugin-pwa';
// @ts-expect-error - No type declarations for custom plugin
import clearLogPlugin from "./dala-internal-vite-clear-log-plugin.js";

import dns from "node:dns";

dns.setDefaultResultOrder("verbatim");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    clearLogPlugin(),
    react(),
    tailwindcss(),
    checker({
      typescript: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Offline Farmer Assistant',
        short_name: 'FarmerAssist',
        description: 'AI-powered agricultural advice without internet',
        theme_color: '#059669',
        icons: [
          {
            src: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/819a9095-32e1-4899-8ddc-1de6e5ce66ee/logo-7e053668-1782316641664.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/819a9095-32e1-4899-8ddc-1de6e5ce66ee/logo-7e053668-1782316641664.webp',
            sizes: '512x512',
            type: 'image/webp'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
