// Icons für das Vertrauensband auf der Startseite (Services.jsx). Inline-SVG
// im Outline-Stil, currentColor — gleiches Muster wie LinkedInIcon.
const props = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true,
}

const ICONS = {
  // Globus: Europa / Datenhoheit
  globe: (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" />
    </svg>
  ),
  // Schild mit Haken: Datenschutz
  shield: (
    <svg {...props}>
      <path d="M12 3 5 5.8v5.4c0 4.4 2.9 8.2 7 9.8 4.1-1.6 7-5.4 7-9.8V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </svg>
  ),
  // Abzeichen mit Haken: Bewilligung / Lizenz
  badge: (
    <svg {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9.8 9 1.6 1.6L14.4 7.6" />
      <path d="m8.6 13.6-1.4 6.4 4.8-2.6 4.8 2.6-1.4-6.4" />
    </svg>
  ),
}

export default function TrustIcon({ name }) {
  return ICONS[name] ?? null
}
