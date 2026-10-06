import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setIsDemoModalOpen } = useApp();

  const faculty = [
    {
      name: 'Prof. Anant Kulkarni',
      role: 'Head of Mathematics & Academic Director',
      experience: '18+ Years Experience • M.Sc. Mathematics, B.Ed',
      specialty: 'Board Exam Blueprints & NTSE Olympiad Trainer',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. Sunita Sharma',
      role: 'Senior Faculty - Science (Physics & Chemistry)',
      experience: '14+ Years Experience • Ph.D. Applied Sciences',
      specialty: 'Conceptual Ray Diagrams & Chemical Reactions Demystifier',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Prof. Rajesh Nair',
      role: 'Senior Faculty - English & Social Sciences',
      experience: '12+ Years Experience • M.A. English Literature',
      specialty: 'Board Paper Presentation & Answer Structuring Expert',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Our Mission & Heritage
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Nurturing Young Minds for Board & School Excellence
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Aimers Coaching Class (located at 2W5X+P79, Palam, Maharashtra 431720) was founded on a simple core conviction: every student from Class 6 to 10 has enormous intellectual potential when concepts are explained with patience and rigor.
          </p>
        </div>

        {/* Core Philosophy Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-black text-amber-400 font-heading">01. Strong Concepts</div>
            <p className="text-xs text-blue-100 leading-relaxed">
              We eradicate rote memorization. Students learn the "why" and "how" behind every formula before solving numericals.
            </p>
          </div>
          <div className="space-y-2 md:border-x md:border-white/10 px-4">
            <div className="text-2xl font-black text-emerald-400 font-heading">02. Smart Preparation</div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Targeted PYQs, time management drills, and crisp chapter-wise formula handbooks maximize exam score yield.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-black text-sky-400 font-heading">03. Better Results</div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Over 95% of our long-term students score Distinction in their final school and State/CBSE Board examinations.
            </p>
          </div>
        </div>

        {/* Senior Faculty Profiles */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Guided by Experienced Educators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our faculty members are subject-matter specialists with proven track records of creating state board and CBSE toppers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faculty.map((f, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition">
                <img
                  src={f.photo}
                  alt={f.name}
                  className="w-full h-56 object-cover object-top"
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 font-heading">{f.name}</h3>
                  <div className="text-xs font-bold text-blue-700">{f.role}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{f.experience}</div>
                  <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                    {f.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            Experience Our Teaching Methodology In-Person
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Book two complimentary classroom demo sessions for Classes 6, 7, 8, 9 or 10.
          </p>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Book Free Demo Class
          </button>
        </div>

      </div>
    </div>
  );
};
