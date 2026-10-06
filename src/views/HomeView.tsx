import React from 'react';
import { Hero } from '../components/Hero';
import { TrustCounters } from '../components/TrustCounters';
import { ClassCards } from '../components/ClassCards';
import { SubjectGrid } from '../components/SubjectGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { LearningProcess } from '../components/LearningProcess';
import { ParentSection } from '../components/ParentSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';

export const HomeView: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <TrustCounters />
      <ClassCards />
      <SubjectGrid />
      <WhyChooseUs />
      <LearningProcess />
      <ParentSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};
