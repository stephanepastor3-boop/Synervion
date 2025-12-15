import { motion } from 'motion/react';
import { BrandBadge } from '../components/brand/BrandBadge';
import {
  Database, Layers, Activity, ShieldCheck, Sprout, CheckCircle2,
  Users, Globe, Factory
} from 'lucide-react';
import technicianImage from '../assets/images/Technician-RevaFlora1.jpg';
import labFacilityImage from '../assets/images/lab-grown-advantage.jpg';
import { SEO } from '../components/SEO';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function AboutPage() {
  const scienceApproach = [
    { title: 'Defined Inputs', icon: Database, desc: 'Precise substrate composition' },
    { title: 'Controlled Variables', icon: Layers, desc: 'Temperature, light, & humidity' },
    { title: 'Measured Outputs', icon: Activity, desc: 'Quantified bioactive profiles' },
  ];

  const cultivationFactors = [
    'Strain selection',
    'Growth substrate',
    'Environmental control',
    'Post-harvest processing'
  ];

  const cultivationBenefits = [
    'Consistent bioactive levels',
    'Elimination of contaminants',
    'Reproducible results',
    'Sustainable production'
  ];

  const targetAudience = [
    { title: 'Active Professionals', desc: 'Sustained focus without the crash.' },
    { title: 'Athletes', desc: 'Endurance and recovery support.' },
    { title: 'Founders & Operators', desc: 'Cognitive clarity for high-stakes work.' },
    { title: 'Formulation Partners', desc: 'Reliable, standardized ingredients.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Synervion | Science-Driven Functional Wellness"
        description="Synervion is a science-first wellness company dedicated to advancing high-performance functional ingredients through controlled cultivation and transparency."
        canonical="/about"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
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
            className="max-w-4xl"
          >
            <BrandBadge variant="primary" className="mb-6">
              About Synervion
            </BrandBadge>

            <h1 className="mb-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[hsl(var(--synervion-secondary-900))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Advancing wellness through <br />
              <span className="text-[hsl(var(--synervion-primary-500))]">controlled cultivation.</span>
            </h1>

            <div className="grid lg:grid-cols-2 gap-12 text-lg text-[hsl(var(--synervion-text-secondary))] leading-relaxed">
              <p>
                Synervion is a science-driven wellness company dedicated to advancing high-performance functional ingredients through controlled cultivation, rigorous testing, and full supply-chain transparency.
              </p>
              <p>
                Founded with a focus on lab-grown Cordyceps militaris, Synervion exists to address a fundamental gap in the supplement industry: the lack of consistency, traceability, and measurable standards behind many so-called “functional” products.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Science-First Approach */}
      <section className="py-20 bg-[hsl(var(--synervion-bg-gray-50))] border-y border-[hsl(var(--synervion-border-light))]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                A Science-First Approach to Functional Wellness
              </h2>
              <p className="text-lg text-[hsl(var(--synervion-text-secondary))] mb-8 leading-relaxed">
                Synervion approaches wellness as an engineering and biological optimization problem, not a trend. Every ingredient is treated as a system. This philosophy allows us to move beyond folklore, focusing instead on predictable performance, compound stability, and data integrity.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {scienceApproach.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="bg-white p-6 rounded-xl border border-[hsl(var(--synervion-border-light))] shadow-sm">
                      <Icon className="w-8 h-8 text-[hsl(var(--synervion-primary-500))] mb-4" />
                      <h3 className="font-semibold text-[hsl(var(--synervion-secondary-900))] mb-2">{item.title}</h3>
                      <p className="text-sm text-[hsl(var(--synervion-text-secondary))]">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={technicianImage} alt="Scientist in lab" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--synervion-secondary-900))]/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Controlled Cultivation Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <BrandBadge variant="outline" className="mb-4">Methodology</BrandBadge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Why Controlled Cultivation Matters
            </h2>
            <p className="text-lg text-[hsl(var(--synervion-text-secondary))]">
              Rather than relying on wild harvesting or opaque sourcing, Synervion develops ingredients under controlled laboratory conditions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Factors */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[hsl(var(--synervion-bg-gray-50))] p-8 rounded-2xl border border-[hsl(var(--synervion-border-light))]"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Sprout className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" />
                Critical Dependencies
              </h3>
              <ul className="space-y-4">
                {cultivationFactors.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[hsl(var(--synervion-text-secondary))]">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--synervion-primary-500))]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[hsl(var(--synervion-secondary-900))] text-white p-8 rounded-2xl border border-[hsl(var(--synervion-secondary-700))]"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" />
                Synervion Standard
              </h3>
              <ul className="space-y-4">
                {cultivationBenefits.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--synervion-primary-500))]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-[hsl(var(--synervion-bg-gray-50))] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 max-w-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Built for Performance-Focused Lifestyles
            </h2>
            <p className="text-lg text-[hsl(var(--synervion-text-secondary))] max-w-2xl">
              Synervion is designed for individuals who demand reliable energy and endurance support without dependence on stimulants or short-term fixes. The focus is metabolic efficiency and sustainable performance.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, i) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl border border-[hsl(var(--synervion-border-light))] shadow-sm"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-[hsl(var(--synervion-primary-100))] rounded-lg flex items-center justify-center text-[hsl(var(--synervion-primary-700))]">
                    {i === 0 && <Users className="w-5 h-5" />}
                    {i === 1 && <Activity className="w-5 h-5" />}
                    {i === 2 && <Globe className="w-5 h-5" />}
                    {i === 3 && <Factory className="w-5 h-5" />}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{audience.title}</h3>
                <p className="text-sm text-[hsl(var(--synervion-text-secondary))]">{audience.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[hsl(var(--synervion-border-light))]">
                <img src={labFacilityImage} alt="Lab facility" className="w-full h-auto" />
                <div className="absolute inset-0 bg-[hsl(var(--synervion-secondary-900))]/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <div>
                <BrandBadge variant="success" className="mb-4">Trust & Safety</BrandBadge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Transparency as a Core Principle
                </h2>
                <p className="text-lg text-[hsl(var(--synervion-text-secondary))]">
                  Trust in wellness requires evidence. Synervion integrates transparency directly into its operating model. This commitment allows customers and partners to evaluate quality based on verifiable data, not assumptions.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  'Independent third-party testing',
                  'Quantified bioactive markers',
                  'Batch-level traceability',
                  'Clear disclosure of sourcing'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 p-4 bg-[hsl(var(--synervion-bg-gray-50))] rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" />
                    <span className="font-medium text-[hsl(var(--synervion-secondary-900))]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-[hsl(var(--synervion-secondary-900))] text-white text-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
              More Than a Brand
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed">
              Synervion operates both as a direct-to-consumer wellness brand and a functional ingredient platform supporting B2B innovation. Our long-term mission is to help redefine how functional wellness products are developed, evaluated, and trusted.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex-1">
                <h3 className="text-xl font-bold text-[hsl(var(--synervion-primary-500))] mb-2">DTC Brand</h3>
                <p className="text-sm text-gray-400">Premium supplements for end-users</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex-1">
                <h3 className="text-xl font-bold text-[hsl(var(--synervion-primary-500))] mb-2">B2B Core</h3>
                <p className="text-sm text-gray-400">Ingredient platform for partners</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
