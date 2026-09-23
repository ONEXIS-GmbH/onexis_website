// Per-Route-Metadaten für die SPA.
//
// Warum das hier steht: index.html liefert für jede Route dieselben Tags aus,
// und Scraper (LinkedIn, Slack, WhatsApp) führen kein JavaScript aus. Die
// statischen Tags in index.html sind also das, was beim Teilen sichtbar wird —
// die Werte hier korrigieren Titel/Description erst nach dem Rendern, für den
// Browser-Tab, Lesezeichen und Suchmaschinen, die JS ausführen.
//
// Texte bewusst hier und nicht in de.js: de.js ist Seiteninhalt, das hier ist
// Auszeichnung. Beides zu mischen macht de.js unübersichtlich.

export const SITE_URL = 'https://www.onexis.ch'
export const OG_IMAGE = `${SITE_URL}/assets/og-image.png`

const DEFAULT_DESCRIPTION =
  'ONEXIS GmbH — Schweizer Partner für IT-Beratung, Projekt-Management, ' +
  'IT-Architektur und Seminare. Wir bringen kritische IT-Vorhaben sicher ins Ziel.'

export const ROUTE_META = {
  '/': {
    title: 'ONEXIS — Projects in Motion',
    description: DEFAULT_DESCRIPTION,
  },
  '/leistungen': {
    title: 'Leistungen — ONEXIS',
    description:
      'Von der Analyse über die Umsetzung bis zur Befähigung: Projektleitung, ' +
      'PMO, Interim Management, Health Checks, IT-Architektur und Seminare.',
  },
  '/impressum': {
    title: 'Impressum — ONEXIS',
    description: 'Impressum der ONEXIS GmbH, Gelterkinden.',
  },
  '/datenschutz': {
    title: 'Datenschutz — ONEXIS',
    description: 'Datenschutzerklärung der ONEXIS GmbH.',
  },
  '/agb': {
    title: 'AGB — ONEXIS',
    description: 'Allgemeine Geschäftsbedingungen der ONEXIS GmbH.',
  },
}

export const NOT_FOUND_META = {
  title: 'Seite nicht gefunden — ONEXIS',
  description: 'Die aufgerufene Seite existiert nicht.',
}

/**
 * Reine Datenfunktion: liefert Titel, Description und die kanonische URL für
 * einen Pfad. Unbekannte Pfade fallen auf NOT_FOUND_META zurück — nicht auf
 * die Startseite, damit diese Werte zu dem passen, was NotFoundPage rendert.
 *
 * Wird von zwei Stellen konsumiert, die dieselben Werte nie auseinanderlaufen
 * lassen dürfen: applyRouteMeta() unten (DOM, zur Laufzeit im Browser) und
 * scripts/prerender.mjs (String-Injektion ins statische HTML beim Build).
 */
export function routeMeta(path) {
  const meta = ROUTE_META[path] ?? NOT_FOUND_META
  return { ...meta, url: SITE_URL + (path === '/' ? '/' : path) }
}

/** Setzt (oder erstellt) ein <meta>-Tag anhand von name= oder property=. */
function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Wendet Titel, Description und die kanonische URL für den aktuellen Pfad an.
 * Nur für den Browser relevant (vite dev prerendert nicht) — in Production
 * überschreibt applyRouteMeta Werte, die das Prerendering bereits korrekt
 * gesetzt hat, mit identischen Werten (No-op).
 */
export function applyRouteMeta(path) {
  const meta = routeMeta(path)

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', meta.url)
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)

  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', meta.url)
}
