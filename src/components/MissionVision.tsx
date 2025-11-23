import { motion } from 'motion/react';
import { BrandCard } from './brand/BrandCard';
import { Target, TrendingUp } from 'lucide-react';

export function MissionVision() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[hsl(var(--synervion-bg-white))]">
      {/* 12-Column Grid Container - Mobile: Stack */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Mission - Mobile: Full Width, Desktop: 6 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-primary-500))]/5 to-[hsl(var(--synervion-primary-500))]/0 border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))]/30 transition-all duration-300 h-full">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center mb-6 sm:mb-8">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[hsl(var(--synervion-primary-500))]" strokeWidth={1.5} />
              </div>

              {/* H3 - Responsive: 24px mobile → 28px tablet → 32px desktop */}
              <h3 
                className="mb-4 sm:mb-6 text-2xl sm:text-[28px] lg:text-[32px]"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Our Mission
              </h3>

              {/* Body - Responsive: 16px mobile → 18px desktop */}
              <p 
                className="mb-6 text-base lg:text-lg"
                style={{
                  fontFamily: 'var(--synervion-font-body)',
                  fontWeight: 400,
                  lineHeight: '1.7',
                  color: 'hsl(var(--synervion-text-secondary))'
                }}
              >
                To revolutionize the wellness industry by providing premium, lab-grown Cordyceps 
                that combines scientific rigor with sustainable practices. We empower brands to 
                create products that deliver real, measurable benefits.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-[hsl(var(--synervion-border-light))]">
                <div>
                  <div 
                    className="text-2xl sm:text-3xl lg:text-[32px] mb-1"
                    style={{
                      fontFamily: 'var(--synervion-font-heading)',
                      fontWeight: 700,
                      color: 'hsl(var(--synervion-primary-500))'
                    }}
                  >
                    5+
                  </div>
                  <div 
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-secondary))'
                    }}
                  >
                    Years of Research
                  </div>
                </div>
                <div>
                  <div 
                    className="text-2xl sm:text-3xl lg:text-[32px] mb-1"
                    style={{
                      fontFamily: 'var(--synervion-font-heading)',
                      fontWeight: 700,
                      color: 'hsl(var(--synervion-primary-500))'
                    }}
                  >
                    100%
                  </div>
                  <div 
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-secondary))'
                    }}
                  >
                    Traceable
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision - Mobile: Full Width, Desktop: 6 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[hsl(var(--synervion-secondary-800))]/5 to-[hsl(var(--synervion-secondary-800))]/0 border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-secondary-800))]/30 transition-all duration-300 h-full">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-[hsl(var(--synervion-secondary-800))]/10 flex items-center justify-center mb-6 sm:mb-8">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[hsl(var(--synervion-secondary-800))]" strokeWidth={1.5} />
              </div>

              {/* H3 - Responsive: 24px mobile → 28px tablet → 32px desktop */}
              <h3 
                className="mb-4 sm:mb-6 text-2xl sm:text-[28px] lg:text-[32px]"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  color: 'hsl(var(--synervion-text-primary))'
                }}
              >
                Our Vision
              </h3>

              {/* Body - Responsive: 16px mobile → 18px desktop */}
              <p 
                className="mb-6 text-base lg:text-lg"
                style={{
                  fontFamily: 'var(--synervion-font-body)',
                  fontWeight: 400,
                  lineHeight: '1.7',
                  color: 'hsl(var(--synervion-text-secondary))'
                }}
              >
                To become the global standard for functional fungi ingredients, setting new benchmarks 
                for quality, transparency, and sustainability. We envision a future where every wellness 
                brand has access to scientifically superior ingredients.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-[hsl(var(--synervion-border-light))]">
                <div>
                  <div 
                    className="text-2xl sm:text-3xl lg:text-[32px] mb-1"
                    style={{
                      fontFamily: 'var(--synervion-font-heading)',
                      fontWeight: 700,
                      color: 'hsl(var(--synervion-secondary-800))'
                    }}
                  >
                    50+
                  </div>
                  <div 
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-secondary))'
                    }}
                  >
                    Brand Partners
                  </div>
                </div>
                <div>
                  <div 
                    className="text-2xl sm:text-3xl lg:text-[32px] mb-1"
                    style={{
                      fontFamily: 'var(--synervion-font-heading)',
                      fontWeight: 700,
                      color: 'hsl(var(--synervion-secondary-800))'
                    }}
                  >
                    90%
                  </div>
                  <div 
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      color: 'hsl(var(--synervion-text-secondary))'
                    }}
                  >
                    Carbon Reduction
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
