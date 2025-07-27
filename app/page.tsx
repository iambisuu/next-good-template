'use client';

import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';

export default function Home() {
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
        console.log('Lenis not available, using default scroll');
      }
    };

    initLenis();
  }, []);

  return (
    <main style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      {/* Add some content to test scrolling */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-white text-4xl">Scroll to test navbar behavior</h2>
      </div>
    </main>
  );
}