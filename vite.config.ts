import { defineConfig } from 'vite';

export default defineConfig({
  base: '/my-repo/',
  build: {
    outDir: 'docs',
  },
});
