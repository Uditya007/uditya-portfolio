import React, { useState, useRef } from 'react';
import { ArrowDown, ExternalLink, Sparkles, Smartphone, Terminal, Layers, Stethoscope, PhoneCall } from 'lucide-react';
import { Github, Linkedin, Instagram } from './SocialIcons';
import { audio } from './AudioEngine';

export default function PortraitHero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 12), y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between pt-6 pb-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto select-none overflow-hidden font-neue"
    >
      {/* Soft Ambient Spotlight Glow behind the center portrait */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] bg-radial from-white/20 via-white/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main 3-Column Stage: Left Text | Center Photo | Right Text */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
        {/* LEFT COLUMN (4 cols): Introduction & Massive Title */}
        <div className="lg:col-span-4 flex flex-col justify-center text-left space-y-4 z-10 order-2 lg:order-1">
          {/* Top kicker */}
          <div className="flex items-center gap-2 font-mono text-xs sm:text-[13px] tracking-wider text-white font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] led-blink"></span>
            <span>HI, I'M UDITYA</span>
          </div>

          {/* Massive Display Title in PP Neue Montreal */}
          <h1 className="text-4xl sm:text-6xl lg:text-[58px] font-black tracking-[-0.04em] text-white uppercase leading-[0.92] font-display">
            AI ENGINEER
            <span className="block text-xl sm:text-3xl lg:text-[30px] text-white/90 font-normal tracking-normal mt-2">
              & SAP SD SPECIALIST
            </span>
            <span className="block text-xs sm:text-sm lg:text-[15px] text-white/70 font-mono tracking-widest uppercase mt-2">
              EXPERT WEBSITES • MOBILE APPS
            </span>
          </h1>

          {/* Specialized Clinic & Enterprise Highlight */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#27c93f] pt-1">
            <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
            <span>UK 🇬🇧 & CANADA 🇨🇦 CLINIC AI VOICE & WHATSAPP</span>
          </div>

          <p className="text-xs sm:text-sm text-[#bbb] font-mono leading-relaxed max-w-sm pt-1">
            Engineering high-performance modern websites, cross-platform mobile apps (iOS & Android), 24/7 AI Voice receptionists & WhatsApp triage for clinics in London & Toronto, alongside enterprise SAP SD ERP workflows.
          </p>

          {/* Direct Phone / WhatsApp Pill */}
          <div className="pt-2">
            <a
              href="https://wa.me/917665941949"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playConfirm()}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25d366]/15 border border-[#25d366]/40 text-[#25d366] hover:bg-[#25d366] hover:text-white text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>+91 7665941949</span>
            </a>
          </div>

          {/* Bottom Left Scroll Indicator */}
          <div className="pt-6 hidden lg:flex items-center gap-2 text-xs font-mono text-[#888]">
            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            <a href="#whatsapp-simulator" className="hover:text-white transition-colors uppercase tracking-wider">
              SCROLL TO TEST CLINIC CALLS & WHATSAPP
            </a>
          </div>
        </div>

        {/* CENTER COLUMN (4 cols): Clean Portrait with Spotlight Vignette */}
        <div className="lg:col-span-4 flex justify-center items-center z-0 order-1 lg:order-2">
          <div 
            className="relative w-[280px] sm:w-[340px] md:w-[370px] aspect-[4/5.2] flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Soft Ambient Spotlight Glow */}
            <div className="absolute inset-0 rounded-full bg-radial from-white/25 via-white/5 to-transparent blur-3xl scale-120 pointer-events-none" />

            {/* Seamless Portrait Image */}
            <div 
              className="relative w-full h-full overflow-hidden rounded-[24px] shadow-2xl bg-[#090909] border border-white/20"
              style={{
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
            >
              <img
                src="/uditya.jpg"
                alt="Uditya Singh - AI Engineer & SAP SD"
                className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.02] hover:scale-[1.02] transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 pointer-events-none" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#121212]/95 text-white px-4 py-1 rounded-full text-[11px] font-mono tracking-wider shadow-xl border border-white/20 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
              <span>WEBSITES • APPS • AI • SAP SD // GLOBAL</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): Description & Action Pill Buttons */}
        <div className="lg:col-span-4 flex flex-col justify-center text-left lg:text-right space-y-4 z-10 order-3">
          <div className="text-[11px] sm:text-xs font-mono tracking-widest text-[#888] uppercase">
            EXPERT WEBSITES • MOBILE APPS • CLINIC AI
          </div>

          <p className="text-sm sm:text-base text-[#ccc] font-sans leading-relaxed">
            Available for hire. Building expert modern websites, 3D WebGL interfaces, cross-platform mobile apps for iOS & Android, 24/7 AI Voice phone receptionists for clinics in the UK and Canada, and enterprise SAP SD Order-to-Cash automation.
          </p>

          {/* Action Pill Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-start lg:justify-end gap-3 font-mono text-xs">
            <a
              href="#whatsapp-simulator"
              onClick={() => audio.playConfirm()}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#e0e0e0] text-black font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105 cursor-pointer flex items-center gap-1.5"
            >
              <span>Test Clinic & WA Bot</span>
            </a>

            <a
              href="https://wa.me/917665941949"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="px-6 py-3 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>WhatsApp Me</span>
            </a>
          </div>

          {/* Social Links Ribbon with Uditya's Exact Links */}
          <div className="pt-4 flex items-center justify-start lg:justify-end gap-2 text-xs">
            <a
              href="https://github.com/Uditya007"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="p-2 rounded-full border border-white/20 hover:border-white text-[#ccc] hover:text-white transition-all"
              title="GitHub: Uditya007"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/uditya-singh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="p-2 rounded-full border border-white/20 hover:border-[#0077b5] text-[#ccc] hover:text-[#0077b5] transition-all"
              title="LinkedIn: uditya-singh"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="p-2 rounded-full border border-white/20 hover:border-[#ee2a7b] text-[#ccc] hover:text-[#ee2a7b] transition-all"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/917665941949"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick(1200)}
              className="p-2 rounded-full border border-white/20 hover:border-[#25d366] text-[#ccc] hover:text-[#25d366] transition-all"
              title="WhatsApp: +91 7665941949"
            >
              <Smartphone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="lg:hidden flex justify-center pt-4 text-xs font-mono text-[#888]">
        <a href="#whatsapp-simulator" className="flex items-center gap-1.5 text-white">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>SCROLL DOWN TO TEST UK/CANADA CLINIC BOT & CALLS</span>
        </a>
      </div>
    </section>
  );
}
