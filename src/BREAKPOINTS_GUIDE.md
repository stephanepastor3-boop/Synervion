# Synervion Responsive Breakpoints Quick Reference

## Tailwind Breakpoint System

```css
/* Mobile First Approach */
default:  < 640px   (Mobile)
sm:       640px+    (Large Mobile)
md:       768px+    (Tablet)
lg:       1024px+   (Desktop)
xl:       1280px+   (Large Desktop)
2xl:      1440px+   (Extra Large)
```

---

## Synervion Target Sizes

| Device | Width | Padding | Grid | Typography (H1) |
|--------|-------|---------|------|-----------------|
| **Mobile** | 390px | 16px (px-4) | 4-col | 32-40px |
| **Tablet** | 768px | 32px (px-8) | 6-col | 48px |
| **Desktop** | 1440px | 64px (px-16) | 12-col | 64px |

---

## Common Responsive Patterns

### Container Width
```tsx
className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16"
```

### Section Padding (Vertical)
```tsx
className="py-12 sm:py-16 lg:py-24"
// Mobile: 48px | Tablet: 64px | Desktop: 96px
```

### Typography
```tsx
// H1 Responsive
className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
// 32px → 36px → 48px → 64px

// H2 Responsive  
className="text-2xl sm:text-3xl lg:text-4xl"
// 24px → 28px → 32px

// Body Responsive
className="text-sm sm:text-base lg:text-lg"
// 14px → 16px → 18px
```

### Grid Layouts
```tsx
// 4 Columns → 2 → 1
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"

// 3 Columns → 2 → 1
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// 2 Columns → 1
className="grid lg:grid-cols-2 gap-8 lg:gap-16"
```

### Flexbox Layouts
```tsx
// Stack on mobile, row on desktop
className="flex flex-col sm:flex-row gap-4"

// Reverse order
className="flex flex-col-reverse lg:flex-row"
```

### Spacing & Gaps
```tsx
// Responsive gaps
className="gap-3 sm:gap-4 lg:gap-6"
// 12px → 16px → 24px

// Responsive margin
className="mb-4 sm:mb-6 lg:mb-8"
// 16px → 24px → 32px
```

### Element Sizing
```tsx
// Icon sizes
className="w-5 h-5 sm:w-6 sm:h-6"

// Button padding
className="px-4 py-2 sm:px-6 sm:py-3"

// Card padding
className="p-4 sm:p-6 lg:p-8"
```

### Visibility Controls
```tsx
// Hide on mobile, show on desktop
className="hidden md:block"

// Show on mobile, hide on desktop
className="block md:hidden"

// Different at each breakpoint
className="hidden sm:flex lg:grid"
```

### Button Widths
```tsx
// Full width mobile, auto desktop
className="w-full sm:w-auto"

// Fixed width mobile, flexible desktop
className="w-full sm:w-48 lg:w-auto"
```

---

## Page-Specific Breakpoints

### Homepage Hero
```tsx
// Container
className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20"

// Heading
className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"

// Feature Grid
className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"

// CTA Buttons
className="flex flex-col sm:flex-row gap-3 sm:gap-4"
```

### About Page
```tsx
// Value Cards
className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"

// Timeline
className="hidden sm:block" // Desktop timeline line
className="flex flex-col sm:flex-row" // Timeline items

// Certifications
className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
```

### Partnerships Page
```tsx
// Partnership Cards
className="grid lg:grid-cols-3 gap-6 sm:gap-8"

// Quick Stats
className="grid grid-cols-2 md:grid-cols-4 gap-4"

// Process Steps
className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"

// Form Layout
className="grid lg:grid-cols-2 gap-8 lg:gap-16"
```

### Contact Page
```tsx
// Contact Methods
className="grid md:grid-cols-3 gap-6 sm:gap-8"

// Journey Steps
className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"

// Form Grid
className="grid sm:grid-cols-2 gap-4 sm:gap-6"

// Office Locations
className="space-y-4" // Stacked at all sizes
```

---

## Navigation Breakpoints

### Desktop Navigation
```tsx
className="hidden md:flex" // Show from tablet up
```

### Mobile Navigation
```tsx
className="md:hidden" // Show only on mobile
className="fixed top-16 sm:top-20" // Adjust for nav height
```

---

## Footer Breakpoints

### Grid Layout
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12"
```

### Bottom Bar
```tsx
className="flex flex-col md:flex-row justify-between items-center gap-4"
```

---

## Form Breakpoints

### Input Groups
```tsx
<div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
  <Input /> {/* Full width mobile, half desktop */}
  <Input />
</div>
```

### Submit Buttons
```tsx
className="w-full group" // Always full width in forms
```

---

## Image Breakpoints

### Responsive Images
```tsx
className="w-full h-auto"
```

### Floating Cards
```tsx
className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8"
```

---

## Testing Viewports

### Chrome DevTools Presets
- Mobile S: 320px
- Mobile M: 375px
- Mobile L: 425px
- Tablet: 768px
- Laptop: 1024px
- Laptop L: 1440px

### Recommended Test Sizes
- **390px** - iPhone 12/13/14
- **768px** - iPad Portrait
- **1024px** - iPad Landscape / Small Laptop
- **1440px** - Standard Desktop

---

## Common Issues & Solutions

### Issue: Text Overflow
```tsx
// Add word break
className="break-words"

// Truncate with ellipsis
className="truncate"

// Allow wrapping
className="whitespace-normal"
```

### Issue: Horizontal Scroll
```tsx
// Prevent overflow
className="overflow-x-hidden"

// Check container widths
className="max-w-full"
```

### Issue: Touch Targets Too Small
```tsx
// Minimum 44px × 44px
className="min-h-[44px] min-w-[44px]"

// Add padding
className="p-3 sm:p-4" // 12px → 16px
```

### Issue: Images Stretching
```tsx
// Maintain aspect ratio
className="object-cover"
className="object-contain"

// Set max width
className="max-w-full h-auto"
```

---

## Performance Tips

### Lazy Loading
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }} // Only animate once
>
```

### Conditional Rendering
```tsx
// Load different components at breakpoints
{isMobile ? <MobileComponent /> : <DesktopComponent />}
```

### Image Optimization
```tsx
// Use appropriate sizes
<img 
  srcSet="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

---

## Accessibility at All Sizes

### Focus States
```tsx
className="focus:outline-none focus:ring-2 focus:ring-[hsl(var(--synervion-primary-500))]"
```

### Skip Links
```tsx
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### Font Sizing
```tsx
// Never use px for font sizes in inline styles
// Always use rem or responsive classes
className="text-base" // 1rem = 16px by default
```

---

## Quick Copy-Paste Snippets

### Responsive Section
```tsx
<section className="py-12 sm:py-16 lg:py-24 bg-white">
  <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
    <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl">
      Section Title
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Content */}
    </div>
  </div>
</section>
```

### Responsive Card
```tsx
<div className="p-6 sm:p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] hover:shadow-xl transition-all">
  <h3 className="mb-3 text-lg sm:text-xl">Card Title</h3>
  <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))]">
    Card content
  </p>
</div>
```

### Responsive Image Section
```tsx
<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
  <div className="order-2 lg:order-1">
    {/* Text content */}
  </div>
  <div className="order-1 lg:order-2">
    <img src="..." className="w-full h-auto rounded-2xl" />
  </div>
</div>
```

---

**Version:** 1.0  
**For:** Synervion Website Redesign  
**Updated:** October 2025
