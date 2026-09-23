import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Node-Entry für den Prerender-Schritt (vite build --ssr, siehe
// vite.config.js und scripts/prerender.mjs). renderToString, nicht
// renderToStaticMarkup — letzteres entfernt die Marker, die hydrateRoot in
// main.jsx zum Wiederanknüpfen braucht.
export function render(path) {
  return renderToString(<App path={path} />)
}
