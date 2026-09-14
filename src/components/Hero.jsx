import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroNetwork from './HeroNetwork';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isReady = true }) => {
  const heroRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const subRef = useRef(null);
  const parallax1Ref = useRef(null);
  const parallax2Ref = useRef(null);

  useLayoutEffect(() => {
    if (!isReady) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo([text1Ref.current, text2Ref.current],
          { y: 80, opacity: 0, rotateX: 60, transformOrigin: '0% 50%' },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.6, stagger: 0.15, ease: 'expo.out' },
        );
        gsap.fromTo(subRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: 'power3.out' },
        );
        [parallax1Ref.current, parallax2Ref.current].forEach((line, index) => {
          gsap.to(line, {
            yPercent: index === 0 ? -50 : -100,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: index === 0 ? 1 : 1.5,
            },
          });
        });
      }, heroRef);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [isReady]);

  return (
    <section className="section hero-section" id="hero" ref={heroRef} aria-labelledby="hero-title">
      <HeroNetwork heroRef={heroRef} active={isReady} />
      <div className="section-container hero-original-content">
        <h1 className="hero-huge-text" id="hero-title">
          <span className="hero-line" ref={parallax1Ref}>
            <span ref={text1Ref}>FULL STACK</span>
          </span>
          <span className="hero-line" ref={parallax2Ref}>
            <span className="hero-line-secondary" ref={text2Ref}>DEVELOPER</span>
          </span>
        </h1>
        <div ref={subRef} className="hero-sub">
          <span>Based in Nepal</span>
          <span className="hero-divider" aria-hidden="true">//</span>
          <span>Available for work</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
