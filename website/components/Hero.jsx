import CONTENT from '../content/de.js'
import RotatingWord from './RotatingWord.jsx'

function Hero() {
  const c = CONTENT.hero
  // Split the long headline at its dash into a strong lead + a lighter tail,
  // so the sentence reads as two scannable tiers instead of one dense block.
  const [titleLead, ...titleRest] = c.title.split(' - ')
  const titleTail = titleRest.join(' - ')
  // .hero-dark carries the anthracite band and the negative bleed under the
  // nav. .hero-dark--image shows the photo plain, full-bleed, no tint — the
  // photo itself runs light, so the copy here uses the light-surface (dark)
  // color set instead of the white one the rest of .hero-dark assumes.
  return (
    <section id="top" className="hero hero-dark hero-dark--image">
      <picture className="hero-bg" aria-hidden="true">
        <source type="image/webp" sizes="100vw"
          srcSet="/assets/hero-bg-1200.webp 1200w, /assets/hero-bg-1800.webp 1800w, /assets/hero-bg-2800.webp 2800w" />
        <img src="/assets/hero-bg-1800.jpg" alt="" fetchPriority="high" decoding="async" />
      </picture>

      <div className="container-wide hero-inner" style={{ position: 'relative' }}>
        {/* Wrapper carries the hero-line entrance animation (which also
            animates `transform`); .hero-logo's own mobile-only nudge lives
            on the img so the two transforms don't collide on one element. */}
        <div className="hero-line" style={{ '--d': '0.05s' }}>
          <img src="/assets/logo.svg" alt="ONEXIS"
            className="hero-logo"
            style={{
              height: 'clamp(64px, 8vw, 76px)',
              width: 'auto',
              /* cancel the SVG's ~8% left whitespace so the "O" sits flush
                 with the text below (offset scales with the logo height) */
              marginLeft: 'calc(clamp(64px, 8vw, 76px) * -0.273)',
            }} />
        </div>

        <p className="hero-line hero-kicker" style={{
          '--d': '0.15s',
          margin: '48px 0 0',
          fontSize: 'clamp(17px, 2vw, 23px)',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: 'var(--fg)',
        }}>
          <span aria-hidden="true">{c.partnerPrefix} </span>
          <RotatingWord words={c.rotatingWords} />
          <span className="sr-only">
            {c.partnerPrefix} {c.rotatingWords.slice(0, -1).join(', ')} und {c.rotatingWords[c.rotatingWords.length - 1]}.
          </span>
        </p>

        <h1 style={{ margin: '24px 0 0', fontWeight: 300 }}>
          <span className="hero-line" style={{
            display: 'block',
            '--d': '0.2s',
            fontWeight: 400,
            fontSize: 'clamp(31px, 4.4vw, 58px)',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            textWrap: 'balance',
            maxWidth: 840,
          }}>
            {titleLead}{titleTail ? ' —' : ''}
          </span>
          {titleTail && (
            <span className="hero-line" style={{
              display: 'block',
              '--d': '0.32s',
              marginTop: '0.5em',
              fontSize: 'clamp(19px, 2.5vw, 28px)',
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: '-0.015em',
              color: 'var(--fg)',
              textWrap: 'pretty',
              maxWidth: 620,
            }}>
              {titleTail}
            </span>
          )}
        </h1>

        <p className="hero-line" style={{
          '--d': '0.5s',
          marginTop: 52, fontSize: 19, lineHeight: 1.6,
          color: 'var(--fg)', maxWidth: 620,
          textWrap: 'pretty',
        }}>
          {c.subtitle}
        </p>

        <div className="hero-line" style={{
          '--d': '0.62s',
          display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap',
        }}>
          <a href="#leistungen" className="btn btn-primary">
            {c.ctaPrimary}
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
