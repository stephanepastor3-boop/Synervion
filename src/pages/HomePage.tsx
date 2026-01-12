import { Helmet } from 'react-helmet-async';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { LabGrownAdvantage } from '../components/LabGrownAdvantage';
import { PartnershipModels } from '../components/PartnershipModels';
import { ScientificEvidence } from '../components/ExploreResearch';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

import { FeaturedArticles } from '../components/FeaturedArticles';

import { ProductShowcase } from '../components/products/ProductShowcase';

export function HomePage() {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split('T')[0];

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
        {/* Product Schema for SEO */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "Synervion® CORE Caps",
              "image": "https://www.synervion.com/assets/product-core-caps.png",
              "description": "Capsule-Ready Performance System. High-potency 500mg fill, standard size 0 capsules.",
              "brand": {
                "@type": "Brand",
                "name": "Synervion"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://www.synervion.com/product/synv-core",
                "priceCurrency": "USD",
                "price": "0",
                "priceValidUntil": priceValidUntil,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "hasMerchantReturnPolicy": {
                  "@type": "MerchantReturnPolicy",
                  "applicableCountry": "IN",
                  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                  "merchantReturnDays": "30",
                  "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility",
                  "returnMethod": "https://schema.org/ReturnByMail"
                },
                "shippingDetails": {
                  "@type": "OfferShippingDetails",
                  "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "INR"
                  },
                  "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "IN"
                  },
                  "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": "0",
                      "maxValue": "1",
                      "unitCode": "DAY"
                    },
                    "transitTime": {
                      "@type": "QuantitativeValue",
                      "minValue": "2",
                      "maxValue": "5",
                      "unitCode": "DAY"
                    }
                  }
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "1"
              },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Organization",
                  "name": "Synervion Quality Assurance"
                }
              }
            },
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "Synervion® PULSE Liquids",
              "image": "https://www.synervion.com/assets/product-pulse-hero.png",
              "description": "Fast-Acting Nano-Extract. Dual-extraction process for drinks and liquids.",
              "brand": {
                "@type": "Brand",
                "name": "Synervion"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://www.synervion.com/product/synv-pulse",
                "priceCurrency": "USD",
                "price": "180",
                "priceValidUntil": priceValidUntil,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "hasMerchantReturnPolicy": {
                  "@type": "MerchantReturnPolicy",
                  "applicableCountry": "IN",
                  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                  "merchantReturnDays": "30",
                  "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility",
                  "returnMethod": "https://schema.org/ReturnByMail"
                },
                "shippingDetails": {
                  "@type": "OfferShippingDetails",
                  "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "INR"
                  },
                  "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "IN"
                  },
                  "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": "0",
                      "maxValue": "1",
                      "unitCode": "DAY"
                    },
                    "transitTime": {
                      "@type": "QuantitativeValue",
                      "minValue": "2",
                      "maxValue": "5",
                      "unitCode": "DAY"
                    }
                  }
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "1"
              },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Organization",
                  "name": "Synervion Quality Assurance"
                }
              }
            },
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "Synervion® ROOT Powders",
              "image": "https://www.synervion.com/assets/product-root-powders.png",
              "description": "Whole-Food Nutrition Base. 100% fruiting body, micronized <50 mesh.",
              "brand": {
                "@type": "Brand",
                "name": "Synervion"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://www.synervion.com/product/synv-root",
                "priceCurrency": "USD",
                "price": "0",
                "priceValidUntil": priceValidUntil,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "hasMerchantReturnPolicy": {
                  "@type": "MerchantReturnPolicy",
                  "applicableCountry": "IN",
                  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                  "merchantReturnDays": "30",
                  "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility",
                  "returnMethod": "https://schema.org/ReturnByMail"
                },
                "shippingDetails": {
                  "@type": "OfferShippingDetails",
                  "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "INR"
                  },
                  "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "IN"
                  },
                  "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": "0",
                      "maxValue": "1",
                      "unitCode": "DAY"
                    },
                    "transitTime": {
                      "@type": "QuantitativeValue",
                      "minValue": "2",
                      "maxValue": "5",
                      "unitCode": "DAY"
                    }
                  }
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "1"
              },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Organization",
                  "name": "Synervion Quality Assurance"
                }
              }
            }
          ])}
        </script>
      </Helmet>
      <Navigation />
      <main>
        <Hero />
        {/* <ProductBenefits /> - Hidden for better flow */}
        <ProductShowcase />
        <LabGrownAdvantage />
        {/* <WhatWeSupply /> - Replaced by ProductShowcase details */}
        <ScientificEvidence />
        <FeaturedArticles />
        <PartnershipModels />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
