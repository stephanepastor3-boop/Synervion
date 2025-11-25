import { BrandButton } from './brand/BrandButton';
import { ArrowRight, Microscope, Award, Handshake } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from '../assets/images/hero-cordyceps-macro.png';
import sustainabilityLeafIcon from '../assets/images/icon-leaf-sustainable.png';
import labGrownMicroscopeIcon from '../assets/images/icon-microscope-lab.png';
import premiumQualityIcon from '../assets/images/icon-award-premium.png';
import flexibleCollabsIcon from '../assets/images/icon-handshake-flexible.png';

export function Hero() {
  const features = [
    { iconType: 'image' as const, iconSrc: sustainabilityLeafIcon, label: 'Sustainable' },
    { iconType: 'image' as const, iconSrc: labGrownMicroscopeIcon, label: 'Lab-Grown', fallbackIcon: Microscope },
    { iconType: 'image' as const, iconSrc: premiumQualityIcon, label: 'Premium Quality', fallbackIcon: Award },
    { iconType: 'image' as const, iconSrc: flexibleCollabsIcon, label: 'Flexible Collabs', fallbackIcon: Handshake },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--synervion-secondary-800)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center py-20 sm:py-24 lg:py-32">
          {/* Left Content - Mobile: Full Width, Desktop: 6 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            {/* H1 - Responsive: 32px mobile → 48px tablet → 64px desktop */}
            <h1 className="mb-4 sm:mb-6 text-[32px] sm:text-[48px] lg:text-[64px] font-heading font-bold leading-tight tracking-tight text-foreground">
              Premium <span className="text-primary">Cordyceps</span> Ingredients for Wellness Brands
            </h1>

            {/* Body - Responsive: 16px mobile → 18px desktop */}
            <p className="mb-8 sm:mb-10 max-w-xl text-base lg:text-lg font-body font-normal leading-relaxed text-muted-foreground">
              Lab-grown Cordyceps militaris extract and biomass for your product formulations.
              B2B ingredient supply with full traceability, proven efficacy, and flexible partnership models.
            </p>

            {/* Feature Icons - Mobile: 2 columns, Desktop: 4 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ImageWithFallback
                      src={feature.iconSrc}
                      alt={feature.label}
                      className={feature.label === 'Flexible Collabs' ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-5 h-5 sm:w-6 sm:h-6'}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span className="text-center text-xs sm:text-[12px] font-body text-foreground">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons - Mobile: Stack vertically, Desktop: Side by side */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <BrandButton
                size="lg"
                variant="primary"
                className="group w-full sm:w-auto"
              >
                Explore Partnerships
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
              <BrandButton
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                View Research
              </BrandButton>
            </div>
          </motion.div>

          {/* Right Image - Mobile: Full Width, Desktop: 6 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-6 relative mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Lab-grown Cordyceps macro - premium quality mushroom structure"
                className="w-full h-auto"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Stats Card - Responsive positioning */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-8 bg-card rounded-xl shadow-xl p-4 sm:p-5 lg:p-6 border border-border/50"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-base sm:text-lg lg:text-xl font-heading font-bold text-primary">
                    99.8%
                  </span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-body font-semibold text-foreground">
                    Purity Rate
                  </div>
                  <div className="text-[10px] sm:text-xs font-body text-muted-foreground">
                    Lab-Verified
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
