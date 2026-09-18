import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  CheckCheck, 
  Smartphone, 
  RotateCcw, 
  Phone, 
  PhoneCall,
  PhoneOff,
  Video, 
  MoreVertical, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Stethoscope, 
  Volume2, 
  Sparkles,
  Globe2,
  Shield
} from 'lucide-react';
import { audio } from './AudioEngine';

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: "👋 Welcome to MedFlow AI. I manage 24/7 patient booking, pre-intake, and automated care triage for clinics across the UK 🇬🇧 & Canada 🇨🇦.",
    time: '12:30',
    type: 'text',
  },
  {
    id: 2,
    sender: 'bot',
    text: "Select a clinic flow below or test a simulated inbound AI phone call from our London or Toronto clinic desk:",
    time: '12:30',
    type: 'options',
  },
];

const sampleFlows = [
  {
    id: 'uk-clinic',
    label: '🇬🇧 London Clinic: Patient Triage & Booking',
    prompt: 'I need to book a consultation at the Harley Street Clinic in London',
    response: "🇬🇧 [Harley Street Health UK // NHS & Private Triage]\n\nHello! I can book that for you right away.\n\n• Clinic: Harley St Medical Centre, London W1G\n• Available Practitioner: Dr. Alistair Finch (General Medicine & Diagnostics)\n• Earliest Slots:\n  👉 Tomorrow at 10:30 AM GMT\n  👉 Thursday at 2:15 PM GMT\n\n• Compliance: UK GDPR & NHS Data Security Standards Verified.\n\nWould you like me to reserve the 10:30 AM slot and send the pre-consultation intake form here?",
  },
  {
    id: 'canada-clinic',
    label: '🇨🇦 Toronto Clinic: OHIP / Private Intake',
    prompt: 'Hi, I need an appointment at the Toronto Downtown Medical Clinic for back pain',
    response: "🇨🇦 [Toronto Downtown Care // PIPEDA & PHIPA Compliant]\n\nHi there! We have urgent care and physiotherapy slots open this week:\n\n• Clinic: Bay Street Wellness Centre, Toronto, ON\n• Assessment Type: Musculoskeletal / Physiotherapy Initial Evaluation\n• Available Slots:\n  👉 Wednesday 11:00 AM EST (Dr. Elena Roy)\n  👉 Thursday 3:45 PM EST (Dr. Marcus Chen)\n\n• Health Coverage: OHIP & Private Insurance (Sun Life, Manulife) direct billing supported.\n\nShall I confirm Wednesday 11:00 AM for you?",
  },
  {
    id: 'sap-order',
    label: '📦 Check Enterprise SAP Order #SO-9402',
    prompt: 'Check status for SAP Order #SO-9402',
    response: "🔍 Querying SAP SD S/4HANA via BAPI_SALESORDER_GETSTATUS...\n\n✅ Order #SO-9402 Verified:\n• Customer: TechCorp Global (Bangalore Hub)\n• Status: DISPATCHED (VL01N Delivery Generated)\n• Invoice: #INV-88219 (VF01 Posted)\n• Courier: BlueDart Express (Track #BLR-8849)\n• Estimated Delivery: Today by 4:30 PM",
  },
  {
    id: 'book-call',
    label: '💼 Book Clinic AI Strategy Consultation',
    prompt: 'We run 5 dental clinics in Manchester & Vancouver. Can you deploy AI voice receptionists?',
    response: "⚡ Absolutely! Uditya has deployed AI clinic receptionists and WhatsApp triage desks across both the UK and Canada.\n\nKey Highlights for Multi-Location Clinics:\n• 0 wait times: AI receptionist answers 100% of simultaneous calls\n• EHR Sync: Cliniko, Jane App, EMIS Health, Accurx, Dentrix\n• No-Show Reduction: Automated WhatsApp reminders reduce cancellations by 42%\n\nLet's schedule a 20-min strategy demo for your clinical directors.",
  }
];

// Simulated AI Call Scenarios for UK and Canada
const callScenarios = {
  uk: {
    title: '🇬🇧 UK Harley Street Clinic — Live AI Voice Receptionist',
    subtitle: 'British English (RP) • UK GDPR Compliant • Jane App / Cliniko Sync',
    duration: '01:14',
    dialogue: [
      { speaker: 'AI Receptionist', text: "Thank you for calling Harley Street Medical Centre. My name is Maya, your AI assistant. How may I help you today?" },
      { speaker: 'Patient (London)', text: "Hello! I'm calling to see if Dr. Finch has any appointments open tomorrow morning for a blood pressure follow-up?" },
      { speaker: 'AI Receptionist', text: "Certainly! Let me check Dr. Finch's diary. Yes, he has an opening tomorrow morning at 10:15 AM and another at 11:45 AM. Would 10:15 AM suit you?" },
      { speaker: 'Patient (London)', text: "10:15 AM is perfect, thank you." },
      { speaker: 'AI Receptionist', text: "Splendid! I have reserved 10:15 AM for you. I've sent a WhatsApp confirmation and intake link to your mobile number. Is there anything else I can assist you with?" },
      { speaker: 'Patient (London)', text: "No, that's everything. Thank you, Maya!" },
      { speaker: 'AI Receptionist', text: "You're very welcome. Have a lovely day!" },
    ],
  },
  canada: {
    title: '🇨🇦 Toronto Wellness & Dental — Live AI Voice Receptionist',
    subtitle: 'Canadian English • PIPEDA Compliant • Jane App / Dentrix Integration',
    duration: '01:08',
    dialogue: [
      { speaker: 'AI Receptionist', text: "Hi, thanks for calling Toronto Downtown Health Clinic. I'm Alex, your automated receptionist. How can I assist you?" },
      { speaker: 'Patient (Toronto)', text: "Hi Alex, I need to reschedule my dental cleaning this Friday because I have a work conflict." },
      { speaker: 'AI Receptionist', text: "No problem at all! I can help you reschedule right now. Could I get your full name or date of birth to look up your file?" },
      { speaker: 'Patient (Toronto)', text: "Sure, it's David Miller, May 14th." },
      { speaker: 'AI Receptionist', text: "Thanks, David. I see your appointment with Dr. Chen on Friday at 2:00 PM. We have openings next Monday at 10:00 AM or Tuesday at 3:30 PM. Would either of those work?" },
      { speaker: 'Patient (Toronto)', text: "Let's do Monday at 10:00 AM." },
      { speaker: 'AI Receptionist', text: "Done! Your appointment is moved to Monday at 10:00 AM. A confirmation text and calendar invite have just been sent to your phone. Anything else for you today?" },
      { speaker: 'Patient (Toronto)', text: "That was super easy. Thanks a lot!" },
      { speaker: 'AI Receptionist', text: "Glad to help! Have a great week." },
    ],
  }
};

export default function WhatsAppSimulator() {
  const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' or 'call'
  const [activeRegion, setActiveRegion] = useState('uk'); // 'uk' or 'canada'
  const [isCalling, setIsCalling] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Call simulation animation
  useEffect(() => {
    let interval;
    if (isCalling) {
      interval = setInterval(() => {
        setCurrentLineIdx((prev) => {
          const scenario = callScenarios[activeRegion];
          if (prev < scenario.dialogue.length - 1) {
            audio.playBlip(700 + prev * 50);
            return prev + 1;
          } else {
            setIsCalling(false);
            audio.playConfirm();
            return prev;
          }
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isCalling, activeRegion]);

  const triggerBotResponse = (userPrompt, replyText) => {
    audio.playClick(1400);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userPrompt,
      time: timeStr,
      type: 'text',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      audio.playBlip(750);
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    setInputText('');

    let dynamicReply = '';
    const qLower = query.toLowerCase();

    if (qLower.includes('uk') || qLower.includes('london') || qLower.includes('nhs')) {
      dynamicReply = `🇬🇧 [UK Clinic Protocol]: Inbound query received for "${query}". Automatically mapped to UK NHS & Private Practice calendar. Intake link generated with UK GDPR compliance.`;
    } else if (qLower.includes('canada') || qLower.includes('toronto') || qLower.includes('ohip')) {
      dynamicReply = `🇨🇦 [Canada Clinic Protocol]: Inbound query received for "${query}". Processed through PIPEDA/PHIPA compliance engine. Jane App EHR patient record synced.`;
    } else if (qLower.includes('clinic') || qLower.includes('doctor') || qLower.includes('appointment')) {
      dynamicReply = `🏥 [Clinic Triage]: 24/7 patient booking initialized. AI receptionist checks live clinician availability and dispatches instant WhatsApp confirmation.`;
    } else if (qLower.includes('sap') || qLower.includes('order')) {
      dynamicReply = `📦 [SAP SD Hook]: Query received for "${query}". Live RFC call to SAP ERP BAPI_SALESORDER_GETSTATUS executed. Verified system link active.`;
    } else {
      dynamicReply = `🤖 [AI Webhook Response]: Processed request for "${query}". Automated medical & enterprise triage agent dispatched workflow sequence with 99.9% uptime.`;
    }

    triggerBotResponse(query, dynamicReply);
  };

  const startCall = (region) => {
    audio.playConfirm();
    setActiveRegion(region);
    setCurrentLineIdx(0);
    setIsCalling(true);
  };

  const stopCall = () => {
    audio.playClick(800);
    setIsCalling(false);
    setCurrentLineIdx(0);
  };

  return (
    <section id="whatsapp-simulator" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]/20 dark:border-white/10 select-none font-neue">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 font-mono">
        <div>
          <span className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] led-blink"></span>
            02 // HEALTHCARE & ENTERPRISE AUTOMATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 font-display uppercase tracking-tight">
            CLINIC CHATBOTS & VOICE CALL AGENTS
          </h2>
        </div>
        <div className="text-xs text-[#999] mt-3 md:mt-0 max-w-md">
          Specialized 24/7 AI Receptionists & WhatsApp Triage for Medical, Dental & Wellness Clinics across the UK 🇬🇧 and Canada 🇨🇦.
        </div>
      </div>

      {/* Mode Switcher: WhatsApp Bot vs AI Phone Receptionist */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6 sm:mb-8 font-mono text-xs">
        <button
          onClick={() => {
            audio.playClick(1000);
            setActiveTab('whatsapp');
          }}
          className={`px-3 sm:px-4 py-2 border transition-all cursor-pointer font-bold flex items-center justify-center gap-2 ${
            activeTab === 'whatsapp'
              ? 'bg-white text-black border-white shadow-sm'
              : 'border-white/20 text-[#aaa] hover:border-white'
          }`}
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>WHATSAPP CLINIC BOT</span>
        </button>

        <button
          onClick={() => {
            audio.playClick(1100);
            setActiveTab('call');
          }}
          className={`px-3 sm:px-4 py-2 border transition-all cursor-pointer font-bold flex items-center justify-center gap-2 ${
            activeTab === 'call'
              ? 'bg-white text-black border-white shadow-sm'
              : 'border-white/20 text-[#aaa] hover:border-white'
          }`}
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span>AI CALL RECEPTIONIST (UK & CANADA)</span>
        </button>
      </div>

      {/* TAB 1: WHATSAPP CLINIC BOT SIMULATOR */}
      {activeTab === 'whatsapp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Pre-Built Flow Triggers */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="bg-[#121212] border border-[#303030] p-6 font-mono text-xs crosshair-corner shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="font-bold text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-white" />
                  SELECT A LIVE AUTOMATION TRIGGER
                </span>
                <button
                  onClick={() => {
                    audio.playClick(900);
                    setMessages(initialMessages);
                  }}
                  className="flex items-center gap-1 text-[11px] text-[#888] hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  RESET
                </button>
              </div>

              <p className="text-[#aaa] mb-4 text-xs font-sans">
                Click any automated workflow below to simulate real-time patient interactions for clinics in London (UK) or Toronto (Canada), or enterprise order lookups:
              </p>

              <div className="space-y-2.5">
                {sampleFlows.map((flow) => (
                  <button
                    key={flow.id}
                    onClick={() => triggerBotResponse(flow.prompt, flow.response)}
                    className="w-full p-3 bg-[#181818] border border-white/10 hover:border-white flex items-center justify-between text-left transition-all hover:translate-x-1 cursor-pointer group"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-white group-hover:text-white transition-colors">
                        {flow.label}
                      </span>
                      <span className="text-[10px] text-[#999] mt-0.5 line-clamp-1">
                        {flow.prompt}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-white shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Compliance & EHR Integration Badges */}
            <div className="bg-[#121212] border border-white/10 p-5 font-mono text-xs">
              <div className="text-[11px] font-bold text-white uppercase mb-3 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-white" />
                CLINICAL COMPLIANCE & INTEGRATIONS
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] text-[#aaa]">
                <div className="p-2 border border-white/10 bg-white/5">
                  <span className="text-[#888] block text-[9px]">UK JURISDICTION</span>
                  <strong className="text-white">UK GDPR & NHS Standards</strong>
                </div>
                <div className="p-2 border border-white/10 bg-white/5">
                  <span className="text-[#888] block text-[9px]">CANADA JURISDICTION</span>
                  <strong className="text-white">PIPEDA & PHIPA Compliant</strong>
                </div>
                <div className="p-2 border border-white/10 bg-white/5">
                  <span className="text-[#888] block text-[9px]">EHR / CALENDAR</span>
                  <strong className="text-white">Jane App, Cliniko, EMIS</strong>
                </div>
                <div className="p-2 border border-white/10 bg-white/5">
                  <span className="text-[#888] block text-[9px]">NO-SHOW REDUCTION</span>
                  <strong className="text-white">42% Drop via Auto-Reminders</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Tactile Smartphone Frame Simulator */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-[390px] bg-[#121212] rounded-[28px] sm:rounded-[38px] p-2 sm:p-3 shadow-2xl border-2 sm:border-4 border-[#262626] dark:border-[#404040] relative mx-auto">
              {/* Speaker & camera pill */}
              <div className="w-20 sm:w-28 h-3.5 sm:h-4 bg-[#1e1e1e] rounded-full mx-auto mb-2 flex items-center justify-center gap-2">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#111] border border-[#333]"></div>
                <div className="w-6 sm:w-8 h-1 rounded-full bg-[#2a2a2a]"></div>
              </div>

              {/* Inner Phone Screen */}
              <div className="bg-[#efeae2] dark:bg-[#0b141a] rounded-[22px] sm:rounded-[28px] overflow-hidden flex flex-col h-[460px] sm:h-[520px] text-[#111b21] dark:text-[#e9edef] font-sans text-xs relative">
                {/* WhatsApp App Header */}
                <div className="bg-[#008069] dark:bg-[#202c33] text-white px-3 py-2.5 flex items-center justify-between shadow-sm select-none">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center font-mono text-xs border border-white/30">
                      US
                    </div>
                    <div>
                      <div className="font-semibold text-xs leading-tight flex items-center gap-1">
                        Clinic & ERP AI Engine
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]"></span>
                      </div>
                      <div className="text-[10px] text-white/80 font-mono">
                        {isTyping ? 'typing automated reply...' : 'UK 🇬🇧 & Canada 🇨🇦 24/7'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white/90">
                    <Video className="w-4 h-4 cursor-pointer hover:opacity-80" />
                    <Phone className="w-4 h-4 cursor-pointer hover:opacity-80" />
                    <MoreVertical className="w-4 h-4 cursor-pointer hover:opacity-80" />
                  </div>
                </div>

                {/* Chat Message Scroll Area */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                  <div className="flex justify-center my-1">
                    <span className="bg-[#ffeecd] dark:bg-[#182229] text-[#54656f] dark:text-[#8696a0] text-[9px] px-2.5 py-0.5 rounded shadow-xs font-mono">
                      🔒 SECURE HEALTHCARE / ERP CLOUD WEBHOOK
                    </span>
                  </div>

                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-[11.5px] leading-relaxed shadow-sm whitespace-pre-line relative ${
                          m.sender === 'user'
                            ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-none'
                            : 'bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-none border border-black/5 dark:border-white/5'
                        }`}
                      >
                        {m.text}
                        <div
                          className={`text-[9px] mt-1 flex items-center justify-end gap-1 font-mono ${
                            m.sender === 'user' ? 'text-[#54656f] dark:text-[#8696a0]' : 'text-[#8696a0]'
                          }`}
                        >
                          <span>{m.time}</span>
                          {m.sender === 'user' && (
                            <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-start">
                      <div className="bg-white dark:bg-[#202c33] px-3 py-2 rounded-lg shadow-sm flex items-center gap-1.5 border border-black/5 dark:border-white/5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={handleSendMessage}
                  className="bg-[#f0f2f5] dark:bg-[#202c33] p-2 flex items-center gap-2 border-t border-black/5 dark:border-white/5"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type UK clinic query, Canadian booking, or SAP order..."
                    className="flex-1 bg-white dark:bg-[#2a3942] px-3 py-1.5 rounded-full text-xs outline-none focus:ring-1 focus:ring-[#008069] text-[#111] dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-8 h-8 rounded-full bg-[#008069] dark:bg-[#00a884] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#006e5a] transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INBOUND AI PHONE CALL RECEPTIONIST (UK & CANADA) */}
      {activeTab === 'call' && (
        <div className="bg-[#121212] border border-[#303030] p-6 sm:p-8 crosshair-corner font-mono shadow-xl">
          {/* Top selection strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <div className="text-[11px] font-bold text-white uppercase flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-white" />
                24/7 INBOUND CLINIC AI VOICE AGENT SIMULATOR
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white mt-1">
                Zero Hold Time Phone Reception for Medical & Dental Practices
              </h3>
            </div>

            {/* Region switchers */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => startCall('uk')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 border text-xs font-bold transition-all cursor-pointer text-center ${
                  activeRegion === 'uk'
                    ? 'bg-white text-black border-white'
                    : 'border-white/20 text-[#aaa] hover:border-white'
                }`}
              >
                🇬🇧 UK (London)
              </button>
              <button
                onClick={() => startCall('canada')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 border text-xs font-bold transition-all cursor-pointer text-center ${
                  activeRegion === 'canada'
                    ? 'bg-white text-black border-white'
                    : 'border-white/20 text-[#aaa] hover:border-white'
                }`}
              >
                🇨🇦 Canada (Toronto)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Call State Machine & Audio Wave */}
            <div className="lg:col-span-5 bg-[#0e0e0e] text-white p-5 border border-[#2a2a2a] flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between text-xs text-[#888] border-b border-[#262626] pb-2 mb-4">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#27c93f] led-blink"></span>
                    {isCalling ? 'ACTIVE INBOUND CALL' : 'LINE READY'}
                  </span>
                  <span>{callScenarios[activeRegion].duration}</span>
                </div>

                <div className="font-bold text-sm text-white font-display">
                  {callScenarios[activeRegion].title}
                </div>
                <div className="text-[11px] text-[#aaa] mt-1 font-mono">
                  {callScenarios[activeRegion].subtitle}
                </div>

                {/* Simulated Audio Waveform */}
                <div className="my-8 py-6 bg-[#181818] border border-[#2a2a2a] rounded flex items-center justify-center gap-1.5 h-20">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-white rounded-full transition-all duration-150 ${
                        isCalling
                          ? 'animate-pulse'
                          : 'opacity-30'
                      }`}
                      style={{
                        height: isCalling
                          ? `${Math.max(8, Math.sin(i * 0.4 + currentLineIdx) * 45 + 15)}px`
                          : '6px',
                        animationDelay: `${i * 40}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Call Control Button */}
              <div className="pt-4 border-t border-[#262626]">
                {isCalling ? (
                  <button
                    onClick={stopCall}
                    className="w-full py-2.5 bg-[#ff4d4f] hover:bg-[#d9363e] text-white font-bold text-xs flex items-center justify-center gap-2 rounded transition-all cursor-pointer"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>END SIMULATION</span>
                  </button>
                ) : (
                  <button
                    onClick={() => startCall(activeRegion)}
                    className="w-full py-2.5 bg-[#27c93f] hover:bg-[#20a834] text-white font-bold text-xs flex items-center justify-center gap-2 rounded transition-all cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>START SIMULATED CLINIC CALL</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Real-time Live Dialogue Transcript */}
            <div className="lg:col-span-7 bg-[#141414] border border-white/10 p-5 text-xs h-[380px] overflow-y-auto space-y-3">
              <div className="text-[10px] text-[#888] font-bold uppercase tracking-wider border-b border-white/10 pb-1.5 flex justify-between">
                <span>LIVE CALL TRANSCRIPTION (WHISPER / DEEPGRAM)</span>
                <span className="text-white">REAL-TIME PIPELINE</span>
              </div>

              {callScenarios[activeRegion].dialogue.map((line, idx) => {
                const isSpoken = idx <= currentLineIdx;
                const isCurrent = idx === currentLineIdx && isCalling;
                const isAi = line.speaker.includes('AI');

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded border transition-all ${
                      isCurrent
                        ? 'bg-white/10 border-white translate-x-1'
                        : isSpoken
                        ? 'bg-white/5 border-transparent'
                        : 'opacity-25 border-dashed border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                      <span className={isAi ? 'text-white' : 'text-[#53bdeb]'}>
                        {line.speaker}
                      </span>
                      {isCurrent && <span className="text-white animate-pulse">SPEAKING NOW...</span>}
                    </div>
                    <div className="text-[12px] text-[#eee] font-sans leading-relaxed">
                      "{line.text}"
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
