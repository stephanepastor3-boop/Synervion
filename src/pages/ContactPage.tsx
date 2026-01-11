import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { BrandButton } from '../components/brand/BrandButton';
import { BrandBadge } from '../components/brand/BrandBadge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Mail, Phone, MapPin, Clock, MessageCircle,
  ArrowRight, Send, Users, PackageCheck
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const productContext = searchParams.get('product');
  const weightContext = searchParams.get('weight');
  const isOrderIntent = searchParams.get('intent') === 'order';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultSubject = isOrderIntent && productContext
    ? `Sample Request: ${productContext}${weightContext ? ` (${weightContext})` : ''}`
    : '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      company: formData.get('company'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message); // Show success popup
        (e.target as HTMLFormElement).reset(); // Reset form
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      value: 'Barwani, Madhya Pradesh, India',
      description: 'Visit our state-of-the-art cultivation facility',
      action: 'https://maps.app.goo.gl/4cZphEF61RyRTMjG8',
    },
  ];

  const offices = [
    {
      name: 'Synervion HQ',
      location: 'Madhya Pradesh, India',
      address: 'Anjad Rd, Barwani, Madhya Pradesh 451551, India',
      type: 'Headquarters',
      mapLink: 'https://maps.app.goo.gl/4cZphEF61RyRTMjG8',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14902.164344837777!2d74.8953185!3d22.0305871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396207127e4e000d%3A0xc0fb106b12a32c28!2sSynervion!5e0!3m2!1sen!2sin!4v1736605000000!5m2!1sen!2sin'
    },
    {
      name: 'Synervion Labs',
      location: 'Madhya Pradesh, India',
      address: 'Survey No.241, 4, Dist, in front of Saket Ginning, Borlay, Madhya Pradesh 451556, India',
      type: 'R&D Facility',
      mapLink: 'https://www.google.com/maps/search/Survey+No.241,+4,+Dist,+in+front+of+Saket+Ginning,+Borlay,+Madhya+Pradesh+451556,+India',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.1720330310095!2d75.0232905!3d22.0430138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39620300488bc205%3A0x7cca84a2184251be!2sSynervion%20Labs!5e0!3m2!1sen!2sin!4v1768119515864!5m2!1sen!2sin'
    }
  ];

  const hqSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Synervion HQ",
    "image": "https://www.synervion.com/assets/logo-square.png",
    "url": "https://www.synervion.com",
    "telephone": "+918823888238",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Anjad Rd",
      "addressLocality": "Barwani",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "451551",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.0305871,
      "longitude": 74.8953185
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:30",
        "closes": "17:30"
      }
    ]
  };

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
                {isOrderIntent && productContext ? (
                  <div className="mb-8 p-6 bg-orange-50 border border-orange-100 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm text-orange-600">
                        <PackageCheck size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Order Request</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{productContext}</h3>
                        {weightContext && <p className="text-sm text-slate-600">Size: {weightContext}</p>}
                      </div>
                    </div>
                  </div>
                ) : null}

                <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {isOrderIntent ? 'Request Product Sample' : 'Send Us a Message'}
                </h2>
                <p className="text-sm sm:text-base text-[hsl(var(--synervion-text-secondary))]">
                  {isOrderIntent
                    ? 'Confirm your details below to receive a sample shipment or quote.'
                    : "Fill out the form below and we'll get back to you within 24 hours."}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder="John Doe"
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your Company"
                    className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    defaultValue={defaultSubject}
                    required
                    className="border-[hsl(var(--synervion-border-light))] focus:border-[hsl(var(--synervion-primary-500))]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className={`w-4 h-4 ml-2 transition-transform ${isSubmitting ? 'opacity-0' : 'group-hover:translate-x-1'}`} />
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
              <Helmet>
                <script type="application/ld+json">
                  {JSON.stringify(hqSchema)}
                </script>
              </Helmet>

              {/* Office Locations */}
              <div>
                <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <div
                      key={office.name}
                      className="block group overflow-hidden rounded-2xl bg-white border border-[hsl(var(--synervion-border-light))] transition-all hover:border-[hsl(var(--synervion-primary-500))] hover:shadow-lg"
                    >
                      {office.embedUrl ? (
                        <div className="h-64 bg-[hsl(var(--synervion-bg-gray-100))] relative overflow-hidden">
                          <iframe
                            src={office.embedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Map of ${office.name}`}
                          />
                        </div>
                      ) : (
                        <a href={office.mapLink} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="h-24 bg-[hsl(var(--synervion-bg-gray-100))] relative overflow-hidden group-hover:bg-[hsl(var(--synervion-bg-gray-200))] transition-colors"
                            style={{ backgroundImage: "url('/assets/map-pattern.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 opacity-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--synervion-primary-700))] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm group-hover:bg-white group-hover:scale-105 transition-all">
                                <MapPin className="w-4 h-4" /> View on Google Maps
                              </span>
                            </div>
                          </div>
                        </a>
                      )}

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

                        <a
                          href={office.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs font-semibold text-[hsl(var(--synervion-primary-600))] hover:underline"
                        >
                          Get Directions <ArrowRight className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
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
                      <div>Monday - Saturday: 8:30 AM - 5:30 PM IST</div>
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
      <Toaster position="top-center" richColors />
    </div>
  );
}
