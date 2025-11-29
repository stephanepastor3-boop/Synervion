import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  image?: string;
}

export function SEO({ 
  title = "Synervion | Premium Lab-Grown Cordyceps & Nutraceuticals", 
  description = "Synervion leads the way in lab-grown Cordyceps militaris and premium nutraceuticals. Discover our high-potency, sustainable, and scientifically verified health solutions.",
  canonical,
  keywords = "Cordyceps militaris, lab-grown cordyceps, nutraceuticals, health supplements, immune support, energy booster, sustainable nutrition, Synervion",
  image = "https://www.synervion.com/assets/hero-cordyceps-macro-B95TAOQ7.png"
}: SEOProps) {
  const siteUrl = 'https://www.synervion.com';
  const fullCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
