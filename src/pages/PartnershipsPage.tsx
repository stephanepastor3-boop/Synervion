import { useState } from 'react';
import { motion } from 'motion/react';
import { BrandBadge } from '../components/brand/BrandBadge';
import { BrandButton } from '../components/brand/BrandButton';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  Package, Sparkles, Beaker, ArrowRight,
  TrendingUp, Clock, Shield, Leaf
} from 'lucide-react';
import productMockups from '../assets/images/research-bg.png';

export function PartnershipsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    partnershipType: '',
    message: '',
  });

  const partnershipModels = [
    {
      icon: Package,
      title: 'White-Label',
      description: 'Ready-to-market Cordyceps products under your brand with our proven formulations.',
      features: [
        'Pre-tested formulations',
        'Custom packaging design',
        'Fast time to market (4-6 weeks)',
        'Minimum order: 1,000 units',
      ],
      highlight: 'Most Popular',
      idealFor: 'Established brands looking for quick market entry',
    },
    {
      icon: Sparkles,
      title: 'Co-Brand',
      description: 'Joint ventures that leverage both our expertise and your market presence.',
      features: [
        'Shared brand development',
        'Co-marketing initiatives',
        'Revenue sharing model',
        'Strategic long-term partnership',
      ],
      highlight: 'Premium',
      idealFor: 'Brands seeking collaborative growth opportunities',
    },
    {
      icon: Beaker,
      title: 'Custom Formulation',
      description: 'Bespoke Cordyceps solutions tailored to your unique product requirements.',
      features: [
        'Dedicated R&D collaboration',
        'Proprietary blend development',
        'Exclusive supply agreements',
        'Clinical trial support',
      ],
      highlight: 'Enterprise',
      idealFor: 'Companies with specific formulation needs',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: '99.8% Purity',
      description: 'Lab-verified quality with every batch',
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      description: '90% lower carbon footprint than wild harvest',
    },
    {
      icon: Clock,
      title: 'Reliable Supply',
      description: 'Year-round availability, no seasonal limits',
    },
    {
      icon: Shield,
      title: 'Fully Traceable',
      description: 'Complete documentation from cultivation to delivery',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery Call',
      description: 'Understand your needs, goals, and product vision',
      timeline: 'Week 1',
    },
    {
      number: '02',
      title: 'Proposal & Samples',
      description: 'Detailed partnership plan with product samples',
      timeline: 'Week 2-3',
    },
    {
      number: '03',
      title: 'Agreement & Development',
      description: 'Contract finalization and formulation development',
      timeline: 'Week 4-6',
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'Product launch with ongoing quality assurance',
      timeline: 'Week 8+',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

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
              Partnership Models
            </BrandBadge>

            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Build Your Brand with <span className="text-[hsl(var(--synervion-primary-500))]">Premium Cordyceps</span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))] mb-8 sm:mb-12 px-4 leading-relaxed">
              Choose the partnership model that aligns with your business goals. From turnkey solutions
              to custom development, we're here to power your wellness innovation.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-4 sm:p-6 rounded-xl bg-white border border-[hsl(var(--synervion-border-light))] text-center"
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-[hsl(var(--synervion-primary-500))]" />
                  <div className="text-xs sm:text-sm mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {benefit.title}
                  </div>
                  <div className="text-xs text-[hsl(var(--synervion-text-tertiary))]">
                    {benefit.description}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Flexible Collaboration Options
            </h2>
            <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] max-w-2xl mx-auto px-4">
              We offer three distinct partnership models designed to meet different business needs and growth stages.
            </p>
          </motion.div>

          {/* Product Mockup Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="mb-3 text-xl sm:text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Versatile Product Formats
              </h3>
              <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] max-w-2xl mx-auto px-4">
                From energy bars to liquid drops, bottles to pouches – we support diverse packaging formats
              </p>
            </div>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[hsl(var(--synervion-bg-gray-50))] to-white p-6 sm:p-10">
              <img
                src={productMockups}
                alt="Synervion product format options - energy bars, liquid drops, bottles, pouches"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {partnershipModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Highlight Badge */}
                  {model.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 rounded-full bg-[hsl(var(--synervion-primary-500))] text-white text-xs z-10">
                      {model.highlight}
                    </div>
                  )}

                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border-2 border-[hsl(var(--synervion-border-light))] group-hover:border-[hsl(var(--synervion-primary-500))] transition-all duration-300 hover:shadow-xl">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[hsl(var(--synervion-primary-500))]" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-xl sm:text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {model.title}
                    </h3>

                    <p className="text-sm text-[hsl(var(--synervion-text-secondary))] mb-6">
                      {model.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {model.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <div className="w-5 h-5 rounded-full bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-[hsl(var(--synervion-primary-500))]" />
                          </div>
                          <span className="text-[hsl(var(--synervion-text-secondary))]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Ideal For */}
                    <div className="pt-6 border-t border-[hsl(var(--synervion-border-light))] mb-6">
                      <div className="text-xs mb-1 text-[hsl(var(--synervion-text-tertiary))]">
                        Ideal For:
                      </div>
                      <div className="text-sm text-[hsl(var(--synervion-text-secondary))]">
                        {model.idealFor}
                      </div>
                    </div>

                    {/* CTA */}
                    <BrandButton
                      variant="outline"
                      className="w-full border-[hsl(var(--synervion-secondary-800))] text-[hsl(var(--synervion-secondary-800))] group-hover:bg-[hsl(var(--synervion-primary-500))] group-hover:text-white group-hover:border-[hsl(var(--synervion-primary-500))] transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </BrandButton>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Journey */}
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
              Our Process
            </BrandBadge>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Your Partnership Journey
            </h2>
            <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] max-w-2xl mx-auto px-4">
              A transparent, streamlined process from first contact to product launch.
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line - Desktop Only */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-[hsl(var(--synervion-border-light))]"
              style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[hsl(var(--synervion-primary-500))] flex items-center justify-center mx-auto mb-4 sm:mb-6 relative z-10 shadow-lg">
                    <span className="text-xl sm:text-2xl text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {step.number}
                    </span>
                  </div>
                  <h4 className="mb-2 sm:mb-3 text-base sm:text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))] mb-2 px-2">
                    {step.description}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--synervion-bg-gray-100))] text-xs text-[hsl(var(--synervion-text-secondary))]">
                    {step.timeline}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left: Form Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <BrandBadge variant="primary" className="mb-4 sm:mb-6">
                Get Started
              </BrandBadge>

              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Start Your Partnership Journey Today
              </h2>

              <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] mb-6 sm:mb-8 leading-relaxed">
                Fill out the form and our partnership team will contact you within 24 hours
                to discuss how we can help bring your vision to life.
              </p>

              {/* Image */}
              <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MTYyODc0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Partnership meeting"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mt-6 sm:mt-8">
                {[
                  { value: '50+', label: 'Partners' },
                  { value: '24h', label: 'Response Time' },
                  { value: '99.8%', label: 'Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-[hsl(var(--synervion-bg-gray-50))]">
                    <div className="text-xl sm:text-2xl mb-1 text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-[hsl(var(--synervion-text-secondary))]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] shadow-lg">
                <div className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                    />
                  </div>

                  {/* Partnership Type */}
                  <div className="space-y-2">
                    <Label htmlFor="partnershipType">Partnership Interest *</Label>
                    <Select
                      value={formData.partnershipType}
                      onValueChange={(value: string) => setFormData({ ...formData, partnershipType: value })}
                    >
                      <SelectTrigger className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]">
                        <SelectValue placeholder="Select partnership type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white-label">White-Label</SelectItem>
                        <SelectItem value="co-brand">Co-Brand</SelectItem>
                        <SelectItem value="custom">Custom Formulation</SelectItem>
                        <SelectItem value="other">Other / Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your project *</Label>
                    <Textarea
                      id="message"
                      placeholder="Share your vision, goals, and any specific requirements..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <BrandButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full group"
                  >
                    Submit Partnership Inquiry
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>

                  <p className="text-xs text-center text-[hsl(var(--synervion-text-tertiary))]">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[hsl(var(--synervion-secondary-800))] to-[hsl(var(--synervion-secondary-700))] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <BrandBadge variant="outline" className="mb-6 border-white text-white">
                Success Stories
              </BrandBadge>
              <h2 className="mb-4 text-white text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Trusted by Leading Wellness Brands
              </h2>
              <p className="text-sm sm:text-base text-white/90 mb-6">
                Our partners have launched 100+ successful products, reaching millions of health-conscious consumers worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { metric: '10M+', label: 'Units Delivered' },
                { metric: '50+', label: 'Active Partners' },
                { metric: '100%', label: 'Batch Traceability' },
                { metric: '24/7', label: 'Partner Support' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-xl bg-white/10 backdrop-blur-sm text-center">
                  <div className="text-2xl sm:text-3xl mb-2 text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {stat.metric}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
