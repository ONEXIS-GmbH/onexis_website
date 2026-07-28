import { createRoot } from 'react-dom/client'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Promises from './components/Promises.jsx'
import Services from './components/Services.jsx'
import TOMSection from './components/TOMSection.jsx'
import Vorgehen from './components/Vorgehen.jsx'
import Cases from './components/Cases.jsx'
import References from './components/References.jsx'
import Sectors from './components/Sectors.jsx'
import Team from './components/Team.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import XDivider from './components/XDivider.jsx'
import LegalPage from './components/LegalPage.jsx'
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
      <Nav />
      <main id="main-content">
        <Hero />
        <Services />
        <XDivider />
        <Vorgehen />
        <XDivider />
        <TOMSection />
        <XDivider />
        <Promises />
        <XDivider />
        <Cases />
        <XDivider />
        <References />
        <XDivider />
        <Sectors />
        <XDivider />
        <Team />
        <XDivider />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const legalPage = LEGAL_ROUTES[path]
  return legalPage ? <LegalPage page={legalPage} /> : <Home />
}

createRoot(document.getElementById('app')).render(<App />)
