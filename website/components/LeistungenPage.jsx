import CONTENT from '../content/de.js'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { Arrow } from './Hero.jsx'

// Übersichtsseite /leistungen: Hero + die drei Säulen als Gruppen,
// jeder Service eine Karte (Name + ein Satz). Leaf-Themen (p.services[].items)
// sind in de.js erfasst, werden hier aber bewusst nicht gerendert.
function LeistungenPage() {
  const { hero, pillars, contact } = CONTENT.leistungen

  return (
    <>
      <Nav hrefPrefix="/" />
      <main id="main-content">
        {/* Hero — dunkles Band, damit die transparente Nav (Negativ-Logo) lesbar bleibt */}
        <section className="leistungen-hero hero-dark hero-dark--leistungen">
          <div className="container-wide leistungen-hero-inner">
            <div className="eyebrow hero-line" style={{ '--d': '0.05s', color: 'var(--accent)' }}>
              {hero.eyebrow}
            </div>
            <h1
              className="h-display hero-line"
              style={{
                '--d': '0.15s',
                marginTop: 22,
                maxWidth: 900,
                color: 'var(--fg-on-dark)',
                textWrap: 'balance',
              }}
            >
              {hero.title}
            </h1>
            <p
              className="hero-line"
              style={{
                '--d': '0.3s',
                marginTop: 26,
                maxWidth: 620,
                fontSize: 19,
                lineHeight: 1.6,
                color: 'var(--fg-on-dark-muted)',
                textWrap: 'pretty',
              }}
            >
              {hero.subtitle}
            </p>
          </div>
        </section>

        {/* Säulen — abwechselnd hell / gedämpft für Rhythmus */}
        {pillars.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            className={`section leistungen-pillar${i % 2 === 1 ? ' muted' : ''}`}
            style={{ scrollMarginTop: 'calc(var(--nav-h) + 16px)' }}
          >
            <div className="container-wide">
              <div className="pillar-head">
                <h2 className="h-section" style={{ maxWidth: 720 }}>{p.name}</h2>
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
        ))}

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
              {contact.button} <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LeistungenPage
