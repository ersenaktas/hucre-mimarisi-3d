import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // GitHub Pages ve alt klasör dağıtımları için kritik
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000
  }
});
