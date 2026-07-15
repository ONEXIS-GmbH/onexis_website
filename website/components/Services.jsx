import CONTENT from '../content/de.js'

function Services() {
  const c = CONTENT.services
  return (
    <section id="leistungen" className="section">
      <div className="container-wide">
        <div className="eyebrow">{c.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 980 }}>
          {c.heading[0]}<br />
          {c.heading[1]}
        </h2>

        <div className="service-grid" style={{ marginTop: 56 }}>
          {c.items.map((s) => (
            <article key={s.name}>
              <h3 className="h-card" style={{
                paddingBottom: 16,
                borderBottom: '1px solid var(--border-strong)',
              }}>
                {s.name}
              </h3>
              <ul style={{
                margin: '28px 0 0', padding: 0, listStyle: 'none',
                display: 'flex', flexDirection: 'column', gap: 18,
              }}>
                {s.points.map((p, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <img src="/assets/logo-x.svg" alt="" aria-hidden="true"
                      style={{ width: 14, height: 14, flex: '0 0 auto', marginTop: 4 }} />
                    <span style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--fg)' }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
