import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ArticleTemplate } from './components/ArticleTemplate';
import { articles } from './data/articles';
import ScrollToHashElement from './components/ScrollToHashElement';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const StudyPage = lazy(() => import('./pages/StudyPage').then(module => ({ default: module.StudyPage })));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const PartnershipsPage = lazy(() => import('./pages/PartnershipsPage').then(module => ({ default: module.PartnershipsPage })));
const BrandSystemPage = lazy(() => import('./pages/BrandSystemPage').then(module => ({ default: module.BrandSystemPage })));

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/brand-system" element={<BrandSystemPage />} />
            <Route path="/study/:id" element={<StudyPage />} />
            <Route path="/calculator/cordyceps-goal-planner" element={<CalculatorPage />} />
            {articles.map((article) => (
              <Route
                key={article.slug}
                path={`/${article.slug}`}
                element={<ArticleTemplate article={article} />}
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
