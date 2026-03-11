import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pour GitHub Pages avec custom domain (lestetesaclap.fr) → base: '/'
  // Pour GitHub Pages sans custom domain → base: '/tetesaclap/'
  base: '/tetesaclap/',
})
