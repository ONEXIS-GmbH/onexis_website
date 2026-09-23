import { hydrateRoot, createRoot } from 'react-dom/client'
import App, { normalizePath } from './App.jsx'
import { applyRouteMeta } from './content/meta.js'
import './styles/tokens.css'
import './styles/site.css'

const path = normalizePath(window.location.pathname)

// vite dev serves index.html unprerendered — applyRouteMeta is the only
// thing that corrects title/description/canonical there. In production the
// values it writes already match what scripts/prerender.mjs baked into the
// HTML, so this is a no-op.
applyRouteMeta(path)

const container = document.getElementById('app')
// hydrateRoot reuses the server-rendered markup (dist/*/index.html) instead
// of discarding and repainting it — that's the whole point of prerendering.
// If dist/app.html for some reason wasn't prerendered (container is empty),
// hydrateRoot would error; createRoot covers that case, matching today's
// dev-server behaviour.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App path={path} />)
} else {
  createRoot(container).render(<App path={path} />)
}
