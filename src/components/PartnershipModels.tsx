import { BrandCard } from './brand/BrandCard';
import { BrandBadge } from './brand/BrandBadge';
import { BrandButton } from './brand/BrandButton';
import { Package, Sparkles, Beaker, ArrowRight, Globe, CheckCircle2 } from 'lucide-react';
import productAll from '../assets/images/products-all1.png';
import productDrops from '../assets/images/product-drops1.png';
import productEnergyBar from '../assets/images/product-energybar1.png';
import productPills from '../assets/images/product-pills1.png';
import labRevaFlora from '../assets/images/Lab-RevaFlora1.1.jpg';
import { useScrollAnimation } from './ui/use-scroll-animation';
import { cn } from './ui/utils';

export function PartnershipModels() {
  const headerAnimation = useScrollAnimation();
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
          <h2 className="mb-4 sm:mb-6 text-[28px] sm:text-[40px] lg:text-[48px] px-4 font-heading font-semibold leading-tight tracking-tight text-foreground">
            Flexible <span className="text-primary">Collaboration</span> Options
          </h2>

          <BrandBadge variant="primary" className="mb-4 sm:mb-6">
            Partnership Models
          </BrandBadge>

          <p className="max-w-3xl mx-auto text-base lg:text-lg px-4 font-body font-normal leading-relaxed text-muted-foreground">
            Choose the partnership model that aligns with your business goals.
            From turnkey solutions to fully custom formulations.
          </p>
        </header>

        {/* Partnership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {models.map((model) => {
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
                  icon={<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />}
                  title={model.title}
                  description={model.description}
                >
                  {/* Badge */}
                  <div className="mb-4">
                    <BrandBadge variant="secondary" className="text-xs">
                      {model.badge}
                    </BrandBadge>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </BrandCard>
              </div>
            );
          })}
        </div>




        {/* Application Examples */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground mb-4 text-center">
            Application Examples: What Brands Create With Our Ingredients
          </h3>
          <p className="text-base text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            These images show example products that wellness brands have created using our Cordyceps ingredients.
            Synervion supplies the raw material—you create the finished product under your brand.
          </p>

          {/* Available Formats Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { img: productAll, label: 'Sample Applications' },
              { img: productDrops, label: 'Tincture/Drops Format' },
              { img: productEnergyBar, label: 'Food Integration' },
              { img: productPills, label: 'Supplement Format' },
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-border shadow-md mb-4 group-hover:border-primary/30 group-hover:shadow-lg transition-all">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-base font-semibold font-heading text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reva Flora Partnership */}
        <div
          id="rnd"
          ref={revaAnimation.ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "space-y-8 mb-16 sm:mb-24 transition-opacity duration-500",
            revaAnimation.isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Text Content */}
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold">
              Powering Innovation with <span className="text-primary">Reva Flora</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              <BrandBadge variant="primary">
                Lab-Grown Excellence
              </BrandBadge>
              <BrandBadge variant="primary">
                Strategic Partnership
              </BrandBadge>
            </div>

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

          {/* Image - Below text, takes most horizontal space */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={labRevaFlora}
                alt="Synervion Lab-RevaFlora facility - Advanced research and cultivation center"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Smaller overlay banner */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg max-w-xs">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold font-heading">
                      Reva Flora Facility
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      Joint Research Initiative
                    </div>
                  </div>
                </div>
              </div>
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
