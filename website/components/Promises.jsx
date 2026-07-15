import CONTENT from '../content/de.js'

// Renders **...** spans in a statement as semibold emphasis.
function renderPoint(text) {
  return text.split('**').map((seg, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ fontWeight: 600 }}>{seg}</strong>
      : seg
  )
}

function Promises() {
  const c = CONTENT.promises
  return (
    <section className="section" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <div className="eyebrow">{c.eyebrow}</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 720 }}>
          {c.heading[0]}<br />
          {c.heading[1]}
        </h2>

        <div className="promise-grid" style={{ marginTop: 56 }}>
          {c.columns.map((col) => (
            <div key={col.n}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 10,
                paddingBottom: 14, borderBottom: '1px solid var(--border-strong)',
              }}>
                <span style={{
                  fontSize: 15, fontWeight: 600, color: 'var(--accent-ink)',
                }}>{col.n}</span>
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}>
                  {col.label}
                </span>
              </div>
              <div style={{
                marginTop: 24, display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                {col.points.map((p, i) => (
                  <p key={i} style={{
                    fontSize: 17, lineHeight: 1.5, letterSpacing: '-0.005em',
                    color: 'var(--fg)',
                  }}>
                    {renderPoint(p)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Promises
