import CONTENT from '../content/de.js'

// Startseiten-Teaser: eine Karte pro Säule (Beraten / Umsetzen / Befähigen),
// abgeleitet aus `pillars`. Jede Karte springt direkt zum passenden Abschnitt
// auf /leistungen.
function Services() {
  const { teaser, pillars } = CONTENT.leistungen
  return (
    <section id="leistungen" className="section">
      <div className="container-wide">
        {/* Der eyebrow trägt die <h2> der Sektion (sonst h1 → h3-Sprung);
            optisch identisch, weil das CSS klassenbasiert ist. Gleiches
            Muster wie in Cases.jsx. */}
        <h2 className="eyebrow">{teaser.eyebrow}</h2>

        <div className="pillar-grid" style={{ marginTop: 40 }}>
          {pillars.map((p) => (
            <a key={p.id} href={`${teaser.href}#${p.id}`} className="pillar-card">
              <span className="mono-label">{p.n}</span>
              <h3 className="h-card" style={{ marginTop: 10 }}>{p.name}</h3>
              <p style={{
                marginTop: 14, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)',
              }}>
                {p.tagline}
              </p>
              <span className="pillar-card-more" aria-hidden="true">
                {p.services.length} Leistungen ansehen
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
