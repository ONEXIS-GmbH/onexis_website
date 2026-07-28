# Skill Observation Log

Observations captured during task-oriented work. Each entry identifies a
potential skill improvement or new skill opportunity.

**Status key:** OPEN = not yet actioned | ACTIONED = skill updated/created | DECLINED = user decided not to pursue

---

### Observation 1: Headless Chrome --window-size clamps to a ~500px minimum, faking horizontal overflow

**Date:** 2026-06-24
**Session context:** /impeccable adapt on the ONEXIS landing page — validating mobile responsiveness via `chrome --headless=new --screenshot`.
**Skill:** impeccable
**Type:** open-source
**Phase/Area:** Verification / battle-testing (the "every component is battle tested using browser screenshotting" guidance in SKILL.md and the adapt flow's "Testing" step).

**Issue:** Screenshots taken with `--headless=new --window-size=390,H` rendered the page at an actual innerWidth of 500px (Chrome clamps the window to a ~500px minimum) but wrote the PNG at 390px wide — cropping the right 110px. This looked exactly like page-level horizontal overflow (nav hamburger, hero subtitle, and CTA buttons all "clipped" at the same right edge), and led to a false diagnosis + an unnecessary chase for an overflow source. A temporary in-page probe (`innerWidth` vs `documentElement.scrollWidth`) revealed `inner=500 scrollW=500` — no overflow at all. `--force-device-scale-factor=2` did NOT shrink the layout viewport (it only changed DPR), so it's not a workaround for sub-500 widths either.

**Suggested improvement:** In the audit/adapt verification guidance, add a note: when battle-testing responsive layouts via headless Chrome CLI `--screenshot`, the layout viewport has a ~500px floor and the PNG can be cropped narrower than the render, which mimics horizontal overflow. To test true phone widths (≤430px) or to confirm overflow, drive Chrome via the DevTools Protocol / Playwright / Puppeteer with `Emulation.setDeviceMetricsOverride` (or `page.setViewport`), and confirm overflow by comparing `scrollWidth` to `innerWidth` rather than trusting a cropped screenshot.

**Principle:** A screenshot is evidence of what the tool rendered, not proof of what the layout is. When a visual check disagrees with the code, verify the measurement apparatus (viewport width, crop, DPR) before trusting the pixels — measure the DOM (`scrollWidth`/`innerWidth`) to separate a real layout bug from a capture artifact.

### Observation 2: Chef-Feedback-PDF → Website-Umsetzung als wiederkehrender Workflow

**Status:** OPEN
**Date:** 2026-07-15
**Session context:** Umsetzung von Website-Änderungen aus einem Feedback-PDF des Chefs (Logo, Hero, Sektionen umbauen)
**Skill:** New skill candidate: onexis-content-update
**Type:** internal
**Phase/Area:** Gesamter Workflow

**Issue:** Der Chef liefert Änderungswünsche als PDF mit Screenshots und Prosa. Der Workflow war: PDF visuell lesen → Änderungen als nummerierte Liste bestätigen → Link-URLs aus PDF-Binary extrahieren (`/URI`-Regex, da Hyperlinks im Textextrakt fehlen) → alte Live-Seite (onexis.ch) für Quelltexte fetchen → Rückfragen bündeln (AskUserQuestion, inkl. Fragen die der Chef explizit an Nico weiterreicht) → de.js + Komponenten ändern. Chef kündigt weitere Textrunden an; der Workflow wird sich wiederholen.

**Suggested improvement:** Internen Skill anlegen, der diesen Ablauf kodifiziert: PDF-Zusammenfassung zur Bestätigung, URL-Extraktion aus PDF-Annotations, Schweizer Orthografie (ss statt ß) beim Übernehmen von Chef-Texten, Haus-Stil in de.js (Spiegelstrich " - " statt Gedankenstrich), Texte primär in website/content/de.js.

**Principle:** Wiederkehrende Stakeholder-Feedback-Formate (PDF mit Screenshots) verdienen einen eigenen Aufnahme-Workflow: erst vollständige Extraktion inkl. versteckter Metadaten (Links), dann Bestätigung, dann Umsetzung.

### Observation 3: WebFetch summarises instead of returning verbatim text

**Date:** 2026-07-28
**Session context:** Adding Impressum/Datenschutz/AGB pages, task explicitly required "Text 1:1" from live URLs
**Skill:** All skills / General workflow
**Type:** open-source
**Phase/Area:** Content extraction from web sources

**Issue:** The task required copying legal text verbatim (1:1) from three live URLs. WebFetch runs fetched pages through a small summarising model, so its output was a paraphrased summary, not verbatim text — unusable for a 1:1 requirement. Verbatim text was only obtained by fetching raw HTML via curl and stripping tags with a small Python one-liner.

**Suggested improvement:** When a task requires verbatim/exact text (legal pages, quotes, "1:1", copy-paste fidelity), do NOT rely on WebFetch. Use a raw fetch (curl/wget) + HTML-to-text strip instead, or explicitly instruct WebFetch to return raw content and verify it wasn't summarised.

**Principle:** Match the extraction tool to the fidelity requirement. Summarising fetchers are fine for "understand this page" but wrong for "reproduce this page exactly." Detect the fidelity requirement from words like "1:1", "verbatim", "wörtlich", "exact", "copy".

### Observation 4: Sticky-nav anchor-occlusion audit must account for target's own top padding

**Date:** 2026-07-28
**Session context:** /impeccable audit of an Onexis section; flagged "sticky nav hides anchor targets (no scroll-margin-top)" as P2
**Skill:** impeccable (reference/audit.md)
**Type:** open-source
**Phase/Area:** Accessibility dimension — sticky-header anchor navigation

**Issue:** Audit flagged missing scroll-margin-top as a P2 occlusion bug. On verification (puppeteer), the anchored sections each have 128px top padding, so the heading already lands well below the 72px sticky nav — the heading was never actually occluded. The scroll-margin fix is a minor polish (section bg edge sits 16px below the nav) rather than a real bugfix, so the P2 severity was overstated.

**Suggested improvement:** In audit.md's a11y checks, when flagging sticky-header anchor occlusion, first check the target section's own padding-top / leading offset. If padding-top already exceeds the sticky header height, downgrade to P3 polish (or drop). Verify occlusion with a rendered measurement (heading top vs nav bottom) before assigning severity, rather than inferring purely from "no scroll-margin-top found".

**Principle:** Severity must reflect observed user impact, not the mere absence of a best-practice property. A missing property that is already compensated elsewhere in the layout is polish, not a defect — measure before you rank.

### Observation 5: Reserving header height must bottom-align the text, or the rule detaches

**Date:** 2026-07-28
**Session context:** Fixing misaligned column-title underlines in a 3-column services grid
**Skill:** impeccable (reference/layout.md, reference/typeset.md)
**Type:** open-source
**Phase/Area:** Aligning bottom-border rules across grid columns of unequal title length

**Issue:** To keep underline rules aligned across columns when one title may wrap to two lines, I reserved a 2-line min-height on the heading. With the default top-aligned text, single-line titles then had their underline floating ~27px below the title — the rule looked detached from its own title. Switching the heading to a flex column with justify-content:flex-end (bottom-align) kept the rule hugging the title while preserving cross-column alignment; the reserved slack became invisible whitespace above the row.

**Suggested improvement:** In layout/typeset guidance on aligning bottom-border rules or baselines across grid columns of unequal content, note: reserving min-height alone aligns the rules but can detach them from short content. Pair the reservation with bottom-alignment (flex column + justify-content:flex-end, or align-content:end) so the rule stays attached and the slack collects as neutral whitespace on the opposite side.

**Principle:** When you reserve space to force alignment, also decide where the slack goes. Put it where it reads as intentional whitespace, not between an element and the rule/label that belongs to it.
