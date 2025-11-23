# Synervion Brand System Documentation

## Overview

Complete design system and component library for Synervion, the premium lab-grown Cordyceps wellness brand.

## Brand Keywords

- **Premium** - High-quality, refined, exclusive positioning
- **Scientific** - Data-driven, research-backed, lab-verified
- **Transparent** - Clear sourcing, traceable processes, honest
- **Functional** - Proven benefits, efficacy-focused, results-driven
- **Indian Innovation** - Proudly Indian, globally competitive

---

## Color System

### Primary - Cordyceps Amber/Orange

The warm amber tone inspired by Cordyceps mushrooms. Use for primary actions, highlights, and brand elements.

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--synervion-primary-50` | 28 100% 95% | #FEF6F0 | Lightest backgrounds |
| `--synervion-primary-500` | 28 85% 58% | #EE7B2F | **PRIMARY BRAND** |
| `--synervion-primary-600` | 28 80% 48% | #D15E14 | Hover states |
| `--synervion-primary-700` | 28 75% 38% | #A54A0F | Active states |

### Secondary - Deep Neutral Gray

Professional gray tones for text, backgrounds, and UI elements.

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--synervion-secondary-50` | 220 13% 95% | #F1F2F3 | Light backgrounds |
| `--synervion-secondary-500` | 220 10% 35% | #515A63 | Muted text |
| `--synervion-secondary-800` | 220 13% 18% | #272D35 | **DARK BRAND** |

### Accent - Muted Earth

Natural earth tones for subtle accents and variety.

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--synervion-accent-400` | 30 15% 55% | #998A78 | **PRIMARY ACCENT** |

### Background Colors

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--synervion-bg-white` | 0 0% 100% | #FFFFFF | Pure white base |
| `--synervion-bg-gray-50` | 220 8% 98% | #F9FAFB | Subtle surface |
| `--synervion-bg-gray-100` | 220 8% 96% | #F3F4F5 | Light surface |

---

## Typography

### Font Families

- **Manrope**: Headings and display text
- **Inter**: Body text and UI elements

### Type Scale

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 64px | Bold (700) | 1.2 | Hero headlines |
| H2 | 48px | SemiBold (600) | 1.2 | Section titles |
| H3 | 32px | SemiBold (600) | 1.2 | Card headers |
| H4 | 24px | SemiBold (600) | 1.3 | Component titles |
| Body | 18px | Regular (400) | 1.7 | Main content |
| Caption | 14px | Regular (400) | 1.5 | Labels, metadata |

### Implementation

```css
h1 {
  font-family: var(--synervion-font-heading);
  font-size: var(--synervion-text-h1);
  font-weight: var(--synervion-weight-bold);
  line-height: var(--synervion-leading-tight);
}
```

---

## Spacing System

8px base unit with consistent scaling.

| Value | Token | Usage |
|-------|-------|-------|
| 4px | `--synervion-space-1` | Micro spacing |
| 8px | `--synervion-space-2` | Base unit |
| 16px | `--synervion-space-4` | Small gaps |
| 32px | `--synervion-space-8` | Large gaps |
| 64px | `--synervion-space-16` | Section spacing |

---

## Grid System

### Desktop - 12 Column
```css
.synervion-grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--synervion-space-6);
}
```

### Tablet - 6 Column
```css
.synervion-grid-6 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--synervion-space-4);
}
```

### Mobile - 4 Column
```css
.synervion-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--synervion-space-4);
}
```

---

## Components

### BrandButton

```tsx
import { BrandButton } from './components/brand/BrandButton';

// Primary button
<BrandButton variant="primary" size="lg">
  Explore Partnerships
</BrandButton>

// Variants
<BrandButton variant="primary">Primary</BrandButton>
<BrandButton variant="secondary">Secondary</BrandButton>
<BrandButton variant="outline">Outline</BrandButton>
<BrandButton variant="ghost">Ghost</BrandButton>
<BrandButton variant="link">Link</BrandButton>

// Sizes
<BrandButton size="sm">Small</BrandButton>
<BrandButton size="md">Medium</BrandButton>
<BrandButton size="lg">Large</BrandButton>
<BrandButton size="icon"><Icon /></BrandButton>
```

### BrandCard

```tsx
import { BrandCard } from './components/brand/BrandCard';

// Benefit card
<BrandCard
  variant="benefit"
  icon={<Icon />}
  title="Energy"
  description="Enhanced ATP production"
  metric="42%"
  metricLabel="Energy Increase"
/>

// Partnership card
<BrandCard
  variant="partnership"
  icon={<Icon />}
  title="White-Label"
  description="Ready-to-market products"
>
  <Button>Learn More</Button>
</BrandCard>

// Metric card
<BrandCard
  variant="metric"
  metric="99.8%"
  metricLabel="Purity Rate"
/>
```

### BrandBadge

```tsx
import { BrandBadge } from './components/brand/BrandBadge';

<BrandBadge variant="primary">Premium</BrandBadge>
<BrandBadge variant="success">Verified</BrandBadge>
<BrandBadge variant="outline" size="sm">New</BrandBadge>
```

---

## Iconography

### Guidelines

- **Library**: Lucide React
- **Stroke Weight**: 1.5–2px
- **Sizes**: 24px (standard), 32px (large)
- **Style**: Duotone outline, minimal
- **Colors**: Primary amber or contextual

### Implementation

```tsx
import { Zap, Shield, Microscope } from 'lucide-react';

<Zap className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
```

### Recommended Icons

- **Energy**: Zap
- **Immunity**: Shield
- **Sustainable**: Leaf
- **Lab-Grown**: Microscope
- **Premium**: Award
- **Partnership**: Package, Handshake
- **Navigation**: ArrowRight, ChevronRight

---

## Imagery Guidelines

### Photography Style

- **Subject**: Cordyceps macros, lab environments, clean product shots
- **Tone**: Scientific, premium, transparent
- **Treatment**: Natural lighting, shallow depth of field, clean backgrounds
- **Colors**: Warm ambers, neutral grays, lab whites

### Image Ratios

- **Hero**: 16:9 or 3:2
- **Cards**: 1:1 or 4:3
- **Feature**: 2:1

---

## Usage Examples

### Hero Section

```tsx
<section className="py-24 bg-gradient-to-br from-white to-[hsl(var(--synervion-bg-gray-100))]">
  <div className="synervion-container">
    <BrandBadge variant="primary" className="mb-6">
      Lab-Grown Excellence
    </BrandBadge>
    <h1 className="mb-6">
      The <span className="text-[hsl(var(--synervion-primary-500))]">Cordyceps</span> Partner
    </h1>
    <p className="text-[hsl(var(--synervion-text-secondary))] mb-8">
      Science-backed wellness solutions
    </p>
    <BrandButton variant="primary" size="lg">
      Get Started
    </BrandButton>
  </div>
</section>
```

### Card Grid

```tsx
<div className="grid md:grid-cols-3 gap-6">
  <BrandCard
    variant="benefit"
    icon={<Zap className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" />}
    title="Energy"
    description="Enhanced ATP production"
    metric="42%"
    metricLabel="Improvement"
  />
  {/* More cards... */}
</div>
```

---

## Developer Handoff

### File Structure

```
/styles
  └── globals.css          # Design tokens and global styles

/components
  /brand
    ├── BrandButton.tsx    # Button component
    ├── BrandCard.tsx      # Card variants
    ├── BrandBadge.tsx     # Badge component
    └── README.md          # This file
  /ui
    └── ...                # ShadCN components
```

### Dependencies

- **Tailwind CSS**: v4.0
- **Lucide React**: Latest
- **Motion/React**: Latest
- **class-variance-authority**: For component variants
- **clsx + tailwind-merge**: For className utilities

### Installation

```bash
npm install lucide-react motion class-variance-authority clsx tailwind-merge
```

### Import Fonts

Add to your HTML head:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Version

**v1.0** - October 2025

## Maintainers

Synervion Design Team

## License

Proprietary - For Synervion use only
