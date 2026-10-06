import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Download, Copy, LayoutTemplate, Palette, Check } from 'lucide-react';

interface TemplateConfig {
  id: string;
  name: string;
  category: 'Admission' | 'Announcement' | 'Result' | 'Social';
  aspect: '16:9' | '4:5' | '1:1';
  headline: string;
  subheadline: string;
  tagline: string;
  badge: string;
  bulletPoints: string[];
  cta: string;
}

const TEMPLATES: TemplateConfig[] = [
  {
    id: 'tpl-1',
    name: 'Admission Poster (Academic Year 2026–27)',
    category: 'Admission',
    aspect: '4:5',
    headline: 'Admissions Open for Classes 6 to 10',
    subheadline: 'State Board & CBSE Batches Starting 1st October',
    tagline: 'Strong Concepts. Smart Preparation. Better Results.',
    badge: 'Limited 25 Seats / Batch',
    bulletPoints: [
      'Daily 2 Hours Interactive Classroom Sessions',
      'Chapter-wise Printed Notes & Formula Booklets',
      'Weekly Mock Tests with Automated WhatsApp Reports',
      'Dedicated Doubt Clearing & Personal Mentorship'
    ],
    cta: 'Call for Free Counselling: +91 97639 86833'
  },
  {
    id: 'tpl-2',
    name: 'Free Demo Class Poster',
    category: 'Admission',
    aspect: '1:1',
    headline: 'Experience Aimers Coaching Class Teaching for Free',
    subheadline: 'Attend 2 Free Trial Classes with Senior Faculty',
    tagline: 'See the difference in concept clarity before enrolling',
    badge: '100% Free Trial',
    bulletPoints: [
      'Classes 6, 7, 8, 9 & 10',
      'Maths & Science Live Problem Solving',
      'Free Diagnostic Academic Assessment',
      'Complimentary Formula Handbook included'
    ],
    cta: 'Book Seat on WhatsApp: +91 97639 86833'
  },
  {
    id: 'tpl-3',
    name: 'Topper Celebration & Result Announcement',
    category: 'Result',
    aspect: '4:5',
    headline: 'Proud Moment! Aimers Coaching Class Stars Shine in 2026',
    subheadline: 'State Board & CBSE Board Examinations',
    tagline: 'Rahul Deshmukh (98.4%) • Ananya Sharma (97.2%) • Aditya (96.8%)',
    badge: '100/100 in Maths & Science',
    bulletPoints: [
      '95%+ Students Scored Distinction',
      '38 Students in the 90%+ Club',
      'Most Improved Student: 64% to 89.4%',
      'Congratulations to our hard-working students & faculty!'
    ],
    cta: 'Join the League of Toppers • New Batches Open'
  },
  {
    id: 'tpl-4',
    name: 'Class 10 Board Exam Crash Course',
    category: 'Announcement',
    aspect: '16:9',
    headline: 'Class 10 Board Booster: 90 Days Intensive Program',
    subheadline: '10 Full Syllabus Mock Papers + PYQ Solving from 2015–2025',
    tagline: 'Turn your board examination stress into rock-solid confidence',
    badge: 'Board Exam Special',
    bulletPoints: [
      'Daily 3-Hour Fast-track Revision',
      'Topper Answer Sheet Presentation Techniques',
      'Science Ray Diagrams & Chemical Reactions Mastery',
      '1-on-1 Weak Topic Diagnosis'
    ],
    cta: 'Enroll Now • Call +91 97639 86833'
  },
  {
    id: 'tpl-5',
    name: 'Parent Counselling & Diagnostic Test',
    category: 'Social',
    aspect: '1:1',
    headline: 'Is Your Child Ready for Board Examinations?',
    subheadline: 'Free 30-Minute One-on-One Parent & Student Counselling',
    tagline: 'Understand exact learning gaps and create a custom study schedule',
    badge: 'Parent Workshop',
    bulletPoints: [
      'Assessment of current school marks',
      'Screen time & focus management strategies',
      'Subject-wise action plan for Mathematics & Science',
      'No fear-based pressure • Only constructive solutions'
    ],
    cta: 'Book Slot with Academic Director this Weekend'
  }
];

export const MarketingKitModal: React.FC = () => {
  const { isMarketingKitModalOpen, setIsMarketingKitModalOpen, showToast } = useApp();
  const [selectedTpl, setSelectedTpl] = useState<TemplateConfig>(TEMPLATES[0]);
  const [copied, setCopied] = useState(false);

  // Editable fields inside the selected template
  const [headline, setHeadline] = useState(selectedTpl.headline);
  const [subheadline, setSubheadline] = useState(selectedTpl.subheadline);
  const [ctaText, setCtaText] = useState(selectedTpl.cta);

  if (!isMarketingKitModalOpen) return null;

  const handleSelectTemplate = (tpl: TemplateConfig) => {
    setSelectedTpl(tpl);
    setHeadline(tpl.headline);
    setSubheadline(tpl.subheadline);
    setCtaText(tpl.cta);
  };

  const handleCopyText = () => {
    const textToCopy = `📢 ${headline}\n${subheadline}\n\nKey Highlights:\n${selectedTpl.bulletPoints.map(b => `• ${b}`).join('\n')}\n\n👉 ${ctaText}\n\nAimers Coaching Class - 2W5X+P79, Palam, Maharashtra 431720`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      showToast('Marketing copy copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSimulation = () => {
    showToast(`Exporting ${selectedTpl.name} (High-Res Print & Social PNG)...`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading">Coaching Marketing & Canva Template Kit</h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded">
                  Print & Social Media Ready
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Customizable admission posters, test announcements & topper celebration banners.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMarketingKitModalOpen(false)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50">
          {/* Template Selector & Editor (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Choose Marketing Template
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {TEMPLATES.map(tpl => (
                  <button
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      selectedTpl.id === tpl.id
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{tpl.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {tpl.category} • {tpl.aspect} ratio
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-mono">
                      {tpl.aspect}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Live Text Customizer */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Palette className="w-3.5 h-3.5 text-blue-600" />
                Customize Poster Text
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Subheadline</label>
                <input
                  type="text"
                  value={subheadline}
                  onChange={e => setSubheadline(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contact CTA</label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={e => setCtaText(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyText}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Social Text'}</span>
              </button>
              <button
                onClick={handleDownloadSimulation}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Export Print Poster</span>
              </button>
            </div>
          </div>

          {/* Poster Live Canvas Preview (Right 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-blue-950 via-slate-900 to-indigo-950 text-white p-7 rounded-2xl shadow-2xl border-4 border-blue-500/30 relative overflow-hidden">
              {/* Background Accent Gradients */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Branding Top */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg font-heading shadow-md">
                    AC
                  </div>
                  <div>
                    <div className="text-sm font-black font-heading tracking-wide">AIMERS COACHING CLASS</div>
                    <div className="text-[10px] text-blue-300 font-semibold tracking-wider uppercase">
                      Palam, Maharashtra • Classes 6–10
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase tracking-wide shadow">
                  {selectedTpl.badge}
                </div>
              </div>

              {/* Main Poster Content */}
              <div className="relative z-10 space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-white/10 text-blue-200 text-[11px] font-semibold">
                  {selectedTpl.tagline}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading leading-tight text-white">
                  {headline}
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 font-medium">
                  {subheadline}
                </p>

                {/* Bullet Points Container */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 space-y-2">
                  {selectedTpl.bulletPoints.map((bp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-100">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Callout */}
                <div className="pt-2 text-center">
                  <div className="bg-amber-400 text-slate-900 py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg">
                    {ctaText}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2">
                    📍 2W5X+P79, Palam, Maharashtra 431720 • Classes 6, 7, 8, 9, 10 • CBSE & State Board
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 text-center">
              Preview matches standard Canva 1080×1350 (4:5) / 1080×1080 (1:1) high-conversion coaching social template.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
