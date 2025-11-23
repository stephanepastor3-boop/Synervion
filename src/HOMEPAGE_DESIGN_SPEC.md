# Synervion Homepage Design Specification
## Desktop Layout (1440px) - Developer Handoff

**Version:** 1.0  
**Date:** October 2025  
**Status:** ✅ Ready for Development

---

## 🎯 Overview

Complete homepage design for Synervion using the established Brand System. Built with:
- **Layout System:** 12-column grid with 64px container padding
- **Max Width:** 1440px centered container
- **Spacing:** 8px base unit (64px section spacing)
- **Typography:** Manrope (headings) + Inter (body)
- **Colors:** Brand color system with CSS variables

---

## 📐 Layout Structure

### Container Specifications
```css
max-width: 1440px
margin: 0 auto
padding-left: 64px (var(--synervion-space-16))
padding-right: 64px (var(--synervion-space-16))
```

### Grid System
```css
display: grid
grid-template-columns: repeat(12, 1fr)
gap: 32px (2rem)
```

---

## 🧩 Component Breakdown

### 1. Navigation (Sticky)
**Location:** `/components/Navigation.tsx`

**Specifications:**
- Position: `fixed top-0`
- Height: `80px` (5rem)
- Z-index: `50`
- Background: `transparent` → `white/95% with backdrop-blur` on scroll
- Max-width: `1440px`
- Padding: `0 64px`

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo + Synervion] ····················· [Nav Links] [CTA] │
│ 20px text · Manrope · 600          14px · Inter · 500   │
└─────────────────────────────────────────────────────────┘
```

**Elements:**
- Logo SVG: 32×32px
- Brand name: 20px/600/Manrope
- Nav links: 14px/500/Inter (About, Benefits, Partnerships, Contact)
- CTA Button: BrandButton variant="primary" size="sm"
- Hover color: `hsl(var(--synervion-primary-500))`

---

### 2. Hero Section
**Location:** `/components/Hero.tsx`

**Specifications:**
- Min-height: `100vh`
- Padding: `128px 0` (py-32)
- Background: Gradient from white → gray-50 → white
- Grid: 12 columns (6 left content + 6 right image)

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│                     [HERO SECTION]                        │
│                                                           │
│  [Badge]                           [Product Image]        │
│  Lab-Grown Excellence              - Rounded 2xl         │
│                                    - Shadow 2xl          │
│  THE CORDYCEPS PARTNER            - Floating stat card   │
│  FOR BRANDS                        - 99.8% Purity        │
│  64px/Bold/Manrope/-0.02em                              │
│                                                           │
│  Body text (18px/Regular/Inter)                          │
│  Max-width: 36rem                                        │
│                                                           │
│  [4 Feature Icons Grid]                                  │
│  Sustainable | Lab-Grown | Premium | Flexible           │
│                                                           │
│  [Explore Partnerships] [View Research]                  │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Typography:**
- Badge: BrandBadge variant="primary"
- H1: 64px/Bold/Manrope/-0.02em
- "Cordyceps" span: `color: hsl(var(--synervion-primary-500))`
- Body: 18px/Regular/Inter/1.7 line-height
- Max-width body: 36rem (576px)

**Feature Icons:**
- Grid: 4 columns, 16px gap
- Icon size: 24px with 1.5px stroke
- Icon container: 48px circle with primary/10% background
- Text: 12px/Regular/Inter
- Hover: Border color → primary/30%, shadow-lg

**Image:**
- Rounded: 16px (rounded-2xl)
- Shadow: shadow-2xl
- Floating card: -32px bottom-left offset
- Card padding: 24px
- Card border: border-light with 50% opacity

---

### 3. Mission & Vision
**Location:** `/components/MissionVision.tsx`

**Specifications:**
- Padding: `96px 0` (py-24)
- Background: White
- Grid: 12 columns (6 + 6)
- Gap: 32px

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│               [MISSION & VISION]                          │
│                                                           │
│  ┌─────────────────────┐  ┌─────────────────────┐       │
│  │ [Target Icon]       │  │ [TrendingUp Icon]    │       │
│  │ 64px container      │  │ 64px container       │       │
│  │                     │  │                      │       │
│  │ Our Mission         │  │ Our Vision           │       │
│  │ 32px/SemiBold       │  │ 32px/SemiBold        │       │
│  │                     │  │                      │       │
│  │ Body text...        │  │ Body text...         │       │
│  │ 18px/Regular        │  │ 18px/Regular         │       │
│  │                     │  │                      │       │
│  │ [2-col Stats Grid]  │  │ [2-col Stats Grid]   │       │
│  │ 5+ Years | 100%     │  │ 50+ | 90%            │       │
│  └─────────────────────┘  └─────────────────────┘       │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Card Specifications:**
- Padding: 48px (p-12)
- Border-radius: 24px (rounded-3xl)
- Border: 1px solid border-light
- Background gradient: primary/5% → transparent (Mission)
- Background gradient: secondary/5% → transparent (Vision)
- Hover: Border → primary/30% or secondary/30%

**Typography:**
- H3: 32px/SemiBold/Manrope/1.2
- Body: 18px/Regular/Inter/1.7
- Stats value: 32px/Bold/Manrope
- Stats label: 14px/Regular/Inter

**Stats Grid:**
- Grid: 2 columns, 16px gap
- Border-top: 1px solid border-light
- Padding-top: 24px

---

### 4. Product Benefits
**Location:** `/components/ProductBenefits.tsx`

**Specifications:**
- Padding: `96px 0` (py-24)
- Background: Gradient white → gray-50
- Grid: 12 columns (4 cards × 3 columns each)
- Gap: 24px

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│              [PRODUCT BENEFITS]                           │
│                                                           │
│              [Badge: Product Benefits]                    │
│                                                           │
│        Four Pillars of WELLNESS                          │
│        48px/SemiBold/Manrope/-0.01em                     │
│                                                           │
│        Subtitle text (18px/Regular/Inter)                │
│                                                           │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │ Zap  │  │Shield│  │Heart │  │Clock │                │
│  │      │  │      │  │      │  │      │                │
│  │Energy│  │Immune│  │Vitality│ │Longevity│            │
│  │ 42%  │  │ 38%  │  │ 35%  │  │ 45%  │                │
│  └──────┘  └──────┘  └──────┘  └──────┘               │
│                                                           │
│         * Clinical studies disclaimer (14px)             │
└───────────────────────────────────────────────────────────┘
```

**Section Header:**
- Badge: BrandBadge variant="primary"
- H2: 48px/SemiBold/Manrope/-0.01em
- Body: 18px/Regular/Inter/1.7
- Max-width: 48rem (768px)
- Margin-bottom: 64px

**Benefit Cards:**
- Uses: BrandCard variant="benefit"
- Grid: 4 equal columns (col-span-3 each)
- Gap: 24px
- Icon: 28px with 1.5px stroke, primary-500 color
- Card includes: icon, title, description, metric, metricLabel

**Disclaimer:**
- Margin-top: 48px
- Text: 14px/Regular/Inter
- Color: text-tertiary
- Alignment: center

---

### 5. Lab-Grown Advantage
**Location:** `/components/LabGrownAdvantage.tsx`

**Specifications:**
- Padding: `96px 0` (py-24)
- Background: White
- Grid: 12 columns (5 content + 7 image)
- Gap: 64px (gap-16)

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│           [LAB-GROWN ADVANTAGE]                           │
│                                                           │
│  [Badge: Lab-Grown Excellence]  [Large Product Image]    │
│                                  - Rounded 3xl           │
│  The SCIENTIFIC Advantage        - Shadow 2xl            │
│  48px/SemiBold/Manrope          - Gradient overlay       │
│                                                           │
│  Body paragraph...              [Floating Metrics]       │
│  18px/Regular/Inter             99.8% | 100% | 90%       │
│                                                           │
│  ✓ 99.8% Purity                                          │
│    Description text                                      │
│                                                           │
│  ✓ Standardized Potency                                  │
│    Description text                                      │
│                                                           │
│  ✓ 90% Carbon Reduction                                  │
│    Description text                                      │
│                                                           │
│  ✓ Year-Round Supply                                     │
│    Description text                                      │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Left Content (5 columns):**
- Badge: BrandBadge variant="secondary"
- H2: 48px/SemiBold/Manrope/-0.01em
- Body: 18px/Regular/Inter/1.7
- Margin-bottom body: 32px

**Advantages List:**
- Spacing: 24px between items (space-y-6)
- Icon container: 48px rounded-xl with primary/10% background
- Icon: 24px with 1.5px stroke
- Title: 18px/SemiBold/Manrope
- Description: 16px/Regular/Inter/1.6

**Right Image (7 columns):**
- Rounded: 24px (rounded-3xl)
- Shadow: shadow-2xl
- Gradient overlay: from-black/30 to-transparent

**Floating Metrics Card:**
- Position: -24px bottom, -24px left
- Padding: 24px
- Background: white
- Border: border-light with 50% opacity
- Shadow: shadow-2xl
- Rounded: 16px (rounded-2xl)
- Metrics: 3 items separated by dividers
- Value: 32px/Bold/Manrope/primary-500
- Label: 12px/Regular/Inter/text-secondary

---

### 6. Partnership Models
**Location:** `/components/PartnershipModels.tsx`

**Specifications:**
- Padding: `96px 0` (py-24)
- Background: Gradient gray-50 → white
- Grid: 12 columns (4 columns per card)
- Gap: 32px

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│            [PARTNERSHIP MODELS]                           │
│                                                           │
│           [Badge: Partnership Models]                     │
│                                                           │
│     Flexible COLLABORATION Options                       │
│     48px/SemiBold/Manrope/-0.01em                        │
│                                                           │
│     Subtitle (18px/Regular/Inter)                        │
│                                                           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │[Most Popular]│   [Premium]  │  [Enterprise]│          │
│  │            │ │            │ │            │          │
│  │ [Package]  │ │ [Sparkles] │ │ [Beaker]   │          │
│  │            │ │            │ │            │          │
│  │White-Label │ │ Co-Brand   │ │ Custom     │          │
│  │32px/SemiBold│ │32px/SemiBold│ │Formulation │          │
│  │            │ │            │ │32px/SemiBold│          │
│  │Description │ │Description │ │Description │          │
│  │16px/Regular│ │16px/Regular│ │16px/Regular│          │
│  │            │ │            │ │            │          │
│  │• Feature 1 │ │• Feature 1 │ │• Feature 1 │          │
│  │• Feature 2 │ │• Feature 2 │ │• Feature 2 │          │
│  │• Feature 3 │ │• Feature 3 │ │• Feature 3 │          │
│  │• Feature 4 │ │• Feature 4 │ │• Feature 4 │          │
│  │            │ │            │ │            │          │
│  │[Learn More]│ │[Learn More]│ │[Learn More]│          │
│  └────────────┘ └────────────┘ └────────────┘          │
│                                                           │
│     Disclaimer text (14px/Regular)                       │
└───────────────────────────────────────────────────────────┘
```

**Section Header:**
- Badge: BrandBadge variant="primary"
- H2: 48px/SemiBold/Manrope/-0.01em
- Body: 18px/Regular/Inter/1.7
- Max-width: 48rem
- Margin-bottom: 64px

**Partnership Cards:**
- Grid: 3 equal columns (col-span-4 each)
- Gap: 32px
- Padding: 32px (p-8)
- Border: 2px solid border-light
- Border-radius: 24px (rounded-3xl)
- Hover: Border → primary-500, shadow-xl

**Card Components:**
- Badge position: absolute -12px top, centered
- Icon container: 64px rounded-2xl with primary/10% background
- Icon: 32px with 1.5px stroke
- H3: 32px/SemiBold/Manrope/1.2
- Description: 16px/Regular/Inter/1.6
- Features: 12px spacing, 14px/Regular/Inter

**Feature List Items:**
- Bullet: 20px circle with primary/10% background
- Inner dot: 8px circle with primary-500
- Gap: 12px between bullet and text

**CTA Button:**
- BrandButton variant="outline"
- Full width (w-full)
- Hover: background → primary-500, text → white

---

### 7. Contact CTA
**Location:** `/components/ContactCTA.tsx`

**Specifications:**
- Padding: `96px 0` (py-24)
- Background: Gradient secondary-800 → secondary-700
- Grid: 12 columns (7 content + 5 stats)
- Gap: 64px

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│                [CONTACT CTA - Dark]                       │
│                                                           │
│  [Mail Badge: Get In Touch]     [Stats Grid 2×2]         │
│                                  50+ | 99.8%             │
│  Ready to Build Something        100% | < 24h            │
│  GREAT?                                                   │
│  48px/SemiBold/White                                     │
│                                  [Contact Info Card]      │
│  Join 50+ leading wellness       partnerships@           │
│  brands who trust Synervion...   synervion.com          │
│  18px/Regular/White/90%          +91 80 1234 5678       │
│                                                           │
│  [Start Partnership] [Contact Us]                        │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Background:**
- Gradient: from-secondary-800 to-secondary-700
- Pattern overlay: radial-gradient dots at 10% opacity
- Pattern size: 48px

**Left Content (7 columns):**
- Badge: Mail icon + "Get In Touch" (14px/Manrope/white)
- H2: 48px/SemiBold/Manrope/-0.01em/white
- "Great" span: color → primary-500
- Body: 18px/Regular/Inter/1.7/white-90%
- Max-width: 32rem (512px)

**Buttons:**
- Primary: BrandButton variant="primary" size="lg"
- Secondary: BrandButton variant="outline" size="lg"
  - Border: white
  - Text: white
  - Hover: bg-white, text-secondary-800
- Gap: 16px

**Right Stats (5 columns):**
- Grid: 2×2, 24px gap
- Card padding: 24px
- Card background: white/10% with backdrop-blur
- Card border: white/20%
- Card rounded: 16px (rounded-2xl)
- Hover: background → white/20%

**Stat Card:**
- Value: 40px/Bold/Manrope/primary-500
- Label: 14px/Regular/Inter/white-80%
- Text-align: center

**Contact Info Card:**
- Margin-top: 24px
- Padding: 24px
- Same styling as stat cards
- Title: 16px/SemiBold/Manrope/white
- Contact: 14px/Regular/Inter/white-80%

---

### 8. Footer
**Location:** `/components/Footer.tsx`

**Specifications:**
- Width: `100%` (full width)
- Background: `hsl(var(--synervion-secondary-800))`
- Padding: `64px 0` (py-16)
- Grid: 12 columns (4 brand + 2 × 3 links = 4+2+2+2)

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│                      [FOOTER]                             │
│                                                           │
│  [Logo + Synervion]  [Company]  [Partnerships] [Resources]│
│  20px/SemiBold       14px/SemiBold  14px/SemiBold        │
│                                                           │
│  Premium lab-grown   • About Us    • Models      • Papers│
│  Cordyceps...        • Science     • White-Label • Certs │
│  14px/Regular/70%    • Sustainable • Co-Brand    • FAQ   │
│                      • Careers     • Custom      • Contact│
│  [Social Icons]                                           │
│  40px circles                                             │
│                                                           │
│  ─────────────────────────────────────────────────────────│
│                                                           │
│  © 2025 Synervion. All rights reserved.  [Privacy] [Terms] [Cookies]│
│  14px/Regular/60%                         14px/Regular/60%│
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Brand Section (4 columns):**
- Logo: 32px SVG
- Brand name: 20px/SemiBold/Manrope/white
- Description: 14px/Regular/Inter/white-70%
- Max-width: 18rem (288px)
- Social icons: 40px circles, 12px gap
- Icon size: 20px with 1.5px stroke
- Icon background: white/10%
- Icon hover: primary-500

**Link Columns (2 columns each):**
- Title: 14px/SemiBold/Manrope/white
- Links: 14px/Regular/Inter/white-70%
- Link spacing: 12px (space-y-3)
- Hover: text → primary-500

**Bottom Bar:**
- Padding-top: 32px
- Border-top: 1px solid white/10%
- Flex: space-between
- Copyright: 14px/Regular/Inter/white-60%
- Legal links: 14px/Regular/Inter/white-60%, 24px gap
- Hover: text → primary-500

---

## 🎨 Color Usage Reference

### Primary Actions & Highlights
```css
hsl(var(--synervion-primary-500)) /* #EE7B2F - Main amber */
```

### Text Hierarchy
```css
hsl(var(--synervion-text-primary))   /* #272D35 - Headings */
hsl(var(--synervion-text-secondary)) /* #515A63 - Body */
hsl(var(--synervion-text-tertiary))  /* #808A94 - Captions */
```

### Backgrounds
```css
hsl(var(--synervion-bg-white))      /* #FFFFFF - Pure white */
hsl(var(--synervion-bg-gray-50))    /* #F9FAFB - Subtle surface */
hsl(var(--synervion-secondary-800)) /* #272D35 - Dark footer */
```

### Borders
```css
hsl(var(--synervion-border-light))  /* Light gray borders */
```

---

## 📝 Typography Scale

```css
/* H1 - Hero Headlines */
font-size: 64px;
font-weight: 700;
line-height: 1.2;
letter-spacing: -0.02em;
font-family: var(--synervion-font-heading); /* Manrope */

/* H2 - Section Titles */
font-size: 48px;
font-weight: 600;
line-height: 1.2;
letter-spacing: -0.01em;
font-family: var(--synervion-font-heading); /* Manrope */

/* H3 - Subsection Headers */
font-size: 32px;
font-weight: 600;
line-height: 1.2;
letter-spacing: -0.01em;
font-family: var(--synervion-font-heading); /* Manrope */

/* Body - Main Content */
font-size: 18px;
font-weight: 400;
line-height: 1.7;
font-family: var(--synervion-font-body); /* Inter */

/* Body Small */
font-size: 16px;
font-weight: 400;
line-height: 1.6;
font-family: var(--synervion-font-body); /* Inter */

/* Caption - Labels */
font-size: 14px;
font-weight: 400;
line-height: 1.5;
font-family: var(--synervion-font-body); /* Inter */

/* Small - Fine Print */
font-size: 12px;
font-weight: 400;
line-height: 1.4;
font-family: var(--synervion-font-body); /* Inter */
```

---

## 📏 Spacing System

```css
/* Section Spacing */
padding-top: 96px;    /* py-24 */
padding-bottom: 96px;

/* Component Spacing */
margin-bottom: 64px;  /* mb-16 */
margin-bottom: 48px;  /* mb-12 */
margin-bottom: 32px;  /* mb-8 */
margin-bottom: 24px;  /* mb-6 */

/* Element Spacing */
gap: 32px;  /* Large gaps */
gap: 24px;  /* Medium gaps */
gap: 16px;  /* Small gaps */
gap: 12px;  /* Tight gaps */

/* Padding */
padding: 48px;  /* p-12 - Large cards */
padding: 32px;  /* p-8 - Cards */
padding: 24px;  /* p-6 - Small cards */
```

---

## 🔧 Component Props

### BrandButton
```tsx
<BrandButton 
  variant="primary" | "secondary" | "outline" | "ghost" | "link"
  size="sm" | "md" | "lg" | "icon"
  className="additional-classes"
>
  Button Text
  <Icon className="w-4 h-4" />
</BrandButton>
```

### BrandBadge
```tsx
<BrandBadge 
  variant="primary" | "secondary" | "outline" | "success" | "warning" | "error"
  size="sm" | "md" | "lg"
>
  Badge Text
</BrandBadge>
```

### BrandCard
```tsx
<BrandCard
  variant="benefit" | "partnership" | "metric"
  icon={<Icon className="w-7 h-7" />}
  title="Card Title"
  description="Card description text"
  metric="42%"
  metricLabel="Metric Label"
/>
```

---

## 🎬 Animation Specifications

### Scroll Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### Stagger Animations
```tsx
transition={{ delay: index * 0.1, duration: 0.5 }}
```

### Hover States
```css
transition-all duration-300
hover:border-primary-500
hover:shadow-xl
```

---

## ✅ Developer Checklist

### Setup
- [ ] Install dependencies (motion, lucide-react)
- [ ] Import fonts (Manrope, Inter) from Google Fonts
- [ ] Set up CSS variables in globals.css
- [ ] Configure Tailwind v4.0

### Components
- [ ] Navigation (sticky, backdrop-blur on scroll)
- [ ] Hero (full-height, 2-column grid)
- [ ] Mission & Vision (2-column cards with stats)
- [ ] Product Benefits (4-column grid with BrandCard)
- [ ] Lab-Grown Advantage (2-column with image)
- [ ] Partnership Models (3-column cards)
- [ ] Contact CTA (dark background, 2-column)
- [ ] Footer (4-column layout)

### Interactions
- [ ] Sticky nav with scroll detection
- [ ] Smooth scroll animations with Motion
- [ ] Hover states on all interactive elements
- [ ] Button hover translations (icons)
- [ ] Card hover effects (borders, shadows)

### Quality Checks
- [ ] All typography uses correct fonts and sizes
- [ ] All colors use CSS variables
- [ ] 12-column grid properly implemented
- [ ] 1440px max-width container centered
- [ ] 64px horizontal padding maintained
- [ ] All spacing follows 8px base unit
- [ ] Icons use 1.5px stroke weight
- [ ] Responsive behavior (if needed)

---

## 📦 File Structure

```
components/
├── Navigation.tsx          # Sticky nav with scroll effects
├── Hero.tsx               # Full-height hero section
├── MissionVision.tsx      # 2-column mission/vision cards
├── ProductBenefits.tsx    # 4-column benefit cards
├── LabGrownAdvantage.tsx  # Content + image layout
├── PartnershipModels.tsx  # 3-column partnership cards
├── ContactCTA.tsx         # Dark CTA section
├── Footer.tsx            # Full-width footer
└── brand/
    ├── BrandButton.tsx    # Button component
    ├── BrandCard.tsx      # Card variants
    └── BrandBadge.tsx     # Badge component

pages/
└── HomePage.tsx          # Main homepage assembly
```

---

## 🎯 Performance Notes

- All animations use `viewport={{ once: true }}` to prevent re-triggering
- Images use lazy loading
- Sticky nav uses backdrop-blur for performance
- CSS variables for theme consistency
- Semantic HTML for accessibility
- Proper heading hierarchy (h1 → h2 → h3)

---

**Ready for Development** ✅  
All components are modular, reusable, and follow the Synervion Brand System specifications precisely.
