// Rendert public/assets/og-image.png (1200x630) aus den echten Markenassets.
// Nur auszuführen, wenn sich Wortmarke, Claim oder Hero-Verlauf ändern:
//   npm run og
//
// Kein Build-Schritt: das Bild ändert sich selten, und ein eingecheckter PNG
// hält den Deploy frei von einer Chrome-Abhängigkeit.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Pfade relativ zum Projektstamm, egal von wo aufgerufen.
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'))

const EXEC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const logo = fs.readFileSync('public/assets/logo-negativ.svg', 'base64')
const xmark = fs.readFileSync('public/assets/logo-x-negativ.svg', 'base64')

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { margin: 0 }
  * { box-sizing: border-box; margin: 0 }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    font-family: "Avenir Next","Segoe UI",system-ui,-apple-system,"Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #fff;
    background:
      radial-gradient(62% 78% at 76% 50%,
        color-mix(in srgb, #62BDCC 42%, transparent) 0%,
        color-mix(in srgb, #62BDCC 9%, transparent) 44%,
        transparent 68%),
      #3C3C3C;
  }
  .x { position: absolute; right: -3%; top: 50%; transform: translateY(-50%); width: 430px; opacity: .5; }
  /* flex-start, sonst dehnt das <img> auf volle Breite und die Wortmarke
     zentriert sich in ihrer eigenen Box statt links am Fliesstext zu sitzen. */
  .inner { position: relative; padding: 92px 96px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
  .logo { height: 74px; width: auto; margin-left: -20px; }
  .claim { margin-top: 46px; font-size: 42px; font-weight: 400; line-height: 1.14; letter-spacing: -0.03em; max-width: 660px; }
  .sub { margin-top: 26px; font-size: 21px; font-weight: 300; line-height: 1.45; color: #CECECE; max-width: 680px; white-space: nowrap; }
  .rule { margin-top: 40px; width: 96px; height: 2px; background: #62BDCC; }
</style></head><body>
  <img class="x" src="data:image/svg+xml;base64,${xmark}">
  <div class="inner">
    <img class="logo" src="data:image/svg+xml;base64,${logo}">
    <div class="claim">Ihre IT-Architektur durchdacht,<br>Ihre Projekte sicher realisiert.</div>
    <div class="rule"></div>
    <div class="sub">IT-Beratung · Projektmanagement · IT-Architektur · Seminare</div>
  </div>
</body></html>`

const browser = await puppeteer.launch({ executablePath: EXEC, headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 400))
await page.screenshot({ path: 'public/assets/og-image.png', clip: { x: 0, y: 0, width: 1200, height: 630 } })
await browser.close()
console.log('wrote public/assets/og-image.png')
