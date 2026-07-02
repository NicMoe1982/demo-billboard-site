# Local Service Business — Website Base Template

A static, multi-page website template for small local service businesses (landscaping, plumbing, salons, contractors, etc.). Built with plain HTML/CSS/JS — no build step, no framework, no dependencies beyond two Google Fonts.

Demo content is built around a fictional landscaping company ("Rootline Outdoor Services") to show the template in a realistic context. Swap the copy, colors, and images to fit any local business.

---

## Project Structure

```
site/
├── index.html          Homepage — hero, value props, entry points
├── about.html           About / trust signals
├── services.html        Service list
├── gallery.html          Before/after project gallery
├── testimonials.html    Customer reviews
├── contact.html          Contact form, hours, map
├── css/
│   └── styles.css       All styling — theme variables live at the top
└── js/
    └── main.js          Nav toggle, before/after slider, form handling
```

Each HTML page is self-contained and includes its own copy of the header nav and footer (this is plain static HTML — there's no templating engine to share partials across pages).

---

## Site Map / User Flow

```
Homepage
  ├─→ About ──────┬─→ Services
  ├─→ Services ────┼─→ Gallery
  │                └─→ Contact
  ├─→ Gallery ─────→ Contact
  ├─→ Testimonials → Contact
  └─→ Contact (primary conversion point)

Footer (all pages) → Contact / Homepage
```

---

## Customizing for a New Business

### 1. Colors, fonts, spacing
Everything is controlled by CSS variables at the top of `css/styles.css`:

```css
:root {
  --forest: #1E3A2E;   /* primary dark */
  --ochre:  #C17F3E;   /* accent / CTA color */
  --sand:   #F1EBDD;   /* background */
  --font-display: "Fraunces", Georgia, serif;
  --font-body:    "Work Sans", sans-serif;
  --font-mono:    "IBM Plex Mono", monospace;
  ...
}
```

Change these values and the whole site updates — no need to touch individual pages. If you swap fonts, update the Google Fonts `<link>` tags in each HTML file's `<head>`.

### 2. Business info (name, phone, email, address)
These are hardcoded in each page's header and footer. Find-and-replace across all six HTML files:
- Business name: `Rootline` / `Root<span>line</span>`
- Phone: `(555) 019‑2245` / `tel:5550192245`
- Email: `hello@rootlineoutdoor.com`

### 3. Page copy
Homepage hero, About page bio, service descriptions, and testimonials are all placeholder copy meant to demonstrate tone and structure — rewrite with the real business's voice and details.

### 4. Images
The gallery page currently uses CSS-based color-block placeholders instead of real photos (see `.compare .before` / `.compare .after` in `styles.css`). Replace with real `<img>` tags:

```html
<div class="compare">
  <img class="before-img" src="images/project1-before.jpg" alt="Before">
  <img class="after-img" src="images/project1-after.jpg" alt="After">
  <div class="divider"></div>
</div>
```
(Minor CSS/JS adjustment needed to clip an `<img>` instead of a background div — flagged as a TODO below.)

### 5. Contact form
The form in `contact.html` currently just resets and shows a client-side success message — **it does not send anywhere yet**. Wire it up to one of:
- A form backend service (Formspree, Netlify Forms, Getform)
- Your own backend endpoint via `fetch()`
- A `mailto:` fallback for a zero-backend option

See the `initContactForm()` function in `js/main.js`.

### 6. Map embed
`contact.html` has a placeholder block where a Google Maps `<iframe>` embed should go. Get the embed code from Google Maps → Share → Embed a map.

### 7. Reviews
`testimonials.html` has a placeholder section for a live Google Business Profile reviews widget — replace with the embed code from your review aggregator of choice, or leave the static quote cards.

---

## Known TODOs Before Launch

- [ ] Replace all placeholder business info, copy, and phone/email links
- [ ] Add real project photos to the gallery (and adjust the compare-slider markup to use `<img>`)
- [ ] Connect the contact form to a real backend or form service
- [ ] Add a real Google Maps embed
- [ ] Add a working Privacy Policy page (footer link is currently a placeholder `#`)
- [ ] Set favicon and social share meta tags (Open Graph / Twitter cards)
- [ ] Run a full accessibility and Lighthouse pass
- [ ] Optional: convert to a static site generator (11ty, Astro) if the nav/footer duplication across pages becomes painful to maintain

---

## Browser Support & Accessibility

- Responsive down to mobile (~360px width)
- Keyboard-navigable nav and before/after slider
- Respects `prefers-reduced-motion`
- Visible focus states on all interactive elements

---

## Local Development

No build step required. Either:
- Open `index.html` directly in a browser, or
- Serve the folder locally for cleaner relative-path behavior:
  ```bash
  cd site
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`

## Deployment

Any static host works out of the box — Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a plain file upload to standard web hosting. No environment variables or server-side code required (until the contact form is wired to a backend).
