'use client';

import AboutUs from '@/components/AboutUs';
import ComparisonSection from '@/components/Comparison';
import FAQSection from '@/components/FaqSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY + 6 });
    };

    // Smooth trail animation with proper cleanup
    const animateTrail = () => {
      setTrailPosition(prev => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.08,
        y: prev.y + (cursorPosition.y - prev.y) * 0.08
      }));
      animationId = requestAnimationFrame(animateTrail);
    };

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animationId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [cursorPosition.x, cursorPosition.y]);

  useEffect(() => {
    // Import and initialize Lenis
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis');
        
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (error) {
        console.log('Lenis not available, using default scroll', error);
      }
    };

    initLenis();
  }, []);

  return (
    <main style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
      {/* Cursor Trail */}
      <div
        className="fixed pointer-events-none z-50 w-3 h-3 bg-white rounded-full opacity-"
        style={{
          left: trailPosition.x - 6,
          top: trailPosition.y - 6,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform'
        }}
      />
      
      <Navbar />
      <Hero />
      <AboutUs/>
      <Features/>
      <ComparisonSection/>
      <FAQSection/>
      <Footer/>
    </main>
  );
}