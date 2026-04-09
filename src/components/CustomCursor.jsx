import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let currentX = 0;
    let currentY = 0;
    
    // For smooth ring animation
    const animateRing = () => {
      setRingPosition((prev) => {
        // Easing factor
        const ease = 0.15;
        const nextX = prev.x + (currentX - prev.x) * ease;
        const nextY = prev.y + (currentY - prev.y) * ease;
        return { x: nextX, y: nextY };
      });
      animationFrameId = requestAnimationFrame(animateRing);
    };

    const handleMouseMove = (e) => {
      currentX = e.clientX;
      currentY = e.clientY;
      setPosition({ x: currentX, y: currentY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .skill-chip, .project-card, .social-card, .exp-card, input, textarea')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    // Initialize currentX and currentY to center of screen before mouse moves
    currentX = window.innerWidth / 2;
    currentY = window.innerHeight / 2;
    setPosition({ x: currentX, y: currentY });
    setRingPosition({ x: currentX, y: currentY });
    
    animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        className={`cursor-dot ${isHovering ? 'hover' : ''}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-ring ${isHovering ? 'hover' : ''}`} 
        style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
