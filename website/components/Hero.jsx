import CONTENT from '../content/de.js'
import RotatingWord from './RotatingWord.jsx'
import HeroX from './HeroX.jsx'

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
  // Split the long headline at its dash into a strong lead + a lighter tail,
  // so the sentence reads as two scannable tiers instead of one dense block.
  const [titleLead, ...titleRest] = c.title.split(' - ')
  const titleTail = titleRest.join(' - ')
  return (
    <section id="top" className="hero" style={{
      position: 'relative',
      marginTop: -72,   /* full-bleed dark behind the transparent nav (72px) */
      background: 'radial-gradient(62% 78% at 76% 50%, ' +
        'color-mix(in srgb, var(--onexis-blau) 42%, transparent) 0%, ' +
        'color-mix(in srgb, var(--onexis-blau) 9%, transparent) 44%, ' +
        'transparent 68%), var(--onexis-anthrazit)',
      color: 'var(--fg-on-dark)',
      overflow: 'hidden',
    }}>
      <div className="hero-x-wrap" aria-hidden="true">
        <HeroX />
      </div>

      <div className="container-wide hero-inner" style={{ position: 'relative' }}>
        <img src="/assets/logo-negativ.svg" alt="ONEXIS"
          className="hero-line"
          style={{
            '--d': '0.05s',
            height: 'clamp(44px, 6vw, 76px)',
            width: 'auto',
            /* cancel the SVG's ~8% left whitespace so the "O" sits flush
               with the text below (offset scales with the logo height) */
            marginLeft: 'calc(clamp(44px, 6vw, 76px) * -0.273)',
          }} />

        <p className="hero-line hero-kicker" style={{
          '--d': '0.15s',
          margin: '48px 0 0',
          fontSize: 'clamp(17px, 2vw, 23px)',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: 'var(--fg-on-dark)',
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
            color: 'var(--fg-on-dark)',
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
              color: 'var(--fg-on-dark)',
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
          color: 'var(--fg-on-dark-muted)', maxWidth: 620,
          textWrap: 'pretty',
        }}>
          {c.subtitle}
        </p>

        <div className="hero-line" style={{
          '--d': '0.62s',
          display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap',
        }}>
          <a href="#leistungen" className="btn btn-primary">
            {c.ctaPrimary} <Arrow />
          </a>
          <a href="#kontakt" className="btn btn-ghost-inverse">
            {c.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
