import React, { useState } from 'react';
import { 
  Bot, 
  Smartphone, 
  Cpu, 
  Box, 
  Globe, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight,
  Code2,
  Stethoscope,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { audio } from './AudioEngine';

const disciplines = [
  {
    id: 'clinic-ai',
    title: 'Clinic AI: Voice & WhatsApp (UK & Canada)',
    badge: 'CORE_01',
    icon: Stethoscope,
    tagline: '24/7 AI Receptionists & WhatsApp Triage for UK & Canadian Clinics.',
    description:
      'Autonomous patient intake, call answering, and appointment scheduling tailored specifically for private practices, dental clinics, physiotherapy, and wellness centres across the UK (London, Manchester) and Canada (Toronto, Vancouver). Zero hold times, full EHR calendar integration, and reduction of no-shows by over 40%.',
    features: [
      'Autonomous Voice Call Receptionist with British & Canadian English accents',
      'Meta WhatsApp Business API automated booking, intake & reminder flows',
      'Strict UK GDPR, NHS Data Security & Canadian PIPEDA / PHIPA compliance',
      'Direct EHR & Practice Management sync (Jane App, Cliniko, EMIS, Accurx, Dentrix)',
    ],
    tech: ['Voice AI (Deepgram / ElevenLabs)', 'Twilio / Retell AI', 'WhatsApp Cloud API', 'Jane App EHR', 'Cliniko', 'FastAPI'],
  },
  {
    id: 'chatbots',
    title: 'Intelligent AI Chatbots & RAG',
    badge: 'CORE_02',
    icon: Bot,
    tagline: 'Autonomous conversational agents with contextual memory & enterprise RAG.',
    description:
      'Designing and deploying next-generation conversational AI agents. Leveraging Retrieval-Augmented Generation (RAG), tool-calling, multi-agent swarms, and safety guardrails across customer care, internal enterprise knowledge bases, and lead conversion.',
    features: [
      'Multi-Agent orchestration (LangGraph, CrewAI, AutoGen)',
      'Vector databases (Pinecone, Qdrant, ChromaDB) & semantic search',
      'Contextual long-term memory & conversational state machines',
      'Seamless human-in-the-loop fallback escalation triggers',
    ],
    tech: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'LangChain', 'LlamaIndex', 'FastAPI'],
  },
  {
    id: 'expert-web',
    title: 'Expert Website Development',
    badge: 'CORE_03',
    icon: Globe,
    tagline: 'High-performance modern websites, 3D WebGL experiences & SaaS portals.',
    description:
      'Architecting and building production-grade modern websites, responsive corporate portals, e-commerce platforms, and interactive 3D WebGL experiences. Focused on sub-second page loads, 99+ Google Lighthouse performance, bespoke animations, search engine optimization (SEO), and conversion-driven UI/UX design.',
    features: [
      'Modern Next.js, React, Vite & TypeScript architectures',
      '3D WebGL, Three.js shaders & buttery 60 FPS scroll animations',
      'Pixel-perfect Tailwind CSS responsive styling across all devices',
      'High Lighthouse scores (99+ Performance, Accessibility & SEO)',
    ],
    tech: ['React', 'Next.js', 'Three.js / WebGL', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Vercel'],
  },
  {
    id: 'app-dev',
    title: 'iOS & Android App Development',
    badge: 'CORE_04',
    icon: Smartphone,
    tagline: 'Cross-platform mobile applications for iOS & Android with native speed.',
    description:
      'Designing and developing end-to-end mobile applications for healthcare clinics, on-demand booking, commerce, and enterprise operations. Delivering smooth native experiences, offline-first data caching, instant push notifications, biometric authentication, and seamless App Store / Play Store releases.',
    features: [
      'Cross-platform development using React Native & Expo',
      'Real-time push notifications & background synchronization',
      'Native camera, GPS, biometric security & payment gateways',
      'Offline-first architecture with SQLite / MMKV local persistence',
    ],
    tech: ['React Native', 'Expo', 'iOS (Swift UI)', 'Android (Kotlin)', 'Firebase', 'REST / GraphQL', 'App Store & Google Play'],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Automation Funnels',
    badge: 'CORE_05',
    icon: Smartphone,
    tagline: 'End-to-end messaging funnels via Meta WhatsApp Cloud API.',
    description:
      'Transforming WhatsApp into an automated transactional powerhouse. From lead nurturing drips and interactive product catalogs to instant order dispatch and CRM webhook pipelines that operate 24/7 with 98% open rates.',
    features: [
      'Meta WhatsApp Business Cloud API & Webhook listeners',
      'Interactive messages: Quick-replies, dynamic lists & CTA buttons',
      'Automated drip sequences & cart-abandonment recovery',
      'CRM & Database synchronization (Postgres, MongoDB, Supabase, HubSpot)',
    ],
    tech: ['WhatsApp Cloud API', 'Node.js / Express', 'Webhooks', 'Redis Queue', 'PostgreSQL', 'Stripe'],
  },
  {
    id: 'sap-sd',
    title: 'SAP SD & Enterprise Integration',
    badge: 'CORE_06',
    icon: Layers,
    tagline: 'Order-to-Cash (O2C) mastery bridged with modern AI & API workflows.',
    description:
      'Uniting traditional enterprise SAP ERP with modern conversational AI frontends. Deep specialization in SAP SD (Sales & Distribution): Sales Orders (VA01), Deliveries (VL01N), Billing (VF01), Pricing determination, and automated BAPI/RFC bridge development.',
    features: [
      'SAP SD Order-to-Cash (O2C) lifecycle optimization',
      'Pricing condition techniques & partner determination logic',
      'AI-to-SAP bridge: Natural language order creation via WhatsApp',
      'OData, BAPI & REST integration with SAP S/4HANA & ECC',
    ],
    tech: ['SAP SD', 'SAP S/4HANA', 'BAPI / RFC', 'OData Services', 'Order-to-Cash', 'Pricing Architecture'],
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering & LLMOps',
    badge: 'CORE_07',
    icon: Cpu,
    tagline: 'Production-ready LLM pipelines, prompt engineering & fine-tuning.',
    description:
      'Bridging research models into high-availability production systems. Crafting deterministic prompt architectures, structured JSON schema outputs, function calling, evaluation benchmarks, and continuous latency/cost optimization.',
    features: [
      'Structured generation (Pydantic, Instructor, OpenAI Function Calling)',
      'Domain-specific dataset curation & LoRA fine-tuning',
      'Latency optimization, semantic caching & streaming responses',
      'Evaluation pipelines (Ragas, TruLens) & hallucination mitigation',
    ],
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Pydantic', 'Ollama', 'Docker', 'AWS / GCP'],
  },
];

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(disciplines[0].id);

  const current = disciplines.find((d) => d.id === activeTab) || disciplines[0];
  const IconComponent = current.icon;

  return (
    <section id="capabilities" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/20 dark:border-white/10 select-none font-neue">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 font-mono">
        <div>
          <span className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            01 // CAPABILITIES MATRIX
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 font-display uppercase tracking-tight">
            ENGINEERING DISCIPLINES
          </h2>
        </div>
        <div className="text-xs text-[#999] mt-3 md:mt-0 max-w-md">
          Specializing in Expert Modern Websites, Mobile Apps (iOS & Android), Clinic AI Receptionists (UK & Canada), and enterprise SAP SD architectures.
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mb-8 font-mono text-xs">
        {disciplines.map((item) => {
          const ItemIcon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                audio.playClick(1000 + disciplines.indexOf(item) * 100);
                setActiveTab(item.id);
              }}
              className={`p-2 sm:p-3 text-left border transition-all flex flex-col justify-between min-h-[75px] sm:min-h-[90px] cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-[#141414] text-[#bbb] border-white/15 hover:border-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-bold ${isActive ? 'text-black' : 'text-[#888]'}`}>
                  {item.badge}
                </span>
                <ItemIcon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-current'}`} />
              </div>
              <span className="font-bold text-xs uppercase leading-tight line-clamp-2">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Discipline Detailed Card */}
      <div className="bg-[#121212]/90 backdrop-blur-md border border-[#303030] p-4 sm:p-6 md:p-8 lg:p-10 relative crosshair-corner shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs mb-3 text-white">
                <span className="px-2 py-0.5 bg-white/10 border border-white/40 font-bold text-white">
                  {current.badge}
                </span>
                <span className="text-[#888]">DEPLOYED // UK 🇬🇧 • CANADA 🇨🇦 • INDIA 🇮🇳</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display mb-2">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base font-mono text-white/80 mb-4">
                "{current.tagline}"
              </p>
              <p className="text-sm sm:text-base text-[#ccc] leading-relaxed mb-6 font-normal">
                {current.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 mb-6 font-mono text-xs">
                {current.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[#ddd]">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick jump to demo */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 font-mono text-xs">
              <span className="text-[#888]">EXPLORE LIVE LAB:</span>
              <a
                href="#whatsapp-simulator"
                onClick={() => audio.playConfirm()}
                className="px-3 py-1.5 bg-white text-black font-bold flex items-center gap-1 hover:bg-[#e0e0e0]"
              >
                TEST CLINIC & WHATSAPP SIMULATOR <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Tech Stack & Telemetry Panel */}
          <div className="lg:col-span-5 bg-[#0e0e0e] border border-white/10 p-4 sm:p-5 font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-white" />
                PRODUCTION STACK
              </span>
              <span className="text-[10px] text-[#27c93f] font-bold">ACTIVE</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {current.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs border border-white/15 bg-white/5 text-[#eee]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Hardware Telemetry Specs */}
            <div className="border-t border-white/10 pt-4 space-y-2.5 text-[11px] text-[#999]">
              <div className="flex justify-between">
                <span>PATIENT WAIT TIME</span>
                <span className="text-[#27c93f] font-bold">0 Seconds (Instant Answer)</span>
              </div>
              <div className="flex justify-between">
                <span>HEALTH COMPLIANCE</span>
                <span className="text-white font-bold">UK GDPR • NHS • PIPEDA</span>
              </div>
              <div className="flex justify-between">
                <span>SIMULTANEOUS CALLS</span>
                <span className="text-white font-bold">Unlimited Concurrent</span>
              </div>
              <div className="flex justify-between">
                <span>TARGET GEOGRAPHY</span>
                <span className="text-white font-bold">UK 🇬🇧 & Canada 🇨🇦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
