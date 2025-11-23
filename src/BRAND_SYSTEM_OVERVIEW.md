# Synervion Brand System & Component Library

## 🎨 Complete Design System - Ready for Developer Handoff

### Version 1.0 | October 2025

---

## 📋 Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Grid](#spacing--grid)
5. [Components](#components)
6. [Implementation Guide](#implementation-guide)
7. [Files & Structure](#files--structure)

---

## 🎯 Brand Overview

### Brand Keywords

| Keyword | Description |
|---------|-------------|
| **Premium** | High-quality, refined, exclusive positioning in the wellness market |
| **Scientific** | Data-driven approach, research-backed claims, lab-verified quality |
| **Transparent** | Clear sourcing, traceable processes, honest communication |
| **Functional** | Proven benefits, efficacy-focused formulations, results-driven |
| **Indian Innovation** | Proudly Indian, combining traditional wisdom with modern science |

### Brand Positioning

Synervion is India's premier lab-grown Cordyceps partner for wellness brands, combining cutting-edge biotechnology with sustainable practices to deliver premium functional ingredients with proven health benefits.

---

## 🎨 Color System

### Primary Palette - Cordyceps Amber/Orange

Inspired by the warm, golden tones of Cordyceps mushrooms.

```css
/* Primary Scale */
--synervion-primary-50: 28 100% 95%;   /* #FEF6F0 - Lightest background */
--synervion-primary-100: 28 95% 88%;   /* #FDE8D7 - Subtle background */
--synervion-primary-300: 28 90% 68%;   /* #F9A56B - Hover states */
--synervion-primary-500: 28 85% 58%;   /* #EE7B2F - PRIMARY BRAND COLOR */
--synervion-primary-600: 28 80% 48%;   /* #D15E14 - Hover interactions */
--synervion-primary-700: 28 75% 38%;   /* #A54A0F - Active states */
```

**Usage:**
- `500`: Primary buttons, CTAs, brand highlights
- `600`: Hover states for primary elements
- `50-100`: Backgrounds, subtle accents
- `700`: Active/pressed states

### Secondary Palette - Deep Neutral Gray

Professional gray tones for UI structure and typography.

```css
/* Secondary Scale */
--synervion-secondary-50: 220 13% 95%;   /* #F1F2F3 - Light backgrounds */
--synervion-secondary-100: 220 12% 88%;  /* #DDDFE1 - Borders, dividers */
--synervion-secondary-500: 220 10% 35%;  /* #515A63 - Muted text */
--synervion-secondary-800: 220 13% 18%;  /* #272D35 - DARK BRAND COLOR */
--synervion-secondary-900: 220 15% 12%;  /* #1A1E23 - Darkest elements */
```

**Usage:**
- `800`: Primary text, dark backgrounds, footers
- `500`: Secondary text, muted content
- `50-100`: Subtle backgrounds, surfaces

### Accent Palette - Muted Earth Tones

Natural earth tones for variety and subtle accents.

```css
/* Accent Scale */
--synervion-accent-400: 30 15% 55%;   /* #998A78 - PRIMARY ACCENT */
```

**Usage:**
- Tertiary elements, variety in card designs
- Natural, organic brand associations

### Background Colors

```css
--synervion-bg-white: 0 0% 100%;      /* #FFFFFF - Pure white base */
--synervion-bg-gray-50: 220 8% 98%;   /* #F9FAFB - Subtle surface */
--synervion-bg-gray-100: 220 8% 96%;  /* #F3F4F5 - Light surface */
--synervion-bg-gray-200: 220 8% 92%;  /* #E8EAEB - Medium surface */
```

### Functional Colors

```css
--synervion-success: 142 71% 45%;   /* Success states, positive metrics */
--synervion-warning: 38 92% 50%;    /* Warnings, attention */
--synervion-error: 0 84% 60%;       /* Errors, destructive actions */
--synervion-info: 210 85% 58%;      /* Informational states */
```

---

## ✍️ Typography

### Font Families

**Manrope** - Headings & Display
- Modern, geometric sans-serif
- High legibility at large sizes
- Professional, scientific feel

**Inter** - Body & UI
- Optimized for screen reading
- Excellent legibility at small sizes
- Professional, clean appearance

```css
--synervion-font-heading: 'Manrope', system-ui, -apple-system, sans-serif;
--synervion-font-body: 'Inter', system-ui, -apple-system, sans-serif;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|--------|-------------|----------------|-------|
| **H1** | 64px (4rem) | Bold (700) | 1.2 | -0.02em | Hero headlines |
| **H2** | 48px (3rem) | SemiBold (600) | 1.2 | -0.01em | Section titles |
| **H3** | 32px (2rem) | SemiBold (600) | 1.2 | -0.01em | Subsection titles |
| **H4** | 24px (1.5rem) | SemiBold (600) | 1.3 | 0 | Card headers |
| **H5** | 20px (1.25rem) | Medium (500) | 1.4 | 0 | Component titles |
| **H6** | 18px (1.125rem) | Medium (500) | 1.5 | 0 | Small headers |
| **Body** | 18px (1.125rem) | Regular (400) | 1.7 | 0 | Main content |
| **Body Small** | 16px (1rem) | Regular (400) | 1.6 | 0 | Secondary content |
| **Caption** | 14px (0.875rem) | Regular (400) | 1.5 | 0 | Labels, metadata |
| **Small** | 12px (0.75rem) | Regular (400) | 1.4 | 0 | Fine print |

### Implementation

```css
h1 {
  font-family: var(--synervion-font-heading);
  font-size: var(--synervion-text-h1);
  font-weight: var(--synervion-weight-bold);
  line-height: var(--synervion-leading-tight);
  letter-spacing: var(--synervion-tracking-tight);
}
```

---

## 📐 Spacing & Grid

### Spacing Scale (8px Base)

Built on an 8px base unit for consistent, predictable spacing.

| Value | Token | Usage |
|-------|-------|-------|
| 4px | `--synervion-space-1` | Micro spacing, tight gaps |
| 8px | `--synervion-space-2` | **BASE UNIT**, small gaps |
| 16px | `--synervion-space-4` | Component padding, medium gaps |
| 24px | `--synervion-space-6` | Card spacing, large gaps |
| 32px | `--synervion-space-8` | Section padding |
| 48px | `--synervion-space-12` | Section spacing |
| 64px | `--synervion-space-16` | Large section spacing |
| 96px | `--synervion-space-24` | Hero section spacing |

### Grid System

#### Desktop - 12 Column
```css
.synervion-grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--synervion-space-6); /* 24px */
}
```

**Breakpoint:** 1024px and above  
**Max Width:** 1440px  
**Container Padding:** 64px (4rem)

#### Tablet - 6 Column
```css
.synervion-grid-6 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--synervion-space-4); /* 16px */
}
```

**Breakpoint:** 768px - 1023px  
**Container Padding:** 32px (2rem)

#### Mobile - 4 Column
```css
.synervion-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--synervion-space-4); /* 16px */
}
```

**Breakpoint:** Below 768px  
**Container Padding:** 32px (2rem)

### Border Radius

```css
--synervion-radius-sm: 0.375rem;   /* 6px - Small elements */
--synervion-radius-md: 0.5rem;     /* 8px - Buttons, inputs */
--synervion-radius-lg: 0.75rem;    /* 12px - Cards */
--synervion-radius-xl: 1rem;       /* 16px - Large cards */
--synervion-radius-2xl: 1.5rem;    /* 24px - Hero elements */
--synervion-radius-full: 9999px;   /* Circles, pills */
```

---

## 🧩 Components

### BrandButton

Full-featured button component with variants and states.

**Variants:**
- `primary` - Amber background, white text (main CTAs)
- `secondary` - Dark gray background, white text
- `outline` - Border with transparent background
- `ghost` - No border, subtle hover effect
- `link` - Text-only with underline on hover

**Sizes:**
- `sm` - Height 36px, padding 16px
- `md` - Height 44px, padding 24px (default)
- `lg` - Height 56px, padding 32px
- `icon` - 44px × 44px square

**Usage:**
```tsx
import { BrandButton } from './components/brand/BrandButton';

<BrandButton variant="primary" size="lg">
  Explore Partnerships
  <ArrowRight className="w-4 h-4" />
</BrandButton>
```

### BrandCard

Flexible card component with specialized variants.

**Variants:**

1. **Benefit Card** (`variant="benefit"`)
   - Icon, title, description, metric
   - Used for product benefits, features
   - Hover animation on icon

2. **Partnership Card** (`variant="partnership"`)
   - Large icon, title, description, children
   - Used for partnership models, service offerings
   - Border animation on hover

3. **Metric Card** (`variant="metric"`)
   - Large metric display with label
   - Used for statistics, KPIs
   - Center-aligned, compact

**Usage:**
```tsx
import { BrandCard } from './components/brand/BrandCard';

<BrandCard
  variant="benefit"
  icon={<Zap className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" />}
  title="Energy"
  description="Enhanced ATP production and mitochondrial function"
  metric="42%"
  metricLabel="Energy Increase"
/>
```

### BrandBadge

Status indicators and labels.

**Variants:**
- `primary` - Amber background
- `secondary` - Gray background
- `outline` - Border only
- `success` - Green (verified, positive states)
- `warning` - Yellow (attention needed)
- `error` - Red (errors, destructive)

**Sizes:**
- `sm` - Compact, for inline use
- `md` - Standard size (default)
- `lg` - Large, for emphasis

**Usage:**
```tsx
import { BrandBadge } from './components/brand/BrandBadge';

<BrandBadge variant="primary">Premium</BrandBadge>
<BrandBadge variant="success" size="sm">Verified</BrandBadge>
```

### Navigation Component

Responsive navigation with fixed positioning and scroll effects.

**Features:**
- Sticky header with background blur on scroll
- Desktop: Horizontal navigation with inline links
- Mobile: Hamburger menu (to be implemented)
- Logo with brand icon
- CTA button in navigation

### Footer Component

Comprehensive footer with branding and navigation.

**Structure:**
- Brand logo and tagline
- 4-column link structure (Company, Partnerships, Resources, Legal)
- Social media links
- Copyright and legal links

---

## 🎯 Iconography Guidelines

### Library
**Lucide React** - Modern, consistent icon set

### Specifications
- **Stroke Weight:** 1.5–2px
- **Standard Size:** 24px (w-6 h-6)
- **Large Size:** 32px (w-8 h-8)
- **Style:** Outline/stroke, no fill
- **Color:** Primary amber or contextual

### Recommended Icons

| Category | Icons |
|----------|-------|
| **Benefits** | Zap (energy), Shield (immunity), Heart (vitality), Clock (longevity) |
| **Features** | Leaf (sustainable), Microscope (lab), Award (premium), CheckCircle (verified) |
| **Actions** | ArrowRight, ChevronRight, Download, ExternalLink |
| **Social** | Facebook, Twitter, LinkedIn, Instagram |
| **UI** | Menu, X (close), Search, User |

### Usage Example
```tsx
import { Zap } from 'lucide-react';

<Zap 
  className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" 
  strokeWidth={1.5} 
/>
```

---

## 📷 Imagery Guidelines

### Photography Style

**Subject Matter:**
- Lab-grown Cordyceps macro photography
- Scientific laboratory environments
- Clean product packaging shots
- Wellness lifestyle imagery (subtle)

**Technical Specs:**
- High resolution (minimum 1920px wide)
- Natural lighting preferred
- Shallow depth of field for product shots
- Clean, uncluttered backgrounds

**Color Treatment:**
- Warm amber tones highlighted
- Neutral gray backgrounds
- Lab white surfaces
- Minimal color grading

### Image Ratios

| Context | Ratio | Usage |
|---------|-------|-------|
| Hero | 16:9 or 3:2 | Full-width hero sections |
| Cards | 1:1 or 4:3 | Grid layouts, benefits |
| Feature | 2:1 | Wide feature sections |
| Product | 1:1 | Square product shots |

---

## 💻 Implementation Guide

### Installation

```bash
# Install dependencies
npm install lucide-react motion class-variance-authority clsx tailwind-merge
```

### Font Setup

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Using Design Tokens

**Colors:**
```tsx
className="bg-[hsl(var(--synervion-primary-500))]"
className="text-[hsl(var(--synervion-text-primary))]"
```

**Typography:**
```tsx
style={{ fontFamily: 'var(--synervion-font-heading)' }}
className="text-[var(--synervion-text-h2)]"
```

**Spacing:**
```tsx
className="p-[var(--synervion-space-8)]"
className="gap-[var(--synervion-space-4)]"
```

### Component Import Examples

```tsx
// Button
import { BrandButton } from './components/brand/BrandButton';

// Card
import { BrandCard } from './components/brand/BrandCard';

// Badge
import { BrandBadge } from './components/brand/BrandBadge';

// Icons
import { Zap, Shield, ArrowRight } from 'lucide-react';
```

---

## 📁 Files & Structure

### Directory Structure

```
/
├── styles/
│   └── globals.css                    # All design tokens and base styles
├── components/
│   ├── brand/
│   │   ├── BrandButton.tsx           # Button component
│   │   ├── BrandCard.tsx             # Card variants
│   │   ├── BrandBadge.tsx            # Badge component
│   │   └── README.md                 # Component documentation
│   ├── ui/                           # ShadCN components
│   ├── Navigation.tsx                # Site navigation
│   ├── Footer.tsx                    # Site footer
│   ├── Hero.tsx                      # Homepage hero
│   ├── MissionVision.tsx             # Mission/vision section
│   ├── ProductBenefits.tsx           # Benefits section
│   ├── LabGrownAdvantage.tsx         # Lab-grown advantages
│   ├── PartnershipModels.tsx         # Partnership options
│   └── ContactCTA.tsx                # Contact section
├── App.tsx                           # Main application
├── BrandSystem.tsx                   # Brand system showcase
└── BRAND_SYSTEM_OVERVIEW.md         # This file
```

### Key Files

| File | Purpose |
|------|---------|
| `styles/globals.css` | All CSS variables, design tokens, base styles |
| `components/brand/*` | Reusable brand components |
| `BrandSystem.tsx` | Interactive brand system documentation |
| `BRAND_SYSTEM_OVERVIEW.md` | Complete system reference |

---

## 🚀 Quick Start

### View the Brand System

1. Run the application
2. Click the "View Brand System" button (bottom right)
3. Explore all colors, typography, components, and guidelines

### Use Components

```tsx
import { BrandButton } from './components/brand/BrandButton';
import { BrandCard } from './components/brand/BrandCard';
import { Zap } from 'lucide-react';

function MyComponent() {
  return (
    <div className="synervion-container py-16">
      <BrandCard
        variant="benefit"
        icon={<Zap className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" />}
        title="Energy Boost"
        description="Science-backed energy enhancement"
        metric="42%"
        metricLabel="Improvement"
      />
      
      <BrandButton variant="primary" size="lg">
        Get Started
      </BrandButton>
    </div>
  );
}
```

---

## 📊 Design System Metrics

- **Colors:** 40+ semantic tokens
- **Typography:** 8 text styles, 2 font families
- **Spacing:** 12 spacing tokens (4px–128px)
- **Components:** 3 brand components + 40+ ShadCN UI components
- **Icons:** 100+ from Lucide React library
- **Grid:** 3 responsive breakpoints

---

## 📝 Version History

**v1.0** - October 2025
- Initial brand system release
- Complete color palette
- Typography system
- Core components
- Comprehensive documentation

---

## 👥 Team & Contacts

**Design System Owner:** Synervion Design Team  
**Developer Contact:** [Contact Information]  
**Figma Source:** Low Resolution Presentation Synervion

---

## 📄 License

Proprietary - For Synervion internal use only

---

## 🎓 Additional Resources

- **Component Library:** `/BrandSystem.tsx` - Interactive showcase
- **Component Docs:** `/components/brand/README.md`
- **Usage Examples:** See homepage implementation in `App.tsx`

---

**Ready for production use and developer handoff ✅**
