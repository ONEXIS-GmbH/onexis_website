import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
const errs = []
page.on('pageerror', e => errs.push(String(e)))
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' })
// scroll through to trigger dividers
await page.evaluate(async () => {
  await new Promise((done) => {
    let y = 0
    const step = () => { y += 500; window.scrollTo(0, y); if (y < document.documentElement.scrollHeight) setTimeout(step, 50); else done() }
    step()
  })
})
await new Promise(r => setTimeout(r, 800))
// divider between Promises and Services
await page.evaluate(() => document.getElementById('leistungen').scrollIntoView({ behavior: 'instant', block: 'start' }))
await page.evaluate(() => window.scrollBy(0, -260))
await new Promise(r => setTimeout(r, 700))
await page.screenshot({ path: '/tmp/onexis-shots/divider-promises-services.png' })
// divider around references/sectors
await page.evaluate(() => document.getElementById('referenzen').scrollIntoView({ behavior: 'instant', block: 'start' }))
await page.evaluate(() => window.scrollBy(0, -160))
await new Promise(r => setTimeout(r, 700))
await page.screenshot({ path: '/tmp/onexis-shots/divider-references.png' })
const count = await page.evaluate(() => document.querySelectorAll('.x-divider').length)
console.log('dividers:', count, '| pageerrors:', errs.length)
await browser.close()
