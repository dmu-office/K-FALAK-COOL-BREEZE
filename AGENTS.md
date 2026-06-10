# AGENTS.md — K Falak Cool Breeze

Static business website for a Pakistan-based cooling & appliance repair company.

## Quick Facts

- **Stack**: Vanilla HTML + CSS + JS. Tailwind CSS loaded via CDN (`cdn.tailwindcss.com`) — no build step, no npm, no bundler.
- **Serve**: Any static file server works. Open `index.html` directly or use `npx serve .` / Live Server.
- **No tests, no linter, no formatter config, no CI/CD.**
- **No README** — this file is the primary reference.

## Project Structure

```
index.html        — Main site (hero, about, services, projects, reviews, FAQ, booking)
privacy.html      — Privacy policy page (inline styles in <style>)
terms.html        — Terms of service page (inline styles in <style>)
css/style.css     — All custom styles (glass effects, animations, accordion, marquee, scrollbar, etc.)
js/main.js        — All JS (booking modal, scroll reveals, WhatsApp integration, header states, gallery, FAQ accordion, AC simulator)
images/           — 42 .webp images (hero, gallery, service photos, client logos, logo variants)
```

## Development

- No install needed. Edit any file and reload the browser.
- `css/style.css` contains all custom CSS (~550 lines). No CSS preprocessing.
- `js/main.js` has all frontend logic. **Known issue**: `setAirflowSpeed2` function is duplicated (two identical definitions). Fix the first occurrence only.

## Key Architecture Notes

- **Header states**: Three header styles — `setHeaderHero()`, `setHeaderLight()`, `setHeaderDark()` — triggered by scroll position via `handleHeaderScroll()`. The header switches between glass/transparent, white, and dark backgrounds depending on which section is in view.
- **Scroll reveals**: Uses `registerSectionSteps()` (a scroll-tracking utility defined elsewhere — likely a Copilot-era library injected at runtime) to animate stat cards, service cards, and review cards sequentially on scroll.
- **Image switching**: Service cards (`srv-card`) on hover/click swap the corresponding `srv-img` on the opposite column via `data-card-index` matching.
- **Booking modal**: 3-step wizard (select appliance → diagnostics → dispatch details) with WhatsApp submission fallback.
- **WhatsApp integration**: Primary CTA. `navigateToWhatsApp(msg)` extracts phone from `#nav-phone-number` and opens `https://wa.me/<number>?text=<encoded>`.
- **Marquee**: Infinite horizontal scroll for partner logos using duplicated content + CSS animation (`marquee-right` / `marquee-left`).

## Brand & Conventions

- **Primary color**: `#5896F6` (used for accents, hover states, active elements).
- **Phone**: `0345-5137257` / `923455137257` — used in WhatsApp URLs and `#nav-phone-number`.
- **Logo files**: `images/transparent-logo1.webp` (dark bg), `images/transparent-logo2.webp` (light bg) — swapped dynamically by header state.
- **Image format**: All images are `.webp`. Uses `onerror` fallback to `placehold.co` for missing images.
- **Typography**: `'Plus Jakarta Sans'` for headings, `'Inter'` as fallback (loaded from Google Fonts).

## Common Tasks

| Task | Where |
|------|-------|
| Change phone number | `index.html` (multiple `0345-5137257` occurrences) + `main.js` (`923455137257` in `submitCustomWhatsAppMsg`) |
| Add/remove service | Duplicate a `srv-card` block in `index.html`, add corresponding image in `#service-images`, update `main.js` if scroll-reveal step count changes |
| Change brand color | Replace `#5896F6` across `style.css` and `index.html` |
| Add gallery project | Add card div to `#testimonial-scroller` in `index.html`, place image in `images/` |

## Limitations & Gotchas

- `main.js` has **duplicate `setAirflowSpeed2`** function — edit the first definition, remove or update the second.
- No responsive breakpoints beyond Tailwind's defaults; custom overrides in `style.css` use `sm:` (640px), `md:` (768px), `lg:` (1024px).
- Review cards use a 5-column grid (`md:grid-cols-5`) and may break with fewer or more cards.
- Marquee effect requires duplicated child content for seamless loop — if adding logos, duplicate the entire block.
- `privacy.html` and `terms.html` use inline `<style>` blocks — keep consistent with `style.css` when updating global styles.
