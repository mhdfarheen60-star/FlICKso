# FLICKso Production — cinematic brochure website

A premium, single-page brochure site for **FLICKso Production**, built to translate the
nine-page FLICKso brochure into an immersive digital experience.

The whole site lives on one scrolling page with anchored navigation:

| Section | Anchor |
| --- | --- |
| Home / cinematic hero | `#home` |
| Who We Are | `#about` |
| Services | `#services` |
| Videography & Editing | `#videography` |
| Graphic Designing | `#graphic-design` |
| Script Writing | `#script-writing` |
| Digital Marketing | `#digital-marketing` |
| Packages | `#packages` |
| Contact Information | `#contact` |
| Thank You | `#thank-you` |

Navigation links, the hero CTA and the closing CTA all scroll smoothly to their target.

## Design system

- Background: `#020B18` / secondary `#061629` / ambient teal `#003B42`
- Accents: cyan `#00C8FF`, neon green `#00E878`, emerald `#00B889`
- Text: white headings, cool gray body `#C7D3DF`, secondary blue `#087CB8`
- Signature gradient: `linear-gradient(110deg, #00C8FF 0%, #00E878 100%)`
- Headings: Oswald, uppercase and condensed
- Body and navigation: Inter
- Frames: rounded 24–28px glass panels with a 1px cyan-to-green gradient border and
  restrained cyan/green glow
- Motion: slow cinematic image zoom, subtle parallax, one-time scroll reveals, card
  hover lift and gradient button micro-interactions. All non-essential motion is
  disabled under `prefers-reduced-motion`.

## Stack

- React 18 + TypeScript 5.6
- Vite 7
- Tailwind CSS 3.4
- lucide-react icons
- No animation library and no runtime image/CDN dependency — motion is CSS plus small
  IntersectionObserver/scroll hooks.

## Quick start

Requires Node 20.19+ or 22.12+.

```bash
# from the repository root
npm run setup      # install frontend dependencies
npm run dev        # http://localhost:5173
```

From `frontend/` the equivalent commands are `npm install` and `npm run dev`.

| Root script | What it does |
| --- | --- |
| `npm run setup` | Install frontend dependencies |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck, then build to `frontend/dist` |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript check only |

## Project structure

```text
frontend/
  public/
    images/
      hero-studio.jpg              hero studio plate
      about-crew.jpg               behind-the-scenes crew
      service-videography.jpg
      service-graphic-design.jpg
      service-script-writing.jpg
      service-digital-marketing.jpg
      contact-handshake.jpg
      footer-camera.jpg            closing camera plate
      design-posters.svg           custom poster artwork mockup
      design-carousel.svg          custom carousel artwork mockup
    favicon.svg
  src/
    App.tsx                        single-page composition
    index.css                      design tokens, glass frames, reveals, reduced motion
    main.tsx                       React entry point
    components/
      common/
        Reveal.tsx                 one-time scroll reveal
        SectionHeading.tsx         eyebrow + condensed heading + gradient rule
      layout/
        Header.tsx                 sticky nav, active section, mobile menu
        Logo.tsx
      sections/
        HeroSection.tsx
        AboutSection.tsx
        ServicesSection.tsx
        ServiceSection.tsx
        PackagesSection.tsx
        PackageCard.tsx
        ContactSection.tsx
        ThankYouSection.tsx
    data/
      brochure.ts                  all brochure copy, packages, contacts and nav
    hooks/
      useActiveSection.ts
      useLockBodyScroll.ts
      useParallax.ts
      useScrolled.ts
    lib/cn.ts
  tailwind.config.js
```

`frontend/legacy-src/` holds the earlier multi-page implementation. It is outside the
TypeScript/Vite source root, is not compiled or shipped, and is kept only as a
reference. It can be deleted once the new site is signed off. That archive still uses
`react-router-dom`, which is no longer a dependency of the live site — reinstall it
only if you restore the old pages.

## Editing content

All brochure content lives in **`src/data/brochure.ts`**:

- `SERVICES` — the four services, exact descriptions, exact service lists and image paths.
- `SOCIAL_PACKAGES` — Basic, Standard, Growth and Pro counts.
- `CONTACTS` — the two brochure contacts and their `tel:` values.
- `NAV_LINKS` — section navigation.

Package counts are intentionally exact and must not drift:

| Plan | Creatives | Videos | Static posters |
| --- | --- | --- | --- |
| Basic | 10 | 5 | 5 |
| Standard | 15 | 7 | 8 |
| Growth | 20 | 10 | 10 |
| Pro | 25 | 12 | 13 |

The brochure does not publish prices, so the site says **“Custom pricing based on
requirements.”** Production pricing is shown as **“Depends on Script.”** Do not add
invented prices, emails, social handles, addresses or WhatsApp links. The only contact
details published are the two phone numbers supplied in the brochure, and both use
clickable `tel:` links.

## Imagery

The workspace did not include the original brochure or FLICKso photography, so the site
uses local royalty-free Pexels photographs as **replaceable placeholders**:

| File | Pexels photo ID |
| --- | --- |
| `hero-studio.jpg` | 34516668 |
| `about-crew.jpg` | 8799984 |
| `service-videography.jpg` | 31158828 |
| `service-graphic-design.jpg` | 1714202 |
| `service-script-writing.jpg` | 8085932 |
| `service-digital-marketing.jpg` | 12969403 |
| `contact-handshake.jpg` | 8470843 |
| `footer-camera.jpg` | 34516677 |

The poster and carousel mockups are custom SVGs built in the FLICKso palette. Replace the
placeholder photography with owned FLICKso production stills when available, keeping the
same filenames (or updating the paths in `brochure.ts`). Landscape images work best;
background plates are cropped with `object-fit: cover`.

Images below the fold are lazy-loaded, the hero is preloaded with high fetch priority,
and intrinsic dimensions are declared to limit layout shift. Social previews currently
point at `/images/hero-studio.jpg`; switch this to an absolute 1200×630 URL once the
production domain is known.

## Accessibility and QA

Verified with headless Chrome (Playwright) and axe-core against the production build:

- Zero axe-core violations at desktop (1440px) and mobile (390px).
- No horizontal overflow at 360, 390, 768, 1024, 1440 or 1920px.
- All images load; no console errors, page errors or failed requests.
- Every navigation anchor lands at the 88px sticky-header offset and updates the active
  indicator.
- “Start Your Slide” scrolls to About; “See You Next” returns to the top.
- Mobile menu opens as an accessible dialog, traps focus, closes on Escape, restores
  focus, locks background scroll and closes on navigation.
- `prefers-reduced-motion` removes the cinematic zoom and reveal animation.
- Exact service lists, descriptions, package counts, contact names and phone numbers are
  present in the rendered page.

Re-run the build and type check with:

```bash
npm run build
```

## Deployment

`npm run build` emits a static site to `frontend/dist`.

- Upload `frontend/dist` to any static host.
- Because this is a single page, deep-path rewrites are not required. Configure a normal
  `index.html` fallback anyway if the host serves 404s for unknown paths.
- Update the Open Graph image to an absolute URL on the production domain.
- Replace the placeholder photography before launch.

## Content source of truth

All copy in this build is taken from the supplied FLICKso brochure prompt. No additional
services, package contents, prices, team members, emails, social accounts, addresses or
WhatsApp numbers were invented. The two contacts are:

- **Muhammad Zain** — Founder — `+91 759 394 9225`
- **Nehalul Mashooq** — Co founder — `+91 974 546 8538`
