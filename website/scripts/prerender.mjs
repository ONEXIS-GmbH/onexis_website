// Rendert jede Route zu echtem statischem HTML, nach dem SSR-Build.
// Läuft in Cloudflare Pages' Build (npm run build → siehe package.json),
// braucht kein Chrome/Puppeteer — anders als scripts/make-og-image.mjs.
//
// Warum das nötig ist: ohne Prerendering liefert dist/index.html für jede
// Route denselben leeren <div id="app"></div> mit den Startseiten-Meta-Tags
// aus. Google rendert JS meist selbst, aber LinkedIn/Slack/WhatsApp und die
// meisten KI-Crawler (GPTBot, ClaudeBot, PerplexityBot, …) tun das nicht —
// für die ist onexis.ch heute jenseits von "/" eine leere Seite.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTE_META, NOT_FOUND_META, SITE_URL, routeMeta } from '../content/meta.js'

process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'))

const template = fs.readFileSync('dist/index.html', 'utf8')
if (!template.includes('<div id="app"></div>')) {
  throw new Error(
    'prerender: dist/index.html enthält nicht mehr genau <div id="app"></div> — ' +
    'Marker in index.html und main.jsx müssen übereinstimmen.'
  )
}

const { render } = await import('../.prerender/entry-server.js')

const escapeHtml = (s) => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

// Ersetzt genau EIN Vorkommen eines Head-Tags. Zählt statt blind zu
// ersetzen: bei "/" sind alte und neue Werte identisch (kein Diff, kein
// Signal), und ein reformatiertes index.html soll den Build hart abbrechen,
// statt still falsche OG-/Canonical-Tags auszuliefern.
//
// Wichtig: `re` selbst bleibt ohne 'g'-Flag, weil String.replace(re, …) mit
// einer non-global Regex genau das erste Vorkommen ersetzt — exakt das
// gewünschte Verhalten. Zum Zählen braucht es trotzdem eine 'g'-Variante:
// String.match(re) OHNE 'g' liefert [gesamtmatch, ...capture-groups], und
// dessen .length ist bei null Gruppen immer 1, sobald es überhaupt einen
// Treffer gibt — das zählt nicht die Vorkommen im Dokument, sondern nur die
// Capture-Groups eines einzelnen Treffers.
function replaceOne(html, label, re, replacement) {
  const globalRe = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')
  const count = (html.match(globalRe) || []).length
  if (count !== 1) {
    throw new Error(
      `prerender: erwartete genau 1 Treffer für ${label} in index.html, ` +
      `gefunden: ${count}. Regex und Markup sind auseinandergelaufen.`
    )
  }
  return html.replace(re, replacement)
}

// [\s\S]*? statt .*?: description/og:description/twitter:description tragen
// ihr content= in index.html auf der nächsten Zeile.
function injectHead(html, meta) {
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const url = escapeHtml(meta.url)

  html = replaceOne(html, '<title>', /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`)
  html = replaceOne(html, 'meta[name=description]',
    /<meta name="description"[\s\S]*?content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${description}" />`)
  html = replaceOne(html, 'link[rel=canonical]',
    /<link rel="canonical" href="[\s\S]*?"\s*\/>/,
    `<link rel="canonical" href="${url}" />`)
  html = replaceOne(html, 'og:url', /<meta property="og:url" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:url" content="${url}" />`)
  html = replaceOne(html, 'og:title', /<meta property="og:title" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${title}" />`)
  html = replaceOne(html, 'og:description',
    /<meta property="og:description"[\s\S]*?content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${description}" />`)
  html = replaceOne(html, 'twitter:title', /<meta name="twitter:title" content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`)
  html = replaceOne(html, 'twitter:description',
    /<meta name="twitter:description"[\s\S]*?content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`)

  return html
}

function writeRoute(routePath, html) {
  const outPath = routePath === '/'
    ? 'dist/index.html'
    : `dist${routePath}/index.html`
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html)
  console.log(`  ${outPath}  (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`)
}

console.log('Prerendering …')

for (const routePath of Object.keys(ROUTE_META)) {
  const body = render(routePath)
  let html = injectHead(template, routeMeta(routePath))
  html = html.replace('<div id="app"></div>', `<div id="app">${body}</div>`)
  writeRoute(routePath, html)
}

// 404: noindex, kein Canonical (eine 404-Seite hat keine "richtige" URL, auf
// die man verweisen könnte). og:url braucht trotzdem einen Wert — bekommt
// SITE_URL als Platzhalter, ist wegen noindex ohnehin irrelevant.
{
  const body = render('/__not-found__') // beliebiger unbekannter Pfad → App.jsx → NotFoundPage
  let html = injectHead(template, { ...NOT_FOUND_META, url: SITE_URL })
  html = html.replace('<div id="app"></div>', `<div id="app">${body}</div>`)
  html = replaceOne(html, '<head>', /<head>/, '<head>\n  <meta name="robots" content="noindex" />')
  html = replaceOne(html, 'link[rel=canonical] (Entfernung)',
    /\s*<link rel="canonical" href="[\s\S]*?"\s*\/>/, '')
  fs.mkdirSync('dist', { recursive: true })
  fs.writeFileSync('dist/404.html', html)
  console.log(`  dist/404.html  (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`)
}

// sitemap.xml aus ROUTE_META statt handgepflegt (public/sitemap.xml listet
// heute zufällig dieselben fünf Routen — dieses Drift-Risiko fällt weg).
// Überschreibt die Kopie, die copyPublicDir bereits nach dist/ gelegt hat.
{
  const PRIORITY = {
    '/': '1.0', '/leistungen': '0.8',
    '/impressum': '0.3', '/datenschutz': '0.3', '/agb': '0.3',
  }
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = Object.keys(ROUTE_META).map((p) => {
    const { url } = routeMeta(p)
    return `  <url>\n    <loc>${escapeHtml(url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${PRIORITY[p] ?? '0.5'}</priority>\n  </url>`
  }).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  fs.writeFileSync('dist/sitemap.xml', xml)
  console.log('  dist/sitemap.xml')
}

console.log('Prerendering fertig.')
