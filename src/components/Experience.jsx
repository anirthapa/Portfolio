import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    title: 'Junior Full Stack Developer',
    company: 'Detech Solution',
    period: 'Nov 2025 — Present',
    description: 'Building responsive interfaces, improving state management, and translating complex product ideas into polished web experiences.',
  },
  {
    title: 'Full Stack Developer Trainee',
    company: 'Detech Solution',
    period: 'Aug 2025 — Nov 2025',
    description: 'Developed full-stack features while strengthening practical skills in modern JavaScript architecture and team delivery.',
  },
  {
    title: 'Teaching Assistant',
    company: 'Itahari International College',
    period: 'Jun 2024 — Sep 2024',
    description: 'Built and maintained the college inventory system, improving resource tracking and daily operations.',
  },
];

const Experience = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.experience-progress', {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.experience-list',
            start: 'top 75%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        });

        gsap.utils.toArray('.experience-item').forEach((item) => {
          gsap.from(item, {
            x: 45,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section className="section experience-section" id="experience" ref={sectionRef}>
      <div className="section-container">
        <header className="section-header editorial-heading">
          <div>
            <h2 className="section-title">Experience<span className="heading-period">.</span></h2>
          </div>
          <p className="section-subtitle">Learning, building, and taking on more responsibility with every project.</p>
        </header>

        <div className="experience-list">
          <span className="experience-track" aria-hidden="true" />
          <span className="experience-progress" aria-hidden="true" />
          {roles.map((role, index) => (
            <article className="experience-item" key={role.title}>
              <span className="experience-dot" aria-hidden="true" />
              <span className="experience-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="experience-role">
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </div>
              <div className="experience-meta">
                <span>{role.company}</span>
                <time>{role.period}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
