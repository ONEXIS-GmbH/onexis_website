// LinkedIn-Glyphe als Inline-SVG: ein einzelnes Icon rechtfertigt keine
// Abhängigkeit, und inline bleibt es theme-fähig (currentColor).
function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 9.4h5.16V21H2.4V9.4Zm7.74 0h4.95v1.59h.07c.69-1.24 2.37-2.05 4.06-2.05 4.34 0 5.14 2.72 5.14 6.25V21h-5.16v-5.02c0-1.2-.02-2.74-1.73-2.74-1.74 0-2.006 1.31-2.006 2.66V21h-5.15V9.4Z" />
    </svg>
  )
}

export default LinkedInIcon
