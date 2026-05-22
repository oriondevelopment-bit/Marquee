import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,       // Required for CodeSandbox / cloud preview to bind correctly
    open: false,      // Don't try to open a browser tab in cloud environments
    strictPort: true, // Fail fast if 3000 is taken rather than silently switching
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
