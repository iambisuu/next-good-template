'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const element = sectionRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress when element is in view
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start animation when element comes into view from bottom
      const startPoint = windowHeight;
      const endPoint = -elementHeight;
      
      if (elementTop <= startPoint && elementTop >= endPoint) {
        const progress = (startPoint - elementTop) / (startPoint - endPoint);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (elementTop > startPoint) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create animated text with character-by-character color transition
  const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => {
    const words = text.split(' ');
    let characterIndex = 0;
    
    return (
      <span className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex}>
            {word.split('').map((char, charIndex) => {
              const currentCharIndex = characterIndex++;
              const totalChars = text.replace(/ /g, '').length;
              const charProgress = Math.max(0, (scrollProgress * totalChars) - currentCharIndex) / 1;
              const opacity = Math.min(Math.max(charProgress, 0), 1);
              
              return (
                <span
                  key={charIndex}
                  style={{
                    color: `rgb(${101 + (255 - 101) * opacity}, ${101 + (255 - 101) * opacity}, ${101 + (255 - 101) * opacity})`,
                    transition: 'color 0.1s ease-out'
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && <span style={{ color: `rgb(${101 + (255 - 101) * Math.min(scrollProgress * text.replace(/ /g, '').length - characterIndex + 1, 1)}, ${101 + (255 - 101) * Math.min(scrollProgress * text.replace(/ /g, '').length - characterIndex + 1, 1)}, ${101 + (255 - 101) * Math.min(scrollProgress * text.replace(/ /g, '').length - characterIndex + 1, 1)})` }}> </span>}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id='about-us'
      className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-20"
      style={{ fontFamily: "'SF Pro Display', 'SF-Pro', system-ui, sans-serif" }}
    >
      {/* About Us Text */}
      <div className="mb-12 flex flex-col items-center">
        <h2 className="text-white font-medium text-xl mb-1" style={{ fontFamily: "'SF Pro Display', 'SF-Pro', system-ui, sans-serif" }}>
          About Us
        </h2>
        {/* Decorative Line */}
        <div className="relative w-36 h-px">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, white 30%, white 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 30%, white 70%, transparent 100%)'
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-12">
          <AnimatedText 
            text="Built on innovation, research, and academic excellence, we're a dynamic AI platform empowering students and researchers to generate exceptional research papers with cutting-edge technology."
            className="block"
          />
        </h1>

        {/* CTA Button */}
        <div 
          className="inline-block"
          style={{
            opacity: Math.min(scrollProgress * 2, 1),
            transform: `translateY(${20 * (1 - Math.min(scrollProgress * 2, 1))}px)`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <button className="bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-100 hover:shadow-lg cursor-pointer transform hover:scale-105">
            Get Early Access
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}