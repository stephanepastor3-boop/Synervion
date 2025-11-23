import { motion } from 'motion/react';
import { Palette } from 'lucide-react';

interface FloatingBrandCTAProps {
  onClick?: () => void;
}

export function FloatingBrandCTA({ onClick }: FloatingBrandCTAProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group"
      style={{
        filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))'
      }}
    >
      <div className="relative">
        {/* Pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-[hsl(var(--synervion-primary-500))]"
        />
        
        {/* Main button */}
        <div className="relative flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-4 rounded-full bg-[hsl(var(--synervion-primary-500))] hover:bg-[hsl(var(--synervion-primary-600))] transition-colors shadow-lg">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
          <span
            className="hidden sm:block"
            style={{
              fontFamily: 'var(--synervion-font-heading)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'white'
            }}
          >
            Brand System
          </span>
        </div>

        {/* Tooltip for mobile */}
        <div className="sm:hidden absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-[hsl(var(--synervion-secondary-800))] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <span
            style={{
              fontFamily: 'var(--synervion-font-body)',
              fontSize: '12px',
              color: 'white'
            }}
          >
            Brand System
          </span>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[hsl(var(--synervion-secondary-800))]" />
        </div>
      </div>
    </motion.button>
  );
}
