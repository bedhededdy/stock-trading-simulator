import { defineConfig } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@contexts": resolve(__dirname, "./src/components/contexts"),
      "@req": resolve(__dirname, "./src/requests"),
      "@views": resolve(__dirname, "./src/views"),
    }
  }
})
