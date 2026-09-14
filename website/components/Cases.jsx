import CONTENT from '../content/de.js'
import { renderPoint } from './richText.jsx'

function CaseRow({ c }) {
  return (
    <article className="case-row">
      <div>
        <h3 style={{
          margin: 0, fontWeight: 300, fontSize: 'clamp(26px, 2.6vw, 34px)',
          lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: 640,
        }}>{c.headline}</h3>
        <p style={{
          marginTop: 20, fontSize: 16, fontWeight: 500, color: 'var(--fg)',
          maxWidth: 640,
        }}>{c.lead}</p>
        <p style={{
          marginTop: 10, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-muted)',
          maxWidth: 640,
        }}>{c.body}</p>
        <ul style={{
          marginTop: 16, paddingLeft: 20, display: 'flex', flexDirection: 'column',
          gap: 10, maxWidth: 640,
        }}>
          {c.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg)' }}>
              {renderPoint(b)}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: 4,
      }}>
        <div className="tabular" style={{
          fontSize: 56, fontWeight: 300, letterSpacing: '-0.03em',
          lineHeight: 1, color: 'var(--fg)',
        }}>{c.metric.v}</div>
        <div style={{ fontSize: 14, color: 'var(--fg-muted)' }}>{c.metric.l}</div>
      </div>
    </article>
  )
}

function Cases() {
  const c = CONTENT.cases
  return (
    <section id="use-cases" className="section">
      <div className="container-wide">
        <div className="eyebrow">{c.eyebrow}</div>

        <div style={{ marginTop: 40 }}>
          {c.items.map((item, i) => <CaseRow key={i} c={item} />)}
        </div>
      </div>
    </section>
  )
}

export default Cases
