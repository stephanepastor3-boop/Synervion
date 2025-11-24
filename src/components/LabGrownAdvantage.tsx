import { BrandBadge } from './brand/BrandBadge';
import { CheckCircle2, Microscope, Leaf, TrendingUp, Award } from 'lucide-react';
import technicianImage from '../assets/images/Technician-RevaFlora1.png';
import { useScrollAnimation } from './ui/use-scroll-animation';
import { cn } from './ui/utils';

export function LabGrownAdvantage() {
  const headerAnimation = useScrollAnimation();
  const imageAnimation = useScrollAnimation();
  const certificationsAnimation = useScrollAnimation();

  const advantages = [
    {
      icon: CheckCircle2,
      title: '99.8% Purity',
      description: 'Controlled environment eliminates contaminants and ensures consistent quality.',
    },
    {
      icon: Microscope,
      title: 'Standardized Potency',
      description: 'Precise control of active compounds for reliable, measurable benefits.',
    },
    {
      icon: Leaf,
      title: '90% Carbon Reduction',
      description: 'Lab cultivation uses minimal resources compared to wild harvesting.',
    },
    {
      icon: TrendingUp,
      title: 'Year-Round Supply',
      description: 'No seasonal limitations or supply chain disruptions.',
    },
  ];

  const certifications = [
    { name: 'ISO 9001:2015', desc: 'Quality Management' },
    { name: 'GMP Certified', desc: 'Good Manufacturing Practice' },
    { name: 'USDA Organic', desc: 'Organic Certification' },
    { name: 'FSSAI Approved', desc: 'Food Safety Standards' },
  ];

  return (
    <section
      id="origin"
      className="relative overflow-hidden bg-gradient-to-b from-background via-[#FAFAF5]/50 to-background pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          {/* Left Content */}
          <div
            ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
            className={cn(
              "lg:col-span-5 order-2 lg:order-1 transition-opacity duration-500",
              headerAnimation.isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <BrandBadge variant="secondary" className="mb-4 sm:mb-6">
              Lab-Grown Excellence
            </BrandBadge>

            <h2 className="mb-4 sm:mb-6 text-[28px] sm:text-[40px] lg:text-[48px] font-heading font-semibold leading-tight tracking-tight text-foreground">
              The <span className="text-primary">Scientific</span> Advantage
            </h2>

            <p className="mb-6 sm:mb-8 text-base lg:text-lg font-body font-normal leading-relaxed text-muted-foreground">
              Our proprietary lab cultivation process delivers superior quality that wild-harvested
              Cordyceps simply cannot match. Every batch is tested, documented, and traceable.
            </p>

            {/* Advantages List */}
            <div className="space-y-4 sm:space-y-6">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                const itemAnimation = useScrollAnimation();

                return (
                  <div
                    key={advantage.title}
                    ref={itemAnimation.ref as React.RefObject<HTMLDivElement>}
                    className={cn(
                      "flex gap-3 sm:gap-4 group transition-opacity duration-500",
                      itemAnimation.isVisible ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 sm:mb-2 text-base sm:text-lg font-heading font-semibold text-foreground">
                        {advantage.title}
                      </h4>
                      <p className="text-sm sm:text-base font-body font-normal leading-relaxed text-muted-foreground">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div
            ref={imageAnimation.ref as React.RefObject<HTMLDivElement>}
            className={cn(
              "lg:col-span-7 order-1 lg:order-2 flex justify-center transition-opacity duration-500",
              imageAnimation.isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="w-full max-w-[800px]">
              <div className="relative aspect-square w-full">
                <img
                  src={technicianImage}
                  alt="Synervion lab technician working with Cordyceps culture samples"
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          ref={certificationsAnimation.ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "transition-opacity duration-500",
            certificationsAnimation.isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider font-heading text-[hsl(var(--synervion-text-tertiary))]">
              Certified for Excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="group p-4 sm:p-6 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="mb-1 text-sm sm:text-base font-semibold font-heading">
                  {cert.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
