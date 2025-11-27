import { motion } from 'motion/react';
import { BrandCard } from '../components/brand/BrandCard';
import { BrandBadge } from '../components/brand/BrandBadge';
import { BrandButton } from '../components/brand/BrandButton';
import {
  Award, CheckCircle2, Leaf, Users,
  Target, TrendingUp, Globe, Shield
} from 'lucide-react';
import teamLabImage from '../assets/images/Technician-RevaFlora1.png';
import revaFloraFacility from '../assets/images/lab-grown-advantage.png';

export function AboutPage() {
  const certifications = [
    { name: 'ISO 9001:2015', desc: 'Quality Management' },
    { name: 'GMP Certified', desc: 'Good Manufacturing Practice' },
    { name: 'USDA Organic', desc: 'Organic Certification' },
    { name: 'FSSAI Approved', desc: 'Food Safety Standards' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Scientific Rigor',
      description: 'Every product backed by peer-reviewed research and third-party lab testing.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Lab-grown cultivation eliminates deforestation and reduces carbon footprint by 90%.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Partnering with brands to co-create innovative wellness solutions.',
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Full traceability from cultivation to final product with complete documentation.',
    },
  ];

  const milestones = [
    { year: '2019', event: 'Founded in Bangalore, India' },
    { year: '2020', event: 'First lab-grown Cordyceps harvest' },
    { year: '2022', event: 'Partnership with Reva Flora' },
    { year: '2024', event: '50+ brand partnerships worldwide' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-white via-[hsl(var(--synervion-bg-gray-50))] to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--synervion-secondary-800)) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <BrandBadge variant="primary" className="mb-4 sm:mb-6">
              Our Story
            </BrandBadge>

            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Pioneering the Future of <span className="text-[hsl(var(--synervion-primary-500))]">Wellness</span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))] mb-8 sm:mb-12 px-4 leading-relaxed">
              Founded in 2019, Synervion emerged from a simple question: How can we deliver the proven
              benefits of Cordyceps while ensuring sustainability, purity, and consistent quality?
              Our answer: lab-grown excellence powered by Indian innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={teamLabImage}
                  alt="Synervion team in lab with Cordyceps culture samples - 6 team members"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Science Meets Tradition
              </h2>

              <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] leading-relaxed">
                Cordyceps has been revered in traditional medicine for centuries, but wild harvesting
                poses significant environmental and quality control challenges. At Synervion, we've
                harnessed biotechnology to cultivate Cordyceps in controlled lab environments.
              </p>

              <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] leading-relaxed">
                Our proprietary cultivation process ensures 99.8% purity, standardized active compounds,
                and zero contaminants—delivering consistent, superior quality that wild-harvested varieties
                simply cannot match.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 sm:p-6 rounded-xl bg-[hsl(var(--synervion-bg-gray-50))] border border-[hsl(var(--synervion-border-light))]">
                  <div className="text-2xl sm:text-3xl mb-1 text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    5+
                  </div>
                  <div className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))]">
                    Years of Research
                  </div>
                </div>
                <div className="p-4 sm:p-6 rounded-xl bg-[hsl(var(--synervion-bg-gray-50))] border border-[hsl(var(--synervion-border-light))]">
                  <div className="text-2xl sm:text-3xl mb-1 text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))]">
                    Traceable
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-[hsl(var(--synervion-bg-gray-50))]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <BrandBadge variant="primary" className="mb-4">
              Core Values
            </BrandBadge>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              What Drives Us
            </h2>
            <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] max-w-2xl mx-auto px-4">
              Our commitment to excellence is built on four foundational pillars.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <BrandCard
                  key={value.title}
                  variant="benefit"
                  icon={<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[hsl(var(--synervion-primary-500))]" />}
                  title={value.title}
                  description={value.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Reva Flora Partnership */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 space-y-4 sm:space-y-6"
            >
              <BrandBadge variant="secondary">
                Strategic Partnership
              </BrandBadge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Powering Innovation with <span className="text-[hsl(var(--synervion-primary-500))]">Reva Flora</span>
              </h2>

              <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] leading-relaxed">
                In 2022, we partnered with Reva Flora, India's leading botanical research institute,
                to accelerate innovation in functional fungi cultivation. This collaboration brings
                together Synervion's commercial expertise with Reva Flora's cutting-edge research capabilities.
              </p>

              <div className="space-y-3 pt-4">
                {[
                  'Joint R&D for next-generation cultivation techniques',
                  'Shared access to advanced biotechnology labs',
                  'Collaborative clinical studies on efficacy',
                  'Knowledge transfer and training programs',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[hsl(var(--synervion-primary-500))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={revaFloraFacility}
                  alt="Reva Flora Culture - Synervion partner facility"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[hsl(var(--synervion-primary-500))]" />
                    <div>
                      <div className="text-sm sm:text-base mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Reva Flora Partnership Facility
                      </div>
                      <div className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))]">
                        Since 2022 · Joint Research Initiative
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-[hsl(var(--synervion-bg-gray-50))]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <BrandBadge variant="primary" className="mb-4">
              Our Journey
            </BrandBadge>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Key Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[hsl(var(--synervion-border-light))] -translate-x-1/2" />

            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                    }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : ''}`}>
                    <div className="text-2xl sm:text-3xl mb-2 text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {milestone.year}
                    </div>
                    <div className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))]">
                      {milestone.event}
                    </div>
                  </div>

                  <div className="hidden sm:flex w-12 h-12 rounded-full bg-[hsl(var(--synervion-primary-500))] items-center justify-center relative z-10 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <BrandBadge variant="success" className="mb-4">
              Certifications
            </BrandBadge>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Verified Excellence
            </h2>
            <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] max-w-2xl mx-auto px-4">
              Our commitment to quality is validated by international certifications and standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))]/30 hover:shadow-xl transition-all text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[hsl(var(--synervion-primary-500))]" />
                </div>
                <h4 className="mb-2 text-sm sm:text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {cert.name}
                </h4>
                <p className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))]">
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[hsl(var(--synervion-secondary-800))] to-[hsl(var(--synervion-secondary-700))] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="mb-4 sm:mb-6 text-white text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ready to Partner with Us?
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-white/90 px-4">
              Join 50+ leading wellness brands who trust Synervion for premium Cordyceps ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <BrandButton variant="primary" size="lg" className="w-full sm:w-auto">
                Explore Partnerships
              </BrandButton>
              <BrandButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[hsl(var(--synervion-secondary-800))]"
              >
                Contact Us
              </BrandButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
