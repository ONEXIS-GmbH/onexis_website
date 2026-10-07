// Strukturierte Daten (schema.org JSON-LD), pro Route aus dem Seiteninhalt
// erzeugt. Früher stand das als statischer Block in index.html und lief
// mehrfach hinter den Leistungen her (alte Säulennamen, tote Anker). Jetzt
// leitet es sich aus de.js ab: ändert sich eine Leistung dort, stimmt auch das
// Markup — ohne Handarbeit.
//
// Wird nur von scripts/prerender.mjs benutzt (String-Injektion ins HTML beim
// Build), nicht zur Laufzeit im Browser.
import CONTENT from './de.js'
import { SITE_URL, OG_IMAGE, ORGANIZATION, DEFAULT_DESCRIPTION, routeMeta } from './meta.js'

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`
const FOUNDER_ID = `${SITE_URL}/#stefan-buettler`

// Gründer und Geschäftsführer = erstes Teammitglied mit hinterlegtem LinkedIn.
const founder = CONTENT.team.members[0]

const pillars = CONTENT.leistungen.pillars

function organization() {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/logo.png`,
    image: OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    address: { '@type': 'PostalAddress', ...ORGANIZATION.address },
    areaServed: { '@type': 'Country', name: 'Schweiz' },
    knowsAbout: [
      'IT-Beratung',
      'IT-Architektur',
      'Enterprise-Architektur',
      'Projektmanagement',
      'Programmmanagement',
      'PMO',
      'Target Operating Model',
      'Data & KI',
      'IT-Governance',
      'Transformation & Change',
      'Europäische Datensouveränität',
      'Personalverleih',
    ],
    // Öffentliche Profile derselben Firma — eine Quelle: de.js contact.linkedin
    sameAs: [CONTENT.contact.linkedin],
    founder: { '@id': FOUNDER_ID },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: pillars.map((p) => ({
        '@type': 'OfferCatalog',
        name: p.name,
        description: p.intro,
        url: `${SITE_URL}/leistungen#${p.id}`,
        itemListElement: p.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.body,
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'Schweiz' },
          },
        })),
      })),
    },
  }
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: ORGANIZATION.name,
    url: `${SITE_URL}/`,
    inLanguage: 'de-CH',
    publisher: { '@id': ORG_ID },
  }
}

function person() {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: founder.name,
    jobTitle: founder.title,
    image: `${SITE_URL}${founder.img}`,
    worksFor: { '@id': ORG_ID },
    ...(founder.linkedin ? { sameAs: [founder.linkedin] } : {}),
  }
}

function webPage(path) {
  const meta = routeMeta(path)
  return {
    '@type': 'WebPage',
    '@id': meta.url,
    url: meta.url,
    name: meta.title,
    description: meta.description,
    inLanguage: 'de-CH',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
  }
}

function breadcrumb(path) {
  if (path === '/') return null
  const meta = routeMeta(path)
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: meta.title.split(' – ')[0].split(' — ')[0], item: meta.url },
    ],
  }
}

/** JSON-LD-Graph für eine Route, bereits als HTML-sicherer String. */
export function schemaJsonLd(path) {
  const graph = [website(), webPage(path)]
  // Organisation, Gründer-Person und Leistungskatalog hängen am Wurzelknoten
  // der Site; auf jeder Seite wiederholt, damit auch ein Crawler, der nur eine
  // Unterseite sieht, die Firma vollständig zuordnen kann.
  graph.unshift(organization(), person())
  const crumbs = breadcrumb(path)
  if (crumbs) graph.push(crumbs)

  // '<' escapen: ein "</script>" im Text darf den Block nicht beenden.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)
    .replaceAll('<', '\\u003c')
}
