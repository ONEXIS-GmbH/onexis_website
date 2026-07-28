import React from 'react'
import CONTENT from '../content/de.js'

function Nav({ hrefPrefix = '' }) {
  const c = CONTENT.nav
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onResize = () => { if (window.innerWidth > 820) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      data-transparent={!solid ? '' : undefined}
      style={{
        position: 'sticky', top: 0, zIndex: 60,
        background: solid ? 'rgba(255,255,255,.9)' : 'transparent',
        backdropFilter: solid ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',
        boxShadow: solid ? '0 1px 0 var(--border)' : 'none',
        transition: 'background 200ms, box-shadow 200ms',
      }}
    >
      <div className="container-wide" style={{
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href={`${hrefPrefix}#top`} aria-label="ONEXIS — Startseite" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={solid ? '/assets/logo-x.svg' : '/assets/logo-x-negativ.svg'}
            alt="" aria-hidden="true" style={{ height: 24 }} />
        </a>

        <nav className="nav-desktop" aria-label="Hauptnavigation">
          {c.links.map(l => (
            <a key={l.href} href={`${hrefPrefix}${l.href}`} className="nav-link" style={{
              fontSize: 14, color: solid ? 'var(--fg)' : 'var(--fg-on-dark)',
              fontWeight: 500, textDecoration: 'none',
            }}>{l.label}</a>
          ))}
          <a href={`${hrefPrefix}#kontakt`} className={`btn ${solid ? 'btn-dark' : 'btn-ghost-inverse'}`}
            style={{ padding: '10px 18px' }}>
            {c.cta}
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          onClick={() => setOpen(o => !o)}
          style={{ color: solid ? 'var(--fg)' : 'var(--fg-on-dark)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {open
              ? <path d="M5 5l14 14M19 5L5 19" />
              : <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="nav-panel" aria-label="Hauptnavigation">
          <div className="container-wide" style={{ display: 'flex', flexDirection: 'column' }}>
            {c.links.map(l => (
              <a key={l.href} href={`${hrefPrefix}${l.href}`} className="nav-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={`${hrefPrefix}#kontakt`} className="btn btn-dark" onClick={() => setOpen(false)}>
              {c.cta}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Nav
