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
