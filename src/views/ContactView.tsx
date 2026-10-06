import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { FaqSection } from '../components/FaqSection';

export const ContactView: React.FC = () => {
  return (
    <div>
      <ContactSection />
      <FaqSection />
    </div>
  );
};
