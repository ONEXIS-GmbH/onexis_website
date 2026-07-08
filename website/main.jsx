import { createRoot } from 'react-dom/client'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Promises from './components/Promises.jsx'
import TOMSection from './components/TOMSection.jsx'
import Vorgehen from './components/Vorgehen.jsx'
import Cases from './components/Cases.jsx'
import Sectors from './components/Sectors.jsx'
import Team from './components/Team.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import XDivider from './components/XDivider.jsx'
import './styles/tokens.css'
import './styles/site.css'

function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Promises />
        <XDivider />
        <TOMSection />
        <XDivider />
        <Vorgehen />
        <XDivider />
        <Cases />
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

createRoot(document.getElementById('app')).render(<App />)
