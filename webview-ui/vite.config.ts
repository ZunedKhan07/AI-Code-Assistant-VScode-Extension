import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',           // Build hone ke baad output kaha store hoga
    emptyOutDir: true,        // Build karne se pehle purani files hata do
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@' ko src folder ka shortcut bana diya
    },
  },
})
