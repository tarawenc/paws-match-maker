# AACL "Paws in the Park" — 7-Screen Desktop Flow

A clickable desktop prototype of the full registration journey, built as 7 routes with the exact colors and layouts described. All state (preferences, matched dog, ticket details) is held client-side in a shared context — no backend, so the flow can be demoed end to end immediately.

## Design tokens

Added to the global stylesheet as semantic tokens (no hardcoded colors in components):

- Primary Green `#007E46` — CTAs, active steps, accents
- Dark Green `#004D40` — headings, active toggles
- Slate `#475569` — body text
- Light slate border `#CBD5E1`
- Light gray `#E2E8F0` — image/QR placeholders
- Light gray-blue `#F8FAFC` — page backgrounds
- Light Mint `#E6F4F1` — trait chips
- Red `#E53E3E` — Pass action

## Screens

1. `/` — AACL homepage. White header with logo placeholder, gray nav blocks, green-outlined "📍 Region: Cape Town ▼" selector. 16:9 gray hero with centered title/subtitle. Green "View Cape Town Events" CTA → screen 2.
2. `/cape-town` — Regional hub. Facility toggle row (All Cape Town active, dark green fill; Epping Shelter; Bellville Clinic) filtering the grid. Featured hero card: left image placeholder, right "PAWS IN THE PARK 2026", venue subtitle, green "Register & Match with a Dog" → screen 3. Three secondary event cards below.
3. `/register` — 50/50 split. Left: pace preference cards (Casual Walker / Avid Jogger), active = dark green. Right: Full Name, Email, Cell Number fields with slate borders, green "Save & Start Swiping" → screen 4. Basic required-field validation.
4. `/match` — Four-dot step indicator (green = complete). Dark green heading. Swiper stack of dog cards: 60% image placeholder, name/age, breed/energy, mint trait chips. Red Pass and green Match buttons, plus drag/keyboard support with card animation. Matching a dog → screen 5.
5. `/pending` — Centered status box, green-accented spinner, "Reviewing your matches...", explanatory slate text, muted "Return to Homepage" button. Auto-advances to screen 6 after a short delay (also a manual continue link).
6. `/inbox` — Simulated webmail. Gray "Webmail Client" chrome, left inbox list with unread AACL Cape Town email marked by a green left border, right pane with logo, "Great news, Sarah!" (uses the registered name), body copy, green "View Your Match & Ticket" → screen 7.
7. `/ticket` — Header shows green "Match Confirmed!". Dark green celebratory title using the matched dog's name. Ticket card with dashed green border: square dog thumbnail, date/pace/handler details pulled from earlier steps, QR placeholder on the right. Green "Download Ticket / Add to Wallet" button.

## Technical notes

- TanStack Router file routes under `src/routes/`; each gets its own `head()` with unique title/description/og tags.
- A `FlowProvider` context in `__root.tsx` holds name/email/phone, pace, and matched dog; screens 6 and 7 read from it and fall back to sensible defaults if visited directly.
- Dog data is a local array with generated illustrated placeholder-style imagery kept as flat `#E2E8F0` blocks to match the wireframe intent.
- Shared components: `SiteHeader`, `PlaceholderImage`, `StepIndicator`, `TraitChip`, `DogCard`.
- Desktop-first layout as specified; sensible stacking below `md` so it doesn't break on smaller viewports.
