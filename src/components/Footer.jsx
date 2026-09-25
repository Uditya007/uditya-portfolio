import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { Github, Linkedin, Instagram } from './SocialIcons';
import { audio } from './AudioEngine';

export default function Footer() {
  const scrollToTop = () => {
    audio.playClick(1600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#0d0d0d] py-12 px-4 lg:px-8 font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top bar with back to top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-bold text-xs">
              US
            </div>
            <div>
              <span className="font-bold text-white">UDITYA SINGH</span>
              <span className="block sm:inline text-[#888] text-[10px] sm:text-[11px] sm:ml-2">WEBSITE DEVELOPER • APP DEVELOPER • AI ENGINEER • SAP SD</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="px-3 py-1.5 border border-white/20 hover:border-white text-white flex items-center gap-1.5 text-[11px] cursor-pointer transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 text-white" />
            <span>RETURN TO APEX [TOP]</span>
          </button>
        </div>

        {/* Middle Spec Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-[11px] text-[#999]">
          <div>
            <div className="font-bold text-white uppercase mb-2">SYSTEM PROTOCOLS</div>
            <ul className="space-y-1">
              <li>• Expert Website Development (React 19 / Next.js)</li>
              <li>• Mobile App Development (iOS & Android)</li>
              <li>• Clinic AI Voice Receptionists (UK & Canada)</li>
              <li>• Meta WhatsApp Cloud API Funnels</li>
              <li>• SAP SD S/4HANA Order-to-Cash</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase mb-2">NETWORKS & CONTACT</div>
            <ul className="space-y-1.5">
              <li>
                <a href="https://wa.me/917665941949" target="_blank" rel="noopener noreferrer" className="hover:text-[#25d366] transition-colors flex items-center gap-1.5 text-[#25d366] font-bold">
                  <span>• WhatsApp: +91 7665941949</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/uditya-singh" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition-colors flex items-center gap-1.5">
                  <Linkedin className="w-3 h-3 text-[#0077b5]" /> LinkedIn: /in/uditya-singh
                </a>
              </li>
              <li>
                <a href="https://github.com/Uditya007" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Github className="w-3 h-3 text-white" /> GitHub: /Uditya007
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ee2a7b] transition-colors flex items-center gap-1.5">
                  <Instagram className="w-3 h-3 text-[#ee2a7b]" /> Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase mb-2">TELEMETRY</div>
            <ul className="space-y-1">
              <li>• Location: Bangalore, India</li>
              <li>• Lat/Long: 12.9716° N, 77.5946° E</li>
              <li>• Time Zone: Asia/Kolkata (IST)</li>
              <li>• Frame Budget: 60 FPS Locked</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase mb-2">DESIGN INFLUENCE</div>
            <p className="text-[10px] leading-relaxed text-[#777]">
              Engineered with industrial precision, tactile sound, and minimal hardware aesthetics inspired by midlife.engineering.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-[#262626]/10 dark:border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#888]">
          <div>
            © {new Date().getFullYear()} Uditya Singh. All rights reserved. Registered engineering node.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
            <span>NODE_01 BANGALORE // ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
