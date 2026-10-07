import CONTENT from '../content/de.js'
import LinkedInIcon from './LinkedInIcon.jsx'

// Member- und Partner-Karten waren zuvor Zeile für Zeile dupliziert; jede
// Änderung musste zweimal gemacht werden. Eine Komponente für beide.
function Member({ m }) {
  return (
    <figure style={{ margin: 0 }}>
      <img
        src={m.img}
        alt={`Porträt von ${m.name}`}
        loading="lazy"
        width="845"
        height="845"
        style={{
          width: '100%', height: 'auto',
          borderRadius: 'var(--radius-lg)',
          display: 'block',
        }}
      />
      <figcaption style={{ marginTop: 14 }}>
        <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>
          {m.name}
        </div>
        {m.title && (
          <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 4 }}>
            {m.title}
          </div>
        )}
        {m.email && (
          <a
            href={`mailto:${m.email}`}
            className="link-target"
            style={{
              display: 'block',
              marginTop: 6, fontSize: 13,
              color: 'var(--accent-ink)', textDecoration: 'none',
              /* long addresses must break rather than widen the card */
              overflowWrap: 'anywhere',
            }}
          >
            {m.email}
          </a>
        )}
        {m.linkedin && (
          <a
            href={m.linkedin}
            className="link-target"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name} auf LinkedIn`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 8, fontSize: 13,
              color: 'var(--accent-ink)', textDecoration: 'none',
            }}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        )}
      </figcaption>
    </figure>
  )
}

function Team() {
  const c = CONTENT.team
  return (
    <section id="team" className="section muted">
      <div className="container-wide">
        <div className="eyebrow">{c.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 540 }}>
          {c.heading[0]}<br />{c.heading[1]}
        </h2>
        <p style={{
          marginTop: 24, fontSize: 18, lineHeight: 1.6, color: 'var(--fg)',
          maxWidth: 640,
        }}>
          {c.body}
        </p>

        <div className="team-grid" style={{ marginTop: 40 }}>
          {c.members.map((m) => <Member key={m.name} m={m} />)}
        </div>

        {c.partners && c.partners.length > 0 && (
          <>
            <div className="eyebrow" style={{ marginTop: 56 }}>{c.partnersHeading}</div>
            <div className="team-grid" style={{ marginTop: 24 }}>
              {c.partners.map((m) => <Member key={m.name} m={m} />)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Team
