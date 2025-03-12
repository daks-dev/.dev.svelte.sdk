import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from './src/lib/app/imagetools/server.js';
import { yaml } from './src/lib/app/vite/plugin-yaml.js';
import { defineConfig } from 'vite';

export default defineConfig({
  logLevel: 'info', // error
  plugins: [imagetools(), yaml(), sveltekit(), tailwindcss()],
  server: { fs: { strict: false } },
  // build: { target: 'esnext' },
  // resolve: { alias: { '': resolve(process.cwd(), '') } },
  define: {
    'process.env': process.env
  },
  test: {
    // globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
