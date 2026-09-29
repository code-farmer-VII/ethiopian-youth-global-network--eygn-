import React, { useState } from 'react';
import { FAQS, MEMBERSHIP_BENEFITS } from '../data/eygnData';
import { MembershipFormData, PageType } from '../types';
import { DigitalMembershipCard } from '../components/DigitalMembershipCard';
import { CheckCircle2, ShieldCheck, Award, Sparkles, Send, HelpCircle, ChevronDown, ChevronUp, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, fadeInScale, staggerContainer, transitionSmooth, buttonHoverProps, cardHoverProps, viewportStandard } from '../utils/motion';


interface MembershipPageProps {
  onNavigate: (page: PageType) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'individual' | 'partner'>('individual');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPartnerSubmitted, setIsPartnerSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPartnerSubmitted(true);
  };

  return (
    <div className="space-y-16 lg:space-y-20 py-6">
      {/* 1. Header */}
      <motion.section 
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionSmooth}
      >
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#06592b]"
        >
          <span className="w-2 h-2 rounded-full bg-[#f3a310]" />
          <span>Membership recruitment & global registry</span>
        </motion.div>
        {/* H1: 32-40px, Bold, Primary Green (#1a2805) */}
        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-[#1a2805] tracking-tight leading-[1.16]"
        >
          Join the Ethiopian Youth Global Network
        </motion.h1>
        {/* Body: 16px, Regular, Dark color */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="text-[16px] text-[#1a2805] leading-relaxed max-w-2xl mx-auto"
        >
          Become a registered member of the premier non-partisan network uniting diaspora and homeland youth to lead global change and serve Ethiopia.
        </motion.p>

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
      </motion.section>

      {/* 2. MEMBERSHIP BENEFITS OVERVIEW */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f3a310]/40 transition-colors space-y-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#f3a310]/20 text-[#f3a310] flex items-center justify-center font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-[17px] font-bold text-white">{b.title}</h3>
                  <p className="text-[14px] text-stone-300 leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. INDIVIDUAL / PARTNER TABS WITH ANIMATION */}
      <AnimatePresence mode="wait">
        {activeTab === 'individual' && (
          <motion.section 
            key="tab-individual-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
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
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bethlehem Haile"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Email Address *
                        </label>
                        <input
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
                      <label className="block text-xs font-semibold text-stone-700 mb-2">
                        Membership Category *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
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
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Current Country of Residence *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. United States, Germany, Ethiopia"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          City / Metro Area *
                        </label>
                        <input
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
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Profession / Field of Study *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Software Engineer / Public Health"
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          University or Organization
                        </label>
                        <input
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
                      <label className="block text-xs font-semibold text-stone-700 mb-2">
                        Areas of National Service Interest (Select all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2">
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
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Brief Statement of Purpose / Desired Contribution *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="How would you like to contribute your skills or network to Ethiopia's development?"
                        value={formData.statementOfPurpose}
                        onChange={(e) => setFormData({ ...formData, statementOfPurpose: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#06592b] focus:outline-none"
                      />
                    </div>

                    {/* Submit button: Buttons: 16px, Medium, sentence case */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 px-6 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-5 h-5" />
                      <span>Submit application & generate credential</span>
                    </motion.button>
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
          </motion.section>
        )}

        {/* 4. INSTITUTIONAL PARTNER TAB */}
        {activeTab === 'partner' && (
          <motion.section 
            key="tab-partner-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-4 sm:px-6"
          >
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
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Organization / Institution Name *</label>
                      <input type="text" required placeholder="e.g. Ministry of Innovation, AAU, UNEP" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Representative Name & Title *</label>
                      <input type="text" required placeholder="e.g. Dr. Kassahun Taye, Director" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Official Institutional Email *</label>
                      <input type="email" required placeholder="partner@institution.gov.et" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Collaboration Domain</label>
                      <select className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] bg-white">
                        <option>DEAIP Academic & Research Co-design</option>
                        <option>Green Legacy Reforestation & COP Climate</option>
                        <option>Youth Leadership Academy Masterclasses</option>
                        <option>FinTech & Innovation Sandbox Incubation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Partnership Intent & Scope *</label>
                    <textarea rows={4} required placeholder="Describe proposed areas of joint collaboration..." className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b]" />
                  </div>

                  {/* Buttons: 16px, Medium, sentence case */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[16px] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit institutional partnership inquiry</span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <motion.section 
        className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionSmooth}
      >
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
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-[15px] text-[#1a2805] leading-relaxed border-t border-stone-100 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};
