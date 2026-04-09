import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate the counter from 0 to 100
    let progressValue = { val: 0 };
    
    // Total loading sequence takes about 3 seconds
    gsap.to(progressValue, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressValue.val));
      },
      onComplete: () => {
        // Exit animation sequence once 100% is reached
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        // 1. Move the text out
        tl.to([counterRef.current, textRef.current], {
          y: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.in"
        }, "+=0.3"); // Wait 0.3s at 100%

        // 2. Slide the entire loader up incredibly smoothly
        tl.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut"
        });
      }
    });

  }, [onComplete]);

  return (
    <div className="awwwards-loader" ref={loaderRef}>
      <div className="awwwards-loader-grain"></div>
      
      <div className="loader-center-content">
        <div className="loader-counter-wrapper">
          <h1 ref={counterRef} className="loader-counter">
            {progress}
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
