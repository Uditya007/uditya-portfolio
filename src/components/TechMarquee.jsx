import React from 'react';
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Stethoscope, 
  Layers, 
  Bot, 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  ShieldCheck,
  Target,
  Mail
} from 'lucide-react';

const marqueeItems = [
  { icon: Target, label: 'LEADSCOUT AI ENGINE', tag: 'B2B INTENT & COLD OUTREACH' },
  { icon: Mail, label: 'CORPORATE EMAIL CRAWLER', tag: '/CONTACT & /ABOUT SUBPAGES' },
  { icon: Bot, label: 'AI CHATBOTS & RAG', tag: 'LANGGRAPH / MULTI-AGENT' },
  { icon: Stethoscope, label: 'CLINIC AI AGENTS', tag: 'UK 🇬🇧 & CANADA 🇨🇦' },
  { icon: Globe, label: 'WEBSITE DEVELOPMENT', tag: 'REACT 19 / NEXT.JS / 3D' },
  { icon: Smartphone, label: 'APP DEVELOPMENT', tag: 'iOS & ANDROID (REACT NATIVE)' },
  { icon: Layers, label: 'SAP SD ENTERPRISE ERP', tag: 'ORDER-TO-CASH (O2C)' },
  { icon: Smartphone, label: 'WHATSAPP CLOUD API', tag: '98% OPEN RATE FUNNELS' },
  { icon: Sparkles, label: '3D WEBGL & SHADERS', tag: '60 FPS LOCKED' },
  { icon: Cpu, label: 'FASTAPI & LLMOPS', tag: '<140ms FIRST TOKEN' },
  { icon: ShieldCheck, label: 'UK GDPR & NHS / PIPEDA', tag: 'VERIFIED COMPLIANT' },
  { icon: Code2, label: 'LIGHTHOUSE 99+', tag: 'SUB-SECOND TIME-TO-INTERACTIVE' },
];

export default function TechMarquee({ fireMode }) {
  // Duplicate for seamless infinite loop
  const duplicated = [...marqueeItems, ...marqueeItems];

  return (
    <div className={`relative w-full overflow-hidden py-3 sm:py-3.5 border-y transition-colors duration-500 select-none font-mono ${
      fireMode 
        ? 'bg-[#150602] border-[#ff4500]/50 text-[#ffe4d4] shadow-[0_0_25px_rgba(255,69,0,0.25)]' 
        : 'bg-[#0c0c0c] border-white/10 text-[#bbb]'
    }`}>
      {/* Left/Right Edge Gradient Fade Masks */}
      <div className={`absolute top-0 bottom-0 left-0 w-16 sm:w-28 z-10 pointer-events-none ${
        fireMode 
          ? 'bg-gradient-to-r from-[#0c0402] to-transparent' 
          : 'bg-gradient-to-r from-[#080808] to-transparent'
      }`} />
      <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-28 z-10 pointer-events-none ${
        fireMode 
          ? 'bg-gradient-to-l from-[#0c0402] to-transparent' 
          : 'bg-gradient-to-l from-[#080808] to-transparent'
      }`} />

      {/* Marquee Track */}
      <div className="flex w-max marquee-track hover:[animation-play-state:paused]">
        {duplicated.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`inline-flex items-center gap-2.5 px-4 sm:px-6 text-xs whitespace-nowrap transition-transform duration-200 hover:scale-105 cursor-default ${
                fireMode ? 'hover:text-[#ff9d66]' : 'hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${fireMode ? 'text-[#ff6622]' : 'text-white'}`} />
              <span className="font-bold text-white tracking-wide">{item.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                fireMode 
                  ? 'border-[#ff4500]/40 text-[#ffb380] bg-[#220703]' 
                  : 'border-white/15 text-[#888] bg-white/5'
              }`}>
                {item.tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
