import { useState, useEffect } from 'react';
import { BrandButton } from './brand/BrandButton';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResponsiveNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function ResponsiveNavigation({ currentPage, onNavigate }: ResponsiveNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Partnerships', page: 'partnerships' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="sm:w-8 sm:h-8">
                <path
                  d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S6 21.514 6 16 10.486 6 16 6z"
                  fill="currentColor"
                  className="text-[hsl(var(--synervion-secondary-800))]"
                />
                <circle cx="16" cy="16" r="5" fill="currentColor" className="text-[hsl(var(--synervion-primary-500))]" />
              </svg>
              <span className="text-lg sm:text-xl tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Synervion
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`text-sm transition-colors ${
                    currentPage === link.page
                      ? 'text-[hsl(var(--synervion-primary-500))]'
                      : 'text-[hsl(var(--synervion-text-primary))] hover:text-[hsl(var(--synervion-primary-500))]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <BrandButton 
                variant="primary" 
                size="sm"
                onClick={() => onNavigate('partnerships')}
              >
                Get Started
              </BrandButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[hsl(var(--synervion-bg-gray-100))] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 sm:top-20 left-0 right-0 z-40 md:hidden bg-white border-b border-[hsl(var(--synervion-border-light))] shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === link.page
                      ? 'bg-[hsl(var(--synervion-primary-500))]/10 text-[hsl(var(--synervion-primary-500))]'
                      : 'hover:bg-[hsl(var(--synervion-bg-gray-100))] text-[hsl(var(--synervion-text-primary))]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <BrandButton 
                variant="primary" 
                className="w-full"
                onClick={() => onNavigate('partnerships')}
              >
                Get Started
              </BrandButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
