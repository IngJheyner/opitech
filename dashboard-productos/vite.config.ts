import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // El alias @ apunta a src/ — consistente con el estándar de proyectos Vue
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
