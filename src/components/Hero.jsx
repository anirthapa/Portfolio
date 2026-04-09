import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const subRef = useRef(null);
  const parallax1Ref = useRef(null);
  const parallax2Ref = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // High-End text mask reveal! (Text slides up from 100% Y inside hidden overflow)
      // This animates the inner span.
      gsap.fromTo([text1Ref.current, text2Ref.current], 
        { y: "150%" },
        {
          y: "0%",
          duration: 1.6,
          stagger: 0.1,
          ease: "expo.out",
          delay: 3.4
        }
      );

      gsap.fromTo(subRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.5, delay: 4.1, ease: "power3.out" }
      );

      // Parallax tracking moves the OUTER wrapper, so it doesn't conflict with the 'y' transform of the inner span!
      gsap.to(parallax1Ref.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
      gsap.to(parallax2Ref.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section hero-section" id="hero" ref={heroRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-huge-text" style={{ paddingBottom: '2rem' }}>
          
          {/* Outer wrapper for Parallax */}
          <div ref={parallax1Ref}>
            {/* Inner wrapper for Clipping Mask. max-content prevents bounding box slice, nowrap prevents unwanted stacking. */}
            <div style={{ overflow: 'hidden', paddingBottom: '15px', paddingRight: '20px', paddingTop: '10px', width: 'max-content' }}>
              <span ref={text1Ref} style={{ display: 'block', transformOrigin: 'left', whiteSpace: 'nowrap' }}>FULL STACK</span>
            </div>
          </div>
          
          <div ref={parallax2Ref}>
            <div style={{ overflow: 'hidden', paddingBottom: '15px', paddingRight: '20px', paddingTop: '10px', width: 'max-content' }}>
              <span ref={text2Ref} style={{ display: 'block', color: 'var(--text-secondary)', transformOrigin: 'left', whiteSpace: 'nowrap' }}>DEVELOPER</span>
            </div>
          </div>
          
        </div>
        
        <div ref={subRef} className="hero-sub" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <span>Based in Nepal</span>
          <span style={{ color: 'var(--border-hover)' }}>//</span>
          <span>Available for work</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
