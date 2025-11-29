import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { ProductBenefits } from '../components/ProductBenefits';
import { LabGrownAdvantage } from '../components/LabGrownAdvantage';
import { WhatWeSupply } from '../components/WhatWeSupply';
import { PartnershipModels } from '../components/PartnershipModels';
import { ExploreResearch } from '../components/ExploreResearch';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--synervion-bg-white))]">
      <SEO canonical="/" />
      <Navigation />
      <main>
        <Hero />
        <ProductBenefits />
        <LabGrownAdvantage />
        <WhatWeSupply />
        <PartnershipModels />
        <ExploreResearch />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
