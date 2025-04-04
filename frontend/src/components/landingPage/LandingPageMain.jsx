'use client';

import { Button } from '@/components/ui/button';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import FinalCTA from './FinalCTA';
import Sidebar from '../marginals/Sidebar';
import Footer from '../marginals/Footer';

const LandingPageMain = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-[60%] -right-40 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <main className="overflow-hidden md:pl-0">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FinalCTA/>
      </main>
    </div>
  );
};

export default LandingPageMain;
