import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ResearchCardProps {
  title: string;
  journal: string;
  year: string;
  summary: string;
  icon: string;
  category: string;
  imageUrl: string;
  onClick: () => void;
}

export function ResearchCard({
  title,
  journal,
  year,
  summary,
  icon,
  category,
  imageUrl,
  onClick
}: ResearchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClick}
      className="cursor-pointer group h-full flex flex-col overflow-hidden"
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '2px solid transparent',
        transition: 'border-color 250ms ease, box-shadow 250ms ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#E58B00';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(229,139,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
      }}
    >
      {/* Hero Image */}
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#E58B00',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <span>{icon}</span>
            <span style={{ fontFamily: 'var(--synervion-font-body)' }}>{category}</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Journal & Year */}
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
          {journal} • {year}
        </div>

        {/* Study Title */}
        <h3
          style={{
            fontFamily: 'var(--synervion-font-body)',
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '1.4',
            color: '#111',
            marginBottom: '12px',
            flexGrow: 0
          }}
        >
          {title}
        </h3>

        {/* Summary */}
        <p
          style={{
            fontFamily: 'var(--synervion-font-body)',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '1.6',
            color: '#444',
            marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1
          }}
        >
          {summary}
        </p>

        {/* View Data Button */}
        <button
          className="flex items-center gap-2 group-hover:gap-3 transition-all duration-250 mt-auto"
          style={{
            fontFamily: 'var(--synervion-font-body)',
            fontSize: '15px',
            fontWeight: 600,
            color: '#E58B00',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Read Analysis
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
