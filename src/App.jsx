import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ReactLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    if (loading) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const cleanups = [];
      const ctx = gsap.context(() => {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: ({ progress }) => gsap.set(progressRef.current, { scaleX: progress }),
        });

        gsap.utils.toArray('.section-title, .projects-heading h2').forEach((heading) => {
          gsap.fromTo(heading,
            { y: 36, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
            {
              y: 0,
              opacity: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.95,
              ease: 'expo.out',
              scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
            },
          );
        });

        gsap.utils.toArray('.fade-up:not(.section-header)').forEach((element) => {
          gsap.fromTo(element,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 90%', once: true },
            },
          );
        });

        gsap.utils.toArray('[data-magnetic]').forEach((element) => {
          if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
          const move = (event) => {
            const bounds = element.getBoundingClientRect();
            gsap.to(element, {
              x: (event.clientX - bounds.left - bounds.width / 2) * 0.16,
              y: (event.clientY - bounds.top - bounds.height / 2) * 0.2,
              duration: 0.45,
              ease: 'power3.out',
              overwrite: true,
            });
          };
          const leave = () => gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
          element.addEventListener('pointermove', move);
          element.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            element.removeEventListener('pointermove', move);
            element.removeEventListener('pointerleave', leave);
          });
        });
      }, appRef);

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        ctx.revert();
      };
    });

    ScrollTrigger.refresh();
    return () => media.revert();
  }, [loading]);

  // Passing root means this Lenis instance controls the entire page body scroll natively
  return (
    <ReactLenis root options={{ smoothWheel: true, syncTouch: false, lerp: 0.1, wheelMultiplier: 1, respectReducedMotion: true }}>
      <Helmet>
        <title>Anir Jung Thapa — Exceptional Digital Experiences</title>
        <meta name="description" content="Minimalist, modern portfolio of Anir Jung Thapa, Full Stack Developer." />
      </Helmet>

      {/* The Loader mounts over everything with z-index 100000. It slides up and unmounts itself. */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <CustomCursor />
      <div className="grain-overlay"></div>

      {/* Start the hero reveal when the loader finishes. */}
      <div ref={appRef} className="app-content-wrapper">
        <Navbar />
        <Hero isReady={!loading} />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </ReactLenis>
  );
}

export default App;
