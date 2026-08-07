import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Rutas relativas para que el build funcione tanto en la raíz de un dominio
  // como en un subdirectorio de GitHub Pages (usuario.github.io/Margaritas/).
  base: './',
  plugins: [react(), tailwindcss()],
})
