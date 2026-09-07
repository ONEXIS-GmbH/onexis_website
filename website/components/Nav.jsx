import React from 'react'
import CONTENT from '../content/de.js'

function Nav({ hrefPrefix = '', heroLight = false }) {
  const c = CONTENT.nav
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const panelRef = React.useRef(null)
  const toggleRef = React.useRef(null)

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

  // The open panel is a fixed overlay: it has to behave like one. Escape and a
  // widened viewport close it, focus moves in and is kept inside, the page
  // behind stops scrolling, and focus returns to the toggle on the way out.
  React.useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusables = () => Array.from(
      panel?.querySelectorAll('a[href], button:not([disabled])') ?? []
    )
    focusables()[0]?.focus()
    document.body.classList.add('nav-open')

    const onKey = (e) => {
      // Escape dismisses without navigating, so focus goes back where it came
      // from. A link click navigates instead — there we let the anchor keep it.
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); return }
      if (e.key !== 'Tab') return
      // Cycle across the panel plus the toggle, which sits outside it.
      const ring = [...focusables(), toggleRef.current].filter(Boolean)
      if (ring.length === 0) return
      const first = ring[0]
      const last = ring[ring.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
    const onResize = () => { if (window.innerWidth > 820) setOpen(false) }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.classList.remove('nav-open')
    }
  }, [open])

  const close = () => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  const solidBg = scrolled || open
  // Startseite's hero is a plain, mostly light photo now (see Hero.jsx) — the
  // white-on-transparent treatment below assumes a dark backdrop, so it reads
  // dark from the first frame there even before the background solidifies.
  const dark = solidBg || heroLight

  return (
    <header
      data-transparent={!solidBg ? '' : undefined}
      style={{
        position: 'sticky', top: 0, zIndex: 'var(--z-sticky)',
        background: solidBg ? 'rgba(255,255,255,.9)' : 'transparent',
        backdropFilter: solidBg ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: solidBg ? 'blur(14px)' : 'none',
        boxShadow: solidBg ? '0 1px 0 var(--border)' : 'none',
        transition: 'background 200ms, box-shadow 200ms',
      }}
    >
      <div className="container-wide" style={{
        height: 'var(--nav-h)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href={`${hrefPrefix}#top`} aria-label="ONEXIS — Startseite" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={dark ? '/assets/logo-x.svg' : '/assets/logo-x-negativ.svg'}
            alt="" aria-hidden="true" style={{ height: 24 }} />
        </a>

        <nav className="nav-desktop" aria-label="Hauptnavigation">
          {c.links.map(l => (
            <a key={l.href} href={`${hrefPrefix}${l.href}`} className="nav-link" style={{
              fontSize: 14, color: dark ? 'var(--fg)' : 'var(--fg-on-dark)',
              fontWeight: 500, textDecoration: 'none',
            }}>{l.label}</a>
          ))}
          <a href={`${hrefPrefix}#kontakt`} className={`btn ${dark ? 'btn-dark' : 'btn-ghost-inverse'}`}
            style={{ padding: '10px 18px' }}>
            {c.cta}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          /* Only reference the panel while it exists — it is conditionally
             rendered, and a dangling aria-controls is worse than none. */
          aria-controls={open ? 'mobile-nav' : undefined}
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          onClick={() => (open ? close() : setOpen(true))}
          style={{ color: dark ? 'var(--fg)' : 'var(--fg-on-dark)' }}
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
        <nav id="mobile-nav" ref={panelRef} className="nav-panel" aria-label="Hauptnavigation">
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
