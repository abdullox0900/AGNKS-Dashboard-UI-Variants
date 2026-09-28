import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone UI mockup — no backend, no Telegram; mock data only.
export default defineConfig({
  plugins: [react()],
  server: { host: true },
})
