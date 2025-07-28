import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = waitlistForm.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
    >
      {/* Background gradient for main content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/80 to-black"></div>
      
      {/* Image positioned at bottom - removed bottom margin to end exactly at page */}
      <div className="absolute left-0 right-0 h-92 bottom-0">
        <Image 
          src="/hero.avif" 
          alt="Hero Background" 
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient overlay for fade effect at bottom 20% only */}
        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-white text-4xl md:text-6xl lg:text-[6rem] font-light leading-none mt-28 mb-4 tracking-tight relative z-20">
          AI-Powered Research<br />
          Made Simple.
        </h1>

        {/* Subtext */}
        <div className="text-white/60 text-lg md:text-[1.1rem] font-thin tracking- leading-tight mt-8 max-w-2xl mx-auto mb-12  relative z-20">
          <p className="mb-2">Generate complete, human-quality research papers section-by-section.</p>
          <p>Tailored for students and researchers who need papers for grades, publication, or institutional requirements.</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20">
          <button 
            onClick={handleSmoothScroll}
            className="bg-white cursor-pointer text-black px-8 py-3.5 rounded-lg font-medium hover:bg-white/80 transition-colors duration-300 shadow-lg hover:scale-105 active:scale-95"
          >
            Join the Waitlist
          </button>
          <button className="bg-gray-800/50 cursor-pointer backdrop-blur-sm text-white px-8 py-3.5 rounded-lg font-medium border border-gray-600/50 hover:bg-gray-700/70 transition-colors duration-300">
            Learn More
          </button>
        </div>

        {/* Brand Logos - Lower z-index so image shows over them */}
        <div className="mt-20 opacity-30 relative z-5">
          <div className="flex items-center justify-center space-x-12 text-gray-400">
            {/* <div className="text-2xl font-bold tracking-wider">INTELLIRITE</div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-xl font-medium">AI RESEARCH</div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-2xl font-bold tracking-wider">PLATFORM</div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;