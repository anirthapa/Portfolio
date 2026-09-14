import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Fast, interactive frontend and backend systems built with React, Next.js, and Node.js.',
  },
  {
    number: '02',
    title: 'UI / UX Motion',
    description: 'Responsive interfaces with motion that guides attention and makes every interaction feel intentional.',
  },
  {
    number: '03',
    title: 'APIs & Databases',
    description: 'Secure REST APIs and dependable SQL or NoSQL data layers designed for real-world scale.',
  },
];

const Services = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.service-row').forEach((row, index) => {
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: row, start: 'top 90%', once: true },
          });

          timeline
            .from(row.querySelector('.service-rule'), {
              scaleX: 0,
              transformOrigin: index % 2 ? 'right center' : 'left center',
              duration: 0.9,
              ease: 'expo.out',
            })
            .from(row.querySelectorAll('.service-reveal'), {
              y: 30,
              opacity: 0,
              duration: 0.75,
              stagger: 0.07,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }, '-=0.55');
        });
      }, containerRef);
      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section className="section services-section" id="services" ref={containerRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">Design thinking backed by reliable engineering.</p>
        </div>

        <div className="services-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span className="service-rule" aria-hidden="true" />
              <span className="service-number service-reveal">{service.number}</span>
              <h3 className="service-reveal">{service.title}</h3>
              <p className="service-reveal">{service.description}</p>
              <span className="service-arrow service-reveal" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
