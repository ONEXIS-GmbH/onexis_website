import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * A single word that cycles through `words` with a soft mask/slide swap.
 * - Zero layout shift: invisible "ghost" copies of every word size the slot
 *   to the widest term, so the surrounding line never reflows.
 * - Accessible: purely decorative here (aria-hidden); the parent line carries
 *   a stable, full sr-only phrase.
 * - Respects prefers-reduced-motion: no cycling, first word shown statically.
 */
export default function RotatingWord({ words, interval = 2600 }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('in') // 'in' | 'out'
  const [paused, setPaused] = useState(false)
  // State, not a ref: a ref read at render time would start `false` under
  // SSR/prerendering and could flip to `true` on a reduced-motion client's
  // first client render — a hydration mismatch. State also means a later
  // `change` on the media query (sync below) actually triggers a re-render,
  // which the previous ref-only version silently didn't.
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    if (!Array.isArray(words) || words.length < 2) return
    const mq = window.matchMedia(QUERY)
    const sync = () => setReduce(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)

    // Pause while the tab is in the background: an unwatched setInterval
    // burning renders is pure waste, and it comes back mid-cycle otherwise.
    const onVisibility = () => setPaused(document.hidden)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      mq.removeEventListener?.('change', sync)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [words])

  useEffect(() => {
    if (!Array.isArray(words) || words.length < 2) return
    if (paused) return

    let swapTimer
    const cycle = setInterval(() => {
      if (reduce) return
      setPhase('out')
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setPhase('in')
      }, 300) // must match rot-word-out duration
    }, interval)

    return () => {
      clearInterval(cycle)
      clearTimeout(swapTimer)
    }
  }, [words, interval, paused, reduce])

  return (
    // Hovering or focusing the line holds the current word. The rotation is
    // decorative, but it is still moving content the visitor must be able to
    // stop (WCAG 2.2.2) — and a word that swaps mid-read is just irritating.
    <span
      className="rotator-slot"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(document.hidden)}
    >
      {words.map((w) => (
        <span key={w} className="rotator-ghost" aria-hidden="true">{w}</span>
      ))}
      <span
        className={reduce ? 'rotator-word' : `rotator-word ${phase}`}
        aria-hidden="true"
      >
        {words[index]}
      </span>
    </span>
  )
}
