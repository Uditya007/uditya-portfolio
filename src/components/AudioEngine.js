// Subtle Web Audio API Synthesizer inspired by midlife.engineering sound design
class TactileAudioEngine {
  constructor() {
    this.ctx = null;
    this.ambientNodes = null;
    this.isMuted = true; // start muted by default so it's respectful to user
    this.ambientRunning = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick(pitch = 1200) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playBlip(freq = 880) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playConfirm() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc2.frequency.setValueAtTime(659.25, now + 0.05); // E5

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.08);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.25);
    } catch (e) {}
  }

  toggleAmbient(forceState) {
    this.init();
    if (!this.ctx) return false;

    const nextState = forceState !== undefined ? forceState : !this.ambientRunning;

    if (nextState) {
      // Start calming drone (432Hz calming chord)
      if (this.ambientNodes) {
        this.stopAmbient();
      }

      const baseFreq = 216; // 432 / 2
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const masterGain = this.ctx.createGain();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, this.ctx.currentTime); // Root

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, this.ctx.currentTime); // 5th

      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(baseFreq * 2, this.ctx.currentTime); // Octave

      // Gentle LFO for warm organic drift
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(15, this.ctx.currentTime);
      lfo.connect(filter.frequency);
      lfo.start();

      masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.03, this.ctx.currentTime + 2.0);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc3.start();

      this.ambientNodes = { osc1, osc2, osc3, lfo, masterGain };
      this.ambientRunning = true;
      this.isMuted = false;
    } else {
      this.stopAmbient();
      this.ambientRunning = false;
    }
    return this.ambientRunning;
  }

  stopAmbient() {
    if (this.ambientNodes && this.ctx) {
      const { osc1, osc2, osc3, lfo, masterGain } = this.ambientNodes;
      try {
        masterGain.gain.setValueAtTime(masterGain.gain.value, this.ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            osc3.stop();
            lfo.stop();
          } catch(e) {}
        }, 550);
      } catch(e) {}
      this.ambientNodes = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientRunning) {
      this.stopAmbient();
      this.ambientRunning = false;
    }
    if (!this.isMuted) {
      this.playBlip(600);
    }
    return this.isMuted;
  }
}

export const audio = new TactileAudioEngine();
