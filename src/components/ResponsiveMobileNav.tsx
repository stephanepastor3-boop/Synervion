import { useState, useEffect } from 'react';
import { BrandButton } from './brand/BrandButton';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function ResponsiveMobileNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Partnerships', href: '#partnerships' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-[hsl(var(--synervion-bg-white))]/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
          }`}
      >
        {/* Mobile & Desktop Navigation */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo
              variant="color"
              size="md"
              showWordmark={true}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                  className="hover:text-[hsl(var(--synervion-primary-500))] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <BrandButton variant="primary" size="sm">
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
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
                      <a
                        href={link.href}
                        onClick={handleLinkClick}
                        style={{
                          fontFamily: 'var(--synervion-font-body)',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: 'hsl(var(--synervion-text-primary))'
                        }}
                        className="block py-3 px-4 rounded-lg hover:bg-[hsl(var(--synervion-primary-500))]/10 hover:text-[hsl(var(--synervion-primary-500))] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu CTA */}
              <div className="p-4 border-t border-[hsl(var(--synervion-border-light))]">
                <BrandButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleLinkClick}
                >
                  Get Started
                </BrandButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
