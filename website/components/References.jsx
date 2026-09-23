import CONTENT from '../content/de.js'

function References() {
  const c = CONTENT.references
  return (
    <section id="referenzen" className="section" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="container-wide">
        <div className="eyebrow">{c.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 720 }}>
          {c.heading[0]}<br />
          {c.heading[1]}
        </h2>

        <div className="client-grid" style={{ marginTop: 48 }}>
          {c.clients.map((client) => {
            if (!client.logo) {
              return <div key={client.name} className="client-cell">{client.name}</div>
            }
            const logo = (
              <img
                className="client-logo"
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                width={client.w}
                height={client.h}
                style={client.scale ? { maxHeight: `calc(var(--client-logo-h) * ${client.scale})` } : undefined}
              />
            )
            const content = client.caption
              ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {logo}
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{client.caption}</div>
                </div>
              )
              : logo
            return (
              <div key={client.name} className="client-cell">
                {client.url
                  ? <a
                      className="client-link"
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${client.name} – Website öffnen (neuer Tab)`}
                    >
                      {content}
                    </a>
                  : content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default References
