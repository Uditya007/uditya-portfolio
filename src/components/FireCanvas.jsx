import React, { useEffect, useRef } from 'react';

/**
 * High-performance 60 FPS Procedural Fire & Burning Embers Canvas
 * Uses additive particle blending (lighter) for incandescent molten flame cores
 * and realistic upward heat convection with interactive mouse turbulence.
 */
export default function FireCanvas({ active }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseRef.current.vx = (x - mouseRef.current.lastX) * 0.2;
      mouseRef.current.vy = (y - mouseRef.current.lastY) * 0.2;
      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Particle pools
    const flames = [];
    const embers = [];
    const maxFlames = Math.min(180, Math.floor(width / 7));
    const maxEmbers = 120;

    class FlameParticle {
      constructor(init = false) {
        this.reset(init);
      }

      reset(init = false) {
        // Spawn along the bottom edge with concentration in clusters
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = -(Math.random() * 4 + 3);
        this.size = Math.random() * 32 + 18;
        this.maxLife = Math.random() * 35 + 25;
        this.life = init ? Math.random() * this.maxLife : 0;
        this.colorStep = Math.random();
      }

      update() {
        this.life++;
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.life * 0.15) * 0.8;
        this.size *= 0.95; // Shrink as it rises

        // Mouse heat push
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (1 - dist / 120) * 2;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.life >= this.maxLife || this.size < 2) {
          this.reset();
        }
      }

      draw(context) {
        const progress = this.life / this.maxLife;
        // Color transition: White core -> Bright Yellow -> Vivid Orange -> Deep Crimson -> Smoke
        let r, g, b, a;
        if (progress < 0.2) {
          r = 255;
          g = Math.floor(255 - progress * 200);
          b = Math.floor(230 - progress * 800);
          a = 0.85;
        } else if (progress < 0.6) {
          r = 255;
          g = Math.floor(180 - (progress - 0.2) * 280);
          b = 10;
          a = 0.65;
        } else {
          r = Math.floor(240 - (progress - 0.6) * 350);
          g = Math.floor(50 - (progress - 0.6) * 120);
          b = 0;
          a = Math.max(0, 0.45 * (1 - progress));
        }

        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${Math.max(0, g - 40)}, 0, ${a * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    class EmberParticle {
      constructor(init = false) {
        this.reset(init);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + Math.random() * 50;
        this.vx = (Math.random() - 0.5) * 1.8;
        this.vy = -(Math.random() * 2.5 + 1.2);
        this.size = Math.random() * 2.8 + 0.8;
        this.maxLife = Math.random() * 180 + 100;
        this.life = init ? Math.random() * this.maxLife : 0;
        this.phase = Math.random() * Math.PI * 2;
        this.flickerSpeed = Math.random() * 0.2 + 0.08;
      }

      update() {
        this.life++;
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.life * 0.04 + this.phase) * 1.2;

        // Mouse turbulence on sparks
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const force = (1 - dist / 100) * 3;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.life >= this.maxLife || this.y < -20) {
          this.reset();
        }
      }

      draw(context) {
        const progress = this.life / this.maxLife;
        const alpha = Math.sin(this.life * this.flickerSpeed) * 0.35 + 0.65;
        const fade = 1 - progress;

        context.fillStyle = `rgba(255, ${Math.floor(140 + Math.random() * 100)}, 20, ${alpha * fade})`;
        context.shadowColor = '#ff6a00';
        context.shadowBlur = 6;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }
    }

    // Populate particles
    for (let i = 0; i < maxFlames; i++) {
      flames.push(new FlameParticle(true));
    }
    for (let i = 0; i < maxEmbers; i++) {
      embers.push(new EmberParticle(true));
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Additive blending for realistic fiery incandescent glow
      ctx.globalCompositeOperation = 'lighter';

      // 1. Draw rising flame tongues along the bottom
      for (let i = 0; i < flames.length; i++) {
        flames[i].update();
        flames[i].draw(ctx);
      }

      // 2. Draw rising embers throughout the entire screen
      for (let i = 0; i < embers.length; i++) {
        embers[i].update();
        embers[i].draw(ctx);
      }

      // 3. Draw ambient bottom hearth glow
      const hearthGrad = ctx.createLinearGradient(0, height, 0, height - 160);
      hearthGrad.addColorStop(0, 'rgba(255, 70, 0, 0.28)');
      hearthGrad.addColorStop(0.4, 'rgba(255, 30, 0, 0.12)');
      hearthGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = hearthGrad;
      ctx.fillRect(0, height - 160, width, 160);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none transition-opacity duration-700">
      {/* Background Heat Shimmer Radial Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 80, 0, 0.25) 0%, rgba(180, 20, 0, 0.1) 45%, transparent 75%)'
        }}
      />
      {/* Top ambient fire edge glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 shadow-[0_0_20px_#ff4500]" />
      
      {/* Interactive Fire Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
