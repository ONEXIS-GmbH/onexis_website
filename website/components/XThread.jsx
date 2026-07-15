import { useEffect, useRef } from 'react'

/* The two curves of the ONEXIS "X" (from logo-x.svg).
   P_DARK is the anthracite stroke, P_TEAL the accent one.
   They are only drawn once — at the "resolve" moment on the TOM section. */
const P_DARK =
  'M103.71913,90.51967c-3.875-2.96582-7.79492-6.01074-11.65625-9.00977l-4.95312-3.84277c-2.40918-1.90723-4.8916-3.80762-7.29199-5.64551-3.55078-2.7168-7.22168-5.52637-10.65039-8.34961-6.8584-5.75098-10.41895-11.45703-10.29785-16.50098l.02734-1.16113h-13.26367l-.02734,1.10645c-.22363,9.30957,4.70703,18.06055,15.08301,26.75977,3.66602,3.01758,7.42676,5.89746,11.06445,8.68164,2.35059,1.79883,4.78125,3.65918,7.1748,5.55371l4.99707,3.87695c3.88477,3.01855,7.83008,6.08203,11.80957,9.12793,10.25781,7.60742,15.55859,14.69336,15.33008,20.49219l-.04688,1.17871h13.26172l.04297-1.08887c.5459-13.84766-11.50586-24.43262-20.60352-31.17871Z'
const P_TEAL =
  'M124.25722,46.0099h-13.26465l.02734,1.16113c.12012,5.04492-3.42676,10.73926-10.25098,16.46094-3.48535,2.86914-7.14453,5.66992-10.68457,8.37891-2.28906,1.75195-4.88379,3.73828-7.25,5.6123l-5.08984,3.95117c-3.83496,2.97754-7.72559,5.99902-11.49512,8.88477-9.13965,6.7793-21.22754,17.39355-20.68359,31.24316l.04297,1.08887,13.26172-.00391-.04688-1.17871c-.22754-5.79883,5.0957-12.90234,15.41016-20.55273,3.90918-2.99316,7.86523-6.06445,11.75977-9.08984l5.02344-3.89844c2.27246-1.7998,4.57617-3.56445,7.01562-5.43164l.12793-.09863c3.63379-2.78125,7.39258-5.6582,11.08691-8.69922,10.34082-8.67188,15.25879-17.41309,15.03613-26.72168l-.02637-1.10645Z'

/* Section whose waypoint blooms into the full X — the method's heart. */
const RESOLVE_ID = 'erfolgsmodell'

/**
 * "Der rote Faden" — a single teal thread that runs the length of the page.
 * It draws itself as you scroll; a live node rides the drawing head; each
 * section is a waypoint that lights up as it's reached; and at the TOM
 * section the thread blooms into the complete ONEXIS X.
 */
export default function XThread() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodesLayer = el.querySelector('.x-thread-nodes')
    const resolve = el.querySelector('.x-thread-resolve')
    const strokes = Array.from(el.querySelectorAll('.x-thread-resolve .x-stroke'))

    // prime the resolve X so its outline can "draw"
    strokes.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = String(len)
      p.style.strokeDashoffset = reduce ? '0' : String(len)
    })

    // discover content sections (skip the hero) → one waypoint each
    const main = document.getElementById('main-content')
    const sections = main
      ? Array.from(main.children).filter(
          (n) => n.tagName === 'SECTION' && n.id !== 'top'
        )
      : []

    // build a waypoint node per section; the resolve section gets no dot
    const waypoints = sections.map((sec) => {
      const isResolve = sec.id === RESOLVE_ID
      let dot = null
      if (!isResolve) {
        dot = document.createElement('span')
        dot.className = 'x-thread-node'
        nodesLayer.appendChild(dot)
      }
      return { sec, dot, isResolve, fraction: 0 }
    })

    const drawResolve = () => {
      resolve.classList.add('is-in')
      strokes.forEach((p) => { p.style.strokeDashoffset = '0' })
    }

    if (reduce) {
      el.style.setProperty('--p', '1')
      el.classList.add('is-static')
      waypoints.forEach((w) => w.dot && w.dot.classList.add('is-passed'))
      drawResolve()
      return
    }

    let resolveShown = false

    const measure = () => {
      const scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      const trigger = window.innerHeight * 0.55
      waypoints.forEach((w) => {
        const f = Math.min(1, Math.max(0, (w.sec.offsetTop - trigger) / scrollable))
        w.fraction = f
        if (w.dot) w.dot.style.top = f * 100 + '%'
        if (w.isResolve) resolve.style.top = f * 100 + '%'
      })
    }

    let ticking = false
    const update = () => {
      ticking = false
      const scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      const p = Math.min(1, Math.max(0, window.scrollY / scrollable))
      el.style.setProperty('--p', String(p))
      waypoints.forEach((w) => {
        const passed = p >= w.fraction - 0.0005
        if (w.dot) w.dot.classList.toggle('is-passed', passed)
        if (w.isResolve && passed && !resolveShown) {
          resolveShown = true
          drawResolve()
        }
      })
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    const onResize = () => { measure(); update() }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onResize)
    // re-measure once fonts/images have settled the layout
    const settle = setTimeout(onResize, 600)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onResize)
      clearTimeout(settle)
    }
  }, [])

  return (
    <div className="x-thread" ref={ref} role="presentation" aria-hidden="true">
      <span className="x-thread-track" />
      <span className="x-thread-draw" />
      <div className="x-thread-nodes" />
      <svg
        className="x-thread-resolve"
        viewBox="0 0 170.17128 168.88503"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="x-stroke x-dark" d={P_DARK} vectorEffect="non-scaling-stroke" />
        <path className="x-stroke x-teal" d={P_TEAL} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="x-thread-head" />
    </div>
  )
}
