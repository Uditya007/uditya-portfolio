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
import FireCanvas from './components/FireCanvas';
import SpotlightCursor from './components/SpotlightCursor';
import TechMarquee from './components/TechMarquee';
import { audio } from './components/AudioEngine';
import { Flame } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('uditya_theme');
    if (saved) return saved === 'dark';
    return true; // Sleek monochrome Dark theme
  });

  const [fireMode, setFireMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Always enforce dark theme class on document element
    document.documentElement.classList.add('dark');
    localStorage.setItem('uditya_theme', 'dark');
  }, [isDark]);

  useEffect(() => {
    if (fireMode) {
      document.documentElement.classList.add('theme-fire');
    } else {
      document.documentElement.classList.remove('theme-fire');
    }
  }, [fireMode]);

  const handleToggleFire = () => {
    const next = !fireMode;
    setFireMode(next);
    if (next) {
      audio.playIgnite();
    } else {
      audio.playExtinguish();
    }
  };

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
    <div className={`relative min-h-screen overflow-x-hidden ${
      fireMode ? 'bg-[#0a0302] text-[#fff5ee]' : 'bg-[#080808] text-[#f5f5f5]'
    } bg-grid-tech transition-colors duration-500`}>
      {/* 60 FPS Procedural Burning Fire Canvas & Rising Embers */}
      <FireCanvas active={fireMode} />

      {/* Interactive Magnetic Fluid Cursor & Grid Illumination Spotlight */}
      <SpotlightCursor fireMode={fireMode} />

      {/* Precision Top Scroll Progress Line (White in normal, Molten Plasma in Fire Mode) */}
      <div 
        className={`fixed top-0 left-0 z-50 transition-all duration-75 ${
          fireMode
            ? 'h-[3px] bg-gradient-to-r from-[#ff1e00] via-[#ff6a00] to-[#ffd000] shadow-[0_0_18px_#ff4500]'
            : 'h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]'
        }`}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Quick Fire Ignition Button */}
      <button
        onClick={handleToggleFire}
        title={fireMode ? "Extinguish Fire Theme (Return to Dark Stealth)" : "Ignite Burning Fire Theme"}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-3.5 rounded-full border shadow-2xl transition-all cursor-pointer flex items-center justify-center group ${
          fireMode
            ? 'bg-gradient-to-br from-[#ff1e00] via-[#ff5500] to-[#ffa600] text-black border-transparent shadow-[0_0_30px_rgba(255,85,0,0.95)] scale-110'
            : 'bg-[#150703]/90 backdrop-blur-md border-orange-500/40 text-[#ff6622] hover:border-orange-500 hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,100,0,0.6)]'
        }`}
      >
        <Flame className={`w-5 h-5 ${fireMode ? 'animate-bounce text-black' : 'text-[#ff5500] group-hover:animate-pulse'}`} />
      </button>

      {/* Main Content Flow */}
      <div className="relative z-10 flex flex-col">
        <Navbar 
          isDark={isDark} 
          setIsDark={setIsDark} 
          fireMode={fireMode} 
          setFireMode={setFireMode} 
        />
        
        <main className="flex-1">
          {/* 1. Hero: Dynamic cyber typewriter roles, live radar scanner & telemetry */}
          <PortraitHero />

          {/* Infinite Smooth Tech Telemetry Marquee Banner */}
          <TechMarquee fireMode={fireMode} />

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
