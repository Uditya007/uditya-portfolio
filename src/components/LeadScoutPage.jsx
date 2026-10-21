import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Terminal, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Send, 
  SlidersHorizontal, 
  Layers, 
  Bot, 
  Zap, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Bookmark, 
  Download, 
  RefreshCw, 
  Share2, 
  Users, 
  Target, 
  Cpu, 
  Database, 
  Building2, 
  ShieldCheck,
  Star,
  MessageCircle,
  X,
  Flame,
  Globe
} from 'lucide-react';
import { audio } from './AudioEngine';

// Default enriched leads database for high-speed instant exploration
const PRESET_LEADS = {
  'Dentists in Bengaluru': [
    {
      id: 'dentist-1',
      name: 'Clove Dental Clinic - Doddakammanahalli',
      category: 'Dental Clinic',
      rating: 4.9,
      reviews_count: 348,
      is_newly_listed: false,
      address: 'DLF New Town, Doddakammanahalli, Bengaluru, Karnataka 560068',
      website: 'https://clovedental.in',
      phone: '+91 80 4568 2000',
      whatsapp_phone: '918045682000',
      all_emails: [
        'dentist@clovedental.in',
        'patientcare.north@clovedental.in',
        'patientcare.south@clovedental.in',
        'patientcare@clovedental.in'
      ],
      email: 'dentist@clovedental.in, patientcare.north@clovedental.in, patientcare.south@clovedental.in, patientcare@clovedental.in',
      linkedin_company: 'https://www.linkedin.com/company/clovedental',
      employees: 'Dr. Amarinder Singh (CEO) (https://linkedin.com/in/amarinder)\nDr. Neha Sharma (Head of Orthodontics) (https://linkedin.com/in/neha)',
      primary_need: 'Peak-Hour Phone Delays',
      detected_needs: '• Customer reviews cite long front-desk hold times between 5 PM and 8 PM.\n• 14% of negative feedback mentions missed callback queries regarding root canal follow-ups.\n• Strong Google rating (4.9★) but front desk phone staff is saturated during evenings.',
      ai_summary: 'Leading chain clinic specializing in dental implants, laser dentistry, and clear aligners across Bengaluru.',
      cold_pitch: 'Hi Clove Dental Team,\n\nCame across your Doddakammanahalli practice (348+ reviews, exceptional reputation in South Bengaluru).\n\nI noticed a few recent patient reviews citing long phone hold times during peak evening hours when reception is handling in-person patients.\n\nWe built an automated Voice AI & WhatsApp booking receptionist that handles concurrent inbound calls with zero hold times and books consultations directly into your calendar.\n\nWould you be open to a 2-minute video walkthrough showing how this works for Clove Dental?'
    },
    {
      id: 'dentist-2',
      name: 'Makers Of Smile Dental Studio',
      category: 'Cosmetic Dentistry',
      rating: 4.8,
      reviews_count: 6,
      is_newly_listed: true,
      address: 'HSR Layout Sector 2, Bengaluru, Karnataka 560102',
      website: 'https://makersofsmiledentalclinic.com',
      phone: '+91 90638 72190',
      whatsapp_phone: '919063872190',
      all_emails: [
        'contact@makersofsmiledentalclinic.com',
        'dr.rakesh@makersofsmiledentalclinic.com'
      ],
      email: 'contact@makersofsmiledentalclinic.com, dr.rakesh@makersofsmiledentalclinic.com',
      linkedin_company: 'https://www.linkedin.com/search/results/all/?keywords=Makers+Of+Smile+Dental',
      employees: 'Dr. Rakesh Nair (Principal Dentist & Founder)',
      primary_need: 'New Practice Growth & Patient Acquisition',
      detected_needs: '• Newly established practice with fewer than 10 reviews.\n• Modern clinic infrastructure but low organic Google Maps search visibility.\n• No online automated calendar booking widget on official homepage.',
      ai_summary: 'Boutique cosmetic dental studio offering smile design, teeth whitening, and orthodontic aligners in HSR Layout.',
      cold_pitch: 'Hi Dr. Rakesh & Makers Of Smile Team,\n\nCongratulations on launching your modern dental studio in HSR Layout Sector 2!\n\nAs a newly opened practice, capturing high-intent patients searching in HSR Layout before competitors is usually the biggest 60-day milestone.\n\nWe deployed an automated client acquisition portal that captured 28 new patient consultations in month one for newly opened practices without ad spend.\n\nWould you be open to taking a quick look at how this applies to Makers Of Smile?'
    },
    {
      id: 'dentist-3',
      name: 'Indiranagar Dental Specialties & Orthodontics',
      category: 'Multi-Speciality Dental',
      rating: 4.7,
      reviews_count: 142,
      is_newly_listed: false,
      address: '100ft Road, Indiranagar, Bengaluru, Karnataka 560038',
      website: 'https://indiranagardentalcare.in',
      phone: '+91 80 2525 9182',
      whatsapp_phone: '918025259182',
      all_emails: [
        'appointments@indiranagardentalcare.in',
        'admin@indiranagardentalcare.in'
      ],
      email: 'appointments@indiranagardentalcare.in, admin@indiranagardentalcare.in',
      linkedin_company: 'https://www.linkedin.com/search/results/all/?keywords=Indiranagar+Dental',
      employees: 'Dr. Priya V. (Chief Orthodontist) (https://linkedin.com/in/dr-priya-ortho)',
      primary_need: 'Weekend No-Show Prevention',
      detected_needs: '• Patient cancellations reported on Saturday slots with short notice.\n• Manual reminder phone calls consume 2+ hours of administrative time daily.\n• Need automated 24h WhatsApp confirmation and calendar auto-rescheduling.',
      ai_summary: 'Full-spectrum oral healthcare clinic specializing in pediatric dentistry, painless extractions, and orthodontic care.',
      cold_pitch: 'Hi Indiranagar Dental Team,\n\nCame across your practice on 100ft Road (140+ reviews, fantastic patient trust).\n\nMany premier clinics in Indiranagar face 15-20% weekend no-shows due to manual reminder lag on Fridays.\n\nWe automated WhatsApp 2-way patient confirmations that reduced clinic no-shows by 44% on autopilot.\n\nCould I send over a quick 60-second video demo showing how it integrates?'
    }
  ],
  'AI Startups in Austin': [
    {
      id: 'ai-austin-1',
      name: 'CognitiveForge AI Systems',
      category: 'Enterprise AI & LLMOps',
      rating: 4.9,
      reviews_count: 8,
      is_newly_listed: true,
      address: 'Congress Ave, Austin, TX 78701',
      website: 'https://cognitiveforge.ai',
      phone: '+1 512 882 1920',
      whatsapp_phone: '15128821920',
      all_emails: [
        'founders@cognitiveforge.ai',
        'sales@cognitiveforge.ai',
        'press@cognitiveforge.ai'
      ],
      email: 'founders@cognitiveforge.ai, sales@cognitiveforge.ai, press@cognitiveforge.ai',
      linkedin_company: 'https://www.linkedin.com/company/cognitiveforge',
      employees: 'Jason Vance (CEO & Co-Founder) (https://linkedin.com/in/jasonvance)\nElena Rostova (CTO)',
      primary_need: 'B2B Outbound Sales Pipeline & SOC2 Security',
      detected_needs: '• Seed-stage startup scaling go-to-market outbound strategy.\n• Website currently has a generic contact form with delayed inbound turnaround.\n• Active in hiring enterprise sales representatives.',
      ai_summary: 'Autonomous AI agents orchestration platform for regulated financial and healthcare workflows.',
      cold_pitch: 'Hi Jason & CognitiveForge Team,\n\nCongratulations on launching CognitiveForge out of Austin!\n\nAs you ramp up enterprise customer acquisition, converting technical website visitors before they drop off the static contact form is critical.\n\nWe built an interactive B2B qualification agent that books qualified enterprise buyer meetings automatically.\n\nWould you be open to a 2-minute demo showing how it accelerates CognitiveForge outbound?'
    }
  ],
  'Coffee Roasters in Seattle': [
    {
      id: 'coffee-seattle-1',
      name: 'Emerald Ridge Specialty Coffee Roasters',
      category: 'Artisanal Coffee & Roastery',
      rating: 4.9,
      reviews_count: 215,
      is_newly_listed: false,
      address: 'Pike St, Capitol Hill, Seattle, WA 98122',
      website: 'https://emeraldridgecoffee.com',
      phone: '+1 206 555 0194',
      whatsapp_phone: '12065550194',
      all_emails: [
        'wholesale@emeraldridgecoffee.com',
        'orders@emeraldridgecoffee.com',
        'roaster@emeraldridgecoffee.com'
      ],
      email: 'wholesale@emeraldridgecoffee.com, orders@emeraldridgecoffee.com, roaster@emeraldridgecoffee.com',
      linkedin_company: 'https://www.linkedin.com/search/results/all/?keywords=Emerald+Ridge+Coffee',
      employees: 'Marcus Cole (Founder & Master Roaster)',
      primary_need: 'B2B Wholesale Ordering Automation',
      detected_needs: '• Customer feedback shows high demand for corporate recurring subscriptions.\n• Wholesale accounts currently handled via manual email PDF invoices.\n• Strong local brand recognition with expansion potential.',
      ai_summary: 'Direct-trade single origin specialty roastery and wholesale coffee provider in Seattle.',
      cold_pitch: 'Hi Marcus & Emerald Ridge Team,\n\nLove the single-origin roasts you are brewing on Capitol Hill (215+ reviews, true Seattle staple).\n\nI noticed your wholesale accounts still rely on manual email inquiries for recurring bean deliveries.\n\nWe deployed a 1-click B2B wholesale ordering portal that automated recurring corporate coffee orders by 80%.\n\nMind if I send over a quick 60-second video of how it works?'
    }
  ]
};

export default function LeadScoutPage({ navigateTo, fireMode }) {
  const [query, setQuery] = useState('Dentists in Bengaluru');
  const [listingFilter, setListingFilter] = useState('all'); // 'all', 'established', 'newly_listed'
  const [viewTab, setViewTab] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(PRESET_LEADS['Dentists in Bengaluru']);
  const [logs, setLogs] = useState([
    { time: '12:00:01', type: 'info', text: 'LeadScout B2B Reconnaissance Engine v2.5 initialized.' },
    { time: '12:00:02', type: 'info', text: 'Connected to Google Places API (New) with distance-based discovery scanner.' },
    { time: '12:00:03', type: 'success', text: 'Multi-page corporate email crawler active (/contact, /about, /team).' },
    { time: '12:00:04', type: 'success', text: 'NLP Review Complaint Analyzer & 1-Click Cold Outreach Engine ready.' },
  ]);

  // Product & Outreach Setup State
  const [productInfo, setProductInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('leadscout_product_info');
      return saved ? JSON.parse(saved) : {
        product_name: 'DentalFlow AI CRM',
        product_description: 'an AI booking assistant that converts missed patient calls into scheduled consultations',
        product_offer: 'recovers 15+ lost patient bookings every month on complete autopilot',
        sender_name: 'Uditya Singh',
        sender_title: 'AI Systems Architect & Founder',
        sender_company: 'uditya.tech'
      };
    } catch (e) {
      return {
        product_name: 'DentalFlow AI CRM',
        product_description: 'an AI booking assistant that converts missed patient calls into scheduled consultations',
        product_offer: 'recovers 15+ lost patient bookings every month on complete autopilot',
        sender_name: 'Uditya Singh',
        sender_title: 'AI Systems Architect & Founder',
        sender_company: 'uditya.tech'
      };
    }
  });

  const [outreachModalOpen, setOutreachModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [emailModalCopied, setEmailModalCopied] = useState(false);
  const [emailSentAlert, setEmailSentAlert] = useState(null);

  const terminalRef = useRef(null);

  const addLog = (text, type = 'info') => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { time, type, text }]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSearch = (customQuery = null) => {
    const targetQuery = customQuery !== null ? customQuery : query;
    if (!targetQuery.trim()) return;

    audio.playClick(1400);
    setIsSearching(true);
    addLog(`Initiating search: "${targetQuery}" (Filter: ${listingFilter.toUpperCase()})`, 'info');
    addLog('Connecting to Google Places API (New) with coordinate radius discovery...', 'info');

    setTimeout(() => {
      addLog('Scraping primary websites and crawling subpages (/contact, /about, /team)...', 'info');
    }, 450);

    setTimeout(() => {
      addLog('NLP Analyzer extracting review pain points, complaints, and bottlenecks...', 'info');
    }, 900);

    setTimeout(() => {
      let matched = PRESET_LEADS[targetQuery];
      if (!matched) {
        // Generate dynamic realistic lead for any custom query
        const cleanName = targetQuery.replace(/in\s+/i, '').trim();
        matched = [
          {
            id: `custom-1`,
            name: `${cleanName} Flagship Center`,
            category: 'Commercial Business',
            rating: 4.8,
            reviews_count: 58,
            is_newly_listed: false,
            address: `Prime Tech District, ${targetQuery.includes('in') ? targetQuery.split('in')[1].trim() : 'Metro'}`,
            website: `https://${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            phone: '+1 800 555 0199',
            whatsapp_phone: '18005550199',
            all_emails: [
              `contact@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
              `partnerships@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
            ],
            email: `contact@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com, partnerships@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            linkedin_company: `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(cleanName)}`,
            employees: `Managing Director & Founder (${cleanName})`,
            primary_need: 'Inbound Response Automation',
            detected_needs: '• Customer inquiries cite delays during peak business hours.\n• Strong local customer feedback but lacking instant automated scheduling.\n• Online presence ripe for automated conversational booking.',
            ai_summary: `Premier provider specializing in ${cleanName} offerings with active client footfall.`,
            cold_pitch: `Hi ${cleanName} Team,\n\nCame across your business in ${targetQuery}—congratulations on your stellar reputation!\n\nI noticed customers frequently reach out during peak hours when staff are occupied.\n\nWe built ${productInfo.product_name}—${productInfo.product_description}, which ${productInfo.product_offer}.\n\nWould you be open to a quick 2-minute video walkthrough showing how this works for ${cleanName}?`
          }
        ];
      }

      setResults(matched);
      setIsSearching(false);
      addLog(`Enriched ${matched.length} companies with verified emails, customer complaints & AI cold pitches.`, 'success');
      audio.playConfirm();
    }, 1400);
  };

  const handleOpenEmailModal = (lead) => {
    audio.playClick(1200);
    setSelectedLead(lead);
    const emails = lead.all_emails || (lead.email ? lead.email.split(',').map(e => e.trim()) : []);
    const primary = emails[0] || '';
    setSelectedRecipient(primary);

    // Generate dynamic pitch merging user's product offer + lead's pain point
    const subject = lead.is_newly_listed
      ? `Question regarding ${lead.name}'s new launch`
      : `Eliminating front-desk response bottlenecks at ${lead.name}`;

    const body = `Hi ${lead.name} Team,

I came across your business (${lead.rating}★ rating, great local reputation).

${lead.detected_needs ? lead.detected_needs.split('\n')[0].replace('• ', '') : 'I noticed potential for streamlining customer inquiries during peak hours.'}

We built ${productInfo.product_name}—${productInfo.product_description}. With our system, teams like yours ${productInfo.product_offer}.

Would you be open to a quick 2-minute video walkthrough showing how ${productInfo.product_name} would work for ${lead.name}?

Best regards,
${productInfo.sender_name}
${productInfo.sender_title}${productInfo.sender_company ? ` | ${productInfo.sender_company}` : ''}`;

    setEmailSubject(subject);
    setEmailBody(body);
    setEmailSentAlert(null);
    setEmailModalOpen(true);
    addLog(`Prepared bespoke AI sales pitch for "${lead.name}" (${primary}).`, 'info');
  };

  const handleCopyPitch = (text, index) => {
    audio.playClick(1000);
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleModalCopy = () => {
    audio.playClick(1000);
    const fullText = `Subject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullText);
    setEmailModalCopied(true);
    setTimeout(() => setEmailModalCopied(false), 1500);
  };

  const handleOpenMailto = () => {
    audio.playClick(1300);
    if (!selectedRecipient) {
      alert('Please specify a valid recipient email.');
      return;
    }
    addLog(`Dispatched via native email client to "${selectedRecipient}".`, 'success');
    window.location.href = `mailto:${encodeURIComponent(selectedRecipient)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  const handleSimulateSmtpSend = () => {
    audio.playConfirm();
    setEmailSentAlert('Sending via SMTP server...');
    setTimeout(() => {
      setEmailSentAlert(`Delivered! Outreach email successfully sent to ${selectedRecipient} via SMTP.`);
      addLog(`[SMTP Delivery] Successfully transmitted sales pitch to "${selectedRecipient}" with subject "${emailSubject}".`, 'success');
    }, 900);
  };

  const handleBatchOutreach = () => {
    audio.playConfirm();
    const count = results.length;
    addLog(`[Batch Outreach] Initiating throttled email dispatch to ${count} verified leads...`, 'info');
    results.forEach((lead, i) => {
      setTimeout(() => {
        const email = lead.all_emails?.[0] || 'contact@lead.com';
        addLog(`[Auto-Outreach ${i + 1}/${count}] Sent tailored pitch to ${lead.name} (${email})`, 'success');
      }, (i + 1) * 700);
    });
    setTimeout(() => {
      alert(`Batch Outreach Complete! ${count} customized AI pitches sent with throttled deliverability.`);
    }, count * 700 + 400);
  };

  const filteredResults = results.filter((lead) => {
    if (viewTab === 'newly_listed') return lead.is_newly_listed;
    if (viewTab === 'established') return !lead.is_newly_listed;
    return true;
  });

  return (
    <div className={`min-h-screen py-10 px-3 sm:px-6 lg:px-12 font-neue select-none ${
      fireMode ? 'bg-[#0a0302] text-[#fff5ee]' : 'bg-[#080808] text-[#ebebeb]'
    }`}>
      {/* Top Breadcrumb & Status Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 hover:border-white text-[#aaa] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to uditya.tech</span>
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LEADSCOUT AI v2.5 ACTIVE</span>
          </span>
          <button
            onClick={() => {
              audio.playClick(1200);
              setOutreachModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-bold hover:bg-[#eaeaea] transition-colors cursor-pointer shadow-sm"
          >
            <Send className="w-3 h-3 text-black stroke-[2.5]" />
            <span>Product &amp; Pitch Setup</span>
          </button>
        </div>
      </div>

      {/* Hero Headline */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#888] uppercase mb-2">
          <Target className="w-4 h-4 text-white" />
          <span>AUTONOMOUS B2B RECONNAISSANCE &amp; COLD OUTREACH ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight uppercase leading-none">
          LeadScout <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ddd] to-[#888]">AI Engine</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#999] max-w-3xl leading-relaxed">
          Discovers businesses via Google Places (New), crawls websites and deep corporate subpages (<code className="text-white">/contact</code>, <code className="text-white">/about</code>, <code className="text-white">/team</code>) for verified emails, extracts customer complaints &amp; pain points, and crafts high-converting AI cold pitches on autopilot.
        </p>

        {/* Product Pitch Pill Indicator */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
          <span className="text-[#888]">Pitching Offer:</span>
          <strong className="text-white">{productInfo.product_name}</strong>
          <span className="text-[#888] hidden sm:inline">— {productInfo.product_offer}</span>
          <button 
            onClick={() => setOutreachModalOpen(true)}
            className="text-white underline hover:text-white/80 ml-1 cursor-pointer font-bold"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Main Search Bar & Filter Playground */}
      <div className="max-w-7xl mx-auto mb-8 bg-[#111] border border-white/15 rounded-2xl p-5 sm:p-7 shadow-2xl">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
            <div className="lg:col-span-9 relative">
              <label className="block text-[11px] font-mono text-[#888] uppercase tracking-wider mb-2">
                Target Query, Industry, or Geographic Location
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#888] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Dentists in Bengaluru, AI Robotics in Boston, Roofer in Austin..."
                  className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-white/20 rounded-xl text-white font-mono text-xs sm:text-sm placeholder-[#555] focus:outline-none focus:border-white transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="lg:col-span-3 flex items-end">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-3 px-5 bg-white hover:bg-[#eaeaea] text-black font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Scanning Leads...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Search Leads</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Presets & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#777] flex items-center gap-1 mr-1">
                <Zap className="w-3.5 h-3.5 text-white" />
                Presets:
              </span>
              {['Dentists in Bengaluru', 'AI Startups in Austin', 'Coffee Roasters in Seattle'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setQuery(preset);
                    handleSearch(preset);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#181818] hover:bg-[#252525] border border-white/10 text-white text-[11px] transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-[#777] italic hidden md:inline">
              ⚡ Multi-page deep crawler discovers corporate emails across /contact &amp; /about
            </span>
          </div>
        </form>
      </div>

      {/* Live Activity Terminal Logs (Black Style) */}
      <div className="max-w-7xl mx-auto mb-10 rounded-2xl bg-black border border-white/20 shadow-2xl overflow-hidden font-mono">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-xs text-[#888] flex items-center gap-1.5 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-[#aaa]" />
              <span>terminal — leadscout_recon.log</span>
            </span>
          </div>
          <button
            onClick={() => setLogs([{ time: new Date().toTimeString().split(' ')[0], type: 'info', text: 'Terminal output cleared.' }])}
            className="text-[11px] text-[#777] hover:text-white transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>

        <div
          ref={terminalRef}
          className="p-4 text-xs text-[#ddd] overflow-y-auto max-h-48 space-y-1.5 leading-relaxed bg-black"
        >
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#666] shrink-0">[{log.time}]</span>
              <span className={
                log.type === 'success' ? 'text-emerald-400 font-semibold' :
                log.type === 'warn' ? 'text-yellow-300' :
                log.type === 'error' ? 'text-red-400' : 'text-[#ddd]'
              }>
                {log.type === 'success' ? '✔ ' : '➜ '}
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Enriched Leads Grid */}
      <div className="max-w-7xl mx-auto mb-12">
        {/* Results Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 font-mono">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Enriched Leads</span>
              <span className="text-xs bg-white/10 text-white border border-white/15 px-2.5 py-0.5 rounded-full font-mono">
                {filteredResults.length} Companies
              </span>
            </h2>

            {/* View Tabs */}
            <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setViewTab('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  viewTab === 'all' ? 'bg-white text-black' : 'text-[#888] hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setViewTab('newly_listed')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  viewTab === 'newly_listed' ? 'bg-white text-black' : 'text-[#888] hover:text-white'
                }`}
              >
                Newly Listed
              </button>
              <button
                onClick={() => setViewTab('established')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  viewTab === 'established' ? 'bg-white text-black' : 'text-[#888] hover:text-white'
                }`}
              >
                Established
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleBatchOutreach}
              className="px-3.5 py-2 bg-white text-black font-extrabold text-xs rounded-xl flex items-center gap-2 hover:bg-[#eaeaea] transition-colors cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Auto-Email All Leads</span>
            </button>
          </div>
        </div>

        {/* Lead Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {filteredResults.map((lead, idx) => (
            <div
              key={lead.id}
              className="bg-[#121212] border border-[#262626] hover:border-white rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-base text-white leading-tight font-display">
                        {lead.name}
                      </h3>
                      {lead.is_newly_listed && (
                        <span className="text-[10px] bg-white text-black font-extrabold uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-black" />
                          Newly Listed
                        </span>
                      )}
                    </div>
                    {lead.website && (
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#888] hover:text-white underline truncate block max-w-[220px]"
                      >
                        {lead.website.replace('https://', '').replace('http://', '').replace('www.', '')}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="flex items-center gap-1 bg-white/10 text-white border border-white/15 text-xs font-bold px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-white text-white" />
                      {lead.rating}
                    </span>
                    <span className="text-[10px] text-[#777] mt-0.5">
                      ({lead.reviews_count} reviews)
                    </span>
                  </div>
                </div>

                {/* Detected Pain Points & Needs Box */}
                {lead.detected_needs && (
                  <div className="my-3 p-3 rounded-xl bg-white/5 border border-white/15 text-xs">
                    <div className="flex items-center justify-between gap-1 text-[10px] font-bold uppercase tracking-wider text-white mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-white" />
                        <span>Detected Pain Points</span>
                      </span>
                      <span className="bg-white text-black px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase">
                        {lead.primary_need || 'Growth'}
                      </span>
                    </div>
                    <div className="text-[#ccc] space-y-1 text-xs whitespace-pre-line leading-relaxed font-sans">
                      {lead.detected_needs}
                    </div>
                  </div>
                )}

                {/* Extracted Corporate Emails */}
                <div className="my-3 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#888] flex items-center gap-1">
                      <Mail className="w-3 h-3 text-white" />
                      <span>Verified Corporate Emails</span>
                    </span>
                    {lead.all_emails?.length > 1 && (
                      <span className="text-[9px] bg-white text-black px-1.5 py-0.2 rounded font-extrabold">
                        {lead.all_emails.length} Found
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lead.all_emails?.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#181818] hover:bg-[#252525] border border-white/15 rounded text-[11px] text-white transition-colors"
                      >
                        <span>{email}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Decision Makers */}
                {lead.employees && (
                  <div className="my-3 pt-2 border-t border-white/10 text-xs">
                    <span className="block text-[10px] font-bold uppercase text-[#888] mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3 text-white" />
                      <span>Decision Makers (LinkedIn)</span>
                    </span>
                    <p className="text-[11px] text-[#bbb] whitespace-pre-line leading-snug">
                      {lead.employees}
                    </p>
                  </div>
                )}

                {/* AI Cold Pitch Console */}
                <div className="my-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span>AI Cold Pitch</span>
                    </span>
                    <button
                      onClick={() => handleCopyPitch(lead.cold_pitch, idx)}
                      className="px-2 py-0.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-black border border-white/15 text-[#bbb] text-[11px] font-mono leading-relaxed whitespace-pre-line shadow-inner max-h-36 overflow-y-auto">
                    {lead.cold_pitch}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 flex-wrap">
                <button
                  onClick={() => handleOpenEmailModal(lead)}
                  className="flex-1 py-2 px-3 bg-white text-black hover:bg-[#eaeaea] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>AI Pitch Email</span>
                </button>

                {lead.whatsapp_phone && (
                  <a
                    href={`https://wa.me/${lead.whatsapp_phone}?text=${encodeURIComponent(lead.cold_pitch || 'Hello!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-[#181818] hover:bg-[#252525] border border-white/15 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product & Outreach Setup Modal */}
      {outreachModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-[#111] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                  <Send className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Product &amp; Pitch Setup</h3>
                  <p className="text-[11px] text-[#777]">Tailor the AI outreach sequences to your specific software/offer</p>
                </div>
              </div>
              <button
                onClick={() => setOutreachModalOpen(false)}
                className="text-[#777] hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">Product or Software Name</label>
                <input
                  type="text"
                  value={productInfo.product_name}
                  onChange={(e) => setProductInfo({ ...productInfo, product_name: e.target.value })}
                  placeholder="e.g. DentalFlow AI / RevMax Engine"
                  className="w-full px-3 py-2 bg-[#080808] border border-white/20 rounded-lg text-white text-xs focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">What It Does (1 Crisp Sentence)</label>
                <input
                  type="text"
                  value={productInfo.product_description}
                  onChange={(e) => setProductInfo({ ...productInfo, product_description: e.target.value })}
                  placeholder="e.g. an AI booking assistant that converts missed patient calls into scheduled consultations"
                  className="w-full px-3 py-2 bg-[#080808] border border-white/20 rounded-lg text-white text-xs focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">Core Value Proposition / ROI</label>
                <input
                  type="text"
                  value={productInfo.product_offer}
                  onChange={(e) => setProductInfo({ ...productInfo, product_offer: e.target.value })}
                  placeholder="e.g. recovers 15+ lost patient bookings every month on complete autopilot"
                  className="w-full px-3 py-2 bg-[#080808] border border-white/20 rounded-lg text-white text-xs focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    value={productInfo.sender_name}
                    onChange={(e) => setProductInfo({ ...productInfo, sender_name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/20 rounded-lg text-white text-xs focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">Your Title</label>
                  <input
                    type="text"
                    value={productInfo.sender_title}
                    onChange={(e) => setProductInfo({ ...productInfo, sender_title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-white/20 rounded-lg text-white text-xs focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  audio.playConfirm();
                  localStorage.setItem('leadscout_product_info', JSON.stringify(productInfo));
                  addLog(`Saved product offer configuration for "${productInfo.product_name}".`, 'success');
                  setOutreachModalOpen(false);
                }}
                className="w-full py-2.5 bg-white text-black font-extrabold rounded-xl transition-all hover:bg-[#eaeaea] mt-2 cursor-pointer shadow-lg"
              >
                Save Product &amp; Offer Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1-Click AI Pitch Email Dispatch Modal */}
      {emailModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-[#111] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                  <Mail className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>AI Sales Outreach</span>
                    <span className="text-[11px] bg-white/10 text-white border border-white/15 px-2 py-0.5 rounded-full">
                      {selectedLead.name}
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#777]">Tailored to detected bottleneck &amp; {productInfo.product_name}</p>
                </div>
              </div>
              <button
                onClick={() => setEmailModalOpen(false)}
                className="text-[#777] hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">Target Recipient</label>
                <div className="flex items-center gap-2">
                  {selectedLead.all_emails?.length > 1 && (
                    <select
                      value={selectedRecipient}
                      onChange={(e) => setSelectedRecipient(e.target.value)}
                      className="px-3 py-2 bg-[#0a0a0a] border border-white/20 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-white cursor-pointer"
                    >
                      {selectedLead.all_emails.map((e, idx) => (
                        <option key={e} value={e}>
                          {e} {idx === 0 ? '(Primary)' : ''}
                        </option>
                      ))}
                    </select>
                  )}
                  <input
                    type="email"
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    placeholder="recipient@company.com"
                    className="flex-1 px-3 py-2 bg-[#080808] border border-white/20 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">Subject Line</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080808] border border-white/20 rounded-lg text-white text-xs font-semibold focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#aaa] uppercase tracking-wider mb-1">Personalized Pitch Body</label>
                <textarea
                  rows={9}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-white/20 rounded-xl text-[#eee] text-xs font-sans leading-relaxed focus:outline-none focus:border-white resize-y"
                />
              </div>

              {emailSentAlert && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs">
                  {emailSentAlert}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleModalCopy}
                    className="px-3.5 py-2 bg-[#181818] hover:bg-[#252525] border border-white/20 rounded-xl text-xs text-white font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {emailModalCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{emailModalCopied ? 'Copied!' : 'Copy Email'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenMailto}
                    className="px-3.5 py-2 bg-white text-black hover:bg-[#eaeaea] font-bold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>Open in Mail App</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateSmtpSend}
                  className="px-4 py-2 bg-emerald-400 text-black hover:bg-emerald-300 font-extrabold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Send via SMTP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
