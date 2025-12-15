import { motion } from 'motion/react';
import { BrandButton } from '../components/brand/BrandButton';
import { BrandBadge } from '../components/brand/BrandBadge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Mail, Phone, MapPin, Clock, MessageCircle,
  ArrowRight, Send, Users
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@synervion.com',
      description: 'For general inquiries and partnership requests',
      action: 'mailto:info@synervion.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 88238 88238',
      description: 'Mon-Fri, 9:00 AM - 6:00 PM IST',
      action: 'tel:+918823888238',
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      value: 'Khargone, Madhya Pradesh, India',
      description: 'Visit our state-of-the-art cultivation facility',
      action: 'https://www.google.com/maps/place/Synervion+(HQ)/@22.0305022,74.911862,17z/data=!3m1!4b1!4m6!3m5!1s0x3961f9005d3782bb:0x81dda667a2e630de!8m2!3d22.0304972!4d74.9144369!16s%2Fg%2F11ybnfw2vx?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
    },
  ];

  const offices = [
    {
      name: 'Synervion HQ',
      location: 'Madhya Pradesh, India',
      address: 'Survey No. 36/1/2, Village - Bedia, District - Khargone, Madhya Pradesh 451113',
      type: 'Headquarters',
      mapLink: 'https://www.google.com/maps/place/Synervion+(HQ)/@22.0305022,74.911862,17z/data=!3m1!4b1!4m6!3m5!1s0x3961f9005d3782bb:0x81dda667a2e630de!8m2!3d22.0304972!4d74.9144369!16s%2Fg%2F11ybnfw2vx?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D'
    },
    {
      name: 'Synervion Labs',
      location: 'Madhya Pradesh, India',
      address: 'Survey No. 104/2, Village - Bedia, District - Khargone, Madhya Pradesh 451113',
      type: 'R&D Facility',
      mapLink: 'https://www.google.com/maps/place/Synervion+Labs/@22.0430188,75.0207156,17z/data=!3m1!4b1!4m6!3m5!1s0x39620300488bc205:0x7cca84a2184251be!8m2!3d22.0430138!4d75.0232905!16s%2Fg%2F11wv_h4n3l?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D'
    }
  ];

  const journeySteps = [
    {
      number: '01',
      title: 'Initial Contact',
      description: 'Reach out via email, phone, or form',
      timeline: 'Day 1',
      color: 'primary',
    },
    {
      number: '02',
      title: 'Discovery Call',
      description: 'Schedule 30-min consultation call',
      timeline: 'Day 2-3',
      color: 'primary',
    },
    {
      number: '03',
      title: 'Proposal',
      description: 'Receive detailed partnership proposal',
      timeline: 'Week 2',
      color: 'primary',
    },
    {
      number: '04',
      title: 'Partnership Begin',
      description: 'Contract signing & project kickoff',
      timeline: 'Week 3-4',
      color: 'success',
    },
  ];

  const faqs = [
    {
      question: 'What is your typical response time?',
      answer: 'We respond to all partnership inquiries within 24 hours on business days.',
    },
    {
      question: 'Do you offer facility tours?',
      answer: 'Yes! We welcome potential partners to visit our facility. Schedule a tour through our contact form.',
    },
    {
      question: 'What are your minimum order quantities?',
      answer: 'MOQs vary by partnership model. White-label starts at 1,000 units, while custom formulations are negotiable.',
    },
    {
      question: 'Can I get product samples?',
      answer: 'Absolutely. After initial consultation, we provide samples relevant to your partnership interest.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Synervion | Partner with Us"
        description="Get in touch with Synervion for partnership inquiries, product samples, or to schedule a facility tour. We respond within 24 hours."
        canonical="/contact"
      />
      <Navigation />
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
            {/* Removed Get In Touch Pill */}

            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Let's Build Something <span className="text-[hsl(var(--synervion-primary-500))]">Great Together</span>
            </h1>

            <p className="text-base sm:text-lg text-[hsl(var(--synervion-text-secondary))] mb-8 sm:mb-12 px-4 leading-relaxed">
              Our partnership team is here to answer your questions and help you find
              the perfect collaboration model for your brand's wellness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group p-6 sm:p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))] hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[hsl(var(--synervion-primary-500))]" />
                  </div>
                  <h3 className="mb-2 text-lg sm:text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {method.title}
                  </h3>
                  <div className="mb-3 text-base sm:text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {method.value}
                  </div>
                  <p className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))]">
                    {method.description}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Journey Graphic */}
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
              Partnership Journey
            </BrandBadge>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              From First Contact to Launch
            </h2>
            <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] max-w-2xl mx-auto px-4">
              A clear, transparent process designed to get you from inquiry to partnership quickly.
            </p>
          </motion.div>

          {/* Journey Visualization */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--synervion-primary-500))] to-[hsl(var(--synervion-success))]"
              style={{ width: 'calc(100% - 6rem)', marginLeft: '3rem' }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  {/* Step Circle */}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative z-10 shadow-lg ${step.color === 'success'
                    ? 'bg-[hsl(var(--synervion-success))]'
                    : 'bg-[hsl(var(--synervion-primary-500))]'
                    }`}>
                    <span className="text-xl sm:text-2xl text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-center p-4 sm:p-6 rounded-xl bg-white border border-[hsl(var(--synervion-border-light))] shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="mb-2 text-base sm:text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))] mb-3">
                      {step.description}
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--synervion-bg-gray-100))] text-xs text-[hsl(var(--synervion-text-secondary))]">
                      {step.timeline}
                    </div>
                  </div>

                  {/* Arrow - Mobile Only */}
                  {index < journeySteps.length - 1 && (
                    <div className="sm:hidden flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-[hsl(var(--synervion-primary-500))] rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 sm:mt-12"
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-white border border-[hsl(var(--synervion-border-light))]">
              <Clock className="w-5 h-5 text-[hsl(var(--synervion-primary-500))]" />
              <span className="text-sm text-[hsl(var(--synervion-text-secondary))]">
                Average time from contact to partnership: <span style={{ fontFamily: 'Manrope, sans-serif' }}>3-4 weeks</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Offices */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Send Us a Message
                </h2>
                <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))]">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="John Doe"
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-company">Company Name</Label>
                  <Input
                    id="contact-company"
                    placeholder="Your Company"
                    className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject *</Label>
                  <Input
                    id="contact-subject"
                    placeholder="What's this about?"
                    required
                    className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))] resize-none"
                  />
                </div>

                <BrandButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full group"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </form>
            </motion.div>

            {/* Office Locations & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Office Locations */}
              <div>
                <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <a
                      key={office.name}
                      href={office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group overflow-hidden rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))] hover:shadow-lg transition-all"
                    >
                      {/* Pseudo-Map Header */}
                      <div className="h-24 bg-[hsl(var(--synervion-bg-gray-100))] relative overflow-hidden group-hover:bg-[hsl(var(--synervion-bg-gray-200))] transition-colors">
                        {/* Abstract map pattern or grid */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
                          backgroundSize: '16px 16px'
                        }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--synervion-primary-700))] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm group-hover:bg-white group-hover:scale-105 transition-all">
                            <MapPin className="w-4 h-4" /> View on Google Maps
                          </span>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-bold text-[hsl(var(--synervion-secondary-900))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            {office.name}
                          </h4>
                          <BrandBadge variant="outline" size="sm" className="bg-[hsl(var(--synervion-bg-gray-50))]">
                            {office.type}
                          </BrandBadge>
                        </div>
                        <p className="text-sm font-medium text-[hsl(var(--synervion-text-primary))] mb-1">
                          {office.location}
                        </p>
                        <p className="text-xs text-[hsl(var(--synervion-text-secondary))] leading-relaxed mb-4">
                          {office.address}
                        </p>

                        <div className="flex items-center text-xs font-semibold text-[hsl(var(--synervion-primary-600))] group-hover:underline">
                          Get Directions <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--synervion-primary-500))]/10 to-transparent border border-[hsl(var(--synervion-primary-500))]/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--synervion-primary-500))]/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[hsl(var(--synervion-primary-500))]" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Business Hours
                    </h4>
                    <div className="space-y-1 text-sm text-[hsl(var(--synervion-text-secondary))]">
                      <div>Monday - Friday: 9:00 AM - 6:00 PM IST</div>
                      <div>Saturday: 10:00 AM - 2:00 PM IST</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[hsl(var(--synervion-text-secondary))]">
                  For urgent inquiries outside business hours, please email us and we'll respond as soon as possible.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageCircle, value: '< 24h', label: 'Response Time' },
                  { icon: Users, value: '50+', label: 'Active Partners' },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="p-4 sm:p-6 rounded-xl bg-white border border-[hsl(var(--synervion-border-light))] text-center"
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-[hsl(var(--synervion-primary-500))]" />
                      <div className="text-xl sm:text-2xl mb-1 text-[hsl(var(--synervion-primary-500))]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-[hsl(var(--synervion-text-secondary))]">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
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
              FAQs
            </BrandBadge>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))]/30 transition-colors"
              >
                <h4 className="mb-3 text-base sm:text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {faq.question}
                </h4>
                <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))] leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
