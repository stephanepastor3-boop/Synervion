import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ResearchCard } from './ResearchCard';
import { FilterTabs } from './FilterTabs';
import { StudyModal } from './StudyModal';
import { EnergyAnimation } from './EnergyAnimation';
import { Study } from '../../types';
import studiesData from '../../data/studies.json';

const energyStudies = (studiesData as Study[]).filter(s => [1, 2, 3, 18].includes(s.id));

interface EnergyResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnergyResearchModal({ isOpen, onClose }: EnergyResearchModalProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);


  const filteredStudies = activeFilter === 'All'
    ? energyStudies
    : energyStudies.filter(study => study.category === activeFilter);

  const handleStudyClick = (study: Study) => {
    setSelectedStudy(study);
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

              <div style={{ marginTop: '32px', padding: '0 20px' }}>
                <EnergyAnimation />
              </div>
            </div>



            {/* Content */}
            <div style={{ padding: '0 20px' }}>
              <FilterTabs
                categories={['All', 'Energy Metabolism', 'Antioxidant Defense', 'Endurance Performance']}
                selectedCategory={activeFilter}
                onSelectCategory={setActiveFilter}
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
                      id={study.id}
                      title={study.title}
                      journal={study.journal}
                      year={study.year}
                      summary={study.summary}
                      icon={study.icon}
                      category={study.category}
                      imageUrl={study.imageUrl}
                      onClick={() => handleStudyClick(study)}
                    />
                  </motion.div>
                ))}
              </div>

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
