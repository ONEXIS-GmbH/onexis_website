import CONTENT from '../content/de.js'

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

        <div className="team-grid" style={{ marginTop: 48 }}>
          {c.members.map((m) => (
            <figure key={m.name} style={{ margin: 0 }}>
              <img
                src={m.img}
                alt={`Porträt von ${m.name}`}
                loading="lazy"
                width="747"
                height="800"
                style={{
                  width: '100%', height: 'auto',
                  borderRadius: 'var(--radius-lg)',
                  display: 'block',
                }}
              />
              <figcaption style={{ marginTop: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name}</div>
                {m.title && (
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 2 }}>
                    {m.title}
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
