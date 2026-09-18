import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PortraitHero from './components/PortraitHero';
import Capabilities from './components/Capabilities';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import ChatbotTerminal from './components/ChatbotTerminal';
import SapSdBridge from './components/SapSdBridge';
import Projects from './components/Projects';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('uditya_theme');
    if (saved) return saved === 'dark';
    return true; // Sleek monochrome Dark theme
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Always enforce dark theme class on document element
    document.documentElement.classList.add('dark');
    localStorage.setItem('uditya_theme', 'dark');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f5f5f5] bg-grid-tech selection:bg-white selection:text-black transition-colors duration-200">
      {/* Precision Top Scroll Progress Line in Crisp White */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Content Flow */}
      <div className="relative z-10 flex flex-col">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        
        <main className="flex-1">
          {/* 1. Portrait Hero: Clean Centered Portrait, No 3D models, matching user laptop screenshot */}
          <PortraitHero />

          {/* 2. Engineering Disciplines & Capabilities */}
          <Capabilities />

          {/* 3. Live Interactive WhatsApp Automation Simulator */}
          <WhatsAppSimulator />

          {/* 4. Autonomous AI Chatbot Terminal */}
          <ChatbotTerminal />

          {/* 5. SAP SD Order-to-Cash Pipeline Architecture */}
          <SapSdBridge />

          {/* 6. Proven Case Studies & Projects */}
          <Projects />

          {/* 7. Contact Desk & Social Hub */}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
