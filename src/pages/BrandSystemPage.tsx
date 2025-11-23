import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { BrandButton } from '../components/brand/BrandButton';
import { BrandBadge } from '../components/brand/BrandBadge';
import { BrandCard } from '../components/brand/BrandCard';
import {
  Zap, Shield, Package, Download, Copy,
  Check, Grid3x3, Type, Palette, Box
} from 'lucide-react';
import { useState } from 'react';
import cordycepsImage from '../assets/images/hero-cordyceps-macro.png';
import foundersImage from '../assets/images/contact-bg.png';
import teamLabImage from '../assets/images/mission-bg.png';
import revaFloraFacility from '../assets/images/lab-grown-advantage.png';
import labCultureImage from '../assets/images/partnership-bg.png';
import productLineup from '../assets/images/product-lineup.png';
import whiteLabelPackaging from '../assets/images/vision-bg.png';
import productMockups from '../assets/images/research-bg.png';

interface BrandSystemPageProps {
  onNavigate?: (page: string) => void;
}

export function BrandSystemPage({ onNavigate }: BrandSystemPageProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = {
    primary: [
      { name: 'Primary 500', hex: '#EE7B2F', var: '--synervion-primary-500', usage: 'Main brand color, CTAs, links' },
      { name: 'Primary 600', hex: '#D96A23', var: '--synervion-primary-600', usage: 'Hover states, active elements' },
      { name: 'Primary 400', hex: '#F18F4F', var: '--synervion-primary-400', usage: 'Lighter accents' },
    ],
    secondary: [
      { name: 'Secondary 800', hex: '#272D35', var: '--synervion-secondary-800', usage: 'Headers, dark backgrounds' },
      { name: 'Secondary 700', hex: '#3A424D', var: '--synervion-secondary-700', usage: 'Darker elements' },
    ],
    backgrounds: [
      { name: 'White', hex: '#FFFFFF', var: '--synervion-bg-white', usage: 'Main backgrounds' },
      { name: 'Gray 50', hex: '#F9FAFB', var: '--synervion-bg-gray-50', usage: 'Subtle surfaces' },
      { name: 'Gray 100', hex: '#F3F4F6', var: '--synervion-bg-gray-100', usage: 'Cards, panels' },
    ],
    text: [
      { name: 'Primary', hex: '#272D35', var: '--synervion-text-primary', usage: 'Headings, important text' },
      { name: 'Secondary', hex: '#515A63', var: '--synervion-text-secondary', usage: 'Body text' },
      { name: 'Tertiary', hex: '#808A94', var: '--synervion-text-tertiary', usage: 'Captions, hints' },
    ],
    borders: [
      { name: 'Light', hex: '#E5E7EB', var: '--synervion-border-light', usage: 'Borders, dividers' },
    ],
  };

  const typography = [
    { level: 'H1', size: '64px', weight: '700', lineHeight: '1.2', letterSpacing: '-0.02em', usage: 'Hero headlines', example: 'The Cordyceps Partner' },
    { level: 'H2', size: '48px', weight: '600', lineHeight: '1.2', letterSpacing: '-0.01em', usage: 'Section titles', example: 'Four Pillars of Wellness' },
    { level: 'H3', size: '32px', weight: '600', lineHeight: '1.2', letterSpacing: '-0.01em', usage: 'Card titles', example: 'Our Mission' },
    { level: 'H4', size: '24px', weight: '600', lineHeight: '1.3', letterSpacing: '0', usage: 'Subsection headers', example: 'Lab-Grown Excellence' },
    { level: 'Body Large', size: '18px', weight: '400', lineHeight: '1.7', letterSpacing: '0', usage: 'Main content', example: 'Science-backed benefits proven through research' },
    { level: 'Body', size: '16px', weight: '400', lineHeight: '1.6', letterSpacing: '0', usage: 'Standard text', example: 'Controlled environment eliminates contaminants' },
    { level: 'Caption', size: '14px', weight: '400', lineHeight: '1.5', letterSpacing: '0', usage: 'Labels, metadata', example: 'Lab-Verified · 99.8% Purity' },
    { level: 'Small', size: '12px', weight: '400', lineHeight: '1.4', letterSpacing: '0', usage: 'Fine print', example: '* Based on clinical studies' },
  ];

  const spacing = [
    { name: 'xs', value: '4px', usage: 'Tight spacing, inline elements' },
    { name: 'sm', value: '8px', usage: 'Base unit, close elements' },
    { name: 'md', value: '16px', usage: 'Standard spacing' },
    { name: 'lg', value: '24px', usage: 'Component spacing' },
    { name: 'xl', value: '32px', usage: 'Section spacing' },
    { name: '2xl', value: '48px', usage: 'Large section spacing' },
    { name: '3xl', value: '64px', usage: 'Major section spacing' },
    { name: '4xl', value: '96px', usage: 'Page section spacing' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--synervion-bg-white))]">
      <Navigation onNavigate={onNavigate} />

      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[hsl(var(--synervion-bg-white))] via-[hsl(var(--synervion-bg-gray-50))] to-[hsl(var(--synervion-bg-white))]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <BrandBadge variant="primary" className="mb-6">
                Brand Guidelines
              </BrandBadge>

              <h1
                className="mb-6 text-[32px] sm:text-[48px] lg:text-[56px]"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 700,
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Synervion <span style={{ color: 'hsl(var(--synervion-primary-500))' }}>Brand System</span>
              </h1>

              <p
                className="mb-8 text-base lg:text-lg max-w-2xl mx-auto"
                style={{
                  fontFamily: 'var(--synervion-font-body)',
                  fontWeight: 400,
                  lineHeight: '1.7',
                  color: 'hsl(var(--synervion-text-secondary))'
                }}
              >
                A comprehensive design system for building consistent, premium wellness brand experiences.
                Science-backed, sustainably lab-grown Cordyceps for premium wellness brands.
              </p>

              {/* Brand Keywords */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {['Premium', 'Scientific', 'Transparent', 'Functional', 'Indian Innovation'].map((keyword) => (
                  <div
                    key={keyword}
                    className="px-4 py-2 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 border border-[hsl(var(--synervion-primary-500))]/20"
                  >
                    <span
                      style={{
                        fontFamily: 'var(--synervion-font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'hsl(var(--synervion-primary-500))'
                      }}
                    >
                      {keyword}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <BrandButton variant="primary" size="lg" className="min-h-[48px]">
                  <Download className="w-5 h-5" />
                  Download Assets
                </BrandButton>
                <BrandButton
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate?.('home')}
                  className="min-h-[48px]"
                >
                  View Homepage
                </BrandButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Color System */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[hsl(var(--synervion-bg-white))]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center">
                <Palette className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
              </div>
              <div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl"
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  Color System
                </h2>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                >
                  Click to copy hex codes
                </p>
              </div>
            </div>

            {Object.entries(colors).map(([category, colorList]) => (
              <div key={category} className="mb-12">
                <h3
                  className="mb-6 text-lg sm:text-xl capitalize"
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colorList.map((color) => (
                    <motion.button
                      key={color.hex}
                      onClick={() => copyToClipboard(color.hex, color.hex)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-6 rounded-2xl border-2 border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))] transition-all text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-16 h-16 rounded-xl shadow-lg flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              style={{
                                fontFamily: 'var(--synervion-font-heading)',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: 'hsl(var(--synervion-text-primary))'
                              }}
                            >
                              {color.name}
                            </span>
                            {copiedColor === color.hex ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-[hsl(var(--synervion-text-tertiary))] opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          <code
                            style={{
                              fontFamily: 'monospace',
                              fontSize: '14px',
                              color: 'hsl(var(--synervion-text-secondary))'
                            }}
                          >
                            {color.hex}
                          </code>
                          <p
                            className="mt-2 text-xs sm:text-sm"
                            style={{
                              fontFamily: 'var(--synervion-font-body)',
                              color: 'hsl(var(--synervion-text-tertiary))'
                            }}
                          >
                            {color.usage}
                          </p>
                          <code
                            className="mt-2 block text-xs"
                            style={{
                              fontFamily: 'monospace',
                              color: 'hsl(var(--synervion-text-tertiary))'
                            }}
                          >
                            var({color.var})
                          </code>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[hsl(var(--synervion-bg-gray-50))]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center">
                <Type className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
              </div>
              <div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl"
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  Typography
                </h2>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                >
                  Manrope for headings · Inter for body
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {typography.map((type) => (
                <div
                  key={type.level}
                  className="p-6 rounded-2xl bg-[hsl(var(--synervion-bg-white))] border border-[hsl(var(--synervion-border-light))]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Specs */}
                    <div className="lg:col-span-1">
                      <span
                        className="mb-3 block"
                        style={{
                          fontFamily: 'var(--synervion-font-heading)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'hsl(var(--synervion-primary-500))'
                        }}
                      >
                        {type.level}
                      </span>
                      <div className="space-y-1 text-sm">
                        <div style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                          Size: <strong>{type.size}</strong>
                        </div>
                        <div style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                          Weight: <strong>{type.weight}</strong>
                        </div>
                        <div style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                          Line Height: <strong>{type.lineHeight}</strong>
                        </div>
                        <div style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                          Tracking: <strong>{type.letterSpacing}</strong>
                        </div>
                      </div>
                      <p
                        className="mt-3 text-xs"
                        style={{
                          fontFamily: 'var(--synervion-font-body)',
                          color: 'hsl(var(--synervion-text-tertiary))'
                        }}
                      >
                        {type.usage}
                      </p>
                    </div>

                    {/* Example */}
                    <div className="lg:col-span-2 flex items-center">
                      <span
                        style={{
                          fontFamily: type.level.startsWith('H') ? 'var(--synervion-font-heading)' : 'var(--synervion-font-body)',
                          fontSize: type.size,
                          fontWeight: type.weight,
                          lineHeight: type.lineHeight,
                          letterSpacing: type.letterSpacing,
                          color: 'hsl(var(--synervion-text-primary))'
                        }}
                      >
                        {type.example}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing & Grid */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[hsl(var(--synervion-bg-white))]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center">
                <Grid3x3 className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
              </div>
              <div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl"
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  Spacing & Grid
                </h2>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                >
                  8px base spacing system
                </p>
              </div>
            </div>

            {/* Spacing Scale */}
            <div className="mb-12">
              <h3
                className="mb-6 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Spacing Scale
              </h3>
              <div className="space-y-4">
                {spacing.map((space) => (
                  <div
                    key={space.name}
                    className="flex items-center gap-6 p-4 rounded-xl bg-[hsl(var(--synervion-bg-gray-50))] border border-[hsl(var(--synervion-border-light))]"
                  >
                    <div className="w-24">
                      <code
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'hsl(var(--synervion-text-primary))'
                        }}
                      >
                        {space.name}
                      </code>
                    </div>
                    <div className="flex-1">
                      <div
                        className="h-8 bg-[hsl(var(--synervion-primary-500))]/20 rounded"
                        style={{ width: space.value }}
                      />
                    </div>
                    <div className="w-20 text-right">
                      <code
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          color: 'hsl(var(--synervion-text-secondary))'
                        }}
                      >
                        {space.value}
                      </code>
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--synervion-font-body)',
                          color: 'hsl(var(--synervion-text-tertiary))'
                        }}
                      >
                        {space.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid System */}
            <div>
              <h3
                className="mb-6 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Grid System
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Desktop', width: '1440px', columns: '12', gap: '32px' },
                  { name: 'Tablet', width: '768px', columns: '6', gap: '24px' },
                  { name: 'Mobile', width: '390px', columns: '4', gap: '16px' },
                ].map((grid) => (
                  <div
                    key={grid.name}
                    className="p-6 rounded-2xl bg-[hsl(var(--synervion-bg-gray-50))] border border-[hsl(var(--synervion-border-light))]"
                  >
                    <h4
                      className="mb-4"
                      style={{
                        fontFamily: 'var(--synervion-font-heading)',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'hsl(var(--synervion-text-primary))'
                      }}
                    >
                      {grid.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                        Max Width: <strong>{grid.width}</strong>
                      </div>
                      <div style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                        Columns: <strong>{grid.columns}</strong>
                      </div>
                      <div style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                        Gap: <strong>{grid.gap}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Components */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[hsl(var(--synervion-bg-gray-50))]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center">
                <Box className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
              </div>
              <div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl"
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  Core Components
                </h2>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                >
                  Reusable UI elements
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mb-12">
              <h3
                className="mb-6 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Buttons
              </h3>
              <div className="p-8 rounded-2xl bg-[hsl(var(--synervion-bg-white))] border border-[hsl(var(--synervion-border-light))]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="mb-3 text-sm" style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>Primary</p>
                    <BrandButton variant="primary" size="lg" className="w-full min-h-[48px]">
                      Get Started
                    </BrandButton>
                  </div>
                  <div>
                    <p className="mb-3 text-sm" style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>Secondary</p>
                    <BrandButton variant="secondary" size="lg" className="w-full min-h-[48px]">
                      Learn More
                    </BrandButton>
                  </div>
                  <div>
                    <p className="mb-3 text-sm" style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>Outline</p>
                    <BrandButton variant="outline" size="lg" className="w-full min-h-[48px]">
                      View Research
                    </BrandButton>
                  </div>
                  <div>
                    <p className="mb-3 text-sm" style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>Ghost</p>
                    <BrandButton variant="ghost" size="lg" className="w-full min-h-[48px]">
                      Contact Us
                    </BrandButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="mb-12">
              <h3
                className="mb-6 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Badges
              </h3>
              <div className="p-8 rounded-2xl bg-[hsl(var(--synervion-bg-white))] border border-[hsl(var(--synervion-border-light))]">
                <div className="flex flex-wrap gap-4">
                  <BrandBadge variant="primary">Lab-Grown Excellence</BrandBadge>
                  <BrandBadge variant="secondary">Most Popular</BrandBadge>
                  <BrandBadge variant="success">Premium</BrandBadge>
                  <BrandBadge variant="outline">Enterprise</BrandBadge>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3
                className="mb-6 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BrandCard
                  variant="benefit"
                  icon={<Zap className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />}
                  title="Energy Enhancement"
                  description="Boost ATP production and cellular energy for sustained vitality."
                  metric="42%"
                  metricLabel="Energy Increase"
                />
                <BrandCard
                  variant="benefit"
                  icon={<Shield className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />}
                  title="Immune Support"
                  description="Strengthen natural defense mechanisms with beta-glucans."
                  metric="38%"
                  metricLabel="Immune Response"
                />
                <BrandCard
                  variant="benefit"
                  icon={<Package className="w-7 h-7 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />}
                  title="White-Label"
                  description="Ready-to-market Cordyceps products with proven formulations."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Iconography */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[hsl(var(--synervion-bg-white))]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
            <h2
              className="mb-6 text-2xl sm:text-3xl lg:text-4xl"
              style={{
                fontFamily: 'var(--synervion-font-heading)',
                fontWeight: 600,
                color: 'hsl(var(--synervion-text-primary))'
              }}
            >
              Iconography & Imagery
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-2xl bg-[hsl(var(--synervion-bg-gray-50))] border border-[hsl(var(--synervion-border-light))]">
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  Icon Style
                </h3>
                <ul className="space-y-2 text-sm" style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                  <li>• Duotone outline style</li>
                  <li>• 1.5–2px stroke weight</li>
                  <li>• Rounded corners (2px)</li>
                  <li>• 24×24px base size</li>
                  <li>• Primary color for primary actions</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[hsl(var(--synervion-bg-gray-50))] border border-[hsl(var(--synervion-border-light))]">
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  Photo Direction
                </h3>
                <ul className="space-y-2 text-sm" style={{ fontFamily: 'var(--synervion-font-body)', color: 'hsl(var(--synervion-text-secondary))' }}>
                  <li>• Clean lab macro photography</li>
                  <li>• Cordyceps textures and details</li>
                  <li>• Minimal, scientific backgrounds</li>
                  <li>• Natural lighting, high clarity</li>
                  <li>• Warm amber undertones</li>
                </ul>
              </div>
            </div>

            {/* Photography Examples */}
            <div>
              <h3
                className="mb-6 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Brand Photography Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg mb-3 aspect-[4/3]">
                    <img
                      src={cordycepsImage}
                      alt="Cordyceps macro - premium quality"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontWeight: 600,
                      color: 'hsl(var(--synervion-text-primary))'
                    }}
                  >
                    Product Macro
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-tertiary))'
                    }}
                  >
                    Clean, detailed, warm amber tones
                  </p>
                </div>

                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg mb-3 aspect-[4/3]">
                    <img
                      src={labCultureImage}
                      alt="Lab culture shelves"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontWeight: 600,
                      color: 'hsl(var(--synervion-text-primary))'
                    }}
                  >
                    Lab Environment
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-tertiary))'
                    }}
                  >
                    Scientific, clean, professional
                  </p>
                </div>

                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg mb-3 aspect-[4/3]">
                    <img
                      src={teamLabImage}
                      alt="Team in lab - 6 members"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontWeight: 600,
                      color: 'hsl(var(--synervion-text-primary))'
                    }}
                  >
                    Full Team Photo
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-tertiary))'
                    }}
                  >
                    Diverse, collaborative, authentic
                  </p>
                </div>

                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg mb-3 aspect-[4/3]">
                    <img
                      src={revaFloraFacility}
                      alt="Reva Flora facility exterior"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontWeight: 600,
                      color: 'hsl(var(--synervion-text-primary))'
                    }}
                  >
                    Reva Flora Partnership
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-tertiary))'
                    }}
                  >
                    Research facility, infrastructure scale
                  </p>
                </div>
              </div>

              {/* Product Photography */}
              <h3
                className="mb-6 mt-12 text-lg sm:text-xl"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Product Photography
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg mb-3 aspect-[4/3] bg-gradient-to-br from-[hsl(var(--synervion-bg-gray-50))] to-white flex items-center justify-center p-6">
                    <img
                      src={productLineup}
                      alt="Branded product lineup"
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontWeight: 600,
                      color: 'hsl(var(--synervion-text-primary))'
                    }}
                  >
                    Branded Products
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-tertiary))'
                    }}
                  >
                    Coffee, drops, bars - diverse formats
                  </p>
                </div>

                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg mb-3 aspect-[4/3] bg-white flex items-center justify-center p-6">
                    <img
                      src={whiteLabelPackaging}
                      alt="White-label packaging options"
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontWeight: 600,
                      color: 'hsl(var(--synervion-text-primary))'
                    }}
                  >
                    White-Label Lineup
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-tertiary))'
                    }}
                  >
                    Versatile packaging for partner brands
                  </p>
                </div>

                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg mb-3 aspect-[4/3] bg-gradient-to-br from-[hsl(var(--synervion-bg-gray-50))] to-white flex items-center justify-center p-6">
                    <img
                      src={productMockups}
                      alt="Product format mockups"
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontWeight: 600,
                      color: 'hsl(var(--synervion-text-primary))'
                    }}
                  >
                    Format Mockups
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-tertiary))'
                    }}
                  >
                    Bottles, pouches, bars, tubes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[hsl(var(--synervion-secondary-800))] to-[hsl(var(--synervion-secondary-700))]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
            <h2
              className="mb-6 text-[28px] sm:text-[36px] lg:text-[40px]"
              style={{
                fontFamily: 'var(--synervion-font-heading)',
                fontWeight: 600,
                lineHeight: '1.2',
                color: 'white'
              }}
            >
              Ready to Build with <span style={{ color: 'hsl(var(--synervion-primary-500))' }}>Synervion</span>?
            </h2>
            <p
              className="mb-8 text-base lg:text-lg max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--synervion-font-body)',
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              Download the complete brand assets package or explore our component library.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BrandButton variant="primary" size="lg" className="min-h-[48px]">
                <Download className="w-5 h-5" />
                Download Brand Kit
              </BrandButton>
              <BrandButton
                variant="outline"
                size="lg"
                onClick={() => onNavigate?.('home')}
                className="border-white text-white hover:bg-white hover:text-[hsl(var(--synervion-secondary-800))] min-h-[48px]"
              >
                View Homepage
              </BrandButton>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
