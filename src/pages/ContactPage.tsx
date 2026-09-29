import React, { useState } from 'react';
import { EYGN_INFO } from '../data/eygnData';
import { ApiRequestError, ContactDepartment, submitContactMessage } from '../lib/api';
import { ROUTES } from '../lib/routes';
import { SEO } from '../components/SEO';
import { SocialLinks } from '../components/SocialLinks';
import { Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

// Frontend display labels -> eygn-api's ContactDepartment enum slugs (see api.ts).
const DEPARTMENT_TO_API: Record<string, ContactDepartment> = {
  'General Inquiries (Executive Secretariat)': 'general',
  'Media & Communication (Mr. Amanuel Lemma)': 'media_communication',
  'Partnerships & Outreach (Mr. Yonas Anbiko)': 'partnerships_outreach',
  'Operations & Coordination (Ms. Fenet Yohannes)': 'operations_coordination',
  'Research & Policy (Ms. Meseret Kiros)': 'research_policy',
  'Youth Mobilization & Chapters (Ms. Rebecca Nebiu)': 'youth_mobilization_chapters',
  'Events & Program Coordination (Ms. Heldana Teklit)': 'events_program_coordination',
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'General Inquiries (Executive Secretariat)',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors(null);
    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || undefined,
        department: DEPARTMENT_TO_API[formData.department] ?? 'general',
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiRequestError && err.fieldErrors) {
        setFieldErrors(err.fieldErrors);
        setSubmitError('Please fix the highlighted fields and try again.');
      } else if (err instanceof ApiRequestError) {
        setSubmitError(err.message);
      } else {
        setSubmitError('Something went wrong sending your message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-20 py-6">
      <SEO
        title="Connect with the EYGN Secretariat"
        description="Have an inquiry, partnership proposal, or chapter initiative? Reach our direct liaison desks across Addis Ababa and international hubs."
        path={ROUTES.contact}
      />
      {/* 1. Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]">
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Secretariat dispatch & correspondence</span>
        </div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]">
          Connect with the EYGN Secretariat
        </h1>
        {/* Body: 16px, Regular, Dark color */}
        <p className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto">
          Have an inquiry, partnership proposal, or chapter initiative? Reach our direct liaison desks across Addis Ababa and international hubs.
        </p>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1a2805] text-white rounded-3xl p-8 border border-[#f3a310]/40 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />

              <span className="text-xs uppercase font-semibold text-[#f3a310] tracking-wider block mb-1">
                Official directory
              </span>
              <h3 className="text-[22px] font-bold text-white mb-6">
                Executive & department inboxes
              </h3>

              <div className="space-y-4">
                {EYGN_INFO.officialEmails.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#f3a310] font-semibold block">
                      {item.label}
                    </span>
                    <a
                      href={`mailto:${item.email}`}
                      className="font-mono text-[14px] text-white hover:text-[#f3a310] transition-colors flex items-center gap-2 truncate"
                    >
                      <Mail className="w-4 h-4 text-[#06592b] shrink-0" />
                      <span className="truncate">{item.email}</span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-[14px] text-stone-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#f3a310] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Global headquarters</span>
                    <span>{EYGN_INFO.headquarters}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <Clock className="w-4 h-4 text-[#f3a310] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Secretariat operating hours</span>
                    <span>{EYGN_INFO.workingHours}</span>
                  </div>
                </div>

                <SocialLinks className="flex items-center gap-3 pt-2" />
              </div>
            </div>

            {/* Diaspora Tagline banner */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#06592b]">
                {EYGN_INFO.tagline}
              </span>
              <h4 className="text-[18px] font-bold text-[#1a2805]">
                "{EYGN_INFO.motto}"
              </h4>
              <p className="text-[14px] text-stone-600">
                {EYGN_INFO.mottoAm}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#06592b] block">
                    Direct dispatch
                  </span>
                  {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
                  <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
                    Send a communiqué to EYGN
                  </h2>
                  <p className="text-[15px] text-stone-600 mt-1">
                    Your message is automatically routed to the corresponding department director.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Dawit Wolde"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="dawit@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-department" className="block text-xs font-semibold text-stone-700 mb-1">
                      Target Department Desk
                    </label>
                    <select
                      id="contact-department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] bg-white"
                    >
                      <option>General Inquiries (Executive Secretariat)</option>
                      <option>Media & Communication (Mr. Amanuel Lemma)</option>
                      <option>Partnerships & Outreach (Mr. Yonas Anbiko)</option>
                      <option>Operations & Coordination (Ms. Fenet Yohannes)</option>
                      <option>Research & Policy (Ms. Meseret Kiros)</option>
                      <option>Youth Mobilization & Chapters (Ms. Rebecca Nebiu)</option>
                      <option>Events & Program Coordination (Ms. Heldana Teklit)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-stone-700 mb-1">
                      Subject Line *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      placeholder="e.g. Chapter Proposal / DEAIP Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message / Proposal *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    placeholder="Provide detailed background regarding your organization, inquiry, or partnership intention..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                  />
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700 space-y-1">
                    <p>{submitError}</p>
                    {fieldErrors && (
                      <ul className="list-disc pl-4 space-y-0.5">
                        {Object.entries(fieldErrors).map(([field, messages]) => (
                          <li key={field}>{messages[0]}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Buttons: 16px, Medium, sentence case */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#1a2805] hover:bg-[#06592b] disabled:opacity-60 disabled:cursor-not-allowed text-[#f3a310] font-medium text-[16px] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting dispatch…' : 'Transmit official dispatch'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-[#06592b] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
                <h2 className="text-[24px] font-bold text-[#06592b]">
                  Message dispatched successfully
                </h2>
                <p className="text-[15px] text-[#1a2805] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1a2805]">{formData.name}</strong>. Your correspondence has been delivered to the <strong>{formData.department}</strong>. A response will be returned to <strong>{formData.email}</strong> within 1–2 business days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[15px] font-medium text-[#06592b] hover:text-[#1a2805] underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
