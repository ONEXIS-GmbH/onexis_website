import CONTENT from '../content/de.js'

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  )
}

function Hero() {
  const c = CONTENT.hero
  return (
    <section id="top" className="hero" style={{
      position: 'relative',
      background: 'var(--bg-muted)',
      color: 'var(--fg)',
      overflow: 'hidden',
    }}>
      <img src="/assets/logo-x.svg" alt="" aria-hidden="true"
        className="hero-watermark"
        style={{
          position: 'absolute',
          right: '-12%', top: '-10%',
          width: '70%',
          opacity: 0.05,
          pointerEvents: 'none',
        }} />

      <div className="container-wide hero-inner" style={{ position: 'relative' }}>
        <img src="/assets/logo.svg" alt="ONEXIS"
          className="hero-line"
          style={{
            '--d': '0.05s',
            height: 'clamp(44px, 6vw, 76px)',
            width: 'auto',
          }} />

        <div className="hero-eyebrow-row" style={{
          display: 'flex', alignItems: 'center', gap: 16, marginTop: 56,
        }}>
          <span className="hero-rule" />
          <div style={{
            fontSize: 13, fontWeight: 600,
            letterSpacing: 'clamp(0.22em, 1.1vw, 0.42em)',
            textTransform: 'uppercase', color: 'var(--accent-ink)',
          }}>Projects in Motion</div>
        </div>

        <h1 style={{
          margin: '28px 0 0',
          fontWeight: 300,
          fontSize: 'clamp(32px, 4.4vw, 60px)',
          lineHeight: 1.12,
          letterSpacing: '-0.025em',
          maxWidth: 1040,
        }}>
          <span className="hero-line" style={{ display: 'block', '--d': '0.2s' }}>
            {c.title}
          </span>
        </h1>

        <p className="hero-line" style={{
          '--d': '0.55s',
          marginTop: 32, fontSize: 19, lineHeight: 1.6,
          color: 'var(--fg-muted)', maxWidth: 680,
        }}>
          {c.subtitle}
        </p>

        <div className="hero-line" style={{
          '--d': '0.7s',
          display: 'flex', gap: 12, marginTop: 44, flexWrap: 'wrap',
        }}>
          <a href="#leistungen" className="btn btn-primary">
            {c.ctaPrimary} <Arrow />
          </a>
          <a href="#kontakt" className="btn btn-ghost">
            {c.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
