import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { confirmNewsletterSubscription, ApiRequestError } from '../lib/api';
import { SEO } from '../components/SEO';
import { NEWSLETTER_CONFIRM_ROUTE, ROUTES } from '../lib/routes';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export const NewsletterConfirmPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const email = searchParams.get('email') ?? '';
  const token = searchParams.get('token') ?? '';

  useEffect(() => {
    if (!email || !token) {
      setStatus('error');
      setErrorMessage('This confirmation link is missing its email or token.');
      return;
    }

    confirmNewsletterSubscription(email, token)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        if (err instanceof ApiRequestError && err.code === 'INVALID_CONFIRM_TOKEN') {
          setErrorMessage('This confirmation link is invalid or has expired. Try subscribing again.');
        } else if (err instanceof ApiRequestError && err.code === 'SUBSCRIBER_NOT_FOUND') {
          setErrorMessage("We couldn't find a subscription for this email.");
        } else {
          setErrorMessage('Something went wrong confirming your subscription. Please try again.');
        }
      });
  }, [email, token]);

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
      <SEO
        title="Confirm Newsletter Subscription"
        description="Confirm your subscription to the EYGN newsletter."
        path={NEWSLETTER_CONFIRM_ROUTE}
      />

      {status === 'loading' && (
        <>
          <Loader2 className="w-12 h-12 text-[#06592b] animate-spin mx-auto" />
          <h1 className="text-[22px] font-bold text-[#1a2805]">Confirming your subscription…</h1>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="w-16 h-16 rounded-2xl bg-[#1a2805] text-[#f3a310] flex items-center justify-center mx-auto border border-[#f3a310]/30 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-[26px] font-bold text-[#1a2805]">You're subscribed!</h1>
          <p className="text-[15px] text-stone-600 leading-relaxed">
            Thanks for confirming — you'll now receive quarterly diplomatic briefings, research calls,
            and chapter milestone reports at <span className="font-medium text-[#1a2805]">{email}</span>.
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-[26px] font-bold text-[#1a2805]">Confirmation failed</h1>
          <p className="text-[15px] text-stone-600 leading-relaxed">{errorMessage}</p>
        </>
      )}

      <Link
        to={ROUTES.home}
        className="inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-medium text-[#1a2805] bg-[#f3a310] hover:bg-[#e09407] rounded-xl shadow-xs transition-colors"
      >
        Return home
      </Link>
    </div>
  );
};
