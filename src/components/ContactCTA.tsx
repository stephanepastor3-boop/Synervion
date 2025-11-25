import { BrandButton } from './brand/BrandButton';
import { ArrowRight, Mail } from 'lucide-react';
import { useScrollAnimation } from './ui/use-scroll-animation';
import { ContactModal } from './ContactModal';
import { cn } from './ui/utils';

export function ContactCTA() {
  const headerAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--synervion-secondary-800))] to-[hsl(var(--synervion-secondary-700))] pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
            className={cn(
              "lg:col-span-7 text-center lg:text-left transition-opacity duration-500",
              headerAnimation.isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
              <Mail className="w-4 h-4 text-white" strokeWidth={1.5} />
              <span className="text-xs sm:text-sm font-heading text-white">
                Get In Touch
              </span>
            </div>

            <h2 className="mb-4 sm:mb-6 text-[28px] sm:text-[40px] lg:text-[48px] font-heading font-semibold leading-tight tracking-tight text-white">
              Ready to Build Something <span className="text-primary">Great</span>?
            </h2>

            <p className="mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 text-base lg:text-lg font-body font-normal leading-relaxed text-white/90">
              Join 50+ leading wellness brands who trust Synervion for premium Cordyceps ingredients.
              Let's discuss how we can power your next innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <ContactModal>
                <BrandButton
                  variant="primary"
                  size="lg"
                  className="group w-full sm:w-auto min-h-[48px]"
                >
                  Start Partnership
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </ContactModal>

              <ContactModal>
                <BrandButton
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[hsl(var(--synervion-secondary-800))] w-full sm:w-auto min-h-[48px]"
                >
                  Contact Us
                </BrandButton>
              </ContactModal>
            </div>
          </div>

          {/* Right Stats */}
          <div
            ref={statsAnimation.ref as React.RefObject<HTMLDivElement>}
            className={cn(
              "lg:col-span-5 transition-opacity duration-500",
              statsAnimation.isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { value: '50+', label: 'Brand Partners' },
                { value: '99.8%', label: 'Purity Rate' },
                { value: '100%', label: 'Traceable' },
                { value: '< 24h', label: 'Response Time' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-center hover:bg-white/20 transition-colors"
                >
                  <div className="mb-2 text-[40px] font-heading font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm font-body font-normal text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="mb-3 text-base font-heading font-semibold text-white">
                Direct Contact
              </div>
              <div className="text-sm font-body font-normal leading-relaxed text-white/80">
                <a href="mailto:info@synervion.com" className="hover:text-primary transition-colors">info@synervion.com</a><br />
                <a href="tel:+918823888238" className="hover:text-primary transition-colors">+91 88238 88238</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
