import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) return 'three'
          if (id.includes('@react-three/fiber')) return 'fiber'
          if (id.includes('@react-three/drei')) return 'drei'
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('node_modules')) return 'vendor'
        }
      }
    }
  }
})