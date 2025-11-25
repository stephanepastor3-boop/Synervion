import { useState } from 'react';
import { BrandCard } from './brand/BrandCard';
import { BrandBadge } from './brand/BrandBadge';
import { IconPillar } from './brand/IconPillar';
import { EnergyResearchModal } from './research/EnergyResearchModal';
import { ImmuneResearchModal } from './research/ImmuneResearchModal';
import { LongevityResearchModal } from './research/LongevityResearchModal';
import { VitalityResearchModal } from './research/VitalityResearchModal';
import { useScrollAnimation } from './ui/use-scroll-animation';
import { cn } from './ui/utils';

export function ProductBenefits() {
  const [showEnergyResearch, setShowEnergyResearch] = useState(false);
  const [showImmuneResearch, setShowImmuneResearch] = useState(false);
  const [showLongevityResearch, setShowLongevityResearch] = useState(false);
  const [showVitalityResearch, setShowVitalityResearch] = useState(false);
  const headerAnimation = useScrollAnimation();

  const benefits = [
    {
      iconType: 'pillar' as const,
      iconVariant: 'energy' as const,
      title: 'Energy Enhancement',
      description: 'Boost ATP production and cellular energy for sustained vitality throughout the day.',
      metric: '42%',
      metricLabel: 'Energy Increase',
      color: 'hsl(var(--synervion-primary-500))',
    },
    {
      iconType: 'pillar' as const,
      iconVariant: 'immune' as const,
      title: 'Immune Support',
      description: 'Strengthen natural defense mechanisms with beta-glucans and polysaccharides.',
      metric: '38%',
      metricLabel: 'Immune Response',
      color: 'hsl(var(--synervion-primary-500))',
    },
    {
      iconType: 'pillar' as const,
      iconVariant: 'vitality' as const,
      title: 'Vitality & Wellness',
      description: 'Support cardiovascular health and overall well-being with adaptogens.',
      metric: '35%',
      metricLabel: 'Vitality Score',
      color: 'hsl(var(--synervion-primary-500))',
    },
    {
      iconType: 'pillar' as const,
      iconVariant: 'longevity' as const,
      title: 'Longevity Support',
      description: 'Combat oxidative stress and support healthy aging with powerful antioxidants.',
      metric: '45%',
      metricLabel: 'Antioxidant Activity',
      color: 'hsl(var(--synervion-primary-500))',
    },
  ];

  return (
    <section
      id="features"
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
            Ingredient Benefits <span className="text-primary">Your Customers</span> Will Love
          </h2>

          <BrandBadge variant="primary" className="mb-4 sm:mb-6">
            Ingredient Applications
          </BrandBadge>

          <p className="max-w-3xl mx-auto text-base lg:text-lg px-4 font-body font-normal leading-relaxed text-muted-foreground">
            What your Cordyceps-enhanced products can offer consumers. Each benefit backed by peer-reviewed research
            and proven through rigorous clinical trials.
          </p>
        </header>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {benefits.map((benefit) => {
            const cardAnimation = useScrollAnimation();
            const handleClick = () => {
              if (benefit.title === 'Energy Enhancement') {
                setShowEnergyResearch(true);
              } else if (benefit.title === 'Immune Support') {
                setShowImmuneResearch(true);
              } else if (benefit.title === 'Longevity Support') {
                setShowLongevityResearch(true);
              } else if (benefit.title === 'Vitality & Wellness') {
                setShowVitalityResearch(true);
              }
            };

            let iconElement;
            if (benefit.iconType === 'pillar') {
              iconElement = <IconPillar variant={benefit.iconVariant} />;
            }

            const isClickable = benefit.title === 'Energy Enhancement' || benefit.title === 'Immune Support' || benefit.title === 'Longevity Support' || benefit.title === 'Vitality & Wellness';

            return (
              <div
                key={benefit.title}
                ref={cardAnimation.ref as React.RefObject<HTMLDivElement>}
                onClick={handleClick}
                className={cn(
                  "transition-opacity duration-500",
                  cardAnimation.isVisible ? "opacity-100" : "opacity-0",
                  isClickable ? "cursor-pointer" : "cursor-default"
                )}
              >
                <BrandCard
                  variant="benefit"
                  icon={iconElement}
                  title={benefit.title}
                  description={benefit.description}
                  metric={benefit.metric}
                  metricLabel={benefit.metricLabel}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center px-4">
          <p className="text-xs sm:text-sm font-body font-normal text-[hsl(var(--synervion-text-tertiary))] italic">
            *These benefits are what end consumers experience when brands formulate with our Cordyceps ingredients. Based on 8-week clinical trials.
          </p>
        </div>
      </div>

      {/* Research Modals */}
      <EnergyResearchModal
        isOpen={showEnergyResearch}
        onClose={() => setShowEnergyResearch(false)}
      />
      <ImmuneResearchModal
        isOpen={showImmuneResearch}
        onClose={() => setShowImmuneResearch(false)}
      />
      <LongevityResearchModal
        isOpen={showLongevityResearch}
        onClose={() => setShowLongevityResearch(false)}
      />
      <VitalityResearchModal
        isOpen={showVitalityResearch}
        onClose={() => setShowVitalityResearch(false)}
      />
    </section>
  );
}
