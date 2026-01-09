import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResearchCard } from './research/ResearchCard';
import { FilterTabs } from './research/FilterTabs';
import { StudyModal } from './research/StudyModal';

import { BrandBadge } from './brand/BrandBadge';
import { useScrollAnimation } from './ui/use-scroll-animation';

import studiesData from '../data/studies.json';
import { Study } from '../types';

// Article Imports
import { ArrowRight, BookOpen, Tag } from 'lucide-react';
import { articles } from '../data/articles';

export const studies: Study[] = studiesData as Study[];

const categories = ['All Studies', 'Comparative Analysis', 'Endurance Performance', 'Energy Metabolism', 'Antioxidant Defense', 'Sports Nutrition', 'Longevity Science', 'Cognitive Health', 'Immune Oncology', 'Sustainability', 'Functional Foods'];

export function ScientificEvidence() {
  const [selectedCategory, setSelectedCategory] = useState('All Studies');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const headerAnimation = useScrollAnimation();


  const filteredStudies = selectedCategory === 'All Studies'
    ? studies
    : studies.filter(study => study.category === selectedCategory);

  // Deep linking logic
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const studyId = searchParams.get('studyId');
    if (studyId) {
      const study = studies.find(s => s.id === Number(studyId));
      if (study) {
        setSelectedStudy(study);
        // Optional: Scroll to section
        const element = document.getElementById('rnd');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setSelectedStudy(null);
    // Remove query param without refreshing
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('studyId');
    setSearchParams(newParams, { replace: true });
  };

  // --- Article Logic ---
  const featuredSlugs = [
    'cordyceps-militaris-benefits',
    'cordyceps-for-high-altitude-training',
    'cordyceps-for-mental-clarity'
  ];
  const displayArticles = articles.filter(a => featuredSlugs.includes(a.slug));
  const finalArticles = [
    ...displayArticles,
    ...articles.filter(a => !featuredSlugs.includes(a.slug))
  ].slice(0, 3);


  return (
    <section
      id="rnd"
      className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--synervion-bg-white))] via-[#FAFAF5]/50 to-[hsl(var(--synervion-bg-white))] pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <header
          ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-10 sm:mb-12 lg:mb-16 transition-opacity duration-500"
          style={{ opacity: headerAnimation.isVisible ? 1 : 0 }}
        >
          <h2
            className="mb-4 sm:mb-6 text-[28px] sm:text-[40px] lg:text-[48px] px-4"
            style={{
              fontFamily: 'var(--synervion-font-heading)',
              fontWeight: 600,
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              color: 'hsl(var(--synervion-text-primary))'
            }}
          >
            <span style={{ color: 'hsl(var(--synervion-primary-500))' }}>Scientific</span> Evidence
          </h2>

          <BrandBadge variant="primary" className="mb-4 sm:mb-6">
            Research & Insights
          </BrandBadge>

          <p
            className="max-w-3xl mx-auto text-base lg:text-lg px-4"
            style={{
              fontFamily: 'var(--synervion-font-body)',
              fontWeight: 400,
              lineHeight: '1.7',
              color: 'hsl(var(--synervion-text-secondary))'
            }}
          >
            Our Cordyceps formulations are backed by rigorous scientific research and verified by experts.
          </p>
        </header>

        {/* --- PART 1: Clinical Studies --- */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold font-heading">Clinical Studies</h3>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <FilterTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredStudies.map((study) => {
              const cardAnimation = useScrollAnimation();
              return (
                <div
                  key={study.id}
                  ref={cardAnimation.ref as React.RefObject<HTMLDivElement>}
                  className="transition-opacity duration-500"
                  style={{ opacity: cardAnimation.isVisible ? 1 : 0 }}
                  onClick={() => setSelectedStudy(study)}
                >
                  <ResearchCard {...study} onClick={() => setSelectedStudy(study)} />
                </div>
              );
            })}
          </div>
        </div>


        {/* --- PART 2: Expert Guides (Articles) --- */}
        <div id="articles" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold font-heading">Expert Guides</h3>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {finalArticles.map((article) => (
              <a
                key={article.slug}
                href={`/${article.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  {article.ogImage ? (
                    <img
                      src={article.ogImage}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <BookOpen size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-orange-600 rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-6 sm:p-8">
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Tag size={14} />
                      <span>{article.category}</span>
                    </div>
                    <span className="flex items-center text-sm font-semibold text-orange-600 group-hover:translate-x-1 transition-transform">
                      Read Guide <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Study Modal */}
      {selectedStudy && (
        <StudyModal
          study={selectedStudy}
          isOpen={!!selectedStudy}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
