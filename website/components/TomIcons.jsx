// Icons for the TOM diagram (rendered by TOMSection.jsx), from Tabler Icons
// (https://tabler.io/icons) — MIT licensed, no attribution required.
// Replaces four Microsoft-Office clip-art SVGs that had been copied in as
// placeholders (visible in their source: Office-style transforms, an
// off-brand fill colour #61BDCC vs. the brand's #62BDCC).
//
// Drawn on Tabler's native 24×24 grid at its native stroke-width (2),
// colour-agnostic (stroke="currentColor" — the caller sets `color` on an
// ancestor to drive the active/inactive state). `vectorEffect=
// "non-scaling-stroke"` keeps the line a constant on-screen width
// regardless of how the icon is scaled up in the diagram — the same
// technique XDivider.jsx uses for the X mark's stroke.
function IconShell({ children }) {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    >
      {children}
    </g>
  )
}

// Organisation & Governance — Tabler "sitemap".
function OrganisationIcon() {
  return (
    <IconShell>
      <path d="M3 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M15 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
      <path d="M12 9l0 3" />
    </IconShell>
  )
}

// Prozesse & Daten — Tabler "route": a path with a start and end node,
// exactly what a defined process is.
function ProzesseIcon() {
  return (
    <IconShell>
      <path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" />
      <path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" />
    </IconShell>
  )
}

// People & Skills — Tabler "users".
function PeopleIcon() {
  return (
    <IconShell>
      <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </IconShell>
  )
}

// Infrastruktur & Technologie — Tabler "server-2".
function InfrastrukturIcon() {
  return (
    <IconShell>
      <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2" />
      <path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" />
      <path d="M7 8l0 .01" />
      <path d="M7 16l0 .01" />
      <path d="M11 8h6" />
      <path d="M11 16h6" />
    </IconShell>
  )
}

// Order matches CONTENT.tom.quadrants in content/de.js: Organisation &
// Governance, Prozesse & Daten, People & Skills, Infrastruktur & Technologie.
export const TOM_ICONS = [OrganisationIcon, ProzesseIcon, PeopleIcon, InfrastrukturIcon]
