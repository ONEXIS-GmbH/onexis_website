// Cloudflare Pages Function: POST /api/contact
// Nimmt das Kontaktformular entgegen und verschickt es via mailomat.swiss
// (Schweizer Transaktions-E-Mail-Dienst, Datenstandort CH) als E-Mail.
// Benötigt die Env-Variable MAILOMAT_API_TOKEN
// (Cloudflare Pages → Settings → Environment variables).

const MAILOMAT_URL = 'https://api.mailomat.swiss/message'

const TO = { email: 'nico.clerici@onexis.ch', name: 'Nico Clerici' }
// from muss eine in mailomat verifizierte Absender-Domain sein (onexis.ch).
const FROM = { email: 'kontakt@onexis.ch', name: 'ONEXIS Website' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const vorname = (body.vorname || '').trim()
  const nachname = (body.nachname || '').trim()
  const email = (body.email || '').trim()
  const mitteilung = (body.mitteilung || '').trim()
  const honeypot = (body.company || '').trim()

  // Honeypot gefüllt → sehr wahrscheinlich Bot. Still erfolgreich abbrechen.
  if (honeypot) return json({ ok: true })

  // Serverseitige Validierung (spiegelt die Client-Validierung).
  if (!vorname || !nachname || !email || !mitteilung || !EMAIL_RE.test(email)) {
    return json({ error: 'validation' }, 400)
  }

  if (!env.MAILOMAT_API_TOKEN) {
    return json({ error: 'not_configured' }, 500)
  }

  const fullName = `${vorname} ${nachname}`
  const text =
    `Neue Kontaktanfrage über onexis.ch\n\n` +
    `Name: ${fullName}\n` +
    `E-Mail: ${email}\n\n` +
    `Mitteilung:\n${mitteilung}\n`
  const html =
    `<h2>Neue Kontaktanfrage über onexis.ch</h2>` +
    `<p><strong>Name:</strong> ${escapeHtml(fullName)}<br>` +
    `<strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>` +
    `<p><strong>Mitteilung:</strong></p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(mitteilung)}</p>`

  try {
    const res = await fetch(MAILOMAT_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.MAILOMAT_API_TOKEN}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        replyTo: [{ email, name: fullName }],
        subject: `Neue Kontaktanfrage von ${fullName}`,
        text,
        html,
      }),
    })

    // mailomat antwortet bei Erfolg mit 202 Accepted.
    if (!res.ok) {
      return json({ error: 'send_failed' }, 502)
    }
    return json({ ok: true })
  } catch {
    return json({ error: 'send_failed' }, 502)
  }
}
