import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { contactFormConfig } from '../config/api.config';

export function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      // Load configuration from centralized config file
      const { USE_MOCK_API, MOCK_DELAY } = contactFormConfig;

      if (USE_MOCK_API) {
        // Mock API for development/preview - simulates backend behavior
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

        // Simulate validation
        if (!formData.email.includes('@')) {
          throw new Error('Invalid email format');
        }

        // Simulate success response
        const result = {
          success: true,
          message: 'Your message has been successfully submitted. We will get back to you soon!',
          submission_id: Math.floor(Math.random() * 1000)
        };

        console.log('📬 Mock Form Submission:', {
          full_name: formData.fullName,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString()
        });

        if (result.success) {
          setStatus('success');
          setFormData({
            fullName: '',
            email: '',
            company: '',
            subject: '',
            message: ''
          });

          // Reset success message after 5 seconds
          setTimeout(() => {
            setStatus('idle');
          }, 5000);
        } else {
          setStatus('error');
        }
      } else {
        // Production mode: Call Vercel serverless function
        const response = await fetch('/api/send-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            company: formData.company,
            subject: formData.subject,
            message: formData.message
          })
        });

        const result = await response.json();

        if (result.success) {
          setStatus('success');
          setFormData({
            fullName: '',
            email: '',
            company: '',
            subject: '',
            message: ''
          });

          // Reset success message after 5 seconds
          setTimeout(() => {
            setStatus('idle');
          }, 5000);
        } else {
          setStatus('error');
          console.error('Server error:', result.message);
        }
      }
    } catch (error) {
      setStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load developer notice setting from config
  const { SHOW_DEV_NOTICE } = contactFormConfig;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[hsl(var(--synervion-bg-gray-50))]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* Developer Notice - Remove in production */}
        {SHOW_DEV_NOTICE && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[720px] mx-auto mb-8"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center mt-0.5">
                  <span style={{ fontSize: '12px' }}>ℹ️</span>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    color: '#1e40af',
                    marginBottom: '4px',
                    fontWeight: 600
                  }}>
                    Development Mode
                  </p>
                  <p style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '13px',
                    color: '#1e3a8a',
                    lineHeight: '1.5'
                  }}>
                    This form is using mock data. Submissions will be logged to console but not saved.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Heading */}
          <h2
            className="mb-4 sm:mb-6"
            style={{
              fontFamily: 'var(--synervion-font-heading)',
              fontSize: '32px',
              fontWeight: 600,
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              color: 'hsl(var(--synervion-text-primary))'
            }}
          >
            Get in Touch
          </h2>

          {/* Subtext */}
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--synervion-font-body)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '1.7',
              color: 'hsl(var(--synervion-text-secondary))'
            }}
          >
            Have a question, partnership idea, or press inquiry? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-[720px] mx-auto"
        >
          <div
            className="bg-white rounded-2xl p-8 sm:p-10 lg:p-12"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                  className="block mb-2"
                >
                  Full Name <span className="text-[hsl(var(--synervion-error))]">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--synervion-border-light))] transition-all duration-200 focus:outline-none focus:border-[hsl(var(--synervion-primary-500))] focus:shadow-[0_0_0_3px_rgba(238,123,47,0.15)]"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                  className="block mb-2"
                >
                  Email <span className="text-[hsl(var(--synervion-error))]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--synervion-border-light))] transition-all duration-200 focus:outline-none focus:border-[hsl(var(--synervion-primary-500))] focus:shadow-[0_0_0_3px_rgba(238,123,47,0.15)]"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                  className="block mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company or organization (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--synervion-border-light))] transition-all duration-200 focus:outline-none focus:border-[hsl(var(--synervion-primary-500))] focus:shadow-[0_0_0_3px_rgba(238,123,47,0.15)]"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                  className="block mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--synervion-border-light))] transition-all duration-200 focus:outline-none focus:border-[hsl(var(--synervion-primary-500))] focus:shadow-[0_0_0_3px_rgba(238,123,47,0.15)]"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'hsl(var(--synervion-text-secondary))'
                  }}
                  className="block mb-2"
                >
                  Message <span className="text-[hsl(var(--synervion-error))]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--synervion-border-light))] transition-all duration-200 focus:outline-none focus:border-[hsl(var(--synervion-primary-500))] focus:shadow-[0_0_0_3px_rgba(238,123,47,0.15)] resize-vertical"
                  style={{
                    fontFamily: 'var(--synervion-font-body)',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '1.6',
                    color: 'hsl(var(--synervion-text-primary))'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-7 py-3.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                style={{
                  backgroundColor: 'hsl(var(--synervion-primary-500))',
                  color: 'white',
                  fontFamily: 'var(--synervion-font-body)',
                  fontSize: '16px',
                  fontWeight: 600
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#D86C28';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--synervion-primary-500))';
                  }
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(var(--synervion-success))]/10 border border-[hsl(var(--synervion-success))]/20"
                >
                  <CheckCircle2 className="w-5 h-5 text-[hsl(var(--synervion-success))] flex-shrink-0" />
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--synervion-font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'hsl(var(--synervion-success))',
                        marginBottom: contactFormConfig.USE_MOCK_API ? '4px' : '0'
                      }}
                    >
                      ✓ Message sent successfully! We'll get back to you soon.
                    </p>
                    {contactFormConfig.USE_MOCK_API && (
                      <p
                        style={{
                          fontFamily: 'var(--synervion-font-body)',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: 'hsl(var(--synervion-success))',
                          opacity: 0.8
                        }}
                      >
                        (Development mode: Check browser console for logged data)
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(var(--synervion-error))]/10 border border-[hsl(var(--synervion-error))]/20"
                >
                  <AlertCircle className="w-5 h-5 text-[hsl(var(--synervion-error))] flex-shrink-0" />
                  <p
                    style={{
                      fontFamily: 'var(--synervion-font-body)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'hsl(var(--synervion-error))'
                    }}
                  >
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}
            </form>
          </div>

          {/* Additional Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p
              style={{
                fontFamily: 'var(--synervion-font-body)',
                fontSize: '14px',
                fontWeight: 400,
                color: 'hsl(var(--synervion-text-tertiary))'
              }}
            >
              Prefer email? Reach us at{' '}
              <a
                href="mailto:info@synervion.com"
                className="text-[hsl(var(--synervion-primary-500))] hover:underline"
                style={{
                  fontWeight: 500
                }}
              >
                info@synervion.com
              </a>{' '}
              or call us at{' '}
              <a
                href="tel:+918823888238"
                className="text-[hsl(var(--synervion-primary-500))] hover:underline"
                style={{
                  fontWeight: 500
                }}
              >
                +91 88238 88238
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
