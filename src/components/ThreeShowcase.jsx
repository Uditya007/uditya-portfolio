import React, { useState } from 'react';
import { 
  Box, 
  Globe, 
  Sparkles, 
  Zap, 
  Gauge, 
  Eye, 
  Layers, 
  Check, 
  Code2,
  Maximize2
} from 'lucide-react';
import { audio } from './AudioEngine';

export default function ThreeShowcase() {
  const [activeView, setActiveView] = useState('both'); // '3d', 'normal', 'both'

  return (
    <section id="three-showcase" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/20 dark:border-white/10 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#262626]/20 dark:border-white/10 font-mono">
        <div>
          <span className="text-xs text-[#ff611a] font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff611a] led-blink"></span>
            05 // DUAL WEB ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#121212] dark:text-white mt-1 font-display uppercase tracking-tight">
            3D SPATIAL × HIGH-PERF WEB
          </h2>
        </div>
        <div className="text-xs text-[#666] dark:text-[#999] mt-3 md:mt-0 max-w-md">
          Whether delivering cutting-edge WebGL 3D storytelling or sleek, lightning-fast web applications, every interface is engineered with precision.
        </div>
      </div>

      {/* Mode Filter Pills */}
      <div className="flex items-center gap-2 mb-8 font-mono text-xs">
        <span className="text-[#777] text-[11px] mr-2">DISPLAY FILTER:</span>
        <button
          onClick={() => {
            audio.playClick(1000);
            setActiveView('both');
          }}
          className={`px-3 py-1.5 border transition-all cursor-pointer ${
            activeView === 'both'
              ? 'bg-[#ff611a] text-white border-[#ff611a] font-bold'
              : 'border-[#262626]/30 dark:border-white/20 text-[#444] dark:text-[#aaa]'
          }`}
        >
          SIDE-BY-SIDE MATRIX
        </button>
        <button
          onClick={() => {
            audio.playClick(1100);
            setActiveView('3d');
          }}
          className={`px-3 py-1.5 border transition-all cursor-pointer ${
            activeView === '3d'
              ? 'bg-[#ff611a] text-white border-[#ff611a] font-bold'
              : 'border-[#262626]/30 dark:border-white/20 text-[#444] dark:text-[#aaa]'
          }`}
        >
          FOCUS: 3D EXPERIENCES
        </button>
        <button
          onClick={() => {
            audio.playClick(1200);
            setActiveView('normal');
          }}
          className={`px-3 py-1.5 border transition-all cursor-pointer ${
            activeView === 'normal'
              ? 'bg-[#ff611a] text-white border-[#ff611a] font-bold'
              : 'border-[#262626]/30 dark:border-white/20 text-[#444] dark:text-[#aaa]'
          }`}
        >
          FOCUS: MODERN WEB APPS
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch font-mono">
        {/* Card 1: 3D Spatial Experiences */}
        {(activeView === 'both' || activeView === '3d') && (
          <div className="bg-[#ebebeb]/90 dark:bg-[#161616]/90 border border-[#262626] dark:border-[#303030] p-6 sm:p-8 flex flex-col justify-between crosshair-corner">
            <div>
              <div className="flex items-center justify-between border-b border-[#262626]/20 dark:border-white/10 pb-3 mb-4 text-xs">
                <span className="flex items-center gap-2 font-bold text-[#121212] dark:text-white">
                  <Box className="w-4 h-4 text-[#ff611a]" />
                  IMMERSIVE 3D EXPERIENCES
                </span>
                <span className="px-2 py-0.5 bg-[#ff611a]/10 border border-[#ff611a] text-[#ff611a] text-[10px] font-bold">
                  WEBGL / THREE.JS
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-[#121212] dark:text-white mb-3">
                Spatial Storytelling & Kinetic Design
              </h3>

              <p className="text-xs sm:text-sm text-[#555] dark:text-[#aaa] leading-relaxed mb-6 font-sans">
                Crafting interactive 3D virtual stages, kinetic product configurators, and scroll-synchronized WebGL worlds that keep visitors engaged 4x longer than standard static sites.
              </p>

              {/* Technical features list */}
              <div className="space-y-2.5 text-xs text-[#333] dark:text-[#ccc] mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Scroll-linked camera choreography & dynamic lighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Custom GLSL vertex & fragment shaders (neon bloom, noise)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Optimized GLTF/GLB models with Draco compression & KTX2</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Integrated tactile Web Audio API sound feedback</span>
                </div>
              </div>
            </div>

            {/* Benchmark specs */}
            <div className="p-4 bg-[#121212] text-white border border-[#262626] space-y-2 text-[11px]">
              <div className="flex justify-between text-[#888]">
                <span>FRAME RATE</span>
                <span className="text-[#27c93f] font-bold">60 FPS Locked</span>
              </div>
              <div className="flex justify-between text-[#888]">
                <span>GPU MEMORY BUDGET</span>
                <span className="text-white font-bold">&lt; 35MB VRAM</span>
              </div>
              <div className="flex justify-between text-[#888]">
                <span>COMPATIBILITY</span>
                <span className="text-[#ff611a] font-bold">Desktop + iOS + Android</span>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Modern Web Architecture */}
        {(activeView === 'both' || activeView === 'normal') && (
          <div className="bg-[#ebebeb]/90 dark:bg-[#161616]/90 border border-[#262626] dark:border-[#303030] p-6 sm:p-8 flex flex-col justify-between crosshair-corner">
            <div>
              <div className="flex items-center justify-between border-b border-[#262626]/20 dark:border-white/10 pb-3 mb-4 text-xs">
                <span className="flex items-center gap-2 font-bold text-[#121212] dark:text-white">
                  <Globe className="w-4 h-4 text-[#ff611a]" />
                  HIGH-PERFORMANCE MODERN WEB
                </span>
                <span className="px-2 py-0.5 bg-black/10 dark:bg-white/10 border border-[#262626]/30 dark:border-white/20 text-[#121212] dark:text-white text-[10px] font-bold">
                  REACT / NEXT.JS / VITE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-[#121212] dark:text-white mb-3">
                Precision SaaS & Industrial Portals
              </h3>

              <p className="text-xs sm:text-sm text-[#555] dark:text-[#aaa] leading-relaxed mb-6 font-sans">
                Engineering clean, robust, conversion-focused websites and full-stack enterprise portals with instantaneous page loads, accessible UI systems, and bulletproof responsive layouts.
              </p>

              {/* Technical features list */}
              <div className="space-y-2.5 text-xs text-[#333] dark:text-[#ccc] mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Sub-second First Contentful Paint (FCP &lt; 0.6s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Modern Tailwind CSS & Midlife hardware-inspired design tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Enterprise API endpoints, webhook listeners & SSR caching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff611a]" />
                  <span>Strict WCAG 2.1 AA accessibility & SEO architecture</span>
                </div>
              </div>
            </div>

            {/* Benchmark specs */}
            <div className="p-4 bg-[#121212] text-white border border-[#262626] space-y-2 text-[11px]">
              <div className="flex justify-between text-[#888]">
                <span>LIGHTHOUSE PERFORMANCE</span>
                <span className="text-[#27c93f] font-bold">99 / 100 Score</span>
              </div>
              <div className="flex justify-between text-[#888]">
                <span>BUNDLE SIZE</span>
                <span className="text-white font-bold">&lt; 85KB Initial Payload</span>
              </div>
              <div className="flex justify-between text-[#888]">
                <span>TIME TO INTERACTIVE</span>
                <span className="text-[#ff611a] font-bold">&lt; 0.4s Instantaneous</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
