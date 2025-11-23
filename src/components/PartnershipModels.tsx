import { BrandCard } from './brand/BrandCard';
import { BrandBadge } from './brand/BrandBadge';
import { BrandButton } from './brand/BrandButton';
import { Package, Sparkles, Beaker, ArrowRight, Globe, CheckCircle2 } from 'lucide-react';
import whiteLabelPackaging from '../assets/images/vision-bg.png';
import revaFloraFacility from '../assets/images/lab-grown-advantage.png';
import { useScrollAnimation } from './ui/use-scroll-animation';
import { cn } from './ui/utils';

export function PartnershipModels() {
  const headerAnimation = useScrollAnimation();
  const imageAnimation = useScrollAnimation();
  const revaAnimation = useScrollAnimation();

  const models = [
    {
      icon: Package,
      badge: 'Most Popular',
      title: 'White-Label',
      description: 'Ready-to-market Cordyceps products with our proven formulations under your brand.',
      features: [
        'Pre-tested formulations',
        'Custom packaging design',
        'Fast time to market (4-6 weeks)',
        'Minimum order: 1,000 units',
      ],
    },
    {
      icon: Sparkles,
      badge: 'Fast & cost effective',
      title: 'Co-Brand',
      description: 'Joint ventures that leverage both our expertise and your market presence.',
      features: [
        'Shared brand development',
        'Co-marketing initiatives',
        'Revenue sharing model',
        'Strategic long-term partnership',
      ],
    },
    {
      icon: Beaker,
      badge: 'Enterprise',
      title: 'Custom Formulation',
      description: 'Bespoke Cordyceps solutions tailored to your unique product requirements.',
      features: [
        'Dedicated R&D collaboration',
        'Proprietary blend development',
        'Exclusive supply agreements',
        'Clinical trial support',
      ],
    },
  ];

  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-gradient-to-b from-background via-[#FAFAF5]/50 to-background pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <header
          ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-10 sm:mb-12 lg:mb-16 transition-opacity duration-500",
            headerAnimation.isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <BrandBadge variant="primary" className="mb-4 sm:mb-6">
            Partnership Models
          </BrandBadge>

          <h2 className="mb-4 sm:mb-6 text-[28px] sm:text-[40px] lg:text-[48px] px-4 font-heading font-semibold leading-tight tracking-tight text-foreground">
            Flexible <span className="text-primary">Collaboration</span> Options
          </h2>

          <p className="max-w-3xl mx-auto text-base lg:text-lg px-4 font-body font-normal leading-relaxed text-muted-foreground">
            Choose the partnership model that aligns with your business goals.
            From turnkey solutions to fully custom formulations.
          </p>
        </header>

        {/* Partnership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {models.map((model, index) => {
            const Icon = model.icon;
            const cardAnimation = useScrollAnimation();

            return (
              <div
                key={model.title}
                ref={cardAnimation.ref as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-opacity duration-500",
                  cardAnimation.isVisible ? "opacity-100" : "opacity-0"
                )}
              >
                <BrandCard
                  variant="partnership"
                  badge={model.badge}
                  icon={<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />}
                  title={model.title}
                  description={model.description}
                  features={model.features}
                />
              </div>
            );
          })}
        </div>

        {/* Reva Flora Partnership */}
        <div
          ref={revaAnimation.ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 sm:mb-24 transition-opacity duration-500",
            revaAnimation.isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
            <BrandBadge variant="secondary">
              Strategic Partnership
            </BrandBadge>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold">
              Powering Innovation with <span className="text-primary">Reva Flora</span>
            </h3>

            <p className="text-base text-muted-foreground leading-relaxed">
              Partnering with Reva Flora, India's leading botanical research institute,
              to accelerate innovation in functional fungi cultivation. This collaboration brings
              together commercial expertise with cutting-edge research capabilities.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Joint R&D for next-generation cultivation',
                'Shared access to advanced biotech labs',
                'Collaborative clinical efficacy studies',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={revaFloraFacility}
                alt="Reva Flora Culture - Synervion partner facility"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-sm font-semibold font-heading">
                      Reva Flora Facility
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Joint Research Initiative
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* White-Label Showcase Image */}
        <div
          ref={imageAnimation.ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "flex justify-center mb-10 sm:mb-12 lg:mb-16 transition-opacity duration-500",
            imageAnimation.isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="w-full max-w-[800px]">
            <div className="relative aspect-square w-full">
              <img
                src={whiteLabelPackaging}
                alt="White-label Cordyceps product packaging showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="mb-4 text-xl sm:text-2xl font-heading font-semibold text-foreground">
            Ready to Partner?
          </h3>
          <p className="mb-6 sm:mb-8 max-w-2xl mx-auto text-base font-body font-normal leading-relaxed text-muted-foreground">
            Schedule a consultation to discuss which partnership model is right for your brand.
          </p>
          <BrandButton
            size="lg"
            variant="primary"
            className="group"
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Schedule Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
