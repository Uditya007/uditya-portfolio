import React, { useEffect } from 'react';

export default function LeadScoutPage() {
  useEffect(() => {
    window.location.replace('/leadscout/');
  }, []);

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center font-mono select-none">
      <div className="text-center space-y-4 p-8">
        <div className="w-10 h-10 border-3 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-neutral-800 font-bold tracking-wider uppercase">
          Launching LeadScout AI Engine...
        </p>
        <p className="text-xs text-neutral-500">
          Transferring to dedicated B2B Intelligence &amp; Outreach console
        </p>
        <a 
          href="/leadscout/"
          className="inline-block mt-3 px-4 py-2 bg-black text-white text-xs font-bold rounded-xl shadow"
        >
          Click here if not redirected automatically
        </a>
      </div>
    </div>
  );
}
