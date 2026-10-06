import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate the counter from 0 to 100
    const progressValue = { val: 0 };
    let exitTimeline;
    
    // Keep the original counter and exit sequence brief so the hero appears promptly.
    const counterTween = gsap.to(progressValue, {
      val: 100,
      duration: 0.65,
      ease: "power2.inOut",
      onUpdate: () => {
        counterRef.current.textContent = Math.round(progressValue.val);
      },
      onComplete: () => {
        // Exit animation sequence once 100% is reached
        exitTimeline = gsap.timeline({
          onComplete: onComplete
        });

        // 1. Move the text out
        exitTimeline.to([counterRef.current, textRef.current], {
          y: -50,
          opacity: 0,
          duration: 0.2,
          stagger: 0.04,
          ease: "power3.in"
        }, "+=0.05");

        // 2. Slide the entire loader up incredibly smoothly
        exitTimeline.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power4.inOut"
        });
      }
    });

    return () => {
      counterTween.kill();
      exitTimeline?.kill();
    };
  }, [onComplete]);

  return (
    <div className="awwwards-loader" ref={loaderRef}>
      <div className="awwwards-loader-grain"></div>
      
      <div className="loader-center-content">
        <div className="loader-counter-wrapper">
          <h1 ref={counterRef} className="loader-counter">
            0
          </h1>
          <span className="loader-percent">%</span>
        </div>
      </div>

      <div ref={textRef} className="loader-bottom-text">
        <span>A. THAPA</span>
        <span>INITIALIZING EXPERIENCE</span>
      </div>
    </div>
  );
};

export default Loader;
