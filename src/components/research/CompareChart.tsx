import { motion } from 'motion/react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Study {
  id: number;
  title: string;
  initials: string;
  mechanism: number; // 1-3 (Energy → Antioxidant → Endurance)
  evidenceLevel: number; // 1-3 (Preclinical → Clinical)
  improvement: string;
  category: string;
}

const compareData: Study[] = [
  { id: 1, title: 'Hirsch et al. (2017)', initials: 'H17', mechanism: 3, evidenceLevel: 3, improvement: '+10.9% VO₂max', category: 'Endurance Performance' },
  { id: 2, title: 'Choi et al. (2020)', initials: 'C20', mechanism: 1, evidenceLevel: 2.5, improvement: 'AMPK activation', category: 'Energy Metabolism' },
  { id: 3, title: 'Song et al. (2015)', initials: 'S15', mechanism: 2, evidenceLevel: 2, improvement: '+45% GSH-Px', category: 'Antioxidant Defense' },
  { id: 4, title: 'Park et al. (2017)', initials: 'N17', mechanism: 3, evidenceLevel: 2.8, improvement: '+39% endurance', category: 'Endurance Performance' }
];

interface CompareChartProps {
  onStudyClick?: (studyId: number) => void;
}

export function CompareChart({ onStudyClick }: CompareChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #E58B00',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          <div style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>
            {data.title}
          </div>
          <div style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '13px', color: '#666', marginBottom: '4px' }}>
            Category: {data.category}
          </div>
          <div style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '13px', color: '#00B27A', fontWeight: 600 }}>
            {data.improvement}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        marginBottom: '60px'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3
          style={{
            fontFamily: 'var(--synervion-font-body)',
            fontSize: '28px',
            fontWeight: 600,
            color: '#111',
            marginBottom: '12px'
          }}
        >
          Research Landscape
        </h3>
        <p
          style={{
            fontFamily: 'var(--synervion-font-body)',
            fontSize: '16px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          Interactive comparison of all studies by mechanism and evidence level
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 60, bottom: 60, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            type="number" 
            dataKey="mechanism" 
            name="Mechanism"
            domain={[0.5, 3.5]}
            ticks={[1, 2, 3]}
            tickFormatter={(value) => {
              const labels: { [key: number]: string } = {
                1: 'Energy',
                2: 'Antioxidant',
                3: 'Endurance'
              };
              return labels[value] || '';
            }}
            style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
            label={{ value: 'Primary Mechanism', position: 'bottom', offset: 40, style: { fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#333' } }}
          />
          <YAxis 
            type="number" 
            dataKey="evidenceLevel" 
            name="Evidence Level"
            domain={[1, 3.2]}
            ticks={[1, 2, 3]}
            tickFormatter={(value) => {
              const labels: { [key: number]: string } = {
                1: 'Preclinical',
                2: 'Animal',
                3: 'Clinical'
              };
              return labels[value] || '';
            }}
            style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#6B7280' }}
            label={{ value: 'Evidence Level', angle: -90, position: 'left', offset: 40, style: { fontFamily: 'IBM Plex Mono', fontSize: '12px', fill: '#333' } }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter 
            data={compareData} 
            fill="#E58B00"
          >
            {compareData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill="#E58B00"
                style={{ cursor: 'pointer' }}
                onClick={() => onStudyClick && onStudyClick(entry.id)}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend with Study Initials */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '32px'
        }}
      >
        {compareData.map((study) => (
          <motion.div
            key={study.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => onStudyClick && onStudyClick(study.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#FFF5E6',
              borderRadius: '20px',
              cursor: 'pointer',
              border: '1px solid #E58B00'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#E58B00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'IBM Plex Mono',
                fontSize: '10px',
                fontWeight: 600,
                color: '#FFF'
              }}
            >
              {study.initials}
            </div>
            <span
              style={{
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '13px',
                color: '#333'
              }}
            >
              {study.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Quadrant Labels */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginTop: '32px',
          padding: '24px',
          background: '#F9FAFB',
          borderRadius: '12px'
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>
            High Clinical Evidence
          </div>
          <div style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '13px', color: '#333' }}>
            Human trials with measurable outcomes
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>
            Multiple Mechanisms
          </div>
          <div style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '13px', color: '#333' }}>
            Energy, antioxidant, and performance
          </div>
        </div>
      </div>
    </motion.div>
  );
}
