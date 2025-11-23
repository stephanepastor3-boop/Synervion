# Synervion Brand Photography Guide
## Real Brand Images Integration

**Updated:** October 2025  
**Status:** ✅ Production Images Integrated

---

## 📸 Brand Image Assets

### Available Images

#### Lab & Process Photography

1. **Cordyceps Macro** (`figma:asset/773f0f3eab80b2d368a109a41857ecf81ad5ce3b.png`)
   - **Subject:** Premium lab-grown Cordyceps mushroom structure
   - **Style:** Clean macro photography with warm amber/orange tones
   - **Background:** Soft blue lab environment (blurred)
   - **Usage:** Hero sections, product features, brand showcase
   - **Mood:** Premium, scientific, natural

2. **Founders in Lab** (`figma:asset/32b36bdf713682f59f2a21adcc1622aacfb42039.png`)
   - **Subject:** Two founders in Synervion branded shirts holding culture samples
   - **Setting:** Clean lab environment with culture shelves in background
   - **Colors:** Black Synervion t-shirts, amber culture samples, white lab background
   - **Usage:** Brand System page as team photography example
   - **Mood:** Professional, authentic, transparent

3. **Synervion Team in Lab** (`figma:asset/d29b75326a20067bbdb4aea5abf65721f56bfdf1.png`)
   - **Subject:** Full team photo - 6 team members in Synervion shirts with culture jars
   - **Setting:** Large lab facility with white culture shelving system
   - **Composition:** Wide shot showing team diversity and collaboration
   - **Usage:** About page, team sections, trust-building, recruitment
   - **Mood:** Collaborative, diverse, professional, authentic

4. **Lab Culture Shelves** (`figma:asset/c775a13c0053294f6c49079749daff489bcf7e9c.png`)
   - **Subject:** Laboratory shelving with Cordyceps culture containers
   - **Details:** Multiple rows of culture jars with amber/orange growth
   - **Setting:** Scientific incubation environment
   - **Usage:** Process sections, lab advantage features, scientific credibility
   - **Mood:** Scientific rigor, quality control, precision

5. **Reva Flora Facility** (`figma:asset/b7a58cea13e9c60f5d55a504c1a964049d1f2885.png`)
   - **Subject:** Exterior facility shot - modern research building with Reva Flora Culture branding
   - **Setting:** Landscaped entrance with palm trees, professional architecture
   - **Features:** Synervion and Reva Flora signage visible
   - **Usage:** About page partnership section, facility scale, infrastructure credibility
   - **Mood:** Established, professional, partnership, scale

#### Product Photography

4. **Branded Product Lineup** (`figma:asset/235c8cfec302612638593664d22f1ebaef2f125c.png`)
   - **Subject:** Cordyceps product collection - coffee jar, liquid drops, coffee box, energy bar
   - **Style:** Studio product photography on neutral background
   - **Products Featured:** Adaptogen coffee, liquid shots, coffee box (500mg), energy bar
   - **Usage:** Product benefits, homepage showcase, catalog displays
   - **Mood:** Premium, organized, professional, product diversity

5. **White-Label Packaging Lineup** (`figma:asset/835f58b6f7a1542d23442bb807f17fb0f546dc84.png`)
   - **Subject:** Complete white-label packaging collection with Synervion branding
   - **Formats:** Pouches (white, black, silver), bottles, tubes, bags, kraft box
   - **Style:** Clean product lineup on white background
   - **Usage:** Partnership pages, white-label offerings, B2B presentations
   - **Mood:** Professional, versatile, ready-to-brand

6. **Product Format Mockups** (`figma:asset/64caaa26d31144c1f84af8f8478f8b9a0c9162dc.png`)
   - **Subject:** Comprehensive mockup collection showing all packaging options
   - **Formats:** Energy bar, liquid drops bottle, supplement bottles, pouches, tubes, kraft bag
   - **Featured:** Branded energy bar and liquid shots with mockup templates
   - **Usage:** Partnership page, format options, design templates
   - **Mood:** Comprehensive, flexible, template-ready

---

## 🎨 Photography Style Guidelines

### Visual Characteristics

**Color Palette:**
- Primary: Warm amber/orange (#EE7B2F) from Cordyceps
- Secondary: Lab white, clean backgrounds
- Accents: Soft blue tones, neutral grays
- Avoid: Oversaturated colors, heavy filters

**Composition:**
- Clean, uncluttered backgrounds
- Center-aligned or rule-of-thirds
- High clarity and sharpness
- Natural or clean lighting

**Mood:**
- Scientific professionalism
- Premium quality
- Authentic transparency
- Innovation and precision

---

## 📍 Current Implementation

### Hero Section (`/components/Hero.tsx`)

```tsx
import heroImage from 'figma:asset/773f0f3eab80b2d368a109a41857ecf81ad5ce3b.png';

<img
  src={heroImage}
  alt="Lab-grown Cordyceps macro - premium quality mushroom structure"
  className="w-full h-auto"
/>
```

**Purpose:** Main homepage visual showcasing the premium Cordyceps product  
**Effect:** Immediate visual impact with brand's signature amber color

---

### Product Benefits (`/components/ProductBenefits.tsx`)

```tsx
import productLineup from 'figma:asset/235c8cfec302612638593664d22f1ebaef2f125c.png';

<img
  src={productLineup}
  alt="Synervion Cordyceps product lineup - coffee, liquid drops, energy bars"
  className="w-full h-auto"
/>
```

**Purpose:** Showcase complete product portfolio and diversity  
**Effect:** Visual proof of multiple product formats and applications

---

### Partnership Models (`/components/PartnershipModels.tsx`)

```tsx
import whiteLabelPackaging from 'figma:asset/835f58b6f7a1542d23442bb807f17fb0f546dc84.png';

<img
  src={whiteLabelPackaging}
  alt="Synervion white-label product packaging lineup - pouches, bottles, tubes, bags"
  className="w-full h-auto"
/>
```

**Purpose:** Demonstrate white-label packaging versatility  
**Effect:** Show partnership flexibility and ready-to-brand options

---

### Lab-Grown Advantage (`/components/LabGrownAdvantage.tsx`)

```tsx
import labCultureImage from 'figma:asset/c775a13c0053294f6c49079749daff489bcf7e9c.png';

<img
  src={labCultureImage}
  alt="Lab-grown Cordyceps cultivation shelves with culture containers"
  className="w-full h-auto"
/>
```

**Purpose:** Demonstrate scientific cultivation process and lab infrastructure  
**Effect:** Build trust through visual proof of quality control

---

### About Page (`/pages/AboutPage.tsx`)

```tsx
import teamLabImage from 'figma:asset/d29b75326a20067bbdb4aea5abf65721f56bfdf1.png';
import revaFloraFacility from 'figma:asset/b7a58cea13e9c60f5d55a504c1a964049d1f2885.png';

// Team section - Brand Story
<img src={teamLabImage} alt="Synervion team in lab with Cordyceps culture samples - 6 team members" />

// Reva Flora Partnership section
<img src={revaFloraFacility} alt="Reva Flora Culture - Synervion partner facility" />
```

**Purpose:** Humanize the brand, show team diversity, demonstrate facility scale  
**Effect:** Authenticity, partnership credibility, infrastructure proof

---

### Partnerships Page (`/pages/PartnershipsPage.tsx`)

```tsx
import productMockups from 'figma:asset/64caaa26d31144c1f84af8f8478f8b9a0c9162dc.png';

<img
  src={productMockups}
  alt="Synervion product format options - energy bars, liquid drops, bottles, pouches"
  className="w-full h-auto"
/>
```

**Purpose:** Display comprehensive format options for partnerships  
**Effect:** Visual catalog of available packaging and product types

---

### Brand System Page (`/pages/BrandSystemPage.tsx`)

```tsx
import synervionLogo from 'figma:asset/d57a329f7916753d778b5226e40b6dcb0f6d530b.png';
import cordycepsImage from 'figma:asset/773f0f3eab80b2d368a109a41857ecf81ad5ce3b.png';
import foundersImage from 'figma:asset/32b36bdf713682f59f2a21adcc1622aacfb42039.png';
import teamLabImage from 'figma:asset/d29b75326a20067bbdb4aea5abf65721f56bfdf1.png';
import revaFloraFacility from 'figma:asset/b7a58cea13e9c60f5d55a504c1a964049d1f2885.png';
import labCultureImage from 'figma:asset/c775a13c0053294f6c49079749daff489bcf7e9c.png';
import productLineup from 'figma:asset/235c8cfec302612638593664d22f1ebaef2f125c.png';
import whiteLabelPackaging from 'figma:asset/835f58b6f7a1542d23442bb807f17fb0f546dc84.png';
import productMockups from 'figma:asset/64caaa26d31144c1f84af8f8478f8b9a0c9162dc.png';

// Logo section + Lab photography + Product photography sections
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* All 9 images showcased as brand assets and photography examples */}
</div>
```

**Purpose:** Demonstrate logo usage, photography style guidelines with real examples  
**Effect:** Clear visual reference for brand consistency across all assets and image types

---

## 🎯 Photography Usage Principles

### DO ✅

- **Use macro detail shots** to highlight Cordyceps texture and quality
- **Show clean lab environments** to emphasize scientific rigor
- **Include authentic team photos** to build trust
- **Maintain warm amber tones** consistent with brand color
- **Keep backgrounds minimal** to focus on subject
- **Use natural lighting** for clarity and authenticity
- **Show culture containers and equipment** for scientific credibility

### DON'T ❌

- Avoid stock photos that don't match the lab aesthetic
- Don't use heavily processed or filtered images
- Avoid cluttered or distracting backgrounds
- Don't use images without the signature amber/orange tones
- Avoid generic wellness imagery
- Don't include images that contradict the premium positioning

---

## 📐 Image Treatment Standards

### Responsive Sizing

```tsx
// Standard implementation
<div className="relative rounded-2xl overflow-hidden shadow-2xl">
  <img
    src={brandImage}
    alt="Descriptive alt text"
    className="w-full h-auto"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
</div>
```

**Features:**
- Rounded corners (2xl = 16px)
- Drop shadow for depth
- Optional gradient overlay (20% black from bottom)
- Full width, auto height (maintain aspect ratio)

### Aspect Ratios

- **Hero images:** 16:9 or native (landscape)
- **Feature images:** 4:3 or 16:9
- **Gallery/Portfolio:** 4:3 (standard)
- **Full-bleed sections:** 21:9 (cinematic)

### Hover Effects

```tsx
<img
  className="group-hover:scale-105 transition-transform duration-300"
/>
```

**Subtle zoom on hover** (5% scale) with smooth 300ms transition

---

## 🖼️ Image Optimization

### File Formats

- **Primary:** PNG (provided as Figma assets)
- **Web delivery:** Automatic optimization via Figma Make
- **Quality:** High resolution, minimal compression
- **Loading:** Eager for hero, lazy for below-fold

### Alt Text Standards

**Formula:** `[Subject] - [Context/Quality indicator]`

Examples:
- ✅ "Lab-grown Cordyceps macro - premium quality mushroom structure"
- ✅ "Synervion founders in lab with Cordyceps culture samples"
- ✅ "Lab-grown Cordyceps cultivation shelves with culture containers"

❌ Avoid: "Image", "Photo", "Picture"  
❌ Avoid: Generic descriptions without brand context

---

## 🎬 Future Photography Needs

### Recommended Additional Shots

1. **Product Line:** Individual Cordyceps product shots (bottles, powders, capsules)
2. **Process Details:** Close-up shots of cultivation stages
3. **Lab Equipment:** Scientific instruments in use
4. **Team Collaboration:** Founders working together in lab
5. **Quality Testing:** Lab testing and analysis in progress
6. **Facility Wide:** Broader shots of the lab facility
7. **Packaging:** White-label and branded packaging examples
8. **Partnership Moments:** Meetings, handshakes, collaboration

### Photography Specifications

- **Resolution:** Minimum 1920×1080px (Full HD)
- **Orientation:** Primarily landscape (16:9)
- **Color Profile:** sRGB for web
- **File Size:** < 500KB per image (optimized)
- **Format:** PNG or high-quality JPEG

---

## 📋 Image Inventory

| Image | Filename | Used In | Purpose |
|-------|----------|---------|---------|
| Cordyceps Macro | `773f0f3e...png` | Hero, Brand System | Premium product showcase |
| Founders in Lab | `32b36bdf...png` | Brand System | Team authenticity example |
| **Team in Lab (Full)** | `d29b7532...png` | About, Brand System | Diverse team, collaboration |
| **Reva Flora Facility** | `b7a58cea...png` | About, Brand System | Partnership, infrastructure scale |
| Lab Culture Shelves | `c775a13c...png` | Lab Advantage, Brand System | Scientific process |
| Branded Product Lineup | `235c8cfe...png` | Product Benefits, Brand System | Product diversity showcase |
| White-Label Packaging | `835f58b6...png` | Partnership Models, Brand System | Partnership flexibility |
| Product Format Mockups | `64caaa26...png` | Partnerships Page, Brand System | Format options catalog |

---

## ✅ Implementation Checklist

### Lab & Process Photography
- [x] Import Cordyceps Macro image to Hero and Brand System
- [x] Import Full Team Lab photo to About page (replaced founders)
- [x] Import Reva Flora Facility to About page (partnership section)
- [x] Import Lab Culture Shelves to Lab Advantage section
- [x] Replace all Unsplash lab/science placeholders

### Product Photography
- [x] Import Branded Product Lineup to Product Benefits
- [x] Import White-Label Packaging to Partnership Models
- [x] Import Product Format Mockups to Partnerships Page
- [x] Showcase all product images in Brand System page

### Technical Implementation
- [x] Update all alt text with descriptive, brand-appropriate descriptions
- [x] Apply consistent image treatment (rounded corners, shadows)
- [x] Add gradient overlays where appropriate for text readability
- [x] Implement hover effects for interactivity (scale 105%)
- [x] Add background styling for product shots (gradient backgrounds)
- [x] Ensure responsive sizing on all devices (mobile, tablet, desktop)
- [x] Test image loading performance across all pages

---

## 🎨 Brand Alignment

### How These Images Support Brand Values

**Premium:**  
Clean, high-quality macro photography with professional lighting and composition

**Scientific:**  
Lab environments, culture containers, and scientific equipment visible

**Transparent:**  
Authentic team photos and real facility images (not stock photos)

**Functional:**  
Product shown in context of use and cultivation process

**Indian Innovation:**  
Local team and facility, branded with Synervion identity

---

## 📝 Developer Notes

### Import Syntax

```tsx
// Figma asset imports
import imageName from 'figma:asset/[HASH].png';

// Use in JSX
<img src={imageName} alt="Description" />
```

### Best Practices

1. **Always use descriptive alt text** for accessibility
2. **Apply consistent styling** via Tailwind classes
3. **Use gradient overlays** to improve text readability when text overlays images
4. **Test on all breakpoints** to ensure proper scaling
5. **Lazy load below-fold images** for performance

---

---

## 🎯 Photography Impact Summary

### Lab & Process Photography (5 images)
**Purpose:** Build scientific credibility, transparency, and team authenticity  
**Effect:** Trust-building through authentic facility, team, and partnership imagery

### Product Photography (3 images)
**Purpose:** Showcase product diversity and partnership options  
**Effect:** Sales enablement through comprehensive product visualization

### Total Brand Asset Integration
✅ **8 professional photos** integrated across **8+ components/pages**  
✅ **100% authentic Synervion photography** (zero stock images)  
✅ **Expanded team coverage** with full team photo and facility exterior  
✅ **Consistent visual identity** supporting all brand pillars  
✅ **Complete B2B sales toolkit** with lab, team, product, and packaging imagery

---

**Brand Photography Integration Complete** ✅  
All authentic Synervion photography integrated across Hero, About, Lab Advantage, Product Benefits, Partnership Models, Partnerships Page, and Brand System.

**Version 3.0** | October 2025 | Synervion Complete Photography System
