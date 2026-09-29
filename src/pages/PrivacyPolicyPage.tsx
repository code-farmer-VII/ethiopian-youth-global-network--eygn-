import React from 'react';
import { EYGN_INFO } from '../data/eygnData';
import { SEO } from '../components/SEO';
import { PRIVACY_ROUTE } from '../lib/routes';
import { ShieldCheck } from 'lucide-react';

const LAST_UPDATED = 'September 29, 2026';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <SEO
        title="Privacy Policy"
        description="How the Ethiopian Youth Global Network collects, uses, and protects the information you share through our forms."
        path={PRIVACY_ROUTE}
      />

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#1a2805] text-[#f3a310] flex items-center justify-center mx-auto border border-[#f3a310]/30 shadow-sm">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-[32px] sm:text-[36px] font-bold text-[#1a2805] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-stone-500">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Draft notice -- honest about what this is */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
        This policy describes, factually, what this website's forms actually collect and how that
        data is handled today. It has not been reviewed by counsel and should not be treated as a
        final, binding legal document until the Executive Secretariat has it reviewed before
        public launch.
      </div>

      <div className="space-y-8 text-[15px] text-[#1a2805] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">1. Who we are</h2>
          <p>
            This policy covers {EYGN_INFO.name} ("EYGN," "we," "us"), headquartered at{' '}
            {EYGN_INFO.headquarters}. For any privacy-related question or request, contact us at{' '}
            <a href={`mailto:${EYGN_INFO.officialEmails[0]?.email}`} className="text-[#06592b] font-medium underline">
              {EYGN_INFO.officialEmails[0]?.email}
            </a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">2. What we collect, and why</h2>
          <p>We only collect information you choose to submit through one of our forms:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Membership application</strong> (Membership page): full name, email, phone
              (optional), country, city (optional), profession, university/organization
              (optional), your selected areas of interest, and an optional statement of purpose.
              Used solely to review and process your application.
            </li>
            <li>
              <strong>Institutional partnership inquiry</strong> (Membership page, partner tab):
              organization name, representative name, email, collaboration domain, and your
              message. Used to respond to your inquiry.
            </li>
            <li>
              <strong>Contact form</strong> (Contact page): your name, email, subject, department,
              and message. Used to route and respond to your message.
            </li>
            <li>
              <strong>Event registration</strong> (event registration modal): full name and email.
              Used to confirm your seat and send event-related communication.
            </li>
            <li>
              <strong>Newsletter signup</strong> (footer): your email address only. Used to send a
              confirmation email and, once confirmed, periodic updates you can unsubscribe from at
              any time.
            </li>
          </ul>
          <p>We do not collect payment information, government identifiers, or location data.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">3. How we store it</h2>
          <p>
            Submitted information is stored in a database operated by EYGN's backend systems,
            accessible only to authorized EYGN administrators for the purpose of reviewing
            applications and inquiries.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">4. Who we share it with</h2>
          <p>
            We use a transactional email delivery service to send the confirmation and
            notification emails these forms trigger (for example, your newsletter double
            opt-in confirmation). That provider only receives what's needed to deliver that
            specific email. We do not sell your information, and we do not share it with anyone
            for advertising or marketing purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">5. Cookies & tracking</h2>
          <p>
            This site does not currently use cookies, browser storage, or any analytics/tracking
            technology. If that changes -- for example, if we add site analytics -- this policy
            will be updated first to describe what's added and why.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">6. Your choices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Newsletter:</strong> every email includes a one-click unsubscribe link
              specific to your address.
            </li>
            <li>
              <strong>Everything else:</strong> to access, correct, or request deletion of
              information you've submitted, email{' '}
              <a href={`mailto:${EYGN_INFO.officialEmails[0]?.email}`} className="text-[#06592b] font-medium underline">
                {EYGN_INFO.officialEmails[0]?.email}
              </a>{' '}
              and we'll act on your request.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">7. Retention</h2>
          <p>
            We keep submitted information for as long as it's needed for the purpose it was
            collected -- for example, membership applications for as long as you're an active
            member or applicant -- or as required by law, whichever is longer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">8. Who this is for</h2>
          <p>
            EYGN's programs are aimed at youth aged 18–35. We do not knowingly collect information
            from children.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[20px] font-bold text-[#06592b]">9. Changes to this policy</h2>
          <p>
            If this policy changes, we'll update the date at the top of this page. Continued use
            of this site after a change means you accept the updated policy.
          </p>
        </section>
      </div>
    </div>
  );
};
