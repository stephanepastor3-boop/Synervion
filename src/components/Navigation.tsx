import { useState, useEffect } from 'react';
import { BrandButton } from './brand/BrandButton';
import { Logo } from './Logo';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Benefits', href: '#features' },
    { label: 'Why Lab-Grown', href: '#origin' },
    { label: 'Collabs', href: '#partners' },
    { label: 'Research', href: '#rnd' },
    { label: 'Contact', href: '#contact' },
  ];

  const smoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[hsl(var(--synervion-bg-white))]/95 backdrop-blur-md shadow-sm'
          : 'bg-[hsl(var(--synervion-bg-white))]/80 backdrop-blur-sm'
          }`}
      >
        {/* Desktop & Mobile Navigation Container */}
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Left: Logo + Wordmark (Grouped) */}
            <Logo
              variant="color"
              size="md"
              showWordmark={true}
              onClick={() => smoothScroll('#hero')}
              className="flex-shrink-0"
            />

            {/* Center: Menu (Desktop Only) - 32px spacing between items */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => smoothScroll(link.href)}
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                  className="hover:text-[hsl(var(--synervion-primary-500))] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[hsl(var(--synervion-primary-500))] after:transition-all hover:after:w-full"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right: Action Buttons (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <BrandButton
                variant="primary"
                size="md"
                onClick={() => smoothScroll('#contact')}
                className="min-h-[44px]"
              >
                Get Started
              </BrandButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--synervion-bg-gray-100))] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[hsl(var(--synervion-text-primary))]" />
              ) : (
                <Menu className="w-6 h-6 text-[hsl(var(--synervion-text-primary))]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[hsl(var(--synervion-bg-white))] shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--synervion-border-light))]">
                <span
                  style={{
                    fontFamily: 'var(--synervion-font-heading)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--synervion-bg-gray-100))] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-[hsl(var(--synervion-text-primary))]" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="flex-1 py-6 px-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => smoothScroll(link.href)}
                        style={{
                          fontFamily: 'var(--synervion-font-body)',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: 'hsl(var(--synervion-text-primary))'
                        }}
                        className="block w-full text-left py-3 px-4 rounded-lg hover:bg-[hsl(var(--synervion-primary-500))]/10 hover:text-[hsl(var(--synervion-primary-500))] transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu CTA */}
              <div className="p-4 border-t border-[hsl(var(--synervion-border-light))]">
                <BrandButton
                  variant="primary"
                  size="lg"
                  className="w-full min-h-[48px]"
                  onClick={() => smoothScroll('#contact')}
                >
                  Get Started
                </BrandButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
