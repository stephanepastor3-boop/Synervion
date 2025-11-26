import { useState } from 'react';
import { ResearchCard } from './research/ResearchCard';
import { FilterTabs } from './research/FilterTabs';
import { StudyModal } from './research/StudyModal';

import { BrandBadge } from './brand/BrandBadge';
import { useScrollAnimation } from './ui/use-scroll-animation';

interface Study {
  id: number;
  title: string;
  journal: string;
  year: string;
  summary: string;
  icon: string;
  category: string;
  doi: string;
  keyFindings: string[];
  chartType: 'bar' | 'pathway' | 'dual' | 'line';
}

const studies: Study[] = [
  {
    id: 1,
    title: 'Cordyceps militaris Improves Exercise Tolerance in Humans',
    journal: 'J. Dietary Supplements',
    year: '2017',
    summary: 'Increased VO₂max by 10.9% and ventilatory threshold by 41% after 3 weeks at 4 g/day.',
    icon: '🏃',
    category: 'Endurance Performance',
    doi: 'https://doi.org/10.1080/19390211.2016.1203386',
    keyFindings: [
      '↑ VO₂max by 10.9%',
      '↑ Ventilatory threshold by 41%',
      'Improved time to exhaustion (+8%)',
      'Benefits observed after 3 weeks',
      'Dosage: 4g/day Cordyceps militaris'
    ],
    chartType: 'bar'
  },
  {
    id: 2,
    title: 'Beneficial Effect of C. militaris on Exercise Performance',
    journal: 'Mycobiology',
    year: '2020',
    summary: 'Enhanced ATP generation via AMPK and GLUT4 activation, comparable to red ginseng.',
    icon: '⚡',
    category: 'Energy Metabolism',
    doi: 'https://doi.org/10.1080/12298093.2020.1831135',
    keyFindings: [
      '↑ AMPK pathway activation',
      '↑ GLUT4 glucose transporter',
      'Enhanced ATP production',
      'Comparable efficacy to red ginseng',
      'Improved cellular energy metabolism'
    ],
    chartType: 'pathway'
  },
  {
    id: 3,
    title: 'Studies on the Antifatigue Activities of C. militaris Extract',
    journal: 'Evid-Based Compl. Alt. Med.',
    year: '2015',
    summary: 'Activated AMPK and AKT/mTOR pathways, increased antioxidant enzymes, reduced ROS.',
    icon: '🧬',
    category: 'Antioxidant Defense',
    doi: 'https://doi.org/10.1155/2015/174616',
    keyFindings: [
      '↑ SOD activity by 25%',
      '↑ GSH-Px activity by 45%',
      '↓ ROS levels by 30%',
      'Activated AMPK and AKT/mTOR pathways',
      'Enhanced antioxidant defense system'
    ],
    chartType: 'dual'
  },
  {
    id: 4,
    title: 'Anti-fatigue Property of Cereal Grains Mixed with C. militaris',
    journal: 'J. Int. Soc. Sports Nutrition',
    year: '2016',
    summary: 'Increased time to exhaustion by 58%, reduced lactate and improved glucose metabolism.',
    icon: '🥣',
    category: 'Sports Nutrition',
    doi: 'https://doi.org/10.1186/s12970-016-0159-0',
    keyFindings: [
      '↑ Time to exhaustion by 58%',
      '↓ Blood lactate accumulation',
      'Improved glucose metabolism',
      'Enhanced glycogen storage',
      'Synergistic effect with cereal grains'
    ],
    chartType: 'line'
  }
];

const categories = ['All Studies', 'Endurance Performance', 'Energy Metabolism', 'Antioxidant Defense', 'Sports Nutrition'];

export function ExploreResearch() {
  const [selectedCategory, setSelectedCategory] = useState('All Studies');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const headerAnimation = useScrollAnimation();


  const filteredStudies = selectedCategory === 'All Studies'
    ? studies
    : studies.filter(study => study.category === selectedCategory);

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
            <span style={{ color: 'hsl(var(--synervion-primary-500))' }}>Peer-Reviewed</span> Research
          </h2>

          <BrandBadge variant="primary" className="mb-4 sm:mb-6">
            Research & Testing
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
            Our Cordyceps formulations are backed by rigorous scientific research
            published in leading journals. Explore the clinical evidence.
          </p>
        </header>

        {/* Filter Tabs */}
        <FilterTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
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

      {/* Study Modal */}
      {selectedStudy && (
        <StudyModal
          study={selectedStudy}
          isOpen={!!selectedStudy}
          onClose={() => setSelectedStudy(null)}
        />
      )}
    </section>
  );
}
