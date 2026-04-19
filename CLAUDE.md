@AGENTS.md

# Covenant Charge — Brand Guidelines

## Business
- **Name:** Covenant Charge
- **Domain:** covenantcharge.com
- **Tagline:** EV Fast Charging for Faith Institutions
- **One-liner:** Covenant Charge helps churches, schools, and ministries generate passive revenue through EV fast charging — at no cost and with full transparency.

## Brand Voice & Tone
- **Trustworthy** — we are a steward, not a vendor. Language should feel like a long-term partner, not a sales pitch.
- **Ecumenical** — never single-denomination. Use "community" not "congregation," "faith institution" not "church" (unless listing churches alongside others).
- **Plain-spoken** — avoid jargon. Institutions are busy; say what you mean clearly.
- **Not preachy** — the mission aligns with values, but we don't moralize. Let the facts speak.

## What to Avoid
- Single-denomination language (e.g., "your pastor", "your congregation", "your parish" alone)
- Speculative revenue claims presented as fact — always say "projected" or "estimated"
- Exclusivity or ideological framing — this is about transparency and choice, not ideology
- Corporate buzzwords that erode trust (e.g., "synergy", "leverage", "disrupt")

## Color Palette
| Name           | Hex       | Usage                                              |
|----------------|-----------|----------------------------------------------------|
| Covenant Blue  | #1B4F72   | Primary — headings, nav, trust anchors             |
| Renewal Green  | #27AE60   | Accent — CTAs, lightning bolt, success states      |
| Covenant Gold  | #D4AC0D   | Highlight — use sparingly. Banners, step numbers.  |
| Cream          | #F9F3DC   | Warm section backgrounds, cards                    |
| Light          | #F7F9FC   | Default page background                            |
| Dark           | #1A202C   | Body text                                          |
| Muted          | #64748B   | Secondary text, captions                           |
| Navy           | #0F2D45   | Footer background, deep contrast surfaces          |

**Rule:** Never use off-brand colors. All colors must come from this palette.

## Typography
- **Lora** (serif, Google Fonts) — all headings (h1–h6). Loaded via `next/font/google` as `--font-lora`, available as `font-serif` Tailwind class.
- **Inter** (sans-serif, Google Fonts) — body, UI, forms, navigation. Loaded as `--font-inter`, available as `font-sans` Tailwind class.

**Rule:** Never use Geist, system fonts, or other typefaces in brand-facing UI.

## Logo — Final (locked)
- **Mark:** Enclosed C — 270° arc with refined thin stroke (strokeWidth=3) + green lightning bolt inside. viewBox 0 0 40 40 (square).
  - SVG path: `M 32 8 A 17 17 0 1 0 32 32`
  - Bolt: `M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z`
- **Files:**
  - `public/logo-mark.svg` — mark only (favicons, small contexts)
  - `public/logo.svg` — full logo with wordmark (OG images, etc.)
  - `public/logo-white.svg` — white mark for dark backgrounds
- **Component:** `components/ui/LogoMark.tsx` — always use this in UI. Props: `variant="color"|"white"`, `size="sm"|"md"|"lg"`, `showWordmark`.
- **Wordmark:**
  - "Covenant" — Lora bold, Covenant Blue, `tracking-tight`
  - "CHARGE" — Inter light, Covenant Green, `tracking-[0.15em]`, always all-caps literal text

## Logo Alignment Rule
- Flex container uses `items-start` — top of mark and top of wordmark always align
- Wordmark div height is set to exactly match the mark's pixel height
- `justify-between` pushes "Covenant" to the top and "CHARGE" to the bottom
- Never use `items-center` or `items-end` on the logo lockup container

## Tech Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (CSS-based config in `app/globals.css` — no `tailwind.config.ts`)
- Supabase (database + auth)
- Vercel (hosting)
- Resend (transactional email)

## Brand Style Guide
Run `npm run dev` and visit `http://localhost:3000/brand` to preview all brand elements live.
