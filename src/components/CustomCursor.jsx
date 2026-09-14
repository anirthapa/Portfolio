import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = cursor.querySelector('.glass-cursor-label');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let frame = 0;
    let previousTime = 0;
    let visible = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const hide = () => {
      visible = false;
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      cursor.classList.remove('is-visible', 'is-pressed');
      root.classList.remove('ball-cursor-active');
    };

    const updateTarget = (target) => {
      const element = target instanceof Element ? target : null;
      // Keep native text and embedded-content cursors where they are useful.
      if (element?.closest('input, textarea, [contenteditable]:not([contenteditable="false"]), iframe')) {
        hide();
        return false;
      }
      const text = element?.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') || '';
      label.textContent = text;
      cursor.classList.toggle('has-label', Boolean(text));
      cursor.classList.toggle('is-hovering', Boolean(element?.closest('a, button:not(:disabled), [role="button"], summary')));
      return true;
    };

    const render = (time) => {
      frame = 0;
      const elapsed = previousTime ? Math.min(time - previousTime, 40) : 16.667;
      previousTime = time;
      const ease = reducedMotion.matches ? 1 : 1 - Math.pow(0.65, elapsed / 16.667);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      if (Math.hypot(targetX - x, targetY - y) < 0.1) {
        x = targetX;
        y = targetY;
      }
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (visible && (x !== targetX || y !== targetY)) frame = requestAnimationFrame(render);
      else previousTime = 0;
    };

    const move = (event) => {
      if (!finePointer.matches || event.pointerType === 'touch') {
        hide();
        return;
      }
      if (!updateTarget(event.target)) return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX;
        y = targetY;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        visible = true;
        cursor.classList.add('is-visible');
        root.classList.add('ball-cursor-active');
      }
      if (!frame) frame = requestAnimationFrame(render);
    };

    const over = (event) => { if (visible) updateTarget(event.target); };
    const out = (event) => { if (!event.relatedTarget) hide(); };
    const down = () => { if (visible) cursor.classList.add('is-pressed'); };
    const up = () => cursor.classList.remove('is-pressed');
    const key = (event) => { if (event.key === 'Tab') hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    const scroll = () => { if (visible) updateTarget(document.elementFromPoint(targetX, targetY)); };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerout', out, { passive: true });
    document.addEventListener('pointerdown', down, { passive: true });
    document.addEventListener('pointerup', up, { passive: true });
    document.addEventListener('pointercancel', hide);
    document.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('blur', hide);
    finePointer.addEventListener('change', hide);
    reducedMotion.addEventListener('change', hide);

    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', hide);
      document.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('blur', hide);
      finePointer.removeEventListener('change', hide);
      reducedMotion.removeEventListener('change', hide);
    };
  }, []);

  return (
    <div className="glass-cursor" ref={cursorRef} aria-hidden="true">
      <span className="glass-cursor-ball"><span className="glass-cursor-label" /></span>
    </div>
  );
};

export default CustomCursor;
