import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TargetClass, EducationalBoard } from '../types';
import {
  sanitizeInputText,
  isValidPhoneNumber,
  isValidEmailAddress
} from '../utils/security';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  Navigation,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addEnquiry, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'Student' | 'Parent'>('Parent');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [targetClass, setTargetClass] = useState<TargetClass>('Class 10');
  const [board, setBoard] = useState<EducationalBoard>('CBSE');
  const [subjectInterest, setSubjectInterest] = useState('All Core Subjects');
  const [preferredBatch, setPreferredBatch] = useState<'Morning' | 'Evening' | 'Weekend' | 'Flexible'>('Evening');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInputText(fullName, 100);
    const cleanPhone = sanitizeInputText(mobileNumber, 20);
    const cleanEmail = sanitizeInputText(email, 160);
    const cleanSubject = sanitizeInputText(subjectInterest, 120);
    const cleanMessage = sanitizeInputText(message, 600);

    if (cleanName.length < 2) {
      showToast('Please enter a valid full name (at least 2 characters)', 'warning');
      return;
    }
    if (!isValidPhoneNumber(cleanPhone)) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    if (!isValidEmailAddress(cleanEmail)) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }

    addEnquiry({
      fullName: cleanName,
      userType,
      mobileNumber: cleanPhone,
      email: cleanEmail,
      class: targetClass,
      board,
      subjectInterest: cleanSubject || 'All Core Subjects',
      preferredBatch,
      message: cleanMessage
    });

    setIsSuccess(true);
    // reset
    setFullName('');
    setMobileNumber('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact-section" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            Admissions & Academic Counselling
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Schedule a free diagnostic academic session with our senior mentor or enquire about upcoming batches.
          </p>
        </div>

        {/* 2-Column Grid: Form + Contact Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            {isSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Counselling Request Registered!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Our academic director will review your child's profile and call you within 2 business hours. You can also visit our centre directly during open counselling hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    I am enquiring as:
                  </span>
                  <div className="flex bg-slate-200/80 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setUserType('Parent')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        userType === 'Parent' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Parent
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('Student')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        userType === 'Student' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Student
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Deshmukh"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Class *
                    </label>
                    <select
                      value={targetClass}
                      onChange={e => setTargetClass(e.target.value as TargetClass)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Board
                    </label>
                    <select
                      value={board}
                      onChange={e => setBoard(e.target.value as EducationalBoard)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="State Board">State Board</option>
                      <option value="ICSE">ICSE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Batch
                    </label>
                    <select
                      value={preferredBatch}
                      onChange={e => setPreferredBatch(e.target.value as any)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Evening">Evening (4:30 - 7:30 PM)</option>
                      <option value="Morning">Morning (7:00 - 9:30 AM)</option>
                      <option value="Weekend">Weekend Special</option>
                      <option value="Flexible">Flexible / Online</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject / Course of Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maths & Science or All Subjects"
                      value={subjectInterest}
                      onChange={e => setSubjectInterest(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message or Specific Query
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the student's current performance, target goals, or questions..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request a Free Counselling</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Contact Info, Quick Actions & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Actions Strip */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href="tel:+919763986833"
                className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl text-center transition flex flex-col items-center justify-center gap-1 group"
              >
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-900">Call Now</span>
              </a>

              <a
                href="https://wa.me/919763986833?text=Hello%20Aimers%20Coaching%20Class,%20I%20want%20to%20enquire%20about%20coaching%20classes%20for%20Classes%206-10"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl text-center transition flex flex-col items-center justify-center gap-1 group"
              >
                <div className="p-2 bg-green-600 text-white rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-green-900">WhatsApp Us</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=2W5X%2BP79%2C+Palam%2C+Maharashtra+431720"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl text-center transition flex flex-col items-center justify-center gap-1 group"
              >
                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                  <Navigation className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-blue-900">Get Directions</span>
              </a>
            </div>

            {/* Address & Contact Cards */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Aimers Coaching Class Address</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    2W5X+P79, Palam, Maharashtra 431720
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Phone & Helpline</h4>
                  <p className="text-xs text-slate-800 font-semibold mt-0.5 tabular-nums">
                    +91 97639 86833
                  </p>
                  <p className="text-[11px] text-slate-500">Mon–Sun: 8:00 AM – 8:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Email Enquiries</h4>
                  <p className="text-xs text-slate-800 font-semibold mt-0.5">
                    giriraj998@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Realistic Styled Google Maps Card */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 shadow-xs">
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs">
                <span className="font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Live Location Map
                </span>
                <span className="text-[10px] text-slate-400">Palam, Maharashtra 431720</span>
              </div>
              <div className="h-44 bg-slate-200 relative flex items-center justify-center text-center p-4">
                <div className="space-y-2 z-10">
                  <div className="w-9 h-9 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    Aimers Coaching Class
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    2W5X+P79, Palam, Maharashtra 431720
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2W5X%2BP79%2C+Palam%2C+Maharashtra+431720"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[11px] font-bold text-blue-700 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Background grid representation */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
