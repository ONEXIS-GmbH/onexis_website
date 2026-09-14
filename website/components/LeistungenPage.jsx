import CONTENT from '../content/de.js'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

// Übersichtsseite /leistungen: die drei Säulen als Gruppen, jeder Service
// eine Karte (Name + ein Satz). Leaf-Themen (p.services[].items) sind in
// de.js erfasst, werden hier aber bewusst nicht gerendert.
// Der Hero wurde entfernt (Grafik-Feedback) — die erste Säulen-Überschrift
// trägt seither die einzige <h1> der Seite. CONTENT.leistungen.hero bleibt
// in de.js stehen, wird hier aber nicht mehr gerendert.
function LeistungenPage() {
  const { pillars, contact } = CONTENT.leistungen

  return (
    <>
      <Nav hrefPrefix="/" heroLight />
      <main id="main-content">
        {/* Säulen — abwechselnd hell / gedämpft für Rhythmus */}
        {pillars.map((p, i) => {
          const Heading = i === 0 ? 'h1' : 'h2'
          return (
            <section
              key={p.id}
              id={p.id}
              className={`section leistungen-pillar${i % 2 === 1 ? ' muted' : ''}`}
              style={{ scrollMarginTop: 'calc(var(--nav-h) + 16px)' }}
            >
              <div className="container-wide">
                <div className="pillar-head">
                  <Heading className="h-section" style={{ maxWidth: 720 }}>{p.name}</Heading>
                  <span className="mono-label pillar-count">
                    {p.services.length} {p.services.length === 1 ? 'Leistung' : 'Leistungen'}
                  </span>
                </div>
                <p style={{
                  marginTop: 18, maxWidth: 620,
                  fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)',
                }}>
                  {p.intro}
                </p>

                <div className="leistung-grid" style={{ marginTop: 44 }}>
                  {p.services.map((s) => (
                    <article key={s.name} className="leistung-card">
                      <h3 className="h-card">{s.name}</h3>
                      <p style={{
                        marginTop: 12, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)',
                      }}>
                        {s.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* Abschluss-CTA */}
        <section className="section section-sm inverse">
          <div className="container-wide" style={{
            display: 'flex', flexWrap: 'wrap', gap: 24,
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <h2 className="h-card" style={{ maxWidth: 520, fontWeight: 400 }}>
              {contact.text}
            </h2>
            <a href={contact.href} className="btn btn-primary">
              {contact.button}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LeistungenPage
