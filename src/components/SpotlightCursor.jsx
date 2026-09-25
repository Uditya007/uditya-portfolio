import React, { useEffect, useRef } from 'react';

export default function SpotlightCursor({ fireMode }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;

      // Add ambient trailing spark occasionally
      if (Math.random() < 0.2) {
        sparksRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const onClick = (e) => {
      // Click spark burst
      const count = fireMode ? 18 : 12;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.2;
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: Math.random() * 0.035 + 0.018,
          size: Math.random() * 2.5 + 1,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    const render = () => {
      // Smooth lerp follow
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.12;
      m.y += (m.targetY - m.y) * 0.12;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (m.x > 0 && m.y > 0) {
        // Draw soft ambient radial glow spotlight
        const radius = fireMode ? 280 : 220;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, radius);

        if (fireMode) {
          grad.addColorStop(0, 'rgba(255, 85, 0, 0.18)');
          grad.addColorStop(0.35, 'rgba(255, 140, 0, 0.08)');
          grad.addColorStop(0.7, 'rgba(255, 40, 0, 0.03)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
          grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.03)');
          grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.008)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // High-precision center core pip
        ctx.beginPath();
        ctx.arc(m.x, m.y, fireMode ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = fireMode ? '#ff8c00' : '#ffffff';
        ctx.shadowColor = fireMode ? '#ff4500' : '#ffffff';
        ctx.shadowBlur = fireMode ? 10 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update and render click sparks & cursor trails
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        if (fireMode) {
          ctx.fillStyle = `rgba(255, ${Math.floor(120 + s.life * 135)}, 0, ${s.life})`;
          ctx.shadowColor = '#ff4500';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.life * 0.9})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, [fireMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
