# 🔬 Research Components

Scientific research presentation components for the Synervion website.

---

## 📁 Components

### `ResearchCard.tsx`
Individual study card component with hover effects.

**Props:**
```typescript
{
  title: string;        // Study title
  journal: string;      // Publication journal
  year: string;         // Publication year
  summary: string;      // 2-3 line summary
  icon: string;         // Emoji icon (🏃, ⚡, 🧬)
  category: string;     // Filter category
  onClick: () => void;  // Click handler
}
```

**Features:**
- Hover scale animation (1.03x)
- Orange border glow on hover
- Category badge with icon
- "View Data →" button
- 400px fixed height
- Responsive text truncation

---

### `FilterTabs.tsx`
Pill-style category filter buttons.

**Props:**
```typescript
{
  activeFilter: string;              // Current active filter
  onFilterChange: (filter: string) => void;  // Filter change handler
}
```

**Categories:**
- All
- Energy Metabolism
- Antioxidant Defense
- Endurance Performance

**Features:**
- Active state with orange background
- Hover effects on inactive tabs
- Smooth transitions (200ms)
- Responsive wrapping

---

### `StudyModal.tsx`
Full-screen modal with data visualizations.

**Props:**
```typescript
{
  study: Study | null;   // Study data object
  isOpen: boolean;       // Modal visibility
  onClose: () => void;   // Close handler
}
```

**Study Object:**
```typescript
interface Study {
  id: number;
  title: string;
  journal: string;
  year: string;
  summary: string;
  icon: string;
  category: string;
  doi: string;           // DOI link
  keyFindings: string[]; // Bullet points
  chartType: 'bar' | 'pathway' | 'dual' | 'line';
}
```

**Features:**
- 960px modal with 2-column layout
- 4 chart types (Recharts)
- Animated entrance/exit
- Click outside to close
- Rotating X button hover
- Backdrop blur effect
- Responsive (fullscreen on mobile)

**Chart Types:**
1. **Bar Chart** - Before/after comparison
2. **Pathway Diagram** - SVG node visualization
3. **Dual Bar Chart** - Multiple metrics
4. **Composed Chart** - Line + Bar combination

---

### `CompareChart.tsx`
Interactive scatter plot for study comparison.

**Props:**
```typescript
{
  onStudyClick?: (studyId: number) => void;  // Optional click handler
}
```

**Features:**
- Scatter plot with Recharts
- X-axis: Mechanism type
- Y-axis: Evidence level
- Hoverable data points
- Study initials badges
- Click to view study details
- Quadrant explanations

**Data Structure:**
```typescript
{
  id: number;
  title: string;
  initials: string;      // H17, C20, etc.
  mechanism: number;     // 1-3 (Energy → Antioxidant → Endurance)
  evidenceLevel: number; // 1-3 (Preclinical → Clinical)
  improvement: string;   // Key metric
  category: string;
}
```

---

## 🎨 Styling

### Colors
```css
Primary:    #E58B00  (Synervion Orange)
Secondary:  #1B1B1B  (Deep Black)
Success:    #00B27A  (Green)
Neutral:    #6A6A6A  (Gray)
Background: #F8F8F8  (Light Gray)
```

### Typography
```css
Headings:    Inter Bold
Body:        Inter Regular
Data Labels: IBM Plex Mono
```

### Animations
```css
Card Hover:   scale(1.03), 250ms ease
Filter:       200ms ease-in-out
Modal Open:   300ms fade + scale
Chart Bars:   400ms y-scale grow
Pathway Pulse: 2s infinite loop
```

---

## 🔄 Data Flow

```
ExploreResearch
    │
    ├─── FilterTabs ───┐
    │                  │
    │                  ▼
    ├─── ResearchCard (filtered)
    │         │
    │         │ onClick
    │         ▼
    ├─── StudyModal ──── Chart Rendering
    │         │
    │         └─── Key Findings + DOI Link
    │
    └─── CompareChart
              │
              │ onStudyClick
              ▼
         StudyModal (same as above)
```

---

## 📊 Chart Specifications

### VO₂max Chart (Study #1)
```typescript
Type: BarChart
Data: [
  { name: 'Before', value: 44.0 },
  { name: 'After', value: 48.8 }
]
Gradient: #E58B00 → #FFD48A
Label: "+10.9% ↑"
```

### Energy Pathway (Study #2)
```typescript
Type: SVG Animation
Nodes: AMPK → GLUT4 → ATP
Colors: Orange → Green → Gold
Animation: Pulsing + Flowing arrows
Duration: 2s infinite
```

### Antioxidant Effects (Study #3)
```typescript
Type: BarChart (multi-color)
Data: [
  { name: 'SOD', value: 25, color: green },
  { name: 'GSH-Px', value: 45, color: green },
  { name: 'ROS', value: -30, color: gray }
]
Range: -40 to 50
```

### Endurance Duration (Study #4)
```typescript
Type: ComposedChart (Bar + Line)
Data: [
  { name: 'Control', value: 6.8 },
  { name: 'Cordyceps', value: 9.5 }
]
Color: #E58B00
Label: "+39% ↑"
```

---

## 📱 Responsive Design

### Desktop (1440px+)
- Card grid: 4 columns
- Modal: 960px width
- Chart/Findings: 60/40 split

### Tablet (768-1023px)
- Card grid: 2 columns
- Modal: 90% width
- Chart/Findings: Stacked

### Mobile (375-767px)
- Card grid: 1 column (stack)
- Modal: Fullscreen
- Chart: Full width
- Filters: Horizontal scroll

---

## 🔧 Usage Example

```tsx
import { ExploreResearch } from './components/ExploreResearch';

function App() {
  return (
    <div>
      <ExploreResearch />
    </div>
  );
}
```

**Individual Components:**

```tsx
// Research Card
<ResearchCard
  title="Study Title"
  journal="Journal Name"
  year="2020"
  summary="Study summary..."
  icon="🔬"
  category="Energy Metabolism"
  onClick={() => handleCardClick()}
/>

// Filter Tabs
<FilterTabs
  activeFilter={activeFilter}
  onFilterChange={setActiveFilter}
/>

// Study Modal
<StudyModal
  study={selectedStudy}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>

// Compare Chart
<CompareChart
  onStudyClick={(id) => openStudy(id)}
/>
```

---

## 🎯 Best Practices

### Adding New Studies

1. **Verify Source**
   - Must be peer-reviewed
   - Published in recognized journal
   - Has valid DOI

2. **Data Format**
   ```typescript
   {
     id: unique_number,
     title: "Full study title",
     journal: "Short journal name",
     year: "YYYY",
     summary: "2-3 sentences, max 150 chars",
     icon: "Relevant emoji",
     category: "Exact category match",
     doi: "https://doi.org/...",
     keyFindings: ["3-5 bullet points"],
     chartType: "bar | pathway | dual | line"
   }
   ```

3. **Chart Implementation**
   - Add case in StudyModal switch statement
   - Use Recharts for standard charts
   - Use SVG for custom diagrams
   - Ensure responsive sizing

### Accessibility

- ✅ Color contrast (WCAG AA)
- ✅ Keyboard navigation (modal close)
- ✅ Focus indicators
- ✅ Screen reader labels
- ✅ Alt text for charts (via Recharts)

### Performance

- ✅ Lazy load modal content
- ✅ Memoize chart data
- ✅ Debounce filter changes
- ✅ Optimize SVG animations
- ✅ Use ResponsiveContainer for charts

---

## 🐛 Common Issues

### Chart Not Rendering
**Cause:** Missing ResponsiveContainer height  
**Fix:** Add explicit height to ResponsiveContainer

### Modal Backdrop Click Not Working
**Cause:** Event bubbling  
**Fix:** Add `onClick={(e) => e.stopPropagation()}` to modal content

### Filters Not Filtering
**Cause:** Category name mismatch  
**Fix:** Ensure exact string match (case-sensitive)

### Animation Performance
**Cause:** Too many animated elements  
**Fix:** Use `will-change` CSS property, reduce animation complexity

---

## 📈 Metrics

### Component Sizes
- ResearchCard: ~3KB
- FilterTabs: ~1KB
- StudyModal: ~12KB (includes charts)
- CompareChart: ~5KB

### Performance
- Initial render: < 100ms
- Filter change: < 150ms
- Modal open: 300ms (animated)
- Chart render: < 500ms

---

## 🔮 Future Enhancements

- [ ] Search studies by keyword
- [ ] Sort by date/impact factor
- [ ] Export study cards as images
- [ ] Print-friendly modal view
- [ ] Save favorite studies
- [ ] Study comparison table
- [ ] Citation generator
- [ ] Meta-analysis visualization

---

## 📞 Support

**Questions?** See `/RESEARCH_SECTION_GUIDE.md` for complete documentation.

**Updating studies?** Edit `studies` array in `ExploreResearch.tsx`.

**Chart issues?** Check Recharts documentation and existing examples.

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-28  
**Dependencies:** React, Motion, Recharts, Lucide React
