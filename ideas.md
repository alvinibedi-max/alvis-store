# Alvis Store — Design Document

## Three Stylistic Approaches

### 1. Midnight Luxe (Probability: 0.07)
Dark editorial luxury — black backgrounds, white typography, gold accents. Think high-end watch brand meets tech store.

### 2. Void Commerce (Probability: 0.08) ← CHOSEN
Joybuy-inspired bold e-commerce structure with a dark, high-contrast identity. Black backgrounds, white text, pinkish-purple (fuchsia/violet) as the signature accent. Bold, unapologetic, and direct.

### 3. Chalk Grid (Probability: 0.05)
Brutalist grid layout with stark black-and-white contrast and hand-drawn accents. Minimal color, maximum structure.

---

## Chosen Approach: **Void Commerce**

### Design Movement
Bold Dark E-Commerce — inspired by Joybuy's structural clarity and product-first hierarchy, reinterpreted with a dark, premium aesthetic.

### Core Principles
1. **Black-first**: Deep black (#0a0a0a) as the dominant surface — no gray washes, no off-whites in backgrounds
2. **White text hierarchy**: Pure white for headlines, light gray for body copy, creating a clear typographic ladder
3. **Pinkish-purple as the single accent**: Every interactive element, badge, button, and highlight uses the fuchsia-violet range (#c026d3 → #a855f7)
4. **Joybuy structural DNA**: Announcement bar → bold header → category nav → hero carousel → trust bar → product grid

### Color Philosophy
- Background: `#0a0a0a` (near-black, not pure black to avoid harshness)
- Surface/Cards: `#141414` and `#1a1a1a`
- Border: `#2a2a2a`
- Text Primary: `#ffffff`
- Text Secondary: `#a0a0a0`
- Accent Primary: `#c026d3` (fuchsia-600)
- Accent Gradient: `linear-gradient(135deg, #c026d3, #7c3aed)` (fuchsia → violet)
- Accent Hover: `#a21caf`
- Success: `#22c55e`
- Warning: `#f59e0b`

### Layout Paradigm
Full-width Joybuy-style horizontal bands. No centered hero boxes — content bleeds edge to edge. Product grids use tight 4-5 column layouts on desktop. Category tiles arranged in a horizontal scrollable row.

### Signature Elements
1. **Fuchsia-violet gradient buttons** — all CTAs use the gradient, never flat color
2. **Bold announcement bar** — dark purple/black bar at top with scrolling promotional text
3. **HOT/SALE badges** — fuchsia pill badges on product cards

### Interaction Philosophy
Fast, direct, no-nonsense. Hover states reveal fuchsia borders on cards. Buttons scale down 2% on press. Transitions are snappy (150-200ms ease-out).

### Animation
- Hero carousel: smooth 600ms slide transitions
- Product cards: 150ms border-color + shadow transition on hover
- Buttons: 160ms scale(0.97) on active
- Page sections: staggered 40ms entrance animations on scroll
- Skeleton loaders for async content

### Typography System
- **Display/Headlines**: `Barlow Condensed` — bold, wide, impactful (700-900 weight)
- **Body/UI**: `Inter` — clean, readable, functional
- **Price/Numbers**: `Barlow` — bold numerals for prices
- Headline scale: 48px → 36px → 24px → 18px → 14px

### Brand Essence
**Alvis** — The electronics store for people who know what they want. Bold. Direct. Premium.
Personality: Confident, Precise, Unapologetic

### Brand Voice
Headlines sound like: "Power without compromise." / "Your next upgrade is here."
CTAs: "Get it now" / "Add to cart" — never "Explore our collection" or "Discover more"

### Wordmark & Logo
Bold "A" monogram in fuchsia-violet gradient, geometric and sharp. Used as favicon and header icon.

### Signature Brand Color
**Fuchsia #c026d3** — unmistakably Alvis.

## Style Decisions
- Announcement bar uses deep purple-black with white text and fuchsia highlights
- Product card hover state: fuchsia border glow (1px solid #c026d3 + subtle box-shadow)
- All gradient buttons: from #c026d3 to #7c3aed (left to right)
- Category tiles: dark card with fuchsia icon accent
- Trust bar: icon + text in white on dark background
