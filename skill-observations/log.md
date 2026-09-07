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

### Observation 6: Pixel-sampling contrast checks produce false positives on elements with their own background

**Date:** 2026-08-17
**Session context:** `/impeccable audit` of a marketing site whose hero sits on a radial-gradient background; wrote a puppeteer script that hides hero text, screenshots the bare background, and samples pixels under each text bounding box to compute contrast.

**Skill:** impeccable (reference/audit.md)
**Type:** open-source
**Phase/Area:** Dimension 1 (Accessibility) — measuring text contrast over gradients and images

**Issue:** The technique is the only reliable way to measure contrast over a gradient (a DOM walk for `background-color` returns the gradient's fallback solid and understates the problem). But the selector also matched a CTA button that carries its own solid background. Hiding it exposed the *page* background behind it, so the script reported the button's dark label at 1.37:1 — a fabricated P0. Hand-computing the button's real pair (label on its own accent fill) gave 6.92:1, a pass. Separately, sampling the full bounding box and taking the single brightest pixel overstated the real failure; re-measuring per line-box with `Range.getClientRects()` and reporting the *percentage of the line area* below threshold turned a vague "brightest pixel fails" into a precise, defensible finding (12–20% of the subtitle line below 4.5:1, phones only).

**Suggested improvement:** In audit.md's contrast check, add: when measuring contrast over gradients or images by sampling a screenshot with the text hidden, first exclude any element whose own computed `background-color` has alpha > 0 or that has its own `background-image` — those must be measured against their own background, not the page's. And quantify partial failures by line box (`Range.getClientRects()`) plus percent-of-area below threshold, rather than by the single worst pixel in a bounding box.

**Principle:** A measurement technique that changes the scene in order to observe it must be scoped to the cases where the removed thing was not part of the answer. And when a background varies across a text run, the honest unit of measurement is "how much of the text fails", not "does any pixel fail" — the first is actionable, the second is either alarmist or dismissible.

### Observation 7: A downstream guard for a too-greedy selector doesn't travel to the next container

**Date:** 2026-08-17
**Session context:** `/impeccable polish` on a marketing site; the mobile menu's primary CTA rendered dark-on-dark (1.00:1) and read as a blank slab.

**Skill:** impeccable (reference/polish.md, reference/audit.md)
**Type:** open-source
**Phase/Area:** Design System Discovery — "identify drift, then name the root cause"

**Issue:** A container rule recoloured every descendant link (`.nav-panel a { color: var(--fg) }`), which also captured a button that carries its own background — label and fill resolved to the same value. The codebase had already hit this exact bug in a different container months earlier and fixed it *downstream*, with a follow-up rule re-asserting each button's label colour inside that one container. The greedy selector itself was never narrowed, so when a second container with the same shape was added, the bug reappeared and the guard was not there to catch it. The root fix was `a:not(.btn)` on the selector, after which the downstream guard could be deleted entirely.

**Suggested improvement:** In polish.md's drift classification, add a fourth failure shape alongside missing token / one-off implementation / conceptual misalignment: a **compensating rule** — an existing fix that neutralises a symptom downstream instead of correcting the rule that caused it. Flag these on sight: they are evidence the causing rule is still wrong, and they predict a recurrence at the next site with the same shape. The fix is to narrow the original selector and delete the compensator. In audit.md's theming checks, add the concrete detector: any bulk descendant rule that sets `color` on `a` or `button` should be checked for elements that carry their own background.

**Principle:** A compensating rule is a bug report someone wrote in CSS instead of in the tracker. Finding one means the real defect is still upstream and unfixed — and the next instance of that pattern will ship broken, because compensators protect one location while root fixes protect the shape.

### Observation 8: 390px is not the narrow end of the responsive sweep

**Date:** 2026-08-17
**Session context:** `/impeccable audit` reported zero horizontal overflow across 390/768/1024/1440; the follow-up `/impeccable adapt` pass found a 3px overflow at 360px caused by four uppercase tab labels in four equal grid columns.

**Skill:** impeccable (reference/audit.md, reference/adapt.md)
**Type:** open-source
**Phase/Area:** Dimension 4 (Responsive Design) — viewport selection

**Issue:** The audit's viewport set started at 390 (modal iPhone) and reported the responsive dimension as clean. The only layout defect on the entire site lived at 360 — the common Android floor, and the width where a fixed-column grid of long words finally runs out of room. Reporting "no overflow at any tested width" was accurate about what was tested and misleading about the site, because the set omitted the width most likely to fail. adapt.md's own reference text says to test 320px; the audit flow did not inherit that.

**Suggested improvement:** In audit.md's responsive checks, specify the minimum sweep explicitly: 320, 360, 390, 768, 1024, 1440. Call out *why* the narrow end matters — 360 is the Android floor and 320 the historical iPhone SE — so the set is not trimmed to "the phone I picture". When reporting the responsive dimension, state the widths tested in the finding itself, so a clean result is legible as scoped rather than absolute.

**Principle:** A sweep that omits the extreme reports the absence of evidence as evidence of absence. Breakpoint bugs live at the edges by construction, so a viewport set that starts at the comfortable case is testing where failure is least likely — and any clean result must name its own range to stay honest.
