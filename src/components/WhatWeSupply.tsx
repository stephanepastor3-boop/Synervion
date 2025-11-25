import { BrandCard } from './brand/BrandCard';
import { BrandBadge } from './brand/BrandBadge';
import { BrandButton } from './brand/BrandButton';
import { Package, Beaker, Settings, FileCheck, Award, Headphones, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from './ui/use-scroll-animation';
import { cn } from './ui/utils';

export function WhatWeSupply() {
    const headerAnimation = useScrollAnimation();

    const ingredients = [
        {
            icon: Package,
            title: 'Cordyceps Biomass',
            description: 'Dried powdered mycelium in bulk quantities. Organic certified, 100% traceable from cultivation to delivery.',
            features: ['50kg+ minimum order', 'Organic certified', 'Full traceability'],
        },
        {
            icon: Beaker,
            title: 'Standardized Extracts',
            description: 'Concentrated Cordyceps extracts with guaranteed polysaccharide content. Water or dual-extraction methods available.',
            features: ['10%, 20%, 30% options', 'Custom concentrations', 'COA with every batch'],
        },
        {
            icon: Settings,
            title: 'Custom Formulations',
            description: 'Proprietary blend development for enterprise partners. Dedicated R&D collaboration with stability testing.',
            features: ['Exclusive supply agreements', 'Clinical trial support', 'Dosage optimization'],
        },
    ];

    const services = [
        {
            icon: FileCheck,
            title: 'White-Label Support',
            description: 'Proven formulations ready to market under your brand with custom packaging design.',
        },
        {
            icon: Award,
            title: 'Regulatory Compliance',
            description: 'Assistance with FDA, EU, and international certification requirements and documentation.',
        },
        {
            icon: Headphones,
            title: 'Ongoing Quality Testing',
            description: 'Certificate of Analysis (COA) with every shipment, plus quarterly third-party verification.',
        },
    ];

    return (
        <section
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
                        What <span className="text-primary">Synervion</span> Supplies
                    </h2>

                    <BrandBadge variant="primary" className="mb-4 sm:mb-6">
                        B2B Ingredient Supply
                    </BrandBadge>

                    <p className="max-w-3xl mx-auto text-base lg:text-lg px-4 font-body font-normal leading-relaxed text-muted-foreground">
                        We don't sell finished products to consumers. We supply premium Cordyceps ingredients
                        and services to wellness brands who create their own products.
                    </p>
                </header>

                {/* Raw Ingredients */}
                <div className="mb-12 sm:mb-16">
                    <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-6 text-center">
                        Raw Ingredients
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                        {ingredients.map((item) => {
                            const Icon = item.icon;
                            const cardAnimation = useScrollAnimation();

                            return (
                                <div
                                    key={item.title}
                                    ref={cardAnimation.ref as React.RefObject<HTMLDivElement>}
                                    className={cn(
                                        "transition-opacity duration-500",
                                        cardAnimation.isVisible ? "opacity-100" : "opacity-0"
                                    )}
                                >
                                    <BrandCard
                                        variant="default"
                                        icon={<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />}
                                        title={item.title}
                                        description={item.description}
                                    >
                                        <ul className="mt-4 space-y-2">
                                            {item.features.map((feature, idx) => (
                                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </BrandCard>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Partnership Services */}
                <div className="mb-12 sm:mb-16">
                    <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-6 text-center">
                        Partnership Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                        {services.map((service) => {
                            const Icon = service.icon;
                            const cardAnimation = useScrollAnimation();

                            return (
                                <div
                                    key={service.title}
                                    ref={cardAnimation.ref as React.RefObject<HTMLDivElement>}
                                    className={cn(
                                        "transition-opacity duration-500",
                                        cardAnimation.isVisible ? "opacity-100" : "opacity-0"
                                    )}
                                >
                                    <BrandCard
                                        variant="default"
                                        icon={<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />}
                                        title={service.title}
                                        description={service.description}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p className="mb-6 text-base font-body font-normal text-muted-foreground">
                        Not sure what you need for your product line?
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
                        Schedule a Consultation
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </BrandButton>
                </div>
            </div>
        </section>
    );
}
