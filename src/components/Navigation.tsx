import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrandButton } from './brand/BrandButton';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

interface NavLink {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    {
      label: 'Products',
      children: [
        { label: 'Synervion® CORE Caps', href: '/product/synv-core' },
        { label: 'Synervion® PULSE Liquids', href: '/product/synv-pulse' },
        { label: 'Synervion® ROOT Powders', href: '/product/synv-root' },
      ]
    },
    { label: 'Benefits', href: '#features' },
    { label: 'Why Lab-Grown', href: '#origin' },
    { label: 'Collabs', href: '#partners' },
    {
      label: 'Science',
      children: [
        { label: 'Research', href: '#rnd' },
        { label: 'Guides', href: '#articles' },
        { label: 'Calculator', href: '/calculator/cordyceps-goal-planner' },
      ]
    },
    { label: 'About Us', href: '/about' },
  ];

  const handleNavigation = (href?: string) => {
    if (!href) return;
    setMobileMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname === '/') {
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
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const toggleMobileItem = (label: string) => {
    if (expandedMobileItem === label) {
      setExpandedMobileItem(null);
    } else {
      setExpandedMobileItem(label);
    }
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
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Left: Logo */}
            <Logo
              variant="color"
              size="md"
              showWordmark={true}
              onClick={() => handleNavigation('#hero')}
              className="flex-shrink-0"
            />

            {/* Center: Menu (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  {link.children ? (
                    <button
                      className="flex items-center gap-1 hover:text-[hsl(var(--synervion-primary-500))] transition-colors"
                      style={{
                        fontFamily: 'var(--synervion-font-body)',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'hsl(var(--synervion-text-primary))'
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavigation(link.href)}
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
                  )}

                  {/* Desktop Dropdown */}
                  {link.children && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-48">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1">
                        {link.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => handleNavigation(child.href)}
                            className="block w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                            style={{ fontFamily: 'var(--synervion-font-body)' }}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <BrandButton
                variant="primary"
                size="md"
                onClick={() => handleNavigation('/contact')}
                className="min-h-[44px]"
              >
                Get Started
              </BrandButton>
            </div>

            {/* Mobile Hamburger */}
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
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[hsl(var(--synervion-bg-white))] shadow-2xl z-50 lg:hidden flex flex-col"
            >
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
                >
                  <X className="w-6 h-6 text-[hsl(var(--synervion-text-primary))]" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1 py-6 px-4 overflow-y-auto">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      {link.children ? (
                        <div>
                          <button
                            onClick={() => toggleMobileItem(link.label)}
                            className="flex items-center justify-between w-full text-left py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                            style={{
                              fontFamily: 'var(--synervion-font-body)',
                              fontSize: '16px',
                              fontWeight: 500,
                              color: 'hsl(var(--synervion-text-primary))'
                            }}
                          >
                            {link.label}
                            {expandedMobileItem === link.label ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <AnimatePresence>
                            {expandedMobileItem === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 border-l-2 border-slate-100 ml-4 mt-1 space-y-1">
                                  {link.children.map(child => (
                                    <button
                                      key={child.label}
                                      onClick={() => handleNavigation(child.href)}
                                      className="block w-full text-left py-2 px-4 text-sm text-slate-600 hover:text-orange-600"
                                    >
                                      {child.label}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavigation(link.href)}
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
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-[hsl(var(--synervion-border-light))]">
                <BrandButton
                  variant="primary"
                  size="lg"
                  className="w-full min-h-[48px]"
                  onClick={() => handleNavigation('/contact')}
                >
                  Get Started
                </BrandButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
