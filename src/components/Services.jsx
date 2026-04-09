import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".service-item", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="services" ref={containerRef}>
      <div className="section-container">
        <div className="section-header fade-up">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">Bridging the gap between design and robust engineering.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <div className="service-item" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>01 / Web Development</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              I build fast, interactive, and highly scalable frontend and backend systems. React, Next.js, and Node.js are my architectural weapons of choice.
            </p>
          </div>

          <div className="service-item" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>02 / UI/UX Animations</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              I breathe life into static designs. By leveraging GSAP and advanced CSS mathematics, I create award-winning, fluid, interactive user experiences.
            </p>
          </div>

          <div className="service-item" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>03 / API & Databases</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Designing immaculate, secure, and lightning-fast RESTful APIs backed by robust SQL or NoSQL database architectures.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
