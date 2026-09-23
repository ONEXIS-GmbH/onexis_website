import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// isSsrBuild unterscheidet den normalen Browser-Build (vite build → dist/)
// vom Prerender-Build (vite build --ssr entry-server.jsx → .prerender/), den
// scripts/prerender.mjs danach importiert. Ein Config-Objekt für beide hält
// react()/publicDir konsistent, statt sie in zwei Configs zu pflegen.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: isSsrBuild ? '.prerender' : 'dist',
    // Der SSR-Build importiert kein einziges Asset (siehe App.jsx-Kommentar)
    // und braucht deshalb keine Kopie von public/ — explizit statt Vites
    // SSR-Default zu vertrauen, sonst landen ~20 MB Bilder in .prerender/.
    copyPublicDir: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? { output: { entryFileNames: 'entry-server.js' } }
      : undefined,
  },
}))
