import React, { useState } from 'react';
import { FAQS, MEMBERSHIP_BENEFITS } from '../data/eygnData';
import { MembershipFormData } from '../types';
import { DigitalMembershipCard } from '../components/DigitalMembershipCard';
import { ApiRequestError, InterestArea, submitMembershipApplication, submitPartnershipInquiry } from '../lib/api';
import { ROUTES } from '../lib/routes';
import { SEO } from '../components/SEO';
import { CheckCircle2, ShieldCheck, Award, Sparkles, Send, HelpCircle, ChevronDown, ChevronUp, UserCheck } from 'lucide-react';

// Frontend display labels -> eygn-api's InterestArea enum slugs (see api.ts). The two lists don't
// read identically, so submissions map through this table rather than sending the label as-is.
const INTEREST_AREA_TO_API: Record<string, InterestArea> = {
  'Tech & Innovation': 'tech_innovation',
  'Climate Action (Green Legacy)': 'climate_action',
  'Higher Education (DEAIP)': 'higher_education',
  'Public Policy & Diplomacy': 'public_policy_diplomacy',
  'Healthcare Repatriation': 'healthcare_repatriation',
  'FinTech & Business Incubation': 'fintech_business_incubation',
  'Pan-African Cultural Heritage': 'pan_african_heritage',
};

export const MembershipPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'partner'>('individual');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPartnerSubmitted, setIsPartnerSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const [formData, setFormData] = useState<MembershipFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: 'United States',
    city: 'Washington, D.C.',
    status: 'diaspora',
    profession: 'Software Engineer',
    organizationOrUni: '',
    interestAreas: ['Tech & Innovation', 'Climate Action'],
    statementOfPurpose: '',
    newsletterOptIn: true,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const collaborationDomainOptions = [
    'DEAIP Academic & Research Co-design',
    'Green Legacy Reforestation & COP Climate',
    'Youth Leadership Academy Masterclasses',
    'FinTech & Innovation Sandbox Incubation',
  ];

  const [partnerFormData, setPartnerFormData] = useState({
    organizationName: '',
    representativeName: '',
    email: '',
    collaborationDomain: collaborationDomainOptions[0],
    message: '',
  });
  const [isPartnerSubmitting, setIsPartnerSubmitting] = useState(false);
  const [partnerSubmitError, setPartnerSubmitError] = useState<string | null>(null);
  const [partnerFieldErrors, setPartnerFieldErrors] = useState<Record<string, string[]> | null>(null);

  const interestOptions = [
    'Tech & Innovation',
    'Climate Action (Green Legacy)',
    'Higher Education (DEAIP)',
    'Public Policy & Diplomacy',
    'Healthcare Repatriation',
    'FinTech & Business Incubation',
    'Pan-African Cultural Heritage',
  ];

  const handleInterestToggle = (interest: string) => {
    if (formData.interestAreas.includes(interest)) {
      setFormData({
        ...formData,
        interestAreas: formData.interestAreas.filter(i => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interestAreas: [...formData.interestAreas, interest],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors(null);

    const interestAreas = formData.interestAreas
      .map((label) => INTEREST_AREA_TO_API[label])
      .filter((value): value is InterestArea => Boolean(value));

    if (interestAreas.length === 0) {
      setSubmitError('Select at least one area of national service interest.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitMembershipApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        country: formData.country,
        city: formData.city || undefined,
        profession: formData.profession,
        applicantCategory: formData.status,
        organizationOrUni: formData.organizationOrUni || undefined,
        interestAreas,
        statementOfPurpose: formData.statementOfPurpose || undefined,
        newsletterOptIn: formData.newsletterOptIn,
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 409) {
        setSubmitError('This email has already applied for membership.');
      } else if (err instanceof ApiRequestError && err.fieldErrors) {
        setFieldErrors(err.fieldErrors);
        setSubmitError('Please fix the highlighted fields and try again.');
      } else if (err instanceof ApiRequestError) {
        setSubmitError(err.message);
      } else {
        setSubmitError('Something went wrong submitting your application. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitError(null);
    setPartnerFieldErrors(null);
    setIsPartnerSubmitting(true);
    try {
      await submitPartnershipInquiry({
        organizationName: partnerFormData.organizationName,
        representativeName: partnerFormData.representativeName,
        email: partnerFormData.email,
        collaborationDomain: partnerFormData.collaborationDomain || undefined,
        message: partnerFormData.message,
      });
      setIsPartnerSubmitted(true);
    } catch (err) {
      if (err instanceof ApiRequestError && err.fieldErrors) {
        setPartnerFieldErrors(err.fieldErrors);
        setPartnerSubmitError('Please fix the highlighted fields and try again.');
      } else if (err instanceof ApiRequestError) {
        setPartnerSubmitError(err.message);
      } else {
        setPartnerSubmitError('Something went wrong submitting your inquiry. Please try again.');
      }
    } finally {
      setIsPartnerSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-20 py-6">
      <SEO
        title="Join the Ethiopian Youth Global Network"
        description="Become a registered member of the premier non-partisan network uniting diaspora and homeland youth to lead global change and serve Ethiopia."
        path={ROUTES.membership}
      />
      {/* 1. Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]">
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Membership recruitment & global registry</span>
        </div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]">
          Join the Ethiopian Youth Global Network
        </h1>
        {/* Body: 16px, Regular, Dark color */}
        <p className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto">
          Become a registered member of the premier non-partisan network uniting diaspora and homeland youth to lead global change and serve Ethiopia.
        </p>

        {/* Tab switcher: Buttons: 16px, Medium, sentence case */}
        <div className="inline-flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 mt-2">
          <button
            type="button"
            onClick={() => setActiveTab('individual')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'individual'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Individual youth membership
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('partner')}
            className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'partner'
                ? 'bg-white text-[#1a2805] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Institutional & university partner
          </button>
        </div>
      </section>

      {/* 2. MEMBERSHIP BENEFITS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a2805] text-white rounded-3xl p-8 sm:p-12 border border-[#f3a310]/30 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-semibold text-[#f3a310] tracking-wider block mb-1">
                Value proposition
              </span>
              <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
                Why Join the Network?
              </h2>
              <p className="text-[15px] text-stone-300 mt-2 leading-relaxed">
                EYGN gives you a direct, legitimate, and sustained channel to contribute to Ethiopia's national development alongside fellow Ethiopian pioneers globally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {MEMBERSHIP_BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f3a310]/40 transition-colors space-y-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#f3a310]/20 text-[#f3a310] flex items-center justify-center font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-[17px] font-bold text-white">{b.title}</h3>
                  <p className="text-[14px] text-stone-300 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDIVIDUAL MEMBERSHIP REGISTRATION FORM */}
      {activeTab === 'individual' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-stone-200 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#06592b]">
                      Step 01 of 02
                    </span>
                    {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
                    <h2 className="text-[24px] font-bold text-[#06592b]">
                      Membership Application Form
                    </h2>
                    <p className="text-[14px] text-stone-600 mt-1">
                      Fill out your profile details to generate your provisional EYGN Digital Credential.
                    </p>
                  </div>

                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="member-fullName" className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="member-fullName"
                        type="text"
                        required
                        placeholder="e.g. Bethlehem Haile"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="member-email" className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="member-email"
                        type="email"
                        required
                        placeholder="name@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Status: Diaspora vs Homeland */}
                  <div>
                    <span id="member-status-label" className="block text-xs font-semibold text-stone-700 mb-2">
                      Membership Category *
                    </span>
                    <div role="group" aria-labelledby="member-status-label" className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, status: 'diaspora' })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.status === 'diaspora'
                            ? 'bg-[#1a2805] text-white border-[#1a2805] shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-xs font-bold block">Diaspora Youth</span>
                        <span className={`text-[11px] block mt-0.5 ${formData.status === 'diaspora' ? 'text-stone-300' : 'text-stone-500'}`}>
                          Studying or working outside Ethiopia
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, status: 'local' })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.status === 'local'
                            ? 'bg-[#1a2805] text-white border-[#1a2805] shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-xs font-bold block">Homeland Youth</span>
                        <span className={`text-[11px] block mt-0.5 ${formData.status === 'local' ? 'text-stone-300' : 'text-stone-500'}`}>
                          Residing & active in Ethiopia
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Country & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="member-country" className="block text-xs font-semibold text-stone-700 mb-1">
                        Current Country of Residence *
                      </label>
                      <input
                        id="member-country"
                        type="text"
                        required
                        placeholder="e.g. United States, Germany, Ethiopia"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="member-city" className="block text-xs font-semibold text-stone-700 mb-1">
                        City / Metro Area *
                      </label>
                      <input
                        id="member-city"
                        type="text"
                        required
                        placeholder="e.g. Washington, D.C., Berlin, Addis Ababa"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Profession & University */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="member-profession" className="block text-xs font-semibold text-stone-700 mb-1">
                        Profession / Field of Study *
                      </label>
                      <input
                        id="member-profession"
                        type="text"
                        required
                        placeholder="e.g. Software Engineer / Public Health"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="member-organizationOrUni" className="block text-xs font-semibold text-stone-700 mb-1">
                        University or Organization
                      </label>
                      <input
                        id="member-organizationOrUni"
                        type="text"
                        placeholder="e.g. AAU / Stanford / Google"
                        value={formData.organizationOrUni}
                        onChange={(e) => setFormData({ ...formData, organizationOrUni: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Areas of Interest Multi-Selector */}
                  <div>
                    <span id="member-interests-label" className="block text-xs font-semibold text-stone-700 mb-2">
                      Areas of National Service Interest (Select all that apply)
                    </span>
                    <div role="group" aria-labelledby="member-interests-label" className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => {
                        const isSelected = formData.interestAreas.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => handleInterestToggle(interest)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#06592b] text-white border-[#06592b]'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Statement of Purpose */}
                  <div>
                    <label htmlFor="member-statementOfPurpose" className="block text-xs font-semibold text-stone-700 mb-1">
                      Brief Statement of Purpose / Desired Contribution *
                    </label>
                    <textarea
                      id="member-statementOfPurpose"
                      rows={3}
                      required
                      placeholder="How would you like to contribute your skills or network to Ethiopia's development?"
                      value={formData.statementOfPurpose}
                      onChange={(e) => setFormData({ ...formData, statementOfPurpose: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                    />
                  </div>

                  {/* Server-side error banner */}
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

                  {/* Submit button: Buttons: 16px, Medium, sentence case */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#1a2805] hover:bg-[#06592b] disabled:opacity-60 disabled:cursor-not-allowed text-[#f3a310] font-medium text-[16px] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>{isSubmitting ? 'Submitting application…' : 'Submit application & generate credential'}</span>
                  </button>
                </form>
              ) : (
                /* Confirmation Screen */
                <div className="text-center py-6 space-y-6 animate-in fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-[#06592b] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-[#06592b] uppercase tracking-wider">
                      Application successfully submitted
                    </span>
                    <h3 className="text-[24px] font-bold text-[#1a2805] mt-1">
                      Welcome to EYGN, {formData.fullName}!
                    </h3>
                    <p className="text-[15px] text-[#1a2805] max-w-md mx-auto mt-2 leading-relaxed">
                      Your application has been registered in the global diaspora registry. The Executive Secretariat has issued your provisional verified credential below.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-left text-xs text-stone-700 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-[#1a2805]">
                      <Sparkles className="w-4 h-4 text-[#f3a310]" />
                      <span>Next operational steps:</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Check your email inbox for chapter orientation materials and community channels.</li>
                      <li>You are assigned to the <strong>{formData.city} / {formData.country}</strong> regional working desk.</li>
                      <li>Review the upcoming DEAIP academic cycles and Green Legacy planting drives.</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-[15px] text-[#06592b] hover:text-[#1a2805] font-medium underline cursor-pointer"
                  >
                    Edit application or register another member
                  </button>
                </div>
              )}
            </div>

            {/* Live Interactive Credential Card Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#06592b]">
                  Live credential generator
                </span>
                <h3 className="text-[20px] font-bold text-[#1a2805]">
                  Your EYGN digital pass
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Updates in real-time as you fill out the application form.
                </p>
              </div>

              <DigitalMembershipCard
                fullName={formData.fullName || 'Bethlehem Haile'}
                country={`${formData.city || 'Addis Ababa'}, ${formData.country || 'Ethiopia'}`}
                status={formData.status === 'diaspora' ? 'Diaspora Professional' : 'Homeland Youth Member'}
                profession={formData.profession || 'Technology & Innovation'}
                memberId={isSubmitted ? 'EYGN-2026-ETH-9831' : 'EYGN-2026-ETH-PROV'}
              />
            </div>

          </div>
        </section>
      )}

      {/* 4. INSTITUTIONAL PARTNER TAB */}
      {activeTab === 'partner' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#06592b] block">
                Bilateral framework
              </span>
              {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
                Institutional & University Partnership Inquiries
              </h2>
              <p className="text-[15px] text-stone-600 mt-1">
                For ministries, universities (domestic & international), NGOs, and multilateral agencies seeking a memorandum of understanding (MOU) with EYGN.
              </p>
            </div>

            {isPartnerSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#06592b] mx-auto" />
                <h3 className="text-[18px] font-bold text-[#1a2805]">
                  Institutional brief submitted
                </h3>
                <p className="text-[15px] text-stone-700 max-w-md mx-auto">
                  Thank you. The EYGN Head of Partnerships & Outreach (Mr. Yonas Anbiko) has received your institutional inquiry and will contact your representative within 2 business days.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPartnerSubmitted(false)}
                  className="text-xs text-[#06592b] font-medium underline cursor-pointer"
                >
                  Submit another partnership inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="partner-organizationName" className="block text-xs font-semibold text-stone-700 mb-1">Organization / Institution Name *</label>
                    <input
                      id="partner-organizationName"
                      type="text"
                      required
                      placeholder="e.g. Ministry of Innovation, AAU, UNEP"
                      value={partnerFormData.organizationName}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, organizationName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                    />
                  </div>
                  <div>
                    <label htmlFor="partner-representativeName" className="block text-xs font-semibold text-stone-700 mb-1">Representative Name & Title *</label>
                    <input
                      id="partner-representativeName"
                      type="text"
                      required
                      placeholder="e.g. Dr. Kassahun Taye, Director"
                      value={partnerFormData.representativeName}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, representativeName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="partner-email" className="block text-xs font-semibold text-stone-700 mb-1">Official Institutional Email *</label>
                    <input
                      id="partner-email"
                      type="email"
                      required
                      placeholder="partner@institution.gov.et"
                      value={partnerFormData.email}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                    />
                  </div>
                  <div>
                    <label htmlFor="partner-collaborationDomain" className="block text-xs font-semibold text-stone-700 mb-1">Collaboration Domain</label>
                    <select
                      id="partner-collaborationDomain"
                      value={partnerFormData.collaborationDomain}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, collaborationDomain: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] bg-white"
                    >
                      {collaborationDomainOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="partner-message" className="block text-xs font-semibold text-stone-700 mb-1">Partnership Intent & Scope *</label>
                  <textarea
                    id="partner-message"
                    rows={4}
                    required
                    placeholder="Describe proposed areas of joint collaboration..."
                    value={partnerFormData.message}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]"
                  />
                </div>

                {/* Server-side error banner */}
                {partnerSubmitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700 space-y-1">
                    <p>{partnerSubmitError}</p>
                    {partnerFieldErrors && (
                      <ul className="list-disc pl-4 space-y-0.5">
                        {Object.entries(partnerFieldErrors).map(([field, messages]) => (
                          <li key={field}>{messages[0]}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Buttons: 16px, Medium, sentence case */}
                <button
                  type="submit"
                  disabled={isPartnerSubmitting}
                  className="w-full py-3.5 px-4 bg-[#1a2805] hover:bg-[#06592b] disabled:opacity-60 disabled:cursor-not-allowed text-[#f3a310] font-medium text-[16px] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isPartnerSubmitting ? 'Submitting inquiry…' : 'Submit institutional partnership inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06592b]">
            Common queries
          </span>
          {/* H2: 24-28px, Bold, Dark Green (#06592b) */}
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#06592b]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-[16px] font-bold text-[#1a2805]">{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#06592b] shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-[15px] text-[#1a2805] leading-relaxed border-t border-stone-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
