import { useEffect, useRef, useState } from 'react';
import './CapabilityScene.css';

export default function CapabilityScene({ flowRef, paused }) {
  const hostRef = useRef(null);
  const stepsRef = useRef(null);
  const stageLabelRef = useRef(null);
  const controlsRef = useRef({ playback: () => {}, rotate: () => {} });
  const [ready, setReady] = useState(false);

  useEffect(() => { controlsRef.current.playback(); }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let disposed = false;
    let started = false;
    let visible = false;
    let playback = () => {};
    let cleanup = () => {};

    async function init() {
      if (started) return;
      started = true;
      try {
        const [THREE, { RoundedBoxGeometry }, photo] = await Promise.all([
          import('three'),
          import('three/addons/geometries/RoundedBoxGeometry.js'),
          new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = '/photos/resume_forge.webp';
          }),
        ]);
        if (disposed) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        const resources = [];
        const listeners = [];
        cleanup = () => {
          playback = () => {};
          controlsRef.current.playback = () => {};
          controlsRef.current.rotate = () => {};
          renderer.setAnimationLoop(null);
          listeners.forEach((remove) => remove());
          resources.forEach((resource) => resource.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
        const track = (resource) => { resources.push(resource); return resource; };
        renderer.setPixelRatio(Math.min(devicePixelRatio, pointer.matches ? 1.75 : 1.25));
        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);
        renderer.domElement.setAttribute('aria-hidden', 'true');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
        camera.position.set(0, 0, 8.8);
        const assembly = new THREE.Group();
        scene.add(assembly);
        const baseMaterial = track(new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.4, roughness: 0.4 }));
        scene.add(new THREE.HemisphereLight(0xffffff, 0x333333, 3));
        const key = new THREE.DirectionalLight(0xffffff, 5);
        key.position.set(-3, 4, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xffffff, 3);
        rim.position.set(4, -2, 1);
        scene.add(rim);
        const backing = new THREE.Mesh(track(new RoundedBoxGeometry(5.13, 2.63, 0.09, 3, 0.04)), baseMaterial);
        backing.position.z = -0.1;
        assembly.add(backing);

        // Build real sections of the page in order, leaving the layout visible beneath.
        const regions = [
          { crop: [0, 0, 1600, 90], offset: [0, 0.3, 0.6], start: 1 },
          { crop: [0, 90, 780, 340], offset: [-0.35, 0.15, 0.75], start: 2.3 },
          { crop: [0, 430, 780, 370], offset: [-0.25, -0.2, 0.6], start: 3.6 },
          { crop: [780, 90, 820, 710], offset: [0.3, 0.1, 0.85], start: 4.9 },
        ];
        const panels = regions.map(({ crop: [x, y, width, height], offset, start }) => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          context.filter = 'grayscale(1)';
          context.drawImage(photo, x, y, width, height, 0, 0, width, height);
          const texture = track(new THREE.CanvasTexture(canvas));
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
          const w = width / 1600 * 5;
          const h = height / 800 * 2.5;
          const origin = new THREE.Vector3((x + width / 2) / 1600 * 5 - 2.5, 1.25 - (y + height / 2) / 800 * 2.5, 0);
          const group = new THREE.Group();
          const edgeMaterial = track(new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.65, roughness: 0.33, transparent: true }));
          const body = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, 0.045)), edgeMaterial);
          group.add(body);
          const faceMaterial = track(new THREE.MeshBasicMaterial({ map: texture, transparent: true }));
          const face = new THREE.Mesh(track(new THREE.PlaneGeometry(w, h)), faceMaterial);
          face.position.z = 0.024;
          group.add(face);
          assembly.add(group);

          const outlineMaterial = track(new THREE.LineBasicMaterial({ color: 0xaaaaaa, transparent: true }));
          const outline = new THREE.LineSegments(track(new THREE.EdgesGeometry(track(new THREE.PlaneGeometry(w - 0.04, h - 0.04)))) , outlineMaterial);
          outline.position.copy(origin);
          outline.position.z = -0.045;
          assembly.add(outline);
          return { group, origin, offset: new THREE.Vector3(...offset), start, faceMaterial, edgeMaterial, outlineMaterial };
        });

        let lastStage = -1;
        let last = 0;
        let pointerX = 0;
        let pointerY = 0;
        let orbitX = 0;
        let orbitY = 0;
        let drag = null;
        let cameraBase = 8.8;
        let lost = false;
        const pose = (delta = 0, still = false) => {
          const time = motion.matches ? 8 : flowRef.current.time;
          const smooth = (value) => { const x = THREE.MathUtils.clamp(value, 0, 1); return x * x * (3 - 2 * x); };
          const reset = smooth((time - 10.5) / 1.2);
          const building = 1 - smooth((time - 5.1) / 1.1);
          const damp = still ? 1 : 1 - Math.exp(-5 * delta);
          camera.position.z = cameraBase + building * 0.65 + Math.abs(orbitX) * 0.9;
          const drift = motion.matches ? 0 : Math.sin(time / 12 * Math.PI * 2) * 0.1;
          assembly.rotation.x += (-0.12 - building * 0.08 + orbitY + pointerY * 0.18 - assembly.rotation.x) * damp;
          assembly.rotation.y += (-0.32 - building * 0.12 + drift + orbitX + pointerX * 0.3 - assembly.rotation.y) * damp;
          assembly.rotation.z = -0.025;
          panels.forEach(({ group, origin, offset, start, faceMaterial, edgeMaterial, outlineMaterial }, index) => {
            const progress = smooth((time - start) / 1.1);
            group.visible = progress > 0 && reset < 1;
            group.position.copy(origin).addScaledVector(offset, 1 - progress);
            group.rotation.y = (index % 2 ? -1 : 1) * (1 - progress) * 0.12;
            group.scale.setScalar(0.94 + progress * 0.06);
            faceMaterial.opacity = smooth((time - start) / 0.45) * (1 - reset);
            edgeMaterial.opacity = faceMaterial.opacity;
            outlineMaterial.opacity = 0.35 + (1 - progress + reset * progress) * 0.45;
          });
          const stage = time >= 10.5 || time < 1 ? 0 : time < 2.3 ? 1 : time < 4.9 ? 2 : time < 6 ? 3 : 4;
          if (stage !== lastStage && stageLabelRef.current && stepsRef.current) {
            lastStage = stage;
            const labels = ['Layout the page', 'Add the navigation', 'Build the content', 'Place the preview', 'Page complete'];
            stageLabelRef.current.textContent = labels[stage];
            stepsRef.current.querySelectorAll('li').forEach((step, index) => {
              step.dataset.state = index === stage ? 'active' : index < stage ? 'done' : 'pending';
            });
          }
          renderer.render(scene, camera);
        };
        const frame = (now) => {
          if (last && now - last < (pointer.matches ? 15 : 32)) return;
          const delta = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
          last = now;
          pose(delta);
        };
        playback = () => {
          renderer.setAnimationLoop(null);
          last = 0;
          if (disposed || lost) return;
          if (motion.matches) pose(0, true);
          else if (visible && !document.hidden && !flowRef.current.paused) renderer.setAnimationLoop(frame);
        };
        controlsRef.current.playback = playback;
        controlsRef.current.rotate = (x, y) => {
          orbitX = THREE.MathUtils.clamp(orbitX + x, -0.65, 0.65);
          orbitY = THREE.MathUtils.clamp(orbitY + y, -0.35, 0.35);
          if (motion.matches || flowRef.current.paused) pose(0, true);
        };
        const resize = () => {
          if (lost) return;
          const { width, height } = host.getBoundingClientRect();
          if (!width || !height) return;
          camera.aspect = width / height;
          // Fit the whole interface, including its exploded depth, at narrow widths.
          cameraBase = Math.max(6.6, 6.5 / camera.aspect / (2 * Math.tan(17 * Math.PI / 180)));
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
          pose(0, motion.matches);
        };
        const move = (event) => {
          if (drag) {
            controlsRef.current.rotate((event.clientX - drag.x) * 0.006, (event.clientY - drag.y) * 0.004);
            drag = { x: event.clientX, y: event.clientY };
            return;
          }
          if (!pointer.matches || motion.matches || event.pointerType === 'touch') return;
          const bounds = host.getBoundingClientRect();
          pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
          pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
        };
        const leave = () => { pointerX = 0; pointerY = 0; };
        const down = (event) => {
          if (event.pointerType === 'touch' || event.button !== 0) return;
          drag = { x: event.clientX, y: event.clientY };
          host.setPointerCapture(event.pointerId);
          host.classList.add('is-dragging');
        };
        const up = (event) => {
          drag = null;
          host.classList.remove('is-dragging');
          if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
        };
        const contextLost = (event) => { event.preventDefault(); lost = true; setReady(false); playback(); };
        const contextRestored = () => { lost = false; resize(); setReady(true); playback(); };
        const observer = new ResizeObserver(resize);
        observer.observe(host);
        const playbackListener = playback;
        host.addEventListener('pointermove', move, { passive: true });
        host.addEventListener('pointerleave', leave);
        host.addEventListener('pointerdown', down);
        host.addEventListener('pointerup', up);
        host.addEventListener('pointercancel', up);
        motion.addEventListener('change', playbackListener);
        document.addEventListener('visibilitychange', playbackListener);
        renderer.domElement.addEventListener('webglcontextlost', contextLost);
        renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
        listeners.push(() => {
          observer.disconnect();
          host.removeEventListener('pointermove', move);
          host.removeEventListener('pointerleave', leave);
          host.removeEventListener('pointerdown', down);
          host.removeEventListener('pointerup', up);
          host.removeEventListener('pointercancel', up);
          motion.removeEventListener('change', playbackListener);
          document.removeEventListener('visibilitychange', playbackListener);
          renderer.domElement.removeEventListener('webglcontextlost', contextLost);
          renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
        });
        resize();
        setReady(true);
        playback();
      } catch {
        cleanup();
        if (!disposed) setReady(false);
      }
    }
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { init(); preload.disconnect(); }
    }, { rootMargin: '250px' });
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; playback(); });
    preload.observe(host);
    visibility.observe(host);
    return () => { disposed = true; preload.disconnect(); visibility.disconnect(); cleanup(); };
  }, [flowRef]);

  return (
    <div className={`interface-study${ready ? ' is-ready' : ''}`}>
      <div className="interface-study-caption"><span>Resume Forge</span><span className="interface-hint">Page assembly</span></div>
      <div className="interface-stage" ref={hostRef} role="group" aria-label="Resume Forge 3D preview. Use arrow keys to rotate." tabIndex={ready ? 0 : -1} onKeyDown={(event) => {
        const directions = { ArrowLeft: [-0.15, 0], ArrowRight: [0.15, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1] };
        if (directions[event.key]) { event.preventDefault(); controlsRef.current.rotate(...directions[event.key]); }
      }}>
        <img className="interface-fallback" src="/photos/resume_forge.webp" alt="" width="1600" height="800" />
      </div>
      {ready && <div className="interface-build-caption" aria-hidden="true"><span ref={stageLabelRef}>Layout the page</span><ol ref={stepsRef}><li>Layout</li><li>Navigation</li><li>Content</li><li>Preview</li><li>Ready</li></ol></div>}
    </div>
  );
}
