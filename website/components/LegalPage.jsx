import CONTENT from '../content/de.js'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

// Generische Rechtsseite (Impressum / Datenschutz / AGB).
// Inhalt kommt 1:1 aus CONTENT.legal[page].
function LegalPage({ page }) {
  const c = CONTENT.legal[page]
  if (!c) return null

  return (
    <>
      <Nav hrefPrefix="/" />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 140 }}>
          <div className="container">
            {c.eyebrow && <div className="eyebrow">{c.eyebrow}</div>}
            <h1 className="h-section" style={{ marginTop: 16, maxWidth: 720 }}>
              {c.title}
            </h1>

            <div style={{ marginTop: 56, maxWidth: 720 }}>
              {c.blocks.map((block, i) => (
                <div key={i} style={{ marginTop: i === 0 ? 0 : 40 }}>
                  {block.heading && (
                    <h2 style={{
                      fontSize: 20, fontWeight: 600, color: 'var(--fg)',
                      letterSpacing: '-0.01em', marginBottom: 12,
                    }}>
                      {block.heading}
                    </h2>
                  )}
                  {block.body.map((line, j) => (
                    <p key={j} style={{
                      fontSize: 16, lineHeight: 1.65, color: 'var(--fg-muted)',
                      margin: j === 0 ? 0 : '10px 0 0',
                    }}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}

              {c.footnote && (
                <p style={{
                  marginTop: 48, paddingTop: 24,
                  borderTop: '1px solid var(--border-strong)',
                  fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.6,
                }}>
                  {c.footnote}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LegalPage
