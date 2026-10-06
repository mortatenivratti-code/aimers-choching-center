import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { sanitizeInputText } from '../../utils/security';

export const AskDoubtModal: React.FC = () => {
  const { isDoubtModalOpen, setIsDoubtModalOpen, selectedClass, showToast } = useApp();
  const [subject, setSubject] = useState('Mathematics');
  const [chapter, setChapter] = useState('Real Numbers');
  const [doubtText, setDoubtText] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isDoubtModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDoubt = sanitizeInputText(doubtText, 600);
    if (cleanDoubt.length < 5) {
      showToast('Please describe your question or doubt (at least 5 characters)', 'warning');
      return;
    }
    setDoubtText(cleanDoubt);
    setChapter(sanitizeInputText(chapter, 80));
    setStudentContact(sanitizeInputText(studentContact, 60));
    setIsSubmitted(true);
    showToast('Your doubt has been submitted to senior faculty!');
  };

  const handleClose = () => {
    setIsDoubtModalOpen(false);
    setIsSubmitted(false);
    setDoubtText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <HelpCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold font-heading text-lg">Ask a Doubt</h3>
              <p className="text-xs text-blue-100">Get step-by-step resolution from faculty</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Doubt Received!</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Our subject teacher will review your question for <strong>{subject}</strong> and respond via WhatsApp / portal within 30 minutes during active study hours (8 AM – 8 PM).
              </p>
              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex items-center justify-between text-xs bg-indigo-50 border border-indigo-100 p-2.5 rounded-xl text-indigo-900">
                <span>Active Target: <strong>{selectedClass}</strong></span>
                <span className="text-[11px] bg-indigo-200/60 px-2 py-0.5 rounded-md font-medium">Free 24/7 Support</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Social Science">Social Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Chapter</label>
                  <input
                    type="text"
                    placeholder="e.g. Quadratic Eqns"
                    value={chapter}
                    onChange={e => setChapter(e.target.value)}
                    className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Describe Your Question or Difficulty *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type the question or concept you are stuck on (e.g., 'How to find nature of roots when D < 0?')"
                  value={doubtText}
                  onChange={e => setDoubtText(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your WhatsApp No. or Student Name
                </label>
                <input
                  type="text"
                  placeholder="+91 98XXX XXXXX or Rahul"
                  value={studentContact}
                  onChange={e => setStudentContact(e.target.value)}
                  className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Doubt to Teacher</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
