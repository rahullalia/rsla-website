'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Navigation from '@/components/Navigation';
import { AuroraBackground } from '@/components/animations';

export default function InquiryFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' });
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const itiRef = useRef<any>(null);

  useEffect(() => {
    const initializePhoneInput = () => {
      if (phoneInputRef.current && !itiRef.current) {
        // @ts-ignore
        if (window.intlTelInput) {
          // @ts-ignore
          itiRef.current = window.intlTelInput(phoneInputRef.current, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
            initialCountry: "auto",
            geoIpLookup: (callback: (countryCode: string) => void) => {
              fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
            },
            nationalMode: false,
          });
        } else {
          setTimeout(initializePhoneInput, 100);
        }
      }
    };

    if (typeof window !== 'undefined') {
      initializePhoneInput();
    }

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
        itiRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSubmitting(true);
    setFormMessage({ type: null, text: '' });

    const formData = new FormData(formRef.current);

    // Anti-spam honeypot check
    if (formData.get('honeypot')) {
      console.log('Bot detected');
      return;
    }

    // Validate phone number if provided
    const phoneInput = phoneInputRef.current;
    if (phoneInput && phoneInput.value.trim() && itiRef.current) {
      if (!itiRef.current.isValidNumber()) {
        setFormMessage({ type: 'error', text: 'Please enter a valid phone number.' });
        setIsSubmitting(false);
        if (phoneInput) phoneInput.style.borderColor = '#ff6b6b';
        return;
      } else {
        if (phoneInput) phoneInput.style.borderColor = '';
      }
    }

    const data: any = Object.fromEntries(formData.entries());

    // Get formatted phone number
    if (phoneInput && phoneInput.value.trim() && itiRef.current) {
      data.phone = itiRef.current.getNumber();
    } else {
      data.phone = "";
    }
    delete data['phone-intl'];
    delete data.honeypot;

    const webhookUrl = 'https://services.leadconnectorhq.com/hooks/LcZc1omMqp9hMj30hWNl/webhook-trigger/0fc84c34-c582-4d03-af61-64dc40f15bc3';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormMessage({ type: 'success', text: 'We have received your message and will be in touch shortly.' });
        if (formRef.current) {
          formRef.current.reset();
        }
        if (itiRef.current) {
          itiRef.current.setCountry("us");
        }
      } else {
        throw new Error('Server responded with an error.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/css/intlTelInput.css" />

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js"
        strategy="lazyOnload"
      />

      <main className="min-h-screen bg-brand-black text-white relative overflow-hidden">
        <Navigation />
        <AuroraBackground />

        <div className="pt-45 pb-25 px-[5%] max-w-175 mx-auto relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white mb-4 font-display">Get in Touch</h1>
            <p className="text-lg text-gray-400">Fill out the form below and our team will get back to you shortly.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[20px] p-10 backdrop-blur-md">
            <form ref={formRef} onSubmit={handleSubmit} id="lead-form">
              {/* Honeypot Field */}
              <div className="hidden">
                <label htmlFor="honeypot">Leave this field blank</label>
                <input type="text" id="honeypot" name="honeypot" />
              </div>

              {/* Full Name */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full px-3.5 py-3.5 bg-black/20 border border-white/10 rounded-md text-white text-base transition-all focus:outline-none focus:border-brand-blue focus:bg-black/10 placeholder:text-gray-500"
                />
              </div>

              {/* Business Name */}
              <div className="mb-5">
                <label htmlFor="company_name" className="block text-sm font-medium text-white mb-2">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  placeholder="Acme Inc."
                  className="w-full px-3.5 py-3.5 bg-black/20 border border-white/10 rounded-md text-white text-base transition-all focus:outline-none focus:border-brand-blue focus:bg-black/10 placeholder:text-gray-500"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  className="w-full px-3.5 py-3.5 bg-black/20 border border-white/10 rounded-md text-white text-base transition-all focus:outline-none focus:border-brand-blue focus:bg-black/10 placeholder:text-gray-500"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-5">
                <label htmlFor="phone-intl" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  id="phone-intl"
                  name="phone-intl"
                  placeholder="+1 (123) 456-7890"
                  required
                  className="w-full px-3.5 py-3.5 pl-[58px] bg-black/20 border border-white/10 rounded-md text-white text-base transition-all focus:outline-none focus:border-brand-blue focus:bg-black/10 placeholder:text-gray-500"
                />
              </div>

              {/* Notes */}
              <div className="mb-5">
                <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
                  How can we help? (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Tell us a bit about your project..."
                  rows={4}
                  className="w-full px-3.5 py-3.5 bg-black/20 border border-white/10 rounded-md text-white text-base transition-all focus:outline-none focus:border-brand-blue focus:bg-black/10 placeholder:text-gray-500 resize-y min-h-[120px]"
                />
              </div>

              {/* Opt-in Checkbox */}
              <div className="flex items-start mt-2.5 mb-6">
                <input
                  type="checkbox"
                  id="opt_in"
                  name="opt_in"
                  value="true"
                  required
                  className="w-4 h-4 mt-1 mr-3 accent-brand-blue flex-shrink-0"
                />
                <label htmlFor="opt_in" className="text-sm text-gray-400 leading-relaxed">
                  By checking this box, you consent to receive marketing communications and agree to our{' '}
                  <Link href="/terms" target="_blank" className="text-white border-b border-white/10 hover:text-brand-blue hover:border-brand-blue whitespace-nowrap">
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy-policy" target="_blank" className="text-white border-b border-white/10 hover:text-brand-blue hover:border-brand-blue whitespace-nowrap">
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              {/* Submit Button */}
              <div className="mb-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-block bg-brand-blue text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_0_20px_rgba(0,112,243,0.4)] border-none cursor-pointer transition-all duration-400 hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {/* Form Message */}
              {formMessage.type && (
                <div className={`text-center mt-5 text-base p-4 rounded-md ${
                  formMessage.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {formMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Custom styles for intl-tel-input */}
      <style jsx global>{`
        .iti {
          width: 100%;
        }
        .iti__dropdown-content,
        .iti__country-list {
          background-color: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
        }
        .iti__country {
          color: #a1a1a1;
        }
        .iti__country:hover,
        .iti__country.iti__highlight {
          background-color: rgba(255, 255, 255, 0.08);
        }
        .iti__dial-code {
          color: #0070f3;
        }
      `}</style>
    </>
  );
}
