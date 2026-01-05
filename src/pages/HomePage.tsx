import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { ProductBenefits } from '../components/ProductBenefits';
import { LabGrownAdvantage } from '../components/LabGrownAdvantage';
import { WhatWeSupply } from '../components/WhatWeSupply';
import { PartnershipModels } from '../components/PartnershipModels';
import { ExploreResearch } from '../components/ExploreResearch';
import { FeaturedArticles } from '../components/FeaturedArticles';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

import { ProductShowcase } from '../components/products/ProductShowcase';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--synervion-bg-white))]">
      <SEO canonical="/" />
      <Navigation />
      <main>
        <Hero />
        <ProductBenefits />
        <LabGrownAdvantage />
        <ProductShowcase />
        <WhatWeSupply />
        <PartnershipModels />
        <ExploreResearch />
        <FeaturedArticles />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
