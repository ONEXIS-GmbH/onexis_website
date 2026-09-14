const CONTENT = {
  nav: {
    links: [
      {
        href: '#leistungen',
        label: 'Leistungen',
      },
      {
        href: '#referenzen',
        label: 'Referenzen',
      },
      {
        href: '#team',
        label: 'Team',
      },
    ],
    cta: 'Kontakt',
  },
  hero: {
    partnerPrefix: 'Ihr Partner für',
    rotatingWords: ['IT-Beratung', 'Projektmanagement', 'IT-Architektur', 'Seminare'],
    title:
      'IT-Architektur, die trägt. Projekte, die ankommen. Modernisierung, die voranbringt.',
    subtitle:
      'Wir übersetzen herausfordernde IT-Strategien in funktionierende Realität.',
    ctaPrimary: 'Leistungen ansehen',
    ctaSecondary: 'Gespräch vereinbaren',
  },
  promises: {
    eyebrow: 'Was uns auszeichnet',
    heading: ['Wir stehen für', 'Vertrauen und Expertise.'],
    intro:
      'Mit bewährtem Projektmanagement, zukunftsfähiger Architektur und intelligentem KI-Einsatz zum messbaren Vorsprung.',
    columns: [
      {
        n: '1',
        label: 'Was wir tun',
        points: [
          'Wir führen Sie sicher zu Ihrer modernen IT-Ziel-Architektur. Von der Konzeption bis zur Realisierung verbinden wir erstklassiges Architektur-Design mit zielgerichtetem Projektmanagement.',
        ],
      },
      {
        n: '2',
        label: 'Wie wir arbeiten',
        points: [
          'Aus zahlreichen Architektur-Herausforderungen mit Infra, Daten, Apps und Enterprise Architekturen – gestützt auf über 30 erfolgreich umgesetzte Projekte – wissen wir, worauf es ankommt. Wir agieren methodisch strukturiert und pragmatisch im Vorgehen, bleiben fokussiert im Handeln und arbeiten stets partnerschaftlich mit Ihnen zusammen, für echten Erfolg.',
        ],
      },
      {
        n: '3',
        label: 'Warum wir',
        points: [
          'Komplexe Vorhaben, kritische Infrastrukturen und höchste Security-Anforderungen verlangen nach mehr als Standardlösungen. Mit fundierter Erfahrung aus Projekten im zweistelligen Millionenbereich designen wir kompromisslose Architekturen – und setzen sie als erfahrene Projektleiter erfolgreich um.',
        ],
      },
    ],
  },
  // Leistungen: Single Source of Truth für den Startseiten-Teaser
  // (Services.jsx) UND die Übersichtsseite /leistungen (LeistungenPage.jsx).
  // Struktur: 3 Säulen → Services. `items` = Leaf-Themen aus dem Board;
  // sie sind erfasst, werden aktuell aber nicht gerendert (Q3: Name + Satz).
  leistungen: {
    // -- Startseiten-Teaser (#leistungen) --------------------
    teaser: {
      eyebrow: 'Leistungen',
      heading: ['IT-Beratung, die Weichen stellt.', 'Architektur, die trägt. Management, das liefert.'],
      intro:
        'Analyse, Umsetzung, Befähigung: End-to-End für Ihren Vorsprung.',
      cta: 'Alle Leistungen ansehen',
      href: '/leistungen',
      // Feste Startseiten-Karten (Chef-Feedback 20260913) — bewusst NICHT
      // aus `pillars` unten abgeleitet: andere Namen, anderer Zuschnitt.
      // /leistungen selbst bleibt auf der Assess&Design/Execute&Deliver/
      // Empower-Struktur.
      cards: [
        {
          name: 'IT-Beratung',
          lead: 'Strategie, die Richtung gibt.',
          body: 'Wir analysieren Ihre Ausgangslage, schärfen Ihre IT-Roadmap und legen das Fundament für zukunftsfähige Entscheidungen.',
        },
        {
          name: 'IT-Architektur',
          lead: 'Strukturen, die tragen.',
          body: 'Wir designen skalierbare, sichere und performante Systemlandschaften, die perfekt auf Ihre Geschäftsprozesse abgestimmt sind.',
        },
        {
          name: 'Projektmanagement',
          lead: 'Umsetzung, die ankommt.',
          body: 'Wir steuern Ihre IT-Projekte transparent, effizient und termingerecht – von der Konzeption bis zum erfolgreichen Go-Live.',
        },
      ],
    },
    // -- Übersichtsseite /leistungen -------------------------
    hero: {
      eyebrow: 'Leistungen',
      title: 'Projects in Motion',
      subtitle:
        'Von der Analyse über die Umsetzung bis zur Befähigung - unser Leistungsspektrum entlang Ihrer IT-Wertschöpfung.',
    },
    contact: {
      text: 'Nicht sicher, welche Leistung zu Ihrem Vorhaben passt?',
      button: 'Erstgespräch vereinbaren',
      href: '/#kontakt',
    },
    pillars: [
      {
        id: 'assess-design',
        name: 'Assess & Design',
        tagline: 'Standortbestimmung und Zielbild - bevor investiert wird.',
        intro:
          'Wir klären, wo Ihre IT steht und wohin sie soll - mit belastbaren Assessments und einem Zielbild, auf das sich investieren lässt.',
        services: [
          {
            name: 'IT Orga',
            body: 'Service-Orientierung, Zielmodelle und IT-Strategie - die Organisation, die Ihre Vorhaben trägt.',
            items: ['Service-Orientierung', 'Zielmodelle', 'IT-Strategie'],
          },
          {
            name: 'IT Prozess & Daten',
            body: 'Prozesse und Datenhaushalt, die verlässlich liefern - von ITIL bis Data Governance.',
            items: [
              'IT-Service Management',
              'ITIL',
              'Business Process Automation - Konzept',
              'Data Governance',
              'Data Management',
            ],
          },
          {
            name: 'IT Arch. & Technologie',
            body: 'Architektur, die das nächste Vorhaben trägt - und die fünf danach.',
            items: [
              'Tech-Radar',
              'Blueprints (Integration, Daten, Application, Cloud)',
              'Enterprise Architekturen',
              'Architektur-Disziplinen',
              'Architektur-Assessments & Zielbild',
            ],
          },
          {
            name: 'People & Skills',
            body: 'Die richtigen Profile, gezielt aufgebaut - Zielprofile, Hiring und Change.',
            items: ['Zielprofile', 'Up-Skilling & Hiring', 'Transformation & Change Management'],
          },
        ],
      },
      {
        id: 'execute-deliver',
        name: 'Execute & Deliver',
        tagline: 'Umsetzung mit ruhiger Hand, sauber in den Betrieb übergeben.',
        intro:
          'Wir führen Vorhaben ins Ziel - mit Steuerung, die trägt, und einer Übergabe, die den Betrieb nicht überrascht.',
        services: [
          {
            name: 'Projekt & Programm Management',
            body: 'Von der Vorstudie bis zur Betriebsübergabe - klassisch, agil oder hybrid.',
            items: [
              'Health-Check & Reviews',
              'Projekt-Rettung',
              'Projekt/Programm-Leitung',
              'Strategie & Blueprint umsetzen',
            ],
          },
          {
            name: 'Projekt Management Office',
            body: 'Steuerung, Reporting, Eskalation - das PMO, das Ordnung ins Portfolio bringt.',
            items: [],
          },
          {
            name: 'Product & Service Ownership',
            body: 'Verantwortung für Produkt und Service - mit klarem Mandat und Übergabe.',
            items: [],
          },
          {
            name: 'Talent-Pool',
            body: 'Senior-Köpfe auf Zeit - a.i.-Positionen, Personalverleih, Dienstleistung.',
            items: ['ad interim - IT-Positionen', 'Personalverleih', 'Dienstleistung basiert'],
          },
          {
            name: 'Architecture as a Service',
            body: 'Flexibles Architektur-Modell on demand - Kompetenz, wenn Sie sie brauchen.',
            items: ['flexibles Architekturmodell - on demand'],
          },
          {
            name: 'Data & AI',
            body: 'Von der Datenanalyse zum produktiven KI-Einsatz - Engineering, Dashboards, Automation.',
            items: ['AI Engineering', 'Datenanalyse', 'Dashboards', 'Business Process Automation'],
          },
          {
            name: 'Product Evaluation',
            body: 'Die richtige Lösung, objektiv gewählt - Market Screening und Empfehlung.',
            items: ['Market Screening', 'Product Recommendation'],
          },
        ],
      },
      {
        id: 'empower',
        name: 'Empower',
        tagline: 'Wissen, das bleibt - befähigen statt Abhängigkeit.',
        intro:
          'Wir bringen Senior-Wissen ins Team und lassen es dort - als Seminar oder als Workshop, der Bewegung erzeugt.',
        services: [
          {
            name: 'Seminare',
            body: 'Resilienz, Leadership, Empowerment - Senior-Wissen als Inhouse-Seminar.',
            items: ['Resilienz', 'Leadership', 'Empowerment'],
          },
          {
            name: 'Workshops',
            body: 'Vom TOM Canvas bis Lego Serious Play - Workshops, die Bewegung bringen.',
            items: ['Lego Serious Play', 'AI Potential & Ideation', 'Process Discovery', 'TOM Canvas'],
          },
        ],
      },
    ],
  },
  tom: {
    eyebrow: 'Unser Erfolgsmodell',
    heading: ['Vier Dimensionen.', 'Ein Target Operating Model.'],
    quadrants: [
      {
        title: 'Organisation & Governance',
        short: 'Organisation',
        sub: 'Struktur, Rollen, Steuerung.',
        body: 'Wer entscheidet, wer berichtet, wer eskaliert? Wir setzen das PMO auf, definieren Rollen und Steuergremien - bis aus einem Projektwust wieder eine geführte Lieferung wird.',
        items: [
          'PMO und Projektorganisation aufsetzen',
          'Steuerung, Reporting, Eskalation',
          'Rollen und Verantwortung klären',
        ],
      },
      {
        title: 'Prozesse & Daten',
        short: 'Prozesse',
        sub: 'Methodik, Lieferung, Qualität.',
        body: 'Klassisch, hybrid oder agil - wir wählen das Vorgehen, das zu Ihrem Vorhaben passt, und bauen die Quality Gates ein, die Sie schlafen lassen.',
        items: [
          'Projektmethodik - klassisch, hybrid, agil',
          'Daten- und Prozess-Health-Checks',
          'Betriebsübergabe und Run-Modell',
        ],
      },
      {
        title: 'People & Skills',
        short: 'People',
        sub: 'Menschen, Wissen, Befähigung.',
        body: 'Interim-Mandat, CIO-Sparring, Inhouse-Seminar - wir bringen Senior-Köpfe ins Team und transferieren Wissen, statt Abhängigkeit aufzubauen.',
        items: ['Interim-Management', 'Sparring für CIOs und IT-Leitung', 'Seminare und Inhouse-Trainings'],
      },
      {
        title: 'Infrastruktur & Technologie',
        short: 'Technologie',
        sub: 'Architektur, Stack, Integration.',
        body: 'Vom Enterprise-Zielbild bis zur Plattform-Wahl: wir bauen Architekturen, die nicht nur das nächste Vorhaben tragen, sondern die fünf danach.',
        items: [
          'Enterprise- und Applikationsarchitektur',
          'Zielbild und Plattform-Strategie',
          'Vendor- und Tech-Stack-Reviews',
        ],
      },
    ],
  },
  vorgehen: {
    eyebrow: 'Vorgehen',
    heading: ['Fünf Schritte -', 'transparent vom ersten Tag.'],
    steps: [
      {
        n: '01',
        title: 'Aufnahme',
        body: 'Erstanalyse: Zielbild, Stakeholder, Status, Risiken.',
      },
      {
        n: '02',
        title: 'Diagnose',
        body: 'Lage entlang der TOM-Dimensionen, mit klaren Hypothesen.',
      },
      {
        n: '03',
        title: 'Mandat',
        body: 'Rolle, Befugnisse und Erfolgskriterien verschriftlicht.',
      },
      {
        n: '04',
        title: 'Lieferung',
        body: 'Iterative Lieferung mit schlankem Reporting.',
      },
      {
        n: '05',
        title: 'Übergabe',
        body: 'Sauberer Hand-over an Linie oder internes Team.',
      },
    ],
  },
  cases: {
    eyebrow: 'Use Cases',
    items: [
      {
        headline: 'Erweiterte Digitalstrategie & jährlicher Review',
        metric: { v: '90 Tage', l: 'zur Umsetzung' },
        lead: 'Strategische Klarheit, die nachhaltig trägt.',
        body: 'Für einen Kunden haben wir den Weg von der Bestandsaufnahme bis zur fertigen Roadmap erfolgreich gestaltet:',
        bullets: [
          '**Stakeholder-Integration:** Gezielte Interviews mit den wichtigsten Entscheidungsträgern zur Erfassung aller Anforderungen.',
          '**Ist-Architektur & Datenflüsse:** Lückenlose und transparente Dokumentation der bestehenden Systemlandschaft.',
          '**Ziel-Design & Roadmap:** Konzeption der neuen Architektur, aufgeteilt in klare, umsetzbare Arbeitspakete (Work Packages).',
          '**Kontinuierliche Ausrichtung:** Etablierung eines festen jährlichen Review-Zyklus, der die Strategie dauerhaft auf Kurs hält und wo nötig adaptiert.',
        ],
      },
      {
        headline: 'Integrationsplattform für kritische Infrastrukturen',
        metric: { v: '300 Tage', l: 'bis zum Go-Live' },
        lead: 'Höchste Sicherheit und Konsolidierung für systemrelevante Landschaften.',
        body: 'Als Gesamt-Projektleiter mit unseren spezialisierten Architekten verantworteten wir den kompletten Lebenszyklus – vom ersten Design bis zur schlüsselfertigen Übergabe an den Betrieb:',
        bullets: [
          '**Harmonisierung:** Erfolgreiche Zusammenführung von drei separaten Integrationsplattformen in ein einziges, sauberes Ziel-Design.',
          '**Security by Design:** Konsequente Verankerung strengster Cyber-Security-Anforderungen direkt im Fundament der Architektur.',
          '**Zukunftsfähige Technologie:** Erfolgreiche Evaluation und Implementierung des optimalen Produkts für einen modernen, eventbasierten Data-Streaming-Ansatz.',
        ],
      },
      {
        headline: 'RPA-Einführung im Energiebereich',
        metric: { v: '120 Tage', l: 'bis zur Übergabe' },
        lead: 'Prozessautomatisierung mit messbarem Business-Nutzen.',
        body: 'Für ein Energieunternehmen haben wir eine Robotic Process Automation (RPA)-Lösung für den Corporate-Services-Bereich konzipiert und erfolgreich realisiert:',
        bullets: [
          '**Potenzialanalyse:** Identifikation und smarte Priorisierung von Automatisierungschancen mittels interaktiver Process Discovery Workshops.',
          '**Technologie & Ressourcen:** Gesamtleitung für den Aufbau der gesamten technologischen Infrastruktur und erfolgreiche Steuerung der Projektressourcen.',
          '**End-to-End-Projektleitung:** Komplette Begleitung der Umsetzung bis zum punktgenauen und erfolgreichen Go-Live.',
        ],
      },
    ],
  },
  references: {
    eyebrow: 'Referenzen',
    heading: ['Unternehmen,', 'die auf uns zählen.'],
    // w/h = Originalmasse der Datei. Nur damit der Browser das Seitenverhältnis
    // kennt, bevor das (lazy geladene) Logo da ist — sonst springt das Raster.
    clients: [
      { name: 'Swissgrid', logo: '/referenzen/sg_logo_standard_rgb_100mm.png', w: 1182, h: 288, url: 'https://www.swissgrid.ch' },
      { name: 'Repower', logo: '/referenzen/repower_RGB.jpg', w: 1181, h: 213, url: 'https://www.repower.ch' },
      { name: 'Alpiq', logo: '/referenzen/Alpiq_intec_logo.png', w: 1654, h: 791, scale: 1.3, url: 'https://www.alpiq.com' },
      { name: 'AEW', logo: '/referenzen/Logo_der_AEW_Energie_AG.png', w: 2011, h: 1394, scale: 1.5, url: 'https://www.aew.ch' },
      { name: 'Immobilien Aargau' },
      { name: 'etuna', logo: '/referenzen/kommpakt_stiftung_etuna.png', w: 439, h: 182, url: 'https://www.etuna.ch' },
    ],
  },
  sectors: {
    eyebrow: 'Branchen',
    heading: 'Breit aufgestellt.',
    items: [
      'Dienstleistungsbereiche',
      'Energie',
      'IT Service Providers',
      'Öffentliche Verwaltung',
      'Versicherungen',
    ],
  },
  team: {
    eyebrow: 'Team',
    heading: ['Ein Team aus', 'Professionals.'],
    body: 'Unser Rezept: ziel- und lösungsorientiert, klar, strukturiert und pragmatisch.',
    members: [
      {
        name: 'Stefan Büttler',
        title: 'Gründer und Geschäftsführer',
        img: '/team/stefan-buettler.jpg',
        email: 'stefan.buettler@onexis.ch',
      },
      {
        name: 'Gabriel Wey',
        title: 'Projektleiter',
        img: '/team/gabriel-wey.jpg',
        email: 'gabriel.wey@onexis.ch',
      },
      {
        name: 'Nico Clerici',
        title: 'Junior Data Engineer',
        img: '/team/nico-clerici.jpg',
        email: 'nico.clerici@onexis.ch',
      },
    ],
  },
  contact: {
    eyebrow: 'Kontakt',
    heading: 'Sprechen wir.',
    intro: 'Schnell und unkompliziert zum Erstgespräch. Wir hören zu und sagen Ihnen ehrlich, ob wir die Richtigen sind.',
    companyName: 'ONEXIS GmbH',
    street: 'Sissacherstrasse 20',
    city: '4460 Gelterkinden',
    phone: '061 556 10 10',
    phoneHref: 'tel:+41615561010',
    // Kontaktformular wurde entfernt (Chef-Feedback 20260913) — stattdessen
    // direkter Mail-Kontakt zu Stefan.
    contactPerson: 'Stefan Büttler',
    contactEmail: 'stefan.buettler@onexis.ch',
    contactEmailHref: 'mailto:stefan.buettler@onexis.ch',
  },
  footer: {
    tagline: 'Ihr Partner für IT-Beratung, Projekt-Management, IT-Architektur & Seminare.',
    addressTitle: 'Adresse',
    company: 'ONEXIS GmbH',
    street: 'Sissacherstrasse 20',
    city: '4460 Gelterkinden',
    phone: '061 556 10 10',
    legalTitle: 'Rechtliches',
    legalLinks: [
      {
        label: 'Impressum',
        href: '/impressum',
      },
      {
        label: 'Datenschutz',
        href: '/datenschutz',
      },
      {
        label: 'AGB',
        href: '/agb',
      },
    ],
    copyright: '© 2026 ONEXIS GmbH',
    slogan: 'Projects in Motion',
  },
  legal: {
    impressum: {
      eyebrow: 'Rechtliches',
      title: 'Impressum',
      blocks: [
        {
          heading: 'Firmenname',
          body: [
            'ONEXIS GmbH',
            'UID-Nr. CHE-288.852.078',
            'MWST Nr. CHE-288.852.078 MWST',
          ],
        },
        {
          heading: 'Adresse',
          body: [
            'Sissacherstrasse 20',
            '4460 Gelterkinden',
            'Schweiz',
          ],
        },
        {
          heading: 'Telefon',
          body: ['+41 61 556 10 10'],
        },
        {
          heading: 'E-Mail',
          body: ['info@onexis.ch'],
        },
        {
          heading: 'Geschäftsführung',
          body: [
            'Stefan Büttler',
            'stefan.buettler@onexis.ch',
          ],
        },
      ],
      footnote: 'Alle Angaben ohne Gewähr. Änderungen vorbehalten.',
    },
    datenschutz: {
      eyebrow: 'Rechtliches',
      title: 'Datenschutz',
      blocks: [
        {
          heading: 'Datenschutzerklärung',
          body: [
            'Diese Datenschutzerklärung informiert, wofür, wie und wo welche Personendaten bearbeitet werden sowie welche Rechte Personen haben, deren Daten bearbeitet werden.',
          ],
        },
        {
          heading: 'Kontaktadresse für Fragen zur Datenschutzerklärung und zur Datenbearbeitung',
          body: [
            'Stefan Büttler',
            'ONEXIS GmbH',
            'Sissacherstrasse 20',
            'CH-4460 Gelterkinden',
            'stefan.buettler@onexis.ch',
          ],
        },
        {
          heading: 'Begriffe',
          body: [
            'Betroffene Person: Natürliche Person, über die wir Personendaten bearbeiten.',
            'Personendaten: Alle Angaben, die sich auf eine bestimmte oder bestimmbare natürliche Person beziehen.',
            'Besonders schützenswerte Personendaten: Daten über gewerkschaftliche, politische, religiöse oder weltanschauliche Ansichten und Tätigkeiten, Daten über die Gesundheit, die Intimsphäre oder die Zugehörigkeit zu einer Ethnie oder Rasse, genetische Daten, biometrische Daten, die eine natürliche Person eindeutig identifizieren, Daten über straf- und verwaltungsrechtliche Sanktionen oder Verfolgungen, und Daten über Massnahmen der sozialen Hilfe.',
            'Bearbeiten: Jeder Umgang mit Personendaten, unabhängig von den angewandten Mitteln und Verfahren, beispielsweise das Abfragen, Abgleichen, Anpassen, Archivieren, Aufbewahren, Auslesen, Bekanntgeben, Beschaffen, Erfassen, Erheben, Löschen, Offenlegen, Ordnen, Organisieren, Speichern, Verändern, Verbreiten, Verknüpfen, Vernichten und Verwenden von Personendaten.',
          ],
        },
        {
          heading: 'Rechtsgrundlagen',
          body: [
            'Wir bearbeiten Personendaten im Einklang mit dem schweizerischen Datenschutzrecht wie insbesondere dem Bundesgesetz über den Datenschutz (Datenschutzgesetz, DSG) und der Verordnung über den Datenschutz (Datenschutzverordnung, DSV).',
          ],
        },
        {
          heading: 'Art, Umfang und Zweck der Bearbeitung von Personendaten',
          body: [
            'Wir bearbeiten jene Personendaten, die erforderlich sind, um unsere Aktivitäten und Tätigkeiten dauerhaft, menschenfreundlich, sicher und zuverlässig ausüben zu können. Die bearbeiteten Personendaten können insbesondere in die Kategorien von Browser- und Gerätedaten, Inhaltsdaten, Kommunikationsdaten, Metadaten, Nutzungsdaten, Stammdaten einschliesslich Bestandes- und Kontaktdaten, Standortdaten, Transaktionsdaten, Vertragsdaten und Zahlungsdaten fallen.',
          ],
        },
        {
          heading: 'Bekanntgabe von Personendaten',
          body: [
            'Wir können Personendaten an Dritte bekanntgeben, durch Dritte bearbeiten lassen oder gemeinsam mit Dritten bearbeiten. Bei solchen Dritten handelt es sich insbesondere um spezialisierte Anbieter, deren Leistungen wir in Anspruch nehmen.',
          ],
        },
        {
          heading: 'Kommunikation',
          body: [
            'Wir bearbeiten Personendaten, um mit einzelnen Personen sowie mit Behörden, Organisationen und Unternehmen kommunizieren zu können. Dabei bearbeiten wir insbesondere Daten, die uns eine betroffene Person bei der Kontaktaufnahme übermittelt, beispielsweise per Briefpost oder E-Mail.',
          ],
        },
        {
          heading: 'Datensicherheit',
          body: [
            'Wir treffen geeignete technische und organisatorische Massnahmen, um eine dem jeweiligen Risiko angemessene Datensicherheit zu gewährleisten. Mit unseren Massnahmen gewährleisten wir insbesondere die Vertraulichkeit, Verfügbarkeit, Nachvollziehbarkeit und Integrität der bearbeiteten Personendaten.',
          ],
        },
        {
          heading: 'Rechte von betroffenen Personen',
          body: [
            'Wir gewähren betroffenen Personen sämtliche Ansprüche gemäss dem anwendbaren Datenschutzrecht. Betroffene Personen verfügen insbesondere über folgende Rechte:',
            'Auskunft: Betroffene Personen können Auskunft verlangen, ob wir Personendaten über sie bearbeiten.',
            'Berichtigung und Einschränkung: Betroffene Personen können unrichtige Personendaten berichtigen lassen.',
            'Löschung und Widerspruch: Betroffene Personen können Personendaten löschen lassen («Recht auf Vergessen»).',
            'Datenherausgabe und Datenübertragung: Betroffene Personen können die Herausgabe von Personendaten verlangen.',
          ],
        },
        {
          heading: 'Nutzung der ONEXIS Website',
          body: [
            'Cookies: Wir können Cookies verwenden. Bei Cookies – eigenen Cookies (First-Party-Cookies) als auch Cookies von Dritten, deren Dienste wir nutzen (Third-Party-Cookies) – handelt es sich um Daten, die im Browser gespeichert werden.',
            'Protokollierung: Wir können für jeden Zugriff auf unsere Website mindestens folgende Angaben protokollieren: Datum und Zeit, IP-Adresse, Zugriffsstatus, Betriebssystem, Browser, aufgerufene Seite und übertragene Datenmenge.',
          ],
        },
        {
          heading: 'Social Media',
          body: [
            'Wir sind auf Social Media-Plattformen präsent, um mit interessierten Personen kommunizieren sowie über unsere Aktivitäten informieren zu können. Es gelten jeweils auch die Bestimmungen der einzelnen Plattformen.',
          ],
        },
        {
          heading: 'Dienste von Dritten',
          body: [
            'Wir nutzen Dienste von spezialisierten Dritten, um unsere Aktivitäten dauerhaft, sicher und zuverlässig ausüben zu können. Wir nutzen insbesondere:',
            'Dienste von Google: Google LLC (USA) / Google Ireland Limited (Irland)',
            'Dienste von Microsoft: Microsoft Ireland Operations Limited (Irland) / Microsoft Corporation (USA)',
            'Diese Datenschutzerklärung kann jederzeit aktualisiert werden. Aktualisierungen werden in geeigneter Form, insbesondere durch die Veröffentlichung der jeweils aktuellen Datenschutzerklärung, auf dieser Website mitgeteilt.',
          ],
        },
      ],
    },
    agb: {
      eyebrow: 'Rechtliches',
      title: 'AGB',
      blocks: [
        {
          heading: 'Unser Service-Portfolio',
          body: [
            'IT Beratung',
            'IT Projekt Management',
            'IT Architektur',
            'Leadership- und Resilienz-Trainings',
          ],
        },
        {
          heading: 'Vertragsabschluss',
          body: [
            'Ein Vertrag kommt dann zustande, wenn das Angebot von ONEXIS schriftlich oder elektronisch bestätigt wurde.',
          ],
        },
        {
          heading: 'Anwendung der AGB’s',
          body: [
            'Sofern nichts anderes vereinbart wird, gelten jeweils die AGB der ONEXIS GmbH. Ergänzende Bedingungen oder die AGB’s eines Auftraggebers gelten nur bei ausdrücklicher schriftlicher Anerkennung.',
          ],
        },
        {
          heading: 'Partner und Subunternehmner',
          body: [
            'Subunternehmer und Partner können zur Leistungserbringung eingesetzt werden.',
          ],
        },
        {
          heading: 'Preise und Zahlungen',
          body: [
            'Als Standardwährung gilt Schweizerfranken (CHF). Bei internationalen Verträgen kann die Währung des Firmensitzes vom Auftraggeber zum Einsatz kommen.',
            'Genannte Beträge in Angeboten gelten jeweils exklusive Mehrwertsteuer.',
            'Zahlungsziel sind 30 Tage',
            'Verzugszins 5 % p.a.',
          ],
        },
        {
          heading: 'Kündigungsrecht',
          body: [
            'Verträge sind, wenn nicht anders vereinbart, jederzeit kündbar. Bis dahin geleistete Stunden sind durch den Auftraggeber zu begleichen.',
          ],
        },
        {
          heading: 'Haftung & Gewährleistung',
          body: [
            'Eine Haftung ist nur bei grober Fahrlässigkeit oder Vorsatz gegeben. Es gilt keine Haftung für indirekte Schäden oder entgangenen Gewinn.',
          ],
        },
        {
          heading: 'Urheberrecht',
          body: [
            'Alle Materialien, Präsentationen und Softwarelösungen sind urheberrechtlich geschützt. Eine Weitergabe ohne schriftliche Zustimmung ist nicht erlaubt.',
          ],
        },
        {
          heading: 'Datenschutz',
          body: [
            'Die Datenverarbeitung erfolgt gemäss Schweizer DSG und EU-DSGVO. Details sind der Datenschutzerklärung zu entnehmen.',
          ],
        },
        {
          heading: 'Anwendbares Recht',
          body: [
            'Es gilt ausschliesslich Schweizer Recht.',
          ],
        },
        {
          heading: 'Gerichtsstand',
          body: [
            'Gerichtsstand ist der Sitz der ONEXIS GmbH in CH-4460 Gelterkinden.',
          ],
        },
        {
          heading: 'Salvatorische Klausel',
          body: [
            'Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Die unwirksame Bestimmung wird durch eine solche ersetzt, die dem wirtschaftlichen Zweck am nächsten kommt.',
          ],
        },
      ],
      footnote: 'Alle Angaben erfolgen ohne Gewähr. Änderungen vorbehalten.',
    },
  },
}

export default CONTENT
