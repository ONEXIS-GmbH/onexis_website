import { useEffect, useRef, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function reducedNow() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia(QUERY).matches
}

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
  const reduceRef = useRef(reducedNow())

  useEffect(() => {
    if (!Array.isArray(words) || words.length < 2) return
    const mq = window.matchMedia(QUERY)
    const sync = () => { reduceRef.current = mq.matches }
    sync()
    mq.addEventListener?.('change', sync)

    let swapTimer
    const cycle = setInterval(() => {
      if (reduceRef.current) return
      setPhase('out')
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setPhase('in')
      }, 300) // must match rot-word-out duration
    }, interval)

    return () => {
      clearInterval(cycle)
      clearTimeout(swapTimer)
      mq.removeEventListener?.('change', sync)
    }
  }, [words, interval])

  const reduce = reduceRef.current
  return (
    <span className="rotator-slot">
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
