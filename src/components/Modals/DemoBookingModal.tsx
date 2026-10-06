import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, BookOpen } from 'lucide-react';
import { TargetClass, EducationalBoard } from '../../types';
import { sanitizeInputText, isValidPhoneNumber } from '../../utils/security';

export const DemoBookingModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, addEnquiry, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'Student' | 'Parent'>('Parent');
  const [mobileNumber, setMobileNumber] = useState('');
  const [targetClass, setTargetClass] = useState<TargetClass>('Class 10');
  const [board, setBoard] = useState<EducationalBoard>('CBSE');
  const [preferredBatch, setPreferredBatch] = useState<'Morning' | 'Evening' | 'Weekend'>('Evening');
  const [date, setDate] = useState('Tomorrow');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isDemoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInputText(fullName, 100);
    const cleanPhone = sanitizeInputText(mobileNumber, 20);

    if (cleanName.length < 2) {
      showToast('Please enter a valid full name', 'warning');
      return;
    }
    if (!isValidPhoneNumber(cleanPhone)) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }

    addEnquiry({
      fullName: cleanName,
      userType,
      mobileNumber: cleanPhone,
      class: targetClass,
      board,
      subjectInterest: 'All Core Subjects (Trial Class)',
      preferredBatch,
      message: `Demo Class Requested for ${sanitizeInputText(date, 30)} (${preferredBatch} Slot)`
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsDemoModalOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-blue-100 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            100% Free • No Obligation
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Book a Free Offline / Online Demo Class
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            Experience our concept-clarity teaching method & inspect faculty guidance.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 font-heading">
                Demo Seat Reserved!
              </h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. Our senior academic counsellor will call you shortly on <span className="font-semibold text-slate-900">{mobileNumber}</span> to confirm your classroom timing and provide study materials.
              </p>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-left text-xs text-blue-800 space-y-1">
                <div className="font-semibold text-blue-900">What happens next?</div>
                <div>• You will receive SMS & WhatsApp confirmation with location link.</div>
                <div>• Bring your school textbook or notebook for interactive live solving.</div>
                <div>• Complimentary printed formula handbook provided upon arrival.</div>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setUserType('Parent')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    userType === 'Parent'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  I am a Parent
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('Student')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    userType === 'Student'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  I am a Student
                </button>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {userType === 'Parent' ? 'Parent / Guardian Name *' : 'Student Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Patil"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Class and Board */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Class *
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={targetClass}
                      onChange={e => setTargetClass(e.target.value as TargetClass)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Board *
                  </label>
                  <select
                    value={board}
                    onChange={e => setBoard(e.target.value as EducationalBoard)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  >
                    <option value="CBSE">CBSE Board</option>
                    <option value="State Board">State Board</option>
                    <option value="ICSE">ICSE</option>
                  </select>
                </div>
              </div>

              {/* Batch & Day preference */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={preferredBatch}
                      onChange={e => setPreferredBatch(e.target.value as any)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    >
                      <option value="Morning">Morning (8:30 AM)</option>
                      <option value="Evening">Evening (5:00 PM)</option>
                      <option value="Weekend">Weekend Special</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Day
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    >
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="This Saturday">This Saturday</option>
                      <option value="This Sunday">This Sunday</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>Confirm Free Demo Class</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                🔒 We respect your privacy. No spam. Instant WhatsApp confirmation.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
