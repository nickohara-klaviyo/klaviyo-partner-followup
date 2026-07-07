# Build with Klaviyo — Partner Event Follow-up

A mobile-first landing page for partners scanning a QR code at a Shopify-focused
event. It helps attendees self-identify and routes each one to the single most
useful next step — not a wall of docs.

**Live file:** [`index.html`](index.html) — one self-contained file. No build step,
no dependencies. Open it in a browser or host it anywhere (Netlify drop, S3,
GitHub Pages, an internal CDN).

---

## 1. Why one HTML file

For a QR-code landing page used live at a booth, the priorities are: loads
instantly on a phone, works on any host, trivial to update the morning of the
event. A single `index.html` with inline CSS/JS wins on all three. If this grows
into a long-lived property, it can be lifted into a framework later — the content
model (below) is already separated from layout.

## 2. Page structure

```
Hero  ──►  Who are you?  ──►  [path-specific]  ──►  Capture  ──►  Tailored endpoint
(hook)     (4 paths)          (category,           (name +       (1 hero resource
                               Path A only)          email)        + secondary list
                                                                   + handoff)
```

A sticky top bar (brand + Back), a progress bar, and a sticky primary CTA
keep orientation clear without text.

### Lead capture: why it sits near the end
The **first screen is never gated** with a form — that's the friction that kills
completion for a QR-code scan at a booth. Instead, the visitor goes through the
guided journey first (identifies themselves, picks their path/category), and only
*then* — right before the resource handoff — do we ask for name + email. By that
point the ask is justified ("where do we send your tailored guide?"), not a wall.
The step is also skippable, so the content is never truly locked behind it; the
priority is minimizing friction while still capturing useful follow-up info.

## 3. UX flow / decision tree

```
Screen 1 — HERO
   └─ "Get started"
        │
Screen 2 — WHO ARE YOU?
        ├─ A. New to Klaviyo ──► Screen 3: pick category ─┐
        ├─ B. Coming from Shopify ────────────────────────┤
        ├─ C. Existing Klaviyo partner ───────────────────┤
        └─ D. Just exploring ─────────────────────────────┤
                                                          ▼
                                          CAPTURE — name + email
                                          (skippable; not on screen 1)
                                                          │
                                                          ▼
                                          ENDPOINT (path-specific)
                                          hero resource + secondary list

Endpoint handoff:
  • gave email  → "✓ On its way, {first name} — we'll email these to {email}"
                  + "Book time with the partner team"
  • skipped     → "Want a hand getting started?" + "Book time with the partner team"
"Start over" resets to the hero (good for handing the phone to the next person).
```

Branching is intentionally shallow — at most 4 taps to a result.

## 4. Suggested copy (as shipped)

**Hero**
- Eyebrow: `Klaviyo Partner Program`
- Hook: **Already built on Shopify? You're halfway to Klaviyo.**
- Sub: *Build once. Get in front of 200,000+ brands and reach more customers
  through the Klaviyo marketplace.*
- CTA: `Get started →` · micro: *Takes about 30 seconds*

**Who are you?** — *Tell us about yourself*
| Path | Label | Sub-label |
|---|---|---|
| A | New to Klaviyo | I want to build an app or integration |
| B | Coming from Shopify | I've built on Shopify and want to bring it to Klaviyo |
| C | Existing Klaviyo partner | I want to expand what I've already built |
| D | Just exploring | I'm interested but not building yet |

**Capture step** (after path selection, before resources)
- Eyebrow: `Almost there`
- Headline: **Where should we send your guide?**
- Sub: *Leave your name and email and we'll send the resources tailored to your
  path — so you have them after the event.*
- Reasons (why we're asking): *Send the right follow-up resources · Help you with
  your next steps · Tailor support to what you're building*
- Fields: `Name`, `Email` (that's all — keep it lightweight)
- CTA: `Show my resources →` · skip link: `Skip — just show me the resources`
- Alt headline options: *Tell us where to send your tailored guide* ·
  *Leave your name and email so we can help with next steps*

**Endpoint headlines**
- A (category): *Build your {Category} integration* — one guide first, secondary below
- B (Shopify): *Built on Shopify? The hard part's done.* — leads with OAuth setup
- C (Existing): *Expand what you've already built.* — leads with Customer Hub / custom objects
- D (Unsure): *200,000+ brands. One integration.* — leads with the value-prop / proof

## 5. Wireframe (mobile)

```
┌─────────────────────────────┐   ┌─────────────────────────────┐
│ K Klaviyo            ← Back  │   │ K Klaviyo            ← Back  │
│ ▓▓▓▓ ░░░░ ░░░░               │   │ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓               │
│                             │   │  Your build path            │
│ KLAVIYO PARTNER PROGRAM     │   │  Build your Reviews & UGC…  │
│ Already built on Shopify?   │   │  ┌───────────────────────┐  │
│ You're halfway to Klaviyo.  │   │  │ REVIEWS · BUILD GUIDE │  │ ← 1 hero
│ Build once. 200,000+ brands │   │  │ Build a Reviews…      │  │   resource
│ ┌───────────────────────┐   │   │  │ Open guide         →  │  │
│ │  200,000+             │   │   │  └───────────────────────┘  │
│ │  brands you'd reach   │   │   │  NEXT STEPS                 │
│ └───────────────────────┘   │   │  ⭐ Partnership guide    →  │ ← secondary
│ ✓ Familiar from Shopify     │   │  🔐 Set up OAuth         →  │
│ ✓ Guides for your category  │   │  📋 Listing steps        →  │
│ ✓ Get in front of brands    │   │  ┌─ Want a hand? ───────┐  │
│ ┌───────────────────────┐   │   │  │ [email] [Notify me]  │  │ ← follow-up
│ │     Get started →     │   │   │  │ 📅 Book time…        │  │
│ └───────────────────────┘   │   │  └───────────────────────┘  │
└─────────────────────────────┘   └─────────────────────────────┘
        Screen 1 (hero)                  Endpoint (Path A)
```

## 6. Visual direction

- **Mood:** clean, modern, friendly — a lightweight product flow, not a doc dump.
- **Palette:** near-black `#1a1919` (Klaviyo-style primary) on white, warm accent
  `#ff6a3d` for energy and the primary CTA. One accent only — restraint reads as polished.
- **Type:** system font stack (zero load cost), tight tracking on big headlines.
- **Motion:** each screen rises in subtly; CTAs depress on tap. Nothing flashy.
- **Layout:** capped at 480px and centered, so it looks intentional on desktop too.

## 7. Keeping it simple without losing detail

The trick is **hierarchy, not omission**. Each endpoint leads with exactly one
hero resource (the thing they need), then a short secondary list (4–5 items), then
the follow-up CTA. All the depth lives one tap away in the linked guides — the page
never shows 40 links at once.

---

## Content model — how to edit

All copy and links live in the `<script>` block at the top of `index.html`:

- `PATHS` — the 4 options on "Who are you?"
- `CATEGORIES` — Path A categories (each generates its own build-guide endpoint)
- `LINKS` — every URL in one place; swap here to update sitewide
- `PATH_A_SECONDARY` — shared "next steps" for new partners
- `ENDPOINTS` — full content for paths B / C / D
- `guideFor(catId)` — builds the Path A primary guide card per category

Resource shape: `{ icon, title, desc, url }`.

### TODO before the event
- [ ] Replace `LINKS.bookCall` with the real **Nick & Rebecca** booking link.
- [ ] Confirm/deep-link the build-guide URLs per category (currently point to the API overview).
- [ ] Wire the capture step (`submitCapture()`) to a **Klaviyo signup form / list API**.
      The handler already has `{ name, email }` in `lead` plus the chosen `path` /
      `category` in `pendingPayload` — POST all of it so the follow-up flow can be
      tailored to the path they picked.
- [ ] Drop in event-specific branding/eyebrow copy if desired.
```
