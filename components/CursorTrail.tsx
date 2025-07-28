import { useEffect, useState, memo } from 'react';

const CursorTrail = memo(() => {
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;
    let currentMousePos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos = { x: e.clientX, y: e.clientY + 12 };
    };

    const animateTrail = () => {
      setTrailPosition(prev => ({
        x: prev.x + (currentMousePos.x - prev.x) * 0.08,
        y: prev.y + (currentMousePos.y - prev.y) * 0.08
      }));
      animationId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 w-3 h-3 bg-white rounded-full "
      style={{
        left: `${trailPosition.x - 6}px`,
        top: `${trailPosition.y - 6}px`,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    />
  );
});

CursorTrail.displayName = 'CursorTrail';

export default CursorTrail; 