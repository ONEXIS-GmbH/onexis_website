// Renders `**...**` spans in a content string as semibold emphasis.
// Shared by Cases.jsx bullets and anywhere else content/de.js marks up a
// term inline instead of splitting it into fields.
export function renderPoint(text) {
  return text.split('**').map((seg, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ fontWeight: 600 }}>{seg}</strong>
      : seg
  )
}
