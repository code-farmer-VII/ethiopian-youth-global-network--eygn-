import React, { useRef } from 'react';
import { ShieldCheck, Download, Share2, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface DigitalMembershipCardProps {
  fullName?: string;
  country?: string;
  status?: string;
  profession?: string;
  memberId?: string;
  issueDate?: string;
}

export const DigitalMembershipCard: React.FC<DigitalMembershipCardProps> = ({
  fullName = 'Dagmawi Tadesse',
  country = 'United States / Ethiopia',
  status = 'Diaspora Youth Professional',
  profession = 'Software Architect & Researcher',
  memberId = 'EYGN-2026-ETH-0842',
  issueDate = 'March 2026',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`EYGN Global Youth Member Verification: ${memberId} - ${fullName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Visual credential pass */}
      <div
        ref={cardRef}
        className="w-full max-w-md aspect-[1.586/1] bg-gradient-to-br from-[#1a2805] via-[#101b02] to-[#0a1101] text-white rounded-2xl p-6 shadow-2xl border border-[#f3a310]/40 relative overflow-hidden flex flex-col justify-between select-none"
      >
        {/* Background decorative watermark and security guilloche pattern */}
        <div className="absolute inset-0 bg-dark-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#f3a310]/15 rounded-full blur-2xl pointer-events-none" />
        
        {/* Top header row */}
        <div className="relative z-10 flex items-start justify-between border-b border-white/15 pb-3">
          <div className="flex items-center gap-2.5">
            {/* Tricolor geometric emblem */}
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-[#f3a310]/50 flex items-center justify-center shadow-inner">
              <span className="text-xs font-bold text-[#f3a310] tracking-tighter">EYGN</span>
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-[#f3a310] uppercase font-semibold block">
                Official Credential
              </span>
              <h4 className="text-xs font-bold tracking-tight text-white leading-tight">
                Ethiopian Youth Global Network
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f3a310]/15 border border-[#f3a310]/30 text-[#f3a310] text-[10px] font-medium">
            <ShieldCheck className="w-3 h-3 text-[#f3a310]" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 my-auto py-2">
          <span className="text-[10px] uppercase text-white/50 tracking-wider">Member Name</span>
          <h3 className="text-xl font-bold tracking-tight text-white truncate max-w-xs">
            {fullName || 'Youth Member'}
          </h3>
          <p className="text-xs text-[#f3a310] font-medium truncate mt-0.5">
            {status} · <span className="text-white/80">{profession || 'Member'}</span>
          </p>
          <p className="text-[11px] text-white/60 truncate mt-0.5">
            {country}
          </p>
        </div>

        {/* Bottom footer with ID & simulated barcode */}
        <div className="relative z-10 pt-3 border-t border-white/15 flex items-end justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-white/50 block">Credential ID</span>
            <span className="font-mono text-xs text-[#f3a310] tracking-wider font-semibold tabular-nums">
              {memberId}
            </span>
            <span className="text-[9px] text-white/40 block">Issued: {issueDate}</span>
          </div>

          {/* Stylized security micro-barcode */}
          <div className="flex flex-col items-end">
            <div className="flex gap-0.5 items-end h-5 opacity-70">
              {[3, 5, 2, 6, 4, 2, 7, 3, 5, 4, 8, 3, 2, 6, 4, 5, 3, 7, 2, 5].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h * 2.2}px`, width: i % 3 === 0 ? '2px' : '1.2px' }}
                  className="bg-white"
                />
              ))}
            </div>
            <span className="text-[8px] font-mono text-white/40 mt-0.5">MANY MINDS · ONE ETHIOPIA</span>
          </div>
        </div>
      </div>

      {/* Control affordance buttons */}
      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 text-[15px] font-medium text-[#1a2805] bg-white border border-stone-200 hover:bg-stone-50 py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-[#06592b]" /> : <Share2 className="w-4 h-4 text-[#06592b]" />}
          <span>{copied ? 'Copied to clipboard' : 'Share verification'}</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 text-[15px] font-medium text-[#f3a310] bg-[#1a2805] hover:bg-[#06592b] py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#f3a310]" />
          <span>Save digital pass</span>
        </button>
      </div>
    </div>
  );
};
