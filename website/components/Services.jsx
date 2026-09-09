import CONTENT from '../content/de.js'

// Startseiten-Teaser: die drei Leistungs-Säulen als Türöffner zur
// Übersichtsseite /leistungen. Inhalt aus CONTENT.leistungen (Single
// Source of Truth) — die Service-Anzahl wird aus den Säulen abgeleitet.
function Services() {
  const { teaser, pillars } = CONTENT.leistungen
  return (
    <section id="leistungen" className="section">
      <div className="container-wide">
        <div className="eyebrow">{teaser.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 900 }}>
          {teaser.heading[0]}<br />
          {teaser.heading[1]}
        </h2>
        <p style={{
          marginTop: 22, maxWidth: 560,
          fontSize: 19, lineHeight: 1.6, color: 'var(--fg-muted)',
        }}>
          {teaser.intro}
        </p>

        <div className="pillar-grid" style={{ marginTop: 56 }}>
          {pillars.map((p) => (
            <a key={p.id} href={`${teaser.href}#${p.id}`} className="pillar-card">
              <span className="mono-label">
                {p.services.length} {p.services.length === 1 ? 'Leistung' : 'Leistungen'}
              </span>
              <h3 className="h-card" style={{ marginTop: 14 }}>{p.name}</h3>
              <p style={{
                marginTop: 12, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)',
              }}>
                {p.tagline}
              </p>
              <span className="pillar-card-more" aria-hidden="true">
                Ansehen
              </span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 44 }}>
          <a href={teaser.href} className="btn btn-primary">
            {teaser.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
