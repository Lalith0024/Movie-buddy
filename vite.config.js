import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change `your-repo-name` to the actual repo name
export default defineConfig({
  base: "/",
  plugins: [react()],
});
