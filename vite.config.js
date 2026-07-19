import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  server: {
    proxy: {
      // Forward all /api/* requests to the local dev API server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})



