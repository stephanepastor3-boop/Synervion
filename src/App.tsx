import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ArticleTemplate } from './components/ArticleTemplate';
import { articles } from './data/articles';
import ScrollToHashElement from './components/ScrollToHashElement';
import { LegacyRedirects } from './components/LegacyRedirects';
import { initGA } from './lib/analytics';
import { AnalyticsTracker } from './components/AnalyticsTracker';

// Initialize GA
initGA();


const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const StudyPage = lazy(() => import('./pages/StudyPage').then(module => ({ default: module.StudyPage })));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const PartnershipsPage = lazy(() => import('./pages/PartnershipsPage').then(module => ({ default: module.PartnershipsPage })));
const BrandSystemPage = lazy(() => import('./pages/BrandSystemPage').then(module => ({ default: module.BrandSystemPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const ProductPage = lazy(() => import('./pages/ProductPage').then(module => ({ default: module.ProductPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToHashElement />
        <AnalyticsTracker />
        <LegacyRedirects />
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "name": [
                "Products",
                "Synervion® CORE Caps",
                "Synervion® PULSE Liquids",
                "Synervion® ROOT Powders",
                "About Us",
                "Contact"
              ],
              "url": [
                "https://www.synervion.com",
                "https://www.synervion.com/product/synv-core",
                "https://www.synervion.com/product/synv-pulse",
                "https://www.synervion.com/product/synv-root",
                "https://www.synervion.com/about",
                "https://www.synervion.com/contact"
              ]
            })}
          </script>
        </Helmet>

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/brand-system" element={<BrandSystemPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/study/:id" element={<StudyPage />} />
            <Route path="/calculator/cordyceps-goal-planner" element={<CalculatorPage />} />
            {articles.map((article) => (
              <Route
                key={article.slug}
                path={`/${article.slug}`}
                element={<ArticleTemplate article={article} />}
              />
            ))}
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
