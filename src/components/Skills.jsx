import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';
import CapabilityScene from './CapabilityScene';

gsap.registerPlugin(ScrollTrigger);

const skills = {
  frontend: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  backend: ['Node.js', 'Express', 'REST APIs'],
  data: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma'],
  delivery: ['Git', 'CI/CD', 'Vercel', 'Netlify', 'AWS'],
};

const SkillTools = ({ name, tools }) => (
  <ul className="capability-tools" aria-label={`${name} tools`}>
    {tools.map((tool) => <li key={tool}>{tool}</li>)}
  </ul>
);

const RequestDemo = () => <div className="request-demo" aria-label="Animated demonstration of an API request and response">
  <div className="request-demo-top"><span>Request / response</span><span className="request-live"><i />Live flow</span></div>
  <div className="request-route" aria-hidden="true"><span>Client</span><div className="request-track"><i /></div><span className="request-endpoint">API</span><div className="request-track request-return"><i /></div><span>Client</span></div>
  <div className="request-demo-status" aria-hidden="true"><span className="request-waiting">Ready for the next request</span><span className="request-sending">Sending request…</span><span className="request-processing">Querying data…</span><span className="request-complete">200 OK — response received</span></div>
</div>;

const Skills = () => {
  const sectionRef = useRef(null);
  const flowRef = useRef({ time: 0, paused: false });
  const playbackRef = useRef(() => {});
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = gsap.matchMedia();
    let visible = false;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let cycle;
      const ctx = gsap.context(() => {
        cycle = gsap.timeline({ repeat: -1, paused: true });
        // One clock keeps the interface, API, data, and deployment in sequence.
        cycle.fromTo(flowRef.current, { time: 0 }, { time: 12, duration: 12, ease: 'none' }, 0);
        cycle.set('.request-demo-status span', { autoAlpha: 0 }, 0)
          .set('.request-waiting', { autoAlpha: 1 }, 0)
          .set('.request-waiting', { autoAlpha: 0 }, 2.2)
          .set('.request-sending', { autoAlpha: 1 }, 2.2)
          .fromTo('.request-track:not(.request-return) i', { left: '0%', opacity: 0 }, { opacity: 1, duration: 0.15 }, 2.2)
          .to('.request-track:not(.request-return) i', { left: 'calc(100% - 18px)', duration: 1, ease: 'power2.inOut' }, 2.3)
          .to('.request-track:not(.request-return) i', { opacity: 0, duration: 0.2 }, 3.3)
          .to('.request-endpoint', { borderColor: '#ddd', color: '#fff', backgroundColor: '#303030', duration: 0.4 }, 3.2)
          .set('.request-sending', { autoAlpha: 0 }, 3.3)
          .set('.request-processing', { autoAlpha: 1 }, 3.3)
          .to('.data-record', { x: 6, borderColor: '#ffffff80', backgroundColor: '#ffffff12', color: '#fff', duration: 0.35, stagger: 0.3, ease: 'power2.out' }, 3.4)
          .to('.data-record', { x: 0, borderColor: '#ffffff40', backgroundColor: '#ffffff05', color: '#d6d6d6', duration: 0.55, stagger: 0.3 }, 4.2)
          .fromTo('.request-return i', { left: '0%', opacity: 0 }, { opacity: 1, duration: 0.15 }, 4.8)
          .to('.request-return i', { left: 'calc(100% - 18px)', duration: 1, ease: 'power2.inOut' }, 4.9)
          .to('.request-return i', { opacity: 0, duration: 0.2 }, 5.9)
          .set('.request-processing', { autoAlpha: 0 }, 6)
          .set('.request-complete', { autoAlpha: 1 }, 6)
          .to('.request-endpoint', { borderColor: '#ffffff65', color: '#dedede', backgroundColor: '#181818', duration: 0.6 }, 6.5)
          .fromTo('.delivery-pulse', { '--delivery-progress': 1.12, opacity: 0 }, { opacity: 1, duration: 0.1 }, 6)
          .to('.delivery-pulse', { '--delivery-progress': -0.12, duration: 2.4, ease: 'none' }, 6.1)
          .to('.delivery-pulse', { opacity: 0, duration: 0.3 }, 8.5)
          .to('.delivery-node', { fill: '#eee', duration: 0.3, stagger: 0.9 }, 6)
          .to('.delivery-labels span', { color: '#eee', duration: 0.3, stagger: 0.9 }, 6)
          .to('.delivery-node', { fill: '#131313', duration: 0.6, stagger: 0.15 }, 9.2)
          .to('.delivery-labels span', { color: '#c2c2c2', duration: 0.6 }, 9.2)
          .set('.request-complete', { autoAlpha: 0 }, 10.3)
          .set('.request-waiting', { autoAlpha: 1 }, 10.3);
      }, section);
      const playback = () => {
        if (visible && !document.hidden && !flowRef.current.paused) cycle.play();
        else cycle.pause();
      };
      playbackRef.current = playback;
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; playback(); });
      observer.observe(section);
      document.addEventListener('visibilitychange', playback);
      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', playback);
        playbackRef.current = () => {};
        ctx.revert();
        flowRef.current.time = 0;
      };
    });
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.capability-tile').forEach((tile, index) => {
          const timeline = gsap.timeline({ scrollTrigger: { trigger: tile, start: 'top 92%', once: true } });
          timeline.fromTo(tile,
            { y: 65, opacity: 0, clipPath: 'inset(12% 0 0 0 round 9px)' },
            { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0 round 9px)', duration: 1.15, ease: 'expo.out', delay: index % 2 * 0.08, clearProps: 'clipPath,opacity' },
          );
          const details = tile.querySelectorAll('.capability-copy h3, .capability-copy p, .capability-tools li');
          if (details.length) timeline.from(details,
            { y: 22, opacity: 0, duration: 0.75, stagger: 0.045, ease: 'power3.out', clearProps: 'transform,opacity' }, 0.18);
        });
      }, sectionRef);
      return () => ctx.revert();
    });

    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = [];
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.capability-tile').forEach((tile) => {
          const rotateX = gsap.quickTo(tile, 'rotationX', { duration: 0.55, ease: 'power3.out' });
          const rotateY = gsap.quickTo(tile, 'rotationY', { duration: 0.55, ease: 'power3.out' });
          const move = (event) => {
            const bounds = tile.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;
            tile.style.setProperty('--pointer-x', `${x * 100}%`);
            tile.style.setProperty('--pointer-y', `${y * 100}%`);
            rotateX((0.5 - y) * 2.5);
            rotateY((x - 0.5) * 2.5);
          };
          const leave = () => { rotateX(0); rotateY(0); };
          tile.addEventListener('pointermove', move, { passive: true });
          tile.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            tile.removeEventListener('pointermove', move);
            tile.removeEventListener('pointerleave', leave);
          });
        });
      }, sectionRef);
      return () => {
        cleanups.forEach((cleanup) => cleanup());
        ctx.revert();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section className="section skills-section" id="skills" ref={sectionRef} aria-labelledby="skills-title">
      <div className="section-container">
        <header className="section-header editorial-heading capabilities-heading">
          <h2 className="section-title" id="skills-title">Capabilities<span className="heading-period">.</span></h2>
          <div className="capabilities-intro"><p className="section-subtitle">Most of my work is in the browser. I can also carry a feature through the API, data layer, and release.</p><button className="capability-motion-toggle" type="button" aria-pressed={paused} onClick={() => {
            const next = !flowRef.current.paused;
            flowRef.current.paused = next;
            setPaused(next);
            playbackRef.current();
          }}>{paused ? 'Play animation' : 'Pause animation'}<span aria-hidden="true">{paused ? ' ▷' : ' Ⅱ'}</span></button></div>
        </header>

        <div className="capability-bento">
          <article className="capability-tile capability-frontend">
            <CapabilityScene flowRef={flowRef} paused={paused} />
            <div className="capability-copy">
              <h3>Frontend</h3>
              <p>Responsive pages, clear interactions, and animation that helps people find their way.</p>
              <SkillTools name="Frontend" tools={skills.frontend} />
            </div>
          </article>

          <article className="capability-tile capability-backend">
            <div className="capability-copy">
              <h3>Backend</h3>
              <p>Node and Express APIs for the features behind the interface.</p>
              <RequestDemo />
              <SkillTools name="Backend" tools={skills.backend} />
            </div>
          </article>

          <article className="capability-tile capability-data">
            <div className="capability-copy">
              <h3>Data</h3>
              <p>SQL and document databases, modeled with Prisma where it fits.</p>
              <div className="data-records" aria-hidden="true"><div className="data-record"><span>id</span><i /><b>PK</b></div><div className="data-record"><span>project</span><i /><b>string</b></div><div className="data-record"><span>created_at</span><i /><b>date</b></div></div>
              <SkillTools name="Data" tools={skills.data} />
            </div>
          </article>

          <article className="capability-tile capability-delivery">
            <div className="capability-copy">
              <h3>Delivery</h3>
              <p>Version control, deployment, and keeping a project maintainable after release.</p>
              <div className="delivery-flow" aria-hidden="true"><svg className="capability-drawing" viewBox="0 0 240 58" fill="none"><path pathLength="1" d="M12 14h48c28 0 22 30 50 30h118" /><path pathLength="1" d="M12 44h216" /><path className="delivery-pulse" pathLength="1" d="M12 14h48c28 0 22 30 50 30h118" /><circle className="delivery-node" cx="12" cy="14" r="4" /><circle cx="12" cy="44" r="4" /><circle className="delivery-node" cx="125" cy="44" r="4" /><circle className="delivery-node" cx="228" cy="44" r="4" /></svg><div className="delivery-labels"><span>Commit</span><span>Build</span><span>Deploy ↗</span></div></div>
              <SkillTools name="Delivery" tools={skills.delivery} />
            </div>
          </article>

          <a className="capability-tile capability-work-link" href="#projects">
            <span>See what I&apos;ve built</span>
            <span className="capability-work-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
