import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Smartphone, 
  ExternalLink, 
  MessageSquare,
  Stethoscope,
  Globe2,
  Phone
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './SocialIcons';
import confetti from 'canvas-confetti';
import { audio } from './AudioEngine';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'Clinic AI: Voice & WhatsApp (UK / Canada)',
    region: 'UK 🇬🇧',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const emailAddress = 'uditya.singh.engineer@gmail.com';
  const phoneNumber = '+91 7665941949';
  const rawPhone = '7665941949';
  const whatsappUrl = 'https://wa.me/917665941949';
  const linkedinUrl = 'https://www.linkedin.com/in/uditya-singh';
  const githubUrl = 'https://github.com/Uditya007';

  const handleCopyEmail = () => {
    audio.playClick(1500);
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    audio.playClick(1500);
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    audio.playConfirm();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#000000', '#25d366', '#888888'],
      });
    } catch (err) {}
  };

  return (
    <section id="contact" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-white/10 select-none font-neue">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 font-mono">
        <div>
          <span className="text-xs text-white font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] led-blink"></span>
            07 // DIRECT COMMS & CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 font-display uppercase tracking-tight">
            CONNECT WITH UDITYA SINGH
          </h2>
        </div>
        <div className="text-xs text-[#999] mt-3 md:mt-0 max-w-md">
          Direct line for Clinic AI Voice & WhatsApp automation across the UK 🇬🇧 & Canada 🇨🇦, alongside Expert Websites, Mobile Apps, and enterprise SAP SD systems.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono">
        {/* Left Side: Direct Channels & Phone */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#121212] border border-[#303030] p-6 crosshair-corner shadow-md">
            <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-white" />
              VERIFIED CHANNELS & PROFILES
            </h3>

            <div className="space-y-3 text-xs">
              {/* WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-3.5 bg-[#181818] border-2 border-[#25d366]/40 hover:border-[#25d366] flex items-center justify-between text-white transition-all hover:translate-x-1 group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-sm">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-[#25d366] transition-colors flex items-center gap-1.5">
                      WHATSAPP // DIRECT
                      <span className="w-2 h-2 rounded-full bg-[#25d366] led-blink"></span>
                    </div>
                    <div className="text-xs text-[#25d366] font-bold font-mono mt-0.5">
                      {phoneNumber}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#25d366] font-bold">
                  <span>CHAT NOW</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-3.5 bg-[#181818] border border-white/10 hover:border-[#0077b5] flex items-center justify-between text-white transition-all hover:translate-x-1 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#0077b5] text-white flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs group-hover:text-[#0077b5] transition-colors">
                      LINKEDIN PROFILE
                    </div>
                    <div className="text-[11px] text-[#999] font-mono">
                      linkedin.com/in/uditya-singh
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#888] group-hover:text-[#0077b5]" />
              </a>

              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-3.5 bg-[#181818] border border-white/10 hover:border-white flex items-center justify-between text-white transition-all hover:translate-x-1 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#222] text-white flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs group-hover:text-white transition-colors">
                      GITHUB REPOSITORIES
                    </div>
                    <div className="text-[11px] text-[#999] font-mono">
                      github.com/Uditya007
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#888] group-hover:text-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick(1200)}
                className="p-3.5 bg-[#181818] border border-white/10 hover:border-[#ee2a7b] flex items-center justify-between text-white transition-all hover:translate-x-1 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs group-hover:text-[#ee2a7b] transition-colors">
                      INSTAGRAM
                    </div>
                    <div className="text-[11px] text-[#999]">
                      Creative tech & behind-the-scenes
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#888] group-hover:text-[#ee2a7b]" />
              </a>
            </div>
          </div>

          {/* Direct Phone & Email Quick Copy Strip */}
          <div className="bg-[#121212] border border-white/10 p-5 text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-white" />
                PHONE & WHATSAPP
              </span>
              <span className="text-[#25d366] font-bold font-mono">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white">
                {phoneNumber}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyPhone}
                  className="px-2.5 py-1 bg-[#1c1c1c] border border-white/20 hover:border-[#25d366] flex items-center gap-1 text-[10px] cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3 h-3 text-[#27c93f]" />
                      <span className="text-[#27c93f] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#888]" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
                <a
                  href={`tel:${rawPhone}`}
                  className="px-2.5 py-1 bg-[#25d366] text-white hover:bg-[#20ba59] text-[10px] font-bold rounded cursor-pointer"
                >
                  CALL
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-[#888] truncate mr-2">{emailAddress}</span>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 bg-[#1c1c1c] border border-white/20 hover:border-white flex items-center gap-1 text-[10px] cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-[#27c93f]" />
                    <span className="text-[#27c93f] font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#888]" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Priority Intake Form */}
        <div className="lg:col-span-7 bg-[#121212] border border-[#303030] p-6 sm:p-8 crosshair-corner shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-white" />
              TRANSMIT PROJECT OR CLINIC INQUIRY
            </span>
            <span className="text-[10px] text-[#27c93f] font-bold">PRIORITY QUEUE</span>
          </div>

          {submitted ? (
            <div className="p-8 bg-[#181818] border border-white text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold font-display uppercase text-white">
                INQUIRY TRANSMITTED
              </h4>
              <p className="text-xs text-[#aaa] max-w-md mx-auto font-sans">
                Thank you, {formData.name || 'Partner'}! Uditya has received your transmission and will connect directly via WhatsApp ({phoneNumber}) or email within 4 business hours.
              </p>
              <button
                onClick={() => {
                  audio.playClick();
                  setSubmitted(false);
                }}
                className="px-4 py-2 bg-white text-black font-bold text-xs hover:bg-[#e0e0e0] cursor-pointer"
              >
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#999] mb-1">
                    NAME // CLINIC / ORGANIZATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Finch / Harley St Clinic"
                    className="w-full p-2.5 bg-[#181818] border border-white/10 focus:border-white outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#999] mb-1">
                    YOUR PHONE OR EMAIL *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. +44 7... or clinic@domain.com"
                    className="w-full p-2.5 bg-[#181818] border border-white/10 focus:border-white outline-none text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-[#999] mb-1">
                    PRIMARY SERVICE AREA *
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full p-2.5 bg-[#181818] border border-white/10 focus:border-white outline-none text-white"
                  >
                    <option>Expert Modern Website (React / Next.js / 3D WebGL)</option>
                    <option>Mobile App Development (iOS & Android / React Native)</option>
                    <option>Clinic AI: Voice & WhatsApp (UK / Canada)</option>
                    <option>AI Chatbots & Conversational RAG</option>
                    <option>WhatsApp Automation & Funnels</option>
                    <option>SAP SD Enterprise Integration (O2C)</option>
                    <option>Full Custom Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#999] mb-1">
                    REGION *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full p-2.5 bg-[#181818] border border-white/10 focus:border-white outline-none text-white"
                  >
                    <option>United Kingdom 🇬🇧 (London / NHS / Private)</option>
                    <option>Canada 🇨🇦 (Toronto / Vancouver / OHIP)</option>
                    <option>India 🇮🇳 / Global Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#999] mb-1">
                  PROJECT SPECIFICATION OR CLINICAL REQUIREMENTS *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your website/mobile app specifications, clinic practice size, call volume, EHR system (Jane App, Cliniko, EMIS), or SAP SD requirements..."
                  className="w-full p-2.5 bg-[#181818] border border-white/10 focus:border-white outline-none text-white font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="btn-tactile w-full py-3 bg-white text-black font-bold tracking-wider uppercase flex items-center justify-center gap-2 border border-white hover:bg-[#e0e0e0] cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
                <span>DISPATCH INQUIRY</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
