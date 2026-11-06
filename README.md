# KURO DISTRICT

An original, anime-inspired premium streetwear storefront built with React, Vite, React Router, GSAP + ScrollTrigger, Lucide, and custom responsive CSS. Charcoal, warm ivory, and deliberate crimson accents. All artwork is local, original SVG; fonts are self-hosted through Fontsource.

## Run locally

Requires Node.js 22.12+ (Node.js 24 recommended) and npm.

```sh
npm ci
npm run dev
```

Vite prints the development address. Production:

```sh
npm run build
npm run preview
```

Deploy the `dist/` directory to a static host with SPA rewrites. Netlify's `public/_redirects` and `vercel.json` are included. For another host, rewrite non-file routes to `index.html`, so direct product and collection links work. No server secrets belong in a Vite environment variable: `VITE_*` values are public build-time configuration.

## Included experiences

- First-session cinematic intro: illustrated video placeholder, GSAP zoom, four independent staggered vertical curtains, Skip/Escape, opt-in audio for a supplied video, and a reduced-motion fallback. `/intro` and the footer replay it; ordinary navigation does not.
- Home: cinematic hero, latest drop, original campaign, category edits, limited concept capsule, newsletter, and oversized ending-credit footer.
- `/collections`: category/search/sort encoded in the URL, responsive editorial product grid, alternate-image hover, and quick-view dialogs.
- `/products/:slug`: front/back galleries where supplied, color/size selection, illustrative size guide, quantity controls, related products, details and care accordions.
- Persistent variant-aware shopping bag with quantity controls, removal, subtotal, and a **demo checkout preview**.
- `/about`: brand manifesto and chapter-based original visual storytelling.
- `/contact`: validated form with optional delivery endpoint and honest local draft mode.
- Responsive navigation, global collection search, route entrances, scroll reveals/parallax, focus-managed dialogs, keyboard support, and unknown-route/product fallback views.

## Before a commercial launch

This is a working frontend with replaceable sample catalog data. **No live payments, inventory, orders, shipping, tax calculation, account system, or email service are connected.** The demo checkout never asks for a card or claims to place an order. Contact/newsletter without endpoints save locally and explicitly say nothing was delivered/subscribed. These limits are visible in the interface.

1. Replace `src/data/products.js` with your real products, prices, stock rules, sizing, descriptions, and photography. Add images to `public/images/` and reference their paths in each product's `images` array. IDs and slugs should be stable and unique. The catalog is centralized: the administrator can edit data and add images without redesigning pages. There is no authenticated CMS/admin interface.
2. Replace the concept brand name, story, contact details, and social profile placeholders with your business information. Intentionally no fake contact address or social account is linked. Add your own policy and privacy information.
3. Add your licensed intro video using `public/videos/README.md`. SVG city artwork remains the resilient fallback.
4. Connect production services as described below. Payment/order creation and inventory validation must happen on a trusted server. Never treat the browser subtotal or local storage as authoritative.
5. Set actual policies and verify order fulfillment, shipping, taxes, security, and email delivery before accepting purchases.

## Optional form integration

Copy `.env.example` to `.env` and configure public endpoints, then restart/rebuild:

- `VITE_CONTACT_ENDPOINT`: receives JSON `{ "name": "…", "email": "…", "subject": "…", "message": "…" }` by POST.
- `VITE_NEWSLETTER_ENDPOINT`: receives JSON `{ "email": "…" }` by POST.

Endpoints must support same-origin requests or appropriate CORS, validate and rate-limit server-side, and return a 2xx response **only when the request has been accepted**. Any non-2xx/network failure is surfaced without clearing the user's input. Private service credentials stay on the server. With no endpoint configured, forms use clearly labeled local demo storage; no external request is made. Local drafts can contain personal data, so clear browser site data on shared devices.

## Tests

```sh
npx playwright install chromium
npm test
```

For a system Chromium installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chromium`. The config supports `/usr/bin/chromium` in the prepared cloud environment. Tests start Vite automatically when needed and verify routing, catalog operations, products, persistent cart, demo checkout, forms, mobile navigation/layout, and intro/reduced motion. Browser binaries are not bundled in the ZIP.

## Source layout

```
src/
  animations/       ScrollTrigger reveals and parallax
  components/       Intro, navigation, footer, product UI, dialogs, forms
  context/          Variant-aware persisted bag
  data/             Replaceable product catalog
  pages/            Home, collection, product, about, contact, fallback
  styles/           Global design system, commerce and story styles
public/
  images/           Original city/campaign and sample garment SVGs
  videos/           Video replacement instructions
```

Bebas Neue and Space Grotesk are supplied by Fontsource under their bundled SIL Open Font Licenses (see `THIRD_PARTY_NOTICES.md`). No anime characters, logos, scenes, photography, or third-party video are copied. Japanese typography is intentional: 黒 means black, 夜のために means for the night, and 自分の道を suggests choosing your own path.

The downloadable ZIP contains source, lockfile, assets, documentation, and tests. Run `npm ci` after extracting; generated dependencies and build/test output are excluded.
