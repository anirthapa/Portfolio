import React, { useEffect, useRef } from 'react';

const HeroNetwork = ({ heroRef, active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!hero || !context || !active) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false, strength: 0 };
    let particles = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = true;

    const line = (x1, y1, x2, y2, opacity) => {
      context.strokeStyle = `rgba(215, 221, 230, ${opacity})`;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    };

    const draw = (time) => {
      frame = 0;
      const step = lastTime ? Math.min((time - lastTime) / 16.667, 2) : 1;
      lastTime = time;
      const pointerEase = 1 - Math.pow(0.65, step);
      pointer.x += (pointer.targetX - pointer.x) * pointerEase;
      pointer.y += (pointer.targetY - pointer.y) * pointerEase;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.1 * step;
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.7;

      const linkDistance = Math.min(190, Math.max(115, width * 0.14));
      const cursorDistance = Math.min(280, width * 0.45);

      particles.forEach((particle) => {
        if (!motion.matches) {
          particle.baseX += particle.vx * step;
          particle.baseY += particle.vy * step;
          if (particle.baseX < 0 || particle.baseX > width) particle.vx *= -1;
          if (particle.baseY < 0 || particle.baseY > height) particle.vy *= -1;
          particle.baseX = Math.max(0, Math.min(width, particle.baseX));
          particle.baseY = Math.max(0, Math.min(height, particle.baseY));

          const dx = pointer.x - particle.baseX;
          const dy = pointer.y - particle.baseY;
          const distance = Math.hypot(dx, dy);
          const pull = Math.max(0, 1 - distance / cursorDistance) * pointer.strength * 0.12;
          // A lightly damped spring lets each dot follow and settle like a tether.
          particle.sx = (particle.sx + (dx * pull - particle.ox) * 0.035 * step) * Math.pow(0.85, step);
          particle.sy = (particle.sy + (dy * pull - particle.oy) * 0.035 * step) * Math.pow(0.85, step);
          particle.ox += particle.sx * step;
          particle.oy += particle.sy * step;
        }
        particle.x = particle.baseX + particle.ox;
        particle.y = particle.baseY + particle.oy;
      });

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < linkDistance) {
            line(a.x, a.y, b.x, b.y, (1 - distance / linkDistance) * 0.24);
          }
        }
      }

      if (pointer.strength > 0.01 && !motion.matches) {
        particles
          .map(particle => ({ particle, distance: Math.hypot(particle.x - pointer.x, particle.y - pointer.y) }))
          .filter(({ distance }) => distance < cursorDistance)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 11)
          .forEach(({ particle, distance }) => {
            const opacity = (1 - distance / cursorDistance) * pointer.strength * 0.55;
            line(pointer.x, pointer.y, particle.x, particle.y, opacity);
          });

      }

      particles.forEach(particle => {
        const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
        const proximity = Math.max(0, 1 - distance / cursorDistance) * pointer.strength;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + proximity * 0.6, 0, Math.PI * 2);
        context.fillStyle = `rgba(222, 229, 240, ${particle.opacity + proximity * 0.3})`;
        context.fill();
      });

      if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(draw);
    };

    const resume = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (visible && !document.hidden) draw(performance.now());
    };

    const resize = () => {
      width = hero.clientWidth;
      height = hero.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(140, Math.max(40, Math.round(width * height / 11000)));
      particles = Array.from({ length: count }, () => ({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        x: 0, y: 0, ox: 0, oy: 0, sx: 0, sy: 0,
        vx: (Math.random() - 0.5) * 0.36,
        vy: (Math.random() - 0.5) * 0.36,
        radius: 0.7 + Math.random() * 0.9,
        opacity: 0.25 + Math.random() * 0.3,
      }));
      resume();
    };

    const move = (event) => {
      if (motion.matches || event.pointerType === 'touch') return;
      const bounds = hero.getBoundingClientRect();
      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;
      if (!pointer.active) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.active = true;
    };
    const leave = () => { pointer.active = false; };
    const motionChange = () => {
      pointer.active = false;
      pointer.strength = 0;
      particles.forEach(p => { p.ox = p.oy = p.sx = p.sy = 0; });
      resume();
    };

    const sizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    sizeObserver.observe(hero);
    visibilityObserver.observe(hero);
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', resume);
    motion.addEventListener('change', motionChange);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', resume);
      motion.removeEventListener('change', motionChange);
    };
  }, [heroRef, active]);

  return <canvas className="hero-network" ref={canvasRef} aria-hidden="true" />;
};

export default HeroNetwork;
