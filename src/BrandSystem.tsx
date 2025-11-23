import { useState } from 'react';
import { BrandButton } from './components/brand/BrandButton';
import { BrandCard } from './components/brand/BrandCard';
import { BrandBadge } from './components/brand/BrandBadge';
import { 
  Copy, Check, Zap, Shield, Package, ArrowRight, 
  Leaf, Microscope, Award, Menu, X, Download, ChevronRight,
  Heart, Clock, TrendingUp, Users, Globe, Code
} from 'lucide-react';

export default function BrandSystem() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const sections = [
    { id: 'overview', label: 'Brand Overview' },
    { id: 'colors', label: 'Color System' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing & Grid' },
    { id: 'components', label: 'Components' },
    { id: 'imagery', label: 'Imagery & Icons' },
    { id: 'documentation', label: 'Documentation' },
  ];

  const brandKeywords = [
    {
      keyword: 'Premium',
      description: 'High-quality, refined, and exclusive positioning in the wellness market',
      color: 'text-[hsl(var(--synervion-primary-500))]',
      icon: Award,
    },
    {
      keyword: 'Scientific',
      description: 'Data-driven approach, research-backed claims, lab-verified quality',
      color: 'text-[hsl(var(--synervion-primary-500))]',
      icon: Microscope,
    },
    {
      keyword: 'Transparent',
      description: 'Clear sourcing, traceable processes, honest communication',
      color: 'text-[hsl(var(--synervion-primary-500))]',
      icon: Globe,
    },
    {
      keyword: 'Functional',
      description: 'Proven benefits, efficacy-focused formulations, results-driven',
      color: 'text-[hsl(var(--synervion-primary-500))]',
      icon: Zap,
    },
    {
      keyword: 'Indian Innovation',
      description: 'Proudly Indian, combining traditional wisdom with modern biotechnology',
      color: 'text-[hsl(var(--synervion-primary-500))]',
      icon: TrendingUp,
    },
  ];

  const colorSystem = {
    'Primary - Cordyceps Amber/Orange': {
      description: 'Warm amber tones inspired by Cordyceps mushrooms. Use for primary actions, brand highlights, and key interactions.',
      usage: 'Primary CTAs, hover states, brand accents, active elements',
      colors: [
        { name: '50', hsl: '28 100% 95%', hex: '#FEF6F0', var: '--synervion-primary-50', usage: 'Lightest backgrounds, subtle highlights' },
        { name: '100', hsl: '28 95% 88%', hex: '#FDE8D7', var: '--synervion-primary-100', usage: 'Card backgrounds, hover states' },
        { name: '300', hsl: '28 90% 68%', hex: '#F9A56B', var: '--synervion-primary-300', usage: 'Lighter interactive states' },
        { name: '500', hsl: '28 85% 58%', hex: '#EE7B2F', var: '--synervion-primary-500', usage: '★ PRIMARY BRAND COLOR' },
        { name: '600', hsl: '28 80% 48%', hex: '#D15E14', var: '--synervion-primary-600', usage: 'Hover on primary buttons' },
        { name: '700', hsl: '28 75% 38%', hex: '#A54A0F', var: '--synervion-primary-700', usage: 'Active/pressed states' },
      ],
    },
    'Secondary - Deep Neutral Gray': {
      description: 'Professional gray tones for text, backgrounds, and UI structure. Creates scientific, premium feel.',
      usage: 'Text hierarchy, borders, backgrounds, footer',
      colors: [
        { name: '50', hsl: '220 13% 95%', hex: '#F1F2F3', var: '--synervion-secondary-50', usage: 'Light backgrounds' },
        { name: '100', hsl: '220 12% 88%', hex: '#DDDFE1', var: '--synervion-secondary-100', usage: 'Borders, dividers' },
        { name: '500', hsl: '220 10% 35%', hex: '#515A63', var: '--synervion-secondary-500', usage: 'Muted text, secondary content' },
        { name: '800', hsl: '220 13% 18%', hex: '#272D35', var: '--synervion-secondary-800', usage: '★ DARK BRAND COLOR' },
        { name: '900', hsl: '220 15% 12%', hex: '#1A1E23', var: '--synervion-secondary-900', usage: 'Darkest elements' },
      ],
    },
    'Accent - Muted Earth Tones': {
      description: 'Natural earth tones for subtle accents and variety. Connects to organic, sustainable positioning.',
      usage: 'Tertiary elements, badges, subtle backgrounds',
      colors: [
        { name: '100', hsl: '30 18% 88%', hex: '#E6E0D9', var: '--synervion-accent-100', usage: 'Subtle accent backgrounds' },
        { name: '400', hsl: '30 15% 55%', hex: '#998A78', var: '--synervion-accent-400', usage: '★ PRIMARY ACCENT' },
        { name: '700', hsl: '30 17% 25%', hex: '#4A4137', var: '--synervion-accent-700', usage: 'Dark accent elements' },
      ],
    },
    'Background - Lab White & Surfaces': {
      description: 'Clean, clinical whites and subtle grays for backgrounds. Reinforces lab-grown, scientific positioning.',
      usage: 'Page backgrounds, card surfaces, sections',
      colors: [
        { name: 'White', hsl: '0 0% 100%', hex: '#FFFFFF', var: '--synervion-bg-white', usage: '★ Pure white base' },
        { name: 'Gray 50', hsl: '220 8% 98%', hex: '#F9FAFB', var: '--synervion-bg-gray-50', usage: 'Subtle surface' },
        { name: 'Gray 100', hsl: '220 8% 96%', hex: '#F3F4F5', var: '--synervion-bg-gray-100', usage: 'Light surface' },
        { name: 'Gray 200', hsl: '220 8% 92%', hex: '#E8EAEB', var: '--synervion-bg-gray-200', usage: 'Medium surface' },
      ],
    },
    'Text Colors': {
      description: 'Text hierarchy for optimal readability and visual hierarchy across all content.',
      usage: 'All text content, labels, captions',
      colors: [
        { name: 'Primary', hsl: '220 13% 18%', hex: '#272D35', var: '--synervion-text-primary', usage: '★ Main text, headings' },
        { name: 'Secondary', hsl: '220 10% 35%', hex: '#515A63', var: '--synervion-text-secondary', usage: 'Body text, descriptions' },
        { name: 'Tertiary', hsl: '220 8% 55%', hex: '#808A94', var: '--synervion-text-tertiary', usage: 'Captions, metadata' },
        { name: 'Inverse', hsl: '0 0% 100%', hex: '#FFFFFF', var: '--synervion-text-inverse', usage: 'Text on dark backgrounds' },
      ],
    },
  };

  const typographyScale = [
    {
      name: 'H1 - Hero Headlines',
      size: '64px',
      rem: '4rem',
      weight: 'Bold (700)',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      family: 'Manrope',
      usage: 'Main hero headlines, primary page titles',
      cssVar: '--synervion-text-h1',
      example: 'The Cordyceps Partner',
    },
    {
      name: 'H2 - Section Titles',
      size: '48px',
      rem: '3rem',
      weight: 'SemiBold (600)',
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
      family: 'Manrope',
      usage: 'Section headings, major subsections',
      cssVar: '--synervion-text-h2',
      example: 'Partnership Models',
    },
    {
      name: 'H3 - Subsection Headers',
      size: '32px',
      rem: '2rem',
      weight: 'SemiBold (600)',
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
      family: 'Manrope',
      usage: 'Card headers, feature titles',
      cssVar: '--synervion-text-h3',
      example: 'Lab-Grown Advantage',
    },
    {
      name: 'H4 - Component Titles',
      size: '24px',
      rem: '1.5rem',
      weight: 'SemiBold (600)',
      lineHeight: '1.3',
      letterSpacing: '0',
      family: 'Manrope',
      usage: 'Card titles, component headings',
      cssVar: '--synervion-text-h4',
      example: 'Energy Enhancement',
    },
    {
      name: 'Body - Main Content',
      size: '18px',
      rem: '1.125rem',
      weight: 'Regular (400)',
      lineHeight: '1.7',
      letterSpacing: '0',
      family: 'Inter',
      usage: 'Primary body text, descriptions',
      cssVar: '--synervion-text-body',
      example: 'Science-backed wellness solutions for modern brands.',
    },
    {
      name: 'Body Small - Secondary',
      size: '16px',
      rem: '1rem',
      weight: 'Regular (400)',
      lineHeight: '1.6',
      letterSpacing: '0',
      family: 'Inter',
      usage: 'Secondary content, supporting text',
      cssVar: '--synervion-text-body-sm',
      example: 'Supporting information and secondary details.',
    },
    {
      name: 'Caption - Labels',
      size: '14px',
      rem: '0.875rem',
      weight: 'Regular (400)',
      lineHeight: '1.5',
      letterSpacing: '0',
      family: 'Inter',
      usage: 'Labels, metadata, small text',
      cssVar: '--synervion-text-caption',
      example: 'Category Label • Metadata',
    },
    {
      name: 'Small - Fine Print',
      size: '12px',
      rem: '0.75rem',
      weight: 'Regular (400)',
      lineHeight: '1.4',
      letterSpacing: '0',
      family: 'Inter',
      usage: 'Legal text, fine print',
      cssVar: '--synervion-text-small',
      example: 'Legal disclaimer and terms',
    },
  ];

  const spacingScale = [
    { value: '4px', rem: '0.25rem', token: '--synervion-space-1', usage: 'Micro spacing between tight elements' },
    { value: '8px', rem: '0.5rem', token: '--synervion-space-2', usage: '★ BASE UNIT - foundation of spacing' },
    { value: '12px', rem: '0.75rem', token: '--synervion-space-3', usage: 'Compact element spacing' },
    { value: '16px', rem: '1rem', token: '--synervion-space-4', usage: 'Small gaps, component padding' },
    { value: '24px', rem: '1.5rem', token: '--synervion-space-6', usage: 'Medium gaps, card spacing' },
    { value: '32px', rem: '2rem', token: '--synervion-space-8', usage: 'Large gaps, section padding' },
    { value: '48px', rem: '3rem', token: '--synervion-space-12', usage: 'Section spacing, larger gaps' },
    { value: '64px', rem: '4rem', token: '--synervion-space-16', usage: 'Major section spacing' },
    { value: '96px', rem: '6rem', token: '--synervion-space-24', usage: 'Hero spacing, large sections' },
    { value: '128px', rem: '8rem', token: '--synervion-space-32', usage: 'Extra large section spacing' },
  ];

  const iconLibrary = [
    { icon: Zap, name: 'Energy', usage: 'Energy benefits, performance' },
    { icon: Shield, name: 'Immunity', usage: 'Immune support, protection' },
    { icon: Heart, name: 'Vitality', usage: 'Overall wellness, health' },
    { icon: Clock, name: 'Longevity', usage: 'Long-term benefits, aging' },
    { icon: Leaf, name: 'Sustainable', usage: 'Eco-friendly, natural' },
    { icon: Microscope, name: 'Lab-Grown', usage: 'Scientific, research' },
    { icon: Award, name: 'Premium', usage: 'Quality, excellence' },
    { icon: Package, name: 'Partnership', usage: 'Collaboration, services' },
    { icon: TrendingUp, name: 'Growth', usage: 'Progress, improvement' },
    { icon: Users, name: 'Community', usage: 'Team, collaboration' },
    { icon: Globe, name: 'Global', usage: 'Worldwide, reach' },
    { icon: ArrowRight, name: 'Direction', usage: 'Navigation, CTA' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--synervion-bg-gray-50))]">
      {/* Header */}
      <header className="bg-white border-b border-[hsl(var(--synervion-border-light))] sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Synervion Brand System
              </h1>
              <p className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))]">
                Complete Design System & Component Library · v1.0 · October 2025
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <BrandBadge variant="primary">Premium</BrandBadge>
              <BrandBadge variant="secondary">Scientific</BrandBadge>
              <BrandBadge variant="outline">Transparent</BrandBadge>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-[hsl(var(--synervion-border-light))]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex overflow-x-auto scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeSection === section.id
                      ? 'border-[hsl(var(--synervion-primary-500))] text-[hsl(var(--synervion-primary-500))]'
                      : 'border-transparent text-[hsl(var(--synervion-text-secondary))] hover:text-[hsl(var(--synervion-text-primary))]'
                  }`}
                  style={{ fontFamily: 'var(--synervion-font-heading)' }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
        {/* SECTION: Brand Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20 mb-4">
                <Award className="w-4 h-4 text-[hsl(var(--synervion-primary-500))]" />
                <span className="text-sm text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Brand DNA
                </span>
              </div>
              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Synervion Brand Identity
              </h2>
              <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))]">
                Premium lab-grown Cordyceps for modern wellness brands. Our identity reflects the perfect balance 
                of cutting-edge science, traditional wisdom, and sustainable innovation.
              </p>
            </div>

            {/* Brand Keywords */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brandKeywords.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.keyword}
                    className="group relative p-8 rounded-2xl bg-white border-2 border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))] transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Annotation Label */}
                    <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs">
                      Brand Keyword
                    </div>
                    
                    <div className="w-14 h-14 rounded-xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-3 text-2xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                      {item.keyword}
                    </h3>
                    <p className="text-sm text-[hsl(var(--synervion-text-secondary))] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Brand Positioning Statement */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-secondary-800))] to-[hsl(var(--synervion-secondary-700))] text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '48px 48px'
                }} />
              </div>
              <div className="relative z-10 max-w-4xl">
                <div className="text-xs uppercase tracking-wider text-white/70 mb-4">
                  Brand Positioning Statement
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-white" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  India's Premier Lab-Grown Cordyceps Partner
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8">
                  Synervion delivers premium, science-backed Cordyceps ingredients through sustainable lab cultivation. 
                  We combine traditional wellness wisdom with cutting-edge biotechnology to provide brands with 
                  transparent, traceable, and consistently superior functional ingredients.
                </p>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { label: 'Purity Rate', value: '99.8%' },
                    { label: 'Brand Partners', value: '50+' },
                    { label: 'Years of Research', value: '5+' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                      <div className="text-3xl sm:text-4xl mb-2 text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Color System */}
        {activeSection === 'colors' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20 mb-4">
                <div className="w-4 h-4 rounded-full bg-[hsl(var(--synervion-primary-500))]" />
                <span className="text-sm text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Color Palette
                </span>
              </div>
              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Color System
              </h2>
              <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))]">
                Our color palette is inspired by the warm amber tones of Cordyceps mushrooms, balanced with 
                professional grays for a premium, scientific aesthetic.
              </p>
            </div>

            {/* Color Palettes */}
            {Object.entries(colorSystem).map(([categoryName, category]) => (
              <div key={categoryName} className="relative">
                {/* Annotation Label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                    Color Category
                  </div>
                  <ChevronRight className="w-4 h-4 text-[hsl(var(--synervion-text-tertiary))]" />
                </div>

                <div className="p-8 rounded-3xl bg-white border border-[hsl(var(--synervion-border-light))] shadow-sm">
                  <div className="mb-8">
                    <h3 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                      {categoryName}
                    </h3>
                    <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] mb-2">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--synervion-bg-gray-100))] text-xs text-[hsl(var(--synervion-text-secondary))]">
                      <Code className="w-3 h-3" />
                      Usage: {category.usage}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.colors.map((color) => (
                      <div
                        key={color.name}
                        className="group relative rounded-xl overflow-hidden border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))] hover:shadow-lg transition-all"
                      >
                        {/* Color Swatch */}
                        <div
                          className="h-32 w-full cursor-pointer relative"
                          style={{ backgroundColor: `hsl(${color.hsl})` }}
                          onClick={() => copyToClipboard(color.hex, color.name)}
                        >
                          {/* Annotation for Primary Colors */}
                          {color.usage.includes('★') && (
                            <div className="absolute top-2 right-2 px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-xs" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                              ★ Primary
                            </div>
                          )}
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.hex, color.name);
                            }}
                            className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedColor === color.name ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-[hsl(var(--synervion-text-secondary))]" />
                            )}
                          </button>
                        </div>
                        
                        {/* Color Info */}
                        <div className="p-4 bg-white">
                          <div className="mb-3">
                            <div className="text-sm mb-1" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                              {color.name}
                            </div>
                            <div className="text-xs text-[hsl(var(--synervion-text-tertiary))] line-clamp-2">
                              {color.usage}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[hsl(var(--synervion-text-tertiary))]">HEX</span>
                              <code className="font-mono text-[hsl(var(--synervion-text-primary))]">{color.hex}</code>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[hsl(var(--synervion-text-tertiary))]">HSL</span>
                              <code className="font-mono text-[hsl(var(--synervion-text-primary))]">{color.hsl}</code>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[hsl(var(--synervion-text-tertiary))]">CSS Var</span>
                              <code className="font-mono text-[hsl(var(--synervion-text-primary))]">{color.var}</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Usage Examples */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-bg-gray-50))] to-white border border-[hsl(var(--synervion-border-light))]">
              <h3 className="text-xl sm:text-2xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Color Usage Examples
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white border border-[hsl(var(--synervion-border-light))]">
                  <div className="text-sm mb-3 text-[hsl(var(--synervion-text-tertiary))]">CSS Variables</div>
                  <pre className="p-4 rounded-lg bg-gray-900 text-green-400 text-xs overflow-x-auto font-mono">
{`/* Primary Brand Color */
bg-[hsl(var(--synervion-primary-500))]

/* Text Colors */
text-[hsl(var(--synervion-text-primary))]
text-[hsl(var(--synervion-text-secondary))]

/* Borders */
border-[hsl(var(--synervion-border-light))]`}
                  </pre>
                </div>
                <div className="p-6 rounded-xl bg-white border border-[hsl(var(--synervion-border-light))]">
                  <div className="text-sm mb-3 text-[hsl(var(--synervion-text-tertiary))]">Direct HSL Usage</div>
                  <pre className="p-4 rounded-lg bg-gray-900 text-blue-400 text-xs overflow-x-auto font-mono">
{`/* In CSS */
background: hsl(28 85% 58%);

/* In Tailwind */
className="bg-[hsl(28_85%_58%)]"

/* With opacity */
className="bg-[hsl(28_85%_58%)]/10"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Typography */}
        {activeSection === 'typography' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20 mb-4">
                <span className="text-sm text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Aa
                </span>
              </div>
              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Typography System
              </h2>
              <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))]">
                Manrope for headings provides geometric precision. Inter for body ensures excellent readability.
              </p>
            </div>

            {/* Font Families */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white border-2 border-[hsl(var(--synervion-border-light))]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Manrope
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs">
                    Headings
                  </div>
                </div>
                <div className="text-6xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Aa Bb Cc
                </div>
                <div className="space-y-2 text-sm text-[hsl(var(--synervion-text-secondary))]">
                  <div>Primary typeface for headings and display text</div>
                  <div className="flex flex-wrap gap-2">
                    <code className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))] text-xs">font-family: 'Manrope'</code>
                    <code className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))] text-xs">--synervion-font-heading</code>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border-2 border-[hsl(var(--synervion-border-light))]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Inter
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-[hsl(var(--synervion-secondary-800))] text-white text-xs">
                    Body
                  </div>
                </div>
                <div className="text-6xl mb-6" style={{ fontFamily: 'var(--synervion-font-body)' }}>
                  Aa Bb Cc
                </div>
                <div className="space-y-2 text-sm text-[hsl(var(--synervion-text-secondary))]">
                  <div>Body typeface for content and UI elements</div>
                  <div className="flex flex-wrap gap-2">
                    <code className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))] text-xs">font-family: 'Inter'</code>
                    <code className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))] text-xs">--synervion-font-body</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Type Scale */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                  Type Scale
                </div>
              </div>

              {typographyScale.map((type) => (
                <div
                  key={type.name}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))] transition-colors"
                >
                  <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Specifications */}
                    <div className="lg:col-span-4 space-y-3">
                      <div>
                        <h4 className="text-lg mb-1" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                          {type.name}
                        </h4>
                        <div className="text-xs text-[hsl(var(--synervion-text-tertiary))]">
                          {type.usage}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-[hsl(var(--synervion-text-tertiary))] mb-1">Size</div>
                          <div style={{ fontFamily: 'var(--synervion-font-heading)' }}>{type.size} / {type.rem}</div>
                        </div>
                        <div>
                          <div className="text-[hsl(var(--synervion-text-tertiary))] mb-1">Weight</div>
                          <div style={{ fontFamily: 'var(--synervion-font-heading)' }}>{type.weight}</div>
                        </div>
                        <div>
                          <div className="text-[hsl(var(--synervion-text-tertiary))] mb-1">Line Height</div>
                          <div style={{ fontFamily: 'var(--synervion-font-heading)' }}>{type.lineHeight}</div>
                        </div>
                        <div>
                          <div className="text-[hsl(var(--synervion-text-tertiary))] mb-1">Tracking</div>
                          <div style={{ fontFamily: 'var(--synervion-font-heading)' }}>{type.letterSpacing}</div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[hsl(var(--synervion-border-light))]">
                        <code className="text-xs text-[hsl(var(--synervion-text-secondary))]">{type.cssVar}</code>
                      </div>
                    </div>

                    {/* Example */}
                    <div className="lg:col-span-8">
                      <div className="p-6 rounded-xl bg-[hsl(var(--synervion-bg-gray-50))]">
                        <p
                          style={{
                            fontFamily: type.family === 'Manrope' ? 'var(--synervion-font-heading)' : 'var(--synervion-font-body)',
                            fontSize: type.size,
                            fontWeight: type.weight.includes('Bold') ? 700 : type.weight.includes('SemiBold') ? 600 : 400,
                            lineHeight: type.lineHeight,
                            letterSpacing: type.letterSpacing,
                          }}
                        >
                          {type.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Implementation Guide */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-secondary-800))] to-[hsl(var(--synervion-secondary-700))] text-white">
              <h3 className="text-2xl mb-6 text-white" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Implementation Examples
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm mb-3 text-white/70">Using CSS Variables</div>
                  <pre className="p-4 rounded-lg bg-black/30 text-green-400 text-xs overflow-x-auto font-mono">
{`h1 {
  font-family: var(--synervion-font-heading);
  font-size: var(--synervion-text-h1);
  font-weight: var(--synervion-weight-bold);
  line-height: var(--synervion-leading-tight);
}`}
                  </pre>
                </div>
                <div>
                  <div className="text-sm mb-3 text-white/70">Using Tailwind + Inline Styles</div>
                  <pre className="p-4 rounded-lg bg-black/30 text-blue-400 text-xs overflow-x-auto font-mono">
{`<h1 
  className="text-4xl sm:text-6xl"
  style={{
    fontFamily: 'var(--synervion-font-heading)'
  }}
>
  Heading Text
</h1>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Spacing & Grid */}
        {activeSection === 'spacing' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20 mb-4">
                <div className="w-4 h-4 border-2 border-[hsl(var(--synervion-primary-500))]" />
                <span className="text-sm text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Layout System
                </span>
              </div>
              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Spacing & Grid System
              </h2>
              <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))]">
                8px base unit with consistent scaling. 12-column grid for desktop, 6-column for tablet, 4-column for mobile.
              </p>
            </div>

            {/* Spacing Scale */}
            <div className="p-8 rounded-3xl bg-white border border-[hsl(var(--synervion-border-light))]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Spacing Scale (8px Base)
                </h3>
                <div className="px-3 py-1 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs">
                  8px Foundation
                </div>
              </div>
              
              <div className="space-y-4">
                {spacingScale.map((space) => (
                  <div key={space.value} className="group p-4 rounded-xl hover:bg-[hsl(var(--synervion-bg-gray-50))] transition-colors">
                    <div className="flex items-center gap-6">
                      {/* Visual Bar */}
                      <div className="flex-shrink-0">
                        <div
                          className="h-10 bg-gradient-to-r from-[hsl(var(--synervion-primary-500))] to-[hsl(var(--synervion-primary-600))] rounded"
                          style={{ width: space.value }}
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 grid sm:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-[hsl(var(--synervion-text-tertiary))] mb-1">Value</div>
                          <div className="text-lg" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                            {space.value} / {space.rem}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[hsl(var(--synervion-text-tertiary))] mb-1">CSS Variable</div>
                          <code className="text-sm text-[hsl(var(--synervion-text-primary))]">{space.token}</code>
                        </div>
                        <div>
                          <div className="text-xs text-[hsl(var(--synervion-text-tertiary))] mb-1">Usage</div>
                          <div className="text-sm text-[hsl(var(--synervion-text-secondary))]">{space.usage}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid System */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                  Grid Systems
                </div>
              </div>

              {/* 12 Column Desktop */}
              <div className="p-8 rounded-3xl bg-white border border-[hsl(var(--synervion-border-light))]">
                <div className="mb-6">
                  <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Desktop Grid - 12 Columns
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">1440px max-width</span>
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">64px padding</span>
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">24px gap</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-16 bg-[hsl(var(--synervion-primary-500))]/20 rounded flex items-center justify-center text-xs text-[hsl(var(--synervion-primary-600))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* 6 Column Tablet */}
              <div className="p-8 rounded-3xl bg-white border border-[hsl(var(--synervion-border-light))]">
                <div className="mb-6">
                  <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Tablet Grid - 6 Columns
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">768px breakpoint</span>
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">32px padding</span>
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">16px gap</span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-16 bg-[hsl(var(--synervion-secondary-800))]/20 rounded flex items-center justify-center text-xs text-[hsl(var(--synervion-secondary-800))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Column Mobile */}
              <div className="p-8 rounded-3xl bg-white border border-[hsl(var(--synervion-border-light))]">
                <div className="mb-6">
                  <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Mobile Grid - 4 Columns
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">390px target</span>
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">16px padding</span>
                    <span className="px-2 py-1 rounded bg-[hsl(var(--synervion-bg-gray-100))]">16px gap</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 bg-[hsl(var(--synervion-accent-400))]/20 rounded flex items-center justify-center text-xs text-[hsl(var(--synervion-accent-700))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Implementation */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-bg-gray-50))] to-white border border-[hsl(var(--synervion-border-light))]">
              <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Grid Implementation
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border border-[hsl(var(--synervion-border-light))]">
                  <div className="text-sm mb-2 text-[hsl(var(--synervion-text-tertiary))]">12-Column Grid</div>
                  <pre className="text-xs font-mono text-[hsl(var(--synervion-text-primary))]">
{`<div className="synervion-grid-12">
  <div className="col-span-6">Half width</div>
  <div className="col-span-4">Third width</div>
</div>`}
                  </pre>
                </div>
                <div className="p-4 rounded-lg bg-white border border-[hsl(var(--synervion-border-light))]">
                  <div className="text-sm mb-2 text-[hsl(var(--synervion-text-tertiary))]">Responsive Container</div>
                  <pre className="text-xs font-mono text-[hsl(var(--synervion-text-primary))]">
{`<div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
  {/* Content */}
</div>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Components */}
        {activeSection === 'components' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20 mb-4">
                <Package className="w-4 h-4 text-[hsl(var(--synervion-primary-500))]" />
                <span className="text-sm text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Component Library
                </span>
              </div>
              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Core Components
              </h2>
              <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))]">
                Reusable, documented components with multiple variants and states.
              </p>
            </div>

            {/* Buttons */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[hsl(var(--synervion-border-light))]">
              <div className="flex items-center gap-3 mb-8">
                <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                  Button Component
                </div>
              </div>

              <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                BrandButton
              </h3>

              {/* Variants */}
              <div className="mb-10">
                <h4 className="text-lg mb-4 text-[hsl(var(--synervion-text-secondary))]">Variants</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="text-center">
                    <BrandButton variant="primary">
                      Primary
                      <ArrowRight className="w-4 h-4" />
                    </BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">variant="primary"</div>
                  </div>
                  <div className="text-center">
                    <BrandButton variant="secondary">Secondary</BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">variant="secondary"</div>
                  </div>
                  <div className="text-center">
                    <BrandButton variant="outline">Outline</BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">variant="outline"</div>
                  </div>
                  <div className="text-center">
                    <BrandButton variant="ghost">Ghost</BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">variant="ghost"</div>
                  </div>
                  <div className="text-center">
                    <BrandButton variant="link">Link</BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">variant="link"</div>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-10">
                <h4 className="text-lg mb-4 text-[hsl(var(--synervion-text-secondary))]">Sizes</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-center">
                    <BrandButton variant="primary" size="sm">Small</BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">size="sm"</div>
                  </div>
                  <div className="text-center">
                    <BrandButton variant="primary" size="md">Medium</BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">size="md"</div>
                  </div>
                  <div className="text-center">
                    <BrandButton variant="primary" size="lg">Large</BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">size="lg"</div>
                  </div>
                  <div className="text-center">
                    <BrandButton variant="primary" size="icon">
                      <Zap className="w-5 h-5" />
                    </BrandButton>
                    <div className="text-xs mt-2 text-[hsl(var(--synervion-text-tertiary))]">size="icon"</div>
                  </div>
                </div>
              </div>

              {/* States */}
              <div className="mb-10">
                <h4 className="text-lg mb-4 text-[hsl(var(--synervion-text-secondary))]">States</h4>
                <div className="flex flex-wrap gap-4">
                  <BrandButton variant="primary">Normal</BrandButton>
                  <BrandButton variant="primary" disabled>Disabled</BrandButton>
                  <BrandButton variant="outline">Normal</BrandButton>
                  <BrandButton variant="outline" disabled>Disabled</BrandButton>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-4 rounded-lg bg-gray-900 text-blue-400">
                <pre className="text-xs font-mono overflow-x-auto">
{`import { BrandButton } from './components/brand/BrandButton';

<BrandButton variant="primary" size="lg">
  Explore Partnerships
  <ArrowRight className="w-4 h-4" />
</BrandButton>`}
                </pre>
              </div>
            </div>

            {/* Cards */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[hsl(var(--synervion-border-light))]">
              <div className="flex items-center gap-3 mb-8">
                <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                  Card Component
                </div>
              </div>

              <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                BrandCard
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div>
                  <BrandCard
                    variant="benefit"
                    icon={<Zap className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" />}
                    title="Benefit Card"
                    description="Used for showcasing product benefits with icons and metrics."
                    metric="42%"
                    metricLabel="Improvement Rate"
                  />
                  <div className="text-xs mt-3 text-center text-[hsl(var(--synervion-text-tertiary))]">variant="benefit"</div>
                </div>

                <div>
                  <BrandCard
                    variant="partnership"
                    icon={<Package className="w-8 h-8 text-[hsl(var(--synervion-primary-500))]" />}
                    title="Partnership Card"
                    description="For partnership models and service offerings."
                  >
                    <BrandButton variant="outline" className="w-full mt-4">
                      Learn More
                    </BrandButton>
                  </BrandCard>
                  <div className="text-xs mt-3 text-center text-[hsl(var(--synervion-text-tertiary))]">variant="partnership"</div>
                </div>

                <div>
                  <BrandCard
                    variant="metric"
                    metric="99.8%"
                    metricLabel="Quality Score"
                  />
                  <div className="text-xs mt-3 text-center text-[hsl(var(--synervion-text-tertiary))]">variant="metric"</div>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-4 rounded-lg bg-gray-900 text-green-400">
                <pre className="text-xs font-mono overflow-x-auto">
{`import { BrandCard } from './components/brand/BrandCard';

<BrandCard
  variant="benefit"
  icon={<Zap />}
  title="Energy Boost"
  description="Enhanced ATP production"
  metric="42%"
  metricLabel="Energy Increase"
/>`}
                </pre>
              </div>
            </div>

            {/* Badges */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[hsl(var(--synervion-border-light))]">
              <div className="flex items-center gap-3 mb-8">
                <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                  Badge Component
                </div>
              </div>

              <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                BrandBadge
              </h3>

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-sm mb-3 text-[hsl(var(--synervion-text-tertiary))]">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <BrandBadge variant="primary">Primary</BrandBadge>
                    <BrandBadge variant="secondary">Secondary</BrandBadge>
                    <BrandBadge variant="outline">Outline</BrandBadge>
                    <BrandBadge variant="success">Success</BrandBadge>
                    <BrandBadge variant="warning">Warning</BrandBadge>
                    <BrandBadge variant="error">Error</BrandBadge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm mb-3 text-[hsl(var(--synervion-text-tertiary))]">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <BrandBadge variant="primary" size="sm">Small</BrandBadge>
                    <BrandBadge variant="primary" size="md">Medium</BrandBadge>
                    <BrandBadge variant="primary" size="lg">Large</BrandBadge>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-4 rounded-lg bg-gray-900 text-purple-400">
                <pre className="text-xs font-mono overflow-x-auto">
{`import { BrandBadge } from './components/brand/BrandBadge';

<BrandBadge variant="primary">Premium</BrandBadge>
<BrandBadge variant="success" size="sm">Verified</BrandBadge>`}
                </pre>
              </div>
            </div>

            {/* Navigation & Footer Preview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))]">
                <h4 className="text-lg mb-4" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Navigation Component
                </h4>
                <div className="p-4 rounded-lg bg-[hsl(var(--synervion-bg-gray-50))]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm" style={{ fontFamily: 'var(--synervion-font-heading)' }}>Synervion</div>
                    <div className="flex gap-3 text-xs">
                      <span>Home</span>
                      <span>About</span>
                      <span>Contact</span>
                    </div>
                  </div>
                  <div className="text-xs text-[hsl(var(--synervion-text-tertiary))]">
                    Sticky header with mobile menu • Scroll blur effect
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))]">
                <h4 className="text-lg mb-4" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Footer Component
                </h4>
                <div className="p-4 rounded-lg bg-[hsl(var(--synervion-secondary-800))] text-white">
                  <div className="grid grid-cols-3 gap-4 text-xs mb-3">
                    <div>Company</div>
                    <div>Partnerships</div>
                    <div>Resources</div>
                  </div>
                  <div className="text-xs text-white/60">
                    5-column layout • Social links • Responsive
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Imagery & Icons */}
        {activeSection === 'imagery' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20 mb-4">
                <Leaf className="w-4 h-4 text-[hsl(var(--synervion-primary-500))]" />
                <span className="text-sm text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Visual Language
                </span>
              </div>
              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Imagery & Icon System
              </h2>
              <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))]">
                Clean lab macro photography with duotone outline icons at 1.5–2px stroke weight.
              </p>
            </div>

            {/* Photography Guidelines */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[hsl(var(--synervion-border-light))]">
              <div className="flex items-center gap-3 mb-8">
                <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                  Photography Style
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl mb-4" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Subject Matter
                  </h4>
                  <ul className="space-y-2 text-sm text-[hsl(var(--synervion-text-secondary))]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>Lab-grown Cordyceps macro photography</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>Scientific laboratory environments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>Clean product packaging shots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>Wellness lifestyle imagery (subtle)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl mb-4" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Technical Specs
                  </h4>
                  <ul className="space-y-2 text-sm text-[hsl(var(--synervion-text-secondary))]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>High resolution (minimum 1920px wide)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>Natural lighting preferred</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>Shallow depth of field for products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--synervion-primary-500))] mt-0.5 flex-shrink-0" />
                      <span>Clean, uncluttered backgrounds</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Image Ratios */}
              <div className="p-6 rounded-xl bg-[hsl(var(--synervion-bg-gray-50))]">
                <h4 className="text-lg mb-4" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Image Aspect Ratios
                </h4>
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { ratio: '16:9', usage: 'Hero sections, wide features' },
                    { ratio: '1:1', usage: 'Grid layouts, product shots' },
                    { ratio: '4:3', usage: 'Card images, benefits' },
                    { ratio: '2:1', usage: 'Banner images' },
                  ].map((item) => (
                    <div key={item.ratio} className="p-4 rounded-lg bg-white border border-[hsl(var(--synervion-border-light))]">
                      <div className="text-lg mb-1" style={{ fontFamily: 'var(--synervion-font-heading)' }}>{item.ratio}</div>
                      <div className="text-xs text-[hsl(var(--synervion-text-tertiary))]">{item.usage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Icon Library */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[hsl(var(--synervion-border-light))]">
              <div className="flex items-center gap-3 mb-8">
                <div className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs uppercase tracking-wider">
                  Icon Library
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Lucide React Icons
                </h3>
                <div className="flex flex-wrap gap-2 text-xs mb-6">
                  <span className="px-3 py-1 rounded-full bg-[hsl(var(--synervion-bg-gray-100))]">1.5–2px stroke weight</span>
                  <span className="px-3 py-1 rounded-full bg-[hsl(var(--synervion-bg-gray-100))]">24px standard size</span>
                  <span className="px-3 py-1 rounded-full bg-[hsl(var(--synervion-bg-gray-100))]">Duotone outline style</span>
                  <span className="px-3 py-1 rounded-full bg-[hsl(var(--synervion-bg-gray-100))]">Lucide React library</span>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {iconLibrary.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="group text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center group-hover:bg-[hsl(var(--synervion-primary-500))]/20 transition-colors">
                        <Icon className="w-8 h-8 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
                      </div>
                      <div className="text-xs mb-1" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                        {item.name}
                      </div>
                      <div className="text-xs text-[hsl(var(--synervion-text-tertiary))]">
                        {item.usage}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Usage Example */}
              <div className="mt-8 p-4 rounded-lg bg-gray-900 text-yellow-400">
                <pre className="text-xs font-mono overflow-x-auto">
{`import { Zap, Shield, Leaf } from 'lucide-react';

<Zap 
  className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" 
  strokeWidth={1.5}
/>`}
                </pre>
              </div>
            </div>

            {/* Color Treatment */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-bg-gray-50))] to-white border border-[hsl(var(--synervion-border-light))]">
              <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Image Color Treatment
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { color: 'Warm Amber', hex: '#EE7B2F', usage: 'Highlighted in product shots' },
                  { color: 'Neutral Gray', hex: '#272D35', usage: 'Lab backgrounds' },
                  { color: 'Lab White', hex: '#FFFFFF', usage: 'Clean surfaces' },
                ].map((item) => (
                  <div key={item.color} className="p-6 rounded-xl bg-white border border-[hsl(var(--synervion-border-light))]">
                    <div className="w-full h-24 rounded-lg mb-4" style={{ backgroundColor: item.hex }} />
                    <h4 className="text-lg mb-2" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                      {item.color}
                    </h4>
                    <p className="text-sm text-[hsl(var(--synervion-text-secondary))]">{item.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Documentation */}
        {activeSection === 'documentation' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20 mb-4">
                <Code className="w-4 h-4 text-[hsl(var(--synervion-primary-500))]" />
                <span className="text-sm text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Developer Handoff
                </span>
              </div>
              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Documentation & Usage
              </h2>
              <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))]">
                Complete implementation guides, code examples, and resources for developers.
              </p>
            </div>

            {/* Quick Start */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-secondary-800))] to-[hsl(var(--synervion-secondary-700))] text-white">
              <h3 className="text-2xl mb-6 text-white" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Quick Start Guide
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                  <h4 className="text-lg mb-3 text-white" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Installation
                  </h4>
                  <pre className="p-4 rounded-lg bg-black/30 text-green-400 text-xs overflow-x-auto font-mono">
{`npm install lucide-react motion \\
  class-variance-authority \\
  clsx tailwind-merge`}
                  </pre>
                </div>
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                  <h4 className="text-lg mb-3 text-white" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Import Fonts
                  </h4>
                  <pre className="p-4 rounded-lg bg-black/30 text-blue-400 text-xs overflow-x-auto font-mono">
{`<link href="https://fonts.googleapis.com/
css2?family=Manrope:wght@400;500;600;
700&family=Inter:wght@400;500;600;
700&display=swap" />`}
                  </pre>
                </div>
              </div>
            </div>

            {/* File Structure */}
            <div className="p-8 rounded-3xl bg-white border border-[hsl(var(--synervion-border-light))]">
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                File Structure
              </h3>
              <div className="p-6 rounded-xl bg-[hsl(var(--synervion-bg-gray-50))] font-mono text-sm">
                <pre className="text-[hsl(var(--synervion-text-primary))]">
{`/
├── styles/
│   └── globals.css          # Design tokens & base styles
├── components/
│   ├── brand/
│   │   ├── BrandButton.tsx  # Button component
│   │   ├── BrandCard.tsx    # Card variants
│   │   ├── BrandBadge.tsx   # Badge component
│   │   └── README.md        # Component docs
│   ├── ResponsiveNavigation.tsx
│   └── Footer.tsx
└── pages/
    ├── HomePage.tsx
    ├── AboutPage.tsx
    ├── PartnershipsPage.tsx
    └── ContactPage.tsx`}
                </pre>
              </div>
            </div>

            {/* Resources */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))]">
                <Download className="w-8 h-8 mb-4 text-[hsl(var(--synervion-primary-500))]" />
                <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Documentation Files
                </h4>
                <ul className="space-y-2 text-sm text-[hsl(var(--synervion-text-secondary))]">
                  <li>• BRAND_SYSTEM_OVERVIEW.md</li>
                  <li>• RESPONSIVE_SYSTEM.md</li>
                  <li>• BREAKPOINTS_GUIDE.md</li>
                  <li>• components/brand/README.md</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))]">
                <Code className="w-8 h-8 mb-4 text-[hsl(var(--synervion-primary-500))]" />
                <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                  Component Library
                </h4>
                <ul className="space-y-2 text-sm text-[hsl(var(--synervion-text-secondary))]">
                  <li>• 3 Brand Components</li>
                  <li>• 40+ ShadCN UI Components</li>
                  <li>• Responsive Navigation</li>
                  <li>• Footer with links</li>
                </ul>
              </div>
            </div>

            {/* Browser Support */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-bg-gray-50))] to-white border border-[hsl(var(--synervion-border-light))]">
              <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Browser Support & Standards
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Chrome/Edge', version: 'Latest' },
                  { name: 'Firefox', version: 'Latest' },
                  { name: 'Safari', version: 'Latest 2' },
                  { name: 'Mobile', version: 'iOS 14+, Android 10+' },
                ].map((browser) => (
                  <div key={browser.name} className="p-4 rounded-xl bg-white border border-[hsl(var(--synervion-border-light))] text-center">
                    <div className="text-lg mb-1" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                      {browser.name}
                    </div>
                    <div className="text-xs text-[hsl(var(--synervion-text-tertiary))]">
                      {browser.version}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Version Info */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[hsl(var(--synervion-primary-500))] to-[hsl(var(--synervion-primary-600))] text-white text-center">
              <div className="text-sm uppercase tracking-wider text-white/80 mb-2">
                Synervion Brand System
              </div>
              <h3 className="text-3xl mb-4 text-white" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                Version 1.0
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Complete design system ready for production use and developer handoff. 
                Includes colors, typography, spacing, components, and full documentation.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  October 2025
                </div>
                <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  React + TypeScript
                </div>
                <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  Tailwind v4.0
                </div>
                <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  Motion Animations
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
