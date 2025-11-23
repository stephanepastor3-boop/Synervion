import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Line, ComposedChart } from 'recharts';

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
  chartData?: any;
  chartType: 'bar' | 'pathway' | 'dual' | 'line';
}

interface StudyModalProps {
  study: Study | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudyModal({ study, isOpen, onClose }: StudyModalProps) {
  if (!study) return null;

  const renderChart = () => {
    switch (study.chartType) {
      case 'bar':
        // Study #1: VO2max improvement
        const vo2Data = [
          { name: 'Before', value: 44.0, label: '44.0' },
          { name: 'After', value: 48.8, label: '48.8' }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={vo2Data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E58B00" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FFD48A" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis 
                  label={{ value: 'VO₂max (ml/kg/min)', angle: -90, position: 'insideLeft', style: { fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' } }}
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div 
              style={{
                textAlign: 'center',
                marginTop: '16px',
                padding: '12px',
                background: '#F0FDF4',
                borderRadius: '8px',
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '14px',
                fontWeight: 600,
                color: '#00B27A'
              }}
            >
              ↑ +10.9% VO₂max Improvement
            </div>
            <div 
              style={{
                textAlign: 'center',
                marginTop: '8px',
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '13px',
                color: '#6B7280'
              }}
            >
              Ventilatory Threshold: +41% ↑
            </div>
          </div>
        );

      case 'pathway':
        // Study #2: Energy metabolism pathway
        return (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <svg width="100%" height="280" viewBox="0 0 400 280">
              {/* AMPK Node */}
              <motion.g
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <circle cx="100" cy="140" r="40" fill="#E58B00" opacity="0.2" />
                <circle cx="100" cy="140" r="30" fill="#E58B00" />
                <text x="100" y="145" textAnchor="middle" fill="white" fontWeight="600" fontSize="14" fontFamily="var(--synervion-font-body)">AMPK</text>
              </motion.g>

              {/* Arrow to GLUT4 */}
              <motion.line
                x1="140" y1="140" x2="190" y2="140"
                stroke="#E58B00"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <polygon points="190,135 200,140 190,145" fill="#E58B00" />

              {/* GLUT4 Node */}
              <motion.g
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <circle cx="230" cy="140" r="40" fill="#00B27A" opacity="0.2" />
                <circle cx="230" cy="140" r="30" fill="#00B27A" />
                <text x="230" y="145" textAnchor="middle" fill="white" fontWeight="600" fontSize="14" fontFamily="var(--synervion-font-body)">GLUT4</text>
              </motion.g>

              {/* Arrow to ATP */}
              <motion.line
                x1="270" y1="140" x2="320" y2="140"
                stroke="#00B27A"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
              />
              <polygon points="320,135 330,140 320,145" fill="#00B27A" />

              {/* ATP Node */}
              <motion.g
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <circle cx="360" cy="140" r="40" fill="#FFD700" opacity="0.2" />
                <circle cx="360" cy="140" r="30" fill="#FFD700" />
                <text x="360" y="145" textAnchor="middle" fill="#333" fontWeight="600" fontSize="14" fontFamily="var(--synervion-font-body)">ATP</text>
              </motion.g>

              {/* Labels */}
              <text x="100" y="200" textAnchor="middle" fill="#E58B00" fontWeight="600" fontSize="12" fontFamily="var(--synervion-font-body)">↑ Activated</text>
              <text x="230" y="200" textAnchor="middle" fill="#00B27A" fontWeight="600" fontSize="12" fontFamily="var(--synervion-font-body)">↑ Glucose Transport</text>
              <text x="360" y="200" textAnchor="middle" fill="#D4A017" fontWeight="600" fontSize="12" fontFamily="var(--synervion-font-body)">↑ Energy</text>
            </svg>
            <div 
              style={{
                textAlign: 'center',
                marginTop: '20px',
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '14px',
                color: '#6B7280'
              }}
            >
              ATP production increased via AMPK pathway activation
            </div>
          </div>
        );

      case 'dual':
        // Study #3: Antioxidant effects
        const antioxidantData = [
          { name: 'SOD', value: 25, color: '#00B27A', label: '+25%' },
          { name: 'GSH-Px', value: 45, color: '#00B27A', label: '+45%' },
          { name: 'ROS', value: -30, color: '#6A6A6A', label: '-30%' }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={antioxidantData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis 
                  label={{ value: 'Change (%)', angle: -90, position: 'insideLeft', style: { fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' } }}
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                  domain={[-40, 50]}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {antioxidantData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div 
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                marginTop: '16px'
              }}
            >
              <div 
                style={{
                  padding: '8px 16px',
                  background: '#F0FDF4',
                  borderRadius: '8px',
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#00B27A'
                }}
              >
                ↑ Antioxidant Enzymes
              </div>
              <div 
                style={{
                  padding: '8px 16px',
                  background: '#F3F4F6',
                  borderRadius: '8px',
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#6A6A6A'
                }}
              >
                ↓ Oxidative Stress
              </div>
            </div>
          </div>
        );

      case 'line':
        // Study #4: Endurance time
        const enduranceData = [
          { name: 'Control', value: 6.8, label: '6.8 min' },
          { name: 'Cordyceps', value: 9.5, label: '9.5 min' }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={enduranceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis 
                  label={{ value: 'Endurance Duration (min)', angle: -90, position: 'insideLeft', style: { fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' } }}
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
                  domain={[0, 12]}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Bar dataKey="value" fill="#E58B00" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="value" stroke="#E58B00" strokeWidth={3} dot={{ fill: '#E58B00', r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div 
              style={{
                textAlign: 'center',
                marginTop: '16px',
                padding: '12px',
                background: '#F0FDF4',
                borderRadius: '8px',
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '14px',
                fontWeight: 600,
                color: '#00B27A'
              }}
            >
              ↑ +39% Endurance Improvement
            </div>
            <div 
              style={{
                textAlign: 'center',
                marginTop: '8px',
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '13px',
                color: '#6B7280'
              }}
            >
              Increased endurance and glycogen storage
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
            backdropFilter: 'blur(4px)'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '960px',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
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
                transition: 'all 200ms ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E5E7EB';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F3F4F6';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <X size={20} color="#6B7280" />
            </button>

            {/* Modal Content */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0'
              }}
              className="md:grid-cols-[60%_40%]"
            >
              {/* Left Column - Chart */}
              <div 
                style={{
                  padding: '40px',
                  borderRight: '1px solid #E5E7EB'
                }}
                className="md:border-r border-b md:border-b-0"
              >
                <h3
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#111',
                    marginBottom: '24px'
                  }}
                >
                  Study Results
                </h3>
                {renderChart()}
              </div>

              {/* Right Column - Key Findings */}
              <div style={{ padding: '40px' }}>
                <div
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#777',
                    marginBottom: '12px'
                  }}
                >
                  {study.journal} • {study.year}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '1.4',
                    color: '#111',
                    marginBottom: '24px'
                  }}
                >
                  {study.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}
                >
                  Key Findings:
                </div>

                <ul style={{ marginBottom: '24px' }}>
                  {study.keyFindings.map((finding, index) => (
                    <li
                      key={index}
                      style={{
                        fontFamily: 'var(--synervion-font-body)',
                        fontSize: '15px',
                        fontWeight: 400,
                        lineHeight: '1.8',
                        color: '#444',
                        marginBottom: '8px',
                        paddingLeft: '20px',
                        position: 'relative'
                      }}
                    >
                      <span style={{ position: 'absolute', left: '0', color: '#E58B00' }}>•</span>
                      {finding}
                    </li>
                  ))}
                </ul>

                <a
                  href={study.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#E58B00',
                    textDecoration: 'none',
                    transition: 'gap 200ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '12px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '8px';
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
    </AnimatePresence>
  );
}
