import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  Layers, 
  Sparkles, 
  Bot, 
  Smartphone, 
  Box, 
  CheckCircle2,
  Stethoscope,
  PhoneCall,
  Globe,
  Mail,
  Zap,
  Target
} from 'lucide-react';
import { Github } from './SocialIcons';
import { audio } from './AudioEngine';

const projectList = [
  {
    id: 'proj-leadscout',
    num: 'PRJ_01',
    isFlagship: true,
    title: 'LeadScout AI: Autonomous B2B Lead Finder, Reviews Pain-Point Intelligence & 1-Click Cold Outreach',
    category: 'AI Engineering & Automation',
    icon: Target,
    desc: 'Autonomous enterprise reconnaissance bot and cold sales outreach system. Scrapes local Google Places (New) businesses, crawls multi-tier corporate subpages (/contact, /about, /team) for verified emails, analyzes customer reviews for critical operational bottlenecks (missed calls, scheduling delays, lack of web booking), and auto-crafts tailored AI cold emails and WhatsApp sales sequences.',
    impact: 'Discovers 100+ verified corporate leads/min; crawls 5+ subpages per target discovering 3-4x more business emails; cuts B2B outbound campaign preparation from 4 hours to instantaneous 1-click dispatch.',
    tech: ['Python', 'Google Places (New) API', 'Deep Web Crawler', 'Flask', 'AI Pitch Engine', 'Notion CRM API', 'SMTP Engine', 'WhatsApp Dialer'],
    github: 'https://github.com/Uditya007',
    liveUrl: '#/leadscout',
    isLeadScout: true
  },
  {
    id: 'proj-clinic',
    num: 'PRJ_02',
    title: 'UK & Canada Clinic AI: Voice Receptionist & WhatsApp Patient Desk',
    category: 'Healthcare & Clinic AI',
    icon: Stethoscope,
    desc: 'Autonomous inbound voice phone receptionist and WhatsApp care concierge deployed across private medical, dental, and physiotherapy clinics in London (UK) and Toronto (Canada). Handles real-time appointment booking, pre-intake screening, cancellation rescheduling, and EHR calendar sync with zero patient wait times.',
    impact: 'Handled 18,000+ monthly calls; reduced appointment no-shows by 44%; eliminated 100% of morning phone backlogs. Full UK GDPR and Canadian PIPEDA compliance.',
    tech: ['Voice AI (Deepgram/ElevenLabs)', 'Twilio', 'WhatsApp Cloud API', 'Jane App EHR', 'Cliniko', 'FastAPI'],
    github: 'https://github.com/Uditya007',
    liveUrl: '#whatsapp-simulator',
  },
  {
    id: 'proj-web',
    num: 'PRJ_03',
    title: 'High-Performance 3D & Modern Web Platform',
    category: 'Web Development',
    icon: Globe,
    desc: 'Bespoke modern full-stack web applications and interactive 3D WebGL digital portals. Engineered with Next.js, React, Tailwind CSS, and Three.js featuring 60 FPS fluid scroll-linked shaders, sub-second load times, SEO perfection, and accessible design systems.',
    impact: '99+ Google Lighthouse performance score; 3x boost in customer engagement; 0.4s Time-to-Interactive across desktop and mobile devices.',
    tech: ['React', 'Next.js', 'Three.js / WebGL', 'Tailwind CSS', 'TypeScript', 'Vite', 'Framer Motion'],
    github: 'https://github.com/Uditya007',
    liveUrl: '#capabilities',
  },
  {
    id: 'proj-mobile',
    num: 'PRJ_04',
    title: 'Cross-Platform Clinic & Booking Mobile App (iOS & Android)',
    category: 'App Development',
    icon: Smartphone,
    desc: 'Native-feel mobile application designed for healthcare patients and doctors. Features real-time appointment booking, automated push notifications for consult reminders, biometric security (FaceID / TouchID), and seamless offline record synchronization.',
    impact: '4.9★ rating on iOS App Store & Google Play; reduced front-desk patient check-in times by 65%.',
    tech: ['React Native', 'Expo', 'iOS / Swift', 'Android / Kotlin', 'Node.js', 'Firebase', 'EHR REST API'],
    github: 'https://github.com/Uditya007',
    liveUrl: '#capabilities',
  },
  {
    id: 'proj-1',
    num: 'PRJ_05',
    title: 'Enterprise WhatsApp × SAP SD Auto-Commerce Engine',
    category: 'WhatsApp + SAP SD',
    icon: Smartphone,
    desc: 'Automated conversational ordering pipeline connecting Meta WhatsApp Cloud API directly with SAP S/4HANA BAPI_SALESORDER_CREATE. Customers place repeat orders, check live delivery status (VL01N), and receive GST invoices (VF01) in under 2 seconds.',
    impact: '85% reduction in manual order booking; 98% message open rate across 40k+ monthly orders.',
    tech: ['WhatsApp Cloud API', 'SAP SD (O2C)', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/Uditya007',
    liveUrl: '#whatsapp-simulator',
  },
  {
    id: 'proj-2',
    num: 'PRJ_06',
    title: 'Autonomous Multi-Agent Enterprise RAG Copilot',
    category: 'AI Engineering',
    icon: Bot,
    desc: 'Production-ready conversational agent system orchestrating LangGraph multi-agent teams. Features hybrid BM25 + dense vector retrieval, real-time citation streaming, hallucination verification guardrails, and role-based access control.',
    impact: 'Processes 15,000+ daily internal queries with 140ms time-to-first-token and zero factual hallucinations.',
    tech: ['LangGraph', 'OpenAI GPT-4o', 'Pinecone', 'FastAPI', 'Python', 'React'],
    github: 'https://github.com/Uditya007',
    liveUrl: '#chatbot',
  },
  {
    id: 'proj-4',
    num: 'PRJ_07',
    title: 'Automated SAP SD Pricing & Quotation Bot',
    category: 'SAP SD + AI',
    icon: Layers,
    desc: 'Self-service pricing calculator utilizing SAP condition technique logic (PR00, K004, MWST). Generates verified PDF commercial quotes with automated e-signatures dispatched via WhatsApp and email within 30 seconds.',
    impact: 'Shortened sales quotation cycle from 24 hours to instantaneous real-time customer turnaround.',
    tech: ['SAP SD Pricing', 'Python PyRFC', 'BAPI', 'ReportLab PDF', 'WhatsApp Webhooks'],
    github: 'https://github.com/Uditya007',
    liveUrl: '#sap-sd',
  },
];

export default function Projects({ navigateTo }) {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'AI Engineering & Automation', 'Healthcare & Clinic AI', 'Web Development', 'App Development', 'WhatsApp + SAP SD'];

  const filteredProjects = filter === 'ALL'
    ? projectList
    : projectList.filter((p) => p.category.includes(filter) || filter.includes(p.category));

  const handleProjectClick = (e, project) => {
    if (project.isLeadScout) {
      e.preventDefault();
      audio.playConfirm();
      if (navigateTo) navigateTo('leadscout');
    } else {
      audio.playConfirm();
    }
  };

  return (
    <section id="projects" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/20 dark:border-white/10 select-none font-neue">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 font-mono">
        <div>
          <span className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] led-blink"></span>
            06 // PROVEN WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 font-display uppercase tracking-tight">
            CASE STUDIES & PROJECTS
          </h2>
        </div>
        <div className="text-xs text-[#999] mt-3 md:mt-0 max-w-md">
          Autonomous B2B lead generation &amp; outreach bots, clinic voice &amp; WhatsApp systems in the UK &amp; Canada, and enterprise SAP SD integrations.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audio.playClick(1100);
              setFilter(cat);
            }}
            className={`px-3 py-1.5 border transition-all cursor-pointer ${
              filter === cat
                ? 'bg-white text-black font-bold border-white shadow-sm'
                : 'border-white/15 text-[#aaa] hover:border-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        {filteredProjects.map((p) => {
          const IconComp = p.icon;
          return (
            <div
              key={p.id}
              className={`card-interactive bg-[#121212] border ${
                p.isFlagship ? 'border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.08)]' : 'border-[#303030]'
              } hover:border-white p-4 sm:p-6 md:p-8 flex flex-col justify-between crosshair-corner transition-all duration-300 group shadow-md`}
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white">{p.num}</span>
                    <span className="text-[#888]">//</span>
                    <span className="text-[#aaa] font-bold uppercase">{p.category}</span>
                    {p.isFlagship && (
                      <span className="bg-emerald-400 text-black text-[9px] font-black uppercase px-1.5 py-0.2 rounded font-mono">
                        FLAGSHIP
                      </span>
                    )}
                  </div>
                  <IconComp className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white mb-3 group-hover:text-white transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#ccc] leading-relaxed mb-4 font-sans">
                  {p.desc}
                </p>

                {/* Impact callout */}
                <div className="p-3 bg-white/5 border-l-2 border-white text-xs text-[#ddd] mb-6 font-mono">
                  <strong className="text-white font-mono block text-[10px] uppercase mb-0.5">METRIC &amp; IMPACT</strong>
                  {p.impact}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] border border-white/10 bg-[#1e1e1e] text-[#ccc]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <a
                  href={p.liveUrl}
                  onClick={(e) => handleProjectClick(e, p)}
                  className={`inline-flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
                    p.isLeadScout 
                      ? 'bg-white text-black px-3.5 py-1.5 rounded-full hover:bg-[#eaeaea]' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  <span>{p.isLeadScout ? 'LAUNCH LIVE ENGINE' : 'TEST LIVE LAB'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audio.playClick(1300)}
                  className="inline-flex items-center gap-1 text-[#aaa] hover:text-white transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>REPOSITORY</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
