import CONTENT from '../content/de.js'

function References() {
  const c = CONTENT.references
  return (
    <section id="referenzen" className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
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
                style={client.scale ? { maxHeight: `${44 * client.scale}px` } : undefined}
              />
            )
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
                      {logo}
                    </a>
                  : logo}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default References
