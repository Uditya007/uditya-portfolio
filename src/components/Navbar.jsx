import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './SocialIcons';
import { audio } from './AudioEngine';

export default function Navbar({ isDark, setIsDark }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      audio.toggleAmbient(true);
      audio.playConfirm();
    } else {
      audio.toggleAmbient(false);
      audio.toggleMute();
    }
  };

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Expertise', href: '#capabilities' },
    { label: 'WhatsApp Bot', href: '#whatsapp-simulator' },
    { label: 'AI Terminal', href: '#chatbot' },
    { label: 'SAP SD', href: '#sap-sd' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/10 text-xs font-neue select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand Logo (e.g. uditya.) */}
        <a 
          href="#" 
          onClick={() => audio.playClick(1400)}
          className="flex items-center gap-1.5 group cursor-pointer"
        >
          <span className="font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-white/80 transition-colors font-display lowercase">
            uditya
          </span>
          <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] -mb-2"></span>
        </a>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => audio.playClick(1100)}
              className="text-[#999] hover:text-white transition-colors text-xs font-medium tracking-wide relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound therapy toggle */}
          <button
            onClick={handleToggleSound}
            title="Audio Synthesizer & Tactile Click (midlife style)"
            className={`px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-white text-black border-white'
                : 'border-white/15 text-[#aaa] hover:border-white'
            }`}
          >
            {soundEnabled ? (
              <span className="flex items-center gap-1 font-bold">
                <Volume2 className="w-3 h-3 animate-pulse" /> ON
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <VolumeX className="w-3 h-3" /> OFF
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              audio.playClick(1500);
              setIsDark(!isDark);
            }}
            className="p-1.5 rounded-full border border-white/15 hover:border-white transition-colors cursor-pointer text-[#eee]"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-white" /> : <Moon className="w-3.5 h-3.5 text-white" />}
          </button>

          {/* Direct Social Links (GitHub, LinkedIn, WhatsApp) */}
          <div className="hidden lg:flex items-center gap-1.5 border-l border-black/10 dark:border-white/10 pl-2">
            <a
              href="https://github.com/Uditya007"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="p-1.5 rounded-full border border-white/15 hover:border-white text-[#ccc] hover:text-white transition-colors"
              title="GitHub: Uditya007"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/uditya-singh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="p-1.5 rounded-full border border-white/15 hover:border-[#0077b5] text-[#ccc] hover:text-[#0077b5] transition-colors"
              title="LinkedIn: in/uditya-singh"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://wa.me/917665941949"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="p-1.5 rounded-full border border-[#25d366]/40 hover:border-[#25d366] text-[#25d366] transition-colors"
              title="WhatsApp: +91 7665941949"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Pill "Hire Me" Button */}
          <a
            href="#contact"
            onClick={() => audio.playConfirm()}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white text-black hover:bg-[#e0e0e0] font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            <span>Hire Me</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              audio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 rounded-full border border-white/15 text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d0d0d] px-6 py-4 flex flex-col gap-3 font-neue">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                audio.playClick();
                setMobileMenuOpen(false);
              }}
              className="py-2 border-b border-white/5 text-[#ccc] hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => {
              audio.playConfirm();
              setMobileMenuOpen(false);
            }}
            className="mt-2 py-2 text-center rounded-full bg-white text-black font-bold hover:bg-[#e0e0e0]"
          >
            Hire Me
          </a>
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/10">
            <a
              href="https://wa.me/917665941949"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25d366] font-bold text-xs"
            >
              <Smartphone className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/in/uditya-singh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#0077b5] font-bold text-xs"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href="https://github.com/Uditya007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white font-bold text-xs"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
