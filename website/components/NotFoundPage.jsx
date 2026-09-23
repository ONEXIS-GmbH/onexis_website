import CONTENT from '../content/de.js'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

// 404-Seite. Wird sowohl für unbekannte Pfade beim Prerendern (dist/404.html,
// von Cloudflare Pages automatisch mit Status 404 ausgeliefert) als auch
// client-seitig gerendert, falls main.jsx auf dieser Datei hydriert.
function NotFoundPage() {
  const c = CONTENT.notFound

  return (
    <>
      <Nav hrefPrefix="/" />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 140, paddingBottom: 96 }}>
          <div className="container">
            <div className="eyebrow">{c.eyebrow}</div>
            <h1 className="h-section" style={{ marginTop: 16, maxWidth: 640 }}>
              {c.title}
            </h1>
            <p style={{
              marginTop: 24, maxWidth: 480, fontSize: 16, lineHeight: 1.65,
              color: 'var(--fg-muted)',
            }}>
              {c.body}
            </p>
            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/" className="btn btn-dark">{c.homeLink}</a>
              <a href="/leistungen" className="btn btn-ghost">{c.servicesLink}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage
