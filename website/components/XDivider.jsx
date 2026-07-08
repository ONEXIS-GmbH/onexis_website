import { useEffect, useRef } from 'react'

/* The two curves of the ONEXIS "X" (from logo-x.svg).
   P_DARK is the anthracite stroke, P_TEAL the accent one. */
const P_DARK =
  'M103.71913,90.51967c-3.875-2.96582-7.79492-6.01074-11.65625-9.00977l-4.95312-3.84277c-2.40918-1.90723-4.8916-3.80762-7.29199-5.64551-3.55078-2.7168-7.22168-5.52637-10.65039-8.34961-6.8584-5.75098-10.41895-11.45703-10.29785-16.50098l.02734-1.16113h-13.26367l-.02734,1.10645c-.22363,9.30957,4.70703,18.06055,15.08301,26.75977,3.66602,3.01758,7.42676,5.89746,11.06445,8.68164,2.35059,1.79883,4.78125,3.65918,7.1748,5.55371l4.99707,3.87695c3.88477,3.01855,7.83008,6.08203,11.80957,9.12793,10.25781,7.60742,15.55859,14.69336,15.33008,20.49219l-.04688,1.17871h13.26172l.04297-1.08887c.5459-13.84766-11.50586-24.43262-20.60352-31.17871Z'
const P_TEAL =
  'M124.25722,46.0099h-13.26465l.02734,1.16113c.12012,5.04492-3.42676,10.73926-10.25098,16.46094-3.48535,2.86914-7.14453,5.66992-10.68457,8.37891-2.28906,1.75195-4.88379,3.73828-7.25,5.6123l-5.08984,3.95117c-3.83496,2.97754-7.72559,5.99902-11.49512,8.88477-9.13965,6.7793-21.22754,17.39355-20.68359,31.24316l.04297,1.08887,13.26172-.00391-.04688-1.17871c-.22754-5.79883,5.0957-12.90234,15.41016-20.55273,3.90918-2.99316,7.86523-6.06445,11.75977-9.08984l5.02344-3.89844c2.27246-1.7998,4.57617-3.56445,7.01562-5.43164l.12793-.09863c3.63379-2.78125,7.39258-5.6582,11.08691-8.69922,10.34082-8.67188,15.25879-17.41309,15.03613-26.72168l-.02637-1.10645Z'

/**
 * Recurring "X" thread ornament between sections.
 * Draws itself (stroke) then fills in when scrolled into view.
 */
export default function XDivider() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const paths = el.querySelectorAll('.x-stroke')

    // prime each path with its own length so the outline can "draw"
    paths.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = String(len)
      p.style.strokeDashoffset = reduce ? '0' : String(len)
    })

    if (reduce) {
      el.classList.add('is-in')
      return
    }

    const reveal = () => {
      el.classList.add('is-in')
      paths.forEach((p) => { p.style.strokeDashoffset = '0' })
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal()
            io.disconnect()
          }
        })
      },
      { threshold: 0.7 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="x-divider" ref={ref} role="presentation" aria-hidden="true">
      <span className="x-divider-rule" />
      <svg
        className="x-divider-mark"
        viewBox="0 0 170.17128 168.88503"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="x-stroke x-dark" d={P_DARK} vectorEffect="non-scaling-stroke" />
        <path className="x-stroke x-teal" d={P_TEAL} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="x-divider-rule" />
    </div>
  )
}
