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
 * Unbekannte Pfade fallen auf die Startseiten-Metadaten zurück.
 */
export function applyRouteMeta(path) {
  const meta = ROUTE_META[path] || ROUTE_META['/']
  const url = SITE_URL + (path === '/' ? '/' : path)

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', url)
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)

  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}
