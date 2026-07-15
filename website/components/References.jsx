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
          {c.clients.map((name) => (
            <div key={name} className="client-cell">{name}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default References
