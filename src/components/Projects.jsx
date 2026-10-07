import React, { useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Hostel Ease",
    image: "/photos/hostel_ease.webp",
    width: 1095,
    height: 715,
    type: "Web application",
    tags: ["Full stack", "Management system"],
    description:
      "Hostel booking and management, from finding a room to handling day-to-day operations.",
    source: "https://github.com/anirthapa/Hostle-Management-System",
  },
  {
    title: "Baha Connect",
    image: "/photos/baha_connect.webp",
    width: 1920,
    height: 945,
    type: "Community platform",
    tags: ["Next.js", "Full stack"],
    description:
      "A community and home management platform connecting people across Nepal.",
    link: "https://ourbaha.com/",
  },
  {
    title: "Resume Forge",
    image: "/photos/resume_forge.webp",
    width: 1600,
    height: 800,
    type: "Web application",
    tags: ["React", "Vercel"],
    description:
      "A free resume studio with considered templates, simple editing, and polished PDF exports.",
    link: "https://resume-forge-rust.vercel.app/",
    source: "https://github.com/anirthapa/Resume-Builder",
  },
  {
    title: "Habit Pulse",
    image: "/photos/habit_pulse.webp",
    width: 1354,
    height: 675,
    type: "Mobile application",
    tags: ["React Native", "Node.js"],
    description:
      "A mobile app for tracking habits, building daily routines, and following your progress.",
    source: "https://github.com/anirthapa/Habit-Pulse",
  },
  {
    title: "Multiplayer Ludo",
    image: "/photos/ludo.webp",
    width: 1280,
    height: 800,
    type: "Interactive web game",
    tags: ["TypeScript", "Multiplayer"],
    description:
      "A multiplayer take on the classic board game, made to play with friends online.",
    link: "https://multiplayer-ludo-lyart.vercel.app/",
    source: "https://github.com/anirthapa/multiplayer-ludo",
  },
  {
    title: "Los Santos Wire",
    image: "/photos/los_santos_wire.webp",
    width: 1280,
    height: 800,
    type: "Editorial website",
    tags: ["TypeScript", "Editorial"],
    description:
      "An editorial home for GTA Online news, guides, and the latest updates.",
    link: "https://los-santos-wire.vercel.app/",
    source: "https://github.com/anirthapa/GTA-ONLINE-UPDATE",
  },
];

const Arrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Projects = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.project-entry').forEach((entry, index) => {
          const fromLeft = index % 2 === 0;
          const curtain = entry.querySelector('.project-curtain');
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
          });

          timeline
            .fromTo(entry.querySelector('.project-reveal'),
              { clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' },
              { clipPath: 'inset(0 0% 0 0%)', duration: 1.25, ease: 'expo.inOut', clearProps: 'clipPath' },
            )
            .fromTo(curtain,
              { scaleX: 1, transformOrigin: fromLeft ? 'left center' : 'right center' },
              { scaleX: 0, duration: 0.85, ease: 'expo.inOut', clearProps: 'transform' }, 0.32,
            )
            .from(entry.querySelector('.project-image-entrance'),
              {
                scale: 1.18,
                rotation: fromLeft ? -1.6 : 1.6,
                duration: 1.65,
                ease: 'power3.out',
                clearProps: 'transform',
              }, 0,
            )
            .from(entry.querySelectorAll('.project-detail-reveal'),
              {
                x: fromLeft ? 48 : -48,
                y: 18,
                opacity: 0,
                duration: 0.85,
                stagger: 0.075,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }, 0.35,
            )
            .from(entry.querySelector('.project-action-icon'),
              { scale: 0, rotation: -90, duration: 0.65, ease: 'back.out(1.7)', clearProps: 'transform' }, 0.72,
            );

          gsap.fromTo(entry.querySelector('.project-entry-progress'),
            { scaleX: 0, transformOrigin: fromLeft ? 'left center' : 'right center' },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { trigger: entry, start: 'top 78%', end: 'bottom 45%', scrub: 0.6 },
            },
          );
        });
      }, containerRef);
      return () => ctx.revert();
    });

    media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.project-entry').forEach((entry) => {
          gsap.fromTo(entry.querySelector('.project-image-parallax'),
            { yPercent: -5, scale: 1.035 },
            {
              yPercent: 5,
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: entry, start: 'top bottom', end: 'bottom top', scrub: 1 },
            },
          );
        });
      }, containerRef);
      return () => ctx.revert();
    });

    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = [];
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.project-media').forEach((element) => {
          const image = element.querySelector('.project-image-hover');
          const rotateX = gsap.quickTo(image, 'rotationX', { duration: 0.7, ease: 'power3.out' });
          const rotateY = gsap.quickTo(image, 'rotationY', { duration: 0.7, ease: 'power3.out' });

          const move = (event) => {
            if (event.pointerType === 'touch') return;
            const bounds = element.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;
            rotateX((0.5 - y / bounds.height) * 5);
            rotateY((x / bounds.width - 0.5) * 5);
          };
          const leave = () => { rotateX(0); rotateY(0); };
          element.addEventListener('pointermove', move, { passive: true });
          element.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            element.removeEventListener('pointermove', move);
            element.removeEventListener('pointerleave', leave);
          });
        });
      }, containerRef);
      return () => {
        cleanups.forEach(cleanup => cleanup());
        ctx.revert();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section className="section projects-section" id="projects" ref={containerRef} aria-labelledby="projects-title">
      <div className="section-container">
        <header className="projects-heading">
          <div>
            <h2 id="projects-title">Selected Works<span className="heading-period">.</span></h2>
          </div>
          <p>A selection of web <br />and mobile projects.</p>
        </header>

        <div className="projects-gallery">
          {projects.map((project, index) => {
            const href = project.link || project.source || project.image;
            const action = project.link ? 'Visit website' : project.source ? 'View source' : 'View preview';
            const label = `${action}: ${project.title} (opens in a new tab)`;
            return (
              <article className="project-entry" key={project.title} aria-labelledby={`project-title-${index}`}>
                <div className="project-visual">
                  <div className="project-reveal">
                    <a className="project-media" href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-cursor-label={project.link ? 'Visit' : project.source ? 'Code' : 'Preview'} style={{ '--project-aspect': `${project.width} / ${project.height}` }}>
                      <div className="project-image-parallax">
                        <div className="project-image-entrance">
                          <div className="project-image-hover">
                            <img src={project.image} alt={`${project.title} interface`} width={project.width} height={project.height} loading="lazy" decoding="async" draggable="false" />
                          </div>
                        </div>
                      </div>
                      <span className="project-curtain" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="project-details">
                  <div className="project-topline project-detail-reveal">
                    <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                    <span>{project.type}</span>
                  </div>
                  <a className="project-title-link project-detail-reveal" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <h3 id={`project-title-${index}`}>{project.title}</h3>
                  </a>
                  <p className="project-detail-reveal">{project.description}</p>
                  <ul className="project-technologies project-detail-reveal" aria-label={`${project.title} technologies`}>
                    {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                  <a className="project-action project-detail-reveal" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <span>{action}</span>
                    <span className="project-action-icon"><Arrow /></span>
                  </a>
                  {project.source && project.link && (
                    <a className="project-source-link project-detail-reveal" href={project.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code (opens in a new tab)`}>
                      Source code <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <span className="project-entry-progress" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
