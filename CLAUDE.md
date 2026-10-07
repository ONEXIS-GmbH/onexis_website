# ONEXIS Website: Hinweise für Claude

Alle Website-Texte stehen in `website/content/de.js`. Farben und Fonts (`website/styles/tokens.css`) sind Corporate Design und werden nicht geändert.

## SEO & Metadaten: nach JEDER inhaltlichen Änderung prüfen

Die Seite soll bei Google und bei KI-Suchen (ChatGPT, Perplexity, Claude) leicht gefunden werden.
Die Metadaten sind teils von Hand gepflegt und veralten leicht, sie sind schon einmal falsch geworden
(alte Säulennamen, tote Anker). **Nach jeder Änderung unten prüfen, ob etwas nachgezogen werden muss, und es dann direkt mit anpassen.**
Im Zweifel kurz in der Antwort nennen, was angepasst wurde.

### Wann prüfen (Auslöser)
- Leistungen, Säulen oder Services geändert (`leistungen.pillars`, Namen, Anker-IDs)
- Hero-Titel, Claim oder rotierende Wörter (`hero.*`)
- Neue, umbenannte oder gelöschte Seite/Route
- Kontaktdaten, Adresse, Team/Geschäftsführung, LinkedIn-Links
- Referenzen, Branchenfokus oder Positionierung (Texte wie „Ihr Partner für …“)

### Wo es steht (Checkliste)
| Was | Datei | Hinweis |
|---|---|---|
| Titel + Description pro Seite | `website/content/meta.js` (`ROUTE_META`, `DEFAULT_DESCRIPTION`) | Titel ≈ 60 Zeichen, Description ≤ 160, Suchbegriffe vorne |
| Firmendaten (Adresse, Telefon, E-Mail) | `website/content/meta.js` (`ORGANIZATION`) | Für das Schema.org-Markup |
| LinkedIn-Firmenseite | `website/content/de.js` (`contact.linkedin`) | Einzige Quelle: Kontakt, Footer und `sameAs` im Schema |
| Schema.org / JSON-LD | `website/content/schema.js` | Wird beim Build aus `de.js` erzeugt (Leistungskatalog, Gründer, Breadcrumb). `knowsAbout` bei neuen Themen ergänzen |
| Statischer Head-Fallback | `website/index.html` | description / og / twitter / title müssen zu `meta.js` passen (LinkedIn und Slack lesen dieses HTML) |
| KI-Zusammenfassung | `website/public/llms.txt` | Säulen, Leistungen, Seiten, Kontakt |
| Social-Vorschaubild | `website/scripts/make-og-image.mjs`, danach `npm run og` | Unterzeile und Claim; Bild ansehen, danach `public/assets/og-image.png` committen |
| Sitemap | `website/scripts/prerender.mjs` (wird aus `ROUTE_META` erzeugt) | Neue Route in `ROUTE_META` UND `PRIORITY` eintragen |
| Crawler-Regeln | `website/public/robots.txt` | Alle Crawler inkl. KI sind bewusst erlaubt, nur mit Absprache ändern |

Konsistenz-Regeln:
- Seitentitel und H1 enthalten die Kernbegriffe (IT-Beratung, IT-Architektur, Projektmanagement, Data & KI).
- Die Namen der Säulen und Leistungen sind überall gleich (Seite, `llms.txt`, Schema). Das Schema leitet sich ab, `llms.txt` und `index.html` sind von Hand zu pflegen.
- Keine alten Begriffe stehen lassen: `rg "Assess|Execute|Empower|Seminare" website` vor dem Abschluss ausführen
  (der Treffer „Seminare und Inhouse-Trainings“ im TOM-Abschnitt ist Inhalt und in Ordnung).

### Verifikation (immer ausführen)
```bash
cd website && npm run build
```
Dann in `website/dist/index.html`, `dist/leistungen/index.html` und `dist/404.html` prüfen:
- Titel, Description, `link rel=canonical` und `lang="de-CH"` stimmen
- Genau 1 JSON-LD-Block (nicht auf der 404-Seite), er lässt sich als JSON parsen und enthält alle Leistungen
- `dist/404.html` hat `robots: noindex`, alle anderen `index, follow, …`
- Der Seiteninhalt steht im HTML (die Seiten sind vorgerendert, KI-Crawler führen kein JavaScript aus)

Nach dem Deploy: `curl https://www.onexis.ch/leistungen` und den Google Rich Results Test auf die Live-URL anwenden.

### Nicht im Code lösbar (bei Gelegenheit ansprechen)
- Google Search Console: Domain verifizieren, Sitemap `https://www.onexis.ch/sitemap.xml` einreichen
- Bing Webmaster Tools: aus der Search Console importieren (Bing speist ChatGPT-Suche und Copilot)
- Google Unternehmensprofil für Gelterkinden pflegen (wichtig für lokale Suchen)
- LinkedIn-Firmenseite: Website-URL eintragen; nach Änderung am OG-Bild im LinkedIn Post Inspector neu einlesen
