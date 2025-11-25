import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
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
  };

  const links = {
    Company: [
      { label: 'About Us', action: () => smoothScroll('#hero') },
      { label: 'Our Science', action: () => smoothScroll('#origin') },
      { label: 'Research', action: () => smoothScroll('#rnd') },
    ],
    Learn: [
      { label: 'Altitude Training', href: '/cordyceps-for-high-altitude-training' },
      { label: 'Vegan Muscle', href: '/cordyceps-supplement-for-vegan-bodybuilders' },
      { label: 'Immune Support', href: '/cordyceps-for-immune-system-support' },
      { label: 'Mental Clarity', href: '/cordyceps-for-mental-clarity' },
    ],
    Collabs: [
      { label: 'Collab Models', action: () => smoothScroll('#partners') },
      { label: 'White-Label', action: () => smoothScroll('#partners') },
      { label: 'Co-Brand', action: () => smoothScroll('#partners') },
      { label: 'Custom Formulation', action: () => smoothScroll('#partners') },
    ],
    Resources: [
      { label: 'Benefits', action: () => smoothScroll('#features') },
      { label: 'Dosage Calculator', href: '/calculator/cordyceps-goal-planner' },
      { label: 'Testing', action: () => smoothScroll('#rnd') },
      { label: 'Contact', action: () => smoothScroll('#contact') },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/synervion', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/synervion/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/synervion/', label: 'Instagram' },
  ];

  return (
    <footer className="w-full bg-[hsl(var(--synervion-secondary-800))] text-white py-12 sm:py-16">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand - 4 columns */}
          <div className="lg:col-span-4">
            <button
              onClick={() => smoothScroll('#hero')}
              className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S6 21.514 6 16 10.486 6 16 6z"
                  fill="white"
                />
                <circle cx="16" cy="16" r="5" fill="hsl(var(--synervion-primary-500))" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'white'
                }}
              >
                Synervion
              </span>
            </button>
            <p
              className="mb-6 max-w-sm"
              style={{
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              Premium lab-grown Cordyceps for wellness brands.
              Science-backed, sustainably produced, 100% traceable.
            </p>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
            <div className="space-y-2">
              <a
                href="mailto:info@synervion.com"
                className="block hover:text-[hsl(var(--synervion-primary-500))] transition-colors"
                style={{
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                info@synervion.com
              </a>
              <a
                href="tel:+918823888238"
                className="block hover:text-[hsl(var(--synervion-primary-500))] transition-colors"
                style={{
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                +91 88238 88238
              </a>
            </div>
          </div>

          {/* Links - 8 columns divided into 4 sections */}
          {Object.entries(links).map(([category, categoryLinks]) => (
            <div key={category} className="lg:col-span-2 sm:col-span-1">
              <h4
                className="mb-4"
                style={{
                  fontFamily: 'var(--synervion-font-heading)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {categoryLinks.map((link) => (
                  <li key={link.label}>
                    {(link as any).href ? (
                      <Link
                        to={(link as any).href}
                        style={{
                          fontFamily: 'var(--synervion-font-body)',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                        className="hover:text-white transition-colors text-left block"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(link as any).action}
                        style={{
                          fontFamily: 'var(--synervion-font-body)',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                        className="hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontFamily: 'var(--synervion-font-body)',
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            © 2025 Synervion. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button
              style={{
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.6)'
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              style={{
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.6)'
              }}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
