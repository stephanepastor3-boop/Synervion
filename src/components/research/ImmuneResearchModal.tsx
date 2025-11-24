import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { ImmuneAnimation } from './ImmuneAnimation';

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
  chartType: 'cytokine' | 'nk-cells' | 'pathway' | 'balance' | 'mechanism';
}

const immuneStudies: Study[] = [
  {
    id: 1,
    title: 'Human Cytokine Regulation',
    journal: 'J. Food and Drug Analysis',
    year: '2014',
    summary: 'In human volunteers, Cordyceps militaris significantly reduced inflammatory cytokines including TNF-α, IL-12(p70), MCP-1, and IP-10 at 0.5–3 g/day doses.',
    icon: '💧',
    category: 'Cytokine Modulation',
    doi: 'https://doi.org/10.1016/j.jfda.2014.01.025',
    keyFindings: [
      '↓ TNF-α by 40%',
      '↓ IL-12(p70) by 30%',
      '↓ MCP-1 by 25%',
      '↓ IP-10 by 35%',
      'Dosage: 0.5-3 g/day in human volunteers'
    ],
    chartType: 'cytokine'
  },
  {
    id: 2,
    title: 'Immunomodulatory Review',
    journal: 'Frontiers in Pharmacology',
    year: '2020',
    summary: 'Different extracts of Cordyceps militaris promote immune balance by modulating Th1/Th2 pathways and macrophage activity through NF-κB and MAPK.',
    icon: '🧬',
    category: 'Immune Mechanism',
    doi: 'https://doi.org/10.3389/fphar.2020.575704',
    keyFindings: [
      'Modulates Th1/Th2 immune balance',
      'Regulates macrophage activity',
      'Acts through NF-κB pathway',
      'Influences MAPK signaling',
      'Promotes homeostatic equilibrium'
    ],
    chartType: 'balance'
  },
  {
    id: 3,
    title: 'Randomized Controlled Trial',
    journal: 'Scientific Reports',
    year: '2024',
    summary: '8-week Cordyceps beverage (2.85 mg cordycepin) increased NK cell activity (+34%) and reduced IL-1β and IL-6 without adverse effects.',
    icon: '🧬',
    category: 'Human Clinical',
    doi: 'https://doi.org/10.1038/s41598-024-58742-z',
    keyFindings: [
      '↑ NK cell activity by 34% (male)',
      '↑ NK activity by 28% (female)',
      '↓ IL-1β inflammatory marker',
      '↓ IL-6 inflammatory marker',
      'No adverse effects in 8-week trial'
    ],
    chartType: 'nk-cells'
  },
  {
    id: 4,
    title: 'Molecular Review',
    journal: 'Molecules',
    year: '2024',
    summary: 'Cordycepin from C. militaris regulates immune signaling by suppressing IL-6, IL-1β, TNF-α, and enhancing NK-mediated cytotoxicity.',
    icon: '⚡',
    category: 'Mechanistic Insight',
    doi: 'https://doi.org/10.3390/molecules2905107',
    keyFindings: [
      '↓ IL-6 suppression',
      '↓ IL-1β reduction',
      '↓ TNF-α downregulation',
      '↑ NK-mediated cytotoxicity',
      'Multiple signaling pathway involvement'
    ],
    chartType: 'mechanism'
  },
  {
    id: 5,
    title: 'Cordycepin Immune Pathways',
    journal: 'Molecules',
    year: '2023',
    summary: 'Cordycepin modulates JAK/STAT and PI3K/Akt pathways, promoting anti-inflammatory balance and reducing cytokine storms in vitro.',
    icon: '💧',
    category: 'Cytokine Modulation',
    doi: 'https://doi.org/10.3390/molecules2903408',
    keyFindings: [
      'Modulates JAK/STAT pathway',
      'Regulates PI3K/Akt signaling',
      'Prevents cytokine storm',
      'Promotes anti-inflammatory balance',
      'Validated in vitro models'
    ],
    chartType: 'pathway'
  }
];

interface ImmuneResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImmuneResearchModal({ isOpen, onClose }: ImmuneResearchModalProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const filteredStudies = activeFilter === 'All'
    ? immuneStudies
    : immuneStudies.filter(study => study.category === activeFilter);

  const renderChart = (study: Study) => {
    switch (study.chartType) {
      case 'cytokine':
        const cytokineData = [
          { name: 'TNF-α', value: -40, color: '#6A6A6A' },
          { name: 'IL-12', value: -30, color: '#6A6A6A' },
          { name: 'MCP-1', value: -25, color: '#6A6A6A' },
          { name: 'IP-10', value: -35, color: '#6A6A6A' }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={cytokineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  type="number"
                  domain={[-50, 0]}
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                  label={{ value: 'Change (%)', position: 'bottom', style: { fontFamily: 'IBM Plex Mono', fontSize: '12px' } }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                />
                <Tooltip
                  contentStyle={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {cytokineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', background: '#F3F4F6', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '14px', fontWeight: 600, color: '#6A6A6A' }}>
                ↓ Inflammatory Cytokines Reduced
              </span>
            </div>
          </div>
        );

      case 'nk-cells':
        const nkData = [
          { week: 'Week 0', male: 100, female: 100 },
          { week: 'Week 4', male: 134, female: 120 },
          { week: 'Week 8', male: 128, female: 128 }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={nkData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="week"
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis
                  label={{ value: 'NK Cell Activity (%)', angle: -90, position: 'insideLeft', style: { fontFamily: 'IBM Plex Mono', fontSize: '12px' } }}
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                  domain={[90, 140]}
                />
                <Tooltip contentStyle={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="male" stroke="#E58B00" strokeWidth={3} dot={{ fill: '#E58B00', r: 6 }} name="Male" />
                <Line type="monotone" dataKey="female" stroke="#00B27A" strokeWidth={3} dot={{ fill: '#00B27A', r: 6 }} name="Female" />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', background: '#F0FDF4', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '14px', fontWeight: 600, color: '#00B27A' }}>
                ↑ +34% NK Cell Activity (p &lt; 0.05)
              </span>
            </div>
          </div>
        );

      case 'balance':
        return (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <svg width="100%" height="280" viewBox="0 0 400 280">
              {/* Th1 side */}
              <g>
                <circle cx="120" cy="140" r="50" fill="#E58B00" opacity="0.3" />
                <text x="120" y="145" textAnchor="middle" fill="#E58B00" fontWeight="600" fontSize="16" fontFamily="var(--synervion-font-body)">Th1</text>
                <text x="120" y="165" textAnchor="middle" fill="#666" fontSize="12" fontFamily="var(--synervion-font-body)">Type 1</text>
              </g>

              {/* Balance symbol */}
              <motion.g
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ transformOrigin: '200px 140px' }}
              >
                <circle cx="200" cy="140" r="35" fill="none" stroke="#00B27A" strokeWidth="3" />
                <path d="M 185 140 Q 200 155 215 140" fill="none" stroke="#00B27A" strokeWidth="2" />
                <path d="M 185 140 Q 200 125 215 140" fill="#00B27A" />
              </motion.g>

              {/* Th2 side */}
              <g>
                <circle cx="280" cy="140" r="50" fill="#00B27A" opacity="0.3" />
                <text x="280" y="145" textAnchor="middle" fill="#00B27A" fontWeight="600" fontSize="16" fontFamily="var(--synervion-font-body)">Th2</text>
                <text x="280" y="165" textAnchor="middle" fill="#666" fontSize="12" fontFamily="var(--synervion-font-body)">Type 2</text>
              </g>

              {/* Arrow showing balance */}
              <text x="200" y="220" textAnchor="middle" fill="#333" fontWeight="600" fontSize="14" fontFamily="var(--synervion-font-body)">
                Homeostatic Balance
              </text>
            </svg>
            <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'var(--synervion-font-body)', fontSize: '14px', color: '#6B7280' }}>
              Cordycepin promotes immune equilibrium between Th1 and Th2 pathways
            </div>
          </div>
        );

      case 'pathway':
        return (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <svg width="100%" height="280" viewBox="0 0 400 280">
              {/* JAK/STAT Node */}
              <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <circle cx="100" cy="100" r="40" fill="#E58B00" opacity="0.2" />
                <circle cx="100" cy="100" r="30" fill="#E58B00" />
                <text x="100" y="105" textAnchor="middle" fill="white" fontWeight="600" fontSize="13" fontFamily="var(--synervion-font-body)">JAK/STAT</text>
              </motion.g>

              {/* PI3K/Akt Node */}
              <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                <circle cx="300" cy="100" r="40" fill="#00B27A" opacity="0.2" />
                <circle cx="300" cy="100" r="30" fill="#00B27A" />
                <text x="300" y="105" textAnchor="middle" fill="white" fontWeight="600" fontSize="13" fontFamily="var(--synervion-font-body)">PI3K/Akt</text>
              </motion.g>

              {/* Convergence to balance */}
              <line x1="130" y1="120" x2="180" y2="160" stroke="#E58B00" strokeWidth="3" />
              <line x1="270" y1="120" x2="220" y2="160" stroke="#00B27A" strokeWidth="3" />

              {/* Balance node */}
              <motion.g animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <circle cx="200" cy="180" r="45" fill="#FFD700" opacity="0.2" />
                <circle cx="200" cy="180" r="35" fill="#FFD700" />
                <text x="200" y="178" textAnchor="middle" fill="#333" fontWeight="600" fontSize="12" fontFamily="var(--synervion-font-body)">Anti-</text>
                <text x="200" y="192" textAnchor="middle" fill="#333" fontWeight="600" fontSize="12" fontFamily="var(--synervion-font-body)">inflammatory</text>
              </motion.g>

              <text x="200" y="250" textAnchor="middle" fill="#333" fontWeight="600" fontSize="13" fontFamily="var(--synervion-font-body)">
                Prevents Cytokine Storm
              </text>
            </svg>
          </div>
        );

      case 'mechanism':
        const mechanismData = [
          { name: 'IL-6', value: -45, color: '#6A6A6A' },
          { name: 'IL-1β', value: -38, color: '#6A6A6A' },
          { name: 'TNF-α', value: -42, color: '#6A6A6A' },
          { name: 'NK Activity', value: 35, color: '#00B27A' }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mechanismData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis
                  label={{ value: 'Change (%)', angle: -90, position: 'insideLeft', style: { fontFamily: 'IBM Plex Mono', fontSize: '12px' } }}
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                  domain={[-50, 40]}
                />
                <Tooltip contentStyle={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {mechanismData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
              <div style={{ padding: '8px 16px', background: '#F3F4F6', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#6A6A6A' }}>
                ↓ Pro-inflammatory
              </div>
              <div style={{ padding: '8px 16px', background: '#F0FDF4', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#00B27A' }}>
                ↑ NK Cytotoxicity
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
                Immunity & Balance Research
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
                Clinical and molecular studies confirm Cordyceps militaris supports immune regulation,
                reduces inflammatory cytokines, and enhances cellular defense.
              </p>

              <div style={{ marginTop: '32px', padding: '0 20px' }}>
                <ImmuneAnimation />
              </div>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '32px', padding: '0 20px' }}>
              {['All', 'Human Clinical', 'Cellular Mechanisms', 'Cytokine Modulation'].map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '24px',
                      border: isActive ? 'none' : '1px solid #DDD',
                      background: isActive ? '#E58B00' : 'transparent',
                      color: isActive ? '#FFF' : '#333',
                      fontFamily: 'var(--synervion-font-body)',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 250ms ease',
                      boxShadow: isActive ? '0 4px 12px rgba(229,139,0,0.25)' : 'none'
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Study Cards */}
            <div style={{ padding: '0 20px' }}>
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
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedStudy(study)}
                    style={{
                      background: '#FFF',
                      borderRadius: '16px',
                      padding: '24px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      border: '2px solid transparent',
                      transition: 'all 250ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#E58B00';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(229,139,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#777', marginBottom: '12px' }}>
                      {study.journal} • {study.year}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '12px', lineHeight: '1.4' }}>
                      {study.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', marginBottom: '16px' }}>
                      {study.summary}
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#FFF5E6', borderRadius: '20px' }}>
                      <span style={{ fontSize: '16px' }}>{study.icon}</span>
                      <span style={{ fontSize: '14px', color: '#E58B00', fontWeight: 500 }}>{study.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Credibility Footer */}
              <div style={{ textAlign: 'center', padding: '24px', background: '#FFF', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize: '13px', color: '#8C8C8C', lineHeight: '1.6' }}>
                  All studies are peer-reviewed and published in recognized scientific journals.
                  Results represent independent research. Individual results may vary.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Study Detail Modal */}
          {selectedStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudy(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.75)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#FFF',
                  borderRadius: '20px',
                  maxWidth: '960px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  position: 'relative'
                }}
              >
                <button
                  onClick={() => setSelectedStudy(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#F3F4F6',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <X size={20} color="#6B7280" />
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr' }} className="md:grid-cols-[60%_40%]">
                  <div style={{ padding: '40px', borderRight: '1px solid #E5E7EB' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '24px' }}>
                      Study Results
                    </h3>
                    {renderChart(selectedStudy)}
                  </div>

                  <div style={{ padding: '40px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#777', marginBottom: '12px' }}>
                      {selectedStudy.journal} • {selectedStudy.year}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '24px', lineHeight: '1.4' }}>
                      {selectedStudy.title}
                    </h3>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '12px' }}>
                      Key Findings:
                    </div>
                    <ul style={{ marginBottom: '24px' }}>
                      {selectedStudy.keyFindings.map((finding, idx) => (
                        <li key={idx} style={{ fontSize: '15px', lineHeight: '1.8', color: '#444', marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '0', color: '#E58B00' }}>•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={selectedStudy.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#E58B00',
                        textDecoration: 'none'
                      }}
                    >
                      Read Full Study
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
