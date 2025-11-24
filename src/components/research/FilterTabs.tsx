import { motion } from 'motion/react';

interface FilterTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}



export function FilterTabs({ categories, selectedCategory, onSelectCategory }: FilterTabsProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 mb-12"
      style={{ padding: '0 16px' }}
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: 'var(--synervion-font-body)',
              fontSize: '15px',
              fontWeight: 500,
              padding: '12px 24px',
              borderRadius: '24px',
              border: isActive ? 'none' : '1px solid #E0E0E0',
              background: isActive ? '#E58B00' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : '#333',
              cursor: 'pointer',
              transition: 'all 200ms ease-in-out',
              boxShadow: isActive
                ? '0 4px 12px rgba(229,139,0,0.25)'
                : '0 2px 4px rgba(0,0,0,0.04)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
              }
            }}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
}
