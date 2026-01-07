import { Helmet } from 'react-helmet-async';
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
      <SEO canonical="https://www.synervion.com/" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Synervion",
            "url": "https://www.synervion.com",
            "logo": "https://www.synervion.com/logo-favicon-180x180.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-88238-88238",
              "contactType": "customer service",
              "email": "info@synervion.com"
            },
            "sameAs": [
              "https://www.linkedin.com/company/synervion"
            ]
          })}
        </script>
      </Helmet>
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
