import CONTENT from '../content/de.js'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

// Übersichtsseite /leistungen: pro Säule links der Kopf (Nummer, Name, Intro,
// auf dem Desktop sticky), rechts eine Liste der Leistungen (Name + Einzeiler)
// mit Hairlines statt Kartenraster. Darunter das Band "So arbeiten wir
// zusammen" und der Abschluss-CTA.
// Die sr-only-h1 trägt das eigentliche Seitenthema (CONTENT.leistungen.pageTitle);
// alle Säulen-Überschriften sind h2, die Leistungen h3.
function LeistungenPage() {
  const { pageTitle, jumpLabel, pillars, collaboration, contact } = CONTENT.leistungen

  return (
    <>
      <Nav hrefPrefix="/" heroLight />
      <main id="main-content">
        <h1 className="sr-only">{pageTitle}</h1>

        {/* Sprungleiste — erste Sektion, trägt gleichzeitig den Abstand zur Nav */}
        <nav className="lp-jump" aria-label={jumpLabel}>
          <div className="container-wide">
            <ul>
              {pillars.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`}>
                    <span className="mono-label">{p.n}</span> {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {pillars.map((p) => (
          <section
            key={p.id}
            id={p.id}
            className="lp-pillar"
            aria-labelledby={`${p.id}-title`}
          >
            <div className="container-wide lp-split">
              <header className="lp-split-head">
                <span className="mono-label lp-num">{p.n}</span>
                <h2 id={`${p.id}-title`} className="h-section">{p.name}</h2>
                <p className="lp-intro">{p.intro}</p>
              </header>

              <ul className="lp-list">
                {p.services.map((s) => (
                  <li key={s.name}>
                    <h3 className="h-card">{s.name}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Zusammenarbeit */}
        <section className="section muted lp-collab" aria-labelledby="zusammenarbeit-title">
          <div className="container-wide">
            <h2 id="zusammenarbeit-title" className="eyebrow">{collaboration.heading}</h2>
            <ul className="lp-collab-grid">
              {collaboration.models.map((m) => (
                <li key={m.name}>
                  <h3 className="h-card">{m.name}</h3>
                  <p>{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Abschluss-CTA */}
        <section className="section section-sm inverse">
          <div className="container-wide" style={{
            display: 'flex', flexWrap: 'wrap', gap: 24,
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <h2 className="h-card" style={{ maxWidth: 520, fontWeight: 400 }}>
              {contact.text}
            </h2>
            <a href={contact.href} className="btn btn-primary">
              {contact.button}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LeistungenPage
