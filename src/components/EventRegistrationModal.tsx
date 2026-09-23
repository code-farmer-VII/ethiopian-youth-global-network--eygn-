import React, { useState } from 'react';
import { EventItem } from '../types';
import { X, Calendar, Clock, MapPin, CheckCircle2, Ticket, ShieldCheck, Download, Share2 } from 'lucide-react';

interface EventRegistrationModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ event, onClose }) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    attendanceMode: 'In-Person',
    specialRequirements: '',
  });
  const [passId, setPassId] = useState('');

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `EYGN-EVT-${Math.floor(100000 + Math.random() * 900000)}`;
    setPassId(generatedId);
    setStep('confirmed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a2805] text-white p-6 rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-dark-pattern opacity-30 pointer-events-none" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-white/70 hover:text-white rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-semibold text-[#f3a310] uppercase tracking-wider block mb-1">
            Event Registration Portal
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white pr-6">
            {event.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 mt-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#f3a310]" />
              {event.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#f3a310]" />
              {event.time}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#f3a310]" />
              {event.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600">
                Reserve your delegate seat. You will receive an official pass and calendar invitation immediately.
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Bethlehem Haile"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Current City / Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Addis Ababa / London"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Attendance Mode
                  </label>
                  <select
                    value={formData.attendanceMode}
                    onChange={(e) => setFormData({ ...formData, attendanceMode: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] focus:border-transparent bg-white"
                  >
                    <option value="In-Person">In-Person Delegate</option>
                    <option value="Virtual">Virtual / Livestream Stream</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Institutional Affiliation / Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="University, NGO, Company, or Diaspora Hub"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#06592b] focus:border-transparent"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#1a2805] hover:bg-[#06592b] text-[#f3a310] font-medium text-[15px] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Confirm registration & issue pass</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#06592b] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-[20px] font-bold text-[#1a2805]">Registration confirmed</h4>
                <p className="text-[14px] text-stone-600 mt-1">
                  Thank you, <strong className="text-[#1a2805]">{formData.fullName}</strong>. Your delegate access has been reserved.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-[#1a2805] text-white p-4 rounded-xl border border-[#f3a310]/40 text-left relative overflow-hidden shadow-xs">
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <div>
                    <span className="text-[10px] text-[#f3a310] uppercase tracking-wider font-semibold">
                      EYGN Official Event Pass
                    </span>
                    <h5 className="text-sm font-bold text-white truncate max-w-[240px]">{event.title}</h5>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#f3a310] text-[#1a2805] font-bold">
                    CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div>
                    <span className="text-[10px] text-white/50 block">DELEGATE</span>
                    <span className="font-semibold text-white truncate block">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">PASS ID</span>
                    <span className="font-mono text-[#f3a310] font-bold">{passId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">DATE & TIME</span>
                    <span className="text-white/90">{event.date} · {event.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">LOCATION</span>
                    <span className="text-white/90 truncate block">{event.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                  <span>Present at accreditation desk</span>
                  <span className="font-mono text-[#f3a310]">SEC-VALIDATED</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 text-[14px] font-medium text-[#1a2805] bg-stone-100 hover:bg-stone-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Print pass</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-[14px] font-medium text-white bg-[#1a2805] hover:bg-[#06592b] rounded-xl transition-colors cursor-pointer"
                >
                  Close window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
