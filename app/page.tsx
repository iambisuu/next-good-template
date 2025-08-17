'use client';

import AboutUs from '@/components/AboutUs';
import ComparisonSection from '@/components/Comparison';
import FAQSection from '@/components/FaqSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import WaitlistSection from '@/components/WaitlistPage';
import CursorTrail from '@/components/CursorTrail';
import { useEffect } from 'react';

const initLenis = async () => {
  try {
    const { default: Lenis } = await import('@studio-freight/lenis');
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return lenis;
  } catch (error) {
    console.log('Lenis not available, using default scroll', error);
    return null;
  }
};

export default function Home() {
  useEffect(() => {
    let lenis: ReturnType<typeof initLenis> extends Promise<infer T> ? T : never = null;
    
    initLenis().then((instance) => {
      lenis = instance;
    });

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <main 
      className="relative bg-white"
      style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
    >
      <CursorTrail />
      <Navbar />
      <Hero />
      <AboutUs />
      <Features />
      <WaitlistSection />
      <ComparisonSection />
      {/* <FAQSection /> */}
      {/* <Footer /> */}
    </main>
  );
}