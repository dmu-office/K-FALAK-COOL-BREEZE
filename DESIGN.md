# Design System — K Falak Cool Breeze

Derived from `index.html`. All values are as authored.

---

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#5896F6` | Accent, hover states, active elements, section labels, stat numbers |
| Blue-500 | `#3B82F6` | Review section "Testimonials" dot, review card active bg (`#5197E9`) |
| Page bg dark | `#0b131e` | Hero, legal pages |
| Page bg white | `#ffffff` | About, services, reviews sections |
| Black section | `#000000` | Footer |
| Near-black | `#030304` | FAQ section |
| Near-black | `#08090d` | "Breathe Easy" hero |
| Card bg light | `#F5F5F7` | Review card default |
| Card text dark | `#3A3A3C` | Review card default text |
| Slate-950 | `#020617` | About section headings |
| Zinc-400 | `#A1A1AA` | FAQ body text, muted |
| Zinc-100 | `#F4F4F5` | FAQ question text |

---

## Typography

- **Headings**: `'Plus Jakarta Sans'` — weights 300, 400, 500, 600, 700, 800
- **Body fallback**: `'Inter'` — weights 300, 400, 500, 600, 700
- **Selection highlight**: `bg-cyan-500/30` with `text-cyan-200`
- **Section labels**: `text-xs font-black uppercase tracking-[0.25em]` — always in `#5896F6`
- **Hero title**: `text-3xl` → `lg:text-7xl font-extrabold tracking-tight`
- **Section headings**: `text-3xl` → `lg:text-[3.5rem] font-extrabold tracking-tight`

---

## Glass & Surface Styles

All applied via CSS classes in `style.css`:

| Class | Effect |
|-------|--------|
| `.glass-panel` | `rgba(15,23,42,0.45)` + `blur(16px)` + white `1px` border |
| `.glass-panel-light` | `rgba(255,255,255,0.07)` + `blur(12px)` |
| `.glass-button` | `rgba(255,255,255,0.08)` + `blur(8px)` + white border. Hover: bg `0.18`, `translateY(-1px)` |

---

## Layout & Section Pattern

Every content section has the same wrapper structure:

```html
<section id="..." class="w-full bg-[color] lg:min-h-screen section-snap">
  <div class="w-full px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto pt-[--] pb-4 relative">
    <!-- section header: 12-col grid label (col-span-4) + heading (col-span-8) -->
    <!-- section body -->
  </div>
</section>
```

- **Content max-width**: `1400px`
- **Horizontal padding**: `px-4` → `sm:px-8` → `md:px-12`
- **Section label pattern**: colored dot + `text-xs font-black uppercase tracking-[0.25em]` label — left column of a 12-col grid
- **Heading + description**: right column of the 12-col grid with `ml-0 lg:ml-16 xl:ml-28`

---

## Atmosphere & Ambient Effects

All sections with dark backgrounds use glowing orbital blurs:

- **Hero 1**: Three layered `blur-[120px]` to `blur-[140px]` orbs with gradient fills, animated via `.animate-ambient-1` / `.animate-ambient-2` (25s/30s cycle)
- **Projects section**: Single centered `blur-[150px]` orb, `bg-[#5896F6]/10`, with `.ambient-glow` pulse animation
- **FAQ section**: Single centered `blur-[160px]` orb, `bg-[#5896F6]/10`
- **"Breathe Easy" hero**: Amber orb `blur-[120px]` bottom-right, plus animated cool-breeze streams (gradient streaks with `blowAir` keyframes)

---

## Component Details

### Header
- Fixed, z-50, `transition-all duration-300`
- Three states swapped by JS: glass (hero), white (`bg-white/90 backdrop-blur-md`), dark (`bg-black/90 backdrop-blur-md`)
- Logo swaps: `transparent-logo1.webp` (dark bg) / `transparent-logo2.webp` (light bg)
- Phone number: `0345-5137257` in `#nav-phone-number`

### Stat Cards (About)
- `opacity: 0` + `translateY(30px)` → revealed by scroll via `.stat-card.visible`
- On scroll, cards stack vertically with negative `marginTop` (~55% of card height)
- Large colored numbers (`.text-[#5896F6]`), muted uppercase descriptions

### Project Gallery (Scroller)
- Horizontal scroll with `snap-x snap-mandatory`
- Cards: `min-h-[480px]`, `w-full` → `sm:w-[320px]` → `md:w-[350px]`
- Background image with gradient overlay (`from-black/90 via-black/40 to-transparent`)
- Hover: `scale(1.05)` on image, border lightens

### Service Cards (Home Appliances / Commercial)
- Left column: images stack absolutely, `.srv-img.active` controls visibility
- Right column: click/hover toggles active image via `data-card-index` matching
- Hover effect: blue slide-in `::before` pseudo-element (`width: 0 → 100%`), text turns white, description fades in (`max-height: 0 → 60px`)
- Arrow button bg flips to white with blue icon

### Review Cards (Testimonials)
- 5-column grid (`md:grid-cols-5`)
- Default: light gray card, muted text
- Active: blue bg (`#5197E9`), white text, illustration container expands (`h-0 → h-24`), stars appear
- Activated by scroll position or click

### Partner Marquee
- Full-viewport-width overflow container (`margin-left: calc(-50vw + 50%)`)
- Seamless infinite scroll via CSS keyframes + duplicated content
- Image size: `w-36 h-36` → `md:w-44 md:h-44`

### FAQ Accordion
- Numbered items (01–04), left number column (`-ml-0 sm:-ml-16 md:-ml-48`)
- Content toggles `max-height: 0 ↔ 200px` with `opacity` fade
- Plus icon rotates on active (handled by JS)

### "Breathe Easy" Hero (AC Simulator)
- Background: `hero-2.webp` with slow zoom keyframe (`breatheZoom`: 100% → 108% over 12s)
- Cool-breeze animation: 3 gradient streams with `blowAir` keyframes (variable `--breeze-duration`)
- Speed controls: Off / Low / Med / Turbo toggle CSS variable durations

### Footer
- Two-column grid (Quick Links + Social Media), plus FBR logo
- Large brand name (`K Falak Cool Breeze`) stacked
- Bottom bar: copyright + Privacy / Terms / "Powered by DMU"
- Decorative SVG snowflake/star at bottom-left

### Estimate Modal (AC Calculator)
- Dark overlay + centered card (`bg-[#0c0d12]`)
- Dropdowns: tonnage (1.0–3.0) × service action ($95–$650)
- Live calculation with tonnage multiplier (1.0× to 1.8×)
- "Proceed with this Estimate" calls `openBookingModal()`

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| `sm:` | 640px | Tablet adjustments |
| `md:` | 768px | Grid shifts, header padding |
| `lg:` | 1024px | Side-by-side layouts, `min-h-screen` on sections |
| `xl:` | 1280px | Fine-tuning gaps and padding |

---

## Interactive Behaviors (from HTML attributes)

- **WhatsApp CTA**: `navigateToWhatsApp(msg)` — primary conversion on hero buttons
- **Scroll snapping**: all sections have class `.section-snap` — header state changes on scroll via `handleHeaderScroll()`
- **Service card interaction**: `onmouseenter="focusAppliance('ac')"` + click toggles expanded state
- **Review cards**: `onclick="activateReview(N)"` — click activates a card
- **FAQ**: `onclick="toggleAccordion(N)"` toggles open/close
- **Side menu**: `toggleSideMenu()` toggles `#side-menu-drawer` (drawer element present in JS, verify HTML)
- **Booking modal**: `openBookingModal()` — 3-step wizard triggered from estimate acceptance or direct call
