import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BarChart3 } from 'lucide-react';
import { ResearchCard } from './ResearchCard';
import { FilterTabs } from './FilterTabs';
import { StudyModal } from './StudyModal';
import { CompareChart } from './CompareChart';

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

const energyStudies: Study[] = [
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
    year: '2017',
    summary: 'Extended endurance and glycogen storage; lowered lactic acid and BUN levels.',
    icon: '🏃',
    category: 'Endurance Performance',
    doi: 'https://doi.org/10.1186/s12970-017-0171-1',
    keyFindings: [
      '↑ Endurance duration by 39%',
      '↑ Glycogen storage capacity',
      '↓ Lactic acid accumulation',
      '↓ Blood urea nitrogen (BUN)',
      'Delayed onset of fatigue'
    ],
    chartType: 'line'
  }
];

interface EnergyResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnergyResearchModal({ isOpen, onClose }: EnergyResearchModalProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  const filteredStudies = activeFilter === 'All' 
    ? energyStudies 
    : energyStudies.filter(study => study.category === activeFilter);

  const handleStudyClick = (study: Study) => {
    setSelectedStudy(study);
  };

  const handleCompareStudyClick = (studyId: number) => {
    const study = energyStudies.find(s => s.id === studyId);
    if (study) {
      setShowCompare(false);
      setTimeout(() => setSelectedStudy(study), 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(4px)',
            overflowY: 'auto'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#F8F8F8',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '1200px',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              padding: '40px 20px'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#FFF',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F3F4F6';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFF';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <X size={20} color="#6B7280" />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
              <h2
                style={{
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#1B1B1B',
                  marginBottom: '12px',
                  lineHeight: '1.2'
                }}
              >
                Energy Enhancement Research
              </h2>
              <div
                style={{
                  width: '60px',
                  height: '4px',
                  background: '#E58B00',
                  margin: '0 auto 20px',
                  borderRadius: '2px'
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: '#555',
                  lineHeight: '1.6',
                  padding: '0 20px'
                }}
              >
                Independent research confirms Cordyceps militaris enhances endurance, energy metabolism, 
                and recovery through measurable cellular mechanisms.
              </p>
            </div>

            {/* Compare Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <button
                onClick={() => setShowCompare(!showCompare)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: showCompare ? '#E58B00' : '#FFFFFF',
                  color: showCompare ? '#FFFFFF' : '#333',
                  border: showCompare ? 'none' : '2px solid #E58B00',
                  borderRadius: '12px',
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 250ms ease',
                  boxShadow: showCompare 
                    ? '0 4px 12px rgba(229,139,0,0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <BarChart3 size={18} />
                {showCompare ? 'Show Study Cards' : 'Compare Studies'}
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '0 20px' }}>
              {showCompare ? (
                <CompareChart onStudyClick={handleCompareStudyClick} />
              ) : (
                <>
                  <FilterTabs 
                    activeFilter={activeFilter} 
                    onFilterChange={setActiveFilter} 
                  />
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '24px',
                      marginBottom: '40px'
                    }}
                  >
                    {filteredStudies.map((study, index) => (
                      <motion.div
                        key={study.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <ResearchCard
                          title={study.title}
                          journal={study.journal}
                          year={study.year}
                          summary={study.summary}
                          icon={study.icon}
                          category={study.category}
                          onClick={() => handleStudyClick(study)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {/* Credibility Footer */}
              <div
                style={{
                  textAlign: 'center',
                  padding: '24px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '13px',
                    color: '#8C8C8C',
                    lineHeight: '1.6'
                  }}
                >
                  All studies are peer-reviewed and published in recognized scientific journals. 
                  Results represent independent research and are not sponsored by Synervion. 
                  Individual results may vary.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Study Detail Modal */}
          <StudyModal
            study={selectedStudy}
            isOpen={!!selectedStudy}
            onClose={() => setSelectedStudy(null)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
