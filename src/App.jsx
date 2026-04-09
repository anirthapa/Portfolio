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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const fadeElements = gsap.utils.toArray('.fade-up');
      fadeElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0, scale: 0.95, rotation: 1 }, 
          {
            y: 0, 
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse" 
            }
          }
        );
      });
    }, appRef); // Scope to app container

    return () => ctx.revert();
  }, []);

  // Passing root means this Lenis instance controls the entire page body scroll natively
  return (
    <ReactLenis root options={{ smoothTouch: true, wheelMultiplier: 1.2 }}>
      <Helmet>
        <title>Anir Jung Thapa — Exceptional Digital Experiences</title>
        <meta name="description" content="Minimalist, modern portfolio of Anir Jung Thapa, Full Stack Developer." />
      </Helmet>

      {/* The Loader mounts over everything with z-index 100000. It slides up and unmounts itself. */}
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <CustomCursor />
      <div className="grain-overlay"></div>

      {/* The content sits underneath. The Hero animation is delayed to sync with the loader sliding up. */}
      <div ref={appRef} className="app-content-wrapper">
        <Navbar />
        <Hero />
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
