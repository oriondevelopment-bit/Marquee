import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// WordPress plugin build: produces a single self-contained JS file
// that the WP plugin enqueues on any page via shortcode [marquee_pool_designer]
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'wordpress-plugin/assets',
    lib: {
      entry: resolve(__dirname, 'src/widget-entry.jsx'),
      name: 'MarqueePoolDesigner',
      fileName: () => 'pool-designer.js',
      formats: ['iife'],
    },
    rollupOptions: {
      external: [],        // bundle React — WP won't have it
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
