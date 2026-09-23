import CONTENT from '../content/de.js'

// Startseiten-Teaser: drei feste Karten (Chef-Feedback 20260913), die alle
// auf die Übersichtsseite /leistungen führen. Bewusst NICHT aus `pillars`
// abgeleitet — andere Namen, anderer Zuschnitt als die Assess&Design/
// Execute&Deliver/Empower-Struktur der Unterseite.
function Services() {
  const { teaser } = CONTENT.leistungen
  return (
    <section id="leistungen" className="section">
      <div className="container-wide">
        {/* Überschrift und Intro sind entfallen (Chef-Feedback 20260923) —
            die drei Karten sollen für sich stehen. Damit die Sektion nicht
            ohne Überschrift dasteht (h1 → h3-Sprung), trägt der eyebrow die
            <h2>; optisch identisch, weil das CSS klassenbasiert ist. Gleiches
            Muster wie in Cases.jsx. */}
        <h2 className="eyebrow">{teaser.eyebrow}</h2>

        <div className="pillar-grid" style={{ marginTop: 40 }}>
          {teaser.cards.map((card) => (
            <a key={card.name} href={teaser.href} className="pillar-card">
              <h3 className="h-card">{card.name}</h3>
              <p style={{
                marginTop: 14, fontSize: 15, fontWeight: 500, color: 'var(--fg)',
              }}>
                {card.lead}
              </p>
              <p style={{
                marginTop: 8, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)',
              }}>
                {card.body}
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
