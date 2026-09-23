import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Promises from './components/Promises.jsx'
import Services from './components/Services.jsx'
import TOMSection from './components/TOMSection.jsx'
import Cases from './components/Cases.jsx'
import References from './components/References.jsx'
import Team from './components/Team.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import XDivider from './components/XDivider.jsx'
import LegalPage from './components/LegalPage.jsx'
import LeistungenPage from './components/LeistungenPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'

// Gemeinsamer Komponentenbaum für Browser (main.jsx, hydratisiert) und Node
// (entry-server.jsx, renderToString beim Prerendern) — deshalb nimmt diese
// Datei `path` als Prop statt selbst `window.location` zu lesen, und
// importiert kein CSS (das SSR-Bundle bleibt dadurch CSS-frei, siehe
// main.jsx).

/** Entfernt einen trailing Slash; '' wird zu '/'. Client und Prerender
 *  müssen denselben Pfad aus derselben URL ableiten. */
export const normalizePath = (p) => p.replace(/\/+$/, '') || '/'

// Rechtsseiten-Routen (Cloudflare-Pages, siehe scripts/prerender.mjs).
const LEGAL_ROUTES = {
  '/impressum': 'impressum',
  '/datenschutz': 'datenschutz',
  '/agb': 'agb',
}

function Home() {
  return (
    <>
      <Nav heroLight photoLogo />
      <main id="main-content">
        <Hero />
        <Services />
        <XDivider />
        <Promises />
        <XDivider muted/>
        <TOMSection />
        <XDivider muted/>
        <Cases />
        <XDivider />
        <References />
        <XDivider muted />
        <Team />
        <XDivider muted />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App({ path }) {
  if (path === '/leistungen') return <LeistungenPage />
  const legalPage = LEGAL_ROUTES[path]
  if (legalPage) return <LegalPage page={legalPage} />
  if (path === '/') return <Home />
  return <NotFoundPage />
}

export default App
