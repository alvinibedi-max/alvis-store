import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    hydrogen(),
    tailwindcss(),
  ],

  server: {
    port: 8080,
    host: true,
    strictPort: true,
  }
});