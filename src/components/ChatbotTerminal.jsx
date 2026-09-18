import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Sparkles, HelpCircle, Code, CornerDownLeft, Stethoscope } from 'lucide-react';
import { audio } from './AudioEngine';

const initialLogs = [
  {
    type: 'system',
    text: `UDITYA SINGH [EXPERT WEB • MOBILE APPS • AI SYSTEMS • SAP SD] v2.5.0\nBASE: Bangalore, India // SERVING: UK 🇬🇧 • Canada 🇨🇦 • Global\nType 'help' for available commands or ask questions regarding Websites, Mobile Apps, Clinic AI Receptionists, WhatsApp, or SAP SD.`,
  },
  {
    type: 'bot',
    text: `⚡ Hello! I am Uditya's AI assistant. Inquire about Expert Modern Websites, iOS & Android Mobile Apps, 24/7 Clinic Voice Call Receptionists & WhatsApp Bots (UK & Canada), or enterprise SAP SD workflows.`,
  },
];

export default function ChatbotTerminal() {
  const [logs, setLogs] = useState(initialLogs);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmd) => {
    const rawCmd = cmd.trim();
    if (!rawCmd) return;

    audio.playClick(1300);
    const cleanCmd = rawCmd.toLowerCase();

    const userEntry = { type: 'user', text: rawCmd };
    setLogs((prev) => [...prev, userEntry]);
    setHistory((prev) => [rawCmd, ...prev]);
    setHistoryIdx(-1);
    setInput('');

    setTimeout(() => {
      audio.playBlip(920);
      let reply = '';

      if (cleanCmd === 'help' || cleanCmd === '?') {
        reply = `AVAILABLE COMMANDS:\n  • web        : Expert Modern Websites, Next.js, React, 3D WebGL & 99+ Lighthouse speed\n  • apps       : Cross-Platform iOS & Android Mobile Apps (React Native & Expo)\n  • clinics    : 24/7 AI Voice Receptionists & WhatsApp Triage for UK 🇬🇧 & Canada 🇨🇦 Clinics\n  • skills     : View full Web, Mobile App, AI, WhatsApp & SAP SD technical capabilities\n  • sap-sd     : SAP SD Order-to-Cash (O2C) & enterprise ERP architecture\n  • whatsapp   : Meta Cloud API automation & patient care funnels\n  • contact    : Bangalore contact details & global consulting intake\n  • clear      : Wipe the console screen\n  • Or type any clinical triage, website, app, or enterprise question!`;
      } else if (cleanCmd === 'web' || cleanCmd.includes('website') || cleanCmd.includes('frontend')) {
        reply = `🌐 EXPERT MODERN WEBSITE DEVELOPMENT:\n  • Tech Stack      : React 18/19, Next.js (App Router), Three.js / WebGL, Tailwind CSS, TypeScript\n  • Performance     : 99+ Google Lighthouse score, sub-second LCP & TTFB, fully responsive\n  • Interactive 3D  : 60 FPS WebGL 3D scenes, smooth scroll-linked physics, custom shader pipelines\n  • Enterprise Ready: SEO semantic markup, full WCAG 2.1 accessibility, SSR / SSG deployment.`;
      } else if (cleanCmd === 'apps' || cleanCmd === 'app' || cleanCmd.includes('mobile') || cleanCmd.includes('android') || cleanCmd.includes('ios')) {
        reply = `📱 MOBILE APP DEVELOPMENT (iOS & ANDROID):\n  • Cross-Platform  : React Native & Expo for native 60fps performance on Apple iOS and Google Android\n  • Healthcare Apps : Patient portals, instant appointment booking, secure in-app telemedicine\n  • Enterprise Tech : Offline-first SQLite/WatermelonDB, push notification pipelines (APNs/FCM)\n  • Integrations    : Biometric auth (FaceID/Fingerprint), payment gateways (Stripe/Apple Pay), REST/GraphQL APIs.`;
      } else if (cleanCmd === 'clinics' || cleanCmd.includes('clinic') || cleanCmd.includes('doctor')) {
        reply = `🏥 CLINIC AI VOICE & WHATSAPP SUITE (UK & CANADA):\n  • 24/7 Inbound Phone Receptionists: Zero hold times, natural British & Canadian English speech\n  • Patient Scheduling: Real-time diary booking with Cliniko, Jane App, EMIS, Accurx, Dentrix\n  • Healthcare Compliance: Strict adherence to UK GDPR, NHS Data Security & Canadian PIPEDA / PHIPA\n  • Clinical Impact: 44% drop in appointment no-shows via automated WhatsApp reminder flows\n  • Locations Served: London, Manchester, Birmingham (UK) & Toronto, Vancouver, Calgary (Canada).`;
      } else if (cleanCmd === 'skills') {
        reply = `TECHNICAL MATRIX:\n  • Web Engineering : React, Next.js, Three.js/WebGL, Tailwind CSS, TypeScript, Vite\n  • Mobile App Dev  : React Native, Expo, iOS & Android deployment, Push notifications, SQLite\n  • Clinic AI Voice : Deepgram, ElevenLabs, Twilio / Retell AI, Jane App EHR, Cliniko API\n  • Conversational  : LangGraph, OpenAI GPT-4o, Claude 3.5, Gemini 1.5, Vector DBs (Pinecone, Qdrant)\n  • WhatsApp Auto   : Meta Cloud API, Webhook Ingress, Drip Sequences, Multi-channel sync\n  • SAP SD (ERP)    : Order-to-Cash (VA01, VL01N, VF01), Pricing Determination, BAPI/RFC\n  • Backend/Cloud   : Python, FastAPI, Node.js, PostgreSQL, Docker, AWS, Vercel`;
      } else if (cleanCmd === 'sap-sd') {
        reply = `SAP SD ARCHITECTURAL EXPERTISE:\n  • Order-to-Cash (O2C): Sales inquiries, Quotations, Sales Orders, Outbound Deliveries, Invoicing\n  • Pricing Architecture: Condition techniques, pricing procedures, access sequences\n  • Enterprise Bridge: Connecting conversational WhatsApp orders with SAP BAPI_SALESORDER_CREATEFROMDAT2\n  • Master Data: Customer master, material master, output determination (NACE).`;
      } else if (cleanCmd === 'whatsapp') {
        reply = `WHATSAPP AUTOMATION PIPELINE:\n  • Protocol: Meta WhatsApp Business Cloud API\n  • Capabilities: Real-time webhooks, patient reminders, dynamic button menus, product catalogs\n  • Integration: Automated ticket creation in Jira/Zendesk, EHR appointments in Jane App / Cliniko.`;
      } else if (cleanCmd === 'contact') {
        reply = `CONNECT WITH UDITYA SINGH:\n  • Base       : Bangalore, Karnataka, India\n  • Phone/WA   : +91 7665941949 (https://wa.me/917665941949)\n  • LinkedIn   : https://www.linkedin.com/in/uditya-singh\n  • GitHub     : https://github.com/Uditya007\n  • Email      : uditya.singh.engineer@gmail.com\n  • Deployments: UK 🇬🇧, Canada 🇨🇦, India 🇮🇳, Global Remote`;
      } else if (cleanCmd === 'clear') {
        setLogs(initialLogs);
        return;
      } else {
        if (cleanCmd.includes('uk') || cleanCmd.includes('canada')) {
          reply = `🇬🇧🇨🇦 Uditya specializes in deploying automated AI voice receptionists and WhatsApp triage bots for private medical, dental, and aesthetic clinics across the UK and Canada. Type 'clinics' for architecture specs.`;
        } else if (cleanCmd.includes('who') || cleanCmd.includes('about')) {
          reply = `Uditya Singh is an AI Engineer, Expert Website & Mobile App Developer, and SAP SD Specialist based in Bangalore. He creates modern web & mobile apps, builds 24/7 AI voice receptionists & WhatsApp chatbots for clinics in the UK and Canada, alongside enterprise SAP SD Order-to-Cash automation systems.`;
        } else {
          reply = `[AI Analysis]: Processed query "${rawCmd}". The system is fully equipped to deploy custom websites, mobile apps, clinical voice bots, WhatsApp patient funnels, and enterprise ERP architectures. Type 'help' to review specialized commands.`;
        }
      }

      setLogs((prev) => [...prev, { type: 'bot', text: reply }]);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="chatbot" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/20 dark:border-white/10 select-none font-neue">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 font-mono">
        <div>
          <span className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] led-blink"></span>
            03 // AUTONOMOUS AGENT CONSOLE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 font-display uppercase tracking-tight">
            AI CHATBOT TERMINAL
          </h2>
        </div>
        <div className="text-xs text-[#999] mt-3 md:mt-0 max-w-md">
          Execute system commands or converse in natural language to query Clinic AI Call Agents (UK & Canada), WhatsApp flows, and SAP SD specs.
        </div>
      </div>

      {/* Terminal Window Container */}
      <div className="bg-[#121212] border border-[#333] shadow-2xl overflow-hidden font-mono text-xs crosshair-corner">
        {/* Terminal Header Bar */}
        <div className="bg-[#1c1c1c] px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shrink-0"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shrink-0"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shrink-0"></div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-[11px] text-[#888] font-bold tracking-wider truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
              bash — uditya-ai@node:~$
            </span>
          </div>

          <button
            onClick={() => {
              audio.playClick(800);
              setLogs(initialLogs);
            }}
            className="text-[#888] hover:text-white text-[10px] flex items-center gap-1 cursor-pointer transition-colors shrink-0 ml-2"
            title="Clear terminal"
          >
            <Trash2 className="w-3 h-3" />
            <span>CLEAR</span>
          </button>
        </div>

        {/* Quick Command Action Pills */}
        <div className="bg-[#181818] px-3 sm:px-4 py-2 border-b border-[#262626] flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px]">
          <span className="text-[#666] text-[9px] sm:text-[10px] shrink-0">QUICK:</span>
          {['web', 'apps', 'clinics', 'skills', 'sap-sd', 'whatsapp', 'contact', 'help'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 sm:px-2.5 py-0.5 bg-[#242424] hover:bg-white text-[#ddd] hover:text-black border border-[#333] transition-colors cursor-pointer text-[10px] font-bold"
            >
              /{cmd}
            </button>
          ))}
        </div>

        {/* Console Log Area */}
        <div className="p-3 sm:p-6 h-[320px] sm:h-[400px] overflow-y-auto space-y-3 sm:space-y-3.5 text-[#ddd] font-mono leading-relaxed selection:bg-white selection:text-black text-[11px] sm:text-xs">
          {logs.map((log, i) => (
            <div key={i} className="space-y-1">
              {log.type === 'user' ? (
                <div className="flex items-center gap-2 text-white font-bold">
                  <span className="text-[#888]">visitor:~$</span>
                  <span className="font-bold">{log.text}</span>
                </div>
              ) : log.type === 'system' ? (
                <div className="text-[#aaa] whitespace-pre-line border-l-2 border-white pl-3 py-1 bg-white/[0.02]">
                  {log.text}
                </div>
              ) : (
                <div className="text-[#f0f0f0] whitespace-pre-line bg-[#181818] p-3 border border-[#2a2a2a] rounded-xs shadow-inner">
                  {log.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="bg-[#181818] border-t border-[#262626] px-4 py-3 flex items-center gap-3"
        >
          <span className="text-white font-bold shrink-0">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'web', 'apps', 'clinics', 'help', or any question..."
            className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-[#555]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-3 py-1 bg-white text-black hover:bg-[#e0e0e0] disabled:opacity-30 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>RUN</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </section>
  );
}
