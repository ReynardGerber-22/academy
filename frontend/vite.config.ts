import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://127.0.0.1:8080",
    }
  }
})
