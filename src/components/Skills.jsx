import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Use fromTo for reliable rendering in React strict mode
      gsap.fromTo(".bento-card", 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
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
    <section className="section" id="skills" ref={containerRef}>
      <div className="section-container">
        <div className="section-header fade-up">
          <h2 className="section-title">Capabilities</h2>
          <p className="section-subtitle">A comprehensive toolkit for modern digital creation.</p>
        </div>

        <div className="bento-grid">
          {/* Frontend Box */}
          <div className="bento-card bento-span-2 bento-row-span-2" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%)' }}>
            <div style={{ padding: '0.5rem', background: '#fff', color: '#000', width: 'max-content', borderRadius: '4px', fontWeight: 800, marginBottom: '2rem', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Frontend Focus</div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Engineering Pixel-Perfect Interfaces</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Building responsive, accessible, and high-performance UI using the most prominent modern JavaScript frameworks.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: 'auto' }}>
              {["React", "Next.js", "Vue.js", "TypeScript", "TailwindCSS", "GSAP"].map(skill => (
                <span key={skill} style={{ padding: '0.6rem 1.2rem', border: '1px solid var(--border)', borderRadius: '100px', fontSize: '0.85rem', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.02)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Box */}
          <div className="bento-card bento-span-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Backend Architecture</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Node.js, Express, and RESTful APIs engineered for zero-downtime, scalability, and airtight security.
            </p>
          </div>

          {/* Data Layer */}
          <div className="bento-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Data Layer</h3>
            <p style={{ color: 'var(--text-secondary)' }}>MongoDB, MySQL, PostgreSQL, Prisma ORM.</p>
          </div>

          {/* DevOps */}
          <div className="bento-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>DevOps</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Vercel, Git, CI/CD, AWS Essentials, Netlify.</p>
          </div>

          {/* Marquee Wide Card */}
          <div className="bento-card bento-span-4" style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', padding: 0, height: '100%', minHeight: '150px' }}>
            <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marqueeLeft 35s linear infinite', gap: '4rem', padding: '2rem' }}>
              <span style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-muted)' }}>REACT // NEXT.JS // TYPESCRIPT // NODE.JS // MONGODB // TAILWIND // </span>
              <span style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-muted)' }}>REACT // NEXT.JS // TYPESCRIPT // NODE.JS // MONGODB // TAILWIND // </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
