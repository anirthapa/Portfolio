import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Cinematic staggered clip-path reveal for projects
      const cards = gsap.utils.toArray('.modern-project-card');
      
      cards.forEach((card, i) => {
        const imgWrap = card.querySelector('.project-img-wrapper');
        const textSection = card.querySelector('.project-info-modern');

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        });

        // The image wrapper opens up like a mechanical shutter
        tl.fromTo(imgWrap, 
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: "expo.inOut" }
        )
        // The image itself scales down dynamically inside the wrapper simultaneously
        .fromTo(imgWrap.querySelector('img'),
          { scale: 1.3 },
          { scale: 1, duration: 1.5, ease: "expo.inOut" },
          "<" // play at same time
        )
        // Text cleanly fades up organically after image is partially revealed
        .fromTo(textSection,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1.1"
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const projectsData = [
    {
      title: "Hostel Ease",
      img: "/photos/hostel_ease.png",
      tags: ["Full-Stack", "Management System"],
      desc: "A comprehensive hostel management system designed to streamline administration, booking, and daily operations effortlessly.",
      link: "#"
    },
    {
      title: "Baha Connect",
      img: "/photos/baha_connect.png",
      tags: ["Next.js", "Full-Stack"],
      desc: "Nepal's premier community management tool bridging digital and physical boundaries.",
      link: "https://ourbaha.com/"
    },
    {
      title: "Resume Forge",
      img: "/photos/resume_forge.png",
      tags: ["React", "Vercel"],
      desc: "A sleek, professional resume builder instantly creating stunning templates with zero friction.",
      link: "https://resume-forge-5sbvtdsuk-anirs-projects-00fff74e.vercel.app/"
    },
    {
      title: "Habit Pulse",
      img: "/photos/habit_pulse.png", 
      tags: ["React Native", "Node.js"],
      desc: "Advanced habit tracking mobile application engineered for building incredibly productive daily routines.",
      link: "#"
    }
  ];

  return (
    <section className="section" id="projects" ref={containerRef}>
      <div className="section-container">
        <div className="section-header fade-up">
          <h2 className="section-title">Selected Works</h2>
          <p className="section-subtitle">A showcase of technical innovation and pixel-perfect design.</p>
        </div>

        <div>
          {projectsData.map((proj, idx) => (
            <div key={idx} className="modern-project-card" style={{ marginBottom: '10rem' }}>
              <div className="project-img-wrapper" style={{ cursor: 'pointer' }}
                   onMouseOver={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1.08)' }}
                   onMouseOut={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}>
                <img src={proj.img} alt={proj.title} onError={(e) => e.target.src = '/photos/Gitlogo.png'} />
              </div>
              
              <div className="project-info-modern" style={{ padding: '2rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '1px', background: 'var(--border-hover)' }}></div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                    {proj.tags.join(' // ')}
                  </span>
                </div>
                
                <h3 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>{proj.title}</h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px' }}>
                  {proj.desc}
                </p>
                
                <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', border: '1px solid var(--border)', borderRadius: '100px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, transition: 'all 0.4s ease' }}
                   onMouseOver={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                   onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}>
                  View Live Site <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
