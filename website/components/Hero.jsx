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
        {/* lowercase fetchpriority, nicht fetchPriority: react-dom/server in
            dieser Version kennt die camelCase-Prop nicht und würde bei jedem
            Prerender-Build warnen. Der DOM-Attributname ist ohnehin
            case-insensitiv, Browser lesen beide Schreibweisen gleich. */}
        <img src="/assets/hero-bg-1800.jpg" alt="" fetchpriority="high" decoding="async" />
      </picture>

      <div className="container-wide hero-inner" style={{ position: 'relative' }}>
        {/* Wrapper carries the hero-line entrance animation (which also
            animates `transform`); .hero-logo's own size and mobile-only nudge
            live on the img (site.css) so the two transforms don't collide on
            one element. */}
        <div className="hero-line" style={{ '--d': '0.05s' }}>
          <img src="/assets/logo.svg" alt="ONEXIS" className="hero-logo" />
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
            // Three short clauses read best balanced across a few lines
            // rather than pushed to the 58px ceiling the old single-clause
            // title used — capped lower so it doesn't dwarf the layout.
            fontSize: 'clamp(28px, 3.6vw, 46px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            textWrap: 'balance',
            maxWidth: 780,
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

      </div>
    </section>
  )
}

export default Hero
