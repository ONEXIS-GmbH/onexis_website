import { createRoot } from 'react-dom/client'
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
import { applyRouteMeta } from './content/meta.js'
import './styles/tokens.css'
import './styles/site.css'

// Rechtsseiten-Routen (Cloudflare-Pages-SPA, siehe public/_redirects).
const LEGAL_ROUTES = {
  '/impressum': 'impressum',
  '/datenschutz': 'datenschutz',
  '/agb': 'agb',
}

function Home() {
  return (
    <>
      <Nav heroLight />
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

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  applyRouteMeta(path)
  if (path === '/leistungen') return <LeistungenPage />
  const legalPage = LEGAL_ROUTES[path]
  return legalPage ? <LegalPage page={legalPage} /> : <Home />
}

createRoot(document.getElementById('app')).render(<App />)
