import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['src/index.tsx'],
      output: {
        entryFileNames: 'index.min.js',
        chunkFileNames: 'index.min.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.scss' || assetInfo.name?.endsWith('.css')) {
            return 'index.css'
          }
          return assetInfo.name ?? '[name][extname]'
        },
      },
    },
  },
  server: {
    historyApiFallback: true,
    open: true,
  },
})
