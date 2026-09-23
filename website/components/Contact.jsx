import CONTENT from '../content/de.js'

// Kontaktformular wurde entfernt (Chef-Feedback 20260913) — direkter
// Mail-Kontakt über kontakt@onexis.ch ersetzt es. Kein Backend mehr nötig
// (website/functions/api/contact.js wurde entsprechend gelöscht).
function Contact() {
  const c = CONTENT.contact
  return (
    <section id="kontakt" className="section">
      <div className="container-wide split-grid" style={{
        '--split-cols': '1fr 1.1fr', '--split-gap': '80px', alignItems: 'start',
      }}>
        <div>
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="h-section" style={{ marginTop: 16 }}>
            {c.heading}
          </h2>
          <p style={{
            marginTop: 24, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-muted)',
            maxWidth: 460,
          }}>
            {c.intro}
          </p>

          <address style={{
            marginTop: 36, fontSize: 16, lineHeight: 1.8, color: 'var(--fg)',
            fontStyle: 'normal',
          }}>
            <strong style={{ fontWeight: 600 }}>{c.companyName}</strong><br />
            {c.street}<br />
            {c.city}<br />
            <a className="link-target" href={c.phoneHref}>{c.phone}</a>
          </address>
        </div>

        <a href={c.contactEmailHref}
          style={{
            display: 'block',
            background: 'var(--bg-muted)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 32,
          }}>
          {/* Das "Kontakt"-Label über der Adresse ist entfallen (Feedback
              20260923) — der eyebrow der Sektion sagt dasselbe schon. */}
          <span style={{
            display: 'block',
            fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 300,
            letterSpacing: '-0.01em', color: 'var(--fg)',
            overflowWrap: 'anywhere',
          }}>
            {c.contactEmail}
          </span>
          <span style={{
            display: 'inline-block', marginTop: 20,
            fontSize: 15, fontWeight: 500, color: 'var(--accent-ink)',
          }}>
            E-Mail schreiben →
          </span>
        </a>
      </div>
    </section>
  )
}

export default Contact
