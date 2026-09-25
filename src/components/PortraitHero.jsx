import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowDown, 
  Smartphone, 
  Layers, 
  Stethoscope, 
  Globe,
  Radio,
  Zap,
  Activity
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './SocialIcons';
import { audio } from './AudioEngine';

const ROLES = [
  'EXPERT WEBSITES • 3D WEBGL',
  'MOBILE APPS • iOS & ANDROID',
  'CLINIC AI VOICE (UK 🇬🇧 & CANADA 🇨🇦)',
  'SAP SD S/4HANA (ORDER-TO-CASH)',
  'AUTONOMOUS AGENTS & RAG',
];

export default function PortraitHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Typewriter cyber role switcher
  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Subtle 3D perspective tilt on the Node card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 8), y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between pt-6 sm:pt-10 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto select-none overflow-hidden font-neue"
    >
      {/* Soft Ambient Spotlight Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] lg:w-[800px] h-[350px] sm:h-[600px] lg:h-[800px] bg-radial from-white/10 via-white/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />

      {/* Main 2-Column Hero Stage */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-6">
        
        {/* LEFT COLUMN (7 cols): Identity, Massive Typography & Core Action */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4 sm:space-y-5 z-10">
          
          {/* Top Kicker Status Bar with Live Signal Wave */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-[13px] tracking-wider text-white font-bold uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] led-blink"></span>
            <span>HI, I'M UDITYA SINGH</span>
            <span className="text-[#888]">// BANGALORE LAB</span>
            
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#27c93f]/10 border border-[#27c93f]/30 font-mono text-[10px] text-[#27c93f] ml-auto sm:ml-0 rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-ping" />
              <span>AVAILABLE FOR HIRE</span>
            </div>
          </div>

          {/* Massive Display Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[58px] font-black tracking-[-0.04em] text-white uppercase leading-[0.95] font-display">
            AI ENGINEER
            <span className="block text-xl xs:text-2xl sm:text-3xl lg:text-[32px] text-white/90 font-normal tracking-normal mt-2">
              & SAP SD SPECIALIST
            </span>
            
            {/* Animated Cyber Typewriter Role Line */}
            <span className="block text-xs sm:text-sm lg:text-[15px] text-white/80 font-mono tracking-widest uppercase mt-2 h-6 flex items-center gap-1">
              <span className="text-white font-bold">{displayText}</span>
              <span className="inline-block w-2 h-4 bg-white animate-pulse" />
            </span>
          </h1>

          {/* Specialized Clinic & Enterprise Highlight Pill with Floating Motion */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#27c93f]/10 border border-[#27c93f]/40 text-[#27c93f] font-mono text-xs w-fit animate-float-slow shadow-[0_0_15px_rgba(39,201,63,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#27c93f] shrink-0 led-blink"></span>
            <span className="font-bold">UK 🇬🇧 & CANADA 🇨🇦 CLINIC AI VOICE & WHATSAPP</span>
          </div>

          <p className="text-xs sm:text-base text-[#ccc] font-sans leading-relaxed max-w-xl">
            Engineering high-performance modern websites, 3D WebGL interfaces, cross-platform mobile apps (iOS & Android), 24/7 AI Voice receptionists & WhatsApp patient desks for clinics in London & Toronto, alongside enterprise SAP SD Order-to-Cash automation.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs">
            <a
              href="#whatsapp-simulator"
              onClick={() => audio.playConfirm()}
              className="btn-tactile px-6 py-3 rounded-full bg-white hover:bg-[#e0e0e0] text-black font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105 cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <span>TEST CLINIC & WHATSAPP LAB</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/917665941949"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="px-6 py-3 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2 text-center shadow-[0_0_20px_rgba(37,211,102,0.3)]"
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              <span>WHATSAPP // +91 7665941949</span>
            </a>
          </div>

          {/* Bottom Left Scroll Hint */}
          <div className="pt-2 hidden lg:flex items-center gap-2 text-xs font-mono text-[#888]">
            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            <a href="#capabilities" className="hover:text-white transition-colors uppercase tracking-wider">
              EXPLORE CAPABILITIES MATRIX & LIVE REPOSITORIES
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): High-Tech Engineering Telemetry Card with 3D Depth & Radar */}
        <div className="lg:col-span-5 flex flex-col justify-center z-10">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="card-interactive bg-[#121212]/95 border border-white/20 p-6 sm:p-8 crosshair-corner shadow-2xl relative font-mono space-y-5 backdrop-blur-md"
          >
            {/* Console Header with Active Radar Scanner */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
              <div className="flex items-center gap-2">
                {/* Micro Radar Display */}
                <div className="relative w-4 h-4 rounded-full border border-white/40 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-transparent to-white/10" />
                  <div className="radar-sweep absolute inset-0 origin-center bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
                <span className="font-bold text-white uppercase tracking-wider">NODE_01 // CORE PROFILE</span>
              </div>
              <span className="text-[10px] text-[#27c93f] font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] led-blink" />
                STATUS: OPERATIONAL
              </span>
            </div>

            {/* Monogram Crest & Verified Title */}
            <div className="flex items-center gap-4 py-1">
              <div className="relative w-14 h-14 bg-white text-black font-black text-2xl flex items-center justify-center font-display shadow-lg shrink-0 group">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-white via-white/40 to-transparent blur-xs opacity-75 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">US</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase font-display leading-tight flex items-center gap-2">
                  UDITYA SINGH
                  <span className="text-[10px] font-mono text-[#888] font-normal">[ING-01]</span>
                </h3>
                <p className="text-xs text-[#aaa]">AI ARCHITECT • WEB & APP DEV • SAP SD</p>
                <p className="text-[11px] text-[#25d366] font-mono font-bold mt-0.5">WhatsApp / Phone: +91 7665941949</p>
              </div>
            </div>

            {/* Production Matrix with Live Frequency Wave for Voice */}
            <div className="space-y-2.5 text-xs border-t border-b border-white/10 py-4">
              <div className="flex justify-between items-center text-[#bbb] group/row hover:text-white transition-colors">
                <span className="text-[#888] flex items-center gap-1.5 group-hover/row:text-white transition-colors">
                  <Globe className="w-3.5 h-3.5 text-white" />
                  EXPERT WEBSITES
                </span>
                <span className="text-white font-bold">React 19 • Next.js • 3D WebGL</span>
              </div>

              <div className="flex justify-between items-center text-[#bbb] group/row hover:text-white transition-colors">
                <span className="text-[#888] flex items-center gap-1.5 group-hover/row:text-white transition-colors">
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                  MOBILE APPS
                </span>
                <span className="text-white font-bold">iOS & Android (React Native)</span>
              </div>

              {/* Clinic AI with Live Audio Visualizer Bars */}
              <div className="flex justify-between items-center text-[#bbb] group/row hover:text-white transition-colors">
                <span className="text-[#888] flex items-center gap-1.5 group-hover/row:text-white transition-colors">
                  <Stethoscope className="w-3.5 h-3.5 text-white" />
                  CLINIC AI VOICE
                </span>
                <div className="flex items-center gap-2">
                  {/* Dancing Waveform EQ Bars */}
                  <div className="flex items-center gap-0.5 h-3.5">
                    <span className="soundwave-bar w-0.5 bg-[#27c93f] rounded-full" style={{ animationDelay: '0ms' }} />
                    <span className="soundwave-bar w-0.5 bg-[#27c93f] rounded-full" style={{ animationDelay: '150ms' }} />
                    <span className="soundwave-bar w-0.5 bg-[#27c93f] rounded-full" style={{ animationDelay: '300ms' }} />
                    <span className="soundwave-bar w-0.5 bg-[#27c93f] rounded-full" style={{ animationDelay: '450ms' }} />
                  </div>
                  <span className="text-white font-bold">UK 🇬🇧 & CA 🇨🇦</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[#bbb] group/row hover:text-white transition-colors">
                <span className="text-[#888] flex items-center gap-1.5 group-hover/row:text-white transition-colors">
                  <Layers className="w-3.5 h-3.5 text-white" />
                  SAP ERP
                </span>
                <span className="text-white font-bold">SAP SD (Order-to-Cash)</span>
              </div>
            </div>

            {/* Telemetry Hardware Stats */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-[#999] pt-1">
              <div className="bg-[#181818] p-2.5 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 rounded-bl-full pointer-events-none" />
                <span className="block text-[10px] text-[#777]">AVERAGE HOLD TIME</span>
                <span className="text-white font-bold font-mono">0 SECONDS</span>
              </div>
              <div className="bg-[#181818] p-2.5 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#27c93f]/10 rounded-bl-full pointer-events-none" />
                <span className="block text-[10px] text-[#777]">UI FRAME RATE</span>
                <span className="text-[#27c93f] font-bold font-mono">60 FPS LOCKED</span>
              </div>
            </div>

            {/* Verified Channels Ribbon */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-[11px] text-[#888]">CHANNELS:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Uditya007"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audio.playClick(1200)}
                  className="p-2 rounded border border-white/20 hover:border-white text-[#ccc] hover:text-white transition-all cursor-pointer hover:scale-110"
                  title="GitHub: Uditya007"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/uditya-singh"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audio.playClick(1200)}
                  className="p-2 rounded border border-white/20 hover:border-[#0077b5] text-[#ccc] hover:text-[#0077b5] transition-all cursor-pointer hover:scale-110"
                  title="LinkedIn: uditya-singh"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audio.playClick(1200)}
                  className="p-2 rounded border border-white/20 hover:border-[#ee2a7b] text-[#ccc] hover:text-[#ee2a7b] transition-all cursor-pointer hover:scale-110"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/917665941949"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audio.playClick(1200)}
                  className="p-2 rounded border border-white/20 hover:border-[#25d366] text-[#ccc] hover:text-[#25d366] transition-all cursor-pointer hover:scale-110"
                  title="WhatsApp: +91 7665941949"
                >
                  <Smartphone className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile Scroll Indicator */}
      <div className="lg:hidden flex justify-center pt-2 pb-2 text-xs font-mono text-[#888]">
        <a href="#whatsapp-simulator" className="flex items-center gap-1.5 text-white">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>SCROLL TO TEST CLINIC SIMULATOR</span>
        </a>
      </div>
    </section>
  );
}
