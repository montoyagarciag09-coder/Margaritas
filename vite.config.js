import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Rutas relativas para que el build funcione tanto en la raíz de un dominio
  // como en un subdirectorio de GitHub Pages (usuario.github.io/Margaritas/).
  base: './',
  plugins: [react(), tailwindcss()],
  // Dos páginas: la landing (/) y la tienda (/tienda/).
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        tienda: resolve(import.meta.dirname, 'tienda/index.html'),
      },
    },
  },
})
