import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@utils": path.join(__dirname, 'utils'),
      "@": path.join(__dirname, ''),
      "@components": path.join(__dirname, 'components'),
      "@stores": path.join(__dirname, 'stores'),
      "@pages": path.join(__dirname, 'pages'),
    }
  }
})
