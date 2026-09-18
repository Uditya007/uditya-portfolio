import React from 'react';
import { 
  ArrowDownRight, 
  Terminal, 
  MessageSquareCode, 
  Layers, 
  Cpu, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Smartphone,
  Check,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './SocialIcons';
import { audio } from './AudioEngine';
import ThreeDPhotoCard from './ThreeDPhotoCard';

export default function Hero() {
  return (
    <section className="relative pt-6 pb-16 px-4 lg:px-8 max-w-7xl mx-auto select-none font-neue">
      {/* Top Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262626]/20 dark:border-white/10 pb-3 text-xs font-mono mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#ffffff] led-blink"></span>
          <span className="tracking-widest font-bold text-[#121212] dark:text-white">
            UDITYA SINGH // BANGALORE LAB
          </span>
          <span className="text-[#888] hidden sm:inline">| LAT: 12.9716° N, 77.5946° E</span>
        </div>

        <div className="flex items-center gap-4 text-[#666] dark:text-[#aaa]">
          <span className="bg-[#121212]/5 dark:bg-white/5 px-2 py-0.5 border border-[#262626]/10 dark:border-white/10 text-[11px]">
            AI ENGINEER & SAP SD SPECIALIST
          </span>
          <span className="text-[#ffffff] font-bold text-[11px]">STATUS: OPERATIONAL</span>
        </div>
      </div>

      {/* Massive Lowercase Midlife Display Title */}
      <div className="mb-8 relative text-center lg:text-left">
        {/* Floating Orange Dot / Bead */}
        <div className="absolute top-1 left-2 sm:left-4 z-20">
          <div 
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#ffffff] shadow-md flex items-center justify-center animate-pulse-slow cursor-pointer hover:scale-110 transition-transform"
            onClick={() => audio.playConfirm()}
            title="Interactive tactile bead"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
          </div>
        </div>

        <div className="flex items-baseline justify-between text-xs sm:text-sm text-[#555] dark:text-[#aaa] mb-2 px-1">
          <span className="font-medium text-[#121212] dark:text-white pl-12 sm:pl-16 font-mono text-xs">
            & autonomous intelligence
          </span>
          <span className="hidden md:inline text-right text-[11px] text-[#777] dark:text-[#888] font-mono">
            Crafted for scale, automated workflows, and enterprise harmony.
          </span>
        </div>

        {/* The Exact Midlife Lowercase Headline */}
        <h1 className="text-[13vw] sm:text-[11vw] lg:text-[128px] font-bold text-[#121212] dark:text-[#f2f2f2] font-midlife-display tracking-midlife lowercase leading-[0.88] select-none text-left pl-1">
          uditya singh
        </h1>
      </div>

      {/* 3-COLUMN MASTER SECTION: AI DETAILS (LEFT) | 3D PHOTO (CENTER) | SAP SD DETAILS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6">
        {/* LEFT COLUMN (3.5 cols): AI Engineering & Chatbots & WhatsApp */}
        <div className="lg:col-span-4 flex flex-col gap-4 font-mono text-xs order-2 lg:order-1">
          <div className="bg-[#ebebeb] dark:bg-[#161616] border border-[#262626]/30 dark:border-white/10 p-5 crosshair-corner shadow-md">
            <div className="flex items-center justify-between border-b border-[#262626]/20 dark:border-white/10 pb-2 mb-3">
              <span className="font-bold text-[#121212] dark:text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#ffffff]" />
                AI ENGINEERING
              </span>
              <span className="px-2 py-0.5 bg-[#ffffff]/10 border border-[#ffffff] text-[#ffffff] text-[10px] font-bold">
                AUTONOMOUS
              </span>
            </div>

            <p className="text-[#555] dark:text-[#aaa] font-sans text-xs leading-relaxed mb-3">
              Designing production LLM agent architectures, enterprise RAG, and automated conversational funnels:
            </p>

            <ul className="space-y-2 text-[11px] text-[#333] dark:text-[#ddd]">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>Multi-Agent Swarms:</strong> LangGraph, CrewAI orchestration with dynamic tool calling</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>Enterprise RAG:</strong> Vector retrieval (Pinecone, Qdrant) with citation guardrails</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>WhatsApp Cloud API:</strong> High-throughput webhook pipelines & automated drip sequences</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>3D & Modern Web:</strong> Three.js WebGL, 60 FPS performance, React full-stack</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-[#262626]/20 dark:border-white/10 flex justify-between text-[10px] text-[#777]">
              <span>RESPONSE LATENCY</span>
              <span className="text-[#27c93f] font-bold">&lt; 180ms TTFT</span>
            </div>
          </div>

          {/* Quick AI Metrics Badge */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 bg-white/70 dark:bg-[#181818] border border-[#262626]/20 dark:border-white/10">
              <span className="text-base font-bold text-[#ffffff] block">98%</span>
              <span className="text-[9px] text-[#777] uppercase">WA Open Rate</span>
            </div>
            <div className="p-2.5 bg-white/70 dark:bg-[#181818] border border-[#262626]/20 dark:border-white/10">
              <span className="text-base font-bold text-[#121212] dark:text-white block">60 FPS</span>
              <span className="text-[9px] text-[#777] uppercase">3D WebGL Speed</span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN (4.5 cols): 3D SPATIAL PHOTO CARD */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="w-full flex flex-col items-center">
            {/* Interactive 3D WebGL Photo Card */}
            <ThreeDPhotoCard />

            {/* Identity & Bangalore Telemetry */}
            <div className="mt-3 text-center font-mono">
              <div className="font-bold text-sm text-[#121212] dark:text-white uppercase tracking-tight">
                Uditya Singh
              </div>
              <div className="text-xs text-[#ffffff] font-bold mt-0.5">
                AI Engineer & SAP SD Specialist
              </div>
              <div className="text-[11px] text-[#666] dark:text-[#999] flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#ffffff]" /> Bangalore, Karnataka, India
              </div>
            </div>

            {/* Social Channels Ribbon */}
            <div className="flex items-center gap-2 mt-3 font-mono text-xs">
              <a
                href="https://github.com/Uditya007"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-2 border border-[#262626]/30 dark:border-white/20 hover:border-[#ffffff] text-[#121212] dark:text-white transition-colors"
                title="GitHub: Uditya007"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/uditya-singh"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-2 border border-[#262626]/30 dark:border-white/20 hover:border-[#0077b5] text-[#121212] dark:text-white transition-colors"
                title="LinkedIn: in/uditya-singh"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-2 bg-white/70 dark:bg-[#1c1c1c] border border-[#262626]/30 dark:border-white/15 hover:border-[#ee2a7b] text-[#121212] dark:text-white transition-all hover:-translate-y-0.5"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-2 bg-white/70 dark:bg-[#1c1c1c] border border-[#262626]/30 dark:border-white/15 hover:border-[#25d366] text-[#121212] dark:text-white transition-all hover:-translate-y-0.5"
                title="WhatsApp Direct"
              >
                <Smartphone className="w-4 h-4 text-[#25d366]" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (3.5 cols): SAP SD Enterprise Systems */}
        <div className="lg:col-span-4 flex flex-col gap-4 font-mono text-xs order-3">
          <div className="bg-[#ebebeb] dark:bg-[#161616] border border-[#262626]/30 dark:border-white/10 p-5 crosshair-corner shadow-md">
            <div className="flex items-center justify-between border-b border-[#262626]/20 dark:border-white/10 pb-2 mb-3">
              <span className="font-bold text-[#121212] dark:text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#ffffff]" />
                SAP SD ENTERPRISE
              </span>
              <span className="px-2 py-0.5 bg-black/10 dark:bg-white/10 border border-[#262626]/30 dark:border-white/20 text-[#121212] dark:text-white text-[10px] font-bold">
                O2C CORE
              </span>
            </div>

            <p className="text-[#555] dark:text-[#aaa] font-sans text-xs leading-relaxed mb-3">
              Full lifecycle Order-to-Cash (O2C) architecture bridged with conversational frontends:
            </p>

            <ul className="space-y-2 text-[11px] text-[#333] dark:text-[#ddd]">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>Order-to-Cash (O2C):</strong> Quotations, Sales Orders (VA01), Deliveries (VL01N), Billing (VF01)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>Pricing Procedure:</strong> Condition technique logic (PR00, K004, MWST, discounts)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>Automated BAPI/RFC:</strong> Programmatic BAPI_SALESORDER_CREATE triggered via webhooks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#ffffff] shrink-0 mt-0.5" />
                <span><strong>SAP S/4HANA & ECC:</strong> Master data synchronization & partner determinations</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-[#262626]/20 dark:border-white/10 flex justify-between text-[10px] text-[#777]">
              <span>ENTERPRISE BACKEND</span>
              <span className="text-[#ffffff] font-bold">S/4HANA & ECC</span>
            </div>
          </div>

          {/* Quick SAP Metrics Badge */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 bg-white/70 dark:bg-[#181818] border border-[#262626]/20 dark:border-white/10">
              <span className="text-base font-bold text-[#ffffff] block">VA01/VF01</span>
              <span className="text-[9px] text-[#777] uppercase">Full O2C Cycle</span>
            </div>
            <div className="p-2.5 bg-white/70 dark:bg-[#181818] border border-[#262626]/20 dark:border-white/10">
              <span className="text-base font-bold text-[#121212] dark:text-white block">100%</span>
              <span className="text-[9px] text-[#777] uppercase">BAPI Automated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
        <a
          href="#whatsapp-simulator"
          onClick={() => audio.playConfirm()}
          className="btn-tactile px-5 py-3 bg-[#ffffff] text-white font-bold flex items-center gap-2 border border-[#ffffff] hover:bg-[#e5520e] cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
          <span>TRY WHATSAPP SIMULATOR ↓</span>
        </a>

        <a
          href="#chatbot"
          onClick={() => audio.playClick(1200)}
          className="btn-tactile px-5 py-3 bg-[#121212] text-white dark:bg-white dark:text-[#121212] font-bold flex items-center gap-2 border border-[#121212] dark:border-white cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-[#ffffff]" />
          <span>LAUNCH AI CHATBOT TERMINAL ↓</span>
        </a>

        <a
          href="#sap-sd"
          onClick={() => audio.playClick(1000)}
          className="btn-tactile px-5 py-3 bg-transparent text-[#121212] dark:text-white font-bold flex items-center gap-2 border border-[#262626] dark:border-white/30 hover:border-[#ffffff] cursor-pointer"
        >
          <Layers className="w-4 h-4 text-[#ffffff]" />
          <span>EXPLORE SAP SD PIPELINE ↓</span>
        </a>
      </div>

      {/* Immediate Scroll Teaser Strip */}
      <div className="flex items-center justify-between pt-8 border-t border-[#262626]/20 dark:border-white/10 text-xs font-mono text-[#777] mt-8">
        <div className="flex items-center gap-2">
          <ArrowDownRight className="w-4 h-4 text-[#ffffff] animate-bounce" />
          <span className="font-bold text-[#121212] dark:text-white uppercase">
            SCROLL DOWN TO TEST LIVE WHATSAPP AUTOMATION & AI CHATBOT EXAMPLES
          </span>
        </div>
        <span className="hidden sm:inline text-[#ffffff]">INTEGRATED LAB BELOW</span>
      </div>
    </section>
  );
}
