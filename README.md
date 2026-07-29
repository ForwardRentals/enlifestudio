# EnlifeStudio — redesign demo

A redesign concept for [enlifestudio.com](https://www.enlifestudio.com/) (Alex Stewart), built in the
visual language of [byhula.com](https://www.byhula.com/): full-bleed dark hero, wide-tracked serif
display type, a tight edge-to-edge image grid, and a lot of white space.

**Live:** https://forwardrentals.github.io/enlifestudio/

## Pages

| File | Contents |
| --- | --- |
| `index.html` | Hero, 18-piece curated grid, pull quote, about preview, commissions, exhibitions & press, shop preview, inquiries |
| `works.html` | Full portfolio — 61 works, filterable by Murals / In Nature / Studio |
| `about.html` | Full bio, complete exhibition list, press list |
| `shop.html` | Six available originals & prints, plus hard goods |
| `contact.html` | Inquiry form and contact details |

## How it's built

Static HTML, one stylesheet, two small scripts. No build step, no dependencies.

- `js/works.js` — the artwork index (path, category, alt text, location) plus the shared tile renderer.
  Every gallery on the site is driven by this one file.
- `js/site.js` — sticky header, mobile drawer, scroll reveals, lightbox.
- `css/site.css` — all styling.

## Before this goes live

1. **Images are hotlinked from Alex's Squarespace CDN.** They must be downloaded and self-hosted
   before the Squarespace subscription lapses, or every image on the site breaks.
2. **The contact form opens the visitor's mail client** via `mailto:`. Swap the submit handler in
   `contact.html` for a Formspree or Netlify Forms endpoint to capture submissions server-side.
3. **"Cart (0)" is decorative.** There is no store behind it — either wire up a real cart
   (Shopify Lite, Snipcart) or drop it and keep the enquire-by-email flow.
4. Prices for originals aren't published on the current site, so everything reads "Enquire".
   The two hats carry their real $80 CAD / sold-out status.

## Content provenance

Bio, exhibition list, press list and product specs are taken verbatim from enlifestudio.com.
Mural locations (Vancouver Mural Festival, The Barley Merchant, Salt Lane, Langley Mural Walk,
Progression Bouldering Gym, and others) come from the captions burned into Alex's own photographs.
